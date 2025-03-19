import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import React from "react";
import Link from "next/link";
import Cookies from 'cookies';
import { useState } from "react";
import { motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import AboutMe from "../components/about";
import Skills from "../components/skills";
import Experience from "../components/experience";
import Certificates from "../components/certificates";
import Projects from "../components/projects";
import { GetServerSideProps } from "next";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface HomeProps {
  aboutMe: AboutMe;
  skills: Skill[];
  experiences: 
    Experience[];
  certifications: Certification[];
  projects:  Project[];
}

export default function Home({
  aboutMe,
  skills,
  experiences,
  certifications,
  projects,
}: HomeProps) {
  return (
    <div>
      <AboutMe aboutMe={aboutMe} />
      <Skills skills={skills} />
      <Experience experiences={experiences} />
      <Certificates certifications={certifications} />
      <Projects projects={projects} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) =>{
  // Fetch data from your API or database
  const token = context.req.cookies?.token || "";
  console.log("Index page " + process.env.NEXT_PUBLIC_BACKEND_URL);
  
  let response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/about-me-key/?token=${encodeURIComponent(token)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
 
  });

  if (!response.ok) {
    return {
      notFound: true,
    };
  }
  const aboutMe = await response.json();
  // Fetch skills data from the API
  response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/skills-key/?token=${encodeURIComponent(token)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
 
  });

  if (!response.ok) {
    return {
      notFound: true,
    };
  }
  const skilldata: Skill[] = await response.json();

  // Process data to exclude `id` and `tag`
  const skills: Skill[] = skilldata.map((item) => ({
    title: item.title,
    skill_tags: item.skill_tags.map((tag) => ({
      text: tag.text,
    })),
  }));
  response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/experience-key/?token=${encodeURIComponent(token)}`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
 
  });
  let data: Experience[] = await response.json();

  // Process data to exclude `id` and `tag`
  const experiences: ExperienceMain[] = data.map((item) => ({
    position: item.position,
    company: item.company,
    start_date: item.start_date,
    end_date: item.end_date,
  }));
  response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/certifications-key/?token=${encodeURIComponent(token)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      
    },
 
  });
  if (!response.ok) {
    return {
      notFound: true,
    };
  }
  const certdata: Certification[] = await response.json();
 
  const certifications: Certification[] = certdata.map((item) => ({
    title: item.title,
    text: item.text,
    image_path: item.image_path,
    link: item.link,
  }));;
  response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects-key/?token=${encodeURIComponent(token)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      
    },
 
  });

  if (!response.ok) {
    return {
      notFound: true,
    };
  }

  const projdata: Project[] = await response.json();

  // Process data to exclude `id` and `tag`
  const projects: Project[] = projdata.map((item) => ({
    title: item.title,
    description: item.description,
    summary: item.summary,
    image_path: item.image_path,
    link: item.link,
  }));
 

  return {
    props: {
      aboutMe,
      skills,
      experiences,
      certifications,
      projects,
    },
  };
}