import { GetServerSideProps } from "next";
import React from "react";
interface AboutData{
    aboutData: AboutMe;
}
export const getServerSideProps: GetServerSideProps = async (context) => {
const token = context.req.cookies?.token || "";
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/about-me-key/` , {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify({ "token": token }),
      });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();

    return {
      props: { aboutData: data },
    };
  } catch (error) {
    return {
      props: { aboutData: null },
    };
  }
}
function formatText(text: string) {
  return text
    .replace(/\n/g, "<br>")
    .replace(/\t/g, "&emsp;");
}
export default function About({aboutData}: AboutData) {
  
 
  return (
    <div className="secondcolor min-h-screen flex items-center justify-center p-4">
      <div className="frontcolor max-w-3xl w-full shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">About Me</h1>
        { }
        {aboutData ? (
          <div className="mb-4 p-4 border-b border-gray-300">
            <h2 className="text-xl font-semibold">{aboutData.title}</h2>
 
            <p className="italic" dangerouslySetInnerHTML={{ __html: formatText(aboutData?.text || "") }} />
          </div>
        ) : (
          <p className="text-gray-500">No data available.</p>
        )}
      </div>
    </div>
  );
}
