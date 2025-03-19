
export default function LightAbout({aboutMe}: AboutMeProps){

    return(
        <section className="relative h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden  ">
  {/* Background Gradient */}
  <div className="absolute inset-0 animate-gradient-wave bg-light-gradient"></div>

  {/* Content */}
  <img 
    src="/profile.jpg" 
    alt="Profile Picture" 
    className="relative w-32 h-32 rounded-full mb-4 border-4 border-white shadow-lg"
  />
  <h2 className="relative text-5xl font-bold text-gray-800">
    Hi, I'm <span className="text-blue-500">Pavlo Marunko</span>
  </h2>
  <p className="relative mt-4 text-lg text-gray-600">
    {aboutMe?.summary || "A Frontend Developer specializing in modern web technologies."}
  </p>
  <a href="/about" className="relative mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-lg text-white">
    View More
  </a>

  {/* Keyframe Animation for Gradient Waves */}
  <style jsx>{`
    @keyframes gradient-wave {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }

    .bg-light-gradient {
      background: linear-gradient(270deg,rgb(247, 246, 246), #f0f0f0, #e0e0e0);
      background-size: 400% 400%;
    }

    .animate-gradient-wave {
      animation: gradient-wave 6s ease infinite;
    }
  `}</style>
</section>
    );
}