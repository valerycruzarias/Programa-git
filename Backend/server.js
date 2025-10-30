import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Importar rutas
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/Products.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Obtener rutas absolutas
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors());
app.use(express.json());

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// Rutas API
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Rutas frontend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.get("/productos", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/productos.html"));
});

app.get("/registro", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/registro.html"));
});

// Conexión a MongoDB y arranque del servidor
mongoose
  .connect(process.env.MONGO_URI) 
  .then(() => {
    console.log("Conectado a MongoDB correctamente");
    app.listen(PORT, () =>
      console.log(`Servidor corriendo en http://localhost:5000`)
    );
  })
  .catch((err) => console.error("Error al conectar con MongoDB:", err));
