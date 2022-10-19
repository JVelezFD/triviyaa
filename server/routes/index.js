const express = require("express")
const cors = require("cors")
const request = require("request")
const router = express.Router()

router.use(cors())
router.get("/", (req, res) => {
  res
    .send({ response: "Welcome to the triviyaa api using socket.io and react" })
    .status(200)
})

router.get("/start", (req, res) => {
  request({
    uri: "https://opentdb.com/api.php?amount=3&category=18&difficulty=hard",
  }).pipe(res)
})

module.exports = router
