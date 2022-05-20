const { request } = require('http');
const { isNativeError } = require('util/types');

const swaggerAutogen = require('swagger-autogen')({
     openapi: '3.0.0' 
    }); 
    const options = { 
        info: { 
            title: 'SOPT 30', 
            description: 'SOPT SERVER SEMINAR', 
        }, 
        servers: [ { 
            url: 'http://localhost:8000', 
        }, ], 
        schemes: ['http'], 
        tags: [        // by default: empty Array
        {
            name: 'Users',         // Tag name
            description: '유저 조회,생성,삭제,수정',  // Tag description
        },
        {
            name: 'Review',         // Tag name
            description: '리뷰',  // Tag description
        },
        ],
        securityDefinitions: { 
            bearerAuth: { 
                type: 'http', scheme: 'bearer', in: 'header', bearerFormat: 'JWT', 
            }, 
        }, 
        definitions: {
            User:{
                name: 'Hong Gildong',
                age: 25,
                phone: '01012345678',
                email: 'sopt@naver.com',
                school:{
                    name: 'SOPT',
                    major: 'server'
                }
            }
        },
        components: {
            examples:{
                User:{
                    value:{
                        name: 'Hong Gildong',
                        age: 25,
                        phone: '01012345678',
                        email: 'sopt@naver.com',
                        school:{
                            name: 'SOPT',
                            major: 'server'
                        }
                    },
                    summary: "Sample for User"
                }
            }
        },
    }; 
    const outputFile = './src/swagger/swagger-output.json'; 
    const endpointsFiles = ['./src/routes/ReviewRouter.ts', './src/routes/UserRouter.ts']; 
    swaggerAutogen(outputFile, endpointsFiles, options);