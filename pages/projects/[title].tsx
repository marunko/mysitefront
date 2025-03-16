import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";

function formatText(text: string) {
  return text
    .replace(/\n/g, "<br>")
    .replace(/\t/g, "&emsp;");
}
export default function ProjectDetail({ project }: { project: any }) {
  if (!project) {
    return <div className="text-center text-red-500">Project not found.</div>;
  }

  return (
    <div className="secondcolor min-h-screen flex items-center justify-center p-4">
      <div className="frontcolor max-w-1xl mx-auto shadow-lg rounded-lg p-6">
      
        {/* Project Image */}
        <div className="relative w-full h-64">
          <Image src={project.image_path} alt={project.title} layout="fill" objectFit="cover" className="rounded-lg" />
        </div>

        {/* Project Title */}
        <h1 className="text-3xl font-bold mt-6">{project.title}</h1>

        {/* Project Description */}
        <p className="text-gray-600 dark:text-gray-400 mt-4" dangerouslySetInnerHTML={{ __html: formatText(project.description || "") }}/>

        {/* External Link */}
        <div className="mt-6">
          <Link href={project.link} className="text-blue-600 hover:underline">
              Visit Project
          </Link>
        </div>
      </div>
    </div>
  );
}

// Fetch Data from API with Cookie-based Authentication (SSR)
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { title } = context.params as { title: string };
  const token = context.req.cookies?.token || "";
  console.log(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects-key/${title}/`);
  if (!token) {
    return {
      redirect: {
        destination: "/enter_key", // Redirect if no token found
        permanent: false,
      },
    };
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects-key/${title}/?token=${encodeURIComponent(token)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          
        },
       
      });

    if (!res.ok) {
      throw new Error("Failed to fetch project data");
    }

    const project = await res.json();

  
    return {
      props: { project },
    };
  } catch (error) {
    console.error("Error fetching project data:", error);
    return {
      notFound: true,
    };
  }
};
