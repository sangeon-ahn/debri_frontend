import "./WriteComment.css";
import writeCommentIcon from '../../../assets/writeCommentIcon.png';
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function WriteComment(props) {
  const [commentContent, setCommentContent] = useState('');
  const { handleEnterInput, authorName, placeHolder, setInputRef, setPlaceHolder, setRootCommentIdx } = props;
  console.log(placeHolder);
  const handleCommentInput = (e) => {
    setCommentContent(e.target.value);
  };
  const inputRef = useRef();

  setInputRef(inputRef);

  useEffect(() => {
    inputRef.current.addEventListener('focusout', () => {
      setPlaceHolder('댓글 쓰기');
      setRootCommentIdx(null);
    });
    return inputRef.current.removeEventListener('focusout', () => {
      setPlaceHolder('댓글 쓰기');
      setRootCommentIdx(null);
    });
  }, []);
  
  // const deleteComment = async (commentId) => {
  //   try {
  //     const patching = axios.patch(`/api/comment/delete/${commentId}`);
  //     console.log(patching);
  //     count.current--;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  return (
    <div className="write-comment-box">
      <div className="write-comment-icon-box">
        <img src={writeCommentIcon} alt="" />
      </div>
      <input
        ref={inputRef}
        type="text"
        className="write-comment-input"
        placeholder={placeHolder ? placeHolder : "댓글쓰기"}
        value={commentContent}
        onChange={handleCommentInput}
        onKeyDown={(e) => {
          if (e.key !== "Enter") {
            return;
          }

          handleEnterInput(e, commentContent, authorName);
          setCommentContent('');
        }}
      />
    </div>
  );
}