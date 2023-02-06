import PropTypes from 'prop-types';
import { FcSearch } from 'react-icons/fc';
import { useState } from 'react';
import {
  SearchHeader,
  SearchBtn,
  SearchBtnLabel,
  SearchForm,
  SearchInput,
} from './SearchBar.styled';

const initialState = {
  search: '',
};

const SearchBar = ({ onSubmit }) => {
  const [state, setState] = useState({ ...initialState });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ ...state });
    setState({ ...initialState });
  };

  const { search } = state;

  return (
    <SearchHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchBtn type="submit">
          <FcSearch style={{ width: 22, height: 22 }} />
          <SearchBtnLabel>Search</SearchBtnLabel>
        </SearchBtn>

        <SearchInput
          onChange={handleChange}
          type="text"
          name="search"
          value={search}
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          reguired
        />
      </SearchForm>
    </SearchHeader>
  );
};

export default SearchBar;

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
