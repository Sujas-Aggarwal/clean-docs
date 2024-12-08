# Online Rich Text Editor

This project is an online rich text editor built with React (Vite), NodeJS and MariaDB.

## Features

- Rich text editing capabilities
- User authentication and authorization
- Role-based access control
- Persistent login sessions

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MariaDB on Port 3306

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/Sujas-Aggarwal/clean-docs.git
    cd clean-docs
    ```

2. Install dependencies for both client and server:
    ```sh
    cd client
    npm install
    cd ../server
    npm install
    ```

### Configure the .env files
    Configure the .env files in both client and server based on the .env.example

### Setup the Database
    Make Sure that MariaDB or MySQL is runnin on your device on PORT 3306 (default port)
    Now to Migrate, Simply run server/database/migrations/init.js

### Running the Application

1. Start the server:
    ```sh
    cd server
    node
    ```

2. Start the client:
    ```sh
    cd client
    npm start
    ```

3. Open your browser and navigate to `http://localhost:1234`.

## Project Structure

- `client/`: Contains the React frontend code.
- `server/`: Contains the Express backend code.