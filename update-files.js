#!/usr/bin/env node
/**
 * update-two-files.js
 *
 * This script updates two files simultaneously (e.g., an HTML file and a JS file).
 * It makes a backup of each file (with a timestamp appended) before updating.
 * It then prompts you to paste new content for each file (one after the other).
 * After previewing the content, it asks for confirmation. If confirmed, it updates both files.
 * It saves backup file paths in a "backups.json" file so you can later run the script with
 * the "--undo" flag to revert both files.
 *
 * Usage:
 *   To update:
 *     node update-two-files.js path/to/file1 path/to/file2
 *
 *   To undo (restore from latest backups):
 *     node update-two-files.js --undo path/to/file1 path/to/file2
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Parse command-line arguments
const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('Usage: node update-two-files.js [--undo] path/to/file1 path/to/file2');
  process.exit(1);
}

const undoMode = args[0] === '--undo';
const filePaths = undoMode ? args.slice(1) : args;

// Function to create a backup for a file
function backupFile(filePath) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupName = `${filePath}.backup-${timestamp}`;
  fs.copyFileSync(filePath, backupName);
  return backupName;
}

// Function to save backup info to backups.json
function saveBackupInfo(file1, backup1, file2, backup2) {
  const backupInfo = { [file1]: backup1, [file2]: backup2 };
  fs.writeFileSync('backups.json', JSON.stringify(backupInfo, null, 2));
  console.log('Backup info saved to backups.json');
}

// Function to load backup info from backups.json
function loadBackupInfo() {
  if (fs.existsSync('backups.json')) {
    return JSON.parse(fs.readFileSync('backups.json'));
  }
  return {};
}

// Function to prompt for multi‑line input from STDIN
function promptForContent(promptMessage) {
  return new Promise(resolve => {
    console.log(promptMessage);
    let content = '';
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    });
    rl.on('line', line => {
      content += line + '\n';
    });
    rl.on('close', () => {
      resolve(content);
    });
  });
}

// Function to ask a yes/no question and return true if yes
function askYesNo(question) {
  return new Promise(resolve => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question(question + ' (Y/n) ', answer => {
      rl.close();
      answer = answer.trim().toLowerCase();
      resolve(answer === '' || answer === 'y' || answer === 'yes');
    });
  });
}

// MAIN FUNCTION
(async function main() {
  if (undoMode) {
    // Undo mode: restore backups for both files.
    const back

