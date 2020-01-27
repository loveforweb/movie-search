import React, { useEffect, useState, useReducer } from 'react';
import { API_KEY } from '../setting/options';
import { parseISO, isBefore } from 'date-fns';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { memberReducer, initialState } from '../reducer/memberReducer';
import MemberProfile from '../components/MemberProfile';
import MoviePoster from '../components/MoviePoster';

const ActorDetails = props => {
    const {
        match: {
            params: { id }
        }
    } = props;
    const [state, dispatch] = useReducer(memberReducer, initialState);
    const [url, setUrl] = useState(
        `https://api.themoviedb.org/3/person/${id}?language=en-US&${API_KEY}`
    );
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const fetchActorDetails = async () => {
            dispatch({
                type: loaded ? 'OEUVRE_REQUEST' : 'MEMBER_DETAIL_REQUEST'
            });
            try {
                const details = await fetch(url);
                const res = await details.json();

                if (res.success === false) {
                    if (loaded) {
                        dispatch({
                            type: 'OEUVRE_ERROR',
                            error: res.status_message
                        });
                    } else {
                        dispatch({
                            type: 'MEMBER_DETAIL_ERROR',
                            error: res.status_message
                        });
                    }
                    return;
                }

                if (loaded) {
                    dispatchOeuvre(res.cast);
                    return;
                }

                dispatch({
                    type: 'MEMBER_DETAIL_SUCCESS',
                    payload: res
                });
            } catch (error) {
                if (loaded) {
                    dispatch({
                        type: 'OEUVRE_ERROR',
                        error: error.status_message
                    });
                } else {
                    dispatch({
                        type: 'MEMBER_DETAIL_ERROR',
                        error: error.status_message
                    });
                }
            }
        };

        fetchActorDetails();
        getActorOeuvre();

        return () => {
            console.log('cleanup');
        };
    }, [url]);

    const getActorOeuvre = () => {
        setUrl(
            `https://api.themoviedb.org/3/person/${id}/movie_credits?language=en-US&${API_KEY}`
        );
        setLoaded(true);
    };

    const dispatchOeuvre = oeuvreData => {
        const array = oeuvreData.map(item => {
            const date = parseISO(item.release_date);
            if (isBefore(date, new Date())) {
                return {
                    ...item,
                    release_date: date
                };
            }
        });

        array.sort(function(a, b) {
            var c = new Date(a.release_date);
            var d = new Date(b.release_date);
            return d - c;
        });

        return dispatch({
            type: 'OEUVRE_SUCCESS',
            payload: array
        });
    };

    const handleBackButton = e => {
        e.preventDefault();
        props.history.goBack();
    };

    const {
        details,
        loading,
        errorMessage,
        oeuvre,
        oeuvreErrorMessage,
        oeuvreLoading
    } = state;

    return (
        <>
            <button onClick={handleBackButton}>Go back</button>
            {loading && !errorMessage ? (
                <Loading />
            ) : errorMessage ? (
                <Message message={errorMessage} status={'error'} />
            ) : (
                details && <MemberProfile details={details} />
            )}

            {oeuvreLoading && !oeuvreErrorMessage ? (
                <Loading />
            ) : oeuvreErrorMessage ? (
                <Message message={oeuvreErrorMessage} status={'error'} />
            ) : (
                oeuvre &&
                oeuvre.slice(0, 8).map((item, i) => {
                    console.log(item);
                    return (
                        <MoviePoster
                            title={item.title}
                            imageSize="w200"
                            image={item.poster_path}
                            key={item.id}
                        />
                    );
                })
            )}
        </>
    );
};

export default ActorDetails;
