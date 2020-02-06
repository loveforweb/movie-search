import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TMDB_IMAGE_URL } from '../setting/options';

const BioTag = styled.div`
    padding-left: 2rem;
`;

const DetailList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
`;

const DetailItem = styled.li`
    margin: 0;
`;

const ImageWrapper = styled.div``;

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
        <div>
            <div className="row">
                <ImageWrapper>
                    <img
                        src={
                            profile_path
                                ? `${TMDB_IMAGE_URL}w300_and_h450_bestv2${profile_path}`
                                : 'https://via.placeholder.com/200x308&text=Profile+Image+Not+Available'
                        }
                        alt={name}
                    />
                    <DetailList>
                        <DetailItem>{name && `Name: ${name}`}</DetailItem>
                        <DetailItem>
                            {place_of_birth &&
                                `Place of birth: ${place_of_birth}`}
                        </DetailItem>
                        <DetailItem>
                            {gender && gender === 1
                                ? 'Gender: Female'
                                : 'Gender: Male'}
                        </DetailItem>
                        <DetailItem>
                            {birthday && `DOB: ${birthday}`}
                        </DetailItem>
                    </DetailList>
                </ImageWrapper>
                <BioTag>
                    {biography && (
                        <div dangerouslySetInnerHTML={createMarkup()} />
                    )}
                </BioTag>
            </div>
        </div>
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
