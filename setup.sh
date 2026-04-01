#!/bin/bash

# TaskFlow - Quick Setup Script
# This script helps you get started with TaskFlow development

echo "======================================"
echo "   TaskFlow - Quick Setup"
echo "======================================"
echo ""

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js 18+ from https://nodejs.org"
    exit 1
fi

echo "✅ Node.js $(node --version) found"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed!"
    exit 1
fi

echo "✅ npm $(npm --version) found"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
    echo ""
    echo "======================================"
    echo "   Setup Complete! 🎉"
    echo "======================================"
    echo ""
    echo "Next steps:"
    echo ""
    echo "  Start development server:"
    echo "    npm run dev"
    echo ""
    echo "  Build for production:"
    echo "    npm run build"
    echo ""
    echo "  Deploy to GitHub Pages:"
    echo "    npm run deploy"
    echo ""
    echo "📚 Documentation:"
    echo "  - CONVERSION_GUIDE.md  → Detailed migration notes"
    echo "  - DEPLOYMENT_GUIDE.md  → GitHub Pages setup"
    echo "  - README.md            → Project overview"
    echo ""
else
    echo "❌ Failed to install dependencies"
    exit 1
fi
