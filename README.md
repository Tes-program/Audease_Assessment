# Audease_Assessment

## Blogging Platform API

This is a RESTful API for a simple blogging platform, built as an assessment project. The API provides endpoints for user authentication, creating, retrieving, updating, and deleting blog posts.

## Features

- User authentication with username and password
- CRUD operations for blog posts
- Only authenticated users can create, update, or delete blog posts
- PostgreSQL database for storing blog post data
- Docker and Docker Compose for containerization

## Prerequisites

- Node.js 
- npm 
- Docker 
- Docker Compose

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/Tes-program/Audease_Assessment.git
```

2. Change into the project directory:

```bash
cd Audease_Assessment
```

3. Install the dependencies:

```bash
npm install
```

4. Create a `.env` file in the root of the project with the following environment variables:

```bash
PORT=3000
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=blogging_platform
JWT_SECRET=secret
JWT_EXPIRES_IN=1d
```

5. Start the application:

```bash
npm start
```

6. The API will be available at `http://localhost:3000`.


## Testing

To run the tests, use the following command:

```bash
npm test
```

## Docker

To run the application using Docker, use the following command:

```bash
docker-compose up
```

The API will be available at `http://localhost:3000`.

