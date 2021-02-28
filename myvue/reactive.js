import { isObject } from './utils';
import { proxyHandler } from './handle';

// 返回data的数据代理对象（响应式对象）
export function createReactive (data) {
  // 创建data的数据代理对象（响应式对象）
  return createReactiveData(data, proxyHandler)
}

// 创建data的数据代理对象（响应式对象）
function createReactiveData (data, proxyHandler) {
  // 如果不是对象，直接return
  if (!isObject(data)) {
    return data;
  }
  // 对data对象进行数据代理，并返回代理对象
  return new Proxy(data, proxyHandler);
}