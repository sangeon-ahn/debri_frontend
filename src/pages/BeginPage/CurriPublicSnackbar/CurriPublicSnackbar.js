import { Snackbar, Button, createTheme, ThemeProvider, Alert } from "@mui/material";
import { useState } from 'react';
import CurriPublicSnackbarIcon from "./CurriPublicSnackbarIcon";

export const CurriPublicSnackbar = (props) => {
  const { open, handleClose } = props;

  const messageStyle = {
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '20px',
    color: '#000000'
  };

  const alertStyle = {
    width: '100%',
    color: 'black',
    backgroundColor: '#D9D9D9',
    borderRadius: '10px',
  };

  const restStyle = {
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '14px',
    lineHeight: '20px',
    color: '#000000'
  };

  return (
    <>
      <Snackbar
        autoHideDuration={1000}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        sx={{
          bottom: '31px',
          width: '316px',
          left: '22px'
        }}
      >
        <Alert icon={<CurriPublicSnackbarIcon />} sx={alertStyle}>
          {/* <span style={messageStyle}>홈 &#62; 내 스크랩</span> */}
          <span style={restStyle}> 커리큘럼이 공개로 변경되었습니다!</span>
        </Alert>
      </Snackbar>
    </>
  )
}