import { Snackbar, Button, createTheme, ThemeProvider, Alert } from "@mui/material";
import { useState } from 'react';
import PostScrapSuccessIcon from "./PostScrapSuccessIcon";

export const PostScrapSnackbar = (props) => {
  const { open, handleClose } = props;

  const messageStyle = {
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '14px',
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
    fontWeight: 400,
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
        <Alert icon={<PostScrapSuccessIcon />} sx={alertStyle}>
          <span style={messageStyle}>내가 스크랩한 게시물</span>
          <span style={restStyle}> 에 저장 되었습니다!</span>
        </Alert>
      </Snackbar>
    </>
  )
}