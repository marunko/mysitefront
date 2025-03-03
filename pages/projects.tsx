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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  // Extract token from cookies
  const cookies = new Cookies(req);
  const token = cookies.get('token') || null;
  // Fetch certifications data from the API
  const res = await fetch(`${process.env.BACKEND_URL}/projects-key/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      
    },
    body: JSON.stringify({ "token": token }),
  });

  if (!res.ok) {
    return {
      notFound: true,
    };
  }

  const data: Project[] = await res.json();

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
