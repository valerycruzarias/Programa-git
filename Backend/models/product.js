import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  precio: { type: Number, required: true },
  imagen: { type: String }, 
  creadoPor: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
}, { timestamps: true });

const Product = mongoose.model("Product", ProductSchema);
export default Product;
