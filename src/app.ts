import express from 'express';
import helmet from 'helmet';
import { config } from 'dotenv';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Load environment variables
config();

// Import middleware
import corsMiddleware from './middleware/cors';
import { errorHandler } from './middleware/errorHandler';

// Import routes
import apiRoutes from './routes/api';

const app = express();
const PORT = process.env.PORT || 5000;

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Al-Furqon Backend API',
      version: '1.0.0',
      description: 'API untuk Content Management System Masjid Al-Furqon',
      contact: {
        name: 'Al-Furqon Development Team',
        email: 'admin@alfurqon.com'
      }
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Development server'
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
        description: 'Dashboard dan statistik'
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
      }
    ]
  },
  apis: ['./src/app.ts', './src/routes/api/*.ts']
};

const specs = swaggerJsdoc(swaggerOptions);

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS
app.use(corsMiddleware);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Al-Furqon API Documentation'
}));

// Serve static files
app.use('/uploads', express.static('uploads'));

// Logging middleware (simple console.log untuk development)
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check
 *     tags: [Health]
 *     description: Mengecek status server
 *     responses:
 *       200:
 *         description: Server berjalan normal
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Al-Furqon Backend is running"
 *                 environment:
 *                   type: string
 *                   example: "development"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 */
// Health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Al-Furqon Backend is running',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use('/api/v1', apiRoutes);

// Direct routes (tanpa prefix /api/v1 untuk kompatibilitas frontend)
app.use('/articles', (req, res, next) => {
  req.url = '/articles' + (req.url === '/' ? '' : req.url);
  apiRoutes(req, res, next);
});

app.use('/donations', (req, res, next) => {
  req.url = '/donations' + (req.url === '/' ? '' : req.url);
  apiRoutes(req, res, next);
});

app.use('/news', (req, res, next) => {
  req.url = '/news' + (req.url === '/' ? '' : req.url);
  apiRoutes(req, res, next);
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint tidak ditemukan',
    path: req.originalUrl,
    method: req.method
  });
});

// Error handling middleware
app.use(errorHandler);

export default app;
