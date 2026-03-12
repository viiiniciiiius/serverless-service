import express from 'express';
import validateRoutes from './routes/validateRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/validate', validateRoutes);

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando com validador de 6 digitos em http://localhost:${PORT}/validate`);
  });
}

export default app;