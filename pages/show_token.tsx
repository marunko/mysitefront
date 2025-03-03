// pages/show_token.tsx
import { GetServerSideProps } from 'next';
import Cookies from 'cookies';

interface ShowTokenProps {
  token: string | null;
}

const ShowToken = ({ token }: ShowTokenProps) => {
  return (
    <div>
      <h1>{token ? `Token: ${token}` : 'No token found'}</h1>
    </div>
  );
};

// Server-side function to get the cookie
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const cookies = new Cookies(req, res);
  const token = cookies.get('token') || null; // Get the 'token' cookie

  return {
    props: { token }, // Pass the token as a prop to the page
  };
};

export default ShowToken;
