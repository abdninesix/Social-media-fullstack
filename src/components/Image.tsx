"use client";

import { IKImage } from "imagekitio-next";

type ImageType = {
  src?: string;
  path?: string;
  w?: number;
  h?: number;
  alt: string;
  className?: string;
  tr?: boolean;
};

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

if (!urlEndpoint) {
  throw new Error('Error: Please add urlEndpoint to .env or .env.local')
}

const Image = ({ src, path, w, h, alt, className, tr }: ImageType) => {

  const normalizedPath = path ? (path.startsWith("/") ? path : `/${path}`) : undefined;
  console.log("Final IKImage props → src:", src, "path:", normalizedPath);
  console.log("Full URL →", `${urlEndpoint}${path}`);


  return (
    <IKImage
      urlEndpoint={urlEndpoint}
      {...(src ? { src } : { path: normalizedPath })}
      {...(tr
        ? { transformation: [{ width: `${w}`, height: `${h}` }] }
        : { width: w, height: h })}
      lqip={{ active: true, quality: 20 }}
      alt={alt}
      className={className}
    />
  );
};

export default Image;
