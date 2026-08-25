# Build stage
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Serve stage
FROM nginx:alpine
COPY nginx.docker.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
COPY docker-env.sh /docker-entrypoint.d/40-env.sh
# Strip Windows line endings in case of a CRLF checkout, and make executable
RUN sed -i 's/\r$//' /docker-entrypoint.d/40-env.sh && chmod +x /docker-entrypoint.d/40-env.sh
EXPOSE 80
