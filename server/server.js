const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");
const rateLimiter = require("express-rate-limit");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");

const connectDB = require("./db/connectDB");
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const codeRouter = require("./routes/codeRouter");
const problemRouter = require("./routes/problemRouter");

const { PORT, MONGO_URI, ORIGIN } = require("./config");

const notFound = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const Problem = require("./models/Problem");

const app = express();


// const problemData = [
//   {
//     slug: 'two-sum',
//     title: 'Two Sum',
//     description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.You may assume that each input would have exactly one solution, and you may not use the same element twice.You can return the answer in any order.',
//     difficulty: 'Easy',
//     tags: ['Hash Table', 'Arrays'],
//     siteCases: [
//       { input: ' nums = [2,7,11,15], target = 9', output: '[0,1]' },
//       { input: ' nums = [3,2,4], target = 6', output: '[1,2]' }
//     ],
//     constraints: '2 <= nums.length <= 10^4',
//     timelimit: 5,
//     Submissions: 0
//   },
//   {
//     slug: 'median-of-two-sorted-arrays',
//     title: 'Median of Two Sorted Arrays',
//     description: 'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.The overall run time complexity should be O(log (m+n)).',
//     difficulty: 'Hard',
//     tags: ['Binary Search', 'Arrays'],
//     siteCases: [
//       { input: 'nums1 = [1,3], nums2 = [2]', output: '2.00000' },
//       { input: ' nums1 = [1,2], nums2 = [3,4]', output: '2.50000' }
//     ],
//     constraints: '-10^6 <= nums1[i], nums2[i] <= 10^6',
//     timelimit: 5,
//     Submissions: 0
//   },
//   {
//     slug: 'reverse-integer',
//     title: 'Reverse Integer',
//     description: 'Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.Assume the environment does not allow you to store 64-bit integers (signed or unsigned).',
//     difficulty: 'Medium',
//     tags: ['Math', 'Recusrion'],
//     siteCases: [
//       { input: ' x = 123', output: '321' },
//       { input: ' x = -120', output: '21' }
//     ],
//     constraints: '-2^31 <= x <= 2^31 - 1',
//     timelimit: 5,
//     Submissions: 0
//   },

//   {
//     slug: 'palindrome-number',
//     title: 'Palindrome Number',
//     description: 'Given an integer x, return true if x is a palindrome, and false otherwise',
//     difficulty: 'Easy',
//     tags: ['Math', 'Stack'],
//     siteCases: [
//       { input: 'x = 121', output: 'true' },
//       { input: 'x = -121', output: 'false' }
//     ],
//     constraints: '-231 <= x <= 231 - 1',
//     timelimit: 5,
//     Submissions: 0
//   },
//   {
//     slug: 'longest-common-prefix',
//     title: 'Longest Common Prefix',
//     description: `Write a function to find the longest common prefix string amongst an array of strings. \nIf there is no common prefix, return an empty string "".`,
//     difficulty: 'Easy',
//     tags: ['String', 'Trie'],
//     siteCases: [
//       { input: 'strs = ["flower","flow","flight"]', output: '"fl"' },
//       { input: 'strs = ["dog","racecar","car"]', output: '""' }
//     ],
//     constraints: 'strs[i] consists of only lowercase English letters.',
//     timelimit: 5,
//     Submissions: 0
//   },
//   {
//     slug: '3sum',
//     title: '3 Sum',
//     description: 'Description of problem 1Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.Notice that the solution set must not contain duplicate triplets.',
//     difficulty: 'Medium',
//     tags: ['Two Pointers', 'Arrays'],
//     siteCases: [
//       { input: 'nums = [-1,0,1,2,-1,-4]', output: '[[-1,-1,2],[-1,0,1]]' },
//       { input: 'nums = [0,1,1]', output: '[]' }
//     ],
//     constraints: '-10^5 <= nums[i] <= 10^5',
//     timelimit: 5,
//     Submissions: 0
//   },
//   {
//     slug: 'valid-parentheses',
//     title: 'Valid Parentheses',
//     description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\nAn input string is valid if:\n
//       1.Open brackets must be closed by the same type of brackets.\n
//       2.Open brackets must be closed in the correct order.\n
//       3.Every close bracket has a corresponding open bracket of the same type.`,
//     difficulty: 'Easy',
//     tags: ['String', 'Stack'],
//     siteCases: [
//       { input: 's = "()"', output: 'true' },
//       { input: 's = "(]"', output: 'false' },
//     ],
//     constraints: `s consists of parentheses only '()[]{}'.`,
//     timelimit: 5,
//     Submissions: 10
//   },
//   {
//     slug: 'sort-colors',
//     title: 'Sort Colors',
//     description: `Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.\n
//       We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.`,
//     difficulty: 'Medium',
//     tags: ['Sorting', 'Arrays'],
//     siteCases: [
//       { input: 'nums = [2,0,2,1,1,0]', output: '[0,0,1,1,2,2]' },
//       { input: 'nums = [2,0,1]', output: '[0,1,2]' }
//     ],
//     constraints: 'nums[i] is either 0, 1, or 2.',
//     timelimit: 5,
//     Submissions: 0
//   },
//   {
//     slug: 'maximum-subarray',
//     title: 'Maximum Subarray',
//     description: 'Given an integer array nums, find the subarray with the largest sum, and return its sum.',
//     difficulty: 'Medium',
//     tags: ['DP', 'Arrays'],
//     siteCases: [
//       { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6' },
//       { input: 'nums = [5,4,-1,7,8]', output: '23' }
//     ],
//     constraints: '-10^4 <= nums[i] <= 10^4',
//     timelimit: 5,
//     Submissions: 0
//   },

//   // Add more objects as needed
// ];

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());

const corsOptions = {
  origin: [ORIGIN],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(xss());
app.use(mongoSanitize());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/code", codeRouter);
app.use("/api/v1/problems", problemRouter);

// app.use('/data', async (req, res) => {

//   try {

//     const pushData = await Problem.insertMany(problemData)

//     res.status(200).send(pushData);
//   } catch (error) {
//     res.status(500).send({ error: 'Failed to insert data', details: error });
//   }

// })

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = PORT || 8080;

const start = async () => {
  try {
    await connectDB(MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();