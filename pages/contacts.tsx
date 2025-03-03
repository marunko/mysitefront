// add to database if something changes we can directly change on DB then on server
import { useEffect, useState } from "react";
import { Facebook, Github } from "lucide-react";

export default function HireMe() {
  const [contact, setContact] = useState({ phone: "", email: "", facebook: "", github: "" });
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchContact() {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/contacts/` , {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              
            }
          });
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setContact({ phone: data.phone, email: data.email, facebook: data.facebook, github: data.github });
      } catch (error) {
        console.error("Error fetching contact data:", error);
      }
    }
    fetchContact();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    window.location.href = `mailto:marunkopavlo@gmail.com?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(message)}`;
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-8 secondcolor">
      <div className="frontcolor grid grid-cols-1 md:grid-cols-2 gap-8 shadow-lg rounded-2xl p-8 w-full max-w-4xl secondcolor">
        {/* Left Column - Contacts & Social Links */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <h2 className="text-2xl font-semibold">Contact Me</h2>
          <p>Phone: {contact.phone || "Loading..."}</p>
          <p>Email: {contact.email || "Loading..."}</p>
          <div className="flex gap-4 mt-4">
            {contact.facebook && (
              <a
                href={contact.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 flex items-center gap-2"
              >
                <Facebook size={20} />
                Facebook
              </a>
            )}
            {contact.github && (
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github size={20} />
                GitHub
              </a>
            )}
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a subject"
            className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  dark:bg-gray-200"
            required
          />
          <label className="">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message"
            className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 dark:bg-gray-200"
            required
          ></textarea>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition">
            Send Email
          </button>
        </form>
      </div>
    </div>
  );
}
