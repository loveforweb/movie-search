import { useState } from 'react';
import fetch from 'isomorphic-unfetch';
import { API_KEY, TMDB_BASE_URL } from '../settings/options';
import MetaHead from '../components/MetaHead';
import MovieResultCard from '../components/MovieResultCard';
import Search from '../components/Search';
import Message from '../components/Message';
import breakpoint from '../styles/breakpoints.scss';

const Listing = data => {
    const { results, success, status_message } = data;
    const [movies, setMovies] = useState(results);
    const [searchTerm, setSearchTerm] = useState();
    const [successState, setSuccessState] = useState(success);
    const [errorMessage, setErrorMessage] = useState(status_message);

    const searchAction = async searchTerm => {
        setSearchTerm(searchTerm);

        try {
            const res = await fetch(
                `${TMDB_BASE_URL}/search/movie?language=en-US&query=${searchTerm}&page=1&include_adult=false&${API_KEY}`
            );
            const json = await res.json();

            if (json?.success === false) {
                setSuccessState(json.success);
                setErrorMessage(json.status_message);
            }
            setMovies(json.results);
        } catch (error) {
            setSuccessState(false);
            setErrorMessage('CATCH: Unable to complete api call');
        }
    };
    return (
        <>
            <MetaHead
                title="Movie search"
                desc="Movie search built with Next.js. Data from The Movie Database (TMDb)"
            />

            <Search searchAction={searchAction} />
            {searchTerm && movies?.length > 0 && (
                <p>
                    Your results for <strong>{searchTerm}</strong>
                </p>
            )}
            {successState === false ? (
                <div>
                    <Message status="error" message={errorMessage} />
                </div>
            ) : (
                <div className="listing-content">
                    {movies.length > 0 && success !== false ? (
                        movies.map((movie, index) => (
                            <MovieResultCard key={index} {...movie} />
                        ))
                    ) : (
                        <Message message={`No results for ${searchTerm}`} />
                    )}
                </div>
            )}

            <style jsx>{`
                .listing-content {
                    display: flex;
                    flex-direction: column;
                }

                @media ${breakpoint.tablet} {
                    .listing-content {
                        flex-direction: row;
                        flex-wrap: wrap;
                        justify-content: space-between;
                    }
                }
            `}</style>
        </>
    );
};

Listing.getInitialProps = async () => {
    const res = await fetch(`${TMDB_BASE_URL}/movie/popular?${API_KEY}`);
    const json = res.json();

    return json;
};

export default Listing;
