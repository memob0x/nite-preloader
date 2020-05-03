'use strict';

function _interopNamespace(e) {
    if (e && e.__esModule) { return e; } else {
        var n = {};
        if (e) {
            Object.keys(e).forEach(function (k) {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () {
                        return e[k];
                    }
                });
            });
        }
        n['default'] = e;
        return n;
    }
}

var loader_javascript = async (blob) => {
    //
    const url = URL.createObjectURL(blob);

    //
    const result = await new Promise(function (resolve) { resolve(_interopNamespace(require(url))); });

    //
    URL.revokeObjectURL(url);

    //
    return result;
};

module.exports = loader_javascript;
//# sourceMappingURL=loader.javascript.cjs.js.map
