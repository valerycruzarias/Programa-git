import express from "express";
import Product from "../models/product.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { nombre, descripcion, precio, imagen } = req.body;

    const nuevo = new Product({ nombre, descripcion, precio, imagen });
    await nuevo.save();

    res.status(201).json({ success: true, msg: "Producto creado", producto: nuevo });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Error al crear producto", error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const productos = await Product.find();
    res.json({ success: true, productos });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Error al obtener productos", error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const producto = await Product.findById(req.params.id);
    if (!producto) return res.status(404).json({ msg: "Producto no encontrado" });
    res.json({ success: true, producto });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Error", error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const producto = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, msg: "Producto actualizado", producto });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Error", error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, msg: "Producto eliminado" });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Error", error: err.message });
  }
});

export default router;
