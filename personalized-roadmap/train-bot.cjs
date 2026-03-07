const fs = require('fs');
const path = require('path');

// THE DEEP FIX: We bypass the main index and grab the worker file directly
const pdf = require('pdf-parse/lib/pdf-parse.js');

// Setup file paths
const DOCS_DIR = path.join(__dirname, 'training_docs');
const OUTPUT_FILE = path.join(__dirname, 'src/data/knowledgeBase.js');

async function convertPdfsToKnowledge() {
    console.log("🤖 STARTING BOT TRAINING...");
    
    if (!fs.existsSync(DOCS_DIR)) {
        console.error(`❌ Error: Folder 'training_docs' not found!`);
        return;
    }

    const files = fs.readdirSync(DOCS_DIR).filter(file => file.toLowerCase().endsWith('.pdf'));

    if (files.length === 0) {
        console.log("⚠️ No PDF files found in 'training_docs'.");
        return;
    }

    let knowledgeBase = [];
    let idCounter = 1;

    for (const file of files) {
        const filePath = path.join(DOCS_DIR, file);
        const dataBuffer = fs.readFileSync(filePath);

        try {
            console.log(`📖 Reading: ${file}...`);
            
            // This will now execute perfectly because we have the raw function
            const data = await pdf(dataBuffer);
            
            // Clean up text
            const cleanText = data.text.replace(/\n\s*\n/g, '\n').trim();
            const topicName = file.replace('.pdf', '').replace(/_/g, ' ').toUpperCase();
            const keywords = topicName.toLowerCase().split(' ');

            knowledgeBase.push({
                id: idCounter++,
                topic: topicName,
                keywords: keywords, 
                content: cleanText
            });

        } catch (err) {
            console.error(`❌ Failed to read ${file}:`, err.message);
        }
    }

    // Write the output
    const fileContent = `
// AUTO-GENERATED FILE. DO NOT EDIT MANUALLY.
// Run 'node train-bot.cjs' to update this.

export const botKnowledge = ${JSON.stringify(knowledgeBase, null, 2)};
    `;

    const outputDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(outputDir)){
        fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(OUTPUT_FILE, fileContent);

    console.log("✅ TRAINING COMPLETE!");
    console.log(`🧠 Bot has learned ${knowledgeBase.length} document(s).`);
    console.log(`📁 Database updated at: src/data/knowledgeBase.js`);
}

convertPdfsToKnowledge();
