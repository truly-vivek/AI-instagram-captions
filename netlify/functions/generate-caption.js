const axios = require('axios');

exports.handler = async (event) => {
    try {
        const { imageData, promptText } = JSON.parse(event.body);
        const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // From Netlify env

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                contents: [{
                    parts: [
                        { text: promptText },
                        { 
                            inline_data: {
                                mime_type: 'image/jpeg',
                                data: imageData.split(',')[1] 
                            }
                        }
                    ]
                }]
            }
        );

        return {
            statusCode: 200,
            body: JSON.stringify(response.data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};