#!/bin/bash
# update-two-files.sh
#
# This script updates two files simultaneously (e.g., index.html and script.js).
# It performs the following steps:
# 1. Creates timestamped backups for both files.
# 2. Prompts you to paste in new content for the first file (waiting until you type a line "EOF").
# 3. Then prompts you to paste in new content for the second file.
# 4. Shows a preview (first 200 characters) of each new content.
# 5. Asks if you want to update the files with the new content.
# 6. If confirmed, writes the new content to both files.
# 7. Finally, asks if you want to immediately undo the update (restore backups).
#
# Usage:
#   To update:
#     ./update-two-files.sh path/to/index.html path/to/script.js
#
#   To undo later manually:
#     ./update-two-files.sh --undo path/to/index.html path/to/script.js

set -e

# Function: Get current timestamp.
timestamp() {
  date +"%Y-%m-%d_%H-%M-%S"
}

# Check arguments.
if [ "$#" -lt 2 ]; then
  echo "Usage: $0 [--undo] path/to/file1 path/to/file2"
  exit 1
fi

# Determine if undo mode is requested.
if [ "$1" == "--undo" ]; then
  UNDO=true
  shift
else
  UNDO=false
fi

FILE1="$1"
FILE2="$2"

# Verify that both files exist.
for file in "$FILE1" "$FILE2"; do
  if [ ! -f "$file" ]; then
    echo "Error: File not found: $file"
    exit 1
  fi
done

BACKUP_INFO_FILE="backups.txt"

if $UNDO ; then
  if [ ! -f "$BACKUP_INFO_FILE" ]; then
    echo "No backup info file ($BACKUP_INFO_FILE) found."
    exit 1
  fi
  # Expect backup file to contain two lines.
  BACKUP1=$(head -n 1 "$BACKUP_INFO_FILE")
  BACKUP2=$(tail -n 1 "$BACKUP_INFO_FILE")
  for file in "$FILE1" "$FILE2"; do
    echo "Restoring $file..."
  done
  if [ -f "$BACKUP1" ]; then
    cp "$BACKUP1" "$FILE1"
    echo "$FILE1 restored from backup $BACKUP1"
  else
    echo "Backup not found for $FILE1"
  fi
  if [ -f "$BACKUP2" ]; then
    cp "$BACKUP2" "$FILE2"
    echo "$FILE2 restored from backup $BACKUP2"
  else
    echo "Backup not found for $FILE2"
  fi
  exit 0
fi

# --- BACKUP MODE ---
echo "Creating backups..."
TS=$(timestamp)
BACKUP1="${FILE1}.backup-${TS}"
BACKUP2="${FILE2}.backup-${TS}"
cp "$FILE1" "$BACKUP1"
cp "$FILE2" "$BACKUP2"
echo "Backup for $FILE1 created: $BACKUP1"
echo "Backup for $FILE2 created: $BACKUP2"

# Save backup info.
echo "$BACKUP1" > "$BACKUP_INFO_FILE"
echo "$BACKUP2" >> "$BACKUP_INFO_FILE"
echo "Backup info saved to $BACKUP_INFO_FILE."

# --- PROMPT FOR NEW CONTENT ---
# Function: Read multi-line input until a line containing only "EOF".
read_multiline() {
  local prompt="$1"
  echo "$prompt"
  echo "Paste in content below. When finished, type a line with only 'EOF' and press Enter:"
  local content=""
  while IFS= read -r line; do
    if [ "$line" == "EOF" ]; then
      break
    fi
    content+="$line"$'\n'
  done
  echo "$content"
}

# Prompt for content for FILE1.
NEW_CONTENT1=$(read_multiline "Paste in content for $FILE1:")
echo
# Prompt for content for FILE2.
NEW_CONTENT2=$(read_multiline "Paste in content for $FILE2:")
echo

# --- PREVIEW ---
echo "Preview of new content for $FILE1 (first 200 characters):"
echo "$NEW_CONTENT1" | head -c 200
echo
echo "Preview of new content for $FILE2 (first 200 characters):"
echo "$NEW_CONTENT2" | head -c 200
echo

# --- CONFIRM UPDATE ---
read -p "Do you want to update both files with the new content? (Y/n) " CONFIRM
CONFIRM=${CONFIRM:-y}
if [[ "$CONFIRM" =~ ^(n|no)$ ]]; then
  echo "Update cancelled. Backups remain at:"
  echo "$BACKUP1"
  echo "$BACKUP2"
  exit 0
fi

# Write the new content to both files.
echo "$NEW_CONTENT1" > "$FILE1"
echo "$NEW_CONTENT2" > "$FILE2"
echo "Files updated: $FILE1 and $FILE2"

# --- ASK IF UNDO IS WANTED ---
read -p "Do you want to undo the update now? (Y/n) " UNDO_CONFIRM
UNDO_CONFIRM=${UNDO_CONFIRM:-n}
if [[ "$UNDO_CONFIRM" =~ ^(y|yes)$ ]]; then
  echo "Restoring backups..."
  cp "$BACKUP1" "$FILE1"
  cp "$BACKUP2" "$FILE2"
  echo "Files restored from backups."
else
  echo "Update complete. Backups remain at:"
  echo "$BACKUP1"
  echo "$BACKUP2"
fi

echo "To manually undo later, run: $0 --undo $FILE1 $FILE2"

