const mongoose = require("mongoose");

const ProblemSchema = new mongoose.Schema(
    {
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        difficulty: {
            type: String,
            required: true,
            enum: ["Easy", "Medium", "Hard"],
        },
        tags: {
            type: [String],
            required: true,
        },
        solvedBy: {
            type: [String],
        },
        siteCases: [
            {
                input: {
                    type: String,
                },
                output: {
                    type: String,
                },
            },
        ],
        constraints: {
            type: String,
        },
        timelimit: {
            type: Number,
            default: 5.0,
        },
        createdBy: {
            type: String,
        },
        Submissions: {
            type: Number,
            default: 0,
        },
        input: {
            type: String,
        },
        output: [
            {
                cpp: {
                    type: String,
                },
                java: {
                    type: String,
                },
                python: {
                    type: String,
                },
            },
        ],

    },
    { timestamps: true }
);

const Problem = mongoose.model("Problem", ProblemSchema);

module.exports = Problem;


// {testCases: [
//     {
//         input: {
//             type: String,
//         },
//         output: {
//             type: String,
//         },
//         sample: {
//             type: Boolean,
//         },
//         explanation: {
//             type: String,
//         },
//     },
// ],}