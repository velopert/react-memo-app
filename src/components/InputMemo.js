import React, { Component } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import PropTypes from 'prop-types';
import Textarea from 'react-textarea-autosize';
import { media } from 'lib/style-utils';
import SaveButton from './SaveButton';

const Wrapper = styled.div`
    width: 700px;
    margin: 0 auto;
    padding: 1rem;

    background: white;
    color: ${oc.gray[6]};
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);

    cursor: text;
    transition: all .3s;
    
    &:hover {
        box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    }

    ${media.desktop`
        width: 500px;
    `}

    ${media.tablet`
        width: 100%;
    `}
    


`;

const Placeholder = styled.div`
    font-weight: 300;
    font-size: 1.2rem;
`;

const TitleInput = styled.input`
    width: 100%;
    border: none;
    outline: none;
    font-weight: 500;
    font-size: 1.25rem;
`;

const StyledTextArea = styled(Textarea)`
    width: 100%;
    width: 100%;
    border: none;
    outline: none;
    font-weight: 300;
    font-size: 1.1rem;
    margin-top: 1rem;
    resize: none;
`



class InputMemo extends Component {
    componentDidUpdate(prevProps, prevState) {
       if(!prevProps.open && this.props.open) {
            this.title.focus();
        }
    }
    
    
    render() {
        const {
            open,
            title,
            body,
            onClick,
            onChange,
            onCreate
        } = this.props;

        return (
            <Wrapper onClick={onClick}>
                { 
                    open ? (
                        <div>
                            <TitleInput 
                                name="title" 
                                onChange={onChange} 
                                placeholder="제목" 
                                innerRef={ref=>this.title = ref}
                                value={title}
                            />
                            <StyledTextArea
                                minRows={3}
                                maxRows={20}
                                placeholder="메모를 입력하세요.."
                                name="body"
                                onChange={onChange}
                                value={body}
                            />
                                <SaveButton onClick={onCreate}/>
                        </div>
                    )
                    :<Placeholder>메모를 입력하세요..</Placeholder>
                }
            </Wrapper>
        )
    }
}

InputMemo.propTypes = {
    title: PropTypes.string,
    body: PropTypes.string,
    open: PropTypes.bool,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    onCreate: PropTypes.func
};

export default InputMemo;