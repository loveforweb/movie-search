import PropTypes from 'prop-types';
import { TMDB_IMAGE_URL, FALLBACK_CAST } from '../settings/options';
import breakpoint from '../styles/breakpoints.scss';

const MemberProfile = ({
    profile_path,
    name,
    place_of_birth,
    gender,
    birthday,
    biography
}) => {
    const createMarkup = () => {
        return {
            __html: `<span>Bio</span>: <p>${biography.replace(
                /\n/gi,
                '</p><p>'
            )}</p>`
        };
    };

    return (
        <>
            <div className="row">
                <div className="image-wrapper">
                    <img
                        src={
                            profile_path
                                ? `${TMDB_IMAGE_URL}w300_and_h450_bestv2${profile_path}`
                                : `${FALLBACK_CAST}`
                        }
                        alt={name}
                    />
                    <ul className="detail-list">
                        <li>{name && `Name: ${name}`}</li>
                        <li>
                            {place_of_birth &&
                                `Place of birth: ${place_of_birth}`}
                        </li>
                        <li>
                            {gender && gender === 1
                                ? 'Gender: Female'
                                : 'Gender: Male'}
                        </li>
                        <li>{birthday && `DOB: ${birthday}`}</li>
                    </ul>
                </div>
                <div className="bio-tag">
                    {biography && (
                        <div dangerouslySetInnerHTML={createMarkup()} />
                    )}
                </div>
            </div>
            <style jsx>{`
                .image-wrapper {
                    display: block;
                }

                .detail-list {
                    list-style: none;
                    margin: 0;
                    padding: 0;
                }

                li {
                    margin: 0;
                }

                @media ${breakpoint.tablet} {
                    .bio-tag {
                        padding-left: 2rem;
                    }
                }
            `}</style>
        </>
    );
};

MemberProfile.propTypes = {
    profile_path: PropTypes.string,
    name: PropTypes.string.isRequired,
    place_of_birth: PropTypes.string,
    gender: PropTypes.number,
    birthday: PropTypes.string,
    biography: PropTypes.string
};

export default MemberProfile;
