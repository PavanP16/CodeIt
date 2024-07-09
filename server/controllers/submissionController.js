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

const getUserStats = async (req, res) => {

    const { userId } = req.user;
    try {
        // Aggregate query to count submissions by status for a specific user
        const result = await Submission.aggregate([
            { $match: { userId: userId } },
            {
                $group: {
                    _id: {
                        $cond: [
                            { $eq: ["$status", "accepted"] },
                            "accepted",
                            "rejected"
                        ]
                    },
                    count: { $sum: 1 }
                }
            }
        ]);

        // Initialize the response with all possible statuses and zero counts
        const subs = [
            { id: "accepted", label: "Accepted", value: 0 },
            { id: "rejected", label: "Rejected", value: 0 }
        ];

        // Merge the aggregation result with the initialized subs
        result.forEach(item => {
            const index = subs.findIndex(d => d.id === item._id);
            if (index !== -1) {
                subs[index].value = item.count;
            }
        });

        return res.status(StatusCodes.OK).json({ subs });
    } catch (error) {
        console.error("Error fetching submission status count:", error);
        return res.status(500).json(error);
    }
}

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

module.exports = { deleteSubmission, getAllSubmissions, retrieveLastSubmittedCode, getUserSubmissions, getSingleSubmission, getUserStats }