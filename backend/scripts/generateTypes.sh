#!/bin/bash

set -e

SOURCE_DIR="../src/types/shared"
TARGET_DIR="../../frontend/src/types/shared"

# Remove the target directory and recreate it
rm -rf "$TARGET_DIR"
mkdir -p "$TARGET_DIR"

# Copy all files from the source directory to the target directory
cp -R "$SOURCE_DIR/"* "$TARGET_DIR"
echo "Copied all files from $SOURCE_DIR to $TARGET_DIR."

echo "Types generation process completed."