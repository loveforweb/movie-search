import React, { useState } from 'react';
import styled from 'styled-components';

const SearchForm = styled.form`
    text-align: center;
`;

const SearchButton = styled.input`
    padding: 0.5rem;
    background-color: transparent;
    color: black;
    border: 0.1rem solid black;
    width: 8rem;
    margin-left: 0.5rem;
    cursor: pointer;

    &:hover {
        background-color: #282c34;
        color: antiquewhite;
    }
`;

const SearchInput = styled.input`
    width: 40%;
    min-width: 17rem;
`;

const Search = props => {
    const [searchValue, setSearchValue] = useState('');

    const handleSearchInputChanges = e => {
        setSearchValue(e.target.value);
    };

    const resetInputField = () => {
        setSearchValue('');
    };

    const callSearchFunction = e => {
        e.preventDefault();
        props.search(searchValue);
        resetInputField();
    };
    return (
        <SearchForm>
            <SearchInput
                value={searchValue}
                onChange={handleSearchInputChanges}
                type="text"
            />
            <SearchButton
                onClick={callSearchFunction}
                type="submit"
                value="SEARCH"
            />
        </SearchForm>
    );
};

export default Search;
