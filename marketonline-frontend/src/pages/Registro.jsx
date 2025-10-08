import React, { useState } from "react";
import '../components/registro.css';


const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    fechaNacimiento: "",
    correo: "",
    contrasena: "",
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuario: formData.correo,
          contrasena: formData.contrasena,
          nombre: formData.nombre,
          apellido: formData.apellido,
          cedula: formData.cedula,
          fechaNacimiento: formData.fechaNacimiento,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje("✅ Usuario registrado correctamente.");
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } else {
        setMensaje("⚠️ " + (data.msg || "Error en el registro"));
      }
    } catch (error) {
      setMensaje("❌ Error en el servidor.");
      console.error(error);
    }
  };

  return (
    <div className="clases-fondo">
      <div className="acomodar-cajita">
        <div className="cajita-piola">
          <div className="contenido-login">
            <h1 className="titulo-market">
              <span className="subrayado-market">
                <span className="titulo-azul">Market</span>
                <span className="texto-online">Online</span>
              </span>
            </h1>

            <p className="subtitulo">Crea una cuenta.</p>

            <form onSubmit={handleSubmit} className="formulario-login">
              <div className="inputs-dobles">
                <input
                  type="text"
                  id="nombre"
                  placeholder="Nombre"
                  required
                  value={formData.nombre}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  id="apellido"
                  placeholder="Apellido"
                  required
                  value={formData.apellido}
                  onChange={handleChange}
                />
              </div>

              <input
                type="text"
                id="cedula"
                placeholder="Cédula"
                required
                value={formData.cedula}
                onChange={handleChange}
              />

              <label className="label-fecha" htmlFor="fecha-nacimiento">
                Fecha de nacimiento *
              </label>
              <input
                type="date"
                id="fecha-nacimiento"
                name="fecha-nacimiento"
                required
                value={formData.fechaNacimiento}
                onChange={handleChange}
              />

              <input
                type="email"
                id="correo"
                placeholder="Correo Electrónico"
                required
                value={formData.correo}
                onChange={handleChange}
              />

              <input
                type="password"
                id="contrasena"
                placeholder="Contraseña"
                required
                value={formData.contrasena}
                onChange={handleChange}
              />

              <button type="submit" className="clases-botoncito">
                REGÍSTRATE
              </button>

              <p className="texto-link">
                <a href="/">¿Ya tienes una cuenta?</a>
              </p>
            </form>

            {mensaje && (
              <p id="mensaje" style={{ color: "white", marginTop: "10px" }}>
                {mensaje}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registro;
