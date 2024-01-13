import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Loading from "../layout/Loading/Loading";

const AdminRoute = ({
    component: Component,
    auth: { isAuthenticated, loading, user },
    ...rest
}) => {

    if (!isAuthenticated && !loading) {
        return <Redirect to="/login" />;
    }

    if (isAuthenticated && !loading) {
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