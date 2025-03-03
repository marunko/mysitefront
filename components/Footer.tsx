import { useEffect, useState } from "react";


export default function Footer(){

    const [contact, setContact] = useState({ phone: "", email: "" });
    console.log(`${process.env.BACKEND_URL}`);
  useEffect(() => {
    async function fetchContact() {
      try {
         
        const response = await fetch(`http://127.0.0.1:8000/contacts/`,{
            method: "POST",
            headers: {
            "Content-Type": "application/json",
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