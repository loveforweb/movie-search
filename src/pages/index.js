import fetch from 'isomorphic-unfetch';
import { API_KEY, TMDB_BASE_URL } from '../settings/options';
import MetaHead from '../components/MetaHead';
import MovieResultCard from '../components/MovieResultCard';
import Message from '../components/Message';
import breakpoint from '../styles/breakpoints.scss';

const Listing = data => {
    const title = 'movie search';
    const { results, success, status_message } = data;
    return (
        <>
            <MetaHead
                title="Movie search"
                desc="Movie search built with Next.js. Data from The Movie Database (TMDb)"
            />
            {success === false ? (
                <div>
                    <Message status="error" message={status_message} />
                </div>
            ) : (
                <div className="listing-content">
                    {results.map((movie, index) => (
                        <MovieResultCard key={index} {...movie} />
                    ))}
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
