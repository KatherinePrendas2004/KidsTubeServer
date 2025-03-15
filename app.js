const express = require('express');
const conectarDB = require('./utils/conexion');
const authRoutes = require('./routes/authRoutes');
const photoRoutes = require('./routes/photoRoutes');

const userRoutes = require('./routes/userRoutesRestricted');
const cors = require("cors");



const app = express();
conectarDB();

app.use(cors({
  domains: '*',
  methods: "*"
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.json());

app.use('/auth', authRoutes);

app.use('/usuarios', userRoutes);

app.use('/photo', photoRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
