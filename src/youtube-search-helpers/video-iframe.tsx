import React from "react";

interface IProps {
    video: string;
}

const VideoIFrame: React.FC<IProps> = ({ video }) => {
  const idGrabber = (url: string) => {
    if (typeof url !== 'string') return ''
    const regex = "=(.+)";
    return url.match(regex)?.[0].slice(1)
  }

  const url = `https://www.youtube.com/embed/${idGrabber(video)}`;

  return (
    <div>
      <div>
        <iframe title="How to" className="sv-video" src={url} />
      </div>
    </div>
  );
};

export default VideoIFrame;