import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.use(express.json());

// Route de test
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello from Express + TS! ' });
});

app.post('/echo', (req: Request, res: Response) => {
  res.status(200).json({ echo: req.body });
});

app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});