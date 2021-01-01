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


Net.loadScript = function(src, callback) {
    var script = document.createElement('script'),
        head = document.getElementsByTagName('head')[0];
    script.type = 'text/javascript';
    script.async = false;
    script.src = src;
    if (script.addEventListener) {
        script.addEventListener('load', function() {
            callback && callback();
        }, false);
    } else if (script.attachEvent) {
        script.attachEvent('onreadystatechange', function() {
            var target = window.event.srcElement;
            if (target.readyState == 'loaded') {
                callback && callback();
            }
        });
    }
    head.appendChild(script);
}




/*Vue.import = function(path, func) {
    if (func == undefined || func == null) {
        return httpVueLoader(path);
    } else {
        console.log("httpVueLoader(path)()", httpVueLoader(path)())
        return httpVueLoader(path)().then(data => func(data));
    }

}*/

Vue.import = function(paths, func) {
    console.log("paths", typeof paths);
    if (typeof paths === 'string') {
        if (!func) {
            return httpVueLoader(paths);
        } else {
            httpVueLoader(paths)().then(data => func(data));
        }
    } else if (Array.isArray(paths)) {

        console.log("Array", paths);

        const promises = paths.map(item => httpVueLoader(item)());
        if (!func) {
            Promise.all(promises).then((data) => {
                console.log("datadatadata", data)
                return data
            });
        } else {
            Promise.all(promises).then((data) => {
                console.log("datadatadata", ...data)
                func(...data)
            });
        }
    }
}