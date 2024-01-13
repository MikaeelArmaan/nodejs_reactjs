import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import {connect} from 'react-redux';

const Loading = ({isLoading}) => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: 10 }}
      open={isLoading}
    >
      <CircularProgress sx={{color:'#00A1E0'}}/>
    </Backdrop>
  )
}

const mapStateToProps = (state)=>{
  return {
    isLoading:state.loading.isLoading
  }
}

export default connect(mapStateToProps)(Loading);