import { SquareArrowOutUpRightIcon } from 'lucide-react';
import React from 'react'
import { BlogCard } from './BlogCard';

const getBlogCards = [
  {
    title: "What are Microservices?",
    imageSrc: "/blog1.png",
  },
  {
    title: "Microservices:Implementation in Node.js",
    imageSrc: "/blog2.png",
  },
];  
const Blogs = () => {
  return (
    <div className="mt-20 mb-20 ">
      <p className="font-mono text-sm">Featured</p>
      <h2 className="text-4xl font-black font-serif  border-b border-black dark:border-white/40 w-fit border-dashed tracking-wide  ">
        Blogs
      </h2>

      <div className="flex items-center gap-10 mt-10">
        {getBlogCards.map((card, idx) => (
          <BlogCard
            key={idx}
            title={card.title}
            imageSrc={card.imageSrc}
          />
        ))}
      </div>
      <a
        className="flex gap-2 items-center mx-auto text-lg border w-fit dark:border-white/60  px-4 py-1 border-dashed mt-10  border-black/40  duration-300 dark:bg-neutral-900 bg-neutral-100 hover:dark:bg-neutral-950 hover:bg-neutral-200 "
        href="/blog"
      >
        {" "}
        Checkout Blogs <SquareArrowOutUpRightIcon size={20} />
      </a>
      <span className="flex items-center mt-20">
        <span className="h-px flex-1 bg-linear-to-r from-transparent to-neutral-400"></span>
        <span className="h-px flex-1 bg-linear-to-l from-transparent to-neutral-400"></span>
      </span>
    </div>
  );
}

export default Blogs