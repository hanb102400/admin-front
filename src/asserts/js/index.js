// 可以从其他文件 import 进来
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。

const routes = [{
        path: '/foo',
        component: Foo
    },
    {
        path: '/table',
        component: httpVueLoader('/module/table.vue')
    },
    {
        path: '/form',
        component: httpVueLoader('/module/form.vue')
    }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
})


// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
    router
}).$mount('#app')


/** net **/
//设置baseurl
//axios.defaults.baseURL = 'http://127.0.0.1/';
//设置超时时间
axios.defaults.timeout = 10000;

var Net = {}

//封装get方法
Net.get = function(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, params).then(resp => {
            resolve(resp.data);
        }).catch(err => {
            reject(err.data);
        })
    });
}

// 封装post方法
Net.post = function(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params).then(resp => {
            resolve(resp.data);
        }).catch(err => {
            reject(err.data);
        })
    });
}