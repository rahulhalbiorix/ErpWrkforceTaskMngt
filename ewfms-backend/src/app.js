import express from 'express';
import cors from 'cors';
import userRoutes from './modules/user/users.routes.js'
import authRoutes from './modules/auth/auth.routes.js'
import orgRoutes from './modules/organizations/org.routes.js';
import projectRoutes from './modules/projects/prj.routes.js'
import { swaggerUi, swaggerSpec } from '../src/swagger.js';


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route (optional)
app.get("/", (req, res) => {
    res.send("API is running successfully 🚀");
});

// AUTH ROUTES HERE
app.use("/api/auth", authRoutes);

// USERS ROUTES HERE
app.use("/api/users", userRoutes);

// ORGANIZATION ROUTES HERE
app.use("/api/orgs", orgRoutes);

//PROJECTS ROUTES HERE

app.use("/api/projects", projectRoutes);



// Swagger UI route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;