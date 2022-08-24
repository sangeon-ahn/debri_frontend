import { atom } from 'recoil';

export const lowbarSelect = atom({
  key: 'lowbarSelect',
  default: {
    homeButton: true,
    lectureButton: false,
    boardButton: false,
    curriButton: false
  },
});
