import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import youtubeRoutes from "./routes/youtube.routes";


const app = express();

app.use(cors());

app.use(express.json());

app.use("/users", userRoutes);

app.use("/auth", authRoutes);

app.use("/videos", youtubeRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutandose en puerto ${PORT}`)
});