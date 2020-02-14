import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { FALLBACK_POSTER } from '../settings/options';
import genres from '../data/genres';
import MoviePoster from './MoviePoster';

const MovieResultsCard = ({
    id,
    title,
    release_date,
    poster_path,
    overview,
    genre_ids
}) => {
    const poster = poster_path === 'N/A' ? FALLBACK_POSTER : poster_path;

    const getGenre = () => {
        return genre_ids
            .map(movieGenreId => {
                return genres.filter(genre => {
                    return genre.id === movieGenreId;
                });
            })
            .reduce((a, b) => a.concat(b), []);
    };

    const genre = getGenre();

    return (
        <div className="movie-wrapper">
            <div className="image-wrapper">
                <MoviePoster
                    title={title}
                    imageSize="w200"
                    image={poster}
                    type="auto"
                />
            </div>
            <div className="info-wrapper">
                <h2 className="heading">
                    {title}
                    <span>
                        (
                        {release_date &&
                            format(parseISO(`${release_date}`), 'yyyy')}
                        )
                    </span>
                </h2>
                <p>{overview}</p>
                <ul className="info-list">
                    {genre.map(item => (
                        <li className="info-list-item" key={`${item.id}`}>
                            {item.name}
                        </li>
                    ))}
                </ul>
                <Link href="/details/[id]" as={`/details/${id}`}>
                    <a>View more details</a>
                </Link>
            </div>

            <style jsx>{`
                .movie-wrapper {
                    padding: 0;
                    width: 48%;
                    display: flex;
                    flex-direction: row;
                    margin-bottom: 2rem;
                    border: 0.1rem solid black;
                }

                .heading {
                    font-size: 2.4rem;
                }

                .heading span {
                    font-size: 1.6rem;
                }

                .image-wrapper img {
                    display: block;
                }

                .info-wrapper {
                    padding: 1rem;
                }

                ul {
                    display: flex;
                    flex-direction: row;
                    margin: 0;
                    padding: 0;
                    flex-wrap: wrap;
                    list-style: none;
                }
                li {
                    position: relative;
                    padding: 0 1rem;
                }
                li:after {
                    content: '';
                    position: absolute;
                    right: 0;
                    height: 1rem;
                    width: 0.1rem;
                    background-color: black;
                    top: 0;
                }
                li:first-child {
                    padding-left: 0;
                }
                li:last-child {
                    padding-right: 0;
                }
                li:after {
                    display: none;
                }
            `}</style>
        </div>
    );
};

export default MovieResultsCard;
