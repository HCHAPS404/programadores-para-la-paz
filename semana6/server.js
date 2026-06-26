const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Semana 6 - Probador de API</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 720px; margin: 40px auto; padding: 0 16px; background: #0f1117; color: #e6e6e6; }
    h1 { color: #ff8c00; }
    h2 { color: #ffa733; margin-top: 32px; }
    .card { background: #1a1d27; border: 1px solid #2a2e3a; border-radius: 10px; padding: 20px; margin-bottom: 20px; }
    label { display: block; margin: 10px 0 4px; font-size: 14px; color: #b8b8b8; }
    input { width: 100%; padding: 8px 10px; border-radius: 6px; border: 1px solid #3a3e4a; background: #11141c; color: #fff; box-sizing: border-box; }
    button { margin-top: 14px; background: #ff8c00; color: #fff; border: none; padding: 10px 18px; border-radius: 6px; font-size: 15px; cursor: pointer; }
    button:hover { background: #ffa733; }
    pre { background: #11141c; border: 1px solid #2a2e3a; border-radius: 6px; padding: 12px; overflow-x: auto; white-space: pre-wrap; min-height: 20px; color: #7fffb0; }
  </style>
</head>
<body>
  <h1>Semana 6 — Probador de API</h1>
  <p>Esta página envía peticiones POST.</p>

  <div class="card">
    <h2>POST /registro</h2>
    <label>Nombre</label>
    <input id="nombre" value="Maria">
    <label>Mensaje</label>
    <input id="mensaje" value="Hola comunidad">
    <button onclick="enviarRegistro()">Enviar registro</button>
    <label>Respuesta del servidor:</label>
    <pre id="respRegistro"></pre>
  </div>

  <div class="card">
    <h2>POST /incidencia</h2>
    <label>Tipo</label>
    <input id="tipo" value="Iluminacion publica">
    <label>Descripción</label>
    <input id="descripcion" value="La lampara del parque no funciona desde hace varios dias">
    <button onclick="enviarIncidencia()">Enviar incidencia</button>
    <label>Respuesta del servidor:</label>
    <pre id="respIncidencia"></pre>
  </div>

  <script>
    async function enviarRegistro() {
      const res = await fetch('/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: document.getElementById('nombre').value,
          mensaje: document.getElementById('mensaje').value
        })
      });
      const data = await res.json();
      document.getElementById('respRegistro').textContent = JSON.stringify(data, null, 2);
    }

    async function enviarIncidencia() {
      const res = await fetch('/incidencia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipo: document.getElementById('tipo').value,
          descripcion: document.getElementById('descripcion').value
        })
      });
      const data = await res.json();
      document.getElementById('respIncidencia').textContent = JSON.stringify(data, null, 2);
    }
  </script>
</body>
</html>`);
});

app.post('/registro', (req, res) => {
  const nombre = req.body.nombre;
  const mensaje = req.body.mensaje;

  res.json({
    estado: 'Datos recibidos',
    nombre: nombre,
    mensaje: mensaje
  });
});

app.post('/incidencia', (req, res) => {
  const tipo = req.body.tipo;
  const descripcion = req.body.descripcion;

  res.json({
    mensaje: 'Incidencia registrada',
    tipo: tipo,
    descripcion: descripcion
  });
});

app.listen(3000, () => {
  console.log('Servidor ejecutándose en puerto 3000');
});
