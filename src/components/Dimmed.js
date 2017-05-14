import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import PropTypes from 'prop-types';

const Screen = styled.div`
    background: ${oc.gray[3]};
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    position: fixed;
    z-index: 10;
    opacity: 0.5;
`
const Dimmed = ({visible, onClose}) => {
    if(visible) return <Screen onClick={onClose}/>
    return null;
}

Dimmed.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func
};

export default Dimmed;