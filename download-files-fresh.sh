#!/bin/bash

echo "🚀 5CMS File Download Manager"
echo "=================================="
echo

# Create downloads directory if it doesn't exist
mkdir -p ~/Downloads/5CMS-Download

echo "📁 Preparing your files..."

# Copy original UI specification document
echo "📄 Copying your original UI specification..."
cp upload/5CMS-uis.docx ~/Downloads/5CMS-Download/
cp 5cms-ui-specification.docx ~/Downloads/5CMS-Download/

# Create fresh project archive
echo "📦 Creating fresh project archive..."
cd /home/z/my-project

# Exclude node_modules, .next, and other large/temporary directories
tar -czf ~/Downloads/5CMS-Download/5cms-project-fresh.tar.gz \
    --exclude='node_modules' \
    --exclude='.next' \
    --exclude='.git' \
    --exclude='*.log' \
    --exclude='dev.log' \
    --exclude='dist' \
    --exclude='build' \
    --exclude='coverage' \
    .

echo "✅ Files prepared successfully!"
echo
echo "📋 Download Summary:"
echo "===================="
echo "📄 Original UI Document: 5CMS-uis.docx"
echo "📄 UI Document Copy: 5cms-ui-specification.docx"
echo "📦 Complete Project: 5cms-project-fresh.tar.gz"
echo
echo "📍 Location: ~/Downloads/5CMS-Download/"
echo
echo "📊 File Sizes:"
ls -lh ~/Downloads/5CMS-Download/
echo
echo "🎯 Next Steps:"
echo "1. Open your Downloads folder"
echo "2. Look for the '5CMS-Download' folder"
echo "3. Extract 5cms-project-fresh.tar.gz to get the complete project"
echo "4. Run 'npm install' and 'npm run dev' to start the application"
echo
echo "✨ Enjoy your 5CMS project!"