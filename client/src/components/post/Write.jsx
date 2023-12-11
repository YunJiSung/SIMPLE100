import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Image from './Image';


const Write = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");

    let navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();

        if (title === "" || content === "") {
            return alert("내용을 채워주세요!");
        }

        let body = {
            title: title,
            content: content,
            image: image
        }

        axios
            .post("/api/post/write", body)
            .then((resopnse) => {
                if (resopnse.data.success) {
                    alert("글 작성이 완료되었습니다.");
                    navigate("/list");
                } else {
                    alert("글 작성이 실패하였습니다.")
                }
            })
    }

    return (
        <div className='login__wrap'>
            <div className="login__header">
                <h3>Write</h3>
                <p>글을 작성하시겠습니까?</p>
            </div>
            <form className='login__form'>
                <fieldset>
                    <legend className="blind">글쓰기 영역</legend>
                    <div>
                        <label htmlFor="youName" className="required blind">글 제목</label>
                        <input className='input__style'
                            type="text"
                            id="youName"
                            placeholder='글을 작성하세요!'
                            value={title}
                            onChange={(event) => setTitle(event.currentTarget.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="youName" className="required blind">글 내용</label>
                        <textarea
                            type="text"
                            id="youName"
                            placeholder='글 내용을 작성하세요!'
                            value={content}
                            onChange={(e) => setContent(e.currentTarget.value)}
                        />

                    </div>

                    <Image setImage={setImage} />

                    <button
                        type="submit"
                        className="btn__style2 mt30"
                        onClick={(e) => onSubmit(e)}>글쓰기</button>
                </fieldset>
            </form>
        </div>
    )
}

export default Write