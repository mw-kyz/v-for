import { createApp } from './myvue';

// 引入两个组件
import TestA from './components/TestA';
import TestB from './components/TestB';

const app = createApp({
  components: [
    TestA,
    TestB
  ]
});

// 将id为app的dom挂载到app对象上
app.mount('#app');