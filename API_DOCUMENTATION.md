# API Documentation - Al-Furqon Backend

## 📋 Overview

Dokumentasi lengkap API untuk Backend Masjid Al-Furqon yang dibangun dengan Node.js, Express, TypeScript, dan Prisma ORM.

## 🌐 Base URL

- **Development**: `http://localhost:5000`
- **Swagger Documentation**: `http://localhost:5000/api-docs`

## 🔐 Authentication

API menggunakan JWT (JSON Web Token) untuk autentikasi. Token harus disertakan dalam header request:

```
Authorization: Bearer <your-jwt-token>
```

## 📑 API Endpoints

### 🏠 Root & Health Check

#### Welcome Message
```http
GET /
```

**Response:**
```json
{
  "success": true,
  "message": "Welcome to Al-Furqon Backend API",
  "version": "1.0.0",
  "endpoints": {
    "health": "/health",
    "dashboard": "/api/v1/home/dashboard",
    "statistics": "/api/v1/statistics/public",
    "articles": "/api/v1/articles",
    "donations": "/api/v1/donations",
    "news": "/api/v1/news",
    "auth": "/api/v1/auth",
    "admin": "/api/v1/admin",
    "documentation": "/api-docs"
  },
  "documentation": "API untuk Content Management System Masjid Al-Furqon"
}
```

#### Health Check
```http
GET /health
```

**Response:**
```json
{
  "success": true,
  "message": "Al-Furqon Backend is running",
  "environment": "development",
  "timestamp": "2025-01-27T10:30:00.000Z",
  "port": 5000
}
```

### 🏠 Home Dashboard

#### Get Dashboard Data
```http
GET /api/v1/home/dashboard
```

**Description:** Mengambil data dashboard yang berisi statistik dan konten terbaru untuk homepage

**Response:**
```json
{
  "success": true,
  "data": {
    "statistics": {
      "totalArticles": 25,
      "activeDonations": 5,
      "totalNews": 15,
      "totalUsers": 100
    },
    "latestArticles": [
      {
        "id": "clx123abc",
        "title": "Judul Artikel Terbaru",
        "slug": "judul-artikel-terbaru",
        "description": "Ringkasan artikel yang menarik...",
        "image": "article-image.jpg",
        "category": "kegiatan",
        "publishedAt": "2025-01-27T10:00:00.000Z",
        "authorName": "Admin",
        "authorAvatar": "admin-avatar.jpg"
      }
    ],
    "latestNews": [
      {
        "id": "clx456def",
        "title": "Berita Terbaru Masjid",
        "slug": "berita-terbaru-masjid",
        "description": "Informasi terkini tentang kegiatan masjid...",
        "image": "news-image.jpg",
        "priority": "high",
        "publishedAt": "2025-01-27T09:00:00.000Z"
      }
    ],
    "activeDonations": [
      {
        "id": "clx789ghi",
        "title": "Donasi Renovasi Masjid",
        "slug": "donasi-renovasi-masjid",
        "description": "Mari berpartisipasi dalam renovasi masjid...",
        "image": "donation-image.jpg",
        "targetAmount": 100000000,
        "collectedAmount": 75000000,
        "status": "active",
        "endDate": "2025-12-31T23:59:59.000Z"
      }
    ]
  }
}
```

### 📊 Statistics

#### Get Public Statistics
```http
GET /api/v1/statistics/public
```

**Description:** Mengambil statistik publik untuk ditampilkan di website

**Response:**
```json
{
  "success": true,
  "data": {
    "totalArticles": 25,
    "activeDonations": 5,
    "totalDonationTarget": 500000000,
    "totalDonationCollected": 350000000,
    "totalNews": 15,
    "donationProgress": 70
  }
}
```

### 📰 Articles

#### Get All Articles
```http
GET /api/v1/articles
```

**Query Parameters:**
- `category` (string, optional): Filter berdasarkan kategori (kegiatan, berita, sumbangan, fasilitas, profil, kajian)
- `limit` (number, optional): Jumlah item per halaman (default: 10)
- `page` (number, optional): Halaman yang diinginkan (default: 1)

