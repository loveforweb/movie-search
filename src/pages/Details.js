import React, { useEffect, useReducer, useState } from 'react';
import { initialState, detailsReducer } from '../reducer/detailsReducer';
import styled from 'styled-components';
import Loading from '../components/Loading';
import Message from '../components/Message';
import CastMemberCard from '../components/CastMemberCard';
import { TMDB_BASE_URL, API_KEY } from '../setting/options';
import MovieInformation from '../components/MovieInformation';

const DetailsWrapper = styled.div``;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const CastWrap = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const Details = props => {
    const { id } = props.match.params;
    const [state, dispatch] = useReducer(detailsReducer, initialState);
    const [url, setUrl] = useState(`${TMDB_BASE_URL}/movie/${id}?${API_KEY}`);
    const [castRequest, setCastRequest] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            dispatch({
                type: 'MOVIE_DETAILS_REQUEST'
            });

            try {
                const res = await fetch(url);
                const json = await res.json();

                if (json.success === false) {
                    dispatch({
                        type: 'MOVIE_DETAILS_FAILURE',
                        error: json.status_message
                    });
                    return;
                }

                if (castRequest) {
                    dispatch({
                        type: 'MOVIE_CAST_UPDATE',
                        payload: json.cast
                    });
                    setCastRequest(false);
                } else {
                    dispatch({
                        type: 'MOVIE_DETAILS_SUCCESS',
                        payload: json
                    });
                }
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
    }, [url]);

    const buildCredits = async () => {
        setCastRequest(true);
        setUrl(`${TMDB_BASE_URL}/movie/${id}/credits?${API_KEY}`);
    };

    const handleBackButton = e => {
        e.preventDefault();
        props.history.goBack();
    };

    const { details, loading, errorMessage, cast } = state;

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
                        <div className="row">
                            <MovieInformation {...details} />
                        </div>
                        <div className="row">
                            <CastWrap>
                                {cast &&
                                    cast.map(member => (
                                        <CastMemberCard
                                            key={member.id}
                                            {...member}
                                        />
                                    ))}
                            </CastWrap>
                        </div>
                    </ContentWrapper>
                </DetailsWrapper>
            )}
        </>
    );
};

export default Details;
