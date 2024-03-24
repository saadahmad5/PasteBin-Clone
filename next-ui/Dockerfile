FROM node:18-alpine

# ENV NEXT_PUBLIC_SERVICE_HOST "http://localhost:5001"
ENV NEXT_PUBLIC_SERVICE_HOST "http://172.171.165.45:5000"

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]