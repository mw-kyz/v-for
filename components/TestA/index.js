// 组件TestA

import { createReactive } from '../../myvue';

// 模板
const template = `
  <ul class="list">
    <h1>{{ title }}</h1>
    {{ dateTime }}
    <for data="list" tag="li" class="item">
      <span>姓名: { name }</span>
      <span>年龄: { age }</span>
    </for>
  </ul>
`
// 组件抛出的方法
function TestA () {
  // 创建并返回数据的代理对象（响应式对象）
  const state = createReactive({
    title: '学生信息列表',
    dateTime: '2021-02-28 18.00',
    list: [
      {
        id: 1,
        name: '小红',
        age: '18'
      },
      {
        id: 2,
        name: '小明',
        age: '19'
      },
      {
        id: 1,
        name: '小刚',
        age: '20'
      }
    ]
  });

  // 返回模板和数据的代理对象（响应式对象）
  return [template, state];
}

export default TestA;