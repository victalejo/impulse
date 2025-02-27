// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// Evitar múltiples instancias de Prisma Client en desarrollo por Hot Reloading
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;