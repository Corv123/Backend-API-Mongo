import express, { Request, Response, Application, NextFunction } from 'express';
import dotenv from 'dotenv';
import { initializeDatabase } from './database/connection';
import cors from "cors";
import { allRoutes } from './routes/routes';

dotenv.config();

const CORS_WHITELIST: string[] = [
    // Add your allowed origins here
];

const startServer = async () => {
    try {
        // Initialize database and models
        await initializeDatabase();

        const server: Application = express();
        const PORT = process.env.PORT || 8000;

        server.use(cors({ origin: CORS_WHITELIST }));
        
        server.use(function (req: Request, res: Response, next: NextFunction) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
            
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