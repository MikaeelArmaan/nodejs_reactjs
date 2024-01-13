import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { ADMIN, USER } from "../../utils/UserTypes";
import Loading from "../layout/Loading/Loading";

const AdminRoute = ({
    component: Component,
    auth: { isAuthenticated, loading, user },
    ...rest
}) => {

    if (!isAuthenticated && !loading) {
        return <Redirect to="/login" />;
    }

    if (isAuthenticated && !loading && user && user.type && user.type === USER) {
        return <Redirect to="/" />;
    }

    if (isAuthenticated && !loading && user && user.type && user.type === ADMIN) {
        return (
            <Route
                {...rest}
                render={(props) => {
                    return <Component {...props} />
                }}
            />
        );
    }


    return (
        <Route
            {...rest}
            render={(props) => {
                return <Loading {...props}/>
            }}
        />
    );
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};
export default connect(mapStateToProps)(AdminRoute);