const { reviewCodeService }= require("../services/reviewService");

const reviewCode = async (req, res) => {

    try{
        const code = req.body.code;

        console.log("Code received by controller:");
        console.log(code);
        const result=  await reviewCodeService(code);
        res.status(200).json(result);
    } catch (error){

        console.error("Controller error:", error);
        res.status(500).json({
            message: "Review failed",
            review: "The AI service is temprarily unavailable. Please tyr again."
        });
    }    

};

module.exports = {
    reviewCode
};