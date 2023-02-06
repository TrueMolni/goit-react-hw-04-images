import { useState, useEffect, useCallback } from 'react';

import Button from './Button';
import SearchBar from './Searchbar';
import ImageGallery from './ImageGallery';
import getImages from './services/Api';
import Modal from './Modal';
import ModalDetails from './ModalDetails';

import { Wrapper, Message } from './App.styled';

const App = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');

  useEffect(() => {
    if (!search) {
      return;
    }

    const fetchImages = async () => {
      try {
        setLoading(true);
        const hits = await getImages(search, page);
        setItems(prevItems => [...prevItems, ...hits]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [search, page, setLoading, setItems, setError, getImages]);

  const searchImages = useCallback(({ search }) => {
    setSearch(search);
    setItems([]);
    setPage(1);
  }, []);

  const getLargeImg = useCallback(({ largeImageURL }) => {
    setShowModal(true);
    setLargeImage(largeImageURL);
  }, []);

  const loadMore = useCallback(() => {
    setPage(prevPage => prevPage + 1);
  }, []);

  const onCloseModal = useCallback(() => {
    setShowModal(false);
    setLargeImage('');
  }, []);

  return (
    <Wrapper>
      <SearchBar onSubmit={searchImages} />
      {loading && <p>...Loading</p>}
      {error && (
        <Message>Something goes wrong. Please try again later.</Message>
      )}

      <ImageGallery items={items} getLargeImg={getLargeImg} />
      {Boolean(items.length) && (
        <Button text="Load more" onClick={loadMore}></Button>
      )}
      {showModal && (
        <Modal close={onCloseModal}>
          <ModalDetails largeImageURL={largeImage} />
        </Modal>
      )}
    </Wrapper>
  );
};
export default App;
