
interface AboutMeProps {
    aboutMe: AboutMe;
  }
// components/AboutMe.js
export default function AboutMe({ aboutMe }: AboutMeProps) {
  return (
    <section className="h-screen bg-gray-100 flex flex-col justify-center items-center text-center px-4 dark:bg-gray-800">
      <img 
        src="/profile.jpg" 
        alt="Profile Picture" 
        className="w-32 h-32 rounded-full mb-4 border-4 border-white shadow-lg"
      />
      <h2 className="text-5xl font-bold">Hi, I'm <span className="text-blue-400">Pavlo Marunko</span></h2>
      <p className="mt-4 text-lg text-gray-600">{aboutMe?.summary || "A Frontend Developer specializing in modern web technologies."}</p>
      <a href="/about" className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-lg text-white">View More</a>
  </section>
  );
}