import { useState } from 'react';
import PropTypes from 'prop-types';

const Search = ({ searchAction }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchInputChanges = e => {
        setSearchTerm(e.target.value);
    };

    const resetInputField = () => {
        setSearchTerm('');
    };

    const callSearchFunction = e => {
        e.preventDefault();
        searchAction(searchTerm);
        resetInputField();
    };
    return (
        <>
            <form className="search-form">
                <input
                    className="search-input"
                    value={searchTerm}
                    onChange={handleSearchInputChanges}
                    type="text"
                />
                <input
                    className="search-button"
                    onClick={callSearchFunction}
                    type="submit"
                    value="SEARCH"
                    disabled={searchTerm.length ? '' : 'disabled'}
                />
            </form>
            <style jsx>{`
                .search-form {
                    text-align: center;
                }

                .search-input {
                    width: 40%;
                    min-width: 17rem;
                }

                .search-button {
                    padding: 0.5rem;
                    background-color: transparent;
                    color: black;
                    border: 0.1rem solid black;
                    width: 8rem;
                    margin-left: 0.5rem;
                    cursor: pointer;
                }
                .search-button:hover {
                    background-color: #282c34;
                    color: antiquewhite;
                }
                .search-button:disabled {
                    opacity: 0.5;
                }

                .search-button:disabled:hover {
                    background-color: transparent;
                    color: black;
                    cursor: not-allowed;
                }
            `}</style>
        </>
    );
};

Search.propTypes = {
    searchAction: PropTypes.func.isRequired
};

export default Search;