**Example:**
```http
GET /api/v1/articles?category=kegiatan&page=1&limit=10
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "clx123abc",
      "title": "Judul Artikel",
      "slug": "judul-artikel",
      "description": "Ringkasan artikel...",
      "image": "article-image.jpg",
      "category": "kegiatan",
      "publishedAt": "2025-01-27T10:00:00.000Z",
      "authorName": "Admin",
      "authorAvatar": "admin-avatar.jpg"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

#### Get Article by ID
```http
GET /api/v1/articles/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "clx123abc",
    "title": "Judul Artikel",
    "slug": "judul-artikel",
    "description": "Ringkasan artikel...",
    "content": "Konten lengkap artikel...",
    "image": "article-image.jpg",
    "category": "kegiatan",
    "status": "published",
    "publishedAt": "2025-01-27T10:00:00.000Z",
    "authorName": "Admin",
    "authorAvatar": "admin-avatar.jpg",
    "views": 100,
    "likes": 25,
    "featured": false,
    "tags": ["masjid", "kegiatan", "komunitas"],
    "createdAt": "2025-01-27T10:00:00.000Z",
    "updatedAt": "2025-01-27T10:30:00.000Z"
  }
}
```

#### Get Article by Slug
```http
GET /api/v1/articles/slug/:slug
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "clx123abc",
    "title": "Judul Artikel",
    "slug": "judul-artikel",
    "description": "Ringkasan artikel...",
    "content": "Konten lengkap artikel...",
    "image": "article-image.jpg",
    "category": "kegiatan",
    "status": "published",
    "publishedAt": "2025-01-27T10:00:00.000Z",
    "authorName": "Admin"
  }
}
```

#### Get Featured Articles
```http
GET /api/v1/articles/featured
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "clx123abc",
      "title": "Artikel Unggulan",
      "slug": "artikel-unggulan",
      "description": "Artikel pilihan redaksi...",
      "image": "featured-article.jpg",
      "category": "kegiatan",
      "publishedAt": "2025-01-27T10:00:00.000Z",
      "featured": true
    }
  ]
}
```

#### Create Article (For Seeding)
```http
POST /api/v1/articles
```

**Request Body:**
```json
{
  "title": "Judul Artikel Baru",
  "content": "Konten lengkap artikel...",
  "excerpt": "Ringkasan artikel...",
  "imageUrl": "http://localhost:5000/uploads/new-image.jpg",
  "published": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Artikel berhasil dibuat",
  "data": {
    "id": "clx999new",
    "title": "Judul Artikel Baru",
    "slug": "judul-artikel-baru",
    "description": "Ringkasan artikel...",
    "content": "Konten lengkap artikel...",
    "image": "new-image.jpg",
    "category": "kegiatan",
    "status": "published",
    "publishedAt": "2025-01-27T10:00:00.000Z",
    "createdAt": "2025-01-27T10:00:00.000Z",
    "updatedAt": "2025-01-27T10:00:00.000Z"
  }
}
```

### 💰 Donations

#### Get All Donations
```http
GET /api/v1/donations
```

**Query Parameters:**
- `category` (string, optional): Filter berdasarkan kategori donasi
- `status` (string, optional): Filter berdasarkan status (active, completed, suspended) - default: active

**Example:**
```http
GET /api/v1/donations?status=active&category=renovasi
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "clx789ghi",
      "title": "Donasi Renovasi Masjid",
      "description": "Mari berpartisipasi dalam renovasi masjid untuk kenyamanan ibadah bersama...",
      "image": "donation-image.jpg",
      "targetAmount": 100000000,
      "collectedAmount": 75000000,
      "endDate": "2025-12-31T23:59:59.000Z",
      "createdAt": "2025-01-01T00:00:00.000Z",
      "progress": 75,
      "remainingAmount": 25000000
    }
  ]
}
```

#### Get Donation by ID
```http
GET /api/v1/donations/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "clx789ghi",
    "title": "Donasi Renovasi Masjid",
    "slug": "donasi-renovasi-masjid",
    "description": "Mari berpartisipasi dalam renovasi masjid untuk kenyamanan ibadah bersama...",
    "detail": "Detail lengkap tentang rencana renovasi masjid...",
    "image": "donation-image.jpg",
    "targetAmount": 100000000,
    "collectedAmount": 75000000,
    "status": "active",
    "startDate": "2025-01-01T00:00:00.000Z",
    "endDate": "2025-12-31T23:59:59.000Z",
    "bankName": "Bank Mandiri",
    "accountNumber": "1234567890",
    "accountName": "Masjid Al-Furqon",
    "qrisCode": "qris-donation.png",
    "totalDonors": 150,
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-27T10:00:00.000Z"
  }
}
```

#### Get Donation by Slug
```http
GET /api/v1/donations/slug/:slug
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "clx789ghi",
    "title": "Donasi Renovasi Masjid",
    "slug": "donasi-renovasi-masjid",
    "description": "Mari berpartisipasi dalam renovasi masjid...",
    "detail": "Detail lengkap tentang rencana renovasi masjid...",
    "image": "donation-image.jpg",
    "targetAmount": 100000000,
    "collectedAmount": 75000000,
    "status": "active",
    "endDate": "2025-12-31T23:59:59.000Z"
  }
}
```

#### Get Active Donations
```http
GET /api/v1/donations/active
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "clx789ghi",
      "title": "Donasi Renovasi Masjid",
      "description": "Mari berpartisipasi dalam renovasi masjid...",
      "image": "donation-image.jpg",
      "targetAmount": 100000000,
      "collectedAmount": 75000000,
      "status": "active",
      "endDate": "2025-12-31T23:59:59.000Z",
      "progress": 75
    }
  ]
}
```

#### Create Donation (For Seeding)
```http
POST /api/v1/donations
```

**Request Body:**
```json
{
  "title": "Donasi Baru",
  "description": "Deskripsi donasi yang akan dibuat...",
  "targetAmount": 50000000,
  "collectedAmount": 0,
  "imageUrl": "donation-image.jpg",
  "endDate": "2025-12-31T23:59:59.000Z"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Donasi berhasil dibuat",
  "data": {
    "id": "clx999new",
    "title": "Donasi Baru",
    "slug": "donasi-baru",
    "description": "Deskripsi donasi yang akan dibuat...",
    "targetAmount": 50000000,
    "collectedAmount": 0,
    "status": "active",
    "image": "donation-image.jpg",
    "createdAt": "2025-01-27T10:00:00.000Z",
    "updatedAt": "2025-01-27T10:00:00.000Z"
  }
}
```

### 📢 News

#### Get All News
```http
GET /api/v1/news
```

**Query Parameters:**
- `priority` (string, optional): Filter berdasarkan prioritas (high, medium, low)
- `limit` (number, optional): Jumlah item per halaman (default: 10)

**Example:**
```http
GET /api/v1/news?priority=high&limit=5
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "clx456def",
      "title": "Berita Terbaru Masjid",
      "content": "Konten lengkap berita tentang kegiatan masjid...",
      "priority": "high",
      "publishedAt": "2025-01-27T09:00:00.000Z",
      "createdAt": "2025-01-27T09:00:00.000Z"
    }
  ]
}
```

#### Get News by ID
```http
GET /api/v1/news/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "clx456def",
    "title": "Berita Terbaru Masjid",
    "slug": "berita-terbaru-masjid",
    "description": "Ringkasan berita...",
    "content": "Konten lengkap berita tentang kegiatan masjid yang akan datang...",
    "image": "news-image.jpg",
    "category": "umum",
    "priority": "high",
    "publishedAt": "2025-01-27T09:00:00.000Z",
    "authorName": "Admin",
    "views": 150,
    "summary": "Ringkasan singkat berita...",
    "createdAt": "2025-01-27T09:00:00.000Z",
    "updatedAt": "2025-01-27T09:30:00.000Z"
  }
}
```

#### Get News by Slug
```http
GET /api/v1/news/slug/:slug
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "clx456def",
    "title": "Berita Terbaru Masjid",
    "slug": "berita-terbaru-masjid",
    "description": "Ringkasan berita...",
    "content": "Konten lengkap berita...",
    "image": "news-image.jpg",
    "category": "umum",
    "priority": "high",
    "publishedAt": "2025-01-27T09:00:00.000Z"
  }
}
```

#### Get Latest News
```http
GET /api/v1/news/latest
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "clx456def",
      "title": "Berita Terbaru Masjid",
      "slug": "berita-terbaru-masjid",
      "description": "Informasi terkini...",
      "image": "news-image.jpg",
      "priority": "high",
      "publishedAt": "2025-01-27T09:00:00.000Z"
    }
  ]
}
```

#### Get Top News
```http
GET /api/v1/news/top
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "clx456def",
      "title": "Berita Unggulan",
      "slug": "berita-unggulan",
      "description": "Berita dengan prioritas tinggi...",
      "image": "top-news.jpg",
      "priority": "high",
      "publishedAt": "2025-01-27T09:00:00.000Z",
      "views": 1000
    }
  ]
}
```

#### Create News (For Seeding)
```http
POST /api/v1/news
```

**Request Body:**
```json
{
  "title": "Berita Baru",
  "content": "Konten lengkap berita...",
  "excerpt": "Ringkasan berita...",
  "imageUrl": "news-image.jpg"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Berita berhasil dibuat",
  "data": {
    "id": "clx999new",
    "title": "Berita Baru",
    "slug": "berita-baru",
    "description": "Ringkasan berita...",
    "content": "Konten lengkap berita...",
    "image": "news-image.jpg",
    "category": "umum",
    "priority": "medium",
    "publishedAt": "2025-01-27T10:00:00.000Z",
    "createdAt": "2025-01-27T10:00:00.000Z",
    "updatedAt": "2025-01-27T10:00:00.000Z"
  }
}
```

### 🔐 Authentication

#### Basic Authentication (Legacy)
```http
POST /api/v1/auth/login
```

**Request Body:**
```json
{
  "email": "admin@alfurqon.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "clx999xyz",
      "email": "admin@alfurqon.com",
      "role": "admin",
      "name": "Administrator"
    }
  }
}
```

#### Register (Legacy)
```http
POST /api/v1/auth/register
```

**Request Body:**
```json
{
  "email": "user@alfurqon.com",
  "password": "password123",
  "name": "User Name",
  "role": "user"
}
```

### 🛡️ Admin Authentication

#### Admin Login
```http
POST /api/v1/admin/auth/login
```

**Request Body:**
```json
{
  "username": "admin@alfurqon.com",
  "password": "admin123",
  "rememberMe": false
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "clx999xyz",
      "username": "admin",
      "email": "admin@alfurqon.com",
      "name": "Administrator",
      "role": "super_admin",
      "permissions": ["create_article", "edit_article", "delete_article"],
      "isActive": true,
      "lastLogin": "2025-01-27T10:00:00.000Z",
      "loginCount": 15,
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-27T10:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 86400,
    "permissions": ["create_article", "edit_article", "delete_article"]
  }
}
```

#### Refresh Token
```http
POST /api/v1/admin/auth/refresh
```

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Token refreshed successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 86400
  }
}
```

