import express from 'express';
import { config } from 'dotenv';
import app from './app';

// Load environment variables
config();

const PORT = process.env.PORT || 5003;

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Al-Furqon Backend running on port ${PORT}`);
  console.log(`🏠 Root: http://localhost:${PORT}/`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
});

export default app;