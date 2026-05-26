#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

function getSkillDir() {
  return path.join(__dirname, '..');
}

function getSkillName() {
  const pkgPath = path.join(getSkillDir(), 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  return pkg.name.replace(/-skill$/, '');
}

function getGlobalSkillDirs() {
  const platform = os.platform();
  const base = platform === 'win32'
    ? (process.env.APPDATA || path.join(os.homedir(), 'AppData', 'Roaming'))
    : os.homedir();
  const configBase = platform === 'win32' ? base : path.join(base, '.config');

  return [
    { name: 'OpenCode', path: path.join(configBase, 'opencode', 'skills') },
    { name: 'Claude Code', path: path.join(base, '.claude', 'skills') },
    { name: 'Agents', path: path.join(base, '.agents', 'skills') },
  ];
}

function createSymlink(source, target) {
  const platform = os.platform();
  if (platform === 'win32') {
    try {
      fs.symlinkSync(source, target, 'junction');
      return true;
    } catch (err) {
      if (err.code === 'EPERM') return false;
      throw err;
    }
  }
  fs.symlinkSync(source, target);
  return true;
}

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      if (entry === 'node_modules') continue;
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

function installSkill(targetDir, useSymlink) {
  const skillDir = getSkillDir();
  const skillName = getSkillName();
  const targetSkillDir = path.join(targetDir, skillName);

  fs.mkdirSync(targetDir, { recursive: true });

  if (fs.existsSync(targetSkillDir) || (fs.existsSync(targetSkillDir) && fs.lstatSync(targetSkillDir).isSymbolicLink?.())) {
    try {
      fs.rmSync(targetSkillDir, { recursive: true, force: true });
    } catch {
      // Ignore cleanup errors
    }
  }

  if (useSymlink) {
    return createSymlink(skillDir, targetSkillDir);
  }

  copyRecursive(skillDir, targetSkillDir);
  return true;
}

function main() {
  const useSymlink = process.env.SKILL_SYMLINK === '1';
  const method = useSymlink ? 'symlink' : 'copy';
  const skillName = getSkillName();

  console.log(`\nInstalling ${skillName}-skill (${method})...`);

  const targets = getGlobalSkillDirs();
  let installed = 0;

  for (const target of targets) {
    try {
      const success = installSkill(target.path, useSymlink);
      if (success) {
        console.log(`  ${target.name}`);
        installed++;
      }
    } catch {
      // Skip directories that can't be written to
    }
  }

  if (installed > 0) {
    console.log(`Installed to ${installed} location(s)`);
    if (useSymlink) {
      console.log('Symlinked - updates reflect immediately.');
    }
  }
  console.log('Restart your AI agent to use the skill.\n');
}

main();
