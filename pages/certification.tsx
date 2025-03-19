import React from "react";
import { GetServerSideProps } from "next";
import { motion } from "framer-motion";

// Define TypeScript types for the API response
interface Certification {
  title: string;
  text: string;
  image_path: string;
  link: string;
}

interface CertificationPageProps {
  certifications: Certification[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies?.token || "";
  
  const res1 = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/certifications-key/?token=${encodeURIComponent(token)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res1.ok) {
    return { notFound: true };
  }

  const data: Certification[] = await res1.json();

  const processedData: Certification[] = data.map((item) => ({
    title: item.title,
    text: item.text,
    image_path: item.image_path,
    link: item.link,
  }));

  return {
    props: { certifications: processedData },
  };
};

const CertificationPage: React.FC<CertificationPageProps> = ({ certifications }) => {
  return (
    <div className="container mx-auto p-4 secondcolor">
      <motion.h1 
        className="text-xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Certifications
      </motion.h1>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3, delayChildren: 0.2 }
          }
        }}
      >
        {certifications.map((cert, index) => (
          <motion.a
            key={index}
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className="relative rounded-lg overflow-hidden shadow-lg group hover:scale-105 transition-transform duration-300"
            style={{
              backgroundImage: `url(${cert.image_path})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "300px",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-70 transition-all duration-300 flex flex-col justify-center items-center p-4 text-center text-white">
              <h2 className="text-lg font-semibold mb-2">{cert.title}</h2>
              <p className="text-sm">{cert.text}</p>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
};

export default CertificationPage;
