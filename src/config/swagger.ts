import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Al-Furqon Backend API',
      version: '1.0.0',
      description: 'API untuk Content Management System Masjid Al-Furqon',
      contact: {
        name: 'Al-Furqon Development Team',
        email: 'admin@alfurqon.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server'
      },
      {
        url: 'https://api.alfurqon.com',
        description: 'Production server'
      }
    ],
    components: {
      schemas: {
        ApiResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              description: 'Status keberhasilan request'
            },
            message: {
              type: 'string',
              description: 'Pesan response'
            },
            data: {
              type: 'object',
              description: 'Data yang dikembalikan'
            }
          }
        },
        Article: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Unique identifier artikel'
            },
            title: {
              type: 'string',
              description: 'Judul artikel'
            },
            slug: {
              type: 'string',
              description: 'URL slug artikel'
            },
            description: {
              type: 'string',
              description: 'Deskripsi singkat artikel'
            },
            image: {
              type: 'string',
              description: 'URL gambar artikel'
            },
            category: {
              type: 'string',
              description: 'Kategori artikel'
            },
            publishedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Tanggal publikasi'
            },
            authorName: {
              type: 'string',
              description: 'Nama penulis'
            },
            authorAvatar: {
              type: 'string',
              description: 'Avatar penulis'
            }
          }
        },
        Donation: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Unique identifier donasi'
            },
            title: {
              type: 'string',
              description: 'Judul donasi'
            },
            description: {
              type: 'string',
              description: 'Deskripsi donasi'
            },
            image: {
              type: 'string',
              description: 'URL gambar donasi'
            },
            targetAmount: {
              type: 'number',
              format: 'float',
              description: 'Target donasi'
            },
            currentAmount: {
              type: 'number',
              format: 'float',
              description: 'Donasi terkumpul'
            },
            category: {
              type: 'string',
              description: 'Kategori donasi'
            },
            endDate: {
              type: 'string',
              format: 'date-time',
              description: 'Tanggal berakhir'
            },
            progress: {
              type: 'number',
              description: 'Persentase progress donasi'
            },
            remainingAmount: {
              type: 'number',
              format: 'float',
              description: 'Sisa donasi yang dibutuhkan'
            }
          }
        },
        News: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Unique identifier berita'
            },
            title: {
              type: 'string',
              description: 'Judul berita'
            },
            content: {
              type: 'string',
              description: 'Konten berita'
            },
            priority: {
              type: 'string',
              enum: ['low', 'medium', 'high'],
              description: 'Prioritas berita'
            },
            publishedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Tanggal publikasi'
            }
          }
        },
        Statistics: {
          type: 'object',
          properties: {
            totalArticles: {
              type: 'number',
              description: 'Total artikel published'
            },
            activeDonations: {
              type: 'number',
              description: 'Total donasi aktif'
            },
            totalDonationTarget: {
              type: 'number',
              format: 'float',
              description: 'Total target donasi'
            },
            totalDonationCollected: {
              type: 'number',
              format: 'float',
              description: 'Total donasi terkumpul'
            },
            totalNews: {
              type: 'number',
              description: 'Total berita published'
            },
            donationProgress: {
              type: 'number',
              description: 'Persentase progress total donasi'
            }
          }
        },
        DashboardData: {
          type: 'object',
          properties: {
            statistics: {
              $ref: '#/components/schemas/Statistics'
            },
            latestArticles: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Article'
              }
            },
            activeDonations: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Donation'
              }
            },
            latestNews: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/News'
              }
            }
          }
        },
        Pagination: {
          type: 'object',
          properties: {
            page: {
              type: 'number',
              description: 'Halaman saat ini'
            },
            limit: {
              type: 'number',
              description: 'Jumlah item per halaman'
            },
            total: {
              type: 'number',
              description: 'Total item'
            },
            totalPages: {
              type: 'number',
              description: 'Total halaman'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            message: {
              type: 'string',
              description: 'Pesan error'
            },
            path: {
              type: 'string',
              description: 'Path endpoint yang error'
            }
          }
        }
      },
      responses: {
        BadRequest: {
          description: 'Bad Request',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        },
        NotFound: {
          description: 'Not Found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        },
        InternalError: {
          description: 'Internal Server Error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        }
      }
    },
    tags: [
      {
        name: 'Health',
        description: 'Health check endpoints'
      },
      {
        name: 'Dashboard',
        description: 'Dashboard dan statistik umum'
      },
      {
        name: 'Articles',
        description: 'Operasi artikel/konten'
      },
      {
        name: 'Donations',
        description: 'Operasi donasi'
      },
      {
        name: 'News',
        description: 'Operasi berita/pengumuman'
      },
      {
        name: 'Statistics',
        description: 'Statistik public'
      }
    ]
  },
  apis: ['./src/routes/api/*.ts', './src/index.ts'], // Path ke file yang berisi dokumentasi API
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };
