"use client";

import { IKVideo } from "imagekitio-next";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

type VideoTypes = {
  path: string;
  className?: string;
};

const Video = ({ path, className }: VideoTypes) => {
  return (
    <IKVideo
      urlEndpoint={urlEndpoint}
      path={path}
      className={className}
      transformation={[
        { width: "1920", height: "1080", quality: 90 as any },
        { raw: "l-text,fs-100,co-white,l-end" },
      ]}
      controls
      controlsList="nodownload"
    />
  );
};

export default Video;
