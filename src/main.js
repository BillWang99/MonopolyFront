
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//引入bootstrap相關資源
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import * as bootstrap from 'bootstrap';

//將bootstrap設定為全域
window.bootstrap = bootstrap;



const app = createApp(App)


app.use(router)

app.mount('#app')
