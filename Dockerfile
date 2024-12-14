FROM node:20 AS react-build

WORKDIR /app

COPY frontend/package.json frontend/package-lock.json /app
RUN npm install

COPY frontend/ /app/
RUN npm run build

# Debugging: Show the output of the build step
RUN echo "Build output directory contents:" && ls -alh /app/dist

FROM openjdk:17-jdk-slim AS backend-build
RUN apt-get update && apt-get install -y maven

WORKDIR /app

COPY backend/pom.xml /app/
RUN mvn dependency:go-offline

COPY backend/src /app/src
RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim 

# Install nginx
RUN apt-get update && apt-get install -y nginx

# Clean Nginx's default content
RUN rm -rf /usr/share/nginx/html/*

# Copy the React build output into Nginx's serving directory
COPY --from=react-build /app/dist /var/www/html

# Print the contents of the /usr/share/nginx/html directory to verify
RUN echo "Contents of /usr/share/nginx/html:" && ls -alh /usr/share/nginx/html

# Copy the Java application jar to the /app directory
COPY --from=backend-build /app/target/mongodb-0.0.1-SNAPSHOT.jar /app/mongodb-0.0.1-SNAPSHOT.jar

EXPOSE 80
EXPOSE 8080

# Start nginx and the Java app in parallel
CMD ["sh", "-c", "nginx -g 'daemon off;' & java -jar /app/mongodb-0.0.1-SNAPSHOT.jar"]
