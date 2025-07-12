# Quick Setup Guide - Al-Furqon Backend

## 🚀 Setup Backend dalam 5 Menit

### 1. Prerequisites
```bash
# Pastikan sudah install Node.js dan Yarn
node --version   # v18.0.0 atau lebih
yarn --version   # 1.22.0 atau lebih
```

### 2. Clone & Install
```bash
# Clone repository
git clone <repository-url>
cd BE_Al-Furqon

# Install dependencies
yarn install
```

### 3. Environment Setup
```bash
# Copy .env.example ke .env
cp .env.example .env

# Edit .env sesuai kebutuhan (optional, default sudah siap untuk development)
# DATABASE_URL="file:./dev.db"
# PORT=5000
# JWT_SECRET=your-secret-key
```

### 4. Database Setup
```bash
# Generate Prisma Client
yarn prisma:generate

# Run migrations
yarn prisma:migrate

# Seed database dengan data awal
yarn prisma:seed
```

### 5. Start Server
```bash
# Development mode
yarn dev

# Server akan berjalan di http://localhost:5000
# Swagger documentation: http://localhost:5000/api-docs
```

## 🧪 Test API

### Quick Test dengan Browser
```
http://localhost:5000/                    # Welcome message
http://localhost:5000/health              # Health check
http://localhost:5000/api/v1/home/dashboard  # Dashboard data
http://localhost:5000/api-docs            # Swagger UI
```

### Test dengan cURL
```bash
# Dashboard data
curl http://localhost:5000/api/v1/home/dashboard

# Statistics
curl http://localhost:5000/api/v1/statistics/public

# Articles
curl http://localhost:5000/api/v1/articles

# Donations
curl http://localhost:5000/api/v1/donations

# News
curl http://localhost:5000/api/v1/news
```

## 📱 Frontend Integration

### Environment Variables untuk Frontend
```bash
# Next.js (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_UPLOAD_URL=http://localhost:5000/uploads

# React (.env)
REACT_APP_API_URL=http://localhost:5000
REACT_APP_UPLOAD_URL=http://localhost:5000/uploads
```

### Quick API Client
```javascript
// utils/api.js
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const api = {
  // Dashboard
  getDashboard: () => fetch(`${API_URL}/api/v1/home/dashboard`).then(r => r.json()),
  
  // Statistics
  getStatistics: () => fetch(`${API_URL}/api/v1/statistics/public`).then(r => r.json()),
  
  // Articles
  getArticles: (page = 1, limit = 10) => 
    fetch(`${API_URL}/api/v1/articles?page=${page}&limit=${limit}&published=true`)
      .then(r => r.json()),
  
  getArticle: (id) => fetch(`${API_URL}/api/v1/articles/${id}`).then(r => r.json()),
  
  // Donations
  getDonations: (page = 1, limit = 10) => 
    fetch(`${API_URL}/api/v1/donations?page=${page}&limit=${limit}`)
      .then(r => r.json()),
  
  // News
  getNews: (page = 1, limit = 10) => 
    fetch(`${API_URL}/api/v1/news?page=${page}&limit=${limit}`)
      .then(r => r.json()),
};

// Usage example:
// api.getDashboard().then(data => console.log(data));
```

## 🛠️ Development Commands

```bash
# Start development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start

# Database commands
yarn prisma:studio     # Open Prisma Studio
yarn prisma:reset      # Reset database
yarn prisma:migrate    # Run migrations
yarn prisma:generate   # Generate Prisma Client
yarn prisma:seed       # Seed database

# Testing
yarn test

# Lint & Format
yarn lint
yarn format
```

## 📚 Default Test Data

Setelah menjalankan `yarn prisma:seed`, database akan terisi dengan:

### Articles (5 artikel)
- "Sejarah Masjid Al-Furqon"
- "Manfaat Sholat Berjamaah"
- "Pentingnya Zakat dalam Islam"
- "Hikmah Puasa Ramadhan"
- "Adab Berkunjung ke Masjid"

