import { a } from './a'
import { b } from './b'
import user from './index.json'

console.log('c', c);
console.log('c', c);
console.log('c', c);
console.log('c', c);
console.log('c', c);

export function name() {
  console.log('a ==> ', a);
  import('./a').then((res) => console.log('res', res))
}

export function c() {
  import('./c.js').then((res) => console.log(res));
}
