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
      <a
        className="flex gap-2 mt-10 items-center mx-auto text-md w-fit border rounded-sm  dark:bg-neutral-800 bg-neutral-100/70 hover:bg-neutral-200 dark:hover:bg-neutral-900 duration-300 py-1.5 px-2 text-black/70 dark:text-white/70 shadow-inner shadow-neutral-400 dark:shadow-neutral-500"
        href="/blogs"
      >
        {" "}
        Checkout Blogs <SquareArrowOutUpRightIcon size={20} />
      </a>
      <span className="flex items-center mt-20">
        <span className="h-px flex-1 bg-linear-to-r from-transparent to-neutral-500"></span>
        <span className="h-px flex-1 bg-linear-to-l from-transparent to-neutral-500"></span>
      </span>
    </div>
  );
};

export default Blogs;
