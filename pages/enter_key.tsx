import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const EnterKeyPage = () => {
  const [key, setKey] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!key) {
      setError('Please enter a key.');
      return;
    }

    // Backend check
    console.log("Checking backend from enter_key on link " + process.env.NEXT_PUBLIC_BACKEND_URL);
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/check-token/?token=${encodeURIComponent(key)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
       
    });

    const responseData = await res.json();
    if (responseData?.access) {
      // Save the key to cookies
      console.log("Backend OK, saving to cookies");
      Cookies.set('token', key, {
        secure: process.env.NODE_ENV === 'test',
        expires:30,
        sameSite: 'lax',
       });  // Set cookie with an expiration of 7 days

      // Redirect after saving cookie
      router.push('/show_token');
    } else {
      setError('Token has expired or is invalid');
    }
  };

  return (
    <div className="secondcolor flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="frontcolor shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-4">Please Enter Token Key</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="text-sm text-gray-600">
            Your token is shown at the end of the shared link: 
            <span className="font-mono text-blue-500"> /log/[token_key]</span>
            <p>{process.env.NEXT_PUBLIC_BACKEND_URL}</p>
          </label>
          <input
            type="text"
            placeholder="Enter your key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit" 
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition">
            Submit
          </button>
        </form>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      </div>
    </div>
  );
};

// Server-side check for the cookie
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const token = req.cookies.token;  // Directly checking for the token in the cookies

  if (token) {
    // If the cookie exists, redirect to another page (e.g., homepage)
    console.log(token + " - TOKEN EXISTS");
    return {
      redirect: {
        destination: '/show_token',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default EnterKeyPage;
