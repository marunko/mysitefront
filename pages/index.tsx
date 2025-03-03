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

export const getServerSideProps: GetServerSideProps = async ({req, res}) =>{
  // Fetch data from your API or database
  const cookies = new Cookies(req, res);
  const token = cookies.get('token') || null;
  let response = await fetch(`${process.env.BACKEND_URL}/about-me-key/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ "token": token }),
  });

  if (!response.ok) {
    return {
      notFound: true,
    };
  }
  const aboutMe = await response.json();
  // Fetch skills data from the API
  response = await fetch(`${process.env.BACKEND_URL}/skills-key/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ "token": token }),
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
  response = await fetch(`${process.env.BACKEND_URL}/experience-key/`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ "token": token }),
  });
  let data: Experience[] = await response.json();

  // Process data to exclude `id` and `tag`
  const experiences: ExperienceMain[] = data.map((item) => ({
    position: item.position,
    company: item.company,
    start_date: item.start_date,
    end_date: item.end_date,
  }));
  response = await fetch(`${process.env.BACKEND_URL}/certifications-key/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      
    },
    body: JSON.stringify({ "token": token }),
  });
  if (!response.ok) {
    return {
      notFound: true,
    };
  }
  const certdata: Certification[] = await response.json();
  console.log(certdata.length);
  const certifications: Certification[] = certdata.map((item) => ({
    title: item.title,
    text: item.text,
    image_path: item.image_path,
    link: item.link,
  }));;
  response = await fetch(`${process.env.BACKEND_URL}/projects-key/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      
    },
    body: JSON.stringify({ "token": token }),
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
    image_path: "https://picsum.photos/200/300/?blur=2",
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