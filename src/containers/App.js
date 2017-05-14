import React, { Component } from 'react';

import {
    InputMemoContainer,
    MemoBoxListContainer,
    FullMemoContainer,
    ControlledDimmed
} from 'containers';

import Header from 'components/Header';
import Layout from 'components/Layout';


// import redux dependencies
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as memoActions from 'modules/memo';

class App extends Component {

    endCursor = null;

    handleScroll = (e) => {
        const { clientHeight, scrollTop } = document.body;
        const { innerHeight } = window;

        if(clientHeight - innerHeight - scrollTop < 100) {
            const { endCursor, loading, MemoActions } = this.props;
            if(loading) return; // 이미 뭔갈 로딩중이면 무시
            if(endCursor === null) return; // 더 이상 데이터가 없으면 무시
            if(endCursor === this.endCursor) return; // 해당 요청 이미 했으면 무시
            this.endCursor = endCursor;
            MemoActions.getPreviousMemo(endCursor);
            
        }
    }

    componentDidMount() {
        // 초기 로딩 시 최근 작성된 메모 20개 불러오기
        const { MemoActions } = this.props;
        MemoActions.getInitialMemo();
        window.addEventListener('scroll', this.handleScroll);
    }
    
    render() {
        return (
            <Layout>
                <Header/>
                <Layout.Main>
                    <InputMemoContainer/>
                    <MemoBoxListContainer/>
                </Layout.Main>
                <FullMemoContainer/>
               <ControlledDimmed/> 
            </Layout>
        );
    }
}

export default connect(
    (state) => ({
        endCursor: state.memo.getIn(['data', state.memo.get('data').size - 1, 'id']),
        loading: state.pender.pending['memo/GET_PREVIOUS_MEMO']
    }),
    (dispatch) => ({
        MemoActions: bindActionCreators(memoActions, dispatch)
    })
)(App);
