import { DiscordStatus } from "./Discord";

interface avatarProps {
  classname?: string;
}
const Avatar = (props: avatarProps) => {
  const bgColorDark = "bg-orange-300";
  const bgColorLight = "bg-slate-300";
  return (
    <div className="relative">
      <div
        className={`flex justify-center items-center ${bgColorDark} dark:${bgColorLight} rounded-full  h-35 w-35 relative overflow-hidden ${props.classname}`}
      >
        <img
          src="/assets/logo.png"
          alt="Avatar"
          className="-mb-5 absolute h-35 w-35 scale-120 object-cover   "
        />
      </div>
      <DiscordStatus />
    </div>
  );
};

export default Avatar;
