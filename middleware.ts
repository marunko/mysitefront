// pages/_middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import Cookies from 'cookies'; 

export async function middleware(req: NextRequest) {
  // PAY ATTention MIDDLEWARE is executed on every link including api (? backend)
  const excludedPaths = [
    '/delete_cookies','/show_token','/enter_key', /^\/log\/.*/, /^\/api\/.*/,
   `${process.env.BACKEND_URL}/check-token/`
  ]; // Paths to exclude
  const pathname = req.nextUrl.pathname;
  // Get the IP address from headers (supports multiple proxies)
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "Unknown";

  console.log("Sender IP:", ip);
  // Exclude static assets and excluded paths
  if (
    pathname.startsWith('/_next') || // Static assets
    pathname.startsWith('/favicon.ico') || // Favicon
    pathname.startsWith(`${process.env.NEXT_PUBLIC_BACKEND_URL}`) || 
   // pathname.startsWith(`${process.env.FRONT_END}/api/save-key`) || 
    excludedPaths.some((path) =>
      typeof path === 'string'
        ? pathname === path
        : path instanceof RegExp
        ? path.test(pathname)
        : false
    )
  ) { 
    return NextResponse.next();
  }
  console.log(req.method);
    // Ignore POST requests to `/enter_key`
    if (req.method === 'POST') {
      return NextResponse.next();
    }
 // Check for the 'token' cookie
 const token = req.cookies.get('token')?.value;
 
 // Validate the token
 const isValid = token && token.length > 1 ? await validateToken(token) : false;

 // If no token or invalid token, delete the cookie and redirect to /enter_key
 console.log("token checking... "+isValid);
 if (!token || !isValid) {
   const response = NextResponse.redirect(new URL('/enter_key', req.url));
   console.log("deleting cookies");
   response.cookies.delete('token'); // Remove the token cookie
    
   return response;
 }

 console.log("end of middleware + env "+process.env.NEXT_PUBLIC_BACKEND_URL);
  // Allow the request to continue
  return NextResponse.next();
}

// Mocked function to validate the token on the server
async function validateToken(token: string): Promise<boolean> {
  // Example API call (replace with actual validation logic)
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/check-token/?token=${encodeURIComponent(token)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
 
  });

  if (res.ok) {
    const data = await res.json();
    return data.access; // Assume the API responds with { isValid: true/false }
  }

  return false;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)', // Include only pages
  ],
};
