# Frontend Integration Guide - Al-Furqon Backend API

## 📋 Quick Start untuk Frontend Developer

### 1. Environment Setup di Frontend

#### .env.local
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_UPLOAD_URL=http://localhost:5000/uploads
```

### 2. Install Dependencies (jika perlu)
```bash
# Jika menggunakan axios
npm install axios

# Jika menggunakan SWR untuk data fetching
npm install swr

# Jika menggunakan React Query
npm install @tanstack/react-query
```

### 3. API Client Setup

#### Option 1: Using Fetch API
```typescript
// lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export class AlFurqonAPI {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async get(endpoint: string) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`);
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'API Error');
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Homepage Dashboard Data
  async getDashboard() {
    return this.get('/api/v1/home/dashboard');
  }

  // Public Statistics
  async getStatistics() {
    return this.get('/api/v1/statistics/public');
  }

  // Articles with pagination
  async getArticles(params?: {
    category?: string;
    page?: number;
    limit?: number;
  }) {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.set('category', params.category);
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    
    const query = searchParams.toString();
    return this.get(`/api/v1/articles${query ? `?${query}` : ''}`);
  }

  // Donations with pagination and filtering
  async getDonations(params?: {
    page?: number;
    limit?: number;
    title?: string;
  }) {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.title) searchParams.set('title', params.title);
    
    const query = searchParams.toString();
    return this.get(`/api/v1/donations${query ? `?${query}` : ''}`);
  }

  // News
  async getNews(params?: {
    priority?: string;
    limit?: number;
  }) {
    const searchParams = new URLSearchParams();
    if (params?.priority) searchParams.set('priority', params.priority);
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    
    const query = searchParams.toString();
    return this.get(`/api/v1/news${query ? `?${query}` : ''}`);
  }
}

export const api = new AlFurqonAPI();
```

#### Option 2: Using Axios
```typescript
// lib/axios.ts
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    if (response.data && !response.data.success) {
      throw new Error(response.data.message || 'API Error');
    }
    return response.data;
  },
  (error) => {
    console.error('API Error:', error);
    throw error;
  }
);

export const alFurqonAPI = {
  getDashboard: () => apiClient.get('/api/v1/home/dashboard'),
  getStatistics: () => apiClient.get('/api/v1/statistics/public'),
  getArticles: (params?: any) => apiClient.get('/api/v1/articles', { params }),
  getDonations: (params?: any) => apiClient.get('/api/v1/donations', { params }),
  getNews: (params?: any) => apiClient.get('/api/v1/news', { params }),
};
```

### 4. React Hooks untuk Data Fetching

#### Custom Hooks dengan useState & useEffect
```typescript
// hooks/useHomepage.ts
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

export function useHomepage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const result = await api.getDashboard();
        setData(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}

// hooks/useStatistics.ts
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

export function useStatistics() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const result = await api.getStatistics();
        setStats(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return { stats, loading, error };
}

// hooks/useArticles.ts
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

export function useArticles(params?: {
  category?: string;
  page?: number;
  limit?: number;
}) {
  const [articles, setArticles] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        setLoading(true);
        const result = await api.getArticles(params);
        setArticles(result.data);
        setPagination(result.pagination);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, [params?.category, params?.page, params?.limit]);

  return { articles, pagination, loading, error };
}

// hooks/useDonations.ts
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

export function useDonations(params?: {
  page?: number;
  limit?: number;
  title?: string;
}) {
  const [donations, setDonations] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDonations() {
      try {
        setLoading(true);
        const result = await api.getDonations(params);
        setDonations(result.data.data);
        setPagination(result.data.pagination);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchDonations();
  }, [params?.page, params?.limit, params?.title]);

  return { donations, pagination, loading, error };
}
```

#### Using SWR (Recommended)
```typescript
// hooks/useSWR.ts
import useSWR from 'swr';
import { api } from '@/lib/api';

const fetcher = (url: string) => api.get(url).then(res => res.data);

export function useHomepage() {
  const { data, error, isLoading } = useSWR('/api/v1/home/dashboard', fetcher);
  return { data, error, loading: isLoading };
}

export function useStatistics() {
  const { data, error, isLoading } = useSWR('/api/v1/statistics/public', fetcher);
  return { stats: data, error, loading: isLoading };
}

export function useArticles(params?: any) {
  const query = params ? `?${new URLSearchParams(params).toString()}` : '';
  const { data, error, isLoading } = useSWR(`/api/v1/articles${query}`, fetcher);
  
  return { 
    articles: data?.data || [], 
    pagination: data?.pagination, 
    error, 
    loading: isLoading 
  };
}

export function useDonations(params?: any) {
  const query = params ? `?${new URLSearchParams(params).toString()}` : '';
  const { data, error, isLoading } = useSWR(`/api/v1/donations${query}`, fetcher);
  
  return { 
    donations: data?.data || [], 
    pagination: data?.pagination, 
    error, 
    loading: isLoading 
  };
}
```

### 5. Component Examples

#### Homepage Stats Component
```tsx
// components/StatsSection.tsx
import { useStatistics } from '@/hooks/useStatistics';

