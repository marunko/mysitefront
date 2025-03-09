import { useEffect, useState } from "react";
import Cookies from 'js-cookie';

export default function Footer(){

    const [contact, setContact] = useState({ phone: "", email: "" });
    console.log(`${process.env.NEXT_PUBLIC_BACKEND_URL}/contacts/`);
  useEffect(() => {
    async function fetchContact() {
      try {
        const csrfToken = Cookies.get('csrftoken') || ''; // Ensure it's always a string
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/contacts/`,{
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            'X-CSRFToken': csrfToken,  // Add the CSRF token from cookies
            },
            
        });
        if (!response.ok) {
          throw new Error("Failed to fetch contact data");
        }
        const data = await response.json();
        setContact({ phone: data.phone, email: data.email });
      } catch (error) {
        console.error("Error fetching contact data:", error);
      }
    }
    fetchContact();
  }, []);

  return (
    <footer className="mt-auto  justify-between items-center">
      <div className="p-8 text-center">
        <p>Phone: {contact.phone || "Loading..."}</p>
        <p>Email: {contact.email || "Loading..."}</p>
        <p className="text-gray-600">&copy; 2025 Pavlo Marunko. All rights reserved.</p>
      </div>
    </footer>
  );
}