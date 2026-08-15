import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

// Middlewares
app.use(cors());
app.use(express.json());

// Rota de Health Check (MUITO IMPORTANTE PARA A AWS)
// O Elastic Beanstalk acessa a rota raiz '/' o tempo todo para checar se a sua API está "viva".
// Se essa rota não devolver um status 200, a AWS acha que a aplicação quebrou.
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Reserva de Salas API está rodando perfeitamente! 🚀' });
});

// Suas outras rotas viriam aqui embaixo...
// app.get('/salas', async (req, res) => { ... });

// Configuração da Porta (MUITO IMPORTANTE PARA A AWS)
// A AWS injeta a porta automaticamente através do process.env.PORT (geralmente 8080).
// O "|| 3000" serve para quando você for rodar localmente na sua máquina.
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});