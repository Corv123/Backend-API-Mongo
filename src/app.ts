import express, { Request, Response, Application, NextFunction } from 'express';
import dotenv from 'dotenv';
import { initializeDatabase } from './database/connection';
import cors from "cors";
import { allRoutes } from './routes/routes';

dotenv.config();

const CORS_WHITELIST: string[] = [
    'http://127.0.0.1:3000',  // Alternative localhost format
    'http://localhost:3000',  // React development server
    'http://localhost:3001',  // Alternative React port
];

const startServer = async () => {
    try {
        // Initialize database and models
        await initializeDatabase();

        const server: Application = express();
        const PORT = process.env.PORT || 8000;
        
        server.use(cors({ 
            origin: CORS_WHITELIST,
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
            allowedHeaders: [
                'Origin',
                'X-Requested-With', 
                'Content-Type', 
                'Accept',
                'Authorization'
            ]
        }));
            
        server.use(express.json());

        server.use("/api/v1", allRoutes);

        server.get("/", (req: Request, res: Response) => res.send("Server running..."));

        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();