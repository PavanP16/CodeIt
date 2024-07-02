const mongoose = require("mongoose");

const SubmissionSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        problemId: {
            type: String,
            required: true,
        },
        language: {
            type: String,
            required: true,
            enum: ["cpp", "java", "python"],
        },
        code: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: ["rejected", "accepted"],
        },
        executionTime: {
            type: Number,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Submission", SubmissionSchema);
