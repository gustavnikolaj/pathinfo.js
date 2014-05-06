(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else {
        root.PathInfo = factory();
    }
}(this, function () {

    var helper = {};

    helper.parseStack = function (stack) {
        var matches;
        return stack.map(function (item) {
            matches = item.match(/^(.*)@(.*):([0-9]+):([0-9]+)$/);
            return {
                name: matches[1],
                url: matches[2],
            };
        });
    };

    helper.pick = function (obj, keys) {
        var copy = {};
        if (obj) {
            if (!Array.isArray(keys)) {
                var args = Array.prototype.slice.call(arguments, 1);
                keys = [].concat(args);
            }
            keys.forEach(function (key) {
                if (key in obj) copy[key] = obj[key];
            });
        }
        return copy;
    };

    helper.contextInfo = function () {
        return helper.pick(window.location, [
            'host',
            'hostname',
            'href',
            'pathname',
            'port',
            'protocol'
        ]);
    };


    helper.printStack = window.printStackTrace;

    helper.resolveFileName = function (url) {
        return url.split('/').pop();
    };

    helper.resolvePath = function (url) {
        var context = helper.contextInfo();
        var fileName = url.replace(/^(http|https|file):\/\//, '');
        if (fileName.substr(0, context.host.length) === context.host) {
            fileName = fileName.substr(context.host.length);
        }

        return fileName;
    };

    function PathInfo(horribleHack) {
        var needle = horribleHack || 'PathInfo';
        var context = helper.contextInfo();
        var error = new Error();
        var stack = helper.printStack({ e: error });
        stack = helper.parseStack(stack);

        var indexOfPathInfo = -1;
        stack.some(function (item, index) {
            if (item.name === needle) {
                indexOfPathInfo = index;
                return true;
            }
        });

        if (indexOfPathInfo === -1) {
            throw new Error('PathInfo: Could not resolve path name...');
        }
        var caller = stack[indexOfPathInfo + 1];

        var fileName = helper.resolveFileName(caller.url);
        var path = helper.resolvePath(caller.url);
        var dirName = path.substr(0, path.length - fileName.length).replace(/\/$/, '');

        return {
            absolutePath: caller.url,
            dirName: dirName,
            fileName: fileName,
            path: path,
            '_internals': helper
        };
    }


    return PathInfo;

}));
