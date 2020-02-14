import { useRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';
import { API_KEY, TMDB_BASE_URL } from '../../settings/options';
import MetaHead from '../../components/MetaHead';
import MemberProfile from '../../components/MemberProfile';
import RelatedMovie from '../../components/RelatedMovie';
import Button from '../../components/Button';

const ActorDetails = ({ details, oeuvre }) => {
    const router = useRouter();
    const { cast } = oeuvre;
    const movieLimit = cast.length > 8 ? 8 : cast.length;

    const handleBackButton = e => {
        e.preventDefault();
        router.back();
    };

    return (
        <>
            <MetaHead
                title={`Actor details: ${details.name}`}
                desc={`Information about ${details.name}`}
            />
            <Button action={handleBackButton} text="Go back" />
            <h1>Actor details</h1>
            <div className="row">
                {details && <MemberProfile {...details} />}
            </div>

            <div className="row">
                <ul className="movie-poster-wrapper">
                    {cast &&
                        cast.slice(0, movieLimit).map((item, i) => {
                            return (
                                item &&
                                item.id && <RelatedMovie {...item} key={i} />
                            );
                        })}
                </ul>
            </div>

            <style jsx>{`
                .movie-poster-wrapper {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    padding: 0;
                    width: 100%;
                }
            `}</style>
        </>
    );
};

ActorDetails.getInitialProps = async ({ query }) => {
    const [details, oeuvre] = await Promise.all([
        fetch(
            `${TMDB_BASE_URL}/person/${query.id}?language=en-US&${API_KEY}`
        ).then(r => r.json()),
        fetch(
            `${TMDB_BASE_URL}/person/${query.id}/movie_credits?language=en-US&${API_KEY}`
        ).then(r => r.json())
    ]);

    return {
        details,
        oeuvre
    };
};

ActorDetails.propTypes = {
    // match: PropTypes.shape({
    //     params: PropTypes.shape({
    //         id: PropTypes.string.isRequired
    //     })
    // })
};

export default ActorDetails;
