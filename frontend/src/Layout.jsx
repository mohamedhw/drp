import React, {Fragment, useEffect} from 'react';
import { connect } from 'react-redux';
import { checkauth, login } from './redux/action/auth';
import { profile } from './redux/action/profile';

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
