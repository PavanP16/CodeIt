const Submission = require("../models/Submission");
const { StatusCodes } = require("http-status-codes");

const getAllSubmissions = async (req, res) => {
    try {
        const submissions = await Submission.find({});
        return res.status(StatusCodes.OK).json({ submissions });
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: error.message });
    }
};

const getSingleSubmission = async (req, res) => {
    try {
        const submission = await Submission.find(req.params.id);
        return res.status(StatusCodes.OK).json({ submission });
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: error.message });
    }
};

const getUserSubmissions = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const userId = req.user.userId;
    try {
        const submissions = await Submission.find({ userId })
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();

        const totalSubmissions = await Submission.countDocuments({ userId });

        return res.status(StatusCodes.OK).json({
            submissions,
            totalPages: Math.ceil(totalSubmissions / limit),
            currentPage: page
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
};

const retrieveLastSubmittedCode = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { problemId } = req.params;


        const latestSubmission = await Submission.findOne({
            userId: userId,
            problemId: problemId,
            language: req.body.language,
        })
            .sort({ createdAt: -1 })
            .exec();

        if (!latestSubmission) {
            return res
                .status(404)
                .json({ message: "No submissions found for this problem." });
        }


        return res.status(200).json({ latestSubmission });
    } catch (error) {
        console.error("Error retrieving the last submission:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};


const deleteSubmission = async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        await Submission.findByIdAndDelete(id);

        return res.status(StatusCodes.OK).json({ message: "Submission deleted!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

module.exports = { deleteSubmission, getAllSubmissions, retrieveLastSubmittedCode, getUserSubmissions, getSingleSubmission }