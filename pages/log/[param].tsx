import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Cookies from 'cookies';

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { req, res } = context;
  const { param } = context.params as { param: string };
 
  // reset cookies if they existed 
  const cookies = new Cookies(req, res);
  cookies.set('token'); // Remove the token cookie
  // Check if the param exists and has a length of 14
  if (!param || param.length <= 1) {
    return {
      redirect: {
        destination: '/enter_key',
        permanent: false,
      },
    };
  }

  let token = param;
  // Validate the param on the server
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL; // Load backend URL from .env
  console.log(backendUrl);
  const validateResponse = await fetch(`${backendUrl}/check-token/?token=${encodeURIComponent(token)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
 
  });

  const isValid = (await validateResponse.json()).access;
  console.log(isValid);
  //console.log("isValid "+validateResponse.ok +" "+ (await validateResponse.json()).message)
  if (isValid) {
    // Save the token as a cookie using Cookies library
    console.log("creating cookies");
    const cookies = new Cookies(req, res);
    cookies.set('token', param, {
 
      secure: process.env.NODE_ENV === 'test',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      sameSite: 'lax',
    });

    // Redirect to a secure page (update the destination as needed)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  } else {
    // Delete existing token cookie if present before redirecting
    console.log("deleting cookies");
    const cookies = new Cookies(req, res);
    cookies.set('token'); // Remove the token cookie

    return {
      redirect: {
        destination: '/enter_key',
        permanent: false,
      },
    };
  }
};

const LogPage = () => {
  return null; // The user will never see this page because of the redirects
};

export default LogPage;
