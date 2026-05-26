#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

const SKILLS = [
  'flutter-clean-arch-architect',
  'flutter-init-project',
  'flutter-material3-uiux-expert',
  'flutter-riverpod-expert',
  'odoo-modules-creator',
];

const AGENT_CONFIGS = [
  {
    name: 'OpenCode',
    localDir: '.opencode',
    globalDir: null,
  },
  {
    name: 'Claude Code',
    localDir: '.claude',
    globalDir: null,
  },
  {
    name: 'Agents (Codex-compatible)',
    localDir: '.agents',
    globalDir: null,
  },
];

function getGlobalBaseDir() {
  const platform = os.platform();
  
  if (platform === 'win32') {
    return process.env.APPDATA || path.join(os.homedir(), 'AppData', 'Roaming');
  }
  
  return path.join(os.homedir(), '.config');
}

function getGlobalSkillDirs() {
  const base = getGlobalBaseDir();
  const platform = os.platform();
  
  const dirs = [];
  
  for (const agent of AGENT_CONFIGS) {
    if (platform === 'win32') {
      dirs.push({
        name: `${agent.name} (global)`,
        path: path.join(base, agent.localDir, 'skills'),
      });
    } else {
      dirs.push({
        name: `${agent.name} (global)`,
        path: path.join(base, agent.localDir, 'skills'),
      });
    }
  }
  
  return dirs;
}

function getLocalSkillDirs(cwd) {
  const dirs = [];
  
  for (const agent of AGENT_CONFIGS) {
    dirs.push({
      name: `${agent.name} (local)`,
      path: path.join(cwd, agent.localDir, 'skills'),
    });
  }
  
  return dirs;
}

function getPackageSkillsDir() {
  return path.join(__dirname, '..');
}

function isSymlinkSupported() {
  const platform = os.platform();
  
  if (platform !== 'win32') {
    return true;
  }
  
  try {
    const testLink = path.join(os.tmpdir(), `symlink-test-${Date.now()}`);
    const testTarget = path.join(os.tmpdir(), `symlink-target-${Date.now()}`);
    fs.writeFileSync(testTarget, 'test');
    fs.symlinkSync(testTarget, testLink, 'junction');
    fs.unlinkSync(testLink);
    fs.unlinkSync(testTarget);
    return true;
  } catch {
    return false;
  }
}

function createSymlink(source, target) {
  const platform = os.platform();
  
  if (platform === 'win32') {
    try {
      fs.symlinkSync(source, target, 'junction');
      return true;
    } catch (err) {
      if (err.code === 'EPERM') {
        console.warn(`  ⚠️  Symlink requires admin/developer mode on Windows. Falling back to copy.`);
        return false;
      }
      throw err;
    }
  }
  
  fs.symlinkSync(source, target);
  return true;
}

function copySkill(skillName, targetDir) {
  const sourceDir = path.join(getPackageSkillsDir(), skillName);
  const targetSkillDir = path.join(targetDir, skillName);
  
  if (!fs.existsSync(sourceDir)) {
    return false;
  }
  
  if (fs.existsSync(targetSkillDir)) {
    fs.rmSync(targetSkillDir, { recursive: true, force: true });
  }
  
  function copyRecursive(src, dest) {
    const stat = fs.statSync(src);
    
    if (stat.isDirectory()) {
      fs.mkdirSync(dest, { recursive: true });
      const entries = fs.readdirSync(src);
      
      for (const entry of entries) {
        copyRecursive(path.join(src, entry), path.join(dest, entry));
      }
    } else {
      fs.copyFileSync(src, dest);
    }
  }
  
  copyRecursive(sourceDir, targetSkillDir);
  return true;
}

function linkSkill(skillName, targetDir) {
  const sourceDir = path.join(getPackageSkillsDir(), skillName);
  const targetSkillDir = path.join(targetDir, skillName);
  
  if (!fs.existsSync(sourceDir)) {
    return false;
  }
  
  const exists = fs.existsSync(targetSkillDir);
  const isLink = exists && fs.lstatSync(targetSkillDir).isSymbolicLink();
  
  if (exists || isLink) {
    fs.rmSync(targetSkillDir, { recursive: true, force: true });
  }
  
  return createSymlink(sourceDir, targetSkillDir);
}

function installToDir(skillName, targetDir, method) {
  fs.mkdirSync(targetDir, { recursive: true });
  
  if (method === 'symlink') {
    return linkSkill(skillName, targetDir);
  }
  
  return copySkill(skillName, targetDir);
}

