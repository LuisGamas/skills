#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

const SKILLS = [
  'flutter-clean-arch-architect',
  'flutter-init-project',
  'flutter-material3-uiux-expert',
  'flutter-riverpod-expert',
  'odoo-modules-creator',
];

function getGlobalSkillsDir() {
  const platform = os.platform();
  
  if (platform === 'win32') {
    const appData = process.env.APPDATA || path.join(os.homedir(), 'AppData', 'Roaming');
    return path.join(appData, '.opencode', 'skills');
  }
  
  return path.join(os.homedir(), '.config', 'opencode', 'skills');
}

function getPackageSkillsDir() {
  return path.join(__dirname, '..');
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

function createSymlink(source, target) {
  const platform = os.platform();
  
  if (platform === 'win32') {
    try {
      fs.symlinkSync(source, target, 'junction');
      return true;
    } catch (err) {
      if (err.code === 'EPERM') {
        return false;
      }
      throw err;
    }
  }
  
  fs.symlinkSync(source, target);
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

function main() {
  const targetDir = getGlobalSkillsDir();
  const useSymlink = process.env.OPENCODE_SKILLS_SYMLINK === '1';
  const method = useSymlink ? 'symlink' : 'copy';
  
  console.log(`\n📦 Installing OpenCode skills (${method})...`);
  console.log(`   Directory: ${targetDir}\n`);
  
  fs.mkdirSync(targetDir, { recursive: true });
  
  let installed = 0;
  let failed = 0;
  
  for (const skill of SKILLS) {
    let success;
    
    if (useSymlink) {
      success = linkSkill(skill, targetDir);
    } else {
      success = copySkill(skill, targetDir);
    }
    
    if (success) {
      console.log(`  ✅ ${skill}`);
      installed++;
    } else {
      console.log(`  ❌ ${skill} (failed)`);
      failed++;
    }
  }
  
  console.log(`\n✨ Successfully installed ${installed}/${SKILLS.length} skills`);
  
  if (useSymlink) {
    console.log('   💡 Skills are symlinked - updates will reflect immediately.');
  }
  
  console.log('   Restart OpenCode to use the new skills.\n');
  
  if (failed > 0 && useSymlink) {
    console.log('💡 Tip: If symlinks failed, try running as administrator or use:');
    console.log('   npm install -g opencode-skills-flutter-odoo (without OPENCODE_SKILLS_SYMLINK)\n');
  }
}

main();
