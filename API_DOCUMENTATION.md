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
    "documentation": "/api-docs"
  }
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
      "totalDonations": 100
    },
    "recentArticles": [
      {
        "id": "clx123abc",
        "title": "Judul Artikel Terbaru",
        "excerpt": "Ringkasan artikel yang menarik...",
        "imageUrl": "http://localhost:5000/uploads/article-image.jpg",
        "createdAt": "2025-01-27T10:00:00.000Z"
      }
    ],
    "recentNews": [
      {
        "id": "clx456def",
        "title": "Berita Terbaru Masjid",
        "excerpt": "Informasi terkini tentang kegiatan masjid...",
        "imageUrl": "http://localhost:5000/uploads/news-image.jpg",
        "createdAt": "2025-01-27T09:00:00.000Z"
      }
    ],
    "activeDonations": [
      {
        "id": "clx789ghi",
        "title": "Donasi Renovasi Masjid",
        "description": "Mari berpartisipasi dalam renovasi masjid...",
        "targetAmount": 100000000,
        "collectedAmount": 75000000,
        "imageUrl": "http://localhost:5000/uploads/donation-image.jpg",
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
    "totalDonations": 100,
    "totalArticles": 25,
    "totalNews": 15,
    "activeDonations": 5,
    "totalDonationAmount": 500000000
  }
}
```

### 📰 Articles

#### Get All Articles
```http
GET /api/v1/articles
```

**Query Parameters:**
- `page` (number, optional): Halaman yang diinginkan (default: 1)
- `limit` (number, optional): Jumlah item per halaman (default: 10)
- `published` (boolean, optional): Filter berdasarkan status publikasi

**Example:**
```http
GET /api/v1/articles?page=1&limit=10&published=true
```

**Response:**
```json
{
  "success": true,
  "data": {
    "articles": [
      {
        "id": "clx123abc",
        "title": "Judul Artikel",
        "content": "Konten lengkap artikel...",
        "excerpt": "Ringkasan artikel...",
        "imageUrl": "http://localhost:5000/uploads/article-image.jpg",
        "published": true,
        "createdAt": "2025-01-27T10:00:00.000Z",
        "updatedAt": "2025-01-27T10:30:00.000Z"
      }
    ],
    "total": 25,
    "page": 1,
    "limit": 10,
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
    "content": "Konten lengkap artikel...",
    "excerpt": "Ringkasan artikel...",
    "imageUrl": "http://localhost:5000/uploads/article-image.jpg",
    "published": true,
    "createdAt": "2025-01-27T10:00:00.000Z",
    "updatedAt": "2025-01-27T10:30:00.000Z"
  }
}
```

#### Create Article (Protected)
```http
POST /api/v1/articles
```

**Headers:**
```
Authorization: Bearer <jwt-token>
Content-Type: application/json
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

#### Update Article (Protected)
```http
PUT /api/v1/articles/:id
```

**Headers:**
```
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Judul Artikel yang Diperbarui",
  "content": "Konten yang telah diperbarui...",
  "published": false
}
```

