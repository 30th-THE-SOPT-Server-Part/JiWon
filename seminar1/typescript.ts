let name: string = "유지원";
console.log(name);

const f1 = (obj: object): void => {
    console.log(obj);
}

const f2 = (obj: Object): void => {
    console.log(obj);
}

f1([1,2,3,4]);
//f1('hihi'); //원시타입은 받을 수 없음

f2([1,2,3,4]);
f2('hihi');

interface Sopt{
	name: string;
	age: number;
	organization: string;
	completion: number[]; //or Array<numbeer>
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