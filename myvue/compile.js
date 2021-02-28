// 定义自定义标签的数组，用于判断一个标签是否是自定义标签
const customTags = ['if', 'for'];
// 匹配单大括号的正则
const reg_single_bracket = /\{(.*?)\}/g;
// 匹配双大括号的正则
const reg_double_bracket = /\{\{(.*?)\}\}/g;

// 编译组件模板，返回node节点
export function compileTemplate (template, data) {
  // 先用模板替换方法把双大括号里面的内容进行替换
  template = replaceVar(template, data, reg_double_bracket);

  // 创建一个div元素，只是用来装模板，后面会去掉
  const _node = document.createElement('div');
  
  _node.innerHTML = template;

  // 返回编译后的node节点
  return compileNode(_node, data);
}

// 编译node节点
function compileNode (node, data) {
  // 获取当前节点下的所有元素子节点
  const allNodes = node.querySelectorAll('*');

  allNodes.forEach(item => {
    // 获取当前元素节点的tagName
    const tagName = item.tagName.toLowerCase();
    // 如果这个标签是自定义标签
    if (customTags.includes(tagName)) {
      // 节点替换
      replaceNode(item, tagName, data);
    }
  });
  // 返回符合条件的第一个元素节点，这里的node是div，div的innerHTML是组件的template，template里面只会有一个元素节点，因为模板只有一个根节点，所以此处返回的就是template的根节点，此时div也已经没用了
  return [...node.childNodes].find(item => item.nodeType === 1);
}

// 节点替换
function replaceNode (node, tag, data) {
  // 获取当前元素节点上的data属性（for循环所用到的data）
  const dataKey = node.getAttribute('data');
  // 获取当前元素节点的className
  const className = node.className;
  // 获取用户循环列表需要用到的标签，如li
  const realTag = node.getAttribute('tag');
  
  switch (tag) {
    // 如果当前元素节点的标签类型为for
    case 'for':
      // 处理for标签
      vFor(node, data, dataKey, className, realTag);
      break;
    default:
      break;
  }
}

function vFor (node, data, dataKey, className, realTag) {
  const oFrag = document.createDocumentFragment();

  // 遍历列表循环所需要用到的数据
  data[dataKey].forEach(item => {
    // 创建用户定义的列表子标签
    const el = document.createElement(realTag);
    // 添加className
    el.className = className ? className : '';
    // 将模板替换后的html字符串赋值给innerHTML
    el.innerHTML = replaceVar(node.innerHTML, item, reg_single_bracket);
    
    oFrag.appendChild(el);
  })
  // 找到for标签的父级，并把for标签替换为新生成的node节点
  node.parentNode.replaceChild(oFrag, node);
}

// 模板替换
function replaceVar (html, data, reg) {
  return html.replace(reg, (node, key) => {
    const obj = {};
    key = key.trim();
    return obj[key] = data[key];
  });
}