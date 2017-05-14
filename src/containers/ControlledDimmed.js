import Dimmed from 'components/Dimmed';
import { connect } from 'react-redux';
import * as uiActions from 'modules/ui';

export default connect(
    (state) => ({ 
        visible: state.ui.getIn(['memo', 'open'])
    }),
    (dispatch) => ({
        onClose: () => dispatch(uiActions.closeMemo())
    })
)(Dimmed)