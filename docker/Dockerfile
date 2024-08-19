FROM node as builder

WORKDIR /app

# Copy the entire workspace from the project root
COPY package.json /app/
COPY packages /app/packages
COPY . .

RUN npm install --workspaces
RUN npm run build --workspaces

FROM node

RUN apt-get update && apt-get install -y curl

# Copy necessary files from the builder stage
COPY --from=builder /app /app

WORKDIR /app/packages/backend

# Install only production dependencies (skia-canvas requires a reinstall)
RUN rm -rf /node_modules && npm install --only=production

# Expose the port the app runs on
EXPOSE 3000

# Health check
HEALTHCHECK --interval=15s --timeout=5s --start-period=20s --retries=3 CMD curl http://localhost:3000 || exit 1

# Set environment variable
ENV NODE_ENV=production

# Start the application
CMD ["node", "dist/src/server.js"]