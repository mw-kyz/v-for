// 组件TestB

import { createReactive } from '../../myvue';

// 模板
const template = `
  <ul class="list">
    <h1>{{ title }}</h1>
    {{ dateTime }}
    <for data="list" tag="li" class="item">
      <span>Name: { name }</span>
      <span>Age: { age }</span>
    </for>
  </ul>
`

// 组件抛出的方法
function TestB () {
  // 创建并返回数据的代理对象（响应式对象）
  const state = createReactive({
    title: '老师信息列表',
    dateTime: '2021-02-28 18.06',
    list: [
      {
        id: 1,
        name: '张三',
        age: '35'
      },
      {
        id: 2,
        name: '李四',
        age: '36'
      },
      {
        id: 1,
        name: '王五',
        age: '28'
      }
    ]
  });
  // 返回模板和数据的代理对象（响应式对象）
  return [template, state];
}

export default TestB;