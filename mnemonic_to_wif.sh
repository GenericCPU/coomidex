#!/bin/bash
# This script converts a 12-word mnemonic (BIP39) into a WIF private key.
# It uses an inline Python snippet. Run this within your virtual environment.

# Check for python3
if ! command -v python3 &>/dev/null; then
  echo "python3 is required but not installed. Please install python3 and try again."
  exit 1
fi

# Get the mnemonic: if provided as a command-line argument, use it; otherwise prompt the user.
if [ -z "$1" ]; then
  echo -n "Enter your 12-word mnemonic: "
  read -r mnemonic
else
  mnemonic="$1"
fi

# Prompt for an optional passphrase.
echo -n "Enter passphrase (leave blank if none): "
read -r passphrase

# Export values so they are available to the Python snippet.
export MNEMONIC="$mnemonic"
export PASSPHRASE="$passphrase"

# Inline Python code to convert the mnemonic to a WIF private key.
python3 <<'EOF'
import os
from mnemonic import Mnemonic
import bip32utils

# Retrieve mnemonic and passphrase from environment variables.
mnemonic_phrase = os.environ.get("MNEMONIC")
passphrase = os.environ.get("PASSPHRASE", "")

if not mnemonic_phrase:
    print("No mnemonic provided. Exiting.")
    exit(1)

# Convert the mnemonic to a seed (BIP39)
mnemo = Mnemonic("english")
seed = mnemo.to_seed(mnemonic_phrase, passphrase=passphrase)

# Generate the master key from the seed (BIP32)
bip32_root_key_obj = bip32utils.BIP32Key.fromEntropy(seed)

# Derive the child private key using derivation path m/44'/0'/0'/0/0
child_key_obj = (
    bip32_root_key_obj.ChildKey(44 + bip32utils.BIP32_HARDEN)
                     .ChildKey(0 + bip32utils.BIP32_HARDEN)
                     .ChildKey(0 + bip32utils.BIP32_HARDEN)
                     .ChildKey(0)
                     .ChildKey(0)
)

# Convert the raw private key to Wallet Import Format (WIF)
wif_private_key = child_key_obj.WalletImportFormat()
print("WIF Private Key:", wif_private_key)
EOF

