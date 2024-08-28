FROM node:lts AS build-stage

WORKDIR /app

COPY ./ /app/
RUN npm install && \
    npm run build && \
    rm -rf /app/node_modules

FROM nginx:stable

COPY --from=build-stage /app/dist/food_buddy/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

# Create a non-root user and use it
RUN groupadd -r nginxuser && useradd -r -g nginxuser nginxuser

# Create necessary directories and set permissions
RUN mkdir -p /var/cache/nginx/client_temp && \
    chown -R nginxuser:nginxuser /var/cache/nginx

# Switch to the new user
USER nginxuser

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
