import express from 'express';
import helmet from 'helmet';
import { config } from 'dotenv';

// Load environment variables
config();

// Import middleware
import corsMiddleware from './middleware/cors';
import { errorHandler } from './middleware/errorHandler';

// Import routes
import apiRoutes from './routes/api';

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS
app.use(corsMiddleware);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files
app.use('/uploads', express.static('uploads'));

// Logging middleware (simple console.log untuk development)
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

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
