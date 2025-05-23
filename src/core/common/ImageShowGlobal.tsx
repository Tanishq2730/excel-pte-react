import React from 'react';

interface Image {
  className?: string;
  src: string;
  alt?: string;
  height?: number;
  width?: number;
  id?:string;
}

const ImageShowGlobal = (props: Image) => {
  // Combine the base path and the provided src to create the full image source URL
  const fullSrc = `${props.src}`;
  return (
    <img
      className={props.className}
      src={fullSrc}
      height={props.height}
      alt={props.alt}
      width={props.width}
      id={props.id}
    />
  );
};

export default ImageShowGlobal;
