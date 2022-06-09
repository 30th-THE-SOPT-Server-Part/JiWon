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
  
  /**
   * JWT secret
   */
  jwtSecret: process.env.JWT_SECRET as string,

  /**
   * JST algorithm
   */
  jwtAlgo: process.env.JWT_ALGO as string,

  /**
   * AWS S3
   */
  s3AccessKey: process.env.S3_ACCESS_KEY as string,
  s3SecretKey: process.env.S3_SECRET_KEY as string,
  bucketName: process.env.BUCKET_NAME as string
};