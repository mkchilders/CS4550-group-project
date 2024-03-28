import express from 'express';
import QuizRoutes from "./QuizRoutes.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
QuizRoutes(app);
app.listen(4000)