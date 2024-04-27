import React, { ChangeEvent, FormEvent } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { TbCameraSearch } from 'react-icons/tb';

import { FC, useState } from 'react';
import css from './SearchBar.module.css';

const notify = () => toast('Please, enter something in the searching field!');

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ onSubmit }) => {
  const [query, setQuery] = useState<string>('');

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setQuery(evt.target.value);
  };

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    if (!query.trim()) {
      return notify();
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <header className={css.header}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={query}
        />
        <button className={css.searchBtn} type="submit">
          <TbCameraSearch size={'20px'} />
        </button>
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: '',
            duration: 3000,
            style: {
              background: '#fff',
              color: '#0d3a58',
              border: '1px solid #0d3a58',
            },
          }}
        />
      </form>
    </header>
  );
};

export default SearchBar;