#### Admin Logout
```http
POST /api/v1/admin/auth/logout
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "success": true,
  "message": "Logout successful",
  "data": null
}
```

#### Get Current Admin User
```http
GET /api/v1/admin/auth/me
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "success": true,
  "message": "Current user retrieved successfully",
  "data": {
    "id": "clx999xyz",
    "username": "admin",
    "email": "admin@alfurqon.com",
    "name": "Administrator",
    "role": "super_admin",
    "permissions": ["create_article", "edit_article", "delete_article"],
    "isActive": true,
    "lastLogin": "2025-01-27T10:00:00.000Z"
  }
}
```

#### Refresh All Tokens (Super Admin Only)
```http
POST /api/v1/admin/auth/refresh-all
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "success": true,
  "message": "All admin tokens refreshed successfully",
  "data": {
    "refreshedCount": 5,
    "users": [
      {
        "userId": "clx999xyz",
        "username": "admin",
        "email": "admin@alfurqon.com",
        "role": "super_admin"
      }
    ]
  }
}
```

#### Logout All Sessions (Super Admin Only)
```http
POST /api/v1/admin/auth/logout-all
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "success": true,
  "message": "All admin sessions logged out successfully",
  "data": null
}
```

#### Debug Authentication
```http
GET /api/v1/admin/auth/debug
```

**Response:**
```json
{
  "success": true,
  "message": "Debug information retrieved",
  "data": {
    "timestamp": "2025-01-27T10:00:00.000Z",
    "hasAuthHeader": true,
    "hasToken": true,
    "tokenLength": 256,
    "adminUser": {
      "id": "clx999xyz",
      "username": "admin",
      "role": "super_admin",
      "permissions": ["create_article"]
    },
    "userAgent": "Mozilla/5.0...",
    "origin": "http://localhost:3000",
    "headers": {
      "authorization": "Bearer [REDACTED]",
      "contentType": "application/json",
      "origin": "http://localhost:3000"
    },
    "tokenDecoded": {
      "userId": "clx999xyz",
      "username": "admin",
      "role": "super_admin",
      "iat": 1640995200,
      "exp": 1641081600,
      "isExpired": false
    }
  }
}
```

### 🎛️ Admin Dashboard

#### Get Admin Dashboard
```http
GET /api/v1/admin/dashboard
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "success": true,
  "message": "Dashboard data retrieved successfully",
  "data": {
    "totalArticles": 25,
    "totalDonations": 5,
    "totalNews": 15,
    "totalUsers": 100,
    "totalTransactions": 150,
    "recentActivity": [
      {
        "type": "article_created",
        "title": "New article published",
        "timestamp": "2025-01-27T10:00:00.000Z"
      }
    ],
    "pendingApprovals": 3,
    "systemStatus": "healthy"
  }
}
```

#### Get Dashboard Statistics
```http
GET /api/v1/admin/dashboard/stats
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "articles": {
      "total": 25,
      "published": 20,
      "draft": 5,
      "thisMonth": 8
    },
    "donations": {
      "total": 5,
      "active": 3,
      "completed": 2,
      "totalAmount": 500000000
    },
    "news": {
      "total": 15,
      "published": 12,
      "thisWeek": 3
    },
    "users": {
      "total": 100,
      "active": 95,
      "admins": 5
    }
  }
}
```

#### Get Dashboard Summary
```http
GET /api/v1/admin/dashboard/summary
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

#### Get Realtime Activity
```http
GET /api/v1/admin/dashboard/activity
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

