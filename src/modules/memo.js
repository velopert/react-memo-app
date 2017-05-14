import { handleActions, createAction } from 'redux-actions';
import { pender } from 'redux-pender';
import * as WebAPI from 'lib/web-api';
import { Map, List, fromJS } from 'immutable';


// 액션타입
const CREATE_MEMO = 'memo/CREATE_MEMO';
const GET_INITIAL_MEMO = 'memo/GET_INITIAL_MEMO';
const GET_RECENT_MEMO = 'memo/GET_RECENT_MEMO';
const GET_PREVIOUS_MEMO = 'memo/GET_PREVIOUS_MEMO';
const UPDATE_MEMO = 'memo/UPDATE_MEMO';
const DELETE_MEMO = 'memo/DELETE_MEMO';


// 액션생성자
export const createMemo = createAction(CREATE_MEMO, WebAPI.createMemo); // { title, body }
export const getInitialMemo = createAction(GET_INITIAL_MEMO, WebAPI.getInitialMemo);
export const getRecentMemo = createAction(GET_RECENT_MEMO, WebAPI.getRecentMemo); // cursor
export const getPreviousMemo = createAction(GET_PREVIOUS_MEMO, WebAPI.getPreviousMemo) // endCursor
export const updateMemo = createAction(UPDATE_MEMO, WebAPI.updateMemo, payload => payload) // {id, index, memo: { title, body }}
export const deleteMemo = createAction(DELETE_MEMO, WebAPI.deleteMemo, payload => payload) // { id, index }
// 두번째 파라미터는 meta 로 사용됩니다


const initialState = Map({
    data: List()
});

export default handleActions({
    ...pender({
        type: GET_INITIAL_MEMO,
        onSuccess: (state, action) => {
            const len = action.payload.data.length;

            return state.set('data', fromJS(action.payload.data));
        }
    }),

    ...pender({
        type: GET_RECENT_MEMO,
        onSuccess: (state, action) => {
            // 데이터 리스트의 앞부분에 새로운 데이터를 붙여준다
            const data = state.get('data');
            return state.set('data', fromJS(action.payload.data).concat(data));
        }
    }),
    
    ...pender({
        type: UPDATE_MEMO,
        onSuccess: (state, action) => {
            const { index, memo: { title, body } } = action.meta;
            return state.updateIn(['data', index], (memo) => memo.set('title', title).set('body', body));
        }
    }),

    ...pender({
        type: GET_PREVIOUS_MEMO,
        onSuccess: (state, action) => {
            const data = state.get('data');
            const len = action.payload.data.length;
            return state.set('data', data.concat(fromJS(action.payload.data)));
        }
    }),

    ...pender({
        type: DELETE_MEMO,
        onSuccess: (state, action) => {
            const { index } = action.meta;
            return state.deleteIn(['data', index]);
        }
    })
}, initialState);