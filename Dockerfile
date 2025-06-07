
FROM oven/bun:1.1.0

WORKDIR /app

COPY bun.lockb package.json ./
RUN bun install

COPY . .

RUN bun run build

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node" , "dist/server.js"]