import { Snackbar, Button, createTheme, ThemeProvider, Alert } from "@mui/material";
import { useState } from 'react';
import AddLectureSuccessIcon from "./AddLectureSuccessIcon";

export const AddLectureSnackbar = (props) => {
  const { open, handleClose } = props;

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
          top: '180px',
          width: '316px',
          left: '22px'
        }}
      >
        <Alert icon={<AddLectureSuccessIcon />} sx={alertStyle}>
          <span style={restStyle}>커리큘럼에 강의가 추가 되었습니다!</span>
        </Alert>
      </Snackbar>
    </>
  )
}