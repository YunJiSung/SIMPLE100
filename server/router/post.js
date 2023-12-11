const express = require("express");
// const multer = require("multer");
const router = express.Router();

// 스키마
const { Post } = require("../Model/Post.js");
const { Counter } = require("../Model/Counter.js")

const setUpload = require("../util/upload.js");

// 글 쓰기
router.post("/write", (req, res) => {
    let temp = req.body;

    Counter.findOne({ name: "counter" })
        .exec()
        .then((counter) => {
            temp.postNum = counter.postNum;

            const BlogWrite = new Post(temp);
            BlogWrite.save()
                .then(() => {
                    Counter.updateOne({ name: "counter" }, { $inc: { postNum: 1 } }).then(() => {
                        res.status(200).json({ success: true });
                    })
                })
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ success: false });
        })
})

// 글 목록
router.post("/list", (req, res) => {
    Post.find()
        .exec()
        .then((result) => {
            res.status(200).json({ success: true, postList: result });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ success: false });
        })
})

// 글 보기
router.post("/detail", (req, res) => {
    Post.findOne({ postNum: req.body.postNum })
        .exec()
        .then((result) => {
            res.status(200).json({ success: true, post: result });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ success: false });
        })
})

// 글 수정
router.post("/modify", (req, res) => {
    let temp = {
        title: req.body.title,
        content: req.body.content
    }

    Post.updateOne({ postNum: Number(req.body.postNum) }, { $set: temp })
        .exec()
        .then(() => {
            res.status(200).json({ success: true });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ success: false });
        })
})

// 글 삭제
router.post("/delete", (req, res) => {
    Post.deleteOne({ postNum: Number(req.body.postNum) })
        .exec()
        .then(() => {
            res.status(200).json({ success: true });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ success: false });
        })
})

// 이미지 업로드(로컬)
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "image/");
//     },
//     filename: function (req, file, cb) {
//         cb(null, `${Date.now()}_${file.originalname}`);
//     },
// });

// const upload = multer({ storage: storage }).single("file");

// router.post("/image/upload", (req, res) => {
//     // console.log(req.body, req.formData);
//     upload(req, res, (err) => {
//         if (err) {
//             res.status(400).json({ success: false });
//         } else {
//             res.status(200).json({ success: true, filePath: res.req.file.path });
//         }
//     })
// })

// 이미지 업로드(서버)
router.post("/image/upload", setUpload("simple100/post"), (req, res, next) => {
    console.log(res.req);
    res.status(200).json({ success: true, filePath: res.req.file.location })
})

module.exports = router;