export const getTimeAfterCreated = (minute) => {
  if (minute < 1 || isNaN(minute)) {
    return '방금';
  }

  if (minute < 60) {
    return String(minute) + '분 전';
  }

  if (minute < 60 * 24) {
    return parseInt(minute / 60) + '시간 전';
  }

  if (minute < 60 * 24 * 30) {
    return parseInt(minute / (60 * 24)) + '일 전';
  }

  if (minute < 60 * 24 * 30 * 12) {
    return parseInt(minute / (60 * 24 * 30)) + '개월 전';
  }

  return parseInt(minute / (60 * 24 * 30 * 12)) + '년 전';
};