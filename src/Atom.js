import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist()

// export const scrappedBoardsAtom = atom({
//   key: 'boardList',
//   default: false,
//   effects_UNSTABLE: [persistAtom],
// });

// export const unScrappedBoardsAtom = atom({
//   key: 'unScrappedBoards',
//   default: [],
//   effects_UNSTABLE: [persistAtom],
// });