#### Get Charts Data
```http
GET /api/v1/admin/dashboard/charts
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

#### Refresh Dashboard Cache
```http
POST /api/v1/admin/dashboard/stats/refresh
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

### 📝 Admin Articles Management

#### Get Articles (Admin)
```http
GET /api/v1/admin/articles
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Query Parameters:**
- `page` (number, optional): Halaman yang diinginkan (default: 1)
- `limit` (number, optional): Jumlah item per halaman (default: 10)
- `search` (string, optional): Pencarian berdasarkan judul atau konten
- `status` (string, optional): Filter berdasarkan status (published, draft, archived)
- `sortBy` (string, optional): Kolom untuk sorting (default: updatedAt)
- `sortOrder` (string, optional): Urutan sorting (asc, desc) - default: desc

**Example:**
```http
GET /api/v1/admin/articles?page=1&limit=10&search=masjid&status=published&sortBy=createdAt&sortOrder=desc
```

**Response:**
```json
{
  "success": true,
  "message": "Articles retrieved successfully",
  "data": {
    "articles": [
      {
        "id": "clx123abc",
        "title": "Judul Artikel",
        "slug": "judul-artikel",
        "description": "Ringkasan artikel...",
        "content": "Konten lengkap artikel...",
        "image": "article-image.jpg",
        "category": "kegiatan",
        "status": "published",
        "publishedAt": "2025-01-27T10:00:00.000Z",
        "authorName": "Admin",
        "views": 100,
        "likes": 25,
        "featured": false,
        "tags": ["masjid", "kegiatan"],
        "createdAt": "2025-01-27T10:00:00.000Z",
        "updatedAt": "2025-01-27T10:30:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "totalPages": 3
    }
  }
}
```

#### Get Article Categories
```http
GET /api/v1/admin/articles/categories
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "success": true,
  "message": "Article categories retrieved successfully",
  "data": [
    {
      "value": "kegiatan",
      "label": "Kegiatan",
      "count": 15
    },
    {
      "value": "berita",
      "label": "Berita",
      "count": 8
    },
    {
      "value": "kajian",
      "label": "Kajian",
      "count": 5
    }
  ]
}
```

#### Get Article Tags
```http
GET /api/v1/admin/articles/tags
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "success": true,
  "message": "Popular tags retrieved successfully",
  "data": [
    {
      "tag": "masjid",
      "count": 20
    },
    {
      "tag": "kegiatan",
      "count": 15
    },
    {
      "tag": "komunitas",
      "count": 10
    }
  ]
}
```

#### Get Article by ID (Admin)
```http
GET /api/v1/admin/articles/:id
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "success": true,
  "message": "Article retrieved successfully",
  "data": {
    "id": "clx123abc",
    "title": "Judul Artikel",
    "slug": "judul-artikel",
    "description": "Ringkasan artikel...",
    "content": "Konten lengkap artikel...",
    "image": "article-image.jpg",
    "category": "kegiatan",
    "status": "published",
    "publishedAt": "2025-01-27T10:00:00.000Z",
    "authorName": "Admin",
    "views": 100,
    "likes": 25,
    "featured": false,
    "tags": ["masjid", "kegiatan"],
    "createdAt": "2025-01-27T10:00:00.000Z",
    "updatedAt": "2025-01-27T10:30:00.000Z"
  }
}
```

#### Create Article (Admin)
```http
POST /api/v1/admin/articles
```

**Headers:**
```
Authorization: Bearer <jwt-token>
Content-Type: multipart/form-data
```

**Request Body (Form Data):**
```json
{
  "title": "Judul Artikel Baru",
  "content": "Konten lengkap artikel...",
  "description": "Ringkasan artikel...",
  "category": "kegiatan",
  "status": "published",
  "featured": false,
  "tags": ["masjid", "kegiatan", "komunitas"],
  "image": "file-upload.jpg"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Article created successfully",
  "data": {
    "id": "clx999new",
    "title": "Judul Artikel Baru",
    "slug": "judul-artikel-baru",
    "description": "Ringkasan artikel...",
    "content": "Konten lengkap artikel...",
    "image": "1640995200000-uploaded-image.jpg",
    "category": "kegiatan",
    "status": "published",
    "publishedAt": "2025-01-27T10:00:00.000Z",
    "authorName": "Admin",
    "createdAt": "2025-01-27T10:00:00.000Z",
    "updatedAt": "2025-01-27T10:00:00.000Z"
  }
}
```

#### Update Article (Admin)
```http
PUT /api/v1/admin/articles/:id
```

**Headers:**
```
Authorization: Bearer <jwt-token>
Content-Type: multipart/form-data
```

**Request Body (Form Data):**
```json
{
  "title": "Judul Artikel yang Diperbarui",
  "content": "Konten yang telah diperbarui...",
  "description": "Ringkasan yang diperbarui...",
  "category": "berita",
  "status": "draft",
  "featured": true,
  "tags": ["masjid", "berita"],
  "image": "new-image.jpg"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Article updated successfully",
  "data": {
    "id": "clx123abc",
    "title": "Judul Artikel yang Diperbarui",
    "content": "Konten yang telah diperbarui...",
    "category": "berita",
    "status": "draft",
    "featured": true,
    "updatedAt": "2025-01-27T11:00:00.000Z"
  }
}
```

#### Delete Article (Admin)
```http
DELETE /api/v1/admin/articles/:id
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "success": true,
  "message": "Article deleted successfully",
  "data": null
}
```

#### Toggle Featured Article
```http
POST /api/v1/admin/articles/:id/featured
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "success": true,
  "message": "Article featured status updated",
  "data": {
    "id": "clx123abc",
    "featured": true
  }
}
```

#### Bulk Delete Articles
```http
POST /api/v1/admin/articles/bulk-delete
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Request Body:**
```json
{
  "articleIds": ["clx123abc", "clx456def", "clx789ghi"]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Articles deleted successfully",
  "data": {
    "deletedCount": 3
  }
}
```

#### Duplicate Article
```http
POST /api/v1/admin/articles/:id/duplicate
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "success": true,
  "message": "Article duplicated successfully",
  "data": {
    "id": "clx999dup",
    "title": "Copy of Judul Artikel",
    "slug": "copy-of-judul-artikel",
    "status": "draft",
    "createdAt": "2025-01-27T10:00:00.000Z"
  }
}
```

