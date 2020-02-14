import PropTypes from 'prop-types';
import MoviePoster from './MoviePoster';

const MovieInformation = ({
    title,
    release_date,
    genres,
    vote_average,
    overview,
    poster_path
}) => {
    return (
        <>
            {title && (
                <div className="image-wrapper">
                    <MoviePoster
                        title={title}
                        imageSize="w200"
                        image={poster_path}
                        type="auto"
                    />
                </div>
            )}
            <div className="info-wrapper">
                <h2 className="title-wrapper">
                    {title} <span>({release_date})</span>
                </h2>
                <div className="item-wrapper">
                    <span>Year</span>: {release_date}
                </div>
                <div className="item-wrapper">
                    <span>Rated</span>: {vote_average}
                </div>
                <div className="item-wrapper">
                    {genres &&
                        genres.map(genre => (
                            <li key={genre.id}>{genre.name}</li>
                        ))}
                </div>

                <div className="item-wrapper">
                    <p className="plot-item">
                        <span>Overview</span>: {overview}
                    </p>
                </div>
            </div>
            <style jsx>{`
                .image-wrapper {
                    margin-right: 2rem;
                }

                .item-wrapper {
                    margin-bottom: 1.2rem;
                }

                .item-wrapper span {
                    font-weight: bold;
                }

                .title-wrapper {
                    font-size: 3rem;
                    margin-top: 0;
                }

                .title-wrapper span {
                    font-size: 1.8rem;
                }

                .plot-item {
                    line-height: 1.8;
                }
            `}</style>
        </>
    );
};

MovieInformation.propTypes = {
    title: PropTypes.string,
    release_date: PropTypes.string,
    genres: PropTypes.array,
    vote_average: PropTypes.number,
    overview: PropTypes.string,
    poster_path: PropTypes.string
};

export default MovieInformation;
