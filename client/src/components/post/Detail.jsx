import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { Link, useParams } from 'react-router-dom';

const Detail = () => {
    const [postInfo, setPostInfo] = useState({});

    const navigate = useNavigate();


    let params = useParams();

    useEffect(() => {
        let body = {
            postNum: params.postNum
        }

        axios.post("/api/post/detail", body)
            .then((response) => {
                console.log(response);
                setPostInfo(response.data.post);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [params.postNum]);

    const DeleteHandler = () => {
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            let body = {
                postNum: params.postNum
            }
            axios
                .post("/api/post/delete", body)
                .then((response) => {
                    if (response.data.success) {
                        alert("게시글 삭제")
                        navigate("/list")
                    }
                })
                .catch((err) => {
                    console.log(err)
                    alert("삭제 ㅅㅍ")
                })
        }
    }


    return (
        <div className='detail__wrap'>
            <div className='detail__title'>
                <h3>{postInfo.title}</h3>
                <div className='auth'>JS</div>
            </div>
            <div className='detail__content'>
                {postInfo.image ? <img src={postInfo.image} alt={postInfo.title} /> : null}
                {postInfo.content}
            </div>
            <div className='detail__btn'>
                <Link to={`/modify/${postInfo.postNum}`}>
                    수정
                </Link>
                <button onClick={() => DeleteHandler()}>삭제</button>
                <Link to="/">목록보기</Link>
            </div>
        </div >
    )
}

export default Detail