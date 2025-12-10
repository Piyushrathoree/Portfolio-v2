import { DiscordStatus } from "./Discord";

interface avatarProps {
  classname?: string;
}
const Avatar = (props: avatarProps) => {
  
  return (
    <div className="relative ">
      <div
        className={`flex justify-center items-center rounded-full  md:h-36 md:w-36 h-20 w-20 relative overflow-hidden ${props.classname}`}
      >
        <img  
          src="/assets/erwin.jpg"
          alt="Avatar"
          className="-mb-5 absolute md:h-36 md:w-36 h-20 w-20 scale-120 object-cover   "
        />
      </div>
      <DiscordStatus />
    </div>
  );
};

export default Avatar;
