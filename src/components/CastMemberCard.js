import { useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { TMDB_IMAGE_URL } from '../settings/options';
// import FALLBACK_IMAGE from '../static/images/blank-profile-picture.png';
import HoverOverlay from './HoverOverlay';

const CastMemeberCard = ({ profile_path, name, character, id }) => {
    const [mouseOver, setMouseOver] = useState('false');

    const manageMouseOver = e => {
        setMouseOver('true');
    };

    const manageMouseOut = e => {
        setMouseOver('false');
    };

    return (
        <>
            <li className="member-card">
                <Link href={`/actor/[id]`} as={`/actor/${id}`}>
                    <a
                        onMouseOver={manageMouseOver}
                        onMouseOut={manageMouseOut}
                    >
                        <div className="member-image">
                            {profile_path ? (
                                <img
                                    src={`${TMDB_IMAGE_URL}/w276_and_h350_face${profile_path}`}
                                    alt={`${name} profile`}
                                />
                            ) : (
                                <img
                                    src={
                                        require('../images/blank-profile-picture.png')
                                            .default
                                    }
                                />
                            )}
                            <HoverOverlay
                                prepend="Read about "
                                text={name}
                                mouseOver={mouseOver}
                            />
                        </div>

                        <div className="member-credentials">
                            <p className="actor">Actor: {name}</p>
                            <p className="character">Character: {character}</p>
                        </div>
                    </a>
                </Link>
            </li>

            <style jsx>{`
                .member-card {
                    width: 14rem;
                    margin-right: 2rem;
                    margin-bottom: 2rem;
                }

                a {
                    display: block;
                }

                .member-image {
                    position: relative;
                    border-radius: 0.5rem;
                    overflow: hidden;
                }

                .member-image img {
                    display: block;
                    width: 100%;
                }

                .member-credentials {
                    display: block;
                }

                .actor {
                    font-size: 1rem;
                    margin-bottom: 0;
                    text-align: center;
                }

                .character {
                    font-size: 1rem;
                    text-align: center;
                }
            `}</style>
        </>
    );
};

CastMemeberCard.propType = {
    profile_path: PropTypes.string,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    character: PropTypes.string
};

export default CastMemeberCard;
