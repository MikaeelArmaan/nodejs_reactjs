import React, { useState } from 'react';
import styles from './Navbar.module.scss';
import { useLocation, useHistory } from 'react-router-dom';
import AddBoxIcon from '@mui/icons-material/AddBox';
import tft_logo from '../../../assets/images/logo.png'
import DashboardIcon from '@mui/icons-material/Dashboard';
import { connect } from 'react-redux';
import { ADMIN } from '../../../utils/UserTypes';
import { Dialog } from '@mui/material';
import { logout } from '../../../actions/auth';

const Navbar = ({ user_type, logout }) => {
  let location = useLocation();
  const history = useHistory();
  const [openDialog, setOpenDialog] = useState(false);
  let activeIndex = 0;
  if (location.pathname === '/add-document') {
    activeIndex = 1;
  }
  const onClick = (link) => {
    history.push(link);
  }

  const onLogoutHandler = () => {
    setOpenDialog(false);
    logout();
  }
  return (
    <>
      {

        location.pathname !== "/login" && (
          <div className={styles['nav-container']}>
            <img src={tft_logo} alt='' className={styles['archive-logo']} />

            <div className={styles.divider}></div>

            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', padding: '2rem 0 4.81rem 0' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div
                  className={`${styles['icon-container']} ${activeIndex === 0 && styles.active}`}
                  onClick={() => {
                    onClick('/')
                  }}
                >
                  <DashboardIcon classes={{ root: styles.icon }} />
                  <p>Dashboard</p>
                </div>
                {
                  user_type === ADMIN && (
                    <><div
                      className={`${styles['icon-container']} ${activeIndex === 1 && styles.active}`}
                      onClick={() => {
                        onClick('/add-document');
                      } }
                    >
                      <AddBoxIcon classes={{ root: styles.icon }} />
                      <p>Add Document</p>
                    </div>
                      <div
                        className={`${styles['icon-container']} ${activeIndex === 2 && styles.active}`}
                        onClick={() => {
                          onClick('/orders');
                        } }
                      >
                        <AddBoxIcon classes={{ root: styles.icon }} />
                        <p>Orders</p>
                      </div></>
                  )
                }
              </div>
              <div className={styles['logout-container']} onClick={() => { setOpenDialog(true) }}>
                <div className={styles.logout}></div>
                <p>Logout</p>
              </div>
            </div>

          </div>
        )

      }
      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
        }}
        classes={{ root: styles['dialog'] }}
      >
        <div className={styles['dialog-container']}>
          <p>Logout</p>
          <p>Are you sure you want to log out?</p>
          <div className={styles.action}>
            <button onClick={() => { setOpenDialog(false) }}>Cancel</button>
            <button onClick={onLogoutHandler}>Logout</button>
          </div>
        </div>
      </Dialog>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    user_type: state.auth.user?.type
  }
}

export default connect(mapStateToProps, { logout })(Navbar);