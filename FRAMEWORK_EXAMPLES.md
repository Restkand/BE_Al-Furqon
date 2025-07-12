# Framework Integration Examples

Contoh integrasi API Al-Furqon dengan berbagai framework frontend populer.

## 📁 File Structure

```
frontend-examples/
├── next-js/          # Next.js 13+ App Router
├── react/            # React with Vite
├── vue/              # Vue 3 Composition API
└── vanilla/          # Vanilla JavaScript
```

---

## 🔥 Next.js Integration

### 1. Environment Setup (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_UPLOAD_URL=http://localhost:5000/uploads
```

### 2. API Client (lib/api.ts)
```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL!;

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

class AlFurqonAPI {
  private baseURL: string;

  constructor() {
    this.baseURL = `${API_URL}/api/v1`;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Dashboard
  async getDashboard() {
    return this.request('/home/dashboard');
  }

  // Statistics
  async getStatistics() {
    return this.request('/statistics/public');
  }

  // Articles
  async getArticles(page = 1, limit = 10, published = true) {
    return this.request(`/articles?page=${page}&limit=${limit}&published=${published}`);
  }

  async getArticle(id: string) {
    return this.request(`/articles/${id}`);
  }

  // Donations
  async getDonations(page = 1, limit = 10, status?: string) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(status && { status }),
    });
    return this.request(`/donations?${params}`);
  }

  // News
  async getNews(page = 1, limit = 10) {
    return this.request(`/news?page=${page}&limit=${limit}`);
  }
}

export const api = new AlFurqonAPI();
```

### 3. Server Component (app/page.tsx)
```typescript
import { api } from '@/lib/api';
import { DashboardStats } from '@/components/DashboardStats';
import { RecentArticles } from '@/components/RecentArticles';

export default async function HomePage() {
  try {
    const [dashboardRes, statsRes] = await Promise.all([
      api.getDashboard(),
      api.getStatistics(),
    ]);

    if (!dashboardRes.success || !statsRes.success) {
      throw new Error('Failed to fetch data');
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Masjid Al-Furqon</h1>
        
        <DashboardStats statistics={statsRes.data} />
        
        <div className="mt-12">
          <RecentArticles articles={dashboardRes.data.recentArticles} />
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-red-600 text-center">
          Error loading data: {error.message}
        </div>
      </div>
    );
  }
}
```

### 4. Client Component with SWR (components/ArticlesList.tsx)
```typescript
'use client';

import useSWR from 'swr';
import { api } from '@/lib/api';
import { useState } from 'react';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  imageUrl?: string;
  createdAt: string;
}

const fetcher = (url: string) => {
  const [_, page, limit] = url.split('/');
  return api.getArticles(parseInt(page), parseInt(limit));
};

