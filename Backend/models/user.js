import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  usuario: { type: String, required: true, unique: true },
  contrasena: { type: String, required: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  cedula: { type: String, required: true },
  fechaNacimiento: { type: Date, required: true }
});

export default mongoose.model("User", UserSchema);
