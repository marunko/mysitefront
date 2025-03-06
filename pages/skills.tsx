import React from "react";
import { GetServerSideProps } from "next";
import Cookies from "cookies";

// Define TypeScript types for the API response
interface SkillTag {
  text: string;
}

interface Skill {
  title: string;
  skill_tags: SkillTag[];
}

interface SkillsPageProps {
  skills: Skill[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Extract token from cookies
  const token = context.req.cookies?.token || "";

  // Fetch skills data from the API
  const res1 = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/skills-key/?token=${encodeURIComponent(token)}`, {
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

  const data: Skill[] = await res1.json();

  // Process data to exclude `id` and `tag`
  const processedData: Skill[] = data.map((item) => ({
    title: item.title,
    skill_tags: item.skill_tags.map((tag) => ({
      text: tag.text,
    })),
  }));

  return {
    props: {
      skills: processedData,
    },
  };
};

const SkillsPage: React.FC<SkillsPageProps> = ({ skills }) => {
  return (
    <div className="min-h-screen secondcolor"> 
      <div className="container mx-auto p-4 ">
        <h1 className="text-xl font-bold mb-4">Skills</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill, index) => (
            <div key={index}
              className="border rounded-lg p-4 shadow-lg frontcolor">
              <h2 className="text-lg font-semibold mb-2">{skill.title}</h2>
              <ul className="list-disc list-inside">
                {skill.skill_tags.length > 0 ? (
                  skill.skill_tags.map((tag, tagIndex) => (
                    <li key={tagIndex} className="flex items-center">
                      <span className="text-green-500 mr-2">✔</span>
                      {tag.text}
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500 italic">No tags available</li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsPage;
