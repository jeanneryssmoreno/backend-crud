import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import estudiantesRouter from './routes/estudiantes';
import 'dotenv/config';

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Prisma Client
export const prisma = new PrismaClient({
  log: ['info', 'warn', 'error'],
});

// Routes
app.use('/api/estudiantes', estudiantesRouter);

// Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ message: 'Servidor funcionando correctamente ✅' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🎤 Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(`📚 API disponible en http://localhost:${PORT}/api`);
});
