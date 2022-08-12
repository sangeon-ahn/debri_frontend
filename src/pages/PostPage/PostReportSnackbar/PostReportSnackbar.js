import { Snackbar, Alert } from "@mui/material";
import PostReportSnackbarIcon from "./PostReportSnackbarIcon";

export default function PostReportSnackbar(props) {
  const { open, handleClose } = props;

  const messageStyle = {
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '14px',
    lineHeight: '20px',
    color: '#000000',
  };

  const alertStyle = {
    width: '316px',
    color: 'black',
    backgroundColor: '#D9D9D9',
    borderRadius: '10px',
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
        <Alert icon={<PostReportSnackbarIcon />} sx={alertStyle}>
          <span style={messageStyle}>신고가 접수되었습니다!</span>
        </Alert>
      </Snackbar>
    </>
  )
}