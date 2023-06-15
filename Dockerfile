FROM node:19-alpine AS installer
WORKDIR /app

# Install PNPM and Turbo
ENV PNPM_HOME=/usr/local/bin
ENV PATH="${PATH}:${PNPM_HOME}"

RUN apk add --no-cache libc6-compat
RUN apk update
RUN --mount=type=cache,id=pnpm-store,target=/root/.pnpm-store npm install -g pnpm


# Install dependencies and build app
FROM installer AS builder
WORKDIR /app

COPY package*.json .
COPY pnpm-lock.yaml .

RUN pnpm install

COPY . .

RUN pnpm run deploy


FROM nginx:alpine AS runner
WORKDIR /app

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD nginx -g 'daemon off;'