### 💰 Admin Donations Management

#### Get Donations (Admin)
```http
GET /api/v1/admin/donations
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Query Parameters:**
- `page` (number, optional): Halaman yang diinginkan (default: 1)
- `limit` (number, optional): Jumlah item per halaman (default: 10)
- `search` (string, optional): Pencarian berdasarkan judul atau deskripsi
- `status` (string, optional): Filter berdasarkan status (active, completed, suspended)
- `sortBy` (string, optional): Kolom untuk sorting (default: updatedAt)
- `sortOrder` (string, optional): Urutan sorting (asc, desc) - default: desc

**Response:**
```json
{
  "success": true,
  "message": "Donations retrieved successfully",
  "data": {
    "donations": [
      {
        "id": "clx789ghi",
        "title": "Donasi Renovasi Masjid",
        "slug": "donasi-renovasi-masjid",
        "description": "Mari berpartisipasi dalam renovasi masjid...",
        "detail": "Detail lengkap tentang rencana renovasi...",
        "image": "donation-image.jpg",
        "targetAmount": 100000000,
        "collectedAmount": 75000000,
        "status": "active",
        "startDate": "2025-01-01T00:00:00.000Z",
        "endDate": "2025-12-31T23:59:59.000Z",
        "totalDonors": 150,
        "createdAt": "2025-01-01T00:00:00.000Z",
        "updatedAt": "2025-01-27T10:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 5,
      "totalPages": 1
    }
  }
}
```

#### Get Donation by ID (Admin)
```http
GET /api/v1/admin/donations/:id
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

#### Create Donation (Admin)
```http
POST /api/v1/admin/donations
```

**Headers:**
```
Authorization: Bearer <jwt-token>
Content-Type: multipart/form-data
```

**Request Body (Form Data):**
```json
{
  "title": "Donasi Baru",
  "description": "Deskripsi donasi yang akan dibuat...",
  "detail": "Detail lengkap tentang program donasi ini...",
  "targetAmount": "50000000",
  "endDate": "2025-12-31",
  "bankName": "Bank Mandiri",
  "accountNumber": "1234567890",
  "accountName": "Masjid Al-Furqon",
  "image": "file-upload.jpg"
}
```

#### Update Donation (Admin)
```http
PUT /api/v1/admin/donations/:id
```

**Headers:**
```
Authorization: Bearer <jwt-token>
Content-Type: multipart/form-data
```

#### Delete Donation (Admin)
```http
DELETE /api/v1/admin/donations/:id
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

### 📢 Admin News Management

#### Get News (Admin)
```http
GET /api/v1/admin/news
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Query Parameters:**
- `page` (number, optional): Halaman yang diinginkan (default: 1)
- `limit` (number, optional): Jumlah item per halaman (default: 10)
- `search` (string, optional): Pencarian berdasarkan judul atau konten
- `priority` (string, optional): Filter berdasarkan prioritas (high, medium, low)
- `sortBy` (string, optional): Kolom untuk sorting (default: updatedAt)
- `sortOrder` (string, optional): Urutan sorting (asc, desc) - default: desc

**Response:**
```json
{
  "success": true,
  "message": "News retrieved successfully",
  "data": {
    "news": [
      {
        "id": "clx456def",
        "title": "Berita Terbaru Masjid",
        "slug": "berita-terbaru-masjid",
        "description": "Informasi terkini tentang kegiatan masjid...",
        "content": "Konten lengkap berita...",
        "image": "news-image.jpg",
        "category": "umum",
        "priority": "high",
        "publishedAt": "2025-01-27T09:00:00.000Z",
        "authorName": "Admin",
        "views": 150,
        "createdAt": "2025-01-27T09:00:00.000Z",
        "updatedAt": "2025-01-27T09:30:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 15,
      "totalPages": 2
    }
  }
}
```

#### Get News by ID (Admin)
```http
GET /api/v1/admin/news/:id
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

#### Create News (Admin)
```http
POST /api/v1/admin/news
```

**Headers:**
```
Authorization: Bearer <jwt-token>
Content-Type: multipart/form-data
```

**Request Body (Form Data):**
```json
{
  "title": "Berita Baru",
  "content": "Konten lengkap berita...",
  "description": "Ringkasan berita...",
  "category": "umum",
  "priority": "high",
  "summary": "Ringkasan singkat berita...",
  "image": "file-upload.jpg"
}
```

#### Update News (Admin)
```http
PUT /api/v1/admin/news/:id
```

**Headers:**
```
Authorization: Bearer <jwt-token>
Content-Type: multipart/form-data
```

#### Delete News (Admin)
```http
DELETE /api/v1/admin/news/:id
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

### 👥 Admin Users Management (Super Admin Only)

#### Get Users (Admin)
```http
GET /api/v1/admin/users
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Query Parameters:**
- `page` (number, optional): Halaman yang diinginkan (default: 1)
- `limit` (number, optional): Jumlah item per halaman (default: 10)
- `search` (string, optional): Pencarian berdasarkan nama, email, atau username
- `status` (string, optional): Filter berdasarkan status (active, inactive)
- `sortBy` (string, optional): Kolom untuk sorting (default: updatedAt)
- `sortOrder` (string, optional): Urutan sorting (asc, desc) - default: desc

**Response:**
```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": {
    "users": [
      {
        "id": "clx999xyz",
        "username": "admin",
        "email": "admin@alfurqon.com",
        "name": "Administrator",
        "role": "super_admin",
        "permissions": ["create_article", "edit_article", "delete_article"],
        "isActive": true,
        "lastLogin": "2025-01-27T10:00:00.000Z",
        "loginCount": 15,
        "createdAt": "2025-01-01T00:00:00.000Z",
        "updatedAt": "2025-01-27T10:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 5,
      "totalPages": 1
    }
  }
}
```

#### Create User (Admin)
```http
POST /api/v1/admin/users
```

**Headers:**
```
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "username": "newuser",
  "email": "newuser@alfurqon.com",
  "password": "password123",
  "name": "New User",
  "role": "editor",
  "permissions": ["create_article", "edit_article"],
  "isActive": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": "clx999new",
    "username": "newuser",
    "email": "newuser@alfurqon.com",
    "name": "New User",
    "role": "editor",
    "permissions": ["create_article", "edit_article"],
    "isActive": true,
    "createdAt": "2025-01-27T10:00:00.000Z",
    "updatedAt": "2025-01-27T10:00:00.000Z"
  }
}
```

#### Update User (Admin)
```http
PUT /api/v1/admin/users/:id
```

**Headers:**
```
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Updated User Name",
  "role": "admin",
  "permissions": ["create_article", "edit_article", "delete_article"],
  "isActive": false
}
```

#### Delete User (Admin)
```http
DELETE /api/v1/admin/users/:id
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "success": true,
  "message": "User deleted successfully",
  "data": null
}
```

### 📁 File Upload

#### Upload File (Admin)
```http
POST /api/v1/admin/upload
```

**Headers:**
```
Authorization: Bearer <jwt-token>
Content-Type: multipart/form-data
```

**Request Body (Form Data):**
- `file`: File (jpg, jpeg, png, gif, webp)

**Response:**
```json
{
  "success": true,
  "message": "File uploaded successfully",
  "data": {
    "filename": "1747217139064-388012976.jpg",
    "originalName": "image.jpg",
    "path": "/uploads/1747217139064-388012976.jpg",
    "url": "http://localhost:5000/uploads/1747217139064-388012976.jpg",
    "size": 245760,
    "mimetype": "image/jpeg"
  }
}
```

### 🔍 Additional Endpoints

#### Search
```http
GET /api/v1/search
```

**Query Parameters:**
- `q` (string, required): Query pencarian
- `type` (string, optional): Tipe konten (articles, news, donations, all) - default: all
- `limit` (number, optional): Jumlah hasil per tipe (default: 5)

**Response:**
```json
{
  "success": true,
  "data": {
    "articles": [
      {
        "id": "clx123abc",
        "title": "Artikel yang cocok",
        "slug": "artikel-yang-cocok",
        "description": "Deskripsi artikel...",
        "type": "article"
      }
    ],
    "news": [
      {
        "id": "clx456def",
        "title": "Berita yang cocok",
        "slug": "berita-yang-cocok",
        "description": "Deskripsi berita...",
        "type": "news"
      }
    ],
    "donations": [
      {
        "id": "clx789ghi",
        "title": "Donasi yang cocok",
        "slug": "donasi-yang-cocok",
        "description": "Deskripsi donasi...",
        "type": "donation"
      }
    ],
    "totalResults": 15
  }
}
```

#### Newsletter Subscribe
```http
POST /api/v1/newsletter/subscribe
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "name": "User Name"
}
```

#### Contact Submit
```http
POST /api/v1/contact/submit
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Pertanyaan",
  "message": "Pesan dari pengguna..."
}
```

#### Submit Feedback
```http
POST /api/v1/feedback
```

**Request Body:**
```json
{
  "rating": 5,
  "message": "Website sangat membantu!",
  "category": "general"
}
```

#### Get Navigation Menus
```http
GET /api/v1/menus/navigation
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "menu1",
      "title": "Beranda",
      "slug": "beranda",
      "url": "/",
      "order": 1,
      "isActive": true
    },
    {
      "id": "menu2",
      "title": "Artikel",
      "slug": "artikel",
      "url": "/articles",
      "order": 2,
      "isActive": true
    }
  ]
}
```

#### Track Analytics Event
```http
POST /api/v1/analytics/track
```

**Request Body:**
```json
{
  "event": "page_view",
  "page": "/articles/artikel-contoh",
  "userAgent": "Mozilla/5.0...",
  "referrer": "https://google.com"
}
```

#### Get Page Views
```http
GET /api/v1/analytics/views
```

**Query Parameters:**
- `page` (string, optional): Halaman spesifik
- `period` (string, optional): Periode (today, week, month) - default: today

**Response:**
```json
{
  "success": true,
  "data": {
    "totalViews": 1500,
    "uniqueViews": 1200,
    "topPages": [
      {
        "page": "/articles/artikel-populer",
        "views": 250
      }
    ]
  }
}
```

## 🚨 Error Responses

Semua error response menggunakan format standar:

```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": {} // optional, untuk error yang memerlukan detail tambahan
}
```

### HTTP Status Codes

- `200` - OK: Request berhasil
- `201` - Created: Resource berhasil dibuat
- `400` - Bad Request: Request tidak valid
- `401` - Unauthorized: Token tidak valid atau tidak ada
- `403` - Forbidden: Tidak memiliki akses
- `404` - Not Found: Resource tidak ditemukan
- `422` - Unprocessable Entity: Validasi gagal
- `429` - Too Many Requests: Rate limit terlampaui
- `500` - Internal Server Error: Error server

### Common Error Codes

#### Authentication Errors
```json
{
  "success": false,
  "error": "Token is required",
  "code": "TOKEN_REQUIRED"
}
```

```json
{
  "success": false,
  "error": "Invalid or expired token",
  "code": "INVALID_TOKEN"
}
```

#### Validation Errors
```json
{
  "success": false,
  "error": "Validation failed",
  "code": "VALIDATION_ERROR",
  "details": {
    "title": ["Title is required"],
    "email": ["Email format is invalid"]
  }
}
```

#### Not Found Errors
```json
{
  "success": false,
  "error": "Article not found",
  "code": "ARTICLE_NOT_FOUND"
}
```

#### Rate Limit Errors
```json
{
  "success": false,
  "error": "Too many requests, please try again later",
  "code": "RATE_LIMIT_EXCEEDED"
}
```

## 🔧 Utility Endpoints

### Check API Status
```http
GET /api/v1/status
```

**Response:**
```json
{
  "success": true,
  "data": {
    "version": "1.0.0",
    "environment": "development",
    "database": "connected",
    "uptime": "2h 30m 15s"
  }
}
```

## 📊 Data Types

### Article Type
```typescript
interface Article {
  id: string;
  title: string;
  slug: string;
  description?: string;
  content?: string;
  image?: string;
  category: 'kegiatan' | 'berita' | 'sumbangan' | 'fasilitas' | 'profil' | 'kajian';
  status: 'published' | 'draft' | 'archived';
  authorId?: string;
  authorName?: string;
  authorAvatar?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  likes: number;
  featured: boolean;
  tags?: string[];
  metaData?: any;
}
```

### Donation Type
```typescript
interface Donation {
  id: string;
  title: string;
  slug: string;
  description: string;
  detail?: string;
  image?: string;
  targetAmount: number;
  collectedAmount: number;
  status: 'active' | 'completed' | 'suspended';
  startDate?: string;
  endDate?: string;
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
  qrisCode?: string;
  createdAt: string;
  updatedAt: string;
  totalDonors: number;
}
```

### News Type
```typescript
interface News {
  id: string;
  title: string;
  slug: string;
  description?: string;
  content?: string;
  image?: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  authorId?: string;
  authorName?: string;
  views: number;
  summary?: string;
  metaData?: any;
}
```

### User Type
```typescript
interface User {
  id: string;
  email: string;
  username: string;
  name: string;
  role: 'super_admin' | 'admin' | 'editor' | 'user';
  permissions: string[];
  avatar?: string;
  isActive: boolean;
  lastLogin?: string;
  loginCount: number;
  createdAt: string;
  updatedAt: string;
}
```

### DonationTransaction Type
```typescript
interface DonationTransaction {
  id: string;
  donationId: string;
  donorName: string;
  amount: number;
  email?: string;
  phone?: string;
  message?: string;
  isAnonymous: boolean;
  paymentMethod: 'bank_transfer' | 'qris' | 'ewallet' | 'cash';
  status: 'pending' | 'paid' | 'failed' | 'cancelled';
  transactionId?: string;
  paymentUrl?: string;
  expiresAt?: string;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
}
```

### ApiResponse Type
```typescript
interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  code?: string;
  details?: any;
}
```

### Pagination Type
```typescript
interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
```

### AdminFilters Type
```typescript
interface AdminFilters {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
```

## 🧪 Testing Examples

### Using cURL

#### Get Dashboard Data
```bash
curl -X GET "http://localhost:5000/api/v1/home/dashboard" \
  -H "Content-Type: application/json"
```

#### Get Articles
```bash
curl -X GET "http://localhost:5000/api/v1/articles?category=kegiatan&page=1&limit=10" \
  -H "Content-Type: application/json"
```

#### Get Active Donations
```bash
curl -X GET "http://localhost:5000/api/v1/donations?status=active" \
  -H "Content-Type: application/json"
```

#### Admin Login
```bash
curl -X POST "http://localhost:5000/api/v1/admin/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin@alfurqon.com",
    "password": "admin123"
  }'
