function loadScript(src, callback) {
    var script = document.createElement('script'),
        head = document.getElementsByTagName('head')[0];
    script.type = 'text/javascript';
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

//loadScript('/mock/mockjs/mock.js', function() {
//    loadScript('/mock/user.js');
//})