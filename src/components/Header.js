import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const ConetendorHeader = styled.header`
    background: #26C6DA;
    padding: 10px;
    font-weight: bold;
    color: #FFFFFF;
`;

const TextoHeader = styled.h1`
    font-size: 2rem;
    margin: 0;
    font-family: 'Slabo 27px', serif;
    text-align: center;
`;

const Header = ({titulo}) => {
    return (
        <ConetendorHeader>
            <TextoHeader>{titulo}</TextoHeader>
        </ConetendorHeader>
    );
}
 
Header.propTypes = {
    titulo: PropTypes.string.isRequired
}

export default Header;