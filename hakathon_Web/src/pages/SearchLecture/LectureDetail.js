import "./SearchLecture.css";

export default function LectureDetail(props) {
    const detailData = props.detailData;

    console.log(props);
    return (
        <div>
            <div style={{display:"flex"}}>
                <div>{detailData.title}</div>
                <div>{detailData.time}</div>
            </div>
            <div>
                <div>
                    <a href={detailData.url}>웹사이트 바로가기</a>
                </div>
                <div>강좌 등록!</div>
            </div>
        </div>
    );
}