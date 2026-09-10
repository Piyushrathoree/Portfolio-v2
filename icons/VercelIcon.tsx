import React from "react";
interface VercelIconProps {
 className?: string;
}
const VercelIcon = (props: VercelIconProps) => {
 return (
 <div>
 <svg
 viewBox="0 -17 256 256"
 xmlns="http://www.w3.org/2000/svg"
 className={`size-[1em] ${props.className || ""}`}
 >
 <polygon
 points="128 0 256 221.705007 0 221.705007"
 fill="currentColor"
 />
 </svg>
 </div>
 );
};

export default VercelIcon;
