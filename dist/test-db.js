"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("./generated/prisma"); // relative to your file
const prisma = new prisma_1.PrismaClient();
async function testConnection() {
    try {
        await prisma.$connect();
        console.log('✅ Connected to PostgreSQL successfully!');
    }
    catch (error) {
        console.error('❌ Connection failed:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
testConnection();
