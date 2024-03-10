FROM ubuntu:18.04

# Create a non-root user
RUN groupadd -r myuser && useradd -r -g myuser myuser

# Switch to the non-root user
USER myuser

# Update and install dependencies
RUN apt-get update && \
    apt-get -y --no-install-recommends install gcc mono-mcs golang-go \
        default-jre default-jdk nodejs npm \
        python3-pip python3 curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set environment variables, copy files, and set working directory
ENV NODE_VERSION=16.13.2
WORKDIR /app
COPY . /app

# Install dependencies
RUN npm install && \
    npm cache clean --force

# Expose port and specify default command
EXPOSE 3000
CMD ["npm", "start"]
