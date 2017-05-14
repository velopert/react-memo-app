import React, { Component } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import PropTypes from 'prop-types';
import Textarea from 'react-textarea-autosize';
import SaveButton from './SaveButton';
import { media } from 'lib/style-utils';

import TrashIcon from 'react-icons/lib/io/trash-b'

const Wrapper = styled.div`
    background: white;
    position: fixed;
    width: 600px;
    height: auto;
    max-height: 600px;
    z-index: 15;

    padding: 1rem;
    font-weight: 200;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);

    ${media.tablet`
        width: calc(100% - 2rem);
    `}

`

const TitleInput = styled.input`
    width: 100%;
    border: none;
    outline: none;
    font-weight: 500;
    font-size: 1.25rem;
`;

const StyledTextarea = styled(Textarea)`
    width: 100%;
    width: 100%;
    border: none;
    outline: none;
    font-weight: 300;
    font-size: 1.1rem;
    margin-top: 1rem;
    resize: none;
`

const TrashButton = styled.div`
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    color: ${oc.gray[6]};
    cursor: pointer;

    &:hover {
        color: ${oc.gray[7]};
    }

    &:active {
        color: ${oc.gray[8]};
    }

    font-size: 1.5rem;
`


const FullMemo = ({visible, title, body, onChange, onUpdate, onDelete}) => {

    // visible 이 거짓일경우 아무것도 보여주지 않는다
    if(!visible) return null;

    return (
        <Wrapper>
            <TitleInput value={title} name="title" onChange={onChange} placeholder="제목"/>
            <StyledTextarea 
                value={body} 
                name="body" 
                onChange={onChange} 
                minRows={3}
                maxRows={20}
                placeholder="내용을 입력하세요.."
            />
            <SaveButton onClick={onUpdate}/>
            <TrashButton onClick={onDelete}>
                <TrashIcon/>
            </TrashButton>
        </Wrapper>
    )
}

FullMemo.propTypes = {
    visible: PropTypes.bool,
    title: PropTypes.string,
    body: PropTypes.string,
    onChange: PropTypes.func,
    onUpdate: PropTypes.func,
    onDelete: PropTypes.func
}
export default FullMemo;
