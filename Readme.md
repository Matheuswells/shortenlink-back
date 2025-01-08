# Short Links API

This is a simple API built with AdonisJS for creating, retrieving, and managing short links.

## Features

* Create short links from long URLs.
* Retrieve the original URL from a short link.
* Track click statistics for each short link.
* [Add more features here as you implement them]

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Matheuswells/shortenlink-back.git
   
   cd short-links-api
   
   npm install
   ```
   
2. **Install Docker and Docker Compose:**

   - [Docker](https://docs.docker.com/get-docker/)
   - [Docker Compose](https://docs.docker.com/compose/install/)
   

3. **Install Node.js:**

   - [Node.js](https://nodejs.org/en/download/)
   

4. **Install AdonisJS CLI globally:**

   ```bash
   npm i -g @adonisjs/cli
   ```
   
## Database Setup (using Docker Compose)
1. Start the database:

   ```bash
   docker-compose up -d
   ```
   
2. Run the database migrations:

   ```bash
   node ace migration:run
   ```
   
## Running the API

1. **Install the dependencies:**

   ```bash
   npm install
   ```
   
2. **Start the server:**

   ```bash
    npm run dev
    ```
   
3. **Access the API at `http://localhost:3333`**

