/**
 * @Type 
 */
let name: string = "유지원";
console.log(name);
const variable:string[] = ['1','2'];
let variable2: Array<string> = ['1','2'];

/**
 * @ObjectVSobject
 */
const f1 = (obj: object): void => {
    console.log(obj);
}

const f2 = (obj: Object): void => {
    console.log(obj);
}

f1([1,2,3,4]);
//f1('hihi'); //object: 원시타입은 받을 수 없음

f2([1,2,3,4]);
f2('hihi'); //Object : 원시타입 받을 수 있음

/**
 * @null,undefined
 */
 let a: null = null; //O
 let x1: null = 2; //X
 
 let b: undefined = undefined; //O
 let y1: undefined = 2; //X

/**
 * @타입단언
 */
 let name3: any = '홍길동';
 let name3Length: number = name3.length; //name3의 length를 가져올 수 있는지 모르기 때문에 쓸 수 있다는 것을 알려주는 느낌
 
 //angle-bracket 타입 선언
 let name3Length2: number = (<string>name3).length;
 //as
 let name3Length3: number = (name3 as string).length;

/**
 * @interface
 */
interface Sopt{
	name: string;
	age: number;
	organization?: string; //선택적 프로퍼티
	completion: number[]; //or Array<number>
}

const sopt: Sopt[] = [
    {
	name: '홍길동',
	age: 20,
	organization: 'server',
    completion: [1,2]
    },
    {
        name: '홍길동',
        age: 20,
        organization: 'server',
        completion: [1,2]
    }
]