```

#### Get Admin Articles (with token)
```bash
curl -X GET "http://localhost:5000/api/v1/admin/articles?page=1&limit=10" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### Create Article (Admin)
```bash
curl -X POST "http://localhost:5000/api/v1/admin/articles" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "title=Artikel Baru" \
  -F "content=Konten artikel yang lengkap..." \
  -F "description=Ringkasan artikel" \
  -F "category=kegiatan" \
  -F "status=published" \
  -F "tags=[\"masjid\", \"kegiatan\"]" \
  -F "image=@/path/to/image.jpg"
```

#### Update Article (Admin)
```bash
curl -X PUT "http://localhost:5000/api/v1/admin/articles/ARTICLE_ID" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "title=Artikel yang Diperbarui" \
  -F "content=Konten yang telah diperbarui..." \
  -F "status=draft" \
  -F "featured=true"
```

#### Delete Article (Admin)
```bash
curl -X DELETE "http://localhost:5000/api/v1/admin/articles/ARTICLE_ID" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### Upload File (Admin)
```bash
curl -X POST "http://localhost:5000/api/v1/admin/upload" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "file=@/path/to/image.jpg"
```

### Using JavaScript Fetch

#### Get Dashboard Data
```javascript
fetch('http://localhost:5000/api/v1/home/dashboard')
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      console.log('Dashboard data:', data.data);
    }
  })
  .catch(error => console.error('Error:', error));
