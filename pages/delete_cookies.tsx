// pages/delete_cookies.tsx
import { useRouter } from 'next/router';
import Cookies from 'cookies';
import { NextApiRequest, NextApiResponse } from 'next';

const DeleteCookiesPage = ( ) => {
  const router = useRouter();

  const handleDeleteCookies = async () => {
    // Call the API route to delete cookies
 
    const res = await fetch('/api/delete-cookies', {
      method: 'POST',
    });

    if (res.ok) {
      // Redirect the user after cookies are deleted (optional)
      router.push('/enter_key'); // Redirect to the homepage or another page
    } else {
      console.error('Failed to delete cookies');
    }
  };

  return (
    <div>
      <h1>Delete Cookies</h1>
      <p>Click the button below to reset all cookies.</p>
      <button onClick={handleDeleteCookies}>Reset Cookies</button>
    </div>
  );
};

export default DeleteCookiesPage;
