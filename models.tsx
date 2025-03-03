

interface AboutMe{
    title: string;
    text: string;
    summary: string;
}
interface JobRole {
    roles: string;
  }
interface Experience {
    position: string;
    company: string;
    start_date: string;
    end_date: string;
    job_roles: JobRole[];
  }
 
  interface SkillTag {
    text: string;
  }
  
  interface Skill {
    title: string;
    skill_tags: SkillTag[];
  }

interface Certification {
    title: string;
    text: string;
    image_path: string;
    link: string;
  }

  interface Project {
    title: string;
    description: string;
    summary: string;
    image_path: string;
    link: string;
  }

  // Models for Landing Page 
interface ExperienceMain{
  position: string,
  company: string,
  start_date: string,
  end_date: string,
}