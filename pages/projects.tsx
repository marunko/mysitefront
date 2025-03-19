import React from "react";
import { GetServerSideProps } from "next";
import Cookies from 'cookies';
import { motion } from "framer-motion"; // Animation library
import Link from "next/link";
// Define TypeScript types for the API response
 

interface ProjectPageProps {
  projects: Project[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Extract token from cookies
  const token = context.req.cookies?.token || "";
  // Fetch certifications data from the API
  const res1 = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects-key/?token=${encodeURIComponent(token)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      
    },
 
  });
 
  if (!res1.ok) {
    return {
      notFound: true,
    };
  }

  const data: Project[] = await res1.json();

  // Process data to exclude `id` and `tag`
  const processedData: Project[] = data.map((item) => ({
    title: item.title,
    description: item.description,
    summary: item.summary,
    image_path: item.image_path,
    link: item.link,
  }));
 
  return {
    props: {
      projects: processedData,
    },
  };
};

const ProjectPage: React.FC<ProjectPageProps> = ({ projects }:ProjectPageProps) => {
  return (
    <div className="container secondcolor mx-auto p-4 flex flex-col ">
      <h1 className="text-xl font-bold mb-6">Projects</h1>
 
      <div className="flex flex-col gap-2 items-center">
        {projects.map((proj, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="max-w-1xl frontcolor h-2/3 shadow-md rounded-lg overflow-hidden flex"
            style={{ maxHeight: "25vh" }}
          >
            {/* Left: Image */}
            
            <div className="w-1/3">
            <Link key={index} href={`/projects/${encodeURIComponent(proj.title)}`}> 
              <img
                src={proj.image_path}
                alt={proj.title}
                className="w-full h-full object-cover"
                style={{ maxHeight: "25vh" }}
              /></Link>
            </div>

            {/* Right: Title and Summary */}
            <div className="w-2/3 p-4 flex flex-col justify-center">
            <Link key={index} href={`/projects/${encodeURIComponent(proj.title)}`}>
              <h2 className="text-lg font-semibold">{proj.title}</h2>  </Link>
              <p className="text-sm text-gray-600">{proj.summary}</p>
            </div>
           
          </motion.div>
        ))}
      </div>
  
    </div>
  );
};

export default ProjectPage;
