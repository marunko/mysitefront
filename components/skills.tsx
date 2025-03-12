// components/Skills.js
interface SkillsProps {
    skills: Skill[];
  }
export default function Skills ({ skills }: SkillsProps) {
    return (
      <section className="p-8 ">
         <h3 className="text-3xl font-semibold flex items-center mb-5">
          <span className="flex-grow border-t border-gray-500 mr-4"></span>
          Skills<span className="flex-grow border-t border-gray-500 ml-4"></span>
      </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((skill, index) => (
            <div key={index} className="p-4 border rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">{skill.title}</h3>
              <div className="flex flex-wrap gap-2">
                {skill.skill_tags.map((subTag, i) => (
                  <span key={i} className="bg-blue-400 text-white dark:bg-gray-100 px-3 py-1 rounded-full text-sm dark:text-gray-900">
                    {subTag.text}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }