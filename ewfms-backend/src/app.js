import epress from 'express';
import cors from 'cors';
import userRoutes from './modules/user/users.routes.js'
import authRoutes from './modules/auth/auth.routes.js'
import { swaggerUi, swaggerSpec } from '../src/swagger.js';

const app = epress();

// Middleware
app.use(cors());
app.use(epress.json());

// Test route (optional)
app.get("/", (req, res) => {
    res.send("API is running successfully 🚀");
});

// AUTH ROUTES HERE
app.use("/api/auth", authRoutes);

// USERS ROUTES HERE
app.use("/api/users", userRoutes);

// Swagger UI route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;