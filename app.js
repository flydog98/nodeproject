//express 모듈 불러오기
const express = require("express");

//express 사용
const app = express();

const apirouter = require("./routes/api");
const s3router = require("./routes/s3router")

app.set('view engine', 'ejs');
app.set('views', './views');

//Express 4.16.0버전 부터 body-parser의 일부 기능이 익스프레스에 내장 body-parser 연결
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apirouter);
app.use("/upload", s3router);

// http listen port 생성 서버 실행
const server = app.listen(3000, () => {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Express Server Listening at http://%s.%s", host, port);
});
