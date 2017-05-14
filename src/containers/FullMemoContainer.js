import React, { Component } from 'react';
import FullMemo from 'components/FullMemo';
// import redux dependencies
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as uiActions from 'modules/ui';
import * as memoActions from 'modules/memo';


class FullMemoContainer extends Component {
    handleChange = (e) => {
        const { UIActions } = this.props;
        const { name, value } = e.target;

        UIActions.changeMemoInput({
            name,
            value
        });
    }

    handleUpdate = () => {
        const { MemoActions, UIActions, memo } = this.props;

        const { index, id, title, body } = memo.toJS();

        MemoActions.updateMemo({
            id,
            index,
            memo: {
                title,
                body
            }
        });

        UIActions.closeMemo();
    }

    handleDelete = () => {
        const { MemoActions, UIActions, memo } = this.props;
        const { id, index } = memo.toJS();

        MemoActions.deleteMemo({
            id, index
        });

        UIActions.closeMemo();
    }

    render() {
        const { visible, memo } = this.props;
        const { title, body } = memo.toJS();
        
        const { handleChange, handleUpdate, handleDelete } = this;


        return (
            <FullMemo 
                visible={visible} 
                title={title} 
                body={body}
                onChange={handleChange}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
            />
        );
    }
}

export default connect(
    (state) => ({ 
        visible: state.ui.getIn(['memo', 'open']),
        memo: state.ui.getIn(['memo', 'info'])
    }),
    (dispatch) => ({
        UIActions: bindActionCreators(uiActions, dispatch),
        MemoActions: bindActionCreators(memoActions, dispatch)
    })
)(FullMemoContainer);