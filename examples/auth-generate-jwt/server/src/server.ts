import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import crypto from 'crypto';

dotenv.config({ path: '.env.local' });

const app = express();
const port = 3001;

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    methods: ['GET', 'POST'],
  }),
);

function base64urlEncode(str: string) {
  return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

app.get('/generate-jwt', async (_req, res) => {
  console.log('1 - /generate-jwt endpoint called');
  try {
    const header = {
      typ: 'JWT',
      alg: 'HS256',
      kid: process.env.ABLY_API_KEY_NAME || '',
    };
    const currentTime = Math.round(Date.now() / 1000);
    const claims = {
      iat: currentTime /* current time in seconds */,
      exp: currentTime + 3600 /* time of expiration in seconds */,
      'x-ably-capability': '{"*":["*"]}',
    };
    const base64Header = base64urlEncode(btoa(JSON.stringify(header)));
    const base64Claims = base64urlEncode(btoa(JSON.stringify(claims)));

    /* Apply the hash specified in the header */
    const hmac = crypto.createHmac('sha256', process.env.ABLY_API_KEY_SECRET || '');
    hmac.update(base64Header + '.' + base64Claims);
    const signature = base64urlEncode(hmac.digest('base64'));
    const ablyJwt = base64Header + '.' + base64Claims + '.' + signature;

    console.log('2 - JWT generated: ', ablyJwt);
    res.json(ablyJwt);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate token' });
  }
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});