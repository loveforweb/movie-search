import React, { useEffect, useReducer } from 'react';
import { initialState, detailsReducer } from '../reducer/detailsReducer';
import styled from 'styled-components';
import Loading from '../components/Loading';
import Message from '../components/Message';
import CastMemberCard from '../components/CastMemberCard';
import detailsMock from '../data/details-mock';
import creditsMock from '../data/credits-mock';

const DetailsWrapper = styled.div``;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const ImageWrapper = styled.div`
    margin-right: 2rem;
`;

const InfoWrapper = styled.div``;

const ItemWrapper = styled.div`
    margin-bottom: 1.2rem;
    span {
        font-weight: bold;
    }
`;

const TitleWrapper = styled.h2`
    font-size: 3rem;

    span {
        font-size: 1.8rem;
    }
`;

const CastWrap = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
`;

const Details = props => {
    const { id } = props.match.params;
    const [state, dispatch] = useReducer(detailsReducer, initialState);

    useEffect(() => {
        const fetchData = async () => {
            dispatch({
                type: 'MOVIE_DETAILS_REQUEST'
            });

            try {
                const res = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
                );
                const json = await res.json();

                if (json.success === false) {
                    dispatch({
                        type: 'MOVIE_DETAILS_FAILURE',
                        error: json.status_message
                    });
                    return;
                }

                dispatch({
                    type: 'MOVIE_DETAILS_SUCCESS',
                    payload: json
                });
            } catch (error) {
                dispatch({
                    type: 'MOVIE_DETAILS_FAILURE',
                    error: error.status_message
                });
            }
        };
        fetchData();
        buildCredits();
        return () => {
            console.log('clean up');
        };
    }, []);

    const buildCredits = async () => {
        dispatch({
            type: 'MOVIE_DETAILS_REQUEST'
        });

        try {
            const res = await fetch(
                `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
            );
            const json = await res.json();

            if (json.success === false) {
                dispatch({
                    type: 'MOVIE_DETAILS_ERROR',
                    payload: 'Error'
                });
                return;
            }

            const movieCharacters = json.cast.filter(member => {
                return member.character;
            });
            dispatch({
                type: 'MOVIE_CAST_UPDATE',
                payload: movieCharacters
            });
        } catch (error) {
            dispatch({
                type: 'MOVIE_DETAILS_ERROR',
                payload: 'Error'
            });
        }
    };

    // fetch(
    //     `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
    // )
    //     .then(response => {
    //         if (response.status !== 200) {
    //             console.log(
    //                 'Looks like there was a problem. Status Code: ' +
    //                     response.status
    //             );
    //             return;
    //         }

    //         response.json().then(res => {
    //             const movieCharacters = res.cast.filter(member => {
    //                 return member.character;
    //             });
    //             dispatch({
    //                 type: 'MOVIE_CAST_UPDATE',
    //                 payload: movieCharacters
    //             });
    //         });
    //     })
    //     .catch(err => {
    //         dispatch({
    //             type: 'MOVIE_DETAILS_ERROR',
    //             payload: 'Error'
    //         });
    //     });
    // };

    const handleBackButton = e => {
        e.preventDefault();
        props.history.goBack();
    };

    const { details, loading, errorMessage, cast } = state;

    const {
        title,
        release_date,
        genres,
        vote_average,
        overview,
        poster_path
    } = details;

    return (
        <>
            <h1>Details</h1>
            <p>Movie details</p>
            {loading && !errorMessage ? (
                <Loading />
            ) : errorMessage ? (
                <Message errorMessage={errorMessage} />
            ) : (
                <DetailsWrapper>
                    <button onClick={handleBackButton}>Go back</button>
                    <ContentWrapper>
                        <Row>
                            <ImageWrapper>
                                <img
                                    alt={`The movie titled: ${title}`}
                                    src={`https://image.tmdb.org/t/p/w200${poster_path}`}
                                />
                            </ImageWrapper>
                            <InfoWrapper>
                                <TitleWrapper>
                                    {title} <span>({release_date})</span>
                                </TitleWrapper>
                                <ItemWrapper>
                                    <span>Year</span>: {release_date}
                                </ItemWrapper>
                                <ItemWrapper>
                                    <span>Rated</span>: {vote_average}
                                </ItemWrapper>
                                <ItemWrapper>
                                    {genres &&
                                        genres.map(genre => (
                                            <li key={genre.id}>{genre.name}</li>
                                        ))}
                                </ItemWrapper>

                                <ItemWrapper>
                                    <span>Plot</span>: {overview}
                                </ItemWrapper>
                            </InfoWrapper>
                        </Row>
                        <Row>
                            <CastWrap>
                                {cast &&
                                    cast.map(member => (
                                        <CastMemberCard
                                            key={member.id}
                                            member={member}
                                        />
                                    ))}
                            </CastWrap>
                        </Row>
                    </ContentWrapper>
                </DetailsWrapper>
            )}
        </>
    );
};

export default Details;
