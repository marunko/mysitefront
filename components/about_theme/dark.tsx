
 
export default function DarkAbout({ aboutMe }: AboutMeProps){

    return (
        <section className="relative h-screen flex flex-col justify-center items-center text-center px-4" style={{ background: '#161624' }}>
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e] to-[#161624]"></div>
    
          {/* Animated Stars */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white rounded-full opacity-75"
                style={{
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `rise ${Math.random() * 10 + 10}s linear infinite`,
                }}
              />
            ))}
          </div>
    
          {/* Content */}
          <img 
            src="/profile.jpg" 
            alt="Profile Picture" 
            className="relative w-32 h-32 rounded-full mb-4 border-4 border-white shadow-lg"
          />
          <h2 className="relative text-5xl font-bold text-white">
            Hi, I'm <span className="text-blue-400">Pavlo Marunko</span>
          </h2>
          <p className="relative mt-4 text-lg text-gray-300">
            {aboutMe?.summary || "A Frontend Developer specializing in modern web technologies."}
          </p>
          <a href="/about" className="relative mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-lg text-white">
            View More
          </a>
    
          {/* Keyframe Animation */}
          <style jsx>{`
            @keyframes rise {
              from {
                transform: translateY(0);
                opacity: 0.8;
              }
              to {
                transform: translateY(-100vh);
                opacity: 0;
              }
            }
          `}</style>
        </section>
      );

}