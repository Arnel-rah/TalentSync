import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient(); 

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware de base
app.use(helmet());
app.use(cors());
app.use(express.json());

// TODO: Graceful shutdown pour Prisma
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

// Routes (identiques)
import authRoutes from './routes/auth';
import missionRoutes from './routes/missions';
import paymentRoutes from './routes/payments';
import dashboardRoutes from './routes/dashboard';

app.use('/api/auth', authRoutes);
app.use('/api/missions', missionRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Health check (teste DB)
app.get('/api/health', async (req, res) => {
  try {
    await prisma.$connect();
    res.json({ status: 'OK', db: 'Connected' });
  } catch (error) {
    res.status(500).json({ status: 'Error', db: 'Disconnected' });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});