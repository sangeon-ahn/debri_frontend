export const getCurriCompletedAt = (completedAt) => {
  const temp = completedAt.split('-');
  const year = temp[0];
  const month = temp[1][0] === '0' ? temp[1][1] : temp[1];
  const day = temp[2].slice(0, 2)[0] === '0' ? temp[2].slice(0, 2)[1] : temp[2].slice(0, 2);
  
  const result = year + '년 ' + month + '월 ' + day + '일에 완료함';
  return result;
}