#### Delete Article (Protected)
```http
DELETE /api/v1/articles/:id
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

### 💰 Donations

#### Get All Donations
```http
GET /api/v1/donations
```

**Query Parameters:**
- `page` (number, optional): Halaman yang diinginkan (default: 1)
- `limit` (number, optional): Jumlah item per halaman (default: 10)
- `title` (string, optional): Filter berdasarkan judul donasi (case-insensitive search)

**Example:**
```http
GET /api/v1/donations?page=1&limit=10&title=renovasi
```

**Response:**
```json
{
  "success": true,
  "message": "Success get all donations",
  "data": {
    "data": [
      {
        "id": "clx789ghi",
        "title": "Donasi Renovasi Masjid",
        "slug": "donasi-renovasi-masjid-1640995200000",
        "description": "Mari berpartisipasi dalam renovasi masjid untuk kenyamanan ibadah bersama...",
        "detail": "Detail lengkap tentang rencana renovasi masjid...",
        "targetAmount": 100000000,
        "collectedAmount": 75000000,
        "status": "active",
        "image": "donation-image.jpg",
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
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "totalItems": 5,
      "totalPages": 1
    }
  }
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
  "message": "Success get donation",
  "data": {
    "id": "clx789ghi",
    "title": "Donasi Renovasi Masjid",
    "slug": "donasi-renovasi-masjid-1640995200000",
    "description": "Mari berpartisipasi dalam renovasi masjid untuk kenyamanan ibadah bersama...",
    "detail": "Detail lengkap tentang rencana renovasi masjid...",
    "targetAmount": 100000000,
    "collectedAmount": 75000000,
    "status": "active",
    "image": "donation-image.jpg",
    "startDate": "2025-01-01T00:00:00.000Z",
    "endDate": "2025-12-31T23:59:59.000Z",
    "bankName": "Bank Mandiri",
    "accountNumber": "1234567890",
    "accountName": "Masjid Al-Furqon",
    "qrisCode": "qris-donation.png",
    "totalDonors": 150,
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-27T10:00:00.000Z",
    "transactions": [
      {
        "id": "clx456def",
        "donorName": "Ahmad Rahman",
        "amount": 500000,
        "message": "Semoga bermanfaat untuk umat",
        "isAnonymous": false,
        "paidAt": "2025-01-25T10:30:00.000Z"
      }
    ]
  }
}
```

#### Create Donation (Protected)
```http
POST /api/v1/donations
```

**Headers:**
```
Authorization: Bearer <jwt-token>
Content-Type: multipart/form-data
```

**Request Body (FormData):**
```json
{
  "title": "Donasi Baru",
  "description": "Deskripsi donasi yang akan dibuat...",
  "detail": "Detail lengkap tentang program donasi ini...",
  "targetAmount": "50000000",
  "image": "file-upload.jpg"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Success create donation",
  "data": {
    "id": "clx999new",
    "title": "Donasi Baru",
    "slug": "donasi-baru-1640995200000",
    "description": "Deskripsi donasi yang akan dibuat...",
    "detail": "Detail lengkap tentang program donasi ini...",
    "targetAmount": 50000000,
    "collectedAmount": 0,
    "status": "active",
    "image": "1640995200000-uploaded-image.jpg",
    "createdAt": "2025-01-27T10:00:00.000Z",
    "updatedAt": "2025-01-27T10:00:00.000Z"
  }
}
```

#### Update Donation (Protected)
```http
PUT /api/v1/donations/:id
```

**Headers:**
```
Authorization: Bearer <jwt-token>
Content-Type: multipart/form-data
```

**Request Body (FormData):**
```json
{
  "title": "Donasi yang Diperbarui",
  "description": "Deskripsi yang telah diperbarui...",
  "detail": "Detail yang telah diperbarui...",
  "targetAmount": "75000000",
  "collectedAmount": "25000000",
  "image": "new-image.jpg"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Success update donation",
  "data": {
    "id": "clx789ghi",
    "title": "Donasi yang Diperbarui",
    "description": "Deskripsi yang telah diperbarui...",
    "targetAmount": 75000000,
    "collectedAmount": 25000000,
    "updatedAt": "2025-01-27T11:00:00.000Z"
  }
}
```

#### Delete Donation (Protected)
```http
DELETE /api/v1/donations/:id
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "success": true,
  "message": "Success delete donation",
  "data": null
}
```

### 📢 News

#### Get All News
```http
GET /api/v1/news
```

**Query Parameters:**
- `page` (number, optional): Halaman yang diinginkan (default: 1)
- `limit` (number, optional): Jumlah item per halaman (default: 10)

**Example:**
```http
GET /api/v1/news?page=1&limit=10
```

**Response:**
```json
{
  "success": true,
  "data": {
    "news": [
      {
        "id": "clx456def",
        "title": "Berita Terbaru Masjid",
        "content": "Konten lengkap berita...",
        "excerpt": "Ringkasan berita...",
        "imageUrl": "http://localhost:5000/uploads/news-image.jpg",
        "createdAt": "2025-01-27T09:00:00.000Z",
        "updatedAt": "2025-01-27T09:30:00.000Z"
      }
    ],
    "total": 15,
    "page": 1,
    "limit": 10,
    "totalPages": 2
  }
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
    "content": "Konten lengkap berita tentang kegiatan masjid yang akan datang...",
    "excerpt": "Ringkasan berita...",
    "imageUrl": "http://localhost:5000/uploads/news-image.jpg",
    "createdAt": "2025-01-27T09:00:00.000Z",
    "updatedAt": "2025-01-27T09:30:00.000Z"
  }
}
```

### 🔐 Authentication

#### Login
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

#### Register (Protected)
```http
POST /api/v1/auth/register
```

**Headers:**
```
Authorization: Bearer <jwt-token>
Content-Type: application/json
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

