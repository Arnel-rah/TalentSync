"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const client_1 = require("@prisma/client");
const auth_routes_1 = __importDefault(require("./api/auth/auth.routes"));
const accounts_routes_1 = __importDefault(require("./api/accounts/accounts.routes"));
const transactions_routes_1 = __importDefault(require("./api/transactions/transactions.routes"));
const categories_routes_1 = __importDefault(require("./api/categories/categories.routes"));
const budgets_routes_1 = __importDefault(require("./api/budgets/budgets.routes"));
const error_middleware_1 = require("./middleware/error.middleware");
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
// Inject Prisma
app.use((req, _res, next) => {
    req.prisma = prisma;
    next();
});
// Routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/accounts', accounts_routes_1.default);
app.use('/api/transactions', transactions_routes_1.default);
app.use('/api/categories', categories_routes_1.default);
app.use('/api/budgets', budgets_routes_1.default);
// Error handler
app.use(error_middleware_1.errorMiddleware);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
