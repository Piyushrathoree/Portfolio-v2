import { SquareArrowOutUpRightIcon } from "lucide-react";
import React from "react";
import { BlogCard } from "./BlogCard";

const getBlogCards = [
  {
    title: "What are Microservices?",
    imageSrc: "/assets/1.png",
    blogLink: "http://localhost:3000/blog/getting_started_with_microservices",
  },
  {
    title: "Microservices:Implementation in Node.js",
    imageSrc: "/assets/2.png",
    blogLink: "http://localhost:3000/blog/implementing_microservices",
  },
];
const Blogs = () => {
  return (
    <div className="mt-20 mb-20 max-sm:px-1">
      <div className="max-sm:-ml-7 max-sm:px-7">
        <p className="font-mono text-sm">Featured</p>
        <h2 className="text-4xl font-black font-serif  border-b border-black dark:border-white/40 w-fit border-dashed tracking-wide  ">
          Blogs
        </h2>
      </div>
      <div className="flex max-sm:flex-col items-center gap-10 mt-10 justify-center">
        {getBlogCards.map((card, idx) => (
          <BlogCard
            key={idx}
            title={card.title}
            imageSrc={card.imageSrc}
            blogLink={card.blogLink}
          />
        ))}
      </div>
      
      <span className="flex items-center mt-20">
        <span className="h-px flex-1 bg-linear-to-r from-transparent to-neutral-500"></span>
        <span className="h-px flex-1 bg-linear-to-l from-transparent to-neutral-500"></span>
      </span>
    </div>
  );
};

export default Blogs;
