const fs = require("fs");
const { JSDOM } = require('jsdom');

const args = process.argv.slice(2);
const path = args.length === 1 ? args[0] : 'help';

if (path === 'help') {
    console.log('Usage: node readfile.js <file-path>');
    process.exit(1);
} 

if (!fs.existsSync(path)) {
    console.log(`${path} not found`);
    process.exit(1);
}

try {
    const data = fs.readFileSync(path, 'utf8');
    const dom = new JSDOM(data);
    const linkCollection = dom.window.document.getElementsByTagName('a');
    const linkArray = [...linkCollection];
    const links = linkArray.map(link => link.href);
    const result = links.join('\n');
    const fileContent = Buffer.alloc(result.length, result, 'utf8');
    fs.writeFileSync(__dirname + '/result.txt', fileContent)
} catch (err) {
    console.log('error :', err);
    process.exit(1);
}