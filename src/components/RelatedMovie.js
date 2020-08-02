import { useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import HoverOverlay from './HoverOverlay';
import MoviePoster from './MoviePoster';
import breakpoint from '../styles/breakpoints.scss';

const RelatedMovie = ({ id, title, poster_path }) => {
    const [mouseOver, setMouseOver] = useState('false');

    const manageMouseOver = e => {
        setMouseOver('true');
    };

    const manageMouseOut = e => {
        setMouseOver('false');
    };

    return (
        <>
            <li className="movie-poster-item" key={id}>
                <Link href="/details/[id]" as={`/details/${id}`}>
                    <a
                        onMouseOver={manageMouseOver}
                        onMouseOut={manageMouseOut}
                    >
                        <div className="poster-wrapper">
                            <MoviePoster
                                title={title}
                                imageSize="w200"
                                image={poster_path}
                            />
                            <HoverOverlay
                                prepend="View "
                                text={title}
                                mouseOver={mouseOver}
                            />
                        </div>
                        <div className="movie-title">{title}</div>
                    </a>
                </Link>
            </li>
            <style jsx>{`
                .movie-poster-item {
                    width: 48%;
                    padding: 1%;
                    list-style: none;
                    margin-bottom: 2rem;
                }

                .poster-wrapper {
                    position: relative;
                    border-radius: 0.5rem;
                    overflow: hidden;
                    background: green;
                }

                a {
                    position: relative;
                    display: block;
                    height: 100%;
                }

                .movie-title {
                    text-align: center;
                }

                @media ${breakpoint.tablet} {
                    .movie-poster-item {
                        width: 23%;
                        padding: 1%;
                    }
                }
            `}</style>
        </>
    );
};

RelatedMovie.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string
};

export default RelatedMovie;
