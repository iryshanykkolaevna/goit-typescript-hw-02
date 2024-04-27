import { useState, useEffect } from 'react';
import './App.css';
import { getPhotos } from './apiService/photos';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ImageModal from './components/ImageModal/ImageModal';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import { Images } from './App.types';


function App() {
  const [query, setQuery] = useState<string>('');
  const [images, setImages] = useState<Images[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [modalUrl, setModalUrl] = useState<string>('');
  const [modalAlt, setModalAlt] = useState<string>('');

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { results, total_pages } = await getPhotos(query, page);
        if (results.length === 0) {
          setIsEmpty(true);
          return;
        }
        setImages(prevState => [...prevState, ...results]);
        setIsVisible(page < total_pages);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [query, page]);
  

  const handleSubmit = (value: string) => {
    setQuery(value);
    setImages([]);
    setPage(1);
    setIsEmpty(false);
    setError(false);
    setIsVisible(false);
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  }

  const handleOpen = (url: string, alt: string) => {
    setIsOpen(true);
    setModalUrl(url);
    setModalAlt(alt);
  };

  const handleClose = () => {
    setIsOpen(false);
    setModalUrl('');
    setModalAlt('');
  }

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} modalOpen={handleOpen} />
      )}
      {isVisible && (
        <LoadMoreBtn onClick={loadMore} disabled={isLoading}>
          {isLoading ? 'Loading' : 'Load more'}
        </LoadMoreBtn>
      )}
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {isEmpty && <p>Sorry. There are no images ...</p>}
      <ImageModal
        modalIsOpen={modalIsOpen}
        closeModal={handleClose}
        src={modalUrl}
        alt={modalAlt}
      />
    </div>
  );
}

export default App;