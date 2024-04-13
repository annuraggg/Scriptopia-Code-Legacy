# Use a lightweight base image
FROM node:16-alpine

# Set environment variables and create a non-root user
ENV NODE_ENV=production
RUN addgroup -S myuser && adduser -S myuser -G myuser

# Set the working directory
WORKDIR /app

# Install only necessary dependencies
RUN apk --no-cache add python3 py3-pip gcc g++ make

# Copy package.json and package-lock.json separately
COPY package*.json ./

# Install dependencies as the non-root user
USER myuser
RUN npm install --quiet --no-progress && \
    npm cache clean --force

# Copy the rest of the application code
COPY . .

# Expose port and specify default command
EXPOSE 3000
CMD ["npm", "start"]
