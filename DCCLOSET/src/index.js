import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import produtoController from './controller/produtoController.js'

import usuarioController from './controller/usuarioController.js'



const servidor = express();
servidor.use(cors());
servidor.use(express.json());


servidor.use(produtoController);
servidor.use(usuarioController);





const port = process.env.PORT;
servidor.listen(port, ()=> console.log(`API subiu na porta ${port}`));