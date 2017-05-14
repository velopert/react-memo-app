import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import MemoBox from './MemoBox';
import { media, transitions } from 'lib/style-utils';


const Wrapper = styled.div`
    display: block;
    margin-top: 0.5rem;
    font-size: 0px; /* inline-block 여백 제거 */

    ${media.mobile`
        margin-top: 0.25rem;
    `}

    .memo-enter {
        animation: ${transitions.stretchOut} .3s ease-in;
        animation-fill-mode: forwards;
    }

    .memo-leave {
        animation: ${transitions.shrinkIn} .15s ease-in;
        animation-fill-mode: forwards;
    }
`;

const MemoBoxList = ({memos, onOpen}) => {

    const memoList = memos.map(
        ((memo, i) => (
            <MemoBox 
                key={memo.get('id')} 
                memo={memo} 
                onOpen={
                    (payload) => onOpen({
                        ...payload,
                        index: i
                    })
                }/>
        ))
    )  
    
    return (
        <Wrapper>
        <CSSTransitionGroup
          transitionName="memo"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={150}>
          {memoList}
        </CSSTransitionGroup>
        </Wrapper>
    )
};

MemoBoxList.propTypes = {
    memos: ImmutablePropTypes.listOf(
        ImmutablePropTypes.mapContains({
            id: PropTypes.number,
            title: PropTypes.string,
            body: PropTypes.body
        })
    ),
    onOpen: PropTypes.func
}

export default MemoBoxList;