// index.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para parsear JSON (si vas a usar formularios)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoose = require('mongoose');



// Reemplaza esta URI con la que te da MongoDB Atlas o tu local
// Conexión a MongoDB local
mongoose.connect('mongodb://127.0.0.1:27017/contactosDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch((err) => console.error('❌ Error al conectar a MongoDB:', err));

// fin de coneccion
// Ruta de ejemplo (puedes agregar más después)


app.get('/api/hello', (req, res) => {
  res.json({ mensaje: '¡Hola desde el backend!' });
});

// Ruta del contacto 
const Contacto = require('./models/contacto');

app.post('/contacto', async (req, res) => {
  const { nombre, email, mensaje } = req.body;

  try {
    const nuevoContacto = new Contacto({ nombre, email, mensaje });
    await nuevoContacto.save();
    res.send('✅ Tu mensaje fue guardado correctamente.');
  } catch (error) {
    console.error('❌ Error al guardar en MongoDB:', error);
    res.status(500).send('Hubo un error al guardar tu mensaje.');
  }
});


// fin de ruta contacto


// Escucha del servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
