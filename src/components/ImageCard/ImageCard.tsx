import { FC } from 'react';
import css from './ImageCard.module.css'

interface ImageCardProps {
  alt: string; 
  src: {
    regular: string,
    small: string
  };
  modalOpen: (src: string, alt: string) => void;
}

const ImageCard: FC<ImageCardProps>= ({ alt, src, modalOpen }) => {
  
    return (
      <div
        className={css.hoverImageScale}
        onClick={() => modalOpen(src.regular, alt)}
      >
        <img className={css.imageCard} src={src.small} alt={alt} />
      </div>
    );
}

export default ImageCard