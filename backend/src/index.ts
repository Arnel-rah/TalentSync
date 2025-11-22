import express from 'express';
import { PrismaClient } from '@prisma/client';

// import authRoutes from './api/auth/auth.routes';
// import accountRoutes from './api/accounts/accounts.routes';
// import transactionRoutes from './api/transactions/transactions.routes';
// import categoryRoutes from './api/categories/categories.routes';
// import budgetRoutes from './api/budgets/budgets.routes';
import { errorMiddleware } from './middleware/error.middleware';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Inject Prisma
app.use((req, _res, next) => {
  (req as any).prisma = prisma;
  next();
});

// Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/accounts', accountRoutes);
// app.use('/api/transactions', transactionRoutes);
// app.use('/api/categories', categoryRoutes);
// app.use('/api/budgets', budgetRoutes);

// Error handler
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});