"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("./models/prisma");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
async function testConnection() {
    try {
        await prisma_1.prisma.$connect();
        console.log('✅ Connected to PostgreSQL successfully!');
        const hashedPassword = await bcryptjs_1.default.hash('admin123', 10);
        const user = await prisma_1.prisma.user.create({
            data: {
                email: 'admin@example.com',
                password: hashedPassword,
                name: 'Admin User',
                role: 'admin'
            }
        });
        console.log('✅ Admin user created:', user);
        const donation = await prisma_1.prisma.donation.create({
            data: {
                title: 'Pembangunan Masjid',
                description: 'Dana untuk pembangunan masjid Al-Furqon',
                targetAmount: 1000000000,
                amount: 0
            }
        });
        console.log('✅ Test donation created:', donation);
    }
    catch (error) {
        console.error('❌ Error:', error);
    }
    finally {
        await prisma_1.prisma.$disconnect();
    }
}
testConnection();
//# sourceMappingURL=test-db.js.map