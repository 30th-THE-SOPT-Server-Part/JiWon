// 성장 과제
//1. Member, Dinner interface 생성, 타입 지정
//2. organize 채우기
import { Dinner } from "./domain/Dinner";
import { Member } from "./domain/Member";

const dinner: Dinner = {
member: [
    {
    name: '채정아',
    group: 'ob',
    },
    {
    name: '유지원',
    group: 'ob',
    },
     {
    name: '구건모',
    group: 'ob',
    },
    {
    name: '추서연',
    group: 'yb',
    },
    {
    name: '김소현',
    group: 'yb',
    }
],
shuffle(array: Member[]): Member[] {
    array.sort(() => Math.random() - 0.5);

    return array;
},
organize(array: Member[]): void {
    this.shuffle(array);
    let ob, yb;
    let obFlag = false,
    ybFlag = false;
    for (let member of array) {
    if (!obFlag) {
        if (member.group === 'ob') {
        ob = member.name;
        obFlag = true;
        }
    }
    if (!ybFlag) {
        if (member.group === 'yb') {
        yb = member.name;
        ybFlag = true;
        }
    }
    if (obFlag && ybFlag) break;
    }

    console.log(`오늘의 저녁 식사 멤버는 ${ob}, ${yb}`);
},
};

dinner.organize(dinner.member);