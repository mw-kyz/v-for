import { createReactive } from "./reactive";
import { isObject } from "./utils";

const get = createGetter();
const set = createSetter();

// 创建get方法
function createGetter () {
  return function (target, key, receiver) {
    const res = Reflect.get(target, key, receiver);

    // 如果res还是对象，则需要递归，将res也变成响应式对象
    if (isObject(res)) {
      return createReactive(res);
    }

    return res;
  }
}

// 创建set方法
function createSetter () {
  return function (target, key, value, receiver) {
    const res = Reflect.set(target, key, value, receiver);

    return res;
  }
}

// 导出proxyHandler对象
export const proxyHandler = {
  get,
  set
}