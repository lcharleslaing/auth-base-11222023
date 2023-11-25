import fs from 'fs';
import path from 'path';

const projectDir = './src'; // Set your project directory here
const outputFile = 'project-code.md'; // Output Markdown file

function isRelevantFile(file) {
    const validExtensions = ['.svelte', '.js', '.ts', '.sql'];
    return validExtensions.some(ext => file.endsWith(ext));
}

function formatAsMarkdown(filePath, content) {
    return `## File: ${filePath}\n\n\`\`\`\n${content}\n\`\`\`\n\n`;
}

function readAndFormatFiles(dir, baseDir = '') {
    let markdownContent = '';
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const relPath = path.join(baseDir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            markdownContent += readAndFormatFiles(fullPath, relPath);
        } else if (isRelevantFile(file)) {
            const content = fs.readFileSync(fullPath, 'utf8');
            markdownContent += formatAsMarkdown(relPath, content);
        }
    });

    return markdownContent;
}

const markdownData = readAndFormatFiles(projectDir);
fs.writeFileSync(outputFile, markdownData);

console.log(`Markdown file created: ${outputFile}`);