export function ArticlesList() {
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  
  const { data, error, isLoading } = useSWR(
    `/articles/${page}/${limit}`,
    fetcher
  );

  if (isLoading) {
    return <ArticlesSkeleton />;
  }

  if (error) {
    return (
      <div className="text-red-600 p-4 bg-red-50 rounded-lg">
        Error loading articles: {error.message}
      </div>
    );
  }

  const articles = data?.data?.articles || [];
  const totalPages = data?.data?.totalPages || 1;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {articles.map((article: Article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination 
        currentPage={page} 
        totalPages={totalPages} 
        onPageChange={setPage} 
      />
    </div>
  );
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {article.imageUrl && (
        <img 
          src={article.imageUrl} 
          alt={article.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{article.excerpt}</p>
        <div className="text-sm text-gray-500">
          {new Date(article.createdAt).toLocaleDateString('id-ID')}
        </div>
      </div>
    </div>
  );
}
```

---

## ⚛️ React (Vite) Integration

### 1. Environment Setup (.env)
```bash
VITE_API_URL=http://localhost:5000
VITE_UPLOAD_URL=http://localhost:5000/uploads
```

### 2. API Client (src/services/api.js)
```javascript
const API_URL = import.meta.env.VITE_API_URL;

class AlFurqonAPI {
  constructor() {
    this.baseURL = `${API_URL}/api/v1`;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Dashboard
  getDashboard() {
    return this.request('/home/dashboard');
  }

  // Articles
  getArticles(page = 1, limit = 10, published = true) {
    return this.request(`/articles?page=${page}&limit=${limit}&published=${published}`);
  }

  // Donations with pagination and filtering
  getDonations(page = 1, limit = 10, title) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    });
    if (title) params.set('title', title);
    return this.request(`/donations?${params}`);
  }
}

export const api = new AlFurqonAPI();
```

### 3. Custom Hook (src/hooks/useApi.js)
```javascript
import { useState, useEffect } from 'react';

export function useApi(apiCall, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const result = await apiCall();
        
        if (!cancelled) {
          setData(result.data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, dependencies);

  return { data, loading, error };
}
```

### 4. Component (src/components/Dashboard.jsx)
```jsx
import React from 'react';
import { api } from '../services/api';
import { useApi } from '../hooks/useApi';

export function Dashboard() {
  const { data: dashboard, loading, error } = useApi(() => api.getDashboard());

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 p-4 bg-red-50 rounded-lg">
        Error loading dashboard: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard Masjid Al-Furqon</h1>
      
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <StatCard 
          title="Total Artikel" 
          value={dashboard?.statistics?.totalArticles || 0}
          icon="📰"
        />
        <StatCard 
          title="Donasi Aktif" 
          value={dashboard?.statistics?.activeDonations || 0}
          icon="💰"
        />
        <StatCard 
          title="Total Berita" 
          value={dashboard?.statistics?.totalNews || 0}
          icon="📢"
        />
        <StatCard 
          title="Total Donasi" 
          value={dashboard?.statistics?.totalDonations || 0}
          icon="🎯"
        />
      </div>

      {/* Recent Articles */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Artikel Terbaru</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dashboard?.recentArticles?.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </div>
  );
}

function ArticleCard({ article }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {article.imageUrl && (
        <img 
          src={article.imageUrl} 
          alt={article.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
        <p className="text-gray-600 text-sm">{article.excerpt}</p>
      </div>
    </div>
  );
}
```

---

## 🔧 Vue 3 Integration

### 1. Environment Setup (.env)
```bash
VITE_API_URL=http://localhost:5000
VITE_UPLOAD_URL=http://localhost:5000/uploads
```

### 2. API Service (src/services/api.js)
```javascript
const API_URL = import.meta.env.VITE_API_URL;

class AlFurqonAPI {
  constructor() {
    this.baseURL = `${API_URL}/api/v1`;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  getDashboard() {
    return this.request('/home/dashboard');
  }

  getArticles(page = 1, limit = 10, published = true) {
    return this.request(`/articles?page=${page}&limit=${limit}&published=${published}`);
  }

  getDonations(page = 1, limit = 10) {
    return this.request(`/donations?page=${page}&limit=${limit}`);
  }
}

export const api = new AlFurqonAPI();
```

### 3. Composable (src/composables/useApi.js)
```javascript
import { ref, onMounted } from 'vue';

export function useApi(apiCall) {
  const data = ref(null);
  const loading = ref(true);
  const error = ref(null);

  const fetchData = async () => {
    try {
      loading.value = true;
      error.value = null;
      
      const result = await apiCall();
      data.value = result.data;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  onMounted(fetchData);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
}
```

### 4. Component (src/components/Dashboard.vue)
```vue
<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Dashboard Masjid Al-Furqon</h1>
    
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-red-600 p-4 bg-red-50 rounded-lg">
      Error loading dashboard: {{ error }}
    </div>

    <!-- Content -->
    <div v-else>
      <!-- Statistics -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <StatCard 
          title="Total Artikel" 
          :value="data?.statistics?.totalArticles || 0"
          icon="📰"
        />
        <StatCard 
          title="Donasi Aktif" 
          :value="data?.statistics?.activeDonations || 0"
          icon="💰"
        />
        <StatCard 
          title="Total Berita" 
          :value="data?.statistics?.totalNews || 0"
          icon="📢"
        />
        <StatCard 
          title="Total Donasi" 
          :value="data?.statistics?.totalDonations || 0"
          icon="🎯"
        />
      </div>

      <!-- Recent Articles -->
      <section>
        <h2 class="text-2xl font-semibold mb-6">Artikel Terbaru</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ArticleCard 
            v-for="article in data?.recentArticles" 
            :key="article.id" 
            :article="article" 
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { api } from '@/services/api';
import { useApi } from '@/composables/useApi';
import StatCard from './StatCard.vue';
import ArticleCard from './ArticleCard.vue';

const { data, loading, error } = useApi(() => api.getDashboard());
</script>
```

---

## 🎨 Vanilla JavaScript Integration

### 1. Basic Setup (index.html)
```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Masjid Al-Furqon</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body>
    <div id="app">
        <div id="loading" class="flex justify-center items-center h-screen">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    </div>

    <script src="js/api.js"></script>
    <script src="js/components.js"></script>
    <script src="js/app.js"></script>
</body>
</html>
```

### 2. API Client (js/api.js)
```javascript
const API_URL = 'http://localhost:5000';

class AlFurqonAPI {
  constructor() {
    this.baseURL = `${API_URL}/api/v1`;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  getDashboard() {
    return this.request('/home/dashboard');
  }

  getArticles(page = 1, limit = 10, published = true) {
    return this.request(`/articles?page=${page}&limit=${limit}&published=${published}`);
  }

  getDonations(page = 1, limit = 10) {
    return this.request(`/donations?page=${page}&limit=${limit}`);
  }
}

const api = new AlFurqonAPI();
```

### 3. Components (js/components.js)
```javascript
function createStatCard(title, value, icon) {
  return `
    <div class="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">${title}</p>
          <p class="text-2xl font-bold text-gray-900">${value}</p>
        </div>
        <div class="text-3xl">${icon}</div>
      </div>
    </div>
  `;
}

function createArticleCard(article) {
  const imageHtml = article.imageUrl 
    ? `<img src="${article.imageUrl}" alt="${article.title}" class="w-full h-48 object-cover">`
    : '';

  return `
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      ${imageHtml}
      <div class="p-6">
        <h3 class="text-lg font-semibold mb-2">${article.title}</h3>
        <p class="text-gray-600 text-sm">${article.excerpt}</p>
        <div class="text-sm text-gray-500 mt-2">
          ${new Date(article.createdAt).toLocaleDateString('id-ID')}
        </div>
      </div>
    </div>
  `;
}

function createDashboard(data) {
  const stats = data.statistics;
  
  return `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">Dashboard Masjid Al-Furqon</h1>
      
      <!-- Statistics -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        ${createStatCard('Total Artikel', stats.totalArticles, '📰')}
        ${createStatCard('Donasi Aktif', stats.activeDonations, '💰')}
        ${createStatCard('Total Berita', stats.totalNews, '📢')}
        ${createStatCard('Total Donasi', stats.totalDonations, '🎯')}
      </div>

      <!-- Recent Articles -->
      <section>
        <h2 class="text-2xl font-semibold mb-6">Artikel Terbaru</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          ${data.recentArticles.map(article => createArticleCard(article)).join('')}
        </div>
      </section>
    </div>
  `;
}

function showError(message) {
  return `
    <div class="container mx-auto px-4 py-8">
      <div class="text-red-600 p-4 bg-red-50 rounded-lg text-center">
        Error: ${message}
      </div>
    </div>
  `;
}
```

### 4. App Logic (js/app.js)
```javascript
class App {
  constructor() {
    this.appElement = document.getElementById('app');
    this.loadingElement = document.getElementById('loading');
    this.init();
  }

  async init() {
    try {
      await this.loadDashboard();
    } catch (error) {
      this.showError(error.message);
    }
  }

  async loadDashboard() {
    try {
      const response = await api.getDashboard();
      
      if (response.success) {
        this.render(createDashboard(response.data));
      } else {
        throw new Error(response.error || 'Failed to load dashboard');
      }
    } catch (error) {
      this.showError(error.message);
    }
  }

  render(html) {
    this.loadingElement.style.display = 'none';
    this.appElement.innerHTML = html;
  }

  showError(message) {
    this.loadingElement.style.display = 'none';
    this.appElement.innerHTML = showError(message);
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new App();
});
```

---

## 📱 Mobile App Integration (React Native)

### 1. API Client (services/api.js)
```javascript
const API_URL = 'http://localhost:5000'; // atau IP komputer untuk device fisik

class AlFurqonAPI {
  constructor() {
    this.baseURL = `${API_URL}/api/v1`;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  getDashboard() {
    return this.request('/home/dashboard');
  }

  getArticles(page = 1, limit = 10) {
    return this.request(`/articles?page=${page}&limit=${limit}&published=true`);
  }
}

export const api = new AlFurqonAPI();
```

### 2. Component (components/Dashboard.jsx)
```jsx
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { api } from '../services/api';

export function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const response = await api.getDashboard();
      
      if (response.success) {
        setData(response.data);
      } else {
        setError(response.error || 'Failed to load dashboard');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Masjid Al-Furqon</Text>
      
      {/* Statistics */}
      <View style={styles.statsContainer}>
        <StatCard title="Total Artikel" value={data.statistics.totalArticles} />
        <StatCard title="Donasi Aktif" value={data.statistics.activeDonations} />
      </View>

      {/* Recent Articles */}
      <Text style={styles.sectionTitle}>Artikel Terbaru</Text>
      {data.recentArticles.map(article => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  loadingText: {
    marginTop: 10,
    color: '#6b7280',
  },
  errorText: {
    color: '#dc2626',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
});
```

---

## 🧪 Testing Utilities

### 1. API Testing (test-api.js)
```javascript
const API_URL = 'http://localhost:5000';

async function testAPI() {
  console.log('🧪 Testing Al-Furqon API...\n');

  const endpoints = [
    { name: 'Health Check', url: '/health' },
    { name: 'Dashboard', url: '/api/v1/home/dashboard' },
    { name: 'Statistics', url: '/api/v1/statistics/public' },
    { name: 'Articles', url: '/api/v1/articles' },
    { name: 'Donations', url: '/api/v1/donations' },
    { name: 'News', url: '/api/v1/news' },
  ];

  for (const endpoint of endpoints) {
    try {
      console.log(`Testing ${endpoint.name}...`);
      const response = await fetch(`${API_URL}${endpoint.url}`);
      const data = await response.json();
      
      if (data.success) {
        console.log(`✅ ${endpoint.name}: OK`);
      } else {
        console.log(`❌ ${endpoint.name}: Failed - ${data.error}`);
      }
    } catch (error) {
      console.log(`❌ ${endpoint.name}: Error - ${error.message}`);
    }
  }

  console.log('\n🏁 API testing completed!');
}

// Run tests
testAPI();
```

### 2. Performance Testing (performance-test.js)
```javascript
async function performanceTest() {
  const API_URL = 'http://localhost:5000';
  const endpoints = [
    '/api/v1/home/dashboard',
    '/api/v1/statistics/public',
    '/api/v1/articles',
    '/api/v1/donations',
  ];

  console.log('⚡ Performance Testing...\n');

  for (const endpoint of endpoints) {
    const times = [];
    
    for (let i = 0; i < 5; i++) {
      const start = performance.now();
      
      try {
        await fetch(`${API_URL}${endpoint}`);
        const end = performance.now();
        times.push(end - start);
      } catch (error) {
        console.log(`❌ ${endpoint}: ${error.message}`);
        break;
      }
    }

    if (times.length === 5) {
      const avg = times.reduce((a, b) => a + b, 0) / times.length;
      const min = Math.min(...times);
      const max = Math.max(...times);

      console.log(`📊 ${endpoint}:`);
      console.log(`   Average: ${avg.toFixed(2)}ms`);
      console.log(`   Min: ${min.toFixed(2)}ms`);
      console.log(`   Max: ${max.toFixed(2)}ms\n`);
    }
  }
}

// Run performance test
performanceTest();
```

---

## 📚 Documentation

### 1. TypeScript Types (types/api.ts)
```typescript
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface Statistics {
  totalArticles: number;
  activeDonations: number;
  totalNews: number;
  totalDonations: number;
  totalDonationAmount?: number;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  imageUrl?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Donation {
  id: string;
  title: string;
  slug: string;
  description: string;
  detail?: string;
  targetAmount: number;
  collectedAmount: number;
  status: 'active' | 'completed' | 'suspended';
  image?: string;
  startDate?: string;
  endDate?: string;
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
  qrisCode?: string;
  totalDonors: number;
  createdAt: string;
  updatedAt: string;
  transactions?: DonationTransaction[];
}

export interface DonationTransaction {
  id: string;
  donorName: string;
  amount: number;
  message?: string;
  isAnonymous: boolean;
  paidAt: string;
}

export interface News {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardData {
  statistics: Statistics;
  recentArticles: Article[];
  recentNews: News[];
  activeDonations: Donation[];
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
```

---

**Framework Examples Created!** ✨ 

Pilih framework yang sesuai dengan project Anda dan ikuti contoh integrasi yang telah disediakan. Semua contoh sudah disesuaikan dengan API Al-Furqon dan siap digunakan untuk development.
