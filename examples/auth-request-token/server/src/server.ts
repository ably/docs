import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import Ably from 'ably';

dotenv.config({ path: path.resolve(__dirname, '../../../.env.local') });

const app = express();
const port = 3001;

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    methods: ['GET', 'POST'],
  }),
);

const ably = new Ably.Rest(process.env.VITE_PUBLIC_ABLY_KEY || '');

app.get('/request-token', async (_req, res) => {
  console.log('1 - /request-token endpoint called');
  try {
    const tokenRequest = await ably.auth.requestToken({ clientId: 'example-client-id' });
    console.log('2 - Token generated:', tokenRequest);
    res.json(tokenRequest);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate token' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
