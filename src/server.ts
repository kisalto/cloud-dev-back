import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const app = express();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL não definida');
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

// Configuração explícita do CORS
const corsOptions = {
  origin: [
    'http://reserva-salas-front.s3-website.us-east-2.amazonaws.com', // Seu frontend no S3
    'http://localhost:5173', // Vite local (para você testar na sua máquina)
    'http://localhost:3000'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));

// É uma boa prática adicionar o middleware de OPTIONS
app.options('*', cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Reserva de Salas API está rodando perfeitamente! 🚀',
  });
});

const PORT = Number(process.env.PORT) || 8080;

await prisma.$connect();
console.log('Conectado ao PostgreSQL!');

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});