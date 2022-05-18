//동기, 비동기
/**
 * @Callback함수
 */
// console.log("안녕하세요");
// setTimeout(()=>{ //CallBack Function
//     console.log("Set Time Out");
// }, 2000);

// console.log("끝");

/**
 * 코드가 동기적으로(순서대로) 실행이 될 것이라고 생각하지만, 
 * >> 안녕하세요
 * >> 끝
 * >> Set Time Out
 * 의 결과가 나오는 것을 확인할 수 있다. => 콜백function은 
 * */


/**
 * @Promise
 */
// const condition: boolean = false;

// const promise = new Promise((resolve, reject) => {
//     if(condition){ //성공했을 때 resolve 호출
//         resolve('성공'); //resolve에 데이터를 넣자
//     }
//     else{
//         reject(new Error('reject error !!'));
//     }
// });

// promise
//     .then((resolveData): void => { //promise가 실행이 되고, then으로 반환된 resolve데이터를 받아옴
//         console.log(resolveData);
//     })
//     .catch(error => console.log(error)); //reject는 catch로 받아옴



/**
 * @PromiseChaining
 */
// const restaurant = (callback: () => void, time: number) => {
//     setTimeout(callback,time);
// }
// const order = (): Promise<string> => {
//     return new Promise((resolve, reject) => {
//         restaurant(() => {
//             console.log("레스토랑 진행 상황 - 음식 주문");
//             resolve("음식 주문 시작");
//         }, 1000);
//     });
// }

// const cook = (progress: string): Promise<string> => {
//     return new Promise((resolve, reject) => {
//         restaurant(() => {
//             console.log("레스토랑 진행 상황 - 음식 조리 중");
//             resolve(`${progress} -> 음식 조리 중`);
//         },2000);
//     });
// }

// const serving = (progress: string): Promise<string> => {
//     return new Promise((resolve, reject) => {
//         restaurant(()=> {
//             console.log("레스토랑 진행 상황 - 음식 서빙 중");
//             resolve(`${progress} -> 음식 서빙 중`);
//         },2500);
//     });
// }

// const eat = (progress: string): Promise<string> => {
//     return new Promise((resolve, reject) => {
//         restaurant(()=> {
//             console.log("레스토랑 진행 상황 - 음식 먹는 중");
//             resolve(`${progress} -> 음식 먹는 중`);
//         },3000);
//     });
// }

// order()
//     .then(progress => cook(progress))
//     .then(progress => serving(progress))
//     .then(progress => eat(progress))
//     .then(progress => console.log(progress));

/**
 * @Promise에서Catch사용하기
 */
// Promise.resolve(123) //new Promise하지 않고 바로 resolve를 사용하고 싶을 때
//     .then(res => {
//         throw new Error('에러 발생');
//         return 456;
//     })
//     .then(res => {
//         console.log(res); //절대 실행 되지 않음!!
//         return Promise.resolve(789);
//     })
//     .catch(error => {
//         console.log(error.message); //promise가 여러개여도 catch는 단일!
//     });


/**
 * @킹갓AsyncAwait
 */
let asyncFunc1 = (msg: string): Promise<string> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(`asyncFunc1 - ${msg}`);
        },1000);
    });
}

let asyncFunc2 = (msg: string): Promise<string> => {
    return new Promise(resolve => {
        setTimeout(()=> {
            resolve(`asyncFunc2 - ${msg}`);
        },1500);
    });
}

//1. Promise 방식, 함수명 - 인자 string Promise<string> 반환
// let promiseMain1 = ():void => {
//     asyncFunc1("server part")
//         .then((result:string) => {
//             console.log(result);
//             return asyncFunc2("유지원");
//         })
//         .then((result:string) => {
//             console.log(result);
//         });
// }

// promiseMain1();

//2. Async, Await 방식 , 동기처럼 이해할 수 있다.
const asyncMain = async () => {
    let result = await asyncFunc1("Server part");
    console.log(result);
    result = await asyncFunc2("유지원");
    console.log(result);
}
asyncMain();

