(function (self) {
    var __runtimeConfig = {"base":"/Users/bytedance/Workspace/internal/module/bundler","name":"index","entry":"./index.js","output":"[name].bundle.js","public":"/"};
    var cache = {};
    var moduleList = [
        function (require, module, exports) {
module.exports = 'hello world';
},function (require, module, exports) {
const moduleB = require('./moduleB');
console.log(moduleB);
module.exports = new Date();
},function (require, module, exports) {
const moduleA = require('./moduleA');
console.log(moduleA);
console.log('123123');
}
    ];
    var moduleDepMapList = [
        {},{"./moduleB":0},{"./moduleA":1}
    ];

    var require = function require(id, parentModuleId) {
        console.log(parentModuleId);
        console.log(parentModuleId !== undefined ? moduleDepMapList[parentModuleId][id] : id);
        var currentModuleId = parentModuleId !== undefined ? moduleDepMapList[parentModuleId][id] : id;
        if (cache.hasOwnProperty(currentModuleId)) return cache[currentModuleId];
        var module = {exports: {}};
        var func = moduleList[currentModuleId];

        func(
            (function(parentModuleId) {
                var closureRequire = function closureRequire(id) {
                    return require(id, parentModuleId);
                }
                closureRequire.ensure = function closureRequire(id) {
                    return require.ensure(id, parentModuleId);
                }
                return closureRequire;
            })(id),
            module,
            module.exports
        );
        cache[currentModuleId] = module.exports;
        return cache[currentModuleId];
    };

    if (false) {
        self["__dynamicRequire"] = function __dynamicRequire(chunkId, func) {
            var chunkCache = cache[chunkId];
            var resolve = chunkCache[0];
            var module = {exports: {}};
            func(require, module, module.exports);
            cache[chunkId] = module.exports;
            resolve(cache[chunkId]);
        };

        require.ensure = function requireEnsure(chunkId, parentModuleId) {
            var chunkStatusSymbol = '__isPending';
            var currentModuleId = moduleDepMapList[parentModuleId][chunkId];
            var chunkPromise = cache[currentModuleId];

            if (chunkPromise === void 0) {
                var $script = document.createElement("script");
                $script.src = __runtimeConfig.public + currentModuleId + ".js";
                document.body.appendChild($script);
                var promise = new Promise(function(resolve) {
                    var chunkCache = [resolve];
                    chunkCache[chunkStatusSymbol] = true;
                    cache[currentModuleId] = chunkCache;
                });
                cache[currentModuleId].push(promise);
                return promise;
            }

            if (chunkPromise[chunkStatusSymbol]) {
                return chunkPromise[1];
            }

            return chunkPromise;
        };
    }

    require(moduleList.length - 1);

})(this);
