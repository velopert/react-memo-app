import React, { Component } from 'react';
import InputMemo from 'components/InputMemo';
import enhanceWithClickOutside from 'react-click-outside';

// import redux dependencies
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as uiActions from 'modules/ui';
import * as memoActions from 'modules/memo';


class InputMemoContainer extends Component {
    handleClickOutside() {
        const { UIActions, focused } = this.props;
        
        if(focused) { // 포커스가 되어 있지 않을때만 실행한다
            UIActions.blurInput();
        }
    }

    handleFocus = () => {
        const { UIActions, focused } = this.props;
        
        if(!focused) { // 포커스가 되어 있지 않을때만 실행한다
            UIActions.focusInput();
        }
    }

    // 인풋 수정
    handleChange = (e) => {
        const { UIActions } = this.props;
        const { name, value } = e.target;

        UIActions.changeInput({name, value});
    }

    handleCreate = async () => {
        const { title, body, cursor, MemoActions, UIActions } = this.props;
        
        
        try {
            await MemoActions.createMemo({
                title, body
            });
            await MemoActions.getRecentMemo(cursor ? cursor : 0);
            UIActions.resetInput();
        } catch (e) {
            console.log(e); // 에러발생 
        }
    }

    render() {
        const { handleFocus, handleChange, handleCreate } = this;
        const { focused, title, body } = this.props;
        
        return (
            <InputMemo 
                onClick={handleFocus}
                onChange={handleChange}
                onCreate={handleCreate}
                open={focused || title !== '' || body !== ''}
                title={title}
                body={body}
            />
        );
    }
}


export default connect(
    (state) => ({
        focused: state.ui.getIn(['input', 'focused']),
        title: state.ui.getIn(['input', 'title']),
        body: state.ui.getIn(['input', 'body']),
        cursor: state.memo.getIn(['data', 0, 'id'])
    }),
    (dispatch) => ({
        UIActions: bindActionCreators(uiActions, dispatch),
        MemoActions: bindActionCreators(memoActions, dispatch)
    })
)(enhanceWithClickOutside(InputMemoContainer));