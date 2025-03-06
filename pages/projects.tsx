import React from "react";
import { GetServerSideProps } from "next";
import Cookies from 'cookies';

// Define TypeScript types for the API response
interface Project {
  title: string;
  description: string;
  image_path: string;
  link: string;
}

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
    image_path: item.image_path,
    link: item.link,
  }));

  return {
    props: {
        description: processedData,
    },
  };
};

const ProjectPage: React.FC<ProjectPageProps> = ({ projects }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-6">Project</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj, index) => (
          <a
            key={index}
            href={proj.link}
            target="_blank"
            rel="noopener noreferrer"
            className="relative rounded-lg overflow-hidden shadow-lg group hover:scale-105 transition-transform duration-300"
            style={{
              backgroundImage: `url(${proj.image_path})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "300px",
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-70 transition-all duration-300 flex flex-col justify-center items-center p-4 text-center text-white">
              <h2 className="text-lg font-semibold mb-2">{proj.title}</h2>
              <p className="text-sm">{proj.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;
