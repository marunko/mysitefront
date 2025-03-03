// pages/api/delete-cookies.ts
import { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Initialize the Cookies utility
    const cookies = new Cookies(req, res);

    // Clear the cookies by setting their expiration to the past
    console.log("ressetting cookies");
    cookies.set('token'); // Reset your specific token cookie (replace with actual cookie name)
    //cookies.set('csrftoken'); // Optional: Clear CSRF token cookie
    console.log("resset cookies");
    // Optionally clear other cookies
    // cookies.set('another_cookie_name');

    // Respond with a success message
    return res.status(200).json({ message: 'Cookies have been reset.' });
  }

  res.status(405).json({ message: 'Method Not Allowed' });
}
