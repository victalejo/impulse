# Utilizamos Node 18 en Alpine como base para reducir el tamaño de la imagen
FROM node:18-alpine AS base

# Fase de dependencias
FROM base AS deps
WORKDIR /app

# Instalamos las dependencias necesarias para paquetes nativos
RUN apk add --no-cache libc6-compat

# Copiamos los archivos de configuración del proyecto
COPY package.json package-lock.json* ./

# Instalamos las dependencias
RUN npm ci

# Fase de construcción
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Construimos la aplicación
RUN npm run build

# Fase de producción
FROM base AS runner
WORKDIR /app

# Configuramos el entorno para producción
ENV NODE_ENV production

# Creamos un usuario no privilegiado para ejecutar la aplicación
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiamos los archivos necesarios desde la fase de construcción
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Creamos directorio para las fuentes y aseguramos los permisos correctos
RUN mkdir -p /app/public/fonts && chown -R nextjs:nodejs /app

# Cambiamos al usuario no privilegiado
USER nextjs

# Exponemos el puerto que usará la aplicación
EXPOSE 3000

# Definimos la variable de entorno para el host
ENV HOSTNAME "0.0.0.0"

# Comando para iniciar la aplicación
CMD ["node", "server.js"]