import dotenv from "dotenv";

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development"; //현재 실행중인 서버가 production인지 development인지

const envFound = dotenv.config();
if (envFound.error) { //env가 없다면 에러처리를 해준다.
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT as string, 10) as number,

  /**
   * MongoDB URI
   */
  mongoURI: process.env.MONGODB_URI as string,
};