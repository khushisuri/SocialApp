# syntax = docker/dockerfile:1

ARG NODE_VERSION=18.15.0
FROM node:$NODE_VERSION-slim as base

LABEL fly_launch_runtime="NodeJS"

# NodeJS app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install -y python-is-python3 pkg-config build-essential 

COPY <<-"EOF" /app/package.json
{
  "name": "server",
  "version": "1.0.0",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon index.js",
    "start": "nodemon index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "bcrypt": "^6.0.0",
    "body-parser": "^2.2.0",
    "cors": "^2.8.5",
    "dotenv": "^17.2.1",
    "express": "^5.1.0",
    "gridfs-stream": "^1.1.1",
    "helmet": "^8.1.0",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.18.0",
    "morgan": "^1.10.1",
    "multer": "^2.0.2",
    "multer-gridfs-storage": "^5.0.2",
    "nodemon": "^3.1.10"
  },
  "devDependencies": {
    "@flydotio/dockerfile": "^0.7.10"
  }
}
EOF

RUN npm install --legacy-peer-deps

# Copy application code
COPY --link . .

# Remove development dependencies
RUN npm prune --production --legacy-peer-deps

# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app /app

EXPOSE 3001
# Start the server by default, this can be overwritten at runtime
CMD [ "npm", "run", "start" ]



