// src/index.ts
import express from 'express';
import { RandomUserResponse, User } from './types';
const cors = require('cors');

const app = express();
const PORT = process.env.PORT ?? 3000;
app.use(cors());
app.get('/api/users', async (_req, res) => {
  try {
    const resp = await fetch('https://randomuser.me/api/?results=10');
    

    const data = (await resp.json()) as RandomUserResponse;
    

    const { results } = data;

    const users = results.map((u: User) => ({
      nombre:            `${u.name.first} ${u.name.last}`,
      genero:            u.gender,
      ubicacion:         `${u.location.city}, ${u.location.country}`,
      correo:            u.email,
      fechaNacimiento:   u.dob.date,
      fotografia:        u.picture.large,
    }));

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}/api/users`);
});
