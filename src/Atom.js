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

export const AddSnackbarOpen = atom({
  key: 'AddSnackbarOpen',
  default: false,
  // effects_UNSTABLE: [persistAtom],
}); 

// export const unScrappedBoardsAtom = atom({
//   key: 'unScrappedBoards',
//   default: [],
//   effects_UNSTABLE: [persistAtom],
// });

