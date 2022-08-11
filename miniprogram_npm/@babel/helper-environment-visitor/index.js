module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1660207800324, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.requeueComputedKeyAndDecorators = requeueComputedKeyAndDecorators;
exports.skipAllButComputedKey = skipAllButComputedKey;

function skipAllButComputedKey(path) {
  path.skip();

  if (path.node.computed) {
    path.context.maybeQueue(path.get("key"));
  }
}

function requeueComputedKeyAndDecorators(path) {
  const {
    context,
    node
  } = path;

  if (node.computed) {
    context.maybeQueue(path.get("key"));
  }

  if (node.decorators) {
    for (const decorator of path.get("decorators")) {
      context.maybeQueue(decorator);
    }
  }
}

const visitor = {
  FunctionParent(path) {
    if (path.isArrowFunctionExpression()) {
      return;
    } else {
      path.skip();

      if (path.isMethod()) {
        requeueComputedKeyAndDecorators(path);
      }
    }
  },

  Property(path) {
    if (path.isObjectProperty()) {
      return;
    }

    path.skip();
    requeueComputedKeyAndDecorators(path);
  }

};
var _default = visitor;
exports.default = _default;
}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1660207800324);
})()
//miniprogram-npm-outsideDeps=[]
//# sourceMappingURL=index.js.map