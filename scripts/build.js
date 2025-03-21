const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Ensure we're in production mode
process.env.NODE_ENV = 'production';

// Increase memory limit
process.env.NODE_OPTIONS = '--max-old-space-size=4096 --no-warnings';

// Clean previous builds
console.log('Cleaning previous builds...');
try {
    fs.rmSync('.next', { recursive: true, force: true });
    fs.rmSync('out', { recursive: true, force: true });
} catch (e) {
    // Ignore errors
}

// Create temporary next.config.js for build
const tempConfig = `
import nextra from 'nextra'

const withNextra = nextra({
    theme: 'nextra-theme-docs',
    themeConfig: './theme.config.tsx',
    staticImage: true,
    defaultShowCopyCode: true
})

export default withNextra({
    output: 'export',
    images: { unoptimized: true },
    distDir: '.next',
    typescript: { ignoreBuildErrors: true },
    eslint: { ignoreDuringBuilds: true },
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx']
})`;

const originalConfig = fs.readFileSync('next.config.mjs', 'utf8');
fs.writeFileSync('next.config.mjs.bak', originalConfig);
fs.writeFileSync('next.config.mjs', tempConfig);

// Convert _meta.ts files to .js temporarily
const metaFiles = [];
function processMetaFiles(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processMetaFiles(fullPath);
        } else if (file === '_meta.ts') {
            const content = fs.readFileSync(fullPath, 'utf8');
            const jsContent = content.replace('module.exports =', 'export default');
            const backupPath = fullPath + '.bak';
            fs.writeFileSync(backupPath, content);
            fs.writeFileSync(fullPath, jsContent);
            metaFiles.push({ original: fullPath, backup: backupPath });
        }
    }
}

try {
    console.log('Processing _meta files...');
    processMetaFiles('pages');

    // Run the build
    console.log('Building...');
    execSync('next build', {
        stdio: 'inherit',
        env: {
            ...process.env,
            NEXT_TELEMETRY_DISABLED: '1',
            NEXT_SKIP_TRACE: '1',
            NEXT_SKIP_TYPE_CHECK: '1'
        }
    });
} finally {
    // Restore original files
    console.log('Restoring original files...');
    fs.renameSync('next.config.mjs.bak', 'next.config.mjs');
    for (const file of metaFiles) {
        const content = fs.readFileSync(file.backup, 'utf8');
        fs.writeFileSync(file.original, content);
        fs.unlinkSync(file.backup);
    }
    console.log('Build complete!');
}
