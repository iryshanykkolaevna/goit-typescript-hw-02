import { FC } from 'react';
import { Images } from '../../App.types';
import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

interface ImageGalleryProps {
  images: Images[];
  modalOpen: (src: string, alt: string) => void;
}

const ImageGallery: FC<ImageGalleryProps> = ({ images, modalOpen }) => {
  return (
    <ul className={css.gallery}>
      {images.map(({ id, alt_description, urls }) => (
        <ImageCard
          key={id}
          alt={alt_description}
          src={urls}
          modalOpen={modalOpen}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;