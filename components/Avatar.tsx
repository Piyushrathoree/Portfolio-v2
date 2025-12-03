import { DiscordStatus } from "./Discord";

interface avatarProps {
  classname?: string;
}
const Avatar = (props: avatarProps) => {
  
  return (
    <div className="relative ">
      <div
        className={`flex justify-center items-center rounded-full  h-18 w-18 md:h-40 md:w-40 relative overflow-hidden ${props.classname}`}
      >
        <img
          src="/assets/erwin.jpg"
          alt="Avatar"
          className="-mb-5 absolute md:h-40 md:w-40 sm:scale-120 scale-185 object-cover   "
        />
      </div>
      <DiscordStatus />
    </div>
  );
};

export default Avatar;
