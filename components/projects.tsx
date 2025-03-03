// components/Projects.js
import Link from "next/link";
  interface ProjectsProps {
    projects: Project[];
  }
 

  export default function Projects({ projects }: ProjectsProps) {
    return (
      <section className="p-8 secondcolor">
        {/* Section Header */}
        <h3 className="text-3xl font-semibold flex items-center mb-5">
          <span className="flex-grow border-t border-gray-500 mr-4"></span>
          Projects
          <span className="flex-grow border-t border-gray-500 ml-4"></span>
        </h3>
  
        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
          {projects.map((project, index) => (
            <Link key={index} href={`/projects/${encodeURIComponent(project.title)}`}>
              <div className="block rounded-lg overflow-hidden frontcolor shadow-lg transition-transform hover:scale-105">
                {/* Project Image */}
                <img
                  src={project.image_path}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                
                {/* Project Info */}
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    {project.summary} 
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    );
  }
  