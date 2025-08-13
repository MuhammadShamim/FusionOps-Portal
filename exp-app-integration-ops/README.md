# FusionOps Mule API

This Mulesoft application serves both the FusionOps Angular frontend and provides backend API endpoints.

## Setup Instructions

1. Install Prerequisites:
   - Anypoint Studio 7.x or later
   - Java 8 or later
   - Maven 3.x

2. Import Project:
   - Open Anypoint Studio
   - File -> Import -> Anypoint Studio -> Anypoint Studio Project from File System
   - Select the project directory
   - Click "Finish"

3. Run Application:
   - Right-click the project in Package Explorer
   - Run As -> Mule Application
   - The application will start on port 8081

## Access Points

- Frontend Application: http://localhost:8081
- API Endpoints: http://localhost:8081/api/*

## Development

The static content is served from `src/main/resources/static/`. When making changes to the Angular application:

1. Build the Angular app with: `ng build --configuration production`
2. Copy the contents of `dist/FusionOps-Portal` to `src/main/resources/static/`
3. Restart the Mule application

## API Endpoints

- `GET /api/status` - Returns API status
- More endpoints to be added...