const express = require('express');
const app = express();

app.use(express.json());

let reportes = [];

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Semana 7 - Reportes</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 720px; margin: 40px auto; padding: 0 16px; background: #111827; color: #f3f4f6; }
    h1, h2 { color: #ff8c00; }
    .card { background: #1f2937; border: 1px solid #374151; border-radius: 10px; padding: 18px; margin-bottom: 18px; }
    label { display: block; margin-top: 10px; color: #d1d5db; }
    input { width: 100%; padding: 9px; border-radius: 6px; border: 1px solid #4b5563; background: #111827; color: #fff; box-sizing: border-box; }
    button { margin-top: 14px; background: #ff8c00; color: #fff; border: 0; border-radius: 6px; padding: 10px 16px; cursor: pointer; }
    button:hover { background: #ffa733; }
    pre { background: #0b1020; border: 1px solid #374151; border-radius: 6px; padding: 12px; white-space: pre-wrap; color: #7fffb0; }
  </style>
</head>
<body>
  <h1>Semana 7 - Registro de reportes</h1>
  <p>Esta pagina permite agregar y consultar reportes guardados en memoria.</p>

  <div class="card">
    <h2>Agregar reporte</h2>
    <label>Tipo</label>
    <input id="tipo" value="Infraestructura">
    <label>Descripcion</label>
    <input id="descripcion" value="Dano en alumbrado publico">
    <button onclick="agregarReporte()">Enviar reporte</button>
  </div>

  <div class="card">
    <h2>Consultar reportes</h2>
    <button onclick="consultarReportes()">Ver reportes</button>
    <pre id="respuesta"></pre>
  </div>

  <script>
    async function agregarReporte() {
      const res = await fetch('/reportes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipo: document.getElementById('tipo').value,
          descripcion: document.getElementById('descripcion').value
        })
      });
      const data = await res.json();
      document.getElementById('respuesta').textContent = JSON.stringify(data, null, 2);
    }

    async function consultarReportes() {
      const res = await fetch('/reportes');
      const data = await res.json();
      document.getElementById('respuesta').textContent = JSON.stringify(data, null, 2);
    }
  </script>
</body>
</html>`);
});

app.get('/reportes', (req, res) => {
  res.json(reportes);
});

app.post('/reportes', (req, res) => {
  const reporte = {
    id: reportes.length + 1,
    tipo: req.body.tipo,
    descripcion: req.body.descripcion
  };

  reportes.push(reporte);

  res.json({
    mensaje: 'Reporte registrado',
    reporte: reporte
  });
});

app.listen(3000, () => {
  console.log('Servidor ejecutándose en puerto 3000');
});
