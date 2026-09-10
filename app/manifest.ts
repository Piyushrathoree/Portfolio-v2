import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "Piyush",
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#0d0d0d",
    theme_color: "#0d0d0d",
    icons: [
      { src: "/favicon.png", sizes: "96x96", type: "image/png" },
      { src: "/assets/logo.png", sizes: "500x500", type: "image/png" },
    ],
  };
}
