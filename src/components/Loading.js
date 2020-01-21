import React from 'react';
import styled from 'styled-components';
import LoadingIcon from '../img/loading-icon.svg';

const LoadingWrapper = styled.div`
    width: 20rem;
    height: 20rem;
    margin: auto;
    display: flex;
`;

const Loading = () => {
    return (
        <LoadingWrapper>
            <img src={LoadingIcon} alt="Loading" />
        </LoadingWrapper>
    );
};

export default Loading;
