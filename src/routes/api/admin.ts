import { Router } from 'express';
import { AdminController } from '../../controllers/api/adminController';
import { 
  adminAuth, 
  requireSuperAdmin, 
  requireAdmin, 
  requireAnyAdmin,
  requirePermission 
} from '../../middleware/adminAuth';
import multer from 'multer';
import path from 'path';

const router = Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images and documents are allowed!'));
    }
  }
});

// ==================== AUTHENTICATION ROUTES ====================
// These routes don't require authentication

/**
 * @swagger
 * /api/v1/admin/auth/login:
 *   post:
 *     summary: Admin login
 *     tags: [Admin Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: admin
 *               password:
 *                 type: string
 *                 example: admin123
 *               rememberMe:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/AdminUser'
 *                     token:
 *                       type: string
 *                     refreshToken:
 *                       type: string
 *                     expiresIn:
 *                       type: number
 *                     permissions:
 *                       type: array
 *                       items:
 *                         type: string
 *       401:
 *         description: Invalid credentials
 */
router.post('/auth/login', AdminController.login);

/**
 * @swagger
 * /api/v1/admin/auth/refresh:
 *   post:
 *     summary: Refresh access token
 *     tags: [Admin Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *       401:
 *         description: Invalid refresh token
 */
router.post('/auth/refresh', AdminController.refreshToken);

/**
 * @swagger
 * /api/v1/admin/auth/debug:
 *   get:
 *     summary: Debug authentication information
 *     tags: [Admin Auth]
 *     responses:
 *       200:
 *         description: Debug information retrieved
 */
router.get('/auth/debug', AdminController.debugAuth);

// ==================== PROTECTED ROUTES ====================
// All routes below require authentication

router.use(adminAuth);

/**
 * @swagger
 * /api/v1/admin/auth/logout:
 *   post:
 *     summary: Admin logout
 *     tags: [Admin Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post('/auth/logout', AdminController.logout);

/**
 * @swagger
 * /api/v1/admin/auth/me:
 *   get:
 *     summary: Get current admin user
 *     tags: [Admin Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/AdminUser'
 *                 message:
 *                   type: string
 *                   example: "Current user retrieved successfully"
 *       401:
 *         description: User not authenticated
 *       404:
 *         description: User not found
 */
router.get('/auth/me', adminAuth, AdminController.getCurrentUser);

/**
 * @swagger
 * /api/v1/admin/auth/refresh-all:
 *   post:
 *     summary: Refresh all admin tokens (Super Admin only)
 *     tags: [Admin Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All admin tokens refreshed successfully
 */
router.post('/auth/refresh-all', requireSuperAdmin, AdminController.refreshAllTokens);

/**
 * @swagger
 * /api/v1/admin/auth/logout-all:
 *   post:
 *     summary: Logout all admin sessions (Super Admin only)
 *     tags: [Admin Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All admin sessions logged out successfully
 */
router.post('/auth/logout-all', requireSuperAdmin, AdminController.logoutAllSessions);

/**
 * @swagger
 * /api/v1/admin/auth/debug:
 *   get:
 *     summary: Debug authentication information
 *     tags: [Admin Auth]
 *     responses:
 *       200:
 *         description: Debug information retrieved
 */
router.get('/auth/debug', AdminController.debugAuth);

// ==================== DASHBOARD ====================

/**
 * @swagger
 * /api/v1/admin/dashboard:
 *   get:
 *     summary: Get admin dashboard data
 *     tags: [Admin Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/AdminStats'
 */
router.get('/dashboard', requireAnyAdmin, AdminController.getDashboard);

// ==================== ARTICLES MANAGEMENT ====================

/**
 * @swagger
 * /api/v1/admin/articles:
 *   get:
 *     summary: Get articles with pagination and filters
 *     tags: [Admin Articles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [draft, published, archived]
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Articles retrieved successfully
 */
router.get('/articles', requireAnyAdmin, AdminController.getArticles);

/**
 * @swagger
 * /api/v1/admin/articles/{id}:
 *   get:
 *     summary: Get single article
 *     tags: [Admin Articles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Article retrieved successfully
 *       404:
 *         description: Article not found
 */
router.get('/articles/:id', requireAnyAdmin, AdminController.getArticle);

/**
 * @swagger
 * /api/v1/admin/articles:
 *   post:
 *     summary: Create new article
 *     tags: [Admin Articles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateArticleRequest'
 *     responses:
 *       201:
 *         description: Article created successfully
 *       400:
 *         description: Validation error
 */
router.post('/articles', requireAdmin, AdminController.createArticle);

/**
 * @swagger
 * /api/v1/admin/articles/{id}:
 *   put:
 *     summary: Update article
 *     tags: [Admin Articles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateArticleRequest'
 *     responses:
 *       200:
 *         description: Article updated successfully
 *       404:
 *         description: Article not found
 */
router.put('/articles/:id', requireAdmin, AdminController.updateArticle);

/**
 * @swagger
 * /api/v1/admin/articles/{id}:
 *   delete:
 *     summary: Delete article
 *     tags: [Admin Articles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Article deleted successfully
 *       404:
 *         description: Article not found
 */
router.delete('/articles/:id', requireAdmin, AdminController.deleteArticle);

// ==================== DONATIONS MANAGEMENT ====================

router.get('/donations', requireAnyAdmin, AdminController.getDonations);
router.get('/donations/:id', requireAnyAdmin, AdminController.getDonation);
router.post('/donations', requireAdmin, AdminController.createDonation);
router.put('/donations/:id', requireAdmin, AdminController.updateDonation);
router.delete('/donations/:id', requireAdmin, AdminController.deleteDonation);

// ==================== NEWS MANAGEMENT ====================

router.get('/news', requireAnyAdmin, AdminController.getNews);
router.get('/news/:id', requireAnyAdmin, AdminController.getNewsItem);
router.post('/news', requireAdmin, AdminController.createNews);
router.put('/news/:id', requireAdmin, AdminController.updateNews);
router.delete('/news/:id', requireAdmin, AdminController.deleteNews);

// ==================== USER MANAGEMENT ====================
// Super Admin only routes

router.get('/users', requireSuperAdmin, AdminController.getUsers);
router.post('/users', requireSuperAdmin, AdminController.createUser);
router.put('/users/:id', requireSuperAdmin, AdminController.updateUser);
router.delete('/users/:id', requireSuperAdmin, AdminController.deleteUser);

// ==================== TRANSACTIONS ====================

router.get('/transactions', requireAdmin, AdminController.getTransactions);

// ==================== FILE UPLOAD ====================

/**
 * @swagger
 * /api/v1/admin/upload:
 *   post:
 *     summary: Upload file
 *     tags: [Admin Files]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/FileUploadResponse'
 *       400:
 *         description: No file uploaded or invalid file type
 */
router.post('/upload', requireAnyAdmin, upload.single('file'), AdminController.uploadFile);

export default router;
