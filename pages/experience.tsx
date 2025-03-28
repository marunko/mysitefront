import React from "react";
import Cookies from 'cookies';
import { GetServerSideProps } from "next";
// Define TypeScript types for the API response
interface JobRole {
  roles: string;
}

interface Experience {
  position: string;
  company: string;
  start_date: string;
  end_date: string;
  reference: string;
  job_roles: JobRole[];
}

// Props for the component
interface ExperienceTableProps {
  experiences: Experience[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies?.token || "";
  const res1 = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/experience-key/?token=${encodeURIComponent(token)}`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
 
  });
  const data: Experience[] = await res1.json();

  // Process data to exclude `id` and `tag`
  const processedData: Experience[] = data.map((item) => ({
    position: item.position,
    company: item.company,
    start_date: item.start_date,
    end_date: item.end_date,
    reference: item.reference,
    job_roles: item.job_roles.map((role) => ({
      roles: role.roles,
    })),
  }));

  return {
    props: {
      experiences: processedData,
    },
  };
};

const ExperienceTable: React.FC<ExperienceTableProps> = ({ experiences }) => {
  return (
    <div className="secondcolor min-h-screen p-2">
      <div className="frontcolor mx-auto shadow-lg rounded-lg p-6">
        <h1 className="text-xl font-bold mb-4">Experience</h1>
        <table className="table-auto border-collapse border border-gray-400 w-full">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2">Position</th>
              <th className="border border-gray-400 px-4 py-2">Company</th>
              <th className="border border-gray-400 px-4 py-2">Start Date</th>
              <th className="border border-gray-400 px-4 py-2">End Date</th>
              {/* Hide Job Roles on small screens */}
              <th className="border border-gray-400 px-4 py-2 hidden md:table-cell">Job Roles</th>
            </tr>
          </thead>
          <tbody>
            {experiences.map((experience, index) => (
              <tr key={index} className="border-t">
                <td className="border border-gray-400 px-4 py-2">
                  {experience.position}
                  <span className="flex justify-end">
                    {experience.reference && (
                      <a href={experience.reference} className="italic underline text-blue-600" target="_blank" rel="noopener noreferrer">
                        Reference
                      </a>
                    )}
                  </span>
                </td>
                <td className="border border-gray-400 px-4 py-2">{experience.company}</td>
                <td className="border border-gray-400 px-4 py-2">{experience.start_date}</td>
                <td className="border border-gray-400 px-4 py-2">
                  {!experience.end_date ? (
                    <span className="italic">Present</span>
                  ) : experience.end_date}
                </td>
                {/* Hide Job Roles on small screens */}
                <td className="border border-gray-400 px-4 py-2 hidden md:table-cell">
                  <ul className="list-disc ml-5">
                    {experience.job_roles.map((role, roleIndex) => (
                      <li key={roleIndex}>{role.roles}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExperienceTable;
