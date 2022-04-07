/**
 * @변수 var, let, const
 */
var name = '유지원';
var name = '채정아';

let name2 = '유지원';
//let name2 = '채정아'; //재선언 불가

/**
 * @Scope function scope(var), block scope(const)
 */
if(true){
    var x = 'abc';
}
console.log(x);

if(true){
    const y = 'abc'; 
}
//console.log(y); //const는 block 스코프여서 밖에서 사용할 수 없다.

function foo(){
    if(true){
        var n = '유지원';
        console.log('if-block-',n);
    }
    console.log('function-block-',n);
}
//console.log('global-',n); //var 변수는 function 스코프여서 글로벌로 사용 불가능하다.

/**
 * @Basic
 */
const name = '유지원';
console.log(typeof name); //typeof

const age = 20;
console.log(`안녕하세요 제 이름은 ${name}입니다. 제 나이는 ${age} 살 입니다.`); //`` 사용(string concat)

/**
 * @Array,Object
 */
 let arr = [1, 'item', true]; //여러 타입 들어갈 수 있음
 let arr2 = Array(4,null,{item:'item'});

 //Array.map()
let num = [1,2,3,4];
const newNumArr = arr.map(x => {
	x * 2
});
//>> [2,4,6,8]

/**
 * @Function
 */
//함수 선언식
 function sum(a,b){
	return a+b;
}
//함수 표현식
let sum = (a,b) => {
	return a+b;
}
sum(); //으로 호출
//함수 파라미터 사용
const func = (num) => {
	return num * num;
}

const multiple = (func, num) => {
	console.log(func(num));
}

multiple(func, 3);
//>> 9

const sopt = {
    season: 30,
    group: ['YB','OB'],
    introduce: function(){
        this.group.map(group => {
            console.log(`솝트 내 파트는 ${group} 파트가 있어요!`);
        });
    }
}
sopt.introduce();