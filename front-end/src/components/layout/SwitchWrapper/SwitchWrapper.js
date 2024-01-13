import React from 'react';
import { useLocation } from 'react-router-dom';

const SwitchWrapper = ({ children }) => {
    const location = useLocation();
    const isMatchedPath = (location.pathname === '/login');
    return (
        <div style={{ padding: isMatchedPath ? 0 : '0.2rem 1rem', marginLeft: isMatchedPath ? 0 : '6.5rem', display: 'flex', flexDirection: 'column' }}>
            {children}
        </div>
    )
}

export default SwitchWrapper;