import { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { key } = req.body;

    if (!key) {
      return res.status(400).json({ message: 'Key is required' });
    }

    // Set the cookie using the Cookies library
    const cookies = new Cookies(req, res);
    console.log("setting token cookies");

    // Set cookie options directly
    cookies.set('token', key, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'test',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      sameSite: 'lax',
    });
    console.log("SETTED COOKIES " + key);
    console.log(process.env.NODE_ENV);
    return res.status(200).json({ message: 'Key saved successfully' });
  }

  res.status(405).json({ message: 'Method Not Allowed' });
}
