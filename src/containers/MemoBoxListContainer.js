import React, { Component } from 'react';
import MemoBoxList from 'components/MemoBoxList';

// import redux dependencies
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as memoActions from 'modules/memo';
import * as uiActions from 'modules/ui';


class MemoBoxListContainer extends Component {

    render() {
        const { memos, UIActions } = this.props;
        const { handleOpen } = this;

        return (
            <MemoBoxList memos={memos} onOpen={UIActions.openMemo}/>
        );
    }
}

export default connect(
    (state) => ({
        memos: state.memo.get('data')
    }),
    (dispatch) => ({
        MemoActions: bindActionCreators(memoActions, dispatch),
        UIActions: bindActionCreators(uiActions, dispatch)
    })
)(MemoBoxListContainer);
