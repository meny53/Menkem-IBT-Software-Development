const bill = '500';
const billNum = Number(bill);

let tip;

if (billNum >= 300) {
    tip = billNum * 0.1;
} else {
    tip = billNum * 0.05;
}

const total = billNum + tip;

let fee = 0;
const method = 'cbe birr';

switch (method) {
    case 'telebirr':
        fee = total * 0.05;
        break;

    case 'cbe birr':
        fee = total * 0.01;
        break;

    default:
        fee = total * 0.02;
}

const totalwithfee = total + fee;

const name = ['jhon', 'jane', 'jack', 'jill', 'jerry'];

for (let i = 0; i < name.length; i++) {
    const amount = totalwithfee / name.length;
    console.log(`Name: ${name[i]}, Payment: ${amount}`);
}

console.log(`fee: ${fee}`);
console.log(`total with fee: ${totalwithfee}`);