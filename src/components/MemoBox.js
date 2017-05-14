import React, { Component } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import PropTypes from 'prop-types';
import { media } from 'lib/style-utils';
import ImmutablePropTypes from 'react-immutable-proptypes';

const Sizer = styled.div`
    display: inline-block;
    width: 25%;
    padding: 0.5rem;

    ${media.desktop`
        width: 33.3333%;
    `}

    ${media.mobile`
        width: 50%;
        padding: 0.25rem;
    `}
`;

const SquareMaker = styled.div`
    padding-top: 100%;
    position: relative;
    background: white;

    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    &:hover {
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    }
`

const Memo = styled.div`
    position: absolute;
    top: 1rem;
    left: 1rem;
    bottom: 1rem;
    right: 1rem;
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    cursor: pointer;
    white-space: pre-wrap;
    overflow: hidden;
`

const Title = styled.div`
    font-size: 1.25rem;
    font-weight: 500;
`

const Body = styled.div`
    font-size: 1.1rem;
    font-weight: 300;
    color: ${oc.gray[7]};

    .title + & {
        margin-top: 1rem;
    }
`

class MemoBox extends Component {
    static propTypes = {
        memo: ImmutablePropTypes.mapContains({
            id: PropTypes.number,
            title: PropTypes.string,
            body: PropTypes.body
        }),
        onOpen: PropTypes.func
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.memo !== this.props.memo;
    }
    



    handleClick = (e) => {
        // 커서 위치 가져오기
        const x = e.clientX;
        const y = e.clientY;

        const { onOpen, memo } = this.props;
        const { id, title, body} = memo.toJS();

        onOpen({
            id,
            title,
            body
        });
    }

    render() {

        const { title, body } =this.props.memo.toJS();
        const { handleClick } = this;

        return (
            <Sizer>
                <SquareMaker onClick={handleClick} innerRef={ref=>this.box=ref}>
                    <Memo>
                        { title !== '' && <Title className="title">{title}</Title>}
                        <Body>{body}</Body>
                    </Memo>
                </SquareMaker>
            </Sizer>
        );
    }
}

/*const MemoBox = ({title, body}) => (
    <Wrapper>
        <SquareMaker>
            <Memo>
            </Memo>
        </SquareMaker>
    </Wrapper>
);*/

export default MemoBox;