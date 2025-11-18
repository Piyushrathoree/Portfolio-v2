import Avatar from "./components/Avatar";

import Graph from "./components/Graph";
import Tech from "./components/Tech";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2 bg-neutral-950">
      <Graph />

      <div className="flex gap-3">
        <Avatar />

        <div>
          <span className="text-2xl font-serif font-black flex items-center ">
            Hi , <span className="">I'm Piyush Rathore</span> , a Full Stack
            Developer!
          </span>

          <p className="font-mono ">
            {" "}
            specializing in building robust and scalable web applications using
            <br /><span className="flex items-center gap-3">
            <span>typescript and python & deploying them on</span>{" "}
            <Tech logo="/icons/vercel.svg" name="Vercel" className=" w-20" /></span>
          </p>
        </div>
      </div>
    </div>
  );
}
