import React, {Fragment, useEffect} from 'react';
import { connect } from 'react-redux';
import { checkauth } from './redux/action/auth';

const LayOut = ({children, checkauth}) => {

    useEffect(() => {
        checkauth();
    }, [])
    return(
        <Fragment>
            {children}
        </Fragment>
    )
}

export default connect(null, {checkauth})(LayOut)