FROM openapitools/openapi-generator-cli:v7.20.0 AS api-client
WORKDIR /workspace/code/demo-app-ui
COPY bff-service/src/main/resources/openapi/bff-api.yml ../bff-service/src/main/resources/openapi/bff-api.yml
RUN /opt/java/openjdk/bin/java -jar /opt/openapi-generator/modules/openapi-generator-cli/target/openapi-generator-cli.jar generate \
	-i ../bff-service/src/main/resources/openapi/bff-api.yml \
	-g typescript-fetch \
	-o src/lib/api/generated \
	--additional-properties=supportsES6=true,typescriptThreePlus=true

FROM node:20-alpine
WORKDIR /app
COPY demo-app-ui/package*.json ./
RUN npm ci
COPY demo-app-ui/ ./
COPY --from=api-client /workspace/code/demo-app-ui/src/lib/api/generated ./src/lib/api/generated
EXPOSE 3001
CMD ["npx", "next", "dev", "-H", "0.0.0.0", "-p", "3001"]
