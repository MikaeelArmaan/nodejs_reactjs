import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import { Alert as MuiAlert } from '@mui/material';
import styles from "./Alert.module.scss";
import { connect } from 'react-redux';

const Alert = ({ alert }) => {
    return (
        <>
            {
                alert && alert.map(a => {
                    return (
                        <Snackbar
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={true}
                            TransitionComponent={Fade}
                            key={a.id}
                        >
                            <MuiAlert
                                severity={a.alertType}
                                classes={{ root: styles[a.alertType] }}
                            >
                                {a.msg}
                            </MuiAlert>
                        </Snackbar>
                    );
                })
            }
        </>

    )
}

const mapStateToProps = (state) => {
    return {
        alert: state.alert
    }
}
export default connect(mapStateToProps)(Alert)