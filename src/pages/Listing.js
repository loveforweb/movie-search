import React, { useEffect, useReducer } from 'react';
import styled from 'styled-components';
import '../styles/index.css';
import { reducer, initialState } from '../reducer/reducer';
import MovieCard from '../components/MovieCard';
import Search from '../components/Search';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import popularListing from '../data/popularListing-mock';

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

const MOVIE_API_URL =
    'http://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}';

const Listing = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // componentDidMount
    useEffect(() => {
        // fetch(MOVIE_API_URL)
        //     .then(response => response.json())
        //     .then(jsonResponse => {
        //         console.log(jsonResponse);
        //         dispatch({
        //             type: 'SEARCH_MOVIES_SUCCESS',
        //             payload: jsonResponse.results
        //         });
        //     });

        setTimeout(() => {
            dispatch({
                type: 'SEARCH_MOVIES_SUCCESS',
                payload: popularListing.results
            });
        }, 2000);
    }, []);

    const search = searchValue => {
        dispatch({
            type: 'SEARCH_MOVIES_REQUEST'
        });

        // fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=f90ffdf2`)
        //     .then(response => response.json())
        //     .then(jsonResponse => {
        //         if (jsonResponse.Response === 'True') {
        //             dispatch({
        //                 type: 'SEARCH_MOVIES_SUCCESS',
        //                 payload: jsonResponse.Search
        //             });
        //         } else {
        //             dispatch({
        //                 type: 'SEARCH_MOVIES_FAILURE',
        //                 error: jsonResponse.Error
        //             });
        //         }
        //     });
    };

    const { movies, errorMessage, loading } = state;
    console.log(loading);

    return (
        <ListingWrapper>
            <TopRow>
                <Search search={search} />
                <p className="App-intro">
                    Sharing a few of our favourite movies
                </p>
            </TopRow>
            <Content>
                {loading && !errorMessage ? (
                    <Loading />
                ) : errorMessage ? (
                    <ErrorMessage errorMessage={errorMessage} />
                ) : (
                    movies.map((movie, index) => (
                        <MovieCard key={`${index}`} movie={movie} />
                    ))
                )}
            </Content>
        </ListingWrapper>
    );
};

export default Listing;
