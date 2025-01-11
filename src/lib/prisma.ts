import { PrismaClient } from '@prisma/client'

// Declares a global variable prisma of type PrismaClient | undefined.
declare global{
    var prisma:PrismaClient | undefined
}
// Reuses the existing PrismaClient instance (globalThis.prisma) if it exists.
// Otherwise, creates a new PrismaClient instance.
export const client=globalThis.prisma || new PrismaClient()

// In non-production environments, assigns the PrismaClient instance to globalThis.prisma to avoid creating multiple instances during hot-reloading in development.
if(process.env.NODE_ENV!='production')globalThis.prisma=client

// This code initializes and manages a single instance of the PrismaClient for interacting with a database,
//  ensuring efficient usage of resources, especially during development.
// This approach prevents connection issues caused by creating multiple PrismaClient instances in development.






