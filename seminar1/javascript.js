/*
var name = '유지원';
var name = '채정아';

let name2 = '유지원';
//let name2 = '채정아'; //재선언 불가
*/

/*
if(true){
    var x = 'abc';
}
console.log(x);

if(true){
    const y = 'abc'; 
}
console.log(y); //const는 block 스코프여서 밖에서 사용할 수 없다.
*/

/*
function foo(){
    if(true){
        var n = '유지원';
        console.log('if-block-',n);
    }
    console.log('function-block-',n);
}
console.log('global-',n); //var 변수는 function 스코프여서 글로벌로 사용 불가능하다.
*/

//========
const name = '유지원';
console.log(typeof name);
const age = 20;
console.log(`안녕하세요 제 이름은 ${name}입니다. 제 나이는 ${age} 살 입니다.`);

//========
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