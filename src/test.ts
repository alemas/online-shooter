import { Observable } from "rxjs";

let observer = new Observable((observer) => {
    let i = 0;
    while (i < 5) {
        observer.next(i);
        i++;
    }
});

 let s1 = observer.subscribe((value) => {
    console.log(value);
});

let s2 = observer.subscribe((value) => {
    console.log(value);
});

let x = {name: "x", lastName: "y"};
let dict: {[id: number]: any} = {};
dict[0] = x;
console.log(dict[0]);
delete dict[0];
console.log(dict[0]);
console.log(x);

