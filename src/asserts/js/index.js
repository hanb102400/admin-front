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
        component: () => {
            //var template = gmallComponent('/module/foo/foo.html');
            return getVueJs('/module/foo/foo.js');
        }
    },
    { path: '/bar', component: Bar }
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

function getVueTemplate(url) {
    axios.get(url)
        .then(function(resp) {

            console.log(resp.data);
        })
        .catch(function(error) {
            console.log(error);
        });
}

function getVueJs(url) {

    axios.get(url)
        .then(function(resp) {
            console.log("resp.data", resp.data)
            var f = new Function("return" + " " + resp.data)();
            console.log("f", f)
            console.log(resp.data);
            return f;
        })
        .catch(function(error) {
            console.log(error);
        });



}

function gmallComponent(url, vuecom) {
    if (!vuecom) vuecom = {};
    axios.get(url).then(function(r) {
        var rl = r;
        var style = '';
        var styleIndexEnd = rl.lastIndexOf('</style>');
        var styleIndex = rl.lastIndexOf('<style', styleIndexEnd);
        if (styleIndexEnd !== -1 && styleIndex !== -1) {
            style = r.substring(styleIndex, styleIndexEnd);
            style = style.substr(style.indexOf('>') + 1);
            style = '<component scoped :is="\'style\'">' + style + '</component>';
        }

        var scriptIndexEnd = rl.lastIndexOf('<\/script>');
        var scriptIndex = rl.lastIndexOf('<script', scriptIndexEnd);
        if (scriptIndexEnd !== -1 && scriptIndex !== -1) {
            var script = r.substring(scriptIndex, scriptIndexEnd);
            script = script.substr(script.indexOf('>') + 1);
            script = '(' + script.replace(/export\s*=\s*\{/i, '{') + ')';
            var obj = eval(script);
            for (var a in obj) vuecom[a] = obj[a];
        }
        var template = r.substring(0, Math.min(styleIndex, scriptIndex));
        if (style) {
            var index = template.lastIndexOf('</');
            if (index !== -1) template = template.substr(0, index) + style + template.substr(index);
        }
        vuecom.template = template;
        debugger
        resolve(vuecom);
    });

}