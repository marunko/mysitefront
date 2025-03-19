import Link from 'next/link';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';
const Navbar = () => {
  // State to manage mobile menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    console.log('Button clicked'); // Debugging
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className="shadow-md w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Portfolio Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <span className="text-xl font-bold cursor-pointer">
                Portfolio
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/about">
              <span className=" hover:text-gray-500 hover:underline cursor-pointer">
                About Me
              </span>
            </Link>
            <Link href="/skills">
              <span className=" hover:text-gray-500 hover:underline cursor-pointer">
                Skills
              </span>
            </Link>
            <Link href="/experience">
              <span className=" hover:text-gray-500 hover:underline cursor-pointer">
                Experience
              </span>
            </Link>
            <Link href="/certification">
              <span className=" hover:text-gray-500 hover:underline cursor-pointer">
                Certification
              </span>
            </Link>
            <Link href="/projects">
              <span className=" hover:text-gray-500 hover:underline cursor-pointer">
                Projects
              </span>
            </Link>
            <Link href="/contacts">
              <span className="bg-blue-600 text-white dark:bg-gray-100 dark:text-black px-4 py-2 rounded-md hover:bg-blue-700 hover:dark:bg-gray-300 cursor-pointer">
                Contact Me
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu (Dropdown) */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="flex flex-col space-y-4 pb-4">
              <Link href="/about">
                <span className=" hover:text-gray-900 cursor-pointer">
                  About Me
                </span>
              </Link>
              <Link href="/skills">
                <span className=" hover:text-gray-900 cursor-pointer">
                  Skills
                </span>
              </Link>
              <Link href="/experience">
                <span className=" hover:text-gray-900 cursor-pointer">
                  Experience
                </span>
              </Link>
              <Link href="/certification">
                <span className=" hover:text-gray-900 cursor-pointer">
                  Certification
                </span>
              </Link>
              <Link href="/hire-me">
                <span className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer">
                  Contact Me
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;