FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN if [ ! -f src/index.js ]; then cp src/index.jsx src/index.js; fi
RUN npm run build
CMD ["npm", "start"]