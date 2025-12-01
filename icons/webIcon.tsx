import { Globe } from "lucide-react";

interface webIconProps {
  className?: string;
}
const WebIcon = (props: webIconProps) => {
  return <Globe className={`h-6 w-6 ${props.className || ""}`} />;
};

export default WebIcon;
