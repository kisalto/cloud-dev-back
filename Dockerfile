FROM node:24-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build

RUN echo "=== CONTEUDO DE /app ===" && ls -la /app
RUN echo "=== CONTEUDO DE /app/dist ===" && ls -la /app/dist
RUN test -f /app/dist/server.js

EXPOSE 8080

CMD ["node", "/app/dist/server.js"]