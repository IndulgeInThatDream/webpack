//webpack4 会默认是删除未引用js [地址](https://webpack.docschina.org/guides/tree-shaking/)
export const add = (a, b) => {
  return a + b;
};
console.log(7878);
import {addAge} from './minchunks'
addAge(1,22)