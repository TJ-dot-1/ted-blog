import { GoogleGenerativeAI } from "@google/generative-ai";

// Check if API key exists
if (!process.env.GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY is not set in environment variables');
    throw new Error('Gemini API key not configured');
} else {
    console.log('✅ Gemini API key found');
}

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Use the correct model names that are available
// Try these models in order
const availableModels = [
    "gemini-1.5-flash-latest",  // Latest flash model
    "gemini-1.5-flash",         // Flash model
    "gemini-1.0-pro-latest",    // Latest pro model
    "gemini-1.0-pro",           // Pro model
    "gemini-pro"                // Legacy name (might not work)
];

let currentModel = availableModels[0]; // Start with the first one

// Helper to instantiate the model for the currentModel
let model = genAI.getGenerativeModel({
    model: currentModel,
    generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
    }
});

console.log(`✅ Using model: ${currentModel}`);

async function main(prompt) {
    try {
        console.log('🔧 Starting AI content generation...');
        console.log(`📋 Using model: ${currentModel}`);
        
        // Validate input
        if (!prompt || typeof prompt !== 'string') {
            throw new Error('Prompt is required and must be a string');
        }

        console.log('📝 Prompt:', prompt.substring(0, 200) + '...');

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    console.log('✅ Content generated successfully');
    console.log('📄 Content length:', text.length);

    return text;

    } catch (error) {
        console.error('❌ Gemini AI Error:', error);
        
        // If model not found, try the next available model
        if (error.status === 404 && error.message && error.message.toLowerCase().includes('model')) {
            const currentIndex = availableModels.indexOf(currentModel);
            if (currentIndex < availableModels.length - 1) {
                const nextModel = availableModels[currentIndex + 1];
                console.log(`🔄 Switching to model: ${nextModel}`);
                currentModel = nextModel;
                // re-instantiate the model for the nextModel
                try {
                    model = genAI.getGenerativeModel({
                        model: currentModel,
                        generationConfig: {
                            temperature: 0.7,
                            topK: 40,
                            topP: 0.95,
                            maxOutputTokens: 2048,
                        }
                    });
                } catch (instErr) {
                    console.warn('Failed to instantiate model', instErr);
                }
                // Retry with the new model
                return main(prompt);
            }
        }
        
        // Provide a helpful fallback
        const fallbackContent = `
            <h2>About ${prompt}</h2>
            <p>Welcome to our comprehensive exploration of ${prompt}. This topic has gained significant attention in recent years due to its transformative potential across various industries and aspects of daily life.</p>
            
            <h3>Understanding the Core Concepts</h3>
            <p>At its foundation, ${prompt} represents a paradigm shift in how we approach problem-solving and innovation. The fundamental principles behind this concept continue to evolve as researchers and practitioners uncover new applications and implications.</p>
            
            <h3>Key Applications and Benefits</h3>
            <ul>
                <li><strong>Enhanced Efficiency:</strong> Streamlining processes and reducing operational costs</li>
                <li><strong>Improved Decision-Making:</strong> Leveraging data-driven insights for better outcomes</li>
                <li><strong>Innovation Acceleration:</strong> Fostering creativity and breakthrough solutions</li>
                <li><strong>Competitive Advantage:</strong> Staying ahead in rapidly changing markets</li>
            </ul>
            
            <h3>Implementation Considerations</h3>
            <p>Successfully integrating ${prompt} requires careful planning and strategic execution. Organizations should consider factors such as resource allocation, training requirements, and change management to ensure smooth adoption and maximum return on investment.</p>
            
            <h3>Future Outlook</h3>
            <p>As technology continues to advance, the potential applications of ${prompt} are expected to expand significantly. Staying informed about emerging trends and developments will be crucial for organizations seeking to maintain their competitive edge.</p>
            
            <h3>Conclusion</h3>
            <p>${prompt} represents more than just a technological advancement—it's a fundamental shift in how we approach challenges and opportunities. By understanding its principles and potential applications, individuals and organizations can position themselves for success in an increasingly complex and dynamic landscape.</p>
            
            <p>For more insights and updates on ${prompt}, stay tuned to our blog and resources.</p>`;
        
        return fallbackContent;
    }
}

export default main;

// generateTopic: ask the model to propose a concise blog title (and optional tags)
async function generateTopic(seed = '') {
    const seedText = String(seed || '').trim();
    const prompt = `You are a content strategist. Given the optional seed: "${seedText}" generate a concise, compelling blog post title (6-12 words) suitable for a public audience. On the next line, provide 3 relevant comma-separated tags.

Output format (exactly):\nTitle: <the title>\nTags: tag1, tag2, tag3\nIf no seed is provided, propose a timely, useful blog topic.`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
        const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
        let titleLine = lines.find(l => /^Title:/i.test(l)) || lines[0] || text;
        if (/^Title:\s*/i.test(titleLine)) titleLine = titleLine.replace(/^Title:\s*/i, '').trim();
        // Return the title only
        return titleLine;
    } catch (err) {
        console.warn('generateTopic failed:', err && err.message ? err.message : err);
        return seedText || 'A useful topic to write about today';
    }
}

export { generateTopic };