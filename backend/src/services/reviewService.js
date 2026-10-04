const { GoogleGenAI }= require("@google/genai");

const ai= new GoogleGenAI({
    apikey: process.env.GEMINI_API_KEY
});


const reviewCodeService = async (code) => {

    if (!code) {
        return {
            message: "Review failed",
            review: "No code was provided."
        };
    }

    const prompt =`
    You are an expert code reviewer.
    Review the following code:
    ${code}
    Give the review in simple language.
    
    Include:
    1. Errors or bugs
    2. Explanation of the probleam
    3. Suggested improvement
    4. Corrected code if necessary
    `;

    const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt
    });

    return {
        message: "Code review completed!",
        review: response.text
    };

};

module.exports = {
    reviewCodeService
};