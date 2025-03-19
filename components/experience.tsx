// components/Experience.js
 
interface ExperienceProps {
  experiences: Experience[];
}

export default function Experience({ experiences }: ExperienceProps) {
  return (
    <section className="p-8 dark:bg-gradient-to-b from-[#1a1a2e] to-[#161624]">
      <h3 className="text-3xl font-semibold flex items-center ">
          <span className="flex-grow border-t border-gray-500 mr-4"></span>
          Experience<span className="flex-grow border-t border-gray-500 ml-4"></span>
      </h3>
      <div className="space-y-3 mt-5">
        {experiences.map((exp, index) => (
          <div key={index} className="p-4 frontcolor border rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold">{exp.position}</h3>
            <p className="">{exp.company}</p>
            <p className="">
              {exp.start_date} - {!exp.end_date? "Present": exp.end_date}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}