### Donations (3 donasi)
- "Renovasi Masjid Al-Furqon" (Target: Rp 100,000,000)
- "Pengadaan Al-Quran" (Target: Rp 25,000,000)
- "Santunan Anak Yatim" (Target: Rp 50,000,000)

### News (3 berita)
- "Jadwal Sholat Idul Fitri 2025"
- "Kajian Rutin Setiap Jumat"
- "Program Tahfidz Al-Quran Dibuka"

### User Admin
- Email: `admin@alfurqon.com`
- Password: `admin123`

## 🔗 Endpoint Summary

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Welcome message | ❌ |
| GET | `/health` | Health check | ❌ |
| GET | `/api/v1/home/dashboard` | Dashboard data | ❌ |
| GET | `/api/v1/statistics/public` | Public statistics | ❌ |
| GET | `/api/v1/articles` | List articles | ❌ |
| GET | `/api/v1/articles/:id` | Get article | ❌ |
| POST | `/api/v1/articles` | Create article | ✅ |
| PUT | `/api/v1/articles/:id` | Update article | ✅ |
| DELETE | `/api/v1/articles/:id` | Delete article | ✅ |
| GET | `/api/v1/donations` | List donations | ❌ |
| GET | `/api/v1/donations/:id` | Get donation | ❌ |
| POST | `/api/v1/donations` | Create donation | ✅ |
| PUT | `/api/v1/donations/:id` | Update donation | ✅ |
| DELETE | `/api/v1/donations/:id` | Delete donation | ✅ |
| GET | `/api/v1/news` | List news | ❌ |
| GET | `/api/v1/news/:id` | Get news | ❌ |
| POST | `/api/v1/news` | Create news | ✅ |
| PUT | `/api/v1/news/:id` | Update news | ✅ |
| DELETE | `/api/v1/news/:id` | Delete news | ✅ |
| POST | `/api/v1/auth/login` | Login | ❌ |
| POST | `/api/v1/auth/register` | Register | ✅ |
| GET | `/api/v1/auth/me` | Get current user | ✅ |
| POST | `/api/v1/upload/image` | Upload image | ✅ |

## 🌐 CORS Configuration

Backend dikonfigurasi untuk development dengan CORS yang memungkinkan akses dari:
- `http://localhost:3000` (Next.js default)
- `http://localhost:3001` (Alternative port)

Jika frontend berjalan di port lain, tambahkan di `.env`:
```
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001,http://localhost:8080
```

## 📂 File Structure untuk Frontend Developer

```
src/
├── controllers/        # Business logic
│   ├── api/           # API controllers
│   └── auth.ts        # Authentication
├── middleware/        # Express middleware
├── models/           # Prisma models
├── routes/           # API routes
├── services/         # Business services
├── types/           # TypeScript types
├── utils/           # Utility functions
├── config/          # Configuration files
└── app.ts           # Express app configuration

prisma/
├── schema.prisma     # Database schema
├── migrations/       # Database migrations
└── seed.ts          # Seed data

uploads/             # Uploaded files
```

## 🚨 Troubleshooting

### Port sudah digunakan
```bash
# Kill process yang menggunakan port 5000
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

### Database error
```bash
# Reset database
yarn prisma:reset

# Regenerate Prisma Client
yarn prisma:generate
```

### Module not found
```bash
# Clear cache dan reinstall
rm -rf node_modules
rm yarn.lock
yarn install
```

### CORS error dari frontend
1. Pastikan backend berjalan di port 5000
2. Pastikan frontend di allowed origins
3. Check browser console untuk detail error

## 📞 Support

- **Swagger Documentation**: http://localhost:5000/api-docs
- **Prisma Studio**: `yarn prisma:studio`
- **Database Viewer**: http://localhost:5555 (setelah prisma studio)
- **API Testing**: Gunakan Postman, Thunder Client, atau Insomnia

---

**Ready to go!** 🚀 Backend siap digunakan untuk development frontend.
