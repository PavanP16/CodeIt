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
                    required: true,
                },
                output: {
                    type: String,
                    required: true,
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