```

#### Get Articles with Filters
```javascript
const params = new URLSearchParams({
  category: 'kegiatan',
  page: '1',
  limit: '10'
});

fetch(`http://localhost:5000/api/v1/articles?${params}`)
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      console.log('Articles:', data.data);
      console.log('Pagination:', data.pagination);
    }
  })
  .catch(error => console.error('Error:', error));
```

#### Admin Login
```javascript
fetch('http://localhost:5000/api/v1/admin/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username: 'admin@alfurqon.com',
    password: 'admin123'
  })
})
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      localStorage.setItem('adminToken', data.data.token);
      localStorage.setItem('refreshToken', data.data.refreshToken);
      console.log('Login successful:', data.data.user);
    }
  })
  .catch(error => console.error('Error:', error));
```

#### Create Article with Authentication
```javascript
const token = localStorage.getItem('adminToken');
const formData = new FormData();

formData.append('title', 'Artikel Baru');
formData.append('content', 'Konten artikel yang lengkap...');
formData.append('description', 'Ringkasan artikel');
formData.append('category', 'kegiatan');
formData.append('status', 'published');
formData.append('tags', JSON.stringify(['masjid', 'kegiatan']));
formData.append('image', imageFile); // File object

fetch('http://localhost:5000/api/v1/admin/articles', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  body: formData
})
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      console.log('Article created:', data.data);
    }
  })
  .catch(error => console.error('Error:', error));
```

#### Get Admin Articles with Pagination
```javascript
const token = localStorage.getItem('adminToken');
const params = new URLSearchParams({
  page: '1',
  limit: '10',
  search: 'masjid',
  status: 'published',
  sortBy: 'createdAt',
  sortOrder: 'desc'
});

fetch(`http://localhost:5000/api/v1/admin/articles?${params}`, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      console.log('Articles:', data.data.articles);
      console.log('Pagination:', data.data.pagination);
    }
  })
  .catch(error => console.error('Error:', error));
```

#### Refresh Token
```javascript
const refreshToken = localStorage.getItem('refreshToken');

fetch('http://localhost:5000/api/v1/admin/auth/refresh', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    refreshToken: refreshToken
  })
})
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      localStorage.setItem('adminToken', data.data.token);
      console.log('Token refreshed successfully');
    }
  })
  .catch(error => console.error('Error:', error));
