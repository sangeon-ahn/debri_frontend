import Comment from "../Comment/Comment";
import ReComment from "../ReComment/ReComment";

export default function Comments(props) {
  const { comments, setRootCommentIdx, setPlaceHolder, inputRef, handleCommentDelete, setCommentReported, handleReportComment } = props;
  // 일단은 댓글과 대댓글의 순서로 정렬한 다음,
  // 이 정렬된 객체를 넘겨서 map으로 출력
  // filter를 사용해서 루트댓글인 경우와 대댓글인 경우를 나눠서 컴포넌트에 프로퍼티로 넘기고
  // 댓글 작성하는 경우에는 그려준 후에 api로 보내서 로딩시간 최소화
  // 그려주려면 3번 주석에 나눈 부분에다가 추가해서 상태변경 해줘야함
  // 루트댓글의 대댓글 인덱스 개수를 구한 후 +1한값만큼 해당 배열의 인덱스로 넣어준다.

  // 아니면 모든 댓글 순회하면서 일단 commentLevel=0인 것 중에서 commentLevel=1이고 commentGroup=자기댓글인덱스인 것들을 구해서 이걸 대댓글로 렌더링해주기
  // 이렇게 하면 Comments -> Comment -> ReComment 이런식으로 프로퍼티 넘겨주면 됨
  // Comments는 댓글 전체 컨테이너
  // Comment는 루트댓글 + 대댓글들 컨테이너
  // Recomment는 대댓글 컨테이너
  // console.log(comments);
  // comments.forEach(element => {
  //   console.log(element.commentIdx, element.commentGroup);
  // });
  // console.log(comments.filter(comment => comment.commentLevel === 0).map(rootComment => {
  //   return <Comment key={rootComment.commentIdx} comment={rootComment} reComments={comments.filter(comment => comment.commentLevel === 1 && comment.commentGroup === rootComment.commentIdx)} />
  // }));

  return (
    <div className="comments-container">
      {comments.filter(comment => comment.commentLevel === 0)
      .map(rootComment => {
        return <Comment
          key={rootComment.commentIdx}
          comment={rootComment}
          reComments={comments.filter(
            comment => comment.commentLevel === 1 && comment.commentGroup === rootComment.commentIdx
          )}
          setRootCommentIdx={setRootCommentIdx}
          setPlaceHolder={setPlaceHolder}
          inputRef={inputRef}
          handleCommentDelete={handleCommentDelete}
          setCommentReported={setCommentReported}
          handleReportComment={handleReportComment} />
      })}
    </div>
  );
}