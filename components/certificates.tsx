import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Import icons

interface Certification {
  title: string;
  image_path: string;
  link: string;
}

interface CertificatesProps {
  certifications: Certification[];
}

const CustomPrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="hidden sm:block absolute left-4 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full shadow-md hover:bg-blue-700 transition z-50"
    >
      <ChevronLeft size={20} />
    </button>
  );
};

const CustomNextArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="hidden sm:block absolute right-4 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full shadow-md hover:bg-blue-700 transition"
    >
      <ChevronRight size={20} />
    </button>
  );
};

export default function Certificates({ certifications }: CertificatesProps) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    arrows: true, // Ensure arrows are enabled
  };

  return (
    <section className="p-8">
      {/* Section Header */}
      <h3 className="text-3xl font-semibold flex items-center ">
          <span className="flex-grow border-t border-gray-500 mr-4"></span>
          Certificates<span className="flex-grow border-t border-gray-500 ml-4"></span>
      </h3>

      {/* Slider */}
      <Slider {...settings} className="w-4/5 mx-auto">
        {certifications.map((cert, index) => (
          <div key={index} className="p-4 flex justify-center">
            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-4/5 mx-auto block"
            >
              {/* Image */}
              <img
                src={cert.image_path}
                alt={cert.title}
                className="w-full h-80 object-cover rounded-lg shadow-md"
              />
              {/* Text Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-lg">
                <h3 className="text-2xl font-bold text-white text-center">
                  {cert.title}
                </h3>
              </div>
            </a>
          </div>
        ))}
      </Slider>
    </section>
  );
}
