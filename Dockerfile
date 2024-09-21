# Base stage for installing pnpm and dependencies
FROM node:18 AS base

WORKDIR /app

# Install pnpm globally using the recommended installation script
RUN wget -qO- https://get.pnpm.io/install.sh | SHELL="$(which bash)" bash -

# Set up the pnpm environment
ENV PATH="/root/.local/share/pnpm:$PATH"
ENV PNPM_HOME="/root/.local/share/pnpm"

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Build stage
FROM base AS build

# Copy the rest of the files
COPY . .

# Build the application
RUN pnpm run build

# Production stage
FROM node:18 AS production

WORKDIR /app

# Copy the build and node_modules from the build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/src ./src

# Copy package.json and server.js
COPY --from=build /app/package*.json ./
COPY --from=build /app/server.js ./server.js

# Expose the port and set environment variable
EXPOSE 3333
ENV NODE_ENV=production

# Start the application
CMD ["node", "server"]
