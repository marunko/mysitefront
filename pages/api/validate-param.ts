import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { token } = req.body;
console.log('validation param token --------------- '+token);
    // Example validation logic
    if (token === '1234') {
      res.status(200).json({ message: true });
    } else {
      console.log("Validation failed here");
      res.status(400).json({ message: false });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
