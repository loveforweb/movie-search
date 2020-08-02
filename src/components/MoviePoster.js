import PropTypes from 'prop-types';
import { TMDB_IMAGE_URL, FALLBACK_POSTER } from '../settings/options';

const MoviePoster = ({ title, image, imageSize, type }) => {
    return (
        <>
            <img
                alt={`The movie titled: ${title}`}
                src={
                    image
                        ? `${TMDB_IMAGE_URL}${imageSize}${image}`
                        : `${FALLBACK_POSTER}`
                }
            />

            <style jsx>
                {`
                    img {
                        display: block;
                        width: ${type === 'auto' ? 'auto' : '100%'};
                    }
                `}
            </style>
        </>
    );
};

MoviePoster.propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    imageSize: PropTypes.string
};

export default MoviePoster;
