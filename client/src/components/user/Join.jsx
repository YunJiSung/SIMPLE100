import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios"

import firbase from '../../firebase.js'

const Join = () => {
    const [youName, setYouName] = useState("");
    const [youEmail, setYouEmail] = useState("");
    const [youPass, setYouPass] = useState("");
    const [youPassC, setYouPassC] = useState("");
    const [flag, setFlag] = useState(false);

    let navigate = useNavigate();

    const joinFunc = async (e) => {
        setFlag(true);
        e.preventDefault();

        if (!(youName && youEmail && youPass && youPassC)) {
            return alert("모든 항목을 채워야 회원가입이 가능합니다.");
        }
        if (youPass !== youPassC) {
            return alert("비밀번호가 다릅니다.");
        }

        //개인정보 --> firbase
        let createUser = await firbase.auth().createUserWithEmailAndPassword(youEmail, youPass)

        await createUser.user.updateProfile({
            displayName: youName,
        })

        // console.log(createUser.user)

        //개인정보 --> mongodb
        let body = {
            displayName: createUser.user.multiFactor.user.displayName,
            email: createUser.user.multiFactor.user.email,
            uid: createUser.user.multiFactor.user.uid,
        }
        axios.post("/api/user/join", body)
            .then((response) => {
                setFlag(false);
                if (response.data.success) {
                    //회원가입 성공
                    navigate("/login");
                } else {
                    return alert("회원가입에 실패했습니다.");
                }
            })
    }

    return (
        <div className='login__Wrap'>
            <div className='login__header'>
                <h2>
                    Join
                </h2>
                <p>회원가입을 해주세요.</p>
            </div>
            <form className="login__form" action='' name='loginSave' method='post'>
                <fieldset>
                    <legend className='blind'>회원가입 영역</legend>
                    <div className='login__input'>
                        <label htmlFor='youName' className='blind'>이름</label>
                        <input type='text' value={youName} id='youName' name='youName' placeholder='이름을 입력해주세요' autoComplete='off' required onChange={(e) => setYouName(e.currentTarget.value)} />
                    </div>
                    <div className='login__input'>
                        <label htmlFor='youEmail' className='blind'>이메일</label>
                        <input type='email' value={youEmail} minLength={8} id='youEmail' name='youEmail' placeholder='이메일을 입력해주세요' autoComplete='off' required onChange={(e) => setYouEmail(e.currentTarget.value)} />
                    </div>
                    <div className='login__input'>
                        <label htmlFor='youPass' className='blind'>비밀번호</label>
                        <input type='password' value={youPass} minLength={8} id='youPass' name='youPass' placeholder='비밀번호를 입력해주세요' autoComplete='off' required onChange={(e) => setYouPass(e.currentTarget.value)} />
                    </div>
                    <div className='login__input'>
                        <label htmlFor='youPassC' className='blind'>비번확인</label>
                        <input type='password' value={youPassC} id='youPassC' name='youPassC' placeholder='비밀번호를 다시 입력해주세요' autoComplete='off' required onChange={(e) => setYouPassC(e.currentTarget.value)} />
                    </div>
                    <button disabled={flag} type='submit' className='login__btn' onClick={(e) => joinFunc(e)}>회원가입</button>
                </fieldset>
            </form>
        </div>
    )
}

export default Join