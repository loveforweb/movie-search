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

    &:disabled {
        opacity: 0.5;

        &:hover {
            background-color: transparent;
            color: black;
            cursor: not-allowed;
        }
    }
`;

const SearchInput = styled.input`
    width: 40%;
    min-width: 17rem;
`;

const Search = props => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchInputChanges = e => {
        setSearchTerm(e.target.value);
    };

    const resetInputField = () => {
        setSearchTerm('');
    };

    const callSearchFunction = e => {
        e.preventDefault();
        props.search(searchTerm);
        resetInputField();
    };
    return (
        <SearchForm>
            <SearchInput
                value={searchTerm}
                onChange={handleSearchInputChanges}
                type="text"
            />
            <SearchButton
                onClick={callSearchFunction}
                type="submit"
                value="SEARCH"
                disabled={searchTerm.length ? '' : 'disabled'}
            />
        </SearchForm>
    );
};

export default Search;
