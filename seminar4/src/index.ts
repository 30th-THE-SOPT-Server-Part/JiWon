import express, { Request, Response, NextFunction } from "express";
const app = express(); //express로 서버 띄우기
import connectDB from "./loaders/db";
import routes from './routes';
import config from "./config";

require('dotenv').config();

connectDB(); //서버 실행 시 db 띄우기

//swagger 연결
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
const path = require('path');
const swaggerSpec = YAML.load(path.join(__dirname, '../build/swagger.yaml'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //request 들어오면 json으로 변경해주겠다.

app.use(routes);   //라우터 
// error handler

interface ErrorType {
  message: string;
  status: number;
}

//라우터로 가는 모든 에러를 잡겠다.
app.use(function (err: ErrorType, req: Request, res: Response, next: NextFunction) {

  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "production" ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render("error");
  res.json({
    message: err.message,
    error: err
  });
});

app
  .listen(config.port, () => { //환경변수를 이용해서 포트를 보여준다.
    console.log(`
    ################################################
          🛡️  Server listening on port 🛡️
    ################################################
  `);
  })
  .on("error", (err) => {
    console.error(err);
    process.exit(1);
  });