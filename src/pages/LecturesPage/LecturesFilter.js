import { useEffect } from 'react';
import keywordMinusIcon from '../../assets/deleteFilterIcon.png';
import keywordPlusIcon from '../../assets/keywordPlusIcon.png';

export default function LecturesFilter(props) {
  const { subject, material, pricing, handleSubjectClick, handleTypeClick, handlePriceClick, setFilterHeight } = props;

  useEffect(() => {
    const $keywordsContainer = document.querySelector('.keywords-container');
    setFilterHeight($keywordsContainer.clientHeight);
    console.log($keywordsContainer.clientHeight);
  }, [subject, material, pricing]);

  return (
    <>
      <div className="keywords-container">
        <div className="keywords-subject-container">
          {(subject === 'Front' || subject === null) && <button className={subject === 'Front' ? 'keyword red' : 'keyword'} onClick={() => handleSubjectClick('Front')}>
            Front
            {subject === 'Front' ?
              <img className="keyword-minus-icon" src={keywordMinusIcon} alt="" onClick={() => handleSubjectClick('Front')}/> :
            <img className="keyword-plus-icon" src={keywordPlusIcon} alt="" onClick={() => handleSubjectClick('Front')}/>}
          </button> }
          {(subject === 'Back' || subject === null) && <button className={subject === 'Back' ? 'keyword green' : 'keyword'} onClick={() => handleSubjectClick('Back')}>
            <div>Back</div>
            {subject === 'Back' ?
              <img className="keyword-minus-icon" src={keywordMinusIcon} alt=""  onClick={() => handleSubjectClick('Back')}/> :
              <img className="keyword-plus-icon" src={keywordPlusIcon} alt=""  onClick={() => handleSubjectClick('Back')}/>}
          </button> }
          {(subject === 'Python' || subject === null) && <button className={subject === 'Python' ? 'keyword blue': 'keyword'} onClick={() => handleSubjectClick("Python")}>
            <div>Python</div>
            {subject === 'Python' ?
              <img className="keyword-minus-icon" src={keywordMinusIcon} alt="" onClick={() => handleSubjectClick("Python")}/> :
              <img className="keyword-plus-icon" src={keywordPlusIcon} alt="" onClick={() => handleSubjectClick("Python")}/>}
          </button>}
          {(subject === 'C 언어' || subject === null) && <button className={subject === 'C 언어' ? 'keyword gray': 'keyword'} onClick={() => handleSubjectClick('C 언어')}>
            <div>C 언어</div>
            {subject === 'C 언어' ?
              <img className="keyword-minus-icon" src={keywordMinusIcon} alt="" onClick={() => handleSubjectClick('C 언어')} /> :
              <img className="keyword-plus-icon" src={keywordPlusIcon} alt="" onClick={() => handleSubjectClick('C 언어')} />}
          </button>}
        </div>
        <div className="keywords-subject-container">
        {(material === '서적' || material === null) && <button className={material === '서적' ? 'keyword white': 'keyword'} onClick={() => handleTypeClick('서적')}>
            서적
            {material === '서적' ?
              <img className="keyword-minus-icon" src={keywordMinusIcon} alt="" onClick={() => handleTypeClick('서적')} /> :
              <img className="keyword-plus-icon" src={keywordPlusIcon} alt="" onClick={() => handleTypeClick('서적')} />}
          </button>}
          {(material === '영상' || material === null) && <button className={material === '영상' ? 'keyword white': 'keyword'} onClick={() => handleTypeClick('영상')}>
            영상
            {material === '영상' ?
              <img className="keyword-minus-icon" src={keywordMinusIcon} alt="" onClick={() => handleTypeClick('영상')} /> :
              <img className="keyword-plus-icon" src={keywordPlusIcon} alt="" onClick={() => handleTypeClick('영상')} />}
          </button>}
        </div>
        <div>
        {(pricing === '무료' || pricing === null) && <button className={pricing === '무료' ? 'keyword darkgray': 'keyword'} onClick={() => handlePriceClick('무료')}>
            무료
            {pricing === '무료' ?
              <img className="keyword-minus-icon" src={keywordMinusIcon} alt="" onClick={() => handlePriceClick('무료')} /> :
              <img className="keyword-plus-icon" src={keywordPlusIcon} alt="" onClick={() => handlePriceClick('무료')} />}
          </button>}
          {(pricing === '유료' || pricing === null) && <button className={pricing === '유료' ? 'keyword darkgray': 'keyword'} onClick={() => handlePriceClick('유료')}>
            유료
            {pricing === '유료' ?
              <img className="keyword-minus-icon" src={keywordMinusIcon} alt="" onClick={() => handlePriceClick('유료')} /> :
              <img className="keyword-plus-icon" src={keywordPlusIcon} alt="" onClick={() => handlePriceClick('유료')} />}
          </button>}
        </div>
      </div>
    </>
  );
}