import { config } from 'dotenv';
import app from './app';
import { AppConfig } from './utils/config';

config();

const PORT = AppConfig.port;

app.listen(PORT, () => {
  console.log(`Al-Furqon Backend running on port ${PORT}`);
  console.log(`Base URL: ${AppConfig.baseUrl}`);
});

export default app;