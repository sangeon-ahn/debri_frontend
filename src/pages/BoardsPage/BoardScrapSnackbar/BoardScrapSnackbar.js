import { Snackbar, Alert } from "@mui/material";
import BoardScrapSuccessIcon from "./BoardScrapSuccessIcon";

export default function BoardScrapSnackbar(props) {
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
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '20px',
    color: '#000000'
  };

  return (
    <>
      <Snackbar
        autoHideDuration={1500}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        sx={{
          bottom: '300px',
          width: '316px',
          left: '104px'
        }}
      >
        <Alert icon={<BoardScrapSuccessIcon />} sx={alertStyle}>
          <span style={restStyle}>새로운 즐겨찾기가 추가되었습니다!</span>
        </Alert>
      </Snackbar>
    </>
  )
}