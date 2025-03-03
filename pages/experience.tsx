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

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
  const cookies = new Cookies(req, res);
  const token = cookies.get('token') || null;
  const res1 = await fetch(`${process.env.BACKEND_URL}/experience-key/`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ "token": token }),
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
    <div className="min-h-screen secondcolor">
      <div className="container mx-auto p-4 min-h-2/4">
        <h1 className="text-xl font-bold mb-4">Experience Table</h1>
        <table className="table-auto border-collapse border border-gray-400 w-full">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2">Position</th>
              <th className="border border-gray-400 px-4 py-2">Company</th>
              <th className="border border-gray-400 px-4 py-2">Start Date</th>
              <th className="border border-gray-400 px-4 py-2">End Date</th>
              <th className="border border-gray-400 px-4 py-2">Job Roles</th>
            </tr>
          </thead>
          <tbody>
            {experiences.map((experience, index) => (
              <tr key={index} className="border-t">
                <td className="border border-gray-400 px-4 py-2">{experience.position}
                  <span className="flex justify-end"> 
                    {experience.reference && (<a href={experience.reference} className="italic underline text-blue-600" target="_blank" rel="noopener noreferrer">
          Reference
        </a>)}
                  </span></td>
                <td className="border border-gray-400 px-4 py-2">{experience.company}</td>
                <td className="border border-gray-400 px-4 py-2">{experience.start_date}</td>
                <td className="border border-gray-400 px-4 py-2">{!experience.end_date ? (<span className="italic">Present</span>) :experience.end_date}</td>
                <td className="border border-gray-400 px-4 py-2">
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