function installSkills(targets, method, label) {
  console.log(`\n📦 Installing OpenCode skills (${method}) to ${label}...`);
  
  let totalInstalled = 0;
  let totalFailed = 0;
  
  for (const target of targets) {
    console.log(`\n   📁 ${target.name}`);
    console.log(`      ${target.path}`);
    
    let installed = 0;
    let failed = 0;
    
    for (const skill of SKILLS) {
      const success = installToDir(skill, target.path, method);
      if (success) {
        console.log(`      ✅ ${skill}`);
        installed++;
      } else {
        console.log(`      ❌ ${skill} (failed)`);
        failed++;
      }
    }
    
    totalInstalled += installed;
    totalFailed += failed;
    
    console.log(`      ${installed}/${SKILLS.length} skills installed`);
  }
  
  console.log(`\n✨ Total: ${totalInstalled} installed, ${totalFailed} failed`);
  
  if (method === 'symlink') {
    console.log('   💡 Skills are symlinked - updates to the package will reflect immediately.');
  }
  
  console.log('   Restart your AI agent to use the new skills.\n');
}

function detectAgentDirs(cwd) {
  const detected = [];
  
  for (const agent of AGENT_CONFIGS) {
    const localPath = path.join(cwd, agent.localDir);
    const globalPath = path.join(getGlobalBaseDir(), agent.localDir);
    
    if (fs.existsSync(localPath)) {
      detected.push({ name: `${agent.name} (local)`, path: path.join(localPath, 'skills') });
    }
    
    if (fs.existsSync(globalPath)) {
      detected.push({ name: `${agent.name} (global)`, path: path.join(globalPath, 'skills') });
    }
  }
  
  return detected;
}

function showHelp() {
  console.log(`
Usage: opencode-skills-install [options]

Options:
  --global          Install to global directories
  --local           Install to current project directory
  --symlink         Use symlinks instead of copying
  --copy            Force copy mode (default)
  --all             Install to all detected agent directories
  --agents <list>   Comma-separated list: opencode,claude,agents
  --help            Show this help message

Examples:
  npx opencode-skills-install --global --symlink
  npx opencode-skills-install --local --agents opencode,claude
  npx opencode-skills-install --all --copy
`);
}

function parseArgs() {
  const args = process.argv.slice(2);
  
  const opts = {
    global: false,
    local: false,
    symlink: false,
    copy: true,
    all: false,
    agents: null,
    help: false,
  };
  
  for (const arg of args) {
    if (arg === '--global') opts.global = true;
    else if (arg === '--local') opts.local = true;
    else if (arg === '--symlink') { opts.symlink = true; opts.copy = false; }
    else if (arg === '--copy') { opts.copy = true; opts.symlink = false; }
    else if (arg === '--all') opts.all = true;
    else if (arg === '--help') opts.help = true;
    else if (arg.startsWith('--agents=')) opts.agents = arg.split('=')[1].split(',');
    else if (arg === '--agents') {
      const idx = args.indexOf('--agents');
      if (idx >= 0 && idx + 1 < args.length) {
        opts.agents = args[idx + 1].split(',');
      }
    }
  }
  
  return opts;
}

function main() {
  const opts = parseArgs();
  
  if (opts.help) {
    showHelp();
    process.exit(0);
  }
  
  const method = opts.symlink ? 'symlink' : 'copy';
  const cwd = process.cwd();
  
  if (!opts.global && !opts.local && !opts.all && !opts.agents) {
    console.log('No installation target specified. Use --help for usage.');
    console.log('\nQuick start:');
    console.log('  npx opencode-skills-install --global          # Install globally (copy)');
    console.log('  npx opencode-skills-install --global --symlink # Install globally (symlink)');
    console.log('  npx opencode-skills-install --local            # Install to current project');
    process.exit(1);
  }
  
  const targets = [];
  
  if (opts.all) {
    targets.push(...detectAgentDirs(cwd));
    targets.push(...getGlobalSkillDirs());
  } else {
    if (opts.agents) {
      const agentMap = {
        'opencode': '.opencode',
        'claude': '.claude',
        'agents': '.agents',
      };
      
      for (const agent of opts.agents) {
        const trimmed = agent.trim().toLowerCase();
        const dirName = agentMap[trimmed];
        
        if (!dirName) {
          console.warn(`⚠️  Unknown agent: ${agent}. Use: opencode, claude, agents`);
          continue;
        }
        
        if (opts.global) {
          targets.push({
            name: `${trimmed} (global)`,
            path: path.join(getGlobalBaseDir(), dirName, 'skills'),
          });
        }
        
        if (opts.local) {
          targets.push({
            name: `${trimmed} (local)`,
            path: path.join(cwd, dirName, 'skills'),
          });
        }
      }
    } else {
      if (opts.global) {
        targets.push({
          name: 'OpenCode (global)',
          path: path.join(getGlobalBaseDir(), '.opencode', 'skills'),
        });
      }
      
      if (opts.local) {
        targets.push({
          name: 'OpenCode (local)',
          path: path.join(cwd, '.opencode', 'skills'),
        });
      }
    }
  }
  
  if (targets.length === 0) {
    console.error('❌ No valid installation targets found.');
    process.exit(1);
  }
  
  const methodLabel = method === 'symlink' ? 'symlink' : 'copy';
  const targetLabel = targets.map(t => t.name).join(', ');
  
  installSkills(targets, methodLabel, targetLabel);
}

main();