export function StatsSection() {
  const { stats, loading, error } = useStatistics();

  if (loading) return <div className="animate-pulse">Loading statistics...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!stats) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">
              {stats.totalArticles}
            </div>
            <div className="text-gray-600">Total Artikel</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">
              {stats.activeDonations}
            </div>
            <div className="text-gray-600">Donasi Aktif</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">
              Rp {(stats.totalDonationCollected / 1000000).toFixed(0)}M
            </div>
            <div className="text-gray-600">Dana Terkumpul</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">
              {stats.donationProgress}%
            </div>
            <div className="text-gray-600">Progress</div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

#### Articles List Component
```tsx
// components/ArticlesList.tsx
import { useArticles } from '@/hooks/useArticles';
import { useState } from 'react';

export function ArticlesList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  
  const { articles, pagination, loading, error } = useArticles({
    page: currentPage,
    limit: 9,
    category: selectedCategory || undefined
  });

  if (loading) return <div>Loading articles...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Artikel Terbaru</h2>
        
        {/* Category Filter */}
        <div className="mb-8">
          <select 
            value={selectedCategory} 
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="border rounded px-3 py-2"
          >
            <option value="">Semua Kategori</option>
            <option value="kegiatan">Kegiatan</option>
            <option value="berita">Berita</option>
            <option value="sumbangan">Sumbangan</option>
            <option value="fasilitas">Fasilitas</option>
            <option value="profil">Profil</option>
          </select>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {articles.map((article) => (
            <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {article.image && (
                <img 
                  src={`${process.env.NEXT_PUBLIC_UPLOAD_URL}${article.image}`}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <div className="text-sm text-blue-600 mb-2">
                  {article.category}
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {article.description}
                </p>
                <div className="text-sm text-gray-500">
                  By {article.authorName} • {new Date(article.publishedAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex justify-center space-x-2">
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 rounded ${
                  currentPage === page 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
```

#### Donations Component
```tsx
// components/DonationsList.tsx
import { useDonations } from '@/hooks/useDonations';
import { useState } from 'react';

export function DonationsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTitle, setSearchTitle] = useState('');
  
  const { donations, pagination, loading, error } = useDonations({
    page: currentPage,
    limit: 6,
    title: searchTitle || undefined
  });

  if (loading) return <div>Loading donations...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Program Donasi</h2>
        
        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Cari program donasi..."
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            className="w-full p-3 border rounded-lg"
          />
        </div>

        {/* Donations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donations.map((donation) => (
            <DonationCard key={donation.id} donation={donation} />
          ))}
        </div>

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded ${
                  currentPage === page 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function DonationCard({ donation }) {
  const progressPercentage = (donation.collectedAmount / donation.targetAmount) * 100;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {donation.image && (
        <img 
          src={`${process.env.NEXT_PUBLIC_UPLOAD_URL}/${donation.image}`}
          alt={donation.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{donation.title}</h3>
        <p className="text-gray-600 mb-4">{donation.description}</p>
        
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Terkumpul</span>
            <span>{progressPercentage.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span>Rp {donation.collectedAmount.toLocaleString('id-ID')}</span>
            <span>Rp {donation.targetAmount.toLocaleString('id-ID')}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-between text-sm text-gray-600 mb-4">
          <span>{donation.totalDonors} Donatur</span>
          <span>{donation.status === 'active' ? 'Aktif' : donation.status}</span>
        </div>

        {/* Action Button */}
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Donasi Sekarang
        </button>
      </div>
    </div>
  );
}
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress: {donation.progress}%</span>
                    <span>Rp {donation.collectedAmount.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${donation.progress}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Target: Rp {donation.targetAmount.toLocaleString()}
                  </div>
                </div>

                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                  Donasi Sekarang
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### 6. Page Examples

#### Homepage
```tsx
// pages/index.tsx
import { StatsSection } from '@/components/StatsSection';
import { ArticlesList } from '@/components/ArticlesList';
import { DonationsList } from '@/components/DonationsList';

export default function HomePage() {
  return (
    <>
      <StatsSection />
      <ArticlesList />
      <DonationsList />
    </>
  );
}
```

### 7. Error Boundary
```tsx
// components/ErrorBoundary.tsx
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

export function ErrorBoundary({ children, fallback }: Props) {
  try {
    return <>{children}</>;
  } catch (error) {
    console.error('Error caught by boundary:', error);
    return fallback || <div>Something went wrong. Please try again.</div>;
  }
}
```

### 8. Loading Components
```tsx
// components/LoadingSpinner.tsx
export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-300"></div>
      <div className="p-6">
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-6 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}
```

---

**🚀 Frontend Integration siap digunakan! Copy-paste code di atas sesuai kebutuhan project frontend Anda.**
