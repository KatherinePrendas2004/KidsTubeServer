const express = require('express');
const conectarDB = require('./utils/conexion');
const authRoutes = require('./routes/authRoutes');

const cors = require("cors");



const app = express();
conectarDB();
app.use(cors({
  domains: '*',
  methods: "*"
}));

app.use(express.json());

app.use('/auth', authRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
