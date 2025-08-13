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

[INFO] Scanning for projects...
[INFO] 
[INFO] ------------------< com.fusionops:fusionops-mule-api >------------------
[INFO] Building fusionops-mule-api 1.0.0-SNAPSHOT
[INFO]   from pom.xml
[INFO] --------------------------[ mule-application ]--------------------------
[INFO] 
[INFO] --- clean:3.2.0:clean (default-clean-1) @ fusionops-mule-api ---
[INFO] Deleting C:\Github Repos\FusionOps-Portal\exp-app-integration-ops\target
[INFO] 
[INFO] --- clean:3.2.0:clean (default-clean) @ fusionops-mule-api ---
[INFO] 
[INFO] --- mule:4.1.0:clean (default-clean) @ fusionops-mule-api ---
[INFO] 
[INFO] --- mule:4.1.0:validate (default-validate) @ fusionops-mule-api ---
[INFO] 
[INFO] --- mule:4.1.0:initialize (default-initialize) @ fusionops-mule-api ---
[INFO] 
[INFO] --- mule:4.1.0:generate-sources (default-generate-sources) @ fusionops-mule-api ---
[INFO] 
[INFO] --- mule:4.1.0:process-sources (default-process-sources) @ fusionops-mule-api ---
[INFO] About to fetch required dependencies for artifact: com.fusionops:fusionops-mule-api:pom:1.0.0-SNAPSHOT. This may take a while...
[INFO] 
[INFO] --- resources:3.3.1:resources (default-resources) @ fusionops-mule-api ---
[INFO] Copying 11 resources from src\main\resources to target\classes
[INFO] 
[INFO] --- mule:4.1.0:process-resources (default-process-resources) @ fusionops-mule-api ---
[INFO] 
[INFO] --- compiler:3.11.0:compile (default-compile) @ fusionops-mule-api ---
[INFO] Nothing to compile - all classes are up to date
[INFO] 
[INFO] --- mule:4.1.0:compile (default-compile) @ fusionops-mule-api ---
[INFO] 
[INFO] --- mule:4.1.0:process-classes (default-process-classes) @ fusionops-mule-api ---
[INFO] About to fetch required dependencies for artifact: 05fe1ab0-77f4-11f0-954f-4e5f7015d691:05fe1ab0-77f4-11f0-954f-4e5f7015d691:pom:4.6.0. This may take a while...
[INFO] About to fetch required dependencies for artifact: 06b29da0-77f4-11f0-954f-4e5f7015d691:06b29da0-77f4-11f0-954f-4e5f7015d691:pom:4.6.0. This may take a while...
[INFO] About to fetch required dependencies for artifact: 06ef0a60-77f4-11f0-954f-4e5f7015d691:06ef0a60-77f4-11f0-954f-4e5f7015d691:pom:4.6.0. This may take a while...
[INFO] About to fetch required dependencies for artifact: 07316a90-77f4-11f0-954f-4e5f7015d691:07316a90-77f4-11f0-954f-4e5f7015d691:pom:4.6.0. This may take a while...
[INFO] About to fetch required dependencies for artifact: 07804de0-77f4-11f0-954f-4e5f7015d691:07804de0-77f4-11f0-954f-4e5f7015d691:pom:4.6.0. This may take a while...
[INFO] About to fetch required dependencies for artifact: 07b84dd0-77f4-11f0-954f-4e5f7015d691:07b84dd0-77f4-11f0-954f-4e5f7015d691:pom:4.6.0. This may take a while...
[INFO] About to fetch required dependencies for artifact: 07f1d460-77f4-11f0-954f-4e5f7015d691:07f1d460-77f4-11f0-954f-4e5f7015d691:pom:4.6.0. This may take a while...
[INFO] ------------------------------------------------------------------------
[INFO] BUILD FAILURE
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  7.332 s
[INFO] Finished at: 2025-08-12T22:17:24-05:00
[INFO] ------------------------------------------------------------------------
[ERROR] Failed to execute goal org.mule.tools.maven:mule-maven-plugin:4.1.0:process-classes (default-process-classes) on project fusionops-mule-api: Execution default-process-classes of goal org.mule.tools.maven:mule-maven-plugin:4.1.0:process-classes failed: There were '6' errors while parsing the given file 'fusionops-mule-api.xml'.
[ERROR] Full list:
[ERROR] org.xml.sax.SAXParseException; lineNumber: 26; columnNumber: 72; cvc-complex-type.3.2.2: Attribute 'mediaType' is not allowed to appear in element 'set-payload'.
[ERROR] org.xml.sax.SAXParseException; lineNumber: 33; columnNumber: 97; cvc-complex-type.3.2.2: Attribute 'mediaType' is not allowed to appear in element 'set-payload'.
[ERROR] org.xml.sax.SAXParseException; lineNumber: 36; columnNumber: 83; cvc-complex-type.3.2.2: Attribute 'mediaType' is not allowed to appear in element 'set-payload'.
[ERROR] org.xml.sax.SAXParseException; lineNumber: 39; columnNumber: 91; cvc-complex-type.3.2.2: Attribute 'mediaType' is not allowed to appear in element 'set-payload'.
[ERROR] org.xml.sax.SAXParseException; lineNumber: 48; columnNumber: 84; cvc-complex-type.3.2.2: Attribute 'mediaType' is not allowed to appear in element 'set-payload'.
[ERROR] org.xml.sax.SAXParseException; lineNumber: 55; columnNumber: 72; cvc-complex-type.3.2.2: Attribute 'mediaType' is not allowed to appear in element 'set-payload'.
[ERROR] -> [Help 1]
[ERROR] 
[ERROR] To see the full stack trace of the errors, re-run Maven with the -e switch.
[ERROR] Re-run Maven using the -X switch to enable full debug logging.