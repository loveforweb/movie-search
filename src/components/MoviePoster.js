import React from 'react';
import PropTypes from 'prop-types';

const MoviePoster = ({ title, image, imageSize }) => {
    return (
        <>
            <img
                alt={`The movie titled: ${title}`}
                src={
                    image
                        ? `https://image.tmdb.org/t/p/${imageSize}${image}`
                        : 'https://via.placeholder.com/200x308&text=No+Poster+Available'
                }
            />
        </>
    );
};

MoviePoster.propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    imageSize: PropTypes.string
};

export default MoviePoster;
