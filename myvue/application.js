import { compileTemplate } from './compile';

// 声明一个node池子
const domNodePool = [];

// 创建app实例
export function createApp (options) {
  // 遍历用户传的参数对象
  for (let option in options) {
    switch (option) {
      case 'components':
        // 初始化组件
        initComponents(options[option]);
        break;
      default: 
        break;
    }
  }

  return {
    mount
  }
}

// 初始化组件
function initComponents (components) {
  for (let component of components) {
    let [template, state ] = component();
    // 编译组件模板，返回node节点
    const node = compileTemplate(template, state);
    domNodePool.push(node);
  }
}

// 获取根节点，用于挂载视图
function mount (el) {
  const app = document.querySelector(el);
  const oFrag = document.createDocumentFragment();
  domNodePool.forEach(item => {
    oFrag.appendChild(item);
  });

  app.appendChild(oFrag);
}