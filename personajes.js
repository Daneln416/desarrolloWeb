import fs from 'node:fs';
import path from 'node:path';

var personajes = undefined;

const pathFile = path.resolve('./starwar.json');

fs.readFile(pathFile, { encoding: 'utf8' }, (err, data) => {
  if (!err) {
      personajes = JSON.parse(data); 
      console.log(`Se cargaron ${personajes.length} personajes`);
  } else {
    console.error('Error al cargar los datos:', err);
    personajes = null;
  }
});

export function getPersonajes() {
  return personajes;
}
