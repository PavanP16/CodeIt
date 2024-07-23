# Code-It

## Project Overview

The project is an online coding platform that allows users to solve coding problems, view leaderboards and their submissions. The platform offers a user-friendly interface for coding practice and also gives a good UI experience.

### [Demo Video ](https://drive.google.com/file/d/1RL5U_G-GhumIjYhHkEGQjngar8jkoa7u/view?usp=sharing)

## Features

- **Problem Solving**: Users can browse, solve, and submit solutions for various coding problems.
- **Submissions**: View your past submissions and track your progress with graphs.
- **Leaderboard**: Check your ranking and performance among the other users.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **NextUI**: React UI library for creating beautiful and modern web applications.
- **Axios**: Promise-based HTTP client for making API requests.
- **Firebase**: Used for file storage.
- **Docker**: Containerization of the backend server.
- **ECR**: To push the docker image to Elastic Container Registry.
- **EC2**: Hosting the Docker container directly on an EC2 instance from ECR.

## Setup Instructions

1. **Clone the repository**: Go to the root directory.
2. **Install dependencies**:
   - _Client_: `cd client` && `npm install --legacy-peer-deps`,
   - _Server_: `cd server` && `npm install`
3. **Configure environment variables**: Set up the env files for both client and server accordingly.

