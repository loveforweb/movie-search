import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch';
import { API_KEY, TMDB_BASE_URL } from '../../settings/options';
import MetaHead from '../../components/MetaHead';
import MovieInformation from '../../components/MovieInformation';
import CastMemberCard from '../../components/CastMemberCard';
import Button from '../../components/Button';

const Details = ({ details, cast: { cast } }) => {
    const router = useRouter();

    const handleBackButton = e => {
        e.preventDefault();
        router.back();
    };

    return (
        <>
            <MetaHead
                title={`Movie details: ${details.title}`}
                desc={`Details about the movie ${details.title}`}
            />
            <Button action={handleBackButton} text="Go back" />
            <h1>Details</h1>
            <div className="details-wrapper">
                <div className="content-wrapper">
                    <div className="row">
                        <MovieInformation {...details} />
                    </div>
                    <div className="row">
                        <ul className="cast-wrapper">
                            {cast &&
                                cast.map(member => (
                                    <CastMemberCard
                                        key={member.id}
                                        {...member}
                                    />
                                ))}
                        </ul>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .details-wrapper {
                    display: block;
                }

                .content-wrapper {
                    display: flex;
                    flex-direction: column;
                }

                .cast-wrapper {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    padding: 0;
                }
            `}</style>
        </>
    );
};

Details.getInitialProps = async ({ query }) => {
    const [details, cast] = await Promise.all([
        fetch(`${TMDB_BASE_URL}/movie/${query.id}?${API_KEY}`).then(r =>
            r.json()
        ),
        fetch(`${TMDB_BASE_URL}/movie/${query.id}/credits?${API_KEY}`).then(r =>
            r.json()
        )
    ]);

    return { details, cast };
};

Details.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string.isRequired
        })
    })
};

export default Details;
