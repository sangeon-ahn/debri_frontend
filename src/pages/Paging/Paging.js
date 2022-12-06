import Pagination from 'react-js-pagination';
import './Paging.css';

export default function Paging ({ page, count, setPage }) {
  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={1}
      totalItemsCount={count}
      pageRangeDisplayed={5}
      prevPageText={'‹'}
      nextPageText={'›'}
      firstPageText={''}
      lastPageText={''}
      onChange={setPage}
    />
  );
};