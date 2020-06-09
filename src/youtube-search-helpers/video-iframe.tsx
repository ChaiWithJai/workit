import React from "react";

interface IProps {
    video: {
        id: string;
        title: string;
        description: string;
    }
}

const VideoIFrame: React.FC<any> = ({ video }) => {
  const url = `https://www.youtube.com/embed/${video.id}?rel=0`;

  return (
    <div>
      <div>
        <iframe title="How to" className="sv-video" src={url} />
      </div>
      <div>
        <h1>{video.title}</h1>
        <p>{video.description}</p>
      </div>
    </div>
  );
};

export default VideoIFrame;