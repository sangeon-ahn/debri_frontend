import React, {useState, useEffect}  from 'react';
import styles from './Join.module.scss';

function JoinPresenter(){

  const [allCheck, setAllCheck] = useState(false);
  const [useCheck, setUseCheck] = useState(false);
  const [marketingCheck, setMarketingCheck] = useState(false);

  const allBtnEvent =()=>{
    if(allCheck === false) {
      setAllCheck(true);
      setUseCheck(true);
      setMarketingCheck(true);
    }else {
      setAllCheck(false);
      setUseCheck(false);
      setMarketingCheck(false);
    } 
  };
  
  const useBtnEvent =()=>{
    if(useCheck === false) {
      setUseCheck(true)
    }else {
      setUseCheck(false)
    }
  };
  
  const marketingBtnEvent =()=>{
    if(marketingCheck === false) {
      setMarketingCheck(true)
    }else {
      setMarketingCheck(false)
    }
  };

  useEffect(()=>{
    if(useCheck===true && marketingCheck===true){
      setAllCheck(true)
    } else {
      setAllCheck(false)
    }
  }, [useCheck, marketingCheck])


  return (
    <form method="post" action="" className={styles.form}>
      <div>
        <div>
        	<div>
        		<input type="checkbox" id="all-check" checked={allCheck} onChange={allBtnEvent}/>
        		<label for="all-check">전체동의</label>
        	</div>
        	<div>
        		<input type="checkbox" id="check2" checked={useCheck}  onChange={useBtnEvent}/>
        		<label for="check2">이용약관</label>
        	</div>
        	<div>
        		<input type="checkbox" id="check3" checked={marketingCheck}  onChange={marketingBtnEvent}/>
        		<label for="check3">마케팅 동의</label>
        	</div>
        </div>
      </div>
    </form>
  )
}

export default JoinPresenter;