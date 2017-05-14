import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

const FOCUS_INPUT = 'ui/input/FOCUS_INPUT';
const BLUR_INPUT = 'ui/input/BLUR_INPUT';
const CHANGE_INPUT = 'ui/input/CHANGE_INPUT'
const RESET_INPUT = 'ui/input/RESET_INPUT';

const OPEN_MEMO = 'ui/memo/OPEN_MEMO';
const CLOSE_MEMO = 'ui/memo/CLOSE_MEMO';

const CHANGE_MEMO_INPUT = 'ui/memo/CHANGE_MEMO_INPUT';


export const focusInput = createAction(FOCUS_INPUT);
export const blurInput = createAction(BLUR_INPUT);
export const changeInput = createAction(CHANGE_INPUT); // { name, value }
export const resetInput = createAction(RESET_INPUT);

export const openMemo = createAction(OPEN_MEMO); // { index, id, title, body }
export const closeMemo = createAction(CLOSE_MEMO);
export const changeMemoInput = createAction(CHANGE_MEMO_INPUT); // { name, value }


const initialState = Map({
    input: Map({
        focused: false,
        title: '',
        body: ''
    }),
    memo: Map({
        open: false,
        info: Map({
            index: null,
            id: null,
            title: null,
            body: null
        })
        
    })
});

export default handleActions({
    [FOCUS_INPUT]: (state, action) => state.setIn(['input', 'focused'], true),
    [BLUR_INPUT]: (state, action) => state.setIn(['input', 'focused'], false),
    [CHANGE_INPUT]: (state, action) => state.setIn(['input', action.payload.name], action.payload.value),
    [RESET_INPUT]: (state, action) => state.set('input', initialState.get('input')),
    [OPEN_MEMO]: (state, action) => state.setIn(['memo', 'open'], true)
                                         .mergeIn(['memo', 'info'], action.payload),
    [CLOSE_MEMO]: (state, action) => state.setIn(['memo', 'open'], false),
    [CHANGE_MEMO_INPUT]: (state, action) => state.setIn(['memo', 'info', action.payload.name], action.payload.value)
}, initialState);