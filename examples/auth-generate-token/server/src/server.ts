import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import Ably from 'ably';

dotenv.config({ path: '.env.local' });

const app = express();
const port = 3001;

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  }),
);

const ably = new Ably.Rest(process.env.ABLY_API_KEY || '');

app.get('/auth-url', async (_req, res) => {
  console.log('1 - /auth-url endpoint called');
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