```

### Using React/Next.js

#### API Client Setup
```javascript
// utils/apiClient.js
class ApiClient {
  constructor(baseURL = 'http://localhost:5000/api/v1') {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = localStorage.getItem('adminToken');
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Request failed');
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Public endpoints
  getDashboard() {
    return this.request('/home/dashboard');
  }

  getArticles(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/articles?${query}`);
  }

  getDonations(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/donations?${query}`);
  }

  // Admin endpoints
  adminLogin(credentials) {
    return this.request('/admin/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  }

  getAdminArticles(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/admin/articles?${query}`);
  }

  createArticle(formData) {
    return this.request('/admin/articles', {
      method: 'POST',
      headers: {}, // Remove Content-Type for FormData
      body: formData
    });
  }

  updateArticle(id, formData) {
    return this.request(`/admin/articles/${id}`, {
      method: 'PUT',
      headers: {}, // Remove Content-Type for FormData
      body: formData
    });
  }

  deleteArticle(id) {
    return this.request(`/admin/articles/${id}`, {
      method: 'DELETE'
    });
  }
}

export default new ApiClient();
```

#### React Hook Example
```javascript
// hooks/useArticles.js
import { useState, useEffect } from 'react';
import ApiClient from '../utils/apiClient';

export const useArticles = (params = {}) => {
  const [articles, setArticles] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await ApiClient.getArticles(params);
        setArticles(response.data);
        setPagination(response.pagination);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [JSON.stringify(params)]);

  return { articles, pagination, loading, error };
};
```

## 🔒 Security Notes

1. **CORS**: Backend dikonfigurasi untuk hanya menerima request dari localhost untuk development
2. **Rate Limiting**: Terdapat pembatasan jumlah request per IP
3. **JWT**: Token akan expired setelah 7 hari (default)
4. **File Upload**: Hanya menerima file gambar dengan size maksimal 10MB
5. **Validation**: Semua input divalidasi sebelum diproses

## 📋 Checklist untuk Frontend Developer

### Setup & Development
- [ ] Pastikan backend berjalan di `http://localhost:5000`
- [ ] Test health check endpoint: `GET /health`
- [ ] Test dashboard endpoint: `GET /api/v1/home/dashboard`
- [ ] Setup API client dengan proper error handling
- [ ] Setup environment variables yang sesuai
- [ ] Install dependencies (axios, fetch, dll)

### Authentication Flow
- [ ] Implement admin authentication flow (login, token storage)
- [ ] Handle JWT token refresh mechanism
- [ ] Implement logout functionality
- [ ] Add token expiration handling
- [ ] Test authentication endpoints: `/api/v1/admin/auth/*`
- [ ] Implement role-based access control (super_admin, admin, editor)

### Public API Integration
- [ ] Test public articles endpoint: `GET /api/v1/articles`
- [ ] Test public donations endpoint: `GET /api/v1/donations`
- [ ] Test public news endpoint: `GET /api/v1/news`
- [ ] Test public statistics endpoint: `GET /api/v1/statistics/public`
- [ ] Handle pagination untuk list endpoints
- [ ] Implement search functionality
- [ ] Test slug-based endpoints

### Admin Panel Integration
- [ ] Test admin dashboard: `GET /api/v1/admin/dashboard`
- [ ] Implement admin articles management (CRUD)
- [ ] Implement admin donations management (CRUD)
- [ ] Implement admin news management (CRUD)
- [ ] Implement admin users management (CRUD - Super Admin only)
- [ ] Test file upload functionality: `POST /api/v1/admin/upload`
- [ ] Handle form data for file uploads (multipart/form-data)

### Data Handling
- [ ] Implement proper TypeScript interfaces
- [ ] Handle JSON fields (tags, permissions, metaData)
- [ ] Implement proper date formatting
- [ ] Handle category enums (kegiatan, berita, kajian, dll)
- [ ] Handle status enums (published, draft, archived)
- [ ] Handle priority enums (high, medium, low)

### UI/UX Features
- [ ] Implement loading states dan error boundaries
- [ ] Add pagination components
- [ ] Implement search and filter components
- [ ] Add sorting functionality
- [ ] Implement featured content display
- [ ] Add analytics tracking
- [ ] Implement feedback system

### Advanced Features
- [ ] Test bulk operations (bulk delete articles)
- [ ] Test article duplication
- [ ] Test featured article toggle
- [ ] Implement realtime activity feed
- [ ] Add charts and statistics visualization
- [ ] Implement newsletter subscription
- [ ] Add contact form submission

### Testing & Validation
- [ ] Test all CRUD operations dengan proper authorization
- [ ] Test error handling scenarios
- [ ] Test rate limiting
- [ ] Validate form inputs
- [ ] Test file size and type restrictions
- [ ] Test responsive design
- [ ] Test accessibility features

### Security Considerations
- [ ] Implement proper CORS handling
- [ ] Sanitize user inputs
- [ ] Handle sensitive data properly
- [ ] Implement XSS protection
- [ ] Add CSRF protection
- [ ] Validate file uploads

### Performance Optimization
- [ ] Implement caching strategies
- [ ] Optimize image loading
- [ ] Implement lazy loading
- [ ] Add compression for API responses
- [ ] Optimize bundle size
- [ ] Implement code splitting

### Documentation & Maintenance
- [ ] Document API integration
- [ ] Add error logging
- [ ] Implement monitoring
- [ ] Add unit tests
- [ ] Add integration tests
- [ ] Create deployment guide

## 🆘 Troubleshooting

### Common Issues

1. **CORS Error**: Pastikan frontend berjalan di localhost dan backend sudah allow origin localhost
2. **401 Unauthorized**: Periksa JWT token, pastikan belum expired
3. **404 Not Found**: Periksa URL endpoint, pastikan sesuai dokumentasi
4. **500 Server Error**: Periksa log backend, mungkin ada masalah database
5. **Rate Limited**: Tunggu beberapa saat sebelum mencoba request lagi

### Debug Mode

Untuk development, aktifkan debug mode dengan set environment:
```
DEBUG=true
NODE_ENV=development
```

Backend akan memberikan response error yang lebih detail.

---

**Last Updated**: 27 Januari 2025  
**Version**: 1.0.0  
**Backend Repository**: Al-Furqon Backend API
