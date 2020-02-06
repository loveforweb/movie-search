import React, { useEffect, useReducer, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import '../styles/index.css';
import { listingReducer, initialState } from '../reducer/listingReducer';
import MovieResultCard from '../components/MovieResultCard';
import Search from '../components/Search';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { TMDB_BASE_URL, API_KEY } from '../setting/options';

const TopRow = styled.div`
    text-align: center;
`;

const ListingWrapper = styled.div``;

const Content = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
`;

const Listing = props => {
    const { search } = props.location;
    const searchQuery = search.replace('?s=', '');
    const [state, dispatch] = useReducer(listingReducer, initialState);
    const initialQuery = searchQuery.length ? searchQuery : '';
    const popularQueryUrl = `${TMDB_BASE_URL}/movie/popular?${API_KEY}`;
    const initialSearchUrl = `${TMDB_BASE_URL}/search/movie?language=en-US&query=${initialQuery}&page=1&include_adult=false&${API_KEY}`;
    const [url, setUrl] = useState(
        initialQuery ? initialSearchUrl : popularQueryUrl
    );
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // if there is no props.search > return false
        if (searchQuery.length === 0) {
            setUrl(popularQueryUrl);
            setSearchTerm('');
            props.history.push({
                search: ''
            });
            return;
        }

        if (searchQuery !== searchTerm) {
            searchAction(searchQuery);
        }
    }, [searchQuery]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(url);
                const json = await res.json();

                if (json.success === false) {
                    dispatch({
                        type: 'SEARCH_MOVIES_FAILURE',
                        error: json.status_message
                    });
                    return;
                }

                dispatch({
                    type: 'SEARCH_MOVIES_SUCCESS',
                    payload: json.results
                });
            } catch (error) {
                dispatch({
                    type: 'SEARCH_MOVIES_FAILURE',
                    error: error.status_message
                });
            }
        };

        if (searchTerm.length && searchTerm !== searchQuery) {
            props.history.push({
                search: `?s=${searchTerm}`
            });
        }

        fetchData();
    }, [url]);

    const searchAction = searchTerm => {
        dispatch({
            type: 'SEARCH_MOVIES_REQUEST'
        });

        setSearchTerm(searchTerm);

        setUrl(
            `${TMDB_BASE_URL}/search/movie?language=en-US&query=${searchTerm}&page=1&include_adult=false&${API_KEY}`
        );
    };

    const { movies, errorMessage, loading } = state;

    return (
        <ListingWrapper>
            <TopRow>
                <Search searchAction={searchAction} />
                {searchTerm && (
                    <p>
                        Your results for <strong>{searchTerm}</strong>
                    </p>
                )}
            </TopRow>
            <Content>
                {loading && !errorMessage ? (
                    <Loading />
                ) : errorMessage ? (
                    <Message status="error" message={errorMessage} />
                ) : !loading && movies.length === 0 ? (
                    <Message
                        status="no-results"
                        message={`No results for ${searchTerm}`}
                    />
                ) : (
                    movies.map((movie, index) => (
                        <MovieResultCard key={index} {...movie} />
                    ))
                )}
            </Content>
        </ListingWrapper>
    );
};

Listing.propTypes = {
    location: PropTypes.shape({
        search: PropTypes.string.isRequired
    })
};

export default Listing;
