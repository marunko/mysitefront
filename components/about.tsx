import { useTheme } from "@/context/ThemeContext";
 
import DarkAbout from "./about_theme/dark";
import LightAbout from "./about_theme/light";
 
// components/AboutMe.js
export default function AboutMe({ aboutMe }: AboutMeProps) {
  const { theme } = useTheme();

  return theme === 'dark' ? <DarkAbout aboutMe={aboutMe} />:<LightAbout aboutMe={aboutMe} />;
}

