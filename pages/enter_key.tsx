// pages/enter_key.tsx
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'cookies';
const EnterKeyPage = () => {
  const [key, setKey] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("handleSubmit");
    if (!key) {
      
      setError('Please enter a key.');
      return;
    }
// backend check
console.log("checking backend from enter_key on link  " + process.env.NEXT_PUBLIC_BACKEND_URL);
     const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/check-token/`, {//validate key server
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"token": key }),
    });
    if ((await res.json())?.access) {
       // create cookies here !!!!
       console.log("backend OK saving to cookies");
       const save_key_cookies = await fetch(`/api/save-key`, {//validate key server
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key }),
      });
      if(save_key_cookies.ok)
      {
        router.push('/show_token'); // Redirect to the homepage or another page
      }
      else setError('Cookies not saved');
    } else {
      setError('Token has expired or invalid');
    } 
  };

  return (
    <div className="secondcolor flex  items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="frontcolor shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-4">Please Enter Token Key</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="text-sm text-gray-600">
            Your token is shown at the end of the shared link: 
            <span className="font-mono text-blue-500"> /log/[token_key]</span>
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
  const cookies = new Cookies(req, res);
  const token = cookies.get('token'); // Replace with your cookie name
 
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
