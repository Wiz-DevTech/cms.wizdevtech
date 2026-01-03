#!/bin/bash

echo "🔍 5CMS Download Verification"
echo "============================="
echo

DOWNLOAD_DIR="$HOME/Downloads/5CMS-Download"

echo "📁 Checking download location..."
if [ -d "$DOWNLOAD_DIR" ]; then
    echo "✅ Download directory exists: $DOWNLOAD_DIR"
else
    echo "❌ Download directory not found!"
    exit 1
fi

echo
echo "📋 Verifying files..."

# Check original UI document
if [ -f "$DOWNLOAD_DIR/5CMS-uis.docx" ]; then
    SIZE=$(ls -lh "$DOWNLOAD_DIR/5CMS-uis.docx" | awk '{print $5}')
    echo "✅ 5CMS-uis.docx ($SIZE) - Your original UI specification"
else
    echo "❌ 5CMS-uis.docx missing!"
fi

# Check UI document copy
if [ -f "$DOWNLOAD_DIR/5cms-ui-specification.docx" ]; then
    SIZE=$(ls -lh "$DOWNLOAD_DIR/5cms-ui-specification.docx" | awk '{print $5}')
    echo "✅ 5cms-ui-specification.docx ($SIZE) - UI document copy"
else
    echo "❌ 5cms-ui-specification.docx missing!"
fi

# Check project archive
if [ -f "$DOWNLOAD_DIR/5cms-project-fresh.tar.gz" ]; then
    SIZE=$(ls -lh "$DOWNLOAD_DIR/5cms-project-fresh.tar.gz" | awk '{print $5}')
    echo "✅ 5cms-project-fresh.tar.gz ($SIZE) - Complete project archive"
    
    # Test archive integrity
    echo "🔧 Testing archive integrity..."
    if tar -tzf "$DOWNLOAD_DIR/5cms-project-fresh.tar.gz" > /dev/null 2>&1; then
        echo "✅ Archive is valid and can be extracted"
        FILE_COUNT=$(tar -tzf "$DOWNLOAD_DIR/5cms-project-fresh.tar.gz" | wc -l)
        echo "📊 Archive contains $FILE_COUNT files and directories"
    else
        echo "❌ Archive is corrupted!"
    fi
else
    echo "❌ 5cms-project-fresh.tar.gz missing!"
fi

# Check README
if [ -f "$DOWNLOAD_DIR/README.md" ]; then
    echo "✅ README.md - Installation and usage instructions"
else
    echo "❌ README.md missing!"
fi

echo
echo "📊 Total download size:"
du -sh "$DOWNLOAD_DIR"

echo
echo "🎯 Next Steps:"
echo "1. Open: $DOWNLOAD_DIR"
echo "2. Extract: tar -xzf 5cms-project-fresh.tar.gz"
echo "3. Install: npm install"
echo "4. Run: npm run dev"
echo
echo "✨ Your 5CMS project is ready for download!"