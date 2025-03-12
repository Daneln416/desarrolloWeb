import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { getPersonajes } from './personajes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);
console.log(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));




app.get('/', (req, res) => {
    const personajesData = getPersonajes();
    if (!personajesData) {
      return res.status(500).send('Error al cargar los datos de personajes');
    }
  
    const planetas = [...new Set(personajesData.map(p => p.homeworld).filter(p => p !== "NA"))];
    const especies = [...new Set(personajesData.map(p => p.species).filter(p => p !== "NA"))];
  
    res.render('home', {
      personajes: personajesData,
      planetas,
      especies,
      planetaSeleccionado: req.query.planeta || '',
      especieSeleccionada: req.query.especie || ''
    });
  });

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});