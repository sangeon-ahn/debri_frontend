import './AllBoards.css';
import emptyStar from '../../../assets/emptyStar.png';
import rightArrow from '../../../assets/rightArrow.png';


export default function AllBoards({ boards }) {
  return (
    <div className='all-boards'>
      <div className='all-boards-title'>
        <p>전체 게시판</p>
      </div>
      <div>
        {boards.filter(board => board.favorite === false)
        .map(board => {
          return (
            <div className='board-menu' key={board.id}>
              <button>
                <img src={emptyStar} alt="엑박"></img>
              </button>
              <div>{board.text}</div>
              <img src={rightArrow} alt="엑박" width="9.44px" height="16.19px" className='right-arrow'/>
            </div>
          )
        })}
      </div>
  </div>
  );
}

