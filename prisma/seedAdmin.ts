import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function seedAdminUsers() {
  console.log('🌱 Seeding admin users...');

  // Hash password for admin users
  const hashedPassword = await bcrypt.hash('admin123', 12);

  // Create Super Admin
  const superAdmin = await prisma.user.upsert({
    where: { email: 'superadmin@alfurqon.com' },
    update: {},
    create: {
      username: 'superadmin',
      email: 'superadmin@alfurqon.com',
      name: 'Super Admin',
      password: hashedPassword,
      role: 'super_admin',
      permissions: JSON.stringify([
        'users.create',
        'users.read',
        'users.update',
        'users.delete',
        'articles.create',
        'articles.read',
        'articles.update',
        'articles.delete',
        'donations.create',
        'donations.read',
        'donations.update',
        'donations.delete',
        'news.create',
        'news.read',
        'news.update',
        'news.delete',
        'transactions.read',
        'files.upload',
        'analytics.read'
      ]),
      isActive: true
    }
  });

  // Create Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@alfurqon.com' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@alfurqon.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'admin',
      permissions: JSON.stringify([
        'articles.create',
        'articles.read',
        'articles.update',
        'articles.delete',
        'donations.create',
        'donations.read',
        'donations.update',
        'donations.delete',
        'news.create',
        'news.read',
        'news.update',
        'news.delete',
        'transactions.read',
        'files.upload',
        'analytics.read'
      ]),
      isActive: true
    }
  });

  // Create Editor
  const editor = await prisma.user.upsert({
    where: { email: 'editor@alfurqon.com' },
    update: {},
    create: {
      username: 'editor',
      email: 'editor@alfurqon.com',
      name: 'Editor User',
      password: hashedPassword,
      role: 'editor',
      permissions: JSON.stringify([
        'articles.create',
        'articles.read',
        'articles.update',
        'news.create',
        'news.read',
        'news.update',
        'files.upload'
      ]),
      isActive: true
    }
  });

  console.log('✅ Admin users created:');
  console.log(`   Super Admin: ${superAdmin.email} / ${superAdmin.username}`);
  console.log(`   Admin: ${admin.email} / ${admin.username}`);
  console.log(`   Editor: ${editor.email} / ${editor.username}`);
  console.log(`   Password untuk semua: admin123`);

  return { superAdmin, admin, editor };
}

async function main() {
  try {
    console.log('🚀 Starting database seed...');
    
    await seedAdminUsers();
    
    console.log('✅ Database seeding completed successfully!');
    console.log('');
    console.log('🔑 Login credentials:');
    console.log('   Super Admin: superadmin / admin123');
    console.log('   Admin: admin / admin123');
    console.log('   Editor: editor / admin123');
    console.log('');
    console.log('🌐 Admin Panel URL: http://localhost:5000/api/v1/admin/auth/login');
    
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed function
if (require.main === module) {
  main()
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

export { seedAdminUsers, main };
