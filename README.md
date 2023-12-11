npm install multer --save; < 이미지 사용할때 설치

https://github.com/expressjs/multer/blob/master/doc/README-ko.md multer 깃

## client

mkdir client
npx create-react-app .
npm install react-router-dom
npm install axios
npm install http-proxy-middleware
npm install @emotion/css <-- emotion 사용할때만 사용
npm install @emotion/react <-- emotion 사용할때만 사용
npm install @emotion/styled <-- emotion 사용할때만 사용
npm install sass
npm install firebase
npm install react-redux
npm install @reduxjs/toolkit
`npm install react-bootstrap bootstrap` <-- bootstrap 사용하면 설치 아니면 설치 X
## server

mkdir server
npm init -y;
npm install express --save;
npm install nodemon --save;
npm install path --save;
npm install mongoose --save;
npm install multer --save;
npm install aws-sdk@2.348.0 --save
npm install multer-s3 --save <- 서버 올릴때 필요


## 마크다운
- 파일생성 `echo "" > README.md`

## 8000번 에러 주소 비밀번호 틀린거


## 배열에 숫자나오기

`import React, { useState } from 'react'

const App = () => {
  const [temp, setTemp] = useState([1, 2, 3]);

  return (
    <div>
      <h1>React</h1>
      {temp}
      <br />
      <button onClick={() => {
        let arr = [];
        arr = [...temp];
        arr.push(4);
        setTemp([...arr]);
      }}
      >
        버튼</button>
    </div>
  )
}

export default App`


## 입력 누르면 결과값 나오기
`import React, { useState } from 'react'

const App = () => {
  const [content, setContent] = useState("");

  const onSubmit = () => {
    alert(content);
  }

  return (
    <div>
      <h1>React</h1>
      <div>
        dfsd
      </div>
      <input
        type="text"
        value={content}
        onChange={(e) => {
          console.log(e.currentTarget.value)
          setContent(e.currentTarget.value);
        }}
      />
      <br />
      <button
        onClick={() => {
          onSubmit();
        }}
      >입력</button>
    </div>
  )
}

export default App`


React to do list
## gpt 버전

`import React, { useState } from 'react';

const App = () => {
  const [content, setContent] = useState(""); // 입력된 내용을 관리
  const [todos, setTodos] = useState([]); // 할 일 목록을 관리

  const onSubmit = () => {
    if(content === "") {
      alert('할 일을 입력하세요!');
      return;
    }
    setTodos([...todos, content]); // 새 할 일을 목록에 추가
    setContent(''); // 입력 필드 초기화
  }

  return (
    <div>
      <h1>React To Do List</h1>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.currentTarget.value)}
      />
      <button onClick={onSubmit}>입력</button>
      <div>
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>{todo}</li> // 할 일 목록 표시
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;`

## 수업 내용

`import React, { useState } from 'react';

const App = () => {
  const [content, setContent] = useState(""); // 입력된 내용을 관리
  const [contentList, setcontentList] = useState([]); // 할 일 목록을 관리

  const onSubmit = () => {
    let tempArr = [...contentList];
    tempArr.push(content)
    setcontentList([...tempArr]);
  }

  return (
    <div>
      <h1>React To Do List</h1>
      <div>
        {contentList.map((content, key) => (
          <div key={key}>{content}</div>
        ))}
      </div>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.currentTarget.value)}
      />
      <br />
      <button
        onClick={() => {
          onSubmit();
        }}
      >입력</button>
    </div>
  );
}

## package.json

"scripts": {
    "start": "nodemon index.js"
  }, <-- 이렇게 변경

## src에 setupProxy.js 생성
export default App;`

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:5050', <-- 로컬호스트 번호 수정
            changeOrigin: true,
        })
    );
};

## pubic에 index.html 이렇게 처음에 변경 

`<!DOCTYPE html>
<html lang="ko">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>

  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
    integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous" />
</head>

<body>
  <div id="root">

  </div>
</body>

</html>`

## list 에 데이터 보내고 받기

import React, { useEffect, useState } from 'react'
import axios from "axios"

const List = () => {
    const [text, setText] = useState("");

    useEffect(() => {
        axios.post("/api/test")
            .then((response) => {
                if (response.data.success) {
                    setText(response.data.text);
                }
            })
            .catch((err) => {
                alert("요청 실패");
                console.log(err)
            });
    }, []);

    return (
        <div>
            <p>{text}</p>
        </div>
    )
}

export default List

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const port = 5050;

// mongodb+srv://capitaljs10:wltjddl7306@cluster0.mp5tfry.mongodb.net/?retryWrites=true&w=majority

app.listen(port, () => {
    mongoose.connect(
        "mongodb+srv://capitaljs10:wltjddl7306@cluster0.mp5tfry.mongodb.net/?retryWrites=true&w=majority"
    )
        .then(() => {
            console.log("listening --> " + port);
            console.log("listening -->  + conneting");
        })
        .catch((err) => {
            console.log(err)
        })

})


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.post("/api/test", (req, res) => {
    console.log(req);
    res.status(200).json({ success: true, text: "방가워요!" });
})

## mongodb -> Database -> insertdocument -> name: "counter" 입력 다음칸 -> postNum: 1 입력