#### Get Current User
```http
GET /api/v1/auth/me
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
    "id": "clx999xyz",
    "email": "admin@alfurqon.com",
    "role": "admin",
    "name": "Administrator"
  }
}
```

### 📁 File Upload

#### Upload Image
```http
POST /api/v1/upload/image
```

**Headers:**
```
Authorization: Bearer <jwt-token>
Content-Type: multipart/form-data
```

**Request Body (Form Data):**
- `image`: File (jpg, jpeg, png, gif)

**Response:**
```json
{
  "success": true,
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
  content: string;
  excerpt: string;
  imageUrl?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}
```

### Donation Type
```typescript
interface Donation {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  collectedAmount: number;
  imageUrl?: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'expired';
  createdAt: string;
  updatedAt: string;
}
```

### News Type
```typescript
interface News {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}
```

### User Type
```typescript
interface User {
  id: string;
  email: string;
  name?: string;
  role: 'admin' | 'user';
  createdAt: string;
  updatedAt: string;
}
```

## 🧪 Testing Examples

### Using cURL

#### Get Dashboard Data
```bash
curl -X GET "http://localhost:5000/api/v1/home/dashboard" \
  -H "Content-Type: application/json"
```

#### Login
```bash
curl -X POST "http://localhost:5000/api/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@alfurqon.com",
    "password": "password123"
  }'
```

#### Create Article (dengan token)
```bash
curl -X POST "http://localhost:5000/api/v1/articles" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Artikel Baru",
    "content": "Konten artikel...",
    "excerpt": "Ringkasan...",
    "published": true
  }'
```

### Using JavaScript Fetch

#### Get Articles
```javascript
fetch('http://localhost:5000/api/v1/articles?page=1&limit=10&published=true')
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      console.log('Articles:', data.data.articles);
    }
  })
  .catch(error => console.error('Error:', error));
```

#### Create Article with Authentication
```javascript
const token = localStorage.getItem('token');

fetch('http://localhost:5000/api/v1/articles', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    title: 'Artikel Baru',
    content: 'Konten artikel...',
    excerpt: 'Ringkasan...',
    published: true
  })
})
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      console.log('Article created:', data.data);
    }
  })
  .catch(error => console.error('Error:', error));
```

## 🔒 Security Notes

1. **CORS**: Backend dikonfigurasi untuk hanya menerima request dari localhost untuk development
2. **Rate Limiting**: Terdapat pembatasan jumlah request per IP
3. **JWT**: Token akan expired setelah 7 hari (default)
4. **File Upload**: Hanya menerima file gambar dengan size maksimal 10MB
5. **Validation**: Semua input divalidasi sebelum diproses

## 📋 Checklist untuk Frontend Developer

- [ ] Pastikan backend berjalan di `http://localhost:5000`
- [ ] Test health check endpoint: `GET /health`
- [ ] Test dashboard endpoint: `GET /api/v1/home/dashboard`
- [ ] Setup API client dengan proper error handling
- [ ] Implement authentication flow (login, token storage)
- [ ] Test semua CRUD operations dengan proper authorization
- [ ] Handle pagination untuk list endpoints
- [ ] Implement loading states dan error boundaries
- [ ] Test file upload functionality
- [ ] Setup environment variables yang sesuai

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
