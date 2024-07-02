// const {
//     downloadCodeFromFirebase,
//     downloadInputFromFirebase,
//     downloadJavaOutputFromFirebase,
// } = require("./firebase/downloadFileFromFirebase");

const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const sanitizeJobId = (jobId) => {
    // Replace non-alphanumeric characters with underscores and prepend with "Class" to ensure a valid class name
    return `Class_${jobId.replace(/[^a-zA-Z0-9]/g, "_")}`;
};


const validateJavaTestCases = async (
    filePath,
    inputPath,
    expectedOutputPath,
    timelimit
) => {
    const localExpectedOutputPath = await downloadJavaOutputFromFirebase(
        expectedOutputPath
    );
    const jobId = path.basename(filePath).split(".")[0];
    const sanitizedJobId = sanitizeJobId(jobId);
    const dirPath = path.dirname(filePath);
    const newJavaFile = path.join(dirPath, `${sanitizedJobId}.java`);
    const codeOutputPath = path.join(outputPath, `${jobId}_output.txt`);

    return new Promise((resolve, reject) => {
        fs.readFile(filePath, "utf8", (err, fileData) => {
            if (err) {
                return reject({ error: err });
            }

            const modifiedData = fileData.replace(
                /public class \w+/,
                `public class ${sanitizedJobId}`
            );

            fs.writeFile(newJavaFile, modifiedData, "utf8", (err) => {
                if (err) {
                    return reject({ error: err });
                }

                const execCommand = exec(
                    `javac "${newJavaFile}" && java "${sanitizedJobId}" < "${inputPath}" > "${codeOutputPath}"`,
                    { shell: "cmd.exe", timeout: timelimit * 1000 },
                    async (error, stdout, stderr) => {
                        if (error) {
                            if (error.killed) {
                                return resolve("time limit exceeded");
                            }
                            reject({ error, stderr });
                            return;
                        }
                        if (stderr) {
                            reject(stderr);
                            return;
                        }

                        try {
                            const generatedOutput = await fs.promises.readFile(
                                codeOutputPath,
                                "utf8"
                            );
                            const expectedOutput = await fs.promises.readFile(
                                localExpectedOutputPath,
                                "utf8"
                            );

                            if (generatedOutput.trim() === expectedOutput.trim()) {
                                resolve("accepted");
                            } else {
                                resolve("failed");
                            }
                        } catch (readError) {
                            reject(readError);
                        }
                    }
                );

                setTimeout(() => {
                    execCommand.kill();
                }, timelimit * 1000);
            });
        });
    });
};

module.exports = validateJavaTestCases;