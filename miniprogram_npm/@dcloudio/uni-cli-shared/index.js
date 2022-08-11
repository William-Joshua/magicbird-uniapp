module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1660207800498, function(require, module, exports) {

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUpdate = exports.M = void 0;
__exportStar(require("./fs"), exports);
__exportStar(require("./mp"), exports);
__exportStar(require("./url"), exports);
__exportStar(require("./env"), exports);
__exportStar(require("./hbx"), exports);
__exportStar(require("./ssr"), exports);
__exportStar(require("./vue"), exports);
__exportStar(require("./logs"), exports);
__exportStar(require("./i18n"), exports);
__exportStar(require("./deps"), exports);
__exportStar(require("./json"), exports);
__exportStar(require("./vite"), exports);
__exportStar(require("./utils"), exports);
__exportStar(require("./easycom"), exports);
__exportStar(require("./constants"), exports);
__exportStar(require("./preprocess"), exports);
__exportStar(require("./postcss"), exports);
__exportStar(require("./filter"), exports);
__exportStar(require("./esbuild"), exports);
__exportStar(require("./resolve"), exports);
__exportStar(require("./scripts"), exports);
__exportStar(require("./platform"), exports);
var messages_1 = require("./messages");
Object.defineProperty(exports, "M", { enumerable: true, get: function () { return messages_1.M; } });
__exportStar(require("./exports"), exports);
var checkUpdate_1 = require("./checkUpdate");
Object.defineProperty(exports, "checkUpdate", { enumerable: true, get: function () { return checkUpdate_1.checkUpdate; } });

}, function(modId) {var map = {"./fs":1660207800499,"./mp":1660207800500,"./url":1660207800538,"./env":1660207800539,"./hbx":1660207800571,"./ssr":1660207800576,"./vue":1660207800577,"./logs":1660207800588,"./i18n":1660207800552,"./deps":1660207800590,"./json":1660207800541,"./vite":1660207800591,"./utils":1660207800502,"./easycom":1660207800601,"./constants":1660207800503,"./preprocess":1660207800515,"./postcss":1660207800602,"./filter":1660207800605,"./esbuild":1660207800606,"./resolve":1660207800531,"./scripts":1660207800607,"./platform":1660207800608,"./messages":1660207800518,"./exports":1660207800609,"./checkUpdate":1660207800610}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800499, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.emptyDir = void 0;
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
const fs_1 = require("fs");
function emptyDir(dir, skip = []) {
    for (const file of (0, fs_extra_1.readdirSync)(dir)) {
        if (skip.includes(file)) {
            continue;
        }
        const abs = (0, path_1.resolve)(dir, file);
        // baseline is Node 12 so can't use rmSync :(
        if ((0, fs_extra_1.lstatSync)(abs).isDirectory()) {
            (0, fs_extra_1.emptyDirSync)(abs);
            (0, fs_1.rmdirSync)(abs);
        }
        else {
            (0, fs_extra_1.unlinkSync)(abs);
        }
    }
}
exports.emptyDir = emptyDir;

}, function(modId) { var map = {"fs":1660207800499}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800500, function(require, module, exports) {

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMiniProgramComponentExternalClasses = exports.findMiniProgramComponentExternalClasses = exports.parseExternalClasses = exports.hasExternalClasses = exports.updateMiniProgramComponentsByTemplateFilename = exports.updateMiniProgramComponentsByScriptFilename = exports.updateMiniProgramComponentsByMainFilename = exports.updateMiniProgramGlobalComponents = exports.transformDynamicImports = exports.parseTemplateDescriptor = exports.parseScriptDescriptor = exports.parseMainDescriptor = exports.copyMiniProgramPluginJson = exports.HTML_TO_MINI_PROGRAM_TAGS = void 0;
__exportStar(require("./ast"), exports);
__exportStar(require("./wxs"), exports);
__exportStar(require("./nvue"), exports);
__exportStar(require("./event"), exports);
__exportStar(require("./style"), exports);
__exportStar(require("./assets"), exports);
__exportStar(require("./template"), exports);
__exportStar(require("./constants"), exports);
var tags_1 = require("./tags");
Object.defineProperty(exports, "HTML_TO_MINI_PROGRAM_TAGS", { enumerable: true, get: function () { return tags_1.HTML_TO_MINI_PROGRAM_TAGS; } });
var plugin_1 = require("./plugin");
Object.defineProperty(exports, "copyMiniProgramPluginJson", { enumerable: true, get: function () { return plugin_1.copyMiniProgramPluginJson; } });
var usingComponents_1 = require("./usingComponents");
Object.defineProperty(exports, "parseMainDescriptor", { enumerable: true, get: function () { return usingComponents_1.parseMainDescriptor; } });
Object.defineProperty(exports, "parseScriptDescriptor", { enumerable: true, get: function () { return usingComponents_1.parseScriptDescriptor; } });
Object.defineProperty(exports, "parseTemplateDescriptor", { enumerable: true, get: function () { return usingComponents_1.parseTemplateDescriptor; } });
Object.defineProperty(exports, "transformDynamicImports", { enumerable: true, get: function () { return usingComponents_1.transformDynamicImports; } });
Object.defineProperty(exports, "updateMiniProgramGlobalComponents", { enumerable: true, get: function () { return usingComponents_1.updateMiniProgramGlobalComponents; } });
Object.defineProperty(exports, "updateMiniProgramComponentsByMainFilename", { enumerable: true, get: function () { return usingComponents_1.updateMiniProgramComponentsByMainFilename; } });
Object.defineProperty(exports, "updateMiniProgramComponentsByScriptFilename", { enumerable: true, get: function () { return usingComponents_1.updateMiniProgramComponentsByScriptFilename; } });
Object.defineProperty(exports, "updateMiniProgramComponentsByTemplateFilename", { enumerable: true, get: function () { return usingComponents_1.updateMiniProgramComponentsByTemplateFilename; } });
var externalClasses_1 = require("./externalClasses");
Object.defineProperty(exports, "hasExternalClasses", { enumerable: true, get: function () { return externalClasses_1.hasExternalClasses; } });
Object.defineProperty(exports, "parseExternalClasses", { enumerable: true, get: function () { return externalClasses_1.parseExternalClasses; } });
Object.defineProperty(exports, "findMiniProgramComponentExternalClasses", { enumerable: true, get: function () { return externalClasses_1.findMiniProgramComponentExternalClasses; } });
Object.defineProperty(exports, "updateMiniProgramComponentExternalClasses", { enumerable: true, get: function () { return externalClasses_1.updateMiniProgramComponentExternalClasses; } });

}, function(modId) { var map = {"./ast":1660207800501,"./wxs":1660207800504,"./nvue":1660207800505,"./event":1660207800507,"./style":1660207800508,"./assets":1660207800509,"./template":1660207800510,"./constants":1660207800511,"./tags":1660207800512,"./plugin":1660207800513,"./usingComponents":1660207800517,"./externalClasses":1660207800537}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800501, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.parseProgram = void 0;
const parser_1 = require("@babel/parser");
const utils_1 = require("../utils");
function parseProgram(code, importer, { babelParserPlugins }) {
    return (0, parser_1.parse)(code, {
        plugins: (0, utils_1.normalizeParsePlugins)(importer, babelParserPlugins),
        sourceType: 'module',
    }).program;
}
exports.parseProgram = parseProgram;

}, function(modId) { var map = {"../utils":1660207800502}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800502, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeParsePlugins = exports.normalizeMiniProgramFilename = exports.normalizeNodeModules = exports.removeExt = exports.normalizePagePath = exports.normalizeIdentifier = exports.checkElementNodeTag = exports.normalizePath = exports.isWindows = exports.isRunningWithYarnPnp = exports.hash = void 0;
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const shared_1 = require("@vue/shared");
var hash_sum_1 = require("hash-sum");
Object.defineProperty(exports, "hash", { enumerable: true, get: function () { return __importDefault(hash_sum_1).default; } });
const constants_1 = require("./constants");
try {
    exports.isRunningWithYarnPnp = Boolean(require('pnpapi'));
}
catch (_a) { }
exports.isWindows = os_1.default.platform() === 'win32';
function normalizePath(id) {
    return exports.isWindows ? id.replace(/\\/g, '/') : id;
}
exports.normalizePath = normalizePath;
function checkElementNodeTag(node, tag) {
    return !!node && node.type === 1 /* ELEMENT */ && node.tag === tag;
}
exports.checkElementNodeTag = checkElementNodeTag;
function normalizeIdentifier(str) {
    return (0, shared_1.capitalize)((0, shared_1.camelize)(str.replace(/\//g, '-')));
}
exports.normalizeIdentifier = normalizeIdentifier;
function normalizePagePath(pagePath, platform) {
    const absoltePagePath = path_1.default.resolve(process.env.UNI_INPUT_DIR, pagePath);
    let extnames = constants_1.PAGE_EXTNAME;
    if (platform === 'app') {
        extnames = constants_1.PAGE_EXTNAME_APP;
    }
    for (let i = 0; i < extnames.length; i++) {
        const extname = extnames[i];
        if (fs_1.default.existsSync(absoltePagePath + extname)) {
            return pagePath + extname;
        }
    }
    console.error(`${pagePath} not found`);
}
exports.normalizePagePath = normalizePagePath;
function removeExt(str) {
    return str.split('?')[0].replace(/\.\w+$/g, '');
}
exports.removeExt = removeExt;
const NODE_MODULES_REGEX = /(\.\.\/)?node_modules/g;
function normalizeNodeModules(str) {
    str = normalizePath(str).replace(NODE_MODULES_REGEX, 'node-modules');
    // HBuilderX 内置模块路径转换
    str = str.replace(/.*\/plugins\/uniapp-cli-vite\/node[-_]modules/, 'node-modules');
    if (process.env.UNI_PLATFORM === 'mp-alipay') {
        str = str.replace('node-modules/@', 'node-modules/npm-scope-');
    }
    return str;
}
exports.normalizeNodeModules = normalizeNodeModules;
function normalizeMiniProgramFilename(filename, inputDir) {
    if (!inputDir || !path_1.default.isAbsolute(filename)) {
        return normalizeNodeModules(filename);
    }
    return normalizeNodeModules(path_1.default.relative(inputDir, filename));
}
exports.normalizeMiniProgramFilename = normalizeMiniProgramFilename;
function normalizeParsePlugins(importer, babelParserPlugins) {
    const isTS = constants_1.EXTNAME_TS_RE.test(importer.split('?')[0]);
    const plugins = [];
    if (isTS) {
        plugins.push('jsx');
    }
    if (babelParserPlugins)
        plugins.push(...babelParserPlugins);
    if (isTS)
        plugins.push('typescript', 'decorators-legacy');
    return plugins;
}
exports.normalizeParsePlugins = normalizeParsePlugins;

}, function(modId) { var map = {"fs":1660207800499,"./constants":1660207800503}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800503, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_ASSETS_RE = exports.KNOWN_ASSET_TYPES = exports.COMMON_EXCLUDE = exports.BASE_COMPONENTS_STYLE_PATH = exports.H5_COMPONENTS_STYLE_PATH = exports.H5_FRAMEWORK_STYLE_PATH = exports.H5_API_STYLE_PATH = exports.PAGE_EXTNAME = exports.PAGE_EXTNAME_APP = exports.BINDING_COMPONENTS = exports.APP_CONFIG_SERVICE = exports.APP_CONFIG = exports.APP_SERVICE_FILENAME = exports.ASSETS_INLINE_LIMIT = exports.JSON_JS_MAP = exports.MANIFEST_JSON_JS = exports.PAGES_JSON_JS = exports.extensions = exports.EXTNAME_TS_RE = exports.EXTNAME_JS_RE = exports.EXTNAME_VUE_RE = exports.EXTNAME_VUE_TEMPLATE = exports.EXTNAME_VUE = exports.EXTNAME_TS = exports.EXTNAME_JS = exports.PUBLIC_DIR = void 0;
exports.PUBLIC_DIR = 'static';
exports.EXTNAME_JS = ['.js', '.ts', '.jsx', '.tsx'];
exports.EXTNAME_TS = ['.ts', '.tsx'];
exports.EXTNAME_VUE = ['.vue', '.nvue'];
exports.EXTNAME_VUE_TEMPLATE = ['.vue', '.nvue', '.jsx', '.tsx'];
exports.EXTNAME_VUE_RE = /\.(vue|nvue)$/;
exports.EXTNAME_JS_RE = /\.(js|jsx|ts|tsx|mjs)$/;
exports.EXTNAME_TS_RE = /\.tsx?$/;
exports.extensions = [
    '.mjs',
    '.js',
    '.ts',
    '.jsx',
    '.tsx',
    '.json',
].concat(exports.EXTNAME_VUE);
exports.PAGES_JSON_JS = 'pages-json-js';
exports.MANIFEST_JSON_JS = 'manifest-json-js';
exports.JSON_JS_MAP = {
    'pages.json': exports.PAGES_JSON_JS,
    'manifest.json': exports.MANIFEST_JSON_JS,
};
exports.ASSETS_INLINE_LIMIT = 40 * 1024;
exports.APP_SERVICE_FILENAME = 'app-service.js';
exports.APP_CONFIG = 'app-config.js';
exports.APP_CONFIG_SERVICE = 'app-config-service.js';
exports.BINDING_COMPONENTS = '__BINDING_COMPONENTS__';
// APP 平台解析页面后缀的优先级
exports.PAGE_EXTNAME_APP = ['.nvue', '.vue', '.tsx', '.jsx', '.js'];
// 其他平台解析页面后缀的优先级
exports.PAGE_EXTNAME = ['.vue', '.nvue', '.tsx', '.jsx', '.js'];
exports.H5_API_STYLE_PATH = '@dcloudio/uni-h5/style/api/';
exports.H5_FRAMEWORK_STYLE_PATH = '@dcloudio/uni-h5/style/framework/';
exports.H5_COMPONENTS_STYLE_PATH = '@dcloudio/uni-h5/style/';
exports.BASE_COMPONENTS_STYLE_PATH = '@dcloudio/uni-components/style/';
exports.COMMON_EXCLUDE = [
    /\/pages\.json\.js$/,
    /\/manifest\.json\.js$/,
    /\/vite\//,
    /\/@vue\//,
    /\/vue-router\//,
    /\/vuex\//,
    /\/vue-i18n\//,
    /\/@dcloudio\/uni-h5-vue/,
    /\/@dcloudio\/uni-shared/,
    /\/@dcloudio\/uni-h5\/style/,
    /\/@dcloudio\/uni-components\/style/,
];
exports.KNOWN_ASSET_TYPES = [
    // images
    'png',
    'jpe?g',
    'gif',
    'svg',
    'ico',
    'webp',
    'avif',
    // media
    'mp4',
    'webm',
    'ogg',
    'mp3',
    'wav',
    'flac',
    'aac',
    // fonts
    'woff2?',
    'eot',
    'ttf',
    'otf',
    // other
    'pdf',
    'txt',
];
exports.DEFAULT_ASSETS_RE = new RegExp(`\\.(` + exports.KNOWN_ASSET_TYPES.join('|') + `)(\\?.*)?$`);

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800504, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.genWxsCallMethodsCode = exports.parseWxsCallMethods = void 0;
const types_1 = require("@babel/types");
const estree_walker_1 = require("estree-walker");
const ast_1 = require("./ast");
function parseWxsCallMethods(code) {
    if (!code.includes('callMethod')) {
        return [];
    }
    const ast = (0, ast_1.parseProgram)(code, '', {});
    const wxsCallMethods = new Set();
    estree_walker_1.walk(ast, {
        enter(child) {
            if (!(0, types_1.isCallExpression)(child)) {
                return;
            }
            const { callee } = child;
            // .callMethod
            if (!(0, types_1.isMemberExpression)(callee) ||
                !(0, types_1.isIdentifier)(callee.property) ||
                callee.property.name !== 'callMethod') {
                return;
            }
            // .callMethod('test',...)
            const args = child.arguments;
            if (!args.length) {
                return;
            }
            const [name] = args;
            if (!(0, types_1.isStringLiteral)(name)) {
                return;
            }
            wxsCallMethods.add(name.value);
        },
    });
    return [...wxsCallMethods];
}
exports.parseWxsCallMethods = parseWxsCallMethods;
function genWxsCallMethodsCode(code) {
    const wxsCallMethods = parseWxsCallMethods(code);
    if (!wxsCallMethods.length) {
        return `export default {}`;
    }
    return `export default (Component) => {
  if(!Component.wxsCallMethods){
    Component.wxsCallMethods = []
  }
  Component.wxsCallMethods.push(${wxsCallMethods
        .map((m) => `'${m}'`)
        .join(', ')})
}
`;
}
exports.genWxsCallMethodsCode = genWxsCallMethodsCode;

}, function(modId) { var map = {"./ast":1660207800501}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800505, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genNVueCssCode = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const nvue_1 = require("../json/app/manifest/nvue");
function genNVueCssCode(manifestJson) {
    let nvueCssCode = fs_1.default.readFileSync(path_1.default.resolve(__dirname, '../../lib/nvue.css'), 'utf8');
    const flexDirection = (0, nvue_1.getNVueFlexDirection)(manifestJson);
    if (flexDirection !== 'column') {
        nvueCssCode = nvueCssCode.replace('column', flexDirection);
    }
    return nvueCssCode;
}
exports.genNVueCssCode = genNVueCssCode;

}, function(modId) { var map = {"../json/app/manifest/nvue":1660207800506}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800506, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.getNVueFlexDirection = exports.getNVueStyleCompiler = exports.getNVueCompiler = exports.initNVue = void 0;
function initNVue(manifestJson, pagesJson) { }
exports.initNVue = initNVue;
function getNVueCompiler(manifestJson) {
    const platformOptions = manifestJson['app-plus'];
    if (platformOptions) {
        const { nvueCompiler } = platformOptions;
        if (nvueCompiler === 'weex') {
            return 'weex';
        }
        if (nvueCompiler === 'vue') {
            return 'vue';
        }
        if (nvueCompiler === 'vite') {
            return 'vite';
        }
    }
    return 'uni-app';
}
exports.getNVueCompiler = getNVueCompiler;
function getNVueStyleCompiler(manifestJson) {
    const platformOptions = manifestJson['app-plus'];
    if (platformOptions && platformOptions.nvueStyleCompiler === 'uni-app') {
        return 'uni-app';
    }
    return 'weex';
}
exports.getNVueStyleCompiler = getNVueStyleCompiler;
const flexDirs = ['row', 'row-reverse', 'column', 'column-reverse'];
function getNVueFlexDirection(manifestJson) {
    var _a, _b;
    let flexDir = 'column';
    if ((_b = (_a = manifestJson['app-plus']) === null || _a === void 0 ? void 0 : _a.nvue) === null || _b === void 0 ? void 0 : _b['flex-direction']) {
        flexDir = manifestJson['app-plus'].nvue['flex-direction'];
        if (flexDirs.indexOf(flexDir) === -1) {
            flexDir = 'column';
        }
    }
    return flexDir;
}
exports.getNVueFlexDirection = getNVueFlexDirection;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800507, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.formatMiniProgramEvent = void 0;
const uni_shared_1 = require("@dcloudio/uni-shared");
function formatMiniProgramEvent(eventName, { isCatch, isCapture, isComponent, }) {
    if (isComponent) {
        // 自定义组件的自定义事件需要格式化，因为 triggerEvent 时也会格式化
        eventName = (0, uni_shared_1.customizeEvent)(eventName);
    }
    if (!isComponent && eventName === 'click') {
        eventName = 'tap';
    }
    let eventType = 'bind';
    if (isCatch) {
        eventType = 'catch';
    }
    if (isCapture) {
        return `capture-${eventType}:${eventName}`;
    }
    // bind:foo-bar
    return eventType + (isSimpleExpr(eventName) ? '' : ':') + eventName;
}
exports.formatMiniProgramEvent = formatMiniProgramEvent;
function isSimpleExpr(name) {
    if (name.startsWith('_')) {
        return false;
    }
    if (name.indexOf('-') > -1) {
        return false;
    }
    if (name.indexOf(':') > -1) {
        return false;
    }
    return true;
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800508, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.transformScopedCss = void 0;
function transformScopedCss(cssCode) {
    return cssCode.replace(/\[(data-v-[a-f0-9]{8})\]/gi, (_, scopedId) => {
        return '.' + scopedId;
    });
}
exports.transformScopedCss = transformScopedCss;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800509, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMiniProgramAssetFile = void 0;
const path_1 = __importDefault(require("path"));
const EXTNAMES = [
    '.png',
    '.jpg',
    '.jpeg',
    '.gif',
    '.svg',
    '.json',
    '.cer',
    '.mp3',
    '.aac',
    '.m4a',
    '.mp4',
    '.wav',
    '.ogg',
    '.silk',
    '.wasm',
    '.br',
    '.cert',
];
function isMiniProgramAssetFile(filename) {
    if (!path_1.default.isAbsolute(filename)) {
        return false;
    }
    return EXTNAMES.includes(path_1.default.extname(filename));
}
exports.isMiniProgramAssetFile = isMiniProgramAssetFile;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800510, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMiniProgramTemplateFilter = exports.clearMiniProgramTemplateFilter = exports.addMiniProgramTemplateFile = exports.clearMiniProgramTemplateFiles = exports.findMiniProgramTemplateFiles = void 0;
const path_1 = __importDefault(require("path"));
const uni_shared_1 = require("@dcloudio/uni-shared");
const utils_1 = require("../utils");
const templateFilesCache = new Map();
const templateFiltersCache = new Map();
function relativeFilterFilename(filename, filter) {
    if (!filter.src) {
        return '';
    }
    return ('./' +
        (0, utils_1.normalizeMiniProgramFilename)(path_1.default.relative(path_1.default.dirname(filename), filter.src)));
}
function findMiniProgramTemplateFiles(genFilter) {
    const files = Object.create(null);
    templateFilesCache.forEach((code, filename) => {
        if (!genFilter) {
            files[filename] = code;
        }
        else {
            const filters = getMiniProgramTemplateFilters(filename);
            if (filters && filters.length) {
                files[filename] =
                    filters
                        .map((filter) => genFilter(filter, relativeFilterFilename(filename, filter)))
                        .join(uni_shared_1.LINEFEED) +
                        uni_shared_1.LINEFEED +
                        code;
            }
            else {
                files[filename] = code;
            }
        }
    });
    return files;
}
exports.findMiniProgramTemplateFiles = findMiniProgramTemplateFiles;
function clearMiniProgramTemplateFiles() {
    templateFilesCache.clear();
}
exports.clearMiniProgramTemplateFiles = clearMiniProgramTemplateFiles;
function addMiniProgramTemplateFile(filename, code) {
    templateFilesCache.set(filename, code);
}
exports.addMiniProgramTemplateFile = addMiniProgramTemplateFile;
function getMiniProgramTemplateFilters(filename) {
    return templateFiltersCache.get(filename);
}
function clearMiniProgramTemplateFilter(filename) {
    templateFiltersCache.delete(filename);
}
exports.clearMiniProgramTemplateFilter = clearMiniProgramTemplateFilter;
function addMiniProgramTemplateFilter(filename, filter) {
    const filters = templateFiltersCache.get(filename);
    if (filters) {
        const filterIndex = filters.findIndex((f) => f.id === filter.id);
        if (filterIndex > -1) {
            filters.splice(filterIndex, 1, filter);
        }
        else {
            filters.push(filter);
        }
    }
    else {
        templateFiltersCache.set(filename, [filter]);
    }
}
exports.addMiniProgramTemplateFilter = addMiniProgramTemplateFilter;

}, function(modId) { var map = {"../utils":1660207800502}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800511, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.MP_PLUGIN_JSON_NAME = exports.COMPONENT_CUSTOM_HIDDEN_BIND = exports.COMPONENT_CUSTOM_HIDDEN = exports.COMPONENT_BIND_LINK = exports.COMPONENT_ON_LINK = void 0;
exports.COMPONENT_ON_LINK = 'onVI';
exports.COMPONENT_BIND_LINK = '__l';
exports.COMPONENT_CUSTOM_HIDDEN = 'data-c-h';
exports.COMPONENT_CUSTOM_HIDDEN_BIND = 'bind:-' + exports.COMPONENT_CUSTOM_HIDDEN;
exports.MP_PLUGIN_JSON_NAME = 'plugin.json';

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800512, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.HTML_TO_MINI_PROGRAM_TAGS = void 0;
exports.HTML_TO_MINI_PROGRAM_TAGS = {
    br: 'view',
    hr: 'view',
    p: 'view',
    h1: 'view',
    h2: 'view',
    h3: 'view',
    h4: 'view',
    h5: 'view',
    h6: 'view',
    abbr: 'view',
    address: 'view',
    b: 'view',
    bdi: 'view',
    bdo: 'view',
    blockquote: 'view',
    cite: 'view',
    code: 'view',
    del: 'view',
    ins: 'view',
    dfn: 'view',
    em: 'view',
    strong: 'view',
    samp: 'view',
    kbd: 'view',
    var: 'view',
    i: 'view',
    mark: 'view',
    pre: 'view',
    q: 'view',
    ruby: 'view',
    rp: 'view',
    rt: 'view',
    s: 'view',
    small: 'view',
    sub: 'view',
    sup: 'view',
    time: 'view',
    u: 'view',
    wbr: 'view',
    // 表单元素
    // form: 'form',
    // input: 'input',
    // textarea: 'textarea',
    // button: 'button',
    select: 'picker',
    option: 'view',
    optgroup: 'view',
    // label: 'label',
    fieldset: 'view',
    datalist: 'picker',
    legend: 'view',
    output: 'view',
    // 框架
    iframe: 'view',
    // 图像
    img: 'image',
    // canvas: 'canvas',
    figure: 'view',
    figcaption: 'view',
    // 音视频
    // audio: 'audio',
    source: 'audio',
    // video: 'video',
    track: 'video',
    // 链接
    a: 'navigator',
    nav: 'view',
    link: 'navigator',
    // 列表
    ul: 'view',
    ol: 'view',
    li: 'view',
    dl: 'view',
    dt: 'view',
    dd: 'view',
    menu: 'view',
    command: 'view',
    // 表格table
    table: 'view',
    caption: 'view',
    th: 'view',
    td: 'view',
    tr: 'view',
    thead: 'view',
    tbody: 'view',
    tfoot: 'view',
    col: 'view',
    colgroup: 'view',
    // 样式 节
    div: 'view',
    main: 'view',
    span: 'label',
    header: 'view',
    footer: 'view',
    section: 'view',
    article: 'view',
    aside: 'view',
    details: 'view',
    dialog: 'view',
    summary: 'view',
    // progress: 'progress',
    meter: 'progress',
    head: 'view',
    meta: 'view',
    base: 'text',
    // 'map': 'image', // TODO不是很恰当
    area: 'navigator',
    script: 'view',
    noscript: 'view',
    embed: 'view',
    object: 'view',
    param: 'view',
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800513, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.copyMiniProgramPluginJson = void 0;
const json_1 = require("../json/json");
exports.copyMiniProgramPluginJson = {
    src: ['plugin.json'],
    get dest() {
        return process.env.UNI_OUTPUT_DIR;
    },
    transform(source) {
        return JSON.stringify((0, json_1.parseJson)(source.toString(), true), null, 2);
    },
};

}, function(modId) { var map = {"../json/json":1660207800514}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800514, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.parseJson = void 0;
const jsonc_parser_1 = require("jsonc-parser");
const preprocess_1 = require("../preprocess");
function parseJson(jsonStr, shouldPre = false) {
    return (0, jsonc_parser_1.parse)(shouldPre ? (0, preprocess_1.preJson)(jsonStr) : jsonStr);
}
exports.parseJson = parseJson;

}, function(modId) { var map = {"../preprocess":1660207800515}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800515, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.preNVueJson = exports.preNVueCss = exports.preNVueHtml = exports.preNVueJs = exports.preJson = exports.preCss = exports.preHtml = exports.preJs = exports.initPreContext = void 0;
const context_1 = require("./context");
/* eslint-disable no-restricted-globals */
const { preprocess } = require('../../lib/preprocess');
var context_2 = require("./context");
Object.defineProperty(exports, "initPreContext", { enumerable: true, get: function () { return context_2.initPreContext; } });
function preJs(jsCode) {
    return preprocess(jsCode, (0, context_1.getPreVueContext)(), { type: 'js' });
}
exports.preJs = preJs;
function preHtml(htmlCode) {
    return preprocess(htmlCode, (0, context_1.getPreVueContext)(), { type: 'html' });
}
exports.preHtml = preHtml;
exports.preCss = preJs;
exports.preJson = preJs;
function preNVueJs(jsCode) {
    return preprocess(jsCode, (0, context_1.getPreNVueContext)(), { type: 'js' });
}
exports.preNVueJs = preNVueJs;
function preNVueHtml(htmlCode) {
    return preprocess(htmlCode, (0, context_1.getPreNVueContext)(), { type: 'html' });
}
exports.preNVueHtml = preNVueHtml;
exports.preNVueCss = preNVueJs;
exports.preNVueJson = preNVueJs;

}, function(modId) { var map = {"./context":1660207800516}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800516, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.initPreContext = exports.getPreNVueContext = exports.getPreVueContext = void 0;
const shared_1 = require("@vue/shared");
const DEFAULT_KEYS = [
    'APP',
    'APP_NVUE',
    'APP_PLUS',
    'APP_PLUS_NVUE',
    'APP_VUE',
    'H5',
    'MP',
    'MP_360',
    'MP_ALIPAY',
    'MP_BAIDU',
    'MP_QQ',
    'MP_LARK',
    'MP_TOUTIAO',
    'MP_WEIXIN',
    'MP_KUAISHOU',
    'MP_JD',
    'QUICKAPP_NATIVE',
    'QUICKAPP_WEBVIEW',
    'QUICKAPP_WEBVIEW_HUAWEI',
    'QUICKAPP_WEBVIEW_UNION',
    'VUE2',
    'VUE3',
];
const preVueContext = Object.create(null);
const preNVueContext = Object.create(null);
function getPreVueContext() {
    return preVueContext;
}
exports.getPreVueContext = getPreVueContext;
function getPreNVueContext() {
    return preNVueContext;
}
exports.getPreNVueContext = getPreNVueContext;
function initPreContext(platform, userPreContext) {
    const vueContext = Object.create(null);
    const nvueContext = Object.create(null);
    const defaultContext = Object.create(null);
    DEFAULT_KEYS.forEach((key) => {
        defaultContext[key] = false;
    });
    defaultContext[normalizeKey(platform)] = true;
    vueContext.VUE3 = true;
    nvueContext.VUE3 = true;
    if (platform === 'app' || platform === 'app-plus') {
        defaultContext.APP = true;
        defaultContext.APP_PLUS = true;
        vueContext.APP_VUE = true;
        nvueContext.APP_NVUE = true;
        nvueContext.APP_PLUS_NVUE = true;
    }
    else if (platform.startsWith('mp-')) {
        defaultContext.MP = true;
    }
    else if (platform.startsWith('quickapp-webview')) {
        defaultContext.QUICKAPP_WEBVIEW = true;
    }
    if (userPreContext) {
        if ((0, shared_1.isString)(userPreContext)) {
            try {
                userPreContext = JSON.parse(userPreContext);
            }
            catch (e) { }
        }
        if ((0, shared_1.isPlainObject)(userPreContext)) {
            Object.keys(userPreContext).forEach((key) => {
                defaultContext[normalizeKey(key)] = !!userPreContext[key];
            });
        }
    }
    (0, shared_1.extend)(preVueContext, defaultContext, vueContext);
    (0, shared_1.extend)(preNVueContext, defaultContext, nvueContext);
}
exports.initPreContext = initPreContext;
function normalizeKey(name) {
    return name.replace(/-/g, '_').toUpperCase();
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800517, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformDynamicImports = exports.parseScriptDescriptor = exports.parseTemplateDescriptor = exports.updateMiniProgramComponentsByMainFilename = exports.updateMiniProgramGlobalComponents = exports.updateMiniProgramComponentsByTemplateFilename = exports.updateMiniProgramComponentsByScriptFilename = exports.parseMainDescriptor = void 0;
const types_1 = require("@babel/types");
const estree_walker_1 = require("estree-walker");
const magic_string_1 = __importDefault(require("magic-string"));
const shared_1 = require("@vue/shared");
const uni_shared_1 = require("@dcloudio/uni-shared");
const messages_1 = require("../messages");
const constants_1 = require("../constants");
const utils_1 = require("../utils");
const utils_2 = require("../vite/utils");
const jsonFile_1 = require("../json/mp/jsonFile");
const mainDescriptors = new Map();
const scriptDescriptors = new Map();
const templateDescriptors = new Map();
function findImportTemplateSource(ast) {
    const importDeclaration = ast.body.find((node) => (0, types_1.isImportDeclaration)(node) &&
        node.source.value.includes('vue&type=template'));
    if (importDeclaration) {
        return importDeclaration.source.value;
    }
}
function findImportScriptSource(ast) {
    const importDeclaration = ast.body.find((node) => (0, types_1.isImportDeclaration)(node) && node.source.value.includes('vue&type=script'));
    if (importDeclaration) {
        return importDeclaration.source.value;
    }
}
async function resolveSource(filename, source, resolve) {
    if (!source) {
        return;
    }
    const resolveId = await resolve(source, filename);
    if (resolveId) {
        return resolveId.id;
    }
}
async function parseMainDescriptor(filename, ast, resolve) {
    const script = await resolveSource(filename, findImportScriptSource(ast), resolve);
    const template = await resolveSource(filename, findImportTemplateSource(ast), resolve);
    const imports = await parseVueComponentImports(filename, ast.body.filter((node) => (0, types_1.isImportDeclaration)(node)), resolve);
    if (!script) {
        // inline script
        await parseScriptDescriptor(filename, ast, { resolve, isExternal: false });
    }
    if (!template) {
        // inline template
        await parseTemplateDescriptor(filename, ast, { resolve, isExternal: false });
    }
    const descriptor = {
        imports,
        script: script ? (0, utils_2.parseVueRequest)(script).filename : filename,
        template: template ? (0, utils_2.parseVueRequest)(template).filename : filename,
    };
    mainDescriptors.set(filename, descriptor);
    return descriptor;
}
exports.parseMainDescriptor = parseMainDescriptor;
function updateMiniProgramComponentsByScriptFilename(scriptFilename, inputDir, normalizeComponentName) {
    const mainFilename = findMainFilenameByScriptFilename(scriptFilename);
    if (mainFilename) {
        updateMiniProgramComponentsByMainFilename(mainFilename, inputDir, normalizeComponentName);
    }
}
exports.updateMiniProgramComponentsByScriptFilename = updateMiniProgramComponentsByScriptFilename;
function updateMiniProgramComponentsByTemplateFilename(templateFilename, inputDir, normalizeComponentName) {
    const mainFilename = findMainFilenameByTemplateFilename(templateFilename);
    if (mainFilename) {
        updateMiniProgramComponentsByMainFilename(mainFilename, inputDir, normalizeComponentName);
    }
}
exports.updateMiniProgramComponentsByTemplateFilename = updateMiniProgramComponentsByTemplateFilename;
function findMainFilenameByScriptFilename(scriptFilename) {
    const keys = [...mainDescriptors.keys()];
    return keys.find((key) => mainDescriptors.get(key).script === scriptFilename);
}
function findMainFilenameByTemplateFilename(templateFilename) {
    const keys = [...mainDescriptors.keys()];
    return keys.find((key) => mainDescriptors.get(key).template === templateFilename);
}
async function updateMiniProgramGlobalComponents(filename, ast, { inputDir, resolve, normalizeComponentName, }) {
    const { bindingComponents, imports } = await parseGlobalDescriptor(filename, ast, resolve);
    (0, jsonFile_1.addMiniProgramUsingComponents)('app', createUsingComponents(bindingComponents, imports, inputDir, normalizeComponentName));
    return {
        imports,
    };
}
exports.updateMiniProgramGlobalComponents = updateMiniProgramGlobalComponents;
function createUsingComponents(bindingComponents, imports, inputDir, normalizeComponentName) {
    const usingComponents = {};
    imports.forEach(({ source: { value }, specifiers: [specifier] }) => {
        const { name } = specifier.local;
        if (!bindingComponents[name]) {
            return;
        }
        const componentName = normalizeComponentName((0, shared_1.hyphenate)(bindingComponents[name].tag));
        if (!usingComponents[componentName]) {
            usingComponents[componentName] = (0, uni_shared_1.addLeadingSlash)((0, utils_1.removeExt)((0, utils_1.normalizeMiniProgramFilename)(value, inputDir)));
        }
    });
    return usingComponents;
}
function updateMiniProgramComponentsByMainFilename(mainFilename, inputDir, normalizeComponentName) {
    const mainDescriptor = mainDescriptors.get(mainFilename);
    if (!mainDescriptor) {
        return;
    }
    const templateDescriptor = templateDescriptors.get(mainDescriptor.template);
    if (!templateDescriptor) {
        return;
    }
    const scriptDescriptor = scriptDescriptors.get(mainDescriptor.script);
    if (!scriptDescriptor) {
        return;
    }
    const bindingComponents = parseBindingComponents(templateDescriptor.bindingComponents, scriptDescriptor.bindingComponents);
    const imports = parseImports(mainDescriptor.imports, scriptDescriptor.imports, templateDescriptor.imports);
    (0, jsonFile_1.addMiniProgramUsingComponents)((0, utils_1.removeExt)((0, utils_1.normalizeMiniProgramFilename)(mainFilename, inputDir)), createUsingComponents(bindingComponents, imports, inputDir, normalizeComponentName));
}
exports.updateMiniProgramComponentsByMainFilename = updateMiniProgramComponentsByMainFilename;
function findBindingComponent(tag, bindingComponents) {
    return Object.keys(bindingComponents).find((name) => {
        const componentTag = bindingComponents[name].tag;
        const camelName = (0, shared_1.camelize)(componentTag);
        const PascalName = (0, shared_1.capitalize)(camelName);
        return tag === componentTag || tag === camelName || tag === PascalName;
    });
}
function normalizeComponentId(id) {
    // _unref(test) => test
    if (id.includes('_unref(')) {
        return id.replace('_unref(', '').replace(')', '');
    }
    // $setup["test"] => test
    if (id.includes('$setup[')) {
        return id.replace('$setup["', '').replace('"', '');
    }
    return id;
}
function parseBindingComponents(templateBindingComponents, scriptBindingComponents) {
    const bindingComponents = {};
    Object.keys(templateBindingComponents).forEach((id) => {
        bindingComponents[normalizeComponentId(id)] = templateBindingComponents[id];
    });
    Object.keys(scriptBindingComponents).forEach((id) => {
        const { tag } = scriptBindingComponents[id];
        const name = findBindingComponent(tag, templateBindingComponents);
        if (name) {
            bindingComponents[id] = bindingComponents[name];
        }
    });
    return bindingComponents;
}
function parseImports(mainImports, scriptImports, templateImports) {
    const imports = [...mainImports, ...templateImports, ...scriptImports];
    return imports;
}
/**
 * 解析 template
 * @param filename
 * @param code
 * @param ast
 * @param options
 * @returns
 */
async function parseTemplateDescriptor(filename, ast, options) {
    // 外置时查找所有 vue component import
    const imports = options.isExternal
        ? await parseVueComponentImports(filename, ast.body.filter((node) => (0, types_1.isImportDeclaration)(node)), options.resolve)
        : [];
    const descriptor = {
        bindingComponents: findBindingComponents(ast.body),
        imports,
    };
    templateDescriptors.set(filename, descriptor);
    return descriptor;
}
exports.parseTemplateDescriptor = parseTemplateDescriptor;
async function parseGlobalDescriptor(filename, ast, resolve) {
    // 外置时查找所有 vue component import
    const imports = (await parseVueComponentImports(filename, ast.body.filter((node) => (0, types_1.isImportDeclaration)(node)), resolve)).filter((item) => !(0, utils_2.cleanUrl)(item.source.value).endsWith('App.vue'));
    return {
        bindingComponents: parseGlobalComponents(ast),
        imports,
    };
}
/**
 * 解析 script
 * @param filename
 * @param code
 * @param ast
 * @param options
 * @returns
 */
async function parseScriptDescriptor(filename, ast, options) {
    // 外置时查找所有 vue component import
    const imports = options.isExternal
        ? await parseVueComponentImports(filename, ast.body.filter((node) => (0, types_1.isImportDeclaration)(node)), options.resolve)
        : [];
    const descriptor = {
        bindingComponents: parseComponents(ast),
        imports,
    };
    scriptDescriptors.set(filename, descriptor);
    return descriptor;
}
exports.parseScriptDescriptor = parseScriptDescriptor;
/**
 * 解析编译器生成的 bindingComponents
 * @param ast
 * @returns
 */
function findBindingComponents(ast) {
    const mapping = findUnpluginComponents(ast);
    for (const node of ast) {
        if (!(0, types_1.isVariableDeclaration)(node)) {
            continue;
        }
        const declarator = node.declarations[0];
        if ((0, types_1.isIdentifier)(declarator.id) &&
            declarator.id.name === constants_1.BINDING_COMPONENTS) {
            const bindingComponents = JSON.parse(declarator.init.value);
            return Object.keys(bindingComponents).reduce((bindings, tag) => {
                const { name, type } = bindingComponents[tag];
                bindings[mapping[name] || name] = {
                    tag,
                    type: type,
                };
                return bindings;
            }, {});
        }
    }
    return {};
}
/**
 * 兼容：unplugin_components
 * https://github.com/dcloudio/uni-app/issues/3057
 * @param ast
 * @returns
 */
function findUnpluginComponents(ast) {
    const res = Object.create(null);
    // if(!Array){}
    const ifStatement = ast.find((statement) => (0, types_1.isIfStatement)(statement) &&
        (0, types_1.isUnaryExpression)(statement.test) &&
        statement.test.operator === '!' &&
        (0, types_1.isIdentifier)(statement.test.argument) &&
        statement.test.argument.name === 'Array');
    if (!ifStatement) {
        return res;
    }
    if (!(0, types_1.isBlockStatement)(ifStatement.consequent)) {
        return res;
    }
    for (const node of ifStatement.consequent.body) {
        if (!(0, types_1.isVariableDeclaration)(node)) {
            continue;
        }
        const { id, init } = node.declarations[0];
        if ((0, types_1.isIdentifier)(id) &&
            (0, types_1.isIdentifier)(init) &&
            init.name.includes('unplugin_components')) {
            res[id.name] = init.name;
        }
    }
    return res;
}
/**
 * 查找全局组件定义：app.component('component-a',{})
 * @param ast
 * @returns
 */
function parseGlobalComponents(ast) {
    const bindingComponents = {};
    estree_walker_1.walk(ast, {
        enter(child) {
            if (!(0, types_1.isCallExpression)(child)) {
                return;
            }
            const { callee } = child;
            // .component
            if (!(0, types_1.isMemberExpression)(callee) ||
                !(0, types_1.isIdentifier)(callee.property) ||
                callee.property.name !== 'component') {
                return;
            }
            // .component('component-a',{})
            const args = child.arguments;
            if (args.length !== 2) {
                return;
            }
            const [name, value] = args;
            if (!(0, types_1.isStringLiteral)(name)) {
                return console.warn(messages_1.M['mp.component.args[0]']);
            }
            if (!(0, types_1.isIdentifier)(value)) {
                return console.warn(messages_1.M['mp.component.args[1]']);
            }
            bindingComponents[value.name] = {
                tag: name.value,
                type: 'unknown',
            };
        },
    });
    return bindingComponents;
}
/**
 * 从 components 中查找定义的组件
 * @param ast
 * @param bindingComponents
 */
function parseComponents(ast) {
    const bindingComponents = {};
    estree_walker_1.walk(ast, {
        enter(child) {
            if (!(0, types_1.isObjectExpression)(child)) {
                return;
            }
            const componentsProp = child.properties.find((prop) => (0, types_1.isObjectProperty)(prop) &&
                (0, types_1.isIdentifier)(prop.key) &&
                prop.key.name === 'components');
            if (!componentsProp) {
                return;
            }
            const componentsExpr = componentsProp.value;
            if (!(0, types_1.isObjectExpression)(componentsExpr)) {
                return;
            }
            componentsExpr.properties.forEach((prop) => {
                if (!(0, types_1.isObjectProperty)(prop)) {
                    return;
                }
                if (!(0, types_1.isIdentifier)(prop.key) && !(0, types_1.isStringLiteral)(prop.key)) {
                    return;
                }
                if (!(0, types_1.isIdentifier)(prop.value)) {
                    return;
                }
                bindingComponents[prop.value.name] = {
                    tag: (0, types_1.isIdentifier)(prop.key) ? prop.key.name : prop.key.value,
                    type: 'unknown',
                };
            });
        },
    });
    return bindingComponents;
}
/**
 * vue component imports
 * @param filename
 * @param imports
 * @param resolve
 * @returns
 */
async function parseVueComponentImports(importer, imports, resolve) {
    const vueComponentImports = [];
    for (let i = 0; i < imports.length; i++) {
        const { source } = imports[i];
        if ((0, utils_2.parseVueRequest)(source.value).query.vue) {
            continue;
        }
        const resolveId = await resolve(source.value, importer);
        if (!resolveId) {
            continue;
        }
        const { filename } = (0, utils_2.parseVueRequest)(resolveId.id);
        if (constants_1.EXTNAME_VUE_RE.test(filename)) {
            source.value = resolveId.id;
            vueComponentImports.push(imports[i]);
        }
    }
    return vueComponentImports;
}
/**
 * static import => dynamic import
 * @param code
 * @param imports
 * @param dynamicImport
 * @returns
 */
async function transformDynamicImports(code, imports, { id, sourceMap, dynamicImport, }) {
    if (!imports.length) {
        return {
            code,
            map: null,
        };
    }
    const s = new magic_string_1.default(code);
    for (let i = 0; i < imports.length; i++) {
        const { start, end, specifiers: [specifier], source, } = imports[i];
        s.overwrite(start, end, dynamicImport(specifier.local.name, source.value) + ';');
    }
    return {
        code: s.toString(),
        map: null,
    };
}
exports.transformDynamicImports = transformDynamicImports;

}, function(modId) { var map = {"../messages":1660207800518,"../constants":1660207800503,"../utils":1660207800502,"../vite/utils":1660207800521,"../json/mp/jsonFile":1660207800530}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800518, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.M = void 0;
const os_locale_s_fix_1 = require("os-locale-s-fix");
const en_1 = __importDefault(require("./en"));
const zh_CN_1 = __importDefault(require("./zh_CN"));
function format(lang) {
    const array = lang.split(/[.,]/)[0].split(/[_-]/);
    array[0] = array[0].toLowerCase();
    if (array[0] === 'zh') {
        array[1] = (array[1] || 'CN').toUpperCase();
    }
    array.length = Math.min(array.length, 2);
    return array.join('_');
}
const locale = format(process.env.UNI_HBUILDERX_LANGID ||
    os_locale_s_fix_1.osLocale.sync({ spawn: true, cache: false }) ||
    'en');
exports.M = locale === 'zh_CN' ? zh_CN_1.default : en_1.default;

}, function(modId) { var map = {"./en":1660207800519,"./zh_CN":1660207800520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800519, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    'app.compiler.version': 'Compiler version: {version}',
    compiling: 'Compiling...',
    'dev.performance': 'Please note that in running mode, due to log output, sourcemap, and uncompressed source code, the performance and package size are not as good as release mode.',
    'dev.performance.nvue': 'Especially the sourcemap of app-nvue has a greater impact',
    'dev.performance.mp': 'To officially release, please click the release menu or use the cli release command to release',
    'build.done': 'DONE  Build complete.',
    'dev.watching.start': 'Compiling...',
    'dev.watching.end': 'DONE  Build complete. Watching for changes...',
    'dev.watching.end.pages': 'DONE  Build complete. PAGES:{pages}',
    'dev.watching.end.files': 'DONE  Build complete. FILES:{files}',
    'stat.warn.appid': 'The current application is not configured with Appid, and uni statistics cannot be used. For details, see https://ask.dcloud.net.cn/article/36303',
    'stat.warn.version': 'The uni statistics version is not configured. The default version is 1.0.uni statistics version 2.0 is recommended, private deployment data is more secure and code is open source and customizable. details: https://uniapp.dcloud.io/uni-stat',
    'stat.warn.tip': 'uni statistics version: {version}',
    'i18n.fallbackLocale.default': 'fallbackLocale is missing in manifest.json, use: {locale}',
    'i18n.fallbackLocale.missing': './local/{locale}.json is missing',
    'easycom.conflict': 'easycom component conflict: ',
    'mp.component.args[0]': 'The first parameter of {0} must be a static string',
    'mp.component.args[1]': '{0} requires two parameters',
    'mp.360.unsupported': '360 is unsupported',
    'file.notfound': '{file} is not found',
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800520, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    'app.compiler.version': '编译器版本：{version}',
    compiling: '正在编译中...',
    'dev.performance': '请注意运行模式下，因日志输出、sourcemap 以及未压缩源码等原因，性能和包体积，均不及发行模式。',
    'dev.performance.nvue': '尤其是 app-nvue 的 sourcemap 影响较大',
    'dev.performance.mp': '若要正式发布，请点击发行菜单或使用 cli 发布命令进行发布',
    'build.done': 'DONE  Build complete.',
    'dev.watching.start': '开始差量编译...',
    'dev.watching.end': 'DONE  Build complete. Watching for changes...',
    'dev.watching.end.pages': 'DONE  Build complete. PAGES:{pages}',
    'dev.watching.end.files': 'DONE  Build complete. FILES:{files}',
    'stat.warn.appid': '当前应用未配置 appid，无法使用 uni 统计，详情参考：https://ask.dcloud.net.cn/article/36303',
    'stat.warn.version': '当前应用未配置uni统计版本，默认使用1.0版本；建议使用uni统计2.0版本 ，私有部署数据更安全，代码开源可定制。详情：https://uniapp.dcloud.io/uni-stat',
    'stat.warn.tip': '已开启 uni统计{version} 版本',
    'i18n.fallbackLocale.default': '当前应用未在 manifest.json 配置 fallbackLocale，默认使用：{locale}',
    'i18n.fallbackLocale.missing': '当前应用配置的 fallbackLocale 或 locale 为：{locale}，但 locale 目录缺少该语言文件',
    'easycom.conflict': 'easycom组件冲突：',
    'mp.component.args[0]': '{0}的第一个参数必须为静态字符串',
    'mp.component.args[1]': '{0}需要两个参数',
    'mp.360.unsupported': 'vue3暂不支持360小程序',
    'file.notfound': '{file} 文件不存在',
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800521, function(require, module, exports) {

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCombineBuiltInCss = exports.buildInCssSet = void 0;
__exportStar(require("./ast"), exports);
__exportStar(require("./url"), exports);
__exportStar(require("./plugin"), exports);
__exportStar(require("./utils"), exports);
// 内置组件css列表，h5平台需要合并进去首页css中
exports.buildInCssSet = new Set();
function isCombineBuiltInCss(config) {
    return config.command === 'build' && config.build.cssCodeSplit;
}
exports.isCombineBuiltInCss = isCombineBuiltInCss;

}, function(modId) { var map = {"./ast":1660207800522,"./url":1660207800523,"./plugin":1660207800524,"./utils":1660207800527}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800522, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.isSimpleExpressionNode = exports.isDirectiveNode = exports.isAttributeNode = exports.isElementNode = exports.parseVue = exports.createCallExpression = exports.createIdentifier = exports.createLiteral = exports.isReference = exports.isExportSpecifier = exports.isMethodDefinition = exports.isMemberExpression = exports.isCallExpression = exports.isAssignmentExpression = exports.isIdentifier = exports.isProperty = void 0;
const compiler_dom_1 = require("@vue/compiler-dom");
const isProperty = (node) => node.type === 'Property';
exports.isProperty = isProperty;
const isIdentifier = (node) => node.type === 'Identifier';
exports.isIdentifier = isIdentifier;
const isAssignmentExpression = (node) => node.type === 'AssignmentExpression';
exports.isAssignmentExpression = isAssignmentExpression;
const isCallExpression = (node) => node.type === 'CallExpression';
exports.isCallExpression = isCallExpression;
const isMemberExpression = (node) => node.type === 'MemberExpression';
exports.isMemberExpression = isMemberExpression;
const isMethodDefinition = (node) => node.type === 'MethodDefinition';
exports.isMethodDefinition = isMethodDefinition;
const isExportSpecifier = (node) => node.type === 'ExportSpecifier';
exports.isExportSpecifier = isExportSpecifier;
const isReference = (node, parent) => {
    if ((0, exports.isMemberExpression)(node)) {
        return !node.computed && (0, exports.isReference)(node.object, node);
    }
    if ((0, exports.isIdentifier)(node)) {
        if ((0, exports.isMemberExpression)(parent))
            return parent.computed || node === parent.object;
        // `bar` in { bar: foo }
        if ((0, exports.isProperty)(parent) && node !== parent.value)
            return false;
        // `bar` in `class Foo { bar () {...} }`
        if ((0, exports.isMethodDefinition)(parent))
            return false;
        // `bar` in `export { foo as bar }`
        if ((0, exports.isExportSpecifier)(parent) && node !== parent.local)
            return false;
        return true;
    }
    return false;
};
exports.isReference = isReference;
function createLiteral(value) {
    return {
        type: 'Literal',
        value,
        raw: `'${value}'`,
    };
}
exports.createLiteral = createLiteral;
function createIdentifier(name) {
    return {
        type: 'Identifier',
        name,
    };
}
exports.createIdentifier = createIdentifier;
function createCallExpression(callee, args) {
    return {
        type: 'CallExpression',
        callee,
        arguments: args,
    };
}
exports.createCallExpression = createCallExpression;
function parseVue(code, errors) {
    return (0, compiler_dom_1.parse)(code, {
        isNativeTag: () => true,
        isPreTag: () => true,
        getTextMode: () => 0 /* DATA */,
        onError: (e) => {
            errors.push(e);
        },
    });
}
exports.parseVue = parseVue;
function isElementNode(node) {
    return node.type === 1 /* ELEMENT */;
}
exports.isElementNode = isElementNode;
function isAttributeNode(node) {
    return node.type === 6 /* ATTRIBUTE */;
}
exports.isAttributeNode = isAttributeNode;
function isDirectiveNode(node) {
    return node.type === 7 /* DIRECTIVE */;
}
exports.isDirectiveNode = isDirectiveNode;
function isSimpleExpressionNode(node) {
    return node.type === 4 /* SIMPLE_EXPRESSION */;
}
exports.isSimpleExpressionNode = isSimpleExpressionNode;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800523, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isJsFile = exports.cleanUrl = exports.hashRE = exports.queryRE = exports.isInternalRequest = exports.ENV_PUBLIC_PATH = exports.CLIENT_PUBLIC_PATH = exports.VALID_ID_PREFIX = exports.FS_PREFIX = exports.isImportRequest = exports.parseVueRequest = void 0;
const path_1 = __importDefault(require("path"));
const constants_1 = require("../../constants");
function parseVueRequest(id) {
    const [filename, rawQuery] = id.split(`?`, 2);
    const query = Object.fromEntries(new URLSearchParams(rawQuery));
    if (query.vue != null) {
        query.vue = true;
    }
    if (query.src != null) {
        query.src = true;
    }
    if (query.index != null) {
        query.index = Number(query.index);
    }
    if (query.raw != null) {
        query.raw = true;
    }
    return {
        filename,
        query,
    };
}
exports.parseVueRequest = parseVueRequest;
const importQueryRE = /(\?|&)import=?(?:&|$)/;
const isImportRequest = (url) => importQueryRE.test(url);
exports.isImportRequest = isImportRequest;
/**
 * Prefix for resolved fs paths, since windows paths may not be valid as URLs.
 */
exports.FS_PREFIX = `/@fs/`;
/**
 * Prefix for resolved Ids that are not valid browser import specifiers
 */
exports.VALID_ID_PREFIX = `/@id/`;
exports.CLIENT_PUBLIC_PATH = `/@vite/client`;
exports.ENV_PUBLIC_PATH = `/@vite/env`;
const internalPrefixes = [
    exports.FS_PREFIX,
    exports.VALID_ID_PREFIX,
    exports.CLIENT_PUBLIC_PATH,
    exports.ENV_PUBLIC_PATH,
];
const InternalPrefixRE = new RegExp(`^(?:${internalPrefixes.join('|')})`);
const isInternalRequest = (url) => InternalPrefixRE.test(url);
exports.isInternalRequest = isInternalRequest;
exports.queryRE = /\?.*$/;
exports.hashRE = /#.*$/;
const cleanUrl = (url) => url.replace(exports.hashRE, '').replace(exports.queryRE, '');
exports.cleanUrl = cleanUrl;
function isJsFile(id) {
    const isJs = constants_1.EXTNAME_JS_RE.test(id);
    if (isJs) {
        return true;
    }
    const { filename, query } = parseVueRequest(id);
    const isVueJs = constants_1.EXTNAME_VUE.includes(path_1.default.extname(filename)) && !query.vue;
    if (isVueJs) {
        return true;
    }
    return false;
}
exports.isJsFile = isJsFile;

}, function(modId) { var map = {"../../constants":1660207800503}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800524, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.removePlugins = exports.replacePlugins = exports.injectCssPostPlugin = exports.injectCssPlugin = exports.injectAssetPlugin = void 0;
const shared_1 = require("@vue/shared");
const asset_1 = require("../plugins/vitejs/plugins/asset");
const css_1 = require("../plugins/vitejs/plugins/css");
function injectAssetPlugin(config) {
    replacePlugins([(0, asset_1.assetPlugin)(config)], config);
}
exports.injectAssetPlugin = injectAssetPlugin;
function injectCssPlugin(config) {
    replacePlugins([(0, css_1.cssPlugin)(config)], config);
}
exports.injectCssPlugin = injectCssPlugin;
function injectCssPostPlugin(config, newCssPostPlugin) {
    const oldCssPostPlugin = config.plugins.find((p) => p.name === newCssPostPlugin.name);
    // 直接覆盖原有方法，不能删除，替换，因为 unocss 在 pre 阶段已经获取到了旧的 css-post 插件对象
    if (oldCssPostPlugin) {
        (0, shared_1.extend)(oldCssPostPlugin, newCssPostPlugin);
    }
}
exports.injectCssPostPlugin = injectCssPostPlugin;
function replacePlugins(plugins, config) {
    plugins.forEach((plugin) => {
        const index = config.plugins.findIndex((p) => p.name === plugin.name);
        if (index > -1) {
            ;
            config.plugins.splice(index, 1, plugin);
        }
    });
}
exports.replacePlugins = replacePlugins;
function removePlugins(plugins, config) {
    if (!(0, shared_1.isArray)(plugins)) {
        plugins = [plugins];
    }
    plugins.forEach((name) => {
        const index = config.plugins.findIndex((p) => p.name === name);
        if (index > -1) {
            ;
            config.plugins.splice(index, 1);
        }
    });
}
exports.removePlugins = removePlugins;

}, function(modId) { var map = {"../plugins/vitejs/plugins/asset":1660207800525,"../plugins/vitejs/plugins/css":1660207800528}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800525, function(require, module, exports) {

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlToBuiltUrl = exports.getAssetHash = exports.assetFileNamesToFileName = exports.getAssetFilename = exports.fileToUrl = exports.checkPublicFile = exports.registerAssetToChunk = exports.assetPlugin = exports.chunkToEmittedAssetsMap = exports.assetUrlRE = void 0;
const path_1 = __importDefault(require("path"));
const url_1 = require("url");
const lite_1 = __importDefault(require("mime/lite"));
const fs_1 = __importStar(require("fs"));
const magic_string_1 = __importDefault(require("magic-string"));
const crypto_1 = require("crypto");
const utils_1 = require("../utils");
const utils_2 = require("../../../../vite/utils/utils");
const shared_1 = require("@vue/shared");
exports.assetUrlRE = /__VITE_ASSET__([a-z\d]{8})__(?:\$_(.*?)__)?/g;
// urls in JS must be quoted as strings, so when replacing them we need
// a different regex
const assetUrlQuotedRE = /"__VITE_ASSET__([a-z\d]{8})__(?:\$_(.*?)__)?"/g;
const rawRE = /(\?|&)raw(?:&|$)/;
const urlRE = /(\?|&)url(?:&|$)/;
exports.chunkToEmittedAssetsMap = new WeakMap();
const assetCache = new WeakMap();
const assetHashToFilenameMap = new WeakMap();
// save hashes of the files that has been emitted in build watch
const emittedHashMap = new WeakMap();
/**
 * Also supports loading plain strings with import text from './foo.txt?raw'
 */
function assetPlugin(config) {
    // assetHashToFilenameMap initialization in buildStart causes getAssetFilename to return undefined
    assetHashToFilenameMap.set(config, new Map());
    return {
        name: 'vite:asset',
        buildStart() {
            assetCache.set(config, new Map());
            emittedHashMap.set(config, new Set());
        },
        resolveId(id) {
            if (!config.assetsInclude((0, utils_1.cleanUrl)(id))) {
                return;
            }
            // imports to absolute urls pointing to files in /public
            // will fail to resolve in the main resolver. handle them here.
            const publicFile = checkPublicFile(id, config);
            if (publicFile) {
                return id;
            }
        },
        async load(id) {
            if (id.startsWith('\0')) {
                // Rollup convention, this id should be handled by the
                // plugin that marked it with \0
                return;
            }
            // raw requests, read from disk
            if (rawRE.test(id)) {
                const file = checkPublicFile(id, config) || (0, utils_1.cleanUrl)(id);
                // raw query, read file and return as string
                return `export default ${JSON.stringify(await fs_1.promises.readFile(file, 'utf-8'))}`;
            }
            if (!config.assetsInclude((0, utils_1.cleanUrl)(id)) && !urlRE.test(id)) {
                return;
            }
            id = id.replace(urlRE, '$1').replace(/[\?&]$/, '');
            const url = await fileToUrl(id, config, this);
            return `export default ${JSON.stringify(url)}`;
        },
        renderChunk(code, chunk) {
            let match;
            let s;
            while ((match = assetUrlQuotedRE.exec(code))) {
                s = s || (s = new magic_string_1.default(code));
                const [full, hash, postfix = ''] = match;
                // some internal plugins may still need to emit chunks (e.g. worker) so
                // fallback to this.getFileName for that.
                const file = getAssetFilename(hash, config) || this.getFileName(hash);
                registerAssetToChunk(chunk, file);
                const outputFilepath = config.base + file + postfix;
                s.overwrite(match.index, match.index + full.length, JSON.stringify(outputFilepath));
            }
            if (s) {
                return {
                    code: s.toString(),
                    map: (0, utils_2.withSourcemap)(config) ? s.generateMap({ hires: true }) : null,
                };
            }
            else {
                return null;
            }
        },
    };
}
exports.assetPlugin = assetPlugin;
function registerAssetToChunk(chunk, file) {
    let emitted = exports.chunkToEmittedAssetsMap.get(chunk);
    if (!emitted) {
        emitted = new Set();
        exports.chunkToEmittedAssetsMap.set(chunk, emitted);
    }
    emitted.add((0, utils_1.cleanUrl)(file));
}
exports.registerAssetToChunk = registerAssetToChunk;
function checkPublicFile(url, { publicDir }) {
    // note if the file is in /public, the resolver would have returned it
    // as-is so it's not going to be a fully resolved path.
    if (!publicDir || !url.startsWith('/')) {
        return;
    }
    const publicFile = path_1.default.join(publicDir, (0, utils_1.cleanUrl)(url));
    if (fs_1.default.existsSync(publicFile)) {
        return publicFile;
    }
    else {
        return;
    }
}
exports.checkPublicFile = checkPublicFile;
function fileToUrl(id, config, ctx, canInline = false) {
    return fileToBuiltUrl(id, config, ctx, false, canInline);
}
exports.fileToUrl = fileToUrl;
function getAssetFilename(hash, config) {
    var _a;
    return (_a = assetHashToFilenameMap.get(config)) === null || _a === void 0 ? void 0 : _a.get(hash);
}
exports.getAssetFilename = getAssetFilename;
/**
 * converts the source filepath of the asset to the output filename based on the assetFileNames option. \
 * this function imitates the behavior of rollup.js. \
 * https://rollupjs.org/guide/en/#outputassetfilenames
 *
 * @example
 * ```ts
 * const content = Buffer.from('text');
 * const fileName = assetFileNamesToFileName(
 *   'assets/[name].[hash][extname]',
 *   '/path/to/file.txt',
 *   getAssetHash(content),
 *   content
 * )
 * // fileName: 'assets/file.982d9e3e.txt'
 * ```
 *
 * @param assetFileNames filename pattern. e.g. `'assets/[name].[hash][extname]'`
 * @param file filepath of the asset
 * @param contentHash hash of the asset. used for `'[hash]'` placeholder
 * @param content content of the asset. passed to `assetFileNames` if `assetFileNames` is a function
 * @returns output filename
 */
function assetFileNamesToFileName(assetFileNames, file, contentHash, content) {
    const basename = path_1.default.basename(file);
    // placeholders for `assetFileNames`
    // `hash` is slightly different from the rollup's one
    const extname = path_1.default.extname(basename);
    const ext = extname.substring(1);
    const name = basename.slice(0, -extname.length);
    const hash = contentHash;
    if ((0, shared_1.isFunction)(assetFileNames)) {
        assetFileNames = assetFileNames({
            name: file,
            source: content,
            type: 'asset',
        });
        if (!(0, shared_1.isString)(assetFileNames)) {
            throw new TypeError('assetFileNames must return a string');
        }
    }
    else if (!(0, shared_1.isString)(assetFileNames)) {
        throw new TypeError('assetFileNames must be a string or a function');
    }
    const fileName = assetFileNames.replace(/\[\w+\]/g, (placeholder) => {
        switch (placeholder) {
            case '[ext]':
                return ext;
            case '[extname]':
                return extname;
            case '[hash]':
                return hash;
            case '[name]':
                return name;
        }
        throw new Error(`invalid placeholder ${placeholder} in assetFileNames "${assetFileNames}"`);
    });
    return fileName;
}
exports.assetFileNamesToFileName = assetFileNamesToFileName;
/**
 * Register an asset to be emitted as part of the bundle (if necessary)
 * and returns the resolved public URL
 */
function fileToBuiltUrl(id, config, pluginContext, skipPublicCheck = false, canInline = false) {
    if (!skipPublicCheck && checkPublicFile(id, config)) {
        return config.base + id.slice(1);
    }
    const cache = assetCache.get(config);
    const cached = cache.get(id);
    if (cached) {
        return cached;
    }
    const file = (0, utils_1.cleanUrl)(id);
    const content = fs_1.default.readFileSync(file);
    let url;
    if (canInline && content.length < Number(config.build.assetsInlineLimit)) {
        // base64 inlined as a string
        url = `data:${lite_1.default.getType(file)};base64,${content.toString('base64')}`;
    }
    else {
        const map = assetHashToFilenameMap.get(config);
        const contentHash = getAssetHash(content);
        const { search, hash } = (0, url_1.parse)(id);
        const postfix = (search || '') + (hash || '');
        const inputDir = (0, utils_1.normalizePath)(process.env.UNI_INPUT_DIR);
        let fileName = file.startsWith(inputDir)
            ? path_1.default.posix.relative(inputDir, file)
            : assetFileNamesToFileName(path_1.default.posix.join(config.build.assetsDir, '[name].[hash][extname]'), file, contentHash, content);
        if (!map.has(contentHash)) {
            map.set(contentHash, fileName);
        }
        if (!fileName.includes('/static/')) {
            const emittedSet = emittedHashMap.get(config);
            if (!emittedSet.has(contentHash)) {
                pluginContext.emitFile({
                    name: fileName,
                    fileName,
                    type: 'asset',
                    source: content,
                });
                emittedSet.add(contentHash);
            }
        }
        url = `__VITE_ASSET__${contentHash}__${postfix ? `$_${postfix}__` : ``}`;
    }
    cache.set(id, url);
    return url;
}
function getAssetHash(content) {
    return (0, crypto_1.createHash)('sha256').update(content).digest('hex').slice(0, 8);
}
exports.getAssetHash = getAssetHash;
function urlToBuiltUrl(url, importer, config, pluginContext) {
    if (checkPublicFile(url, config)) {
        return config.base + url.slice(1);
    }
    const file = url.startsWith('/')
        ? path_1.default.join(config.root, url)
        : path_1.default.join(path_1.default.dirname(importer), url);
    return fileToBuiltUrl(file, config, pluginContext, 
    // skip public check since we just did it above
    true);
}
exports.urlToBuiltUrl = urlToBuiltUrl;

}, function(modId) { var map = {"../utils":1660207800526,"../../../../vite/utils/utils":1660207800527}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800526, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.combineSourcemaps = exports.processSrcSet = exports.generateCodeFrame = exports.posToNumber = exports.pad = exports.isObject = exports.asyncReplace = exports.multilineCommentsRE = exports.isDataUrl = exports.dataUrlRE = exports.isExternalUrl = exports.externalRE = exports.cleanUrl = exports.hashRE = exports.queryRE = exports.normalizePath = exports.isWindows = exports.deepImportRE = exports.bareImportRE = exports.slash = void 0;
/**
 * https://github.com/vitejs/vite/blob/main/packages/vite/src/node/utils.ts
 */
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const remapping_1 = __importDefault(require("@ampproject/remapping"));
function slash(p) {
    return p.replace(/\\/g, '/');
}
exports.slash = slash;
exports.bareImportRE = /^[\w@](?!.*:\/\/)/;
exports.deepImportRE = /^([^@][^/]*)\/|^(@[^/]+\/[^/]+)\//;
exports.isWindows = os_1.default.platform() === 'win32';
function normalizePath(id) {
    return path_1.default.posix.normalize(exports.isWindows ? slash(id) : id);
}
exports.normalizePath = normalizePath;
exports.queryRE = /\?.*$/s;
exports.hashRE = /#.*$/s;
const cleanUrl = (url) => url.replace(exports.hashRE, '').replace(exports.queryRE, '');
exports.cleanUrl = cleanUrl;
exports.externalRE = /^(https?:)?\/\//;
const isExternalUrl = (url) => exports.externalRE.test(url);
exports.isExternalUrl = isExternalUrl;
exports.dataUrlRE = /^\s*data:/i;
const isDataUrl = (url) => exports.dataUrlRE.test(url);
exports.isDataUrl = isDataUrl;
exports.multilineCommentsRE = /\/\*(.|[\r\n])*?\*\//gm;
async function asyncReplace(input, re, replacer) {
    let match;
    let remaining = input;
    let rewritten = '';
    while ((match = re.exec(remaining))) {
        rewritten += remaining.slice(0, match.index);
        rewritten += await replacer(match);
        remaining = remaining.slice(match.index + match[0].length);
    }
    rewritten += remaining;
    return rewritten;
}
exports.asyncReplace = asyncReplace;
function isObject(value) {
    return Object.prototype.toString.call(value) === '[object Object]';
}
exports.isObject = isObject;
const splitRE = /\r?\n/;
const range = 2;
function pad(source, n = 2) {
    const lines = source.split(splitRE);
    return lines.map((l) => ` `.repeat(n) + l).join(`\n`);
}
exports.pad = pad;
function posToNumber(source, pos) {
    if (typeof pos === 'number')
        return pos;
    const lines = source.split(splitRE);
    const { line, column } = pos;
    let start = 0;
    for (let i = 0; i < line - 1; i++) {
        start += lines[i].length + 1;
    }
    return start + column;
}
exports.posToNumber = posToNumber;
function generateCodeFrame(source, start = 0, end) {
    start = posToNumber(source, start);
    end = end || start;
    const lines = source.split(splitRE);
    let count = 0;
    const res = [];
    for (let i = 0; i < lines.length; i++) {
        count += lines[i].length + 1;
        if (count >= start) {
            for (let j = i - range; j <= i + range || end > count; j++) {
                if (j < 0 || j >= lines.length)
                    continue;
                const line = j + 1;
                res.push(`${line}${' '.repeat(Math.max(3 - String(line).length, 0))}|  ${lines[j]}`);
                const lineLength = lines[j].length;
                if (j === i) {
                    // push underline
                    const pad = start - (count - lineLength) + 1;
                    const length = Math.max(1, end > count ? lineLength - pad : end - start);
                    res.push(`   |  ` + ' '.repeat(pad) + '^'.repeat(length));
                }
                else if (j > i) {
                    if (end > count) {
                        const length = Math.max(Math.min(end - count, lineLength), 1);
                        res.push(`   |  ` + '^'.repeat(length));
                    }
                    count += lineLength + 1;
                }
            }
            break;
        }
    }
    return res.join('\n');
}
exports.generateCodeFrame = generateCodeFrame;
const escapedSpaceCharacters = /( |\\t|\\n|\\f|\\r)+/g;
const imageSetUrlRE = /^(?:[\w\-]+\(.*?\)|'.*?'|".*?"|\S*)/;
async function processSrcSet(srcs, replacer) {
    const imageCandidates = srcs
        .split(',')
        .map((s) => {
        const src = s.replace(escapedSpaceCharacters, ' ').trim();
        const [url] = imageSetUrlRE.exec(src) || [];
        return {
            url,
            descriptor: src === null || src === void 0 ? void 0 : src.slice(url.length).trim(),
        };
    })
        .filter(({ url }) => !!url);
    const ret = await Promise.all(imageCandidates.map(async ({ url, descriptor }) => {
        return {
            url: await replacer({ url, descriptor }),
            descriptor,
        };
    }));
    const url = ret.reduce((prev, { url, descriptor }, index) => {
        descriptor = descriptor || '';
        return (prev +=
            url + ` ${descriptor}${index === ret.length - 1 ? '' : ', '}`);
    }, '');
    return url;
}
exports.processSrcSet = processSrcSet;
function escapeToLinuxLikePath(path) {
    if (/^[A-Z]:/.test(path)) {
        return path.replace(/^([A-Z]):\//, '/windows/$1/');
    }
    if (/^\/[^/]/.test(path)) {
        return `/linux${path}`;
    }
    return path;
}
function unescapeToLinuxLikePath(path) {
    if (path.startsWith('/linux/')) {
        return path.slice('/linux'.length);
    }
    if (path.startsWith('/windows/')) {
        return path.replace(/^\/windows\/([A-Z])\//, '$1:/');
    }
    return path;
}
// based on https://github.com/sveltejs/svelte/blob/abf11bb02b2afbd3e4cac509a0f70e318c306364/src/compiler/utils/mapped_code.ts#L221
const nullSourceMap = {
    names: [],
    sources: [],
    mappings: '',
    version: 3,
};
function combineSourcemaps(filename, sourcemapList, excludeContent = true) {
    if (sourcemapList.length === 0 ||
        sourcemapList.every((m) => m.sources.length === 0)) {
        return { ...nullSourceMap };
    }
    // hack for parse broken with normalized absolute paths on windows (C:/path/to/something).
    // escape them to linux like paths
    // also avoid mutation here to prevent breaking plugin's using cache to generate sourcemaps like vue (see #7442)
    sourcemapList = sourcemapList.map((sourcemap) => {
        const newSourcemaps = { ...sourcemap };
        newSourcemaps.sources = sourcemap.sources.map((source) => source ? escapeToLinuxLikePath(source) : null);
        if (sourcemap.sourceRoot) {
            newSourcemaps.sourceRoot = escapeToLinuxLikePath(sourcemap.sourceRoot);
        }
        return newSourcemaps;
    });
    const escapedFilename = escapeToLinuxLikePath(filename);
    // We don't declare type here so we can convert/fake/map as RawSourceMap
    let map; //: SourceMap
    let mapIndex = 1;
    const useArrayInterface = sourcemapList.slice(0, -1).find((m) => m.sources.length !== 1) === undefined;
    if (useArrayInterface) {
        map = (0, remapping_1.default)(sourcemapList, () => null, excludeContent);
    }
    else {
        map = (0, remapping_1.default)(sourcemapList[0], function loader(sourcefile) {
            if (sourcefile === escapedFilename && sourcemapList[mapIndex]) {
                return sourcemapList[mapIndex++];
            }
            else {
                return null;
            }
        }, excludeContent);
    }
    if (!map.file) {
        delete map.file;
    }
    // unescape the previous hack
    map.sources = map.sources.map((source) => source ? unescapeToLinuxLikePath(source) : source);
    map.file = filename;
    return map;
}
exports.combineSourcemaps = combineSourcemaps;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800527, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.isSsr = exports.isInHybridNVue = exports.withSourcemap = void 0;
function withSourcemap(config) {
    if (config.command === 'serve') {
        return true;
    }
    return !!config.build.sourcemap;
}
exports.withSourcemap = withSourcemap;
function isInHybridNVue(config) {
    return config.nvue && process.env.UNI_RENDERER !== 'native';
}
exports.isInHybridNVue = isInHybridNVue;
function isSsr(command, config) {
    if (command === 'serve') {
        return !!(config.server && config.server.middlewareMode);
    }
    if (command === 'build') {
        return !!(config.build && config.build.ssr);
    }
    return false;
}
exports.isSsr = isSsr;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800528, function(require, module, exports) {

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hoistAtRules = exports.minifyCSS = exports.importCssRE = exports.cssDataUriRE = exports.cssUrlRE = exports.formatPostcssSourceMap = exports.cssPostPlugin = exports.cssPlugin = exports.isDirectCSSRequest = exports.isCSSRequest = exports.commonjsProxyRE = exports.cssLangRE = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const fast_glob_1 = __importDefault(require("fast-glob"));
const picocolors_1 = __importDefault(require("picocolors"));
const postcss_load_config_1 = __importDefault(require("postcss-load-config"));
const pluginutils_1 = require("@rollup/pluginutils");
const utils_1 = require("../utils");
const asset_1 = require("./asset");
const magic_string_1 = __importDefault(require("magic-string"));
const esbuild_1 = require("esbuild");
const preprocess_1 = require("../../../../preprocess");
const constants_1 = require("../../../../constants");
const cleanString_1 = require("../cleanString");
const shared_1 = require("@vue/shared");
const cssLangs = `\\.(css|less|sass|scss|styl|stylus|pcss|postcss)($|\\?)`;
exports.cssLangRE = new RegExp(cssLangs);
const cssModuleRE = new RegExp(`\\.module${cssLangs}`);
const directRequestRE = /(\?|&)direct\b/;
exports.commonjsProxyRE = /\?commonjs-proxy/;
const varRE = /^var\(/i;
const isCSSRequest = (request) => exports.cssLangRE.test(request) && !directRequestRE.test(request);
exports.isCSSRequest = isCSSRequest;
const isDirectCSSRequest = (request) => exports.cssLangRE.test(request) && directRequestRE.test(request);
exports.isDirectCSSRequest = isDirectCSSRequest;
const cssModulesCache = new WeakMap();
const postcssConfigCache = new WeakMap();
/**
 * Plugin applied before user plugins
 */
function cssPlugin(config) {
    let server;
    let moduleCache;
    const resolveUrl = config.createResolver({
        preferRelative: true,
        tryIndex: false,
        extensions: [],
    });
    const atImportResolvers = createCSSResolvers(config);
    return {
        name: 'vite:css',
        configureServer(_server) {
            server = _server;
        },
        buildStart() {
            // Ensure a new cache for every build (i.e. rebuilding in watch mode)
            moduleCache = new Map();
            cssModulesCache.set(config, moduleCache);
        },
        async transform(raw, id) {
            if (!exports.cssLangRE.test(id) || exports.commonjsProxyRE.test(id)) {
                return;
            }
            const urlReplacer = async (url, importer) => {
                if (url.startsWith('/') && !url.startsWith('//')) {
                    // /static/logo.png => @/static/logo.png
                    url = '@' + url;
                }
                const resolved = await resolveUrl(url, importer);
                if (resolved) {
                    return (0, asset_1.fileToUrl)(resolved, config, this, true);
                }
                return url;
            };
            const { code: css, modules, deps, } = await compileCSS(id, raw, config, urlReplacer, atImportResolvers, server);
            if (modules) {
                moduleCache.set(id, modules);
            }
            // track deps for build watch mode
            if (config.command === 'build' && config.build.watch && deps) {
                for (const file of deps) {
                    this.addWatchFile(file);
                }
            }
            return {
                code: css,
                // TODO CSS source map
                map: { mappings: '' },
            };
        },
    };
}
exports.cssPlugin = cssPlugin;
function findCssModuleIds(moduleId, cssModuleIds, seen) {
    if (!cssModuleIds) {
        cssModuleIds = new Set();
    }
    if (!seen) {
        seen = new Set();
    }
    if (seen.has(moduleId)) {
        return cssModuleIds;
    }
    seen.add(moduleId);
    const moduleInfo = this.getModuleInfo(moduleId);
    if (moduleInfo) {
        moduleInfo.importedIds.forEach((id) => {
            if (id.includes(constants_1.PAGES_JSON_JS)) {
                // 查询main.js时，需要忽略pages.json.js，否则会把所有页面样式加进来
                return;
            }
            if (exports.cssLangRE.test(id) && !exports.commonjsProxyRE.test(id)) {
                cssModuleIds.add(id);
            }
            else {
                findCssModuleIds.call(this, id, cssModuleIds, seen);
            }
        });
    }
    return cssModuleIds;
}
/**
 * Plugin applied after user plugins
 */
function cssPostPlugin(config, { chunkCssFilename, chunkCssCode, }) {
    // styles initialization in buildStart causes a styling loss in watch
    const styles = new Map();
    let cssChunks;
    return {
        name: 'vite:css-post',
        buildStart() {
            cssChunks = new Map();
        },
        async transform(css, id) {
            if (!exports.cssLangRE.test(id) || exports.commonjsProxyRE.test(id)) {
                return;
            }
            const modules = cssModulesCache.get(config).get(id);
            const modulesCode = modules && (0, pluginutils_1.dataToEsm)(modules, { namedExports: true, preferConst: true });
            // build CSS handling ----------------------------------------------------
            styles.set(id, css);
            return {
                code: modulesCode || '',
                map: { mappings: '' },
                // avoid the css module from being tree-shaken so that we can retrieve
                // it in renderChunk()
                moduleSideEffects: 'no-treeshake',
            };
        },
        async generateBundle() {
            const moduleIds = Array.from(this.getModuleIds());
            moduleIds.forEach((id) => {
                const filename = chunkCssFilename(id);
                if (filename) {
                    cssChunks.set(filename, findCssModuleIds.call(this, id));
                }
            });
            if (!cssChunks.size) {
                return;
            }
            // resolve asset URL placeholders to their built file URLs and perform
            // minification if necessary
            const processChunkCSS = async (css, { filename, inlined, minify, }) => {
                // replace asset url references with resolved url.
                css = css.replace(asset_1.assetUrlRE, (_, fileHash, postfix = '') => {
                    return (0, utils_1.normalizePath)(path_1.default.relative(path_1.default.dirname(filename), (0, asset_1.getAssetFilename)(fileHash, config) + postfix));
                });
                // only external @imports and @charset should exist at this point
                // hoist them to the top of the CSS chunk per spec (#1845 and #6333)
                if (css.includes('@import') || css.includes('@charset')) {
                    css = await hoistAtRules(css);
                }
                if (minify && config.build.minify) {
                    css = await minifyCSS(css, config);
                }
                // 压缩后再处理，小程序平台会补充 @import nvue 代码，esbuild 的压缩会把 `@import "./nvue.css";` 的空格移除，变成 `@import"./nvue.css";` 在支付宝小程序中不支持
                return chunkCssCode(filename, css);
            };
            const genCssCode = (fileName) => {
                return [...cssChunks.get(fileName)]
                    .map((id) => styles.get(id) || '')
                    .join('\n');
            };
            for (const filename of cssChunks.keys()) {
                const cssCode = genCssCode(filename);
                let source = await processChunkCSS(cssCode, {
                    filename: filename,
                    inlined: false,
                    minify: true,
                });
                this.emitFile({
                    fileName: filename,
                    type: 'asset',
                    source,
                });
            }
        },
    };
}
exports.cssPostPlugin = cssPostPlugin;
function createCSSResolvers(config) {
    let cssResolve;
    let sassResolve;
    let lessResolve;
    return {
        get css() {
            return (cssResolve ||
                (cssResolve = config.createResolver({
                    extensions: ['.css'],
                    mainFields: ['style'],
                    tryIndex: false,
                    preferRelative: true,
                })));
        },
        get sass() {
            return (sassResolve ||
                (sassResolve = config.createResolver({
                    extensions: ['.scss', '.sass', '.css'],
                    mainFields: ['sass', 'style'],
                    tryIndex: true,
                    tryPrefix: '_',
                    preferRelative: true,
                })));
        },
        get less() {
            return (lessResolve ||
                (lessResolve = config.createResolver({
                    extensions: ['.less', '.css'],
                    mainFields: ['less', 'style'],
                    tryIndex: false,
                    preferRelative: true,
                })));
        },
    };
}
function getCssResolversKeys(resolvers) {
    return Object.keys(resolvers);
}
async function compileCSS(id, code, config, urlReplacer, atImportResolvers, server) {
    var _a;
    const { modules: modulesOptions, preprocessorOptions, devSourcemap, } = config.css || {};
    const isModule = modulesOptions !== false && cssModuleRE.test(id);
    // although at serve time it can work without processing, we do need to
    // crawl them in order to register watch dependencies.
    const needInlineImport = code.includes('@import');
    const hasUrl = exports.cssUrlRE.test(code) || cssImageSetRE.test(code);
    const postcssConfig = await resolvePostcssConfig(config);
    const lang = (_a = id.match(exports.cssLangRE)) === null || _a === void 0 ? void 0 : _a[1];
    // 1. plain css that needs no processing
    if (lang === 'css' &&
        !postcssConfig &&
        !isModule &&
        !needInlineImport &&
        !hasUrl) {
        return { code, map: null };
    }
    let preprocessorMap;
    let modules;
    const deps = new Set();
    // 2. pre-processors: sass etc.
    if (isPreProcessor(lang)) {
        const preProcessor = preProcessors[lang];
        let opts = (preprocessorOptions && preprocessorOptions[lang]) || {};
        // support @import from node dependencies by default
        switch (lang) {
            case "scss" /* scss */:
            case "sass" /* sass */:
                opts = {
                    includePaths: ['node_modules'],
                    alias: config.resolve.alias,
                    ...opts,
                };
                break;
            case "less" /* less */:
            case "styl" /* styl */:
            case "stylus" /* stylus */:
                opts = {
                    paths: ['node_modules'],
                    alias: config.resolve.alias,
                    ...opts,
                };
        }
        // important: set this for relative import resolving
        opts.filename = (0, utils_1.cleanUrl)(id);
        opts.enableSourcemap = devSourcemap !== null && devSourcemap !== void 0 ? devSourcemap : false;
        const preprocessResult = await preProcessor(code, config.root, opts, atImportResolvers, !!config.nvue);
        if (preprocessResult.errors.length) {
            throw preprocessResult.errors[0];
        }
        code = preprocessResult.code;
        preprocessorMap = combineSourcemapsIfExists(opts.filename, preprocessResult.map, preprocessResult.additionalMap);
        if (preprocessResult.deps) {
            preprocessResult.deps.forEach((dep) => {
                // sometimes sass registers the file itself as a dep
                if ((0, utils_1.normalizePath)(dep) !== (0, utils_1.normalizePath)(opts.filename)) {
                    deps.add(dep);
                }
            });
        }
    }
    // 3. postcss
    const postcssOptions = (postcssConfig && postcssConfig.options) || {};
    const postcssPlugins = postcssConfig && postcssConfig.plugins ? postcssConfig.plugins.slice() : [];
    if (needInlineImport) {
        postcssPlugins.unshift((await Promise.resolve().then(() => __importStar(require('postcss-import')))).default({
            async resolve(id, basedir) {
                // const publicFile = checkPublicFile(id, config)
                // if (publicFile) {
                //   return publicFile
                // }
                const resolved = await atImportResolvers.css(id, path_1.default.join(basedir, '*'));
                if (resolved) {
                    return path_1.default.resolve(resolved);
                }
                return id;
            },
        }));
    }
    postcssPlugins.push(UrlRewritePostcssPlugin({
        replacer: urlReplacer,
    }));
    if (isModule) {
        postcssPlugins.unshift((await Promise.resolve().then(() => __importStar(require('postcss-modules')))).default({
            ...modulesOptions,
            getJSON(cssFileName, _modules, outputFileName) {
                modules = _modules;
                if (modulesOptions && (0, shared_1.isFunction)(modulesOptions.getJSON)) {
                    modulesOptions.getJSON(cssFileName, _modules, outputFileName);
                }
            },
            async resolve(id) {
                for (const key of getCssResolversKeys(atImportResolvers)) {
                    const resolved = await atImportResolvers[key](id);
                    if (resolved) {
                        return path_1.default.resolve(resolved);
                    }
                }
                return id;
            },
        }));
    }
    if (!postcssPlugins.length) {
        return {
            code,
            map: preprocessorMap,
        };
    }
    // postcss is an unbundled dep and should be lazy imported
    const postcssResult = await (await Promise.resolve().then(() => __importStar(require('postcss'))))
        .default(postcssPlugins)
        .process(code, {
        ...postcssOptions,
        to: id,
        from: id,
        ...(devSourcemap
            ? {
                map: {
                    inline: false,
                    annotation: false,
                    // postcss may return virtual files
                    // we cannot obtain content of them, so this needs to be enabled
                    sourcesContent: true,
                    // when "prev: preprocessorMap", the result map may include duplicate filename in `postcssResult.map.sources`
                    // prev: preprocessorMap,
                },
            }
            : {}),
    });
    // record CSS dependencies from @imports
    for (const message of postcssResult.messages) {
        if (message.type === 'dependency') {
            deps.add((0, utils_1.normalizePath)(message.file));
        }
        else if (message.type === 'dir-dependency') {
            // https://github.com/postcss/postcss/blob/main/docs/guidelines/plugin.md#3-dependencies
            const { dir, glob: globPattern = '**' } = message;
            const pattern = (0, utils_1.normalizePath)(path_1.default.resolve(path_1.default.dirname(id), dir)) + `/` + globPattern;
            const files = fast_glob_1.default.sync(pattern, {
                ignore: ['**/node_modules/**'],
            });
            for (let i = 0; i < files.length; i++) {
                deps.add(files[i]);
            }
            if (server) {
                // register glob importers so we can trigger updates on file add/remove
                if (!(id in server._globImporters)) {
                    ;
                    server._globImporters[id] = {
                        module: server.moduleGraph.getModuleById(id),
                        importGlobs: [],
                    };
                }
                ;
                server._globImporters[id].importGlobs.push({
                    base: config.root,
                    pattern,
                });
            }
        }
        else if (message.type === 'warning') {
            let msg = `[vite:css] ${message.text}`;
            if (message.line && message.column) {
                msg += `\n${(0, utils_1.generateCodeFrame)(code, {
                    line: message.line,
                    column: message.column,
                })}`;
            }
            config.logger.warn(picocolors_1.default.yellow(msg));
        }
    }
    if (!devSourcemap) {
        return {
            ast: postcssResult,
            code: postcssResult.css,
            map: { mappings: '' },
            modules,
            deps,
        };
    }
    const rawPostcssMap = postcssResult.map.toJSON();
    const postcssMap = formatPostcssSourceMap(
    // version property of rawPostcssMap is declared as string
    // but actually it is a number
    rawPostcssMap, (0, utils_1.cleanUrl)(id));
    return {
        ast: postcssResult,
        code: postcssResult.css,
        map: combineSourcemapsIfExists((0, utils_1.cleanUrl)(id), postcssMap, preprocessorMap),
        modules,
        deps,
    };
}
function formatPostcssSourceMap(rawMap, file) {
    const inputFileDir = path_1.default.dirname(file);
    const sources = rawMap.sources.map((source) => {
        const cleanSource = (0, utils_1.cleanUrl)(decodeURIComponent(source));
        // postcss returns virtual files
        if (/^<.+>$/.test(cleanSource)) {
            return `\0${cleanSource}`;
        }
        return (0, utils_1.normalizePath)(path_1.default.resolve(inputFileDir, cleanSource));
    });
    return {
        file,
        mappings: rawMap.mappings,
        names: rawMap.names,
        sources,
        sourcesContent: rawMap.sourcesContent,
        version: rawMap.version,
    };
}
exports.formatPostcssSourceMap = formatPostcssSourceMap;
function combineSourcemapsIfExists(filename, map1, map2) {
    return map1 && map2
        ? (0, utils_1.combineSourcemaps)(filename, [
            // type of version property of ExistingRawSourceMap is number
            // but it is always 3
            map1,
            map2,
        ])
        : map1;
}
async function resolvePostcssConfig(config) {
    var _a;
    let result = postcssConfigCache.get(config);
    if (result !== undefined) {
        return result;
    }
    // inline postcss config via vite config
    const inlineOptions = (_a = config.css) === null || _a === void 0 ? void 0 : _a.postcss;
    if ((0, utils_1.isObject)(inlineOptions)) {
        const options = { ...inlineOptions };
        delete options.plugins;
        result = {
            options,
            plugins: inlineOptions.plugins || [],
        };
    }
    else {
        const searchPath = (0, shared_1.isString)(inlineOptions) ? inlineOptions : config.root;
        try {
            // @ts-ignore
            result = await (0, postcss_load_config_1.default)({}, searchPath);
        }
        catch (e) {
            if (!/No PostCSS Config found/.test(e.message)) {
                if (e instanceof Error) {
                    const { name, message, stack } = e;
                    e.name = 'Failed to load PostCSS config';
                    e.message = `Failed to load PostCSS config (searchPath: ${searchPath}): [${name}] ${message}\n${stack}`;
                    e.stack = ''; // add stack to message to retain stack
                    throw e;
                }
                else {
                    throw new Error(`Failed to load PostCSS config: ${e}`);
                }
            }
            result = null;
        }
    }
    postcssConfigCache.set(config, result);
    return result;
}
// https://drafts.csswg.org/css-syntax-3/#identifier-code-point
exports.cssUrlRE = /(?<=^|[^\w\-\u0080-\uffff])url\(\s*('[^']+'|"[^"]+"|[^'")]+)\s*\)/;
exports.cssDataUriRE = /(?<=^|[^\w\-\u0080-\uffff])data-uri\(\s*('[^']+'|"[^"]+"|[^'")]+)\s*\)/;
exports.importCssRE = /@import ('[^']+\.css'|"[^"]+\.css"|[^'")]+\.css)/;
const cssImageSetRE = /(?<=image-set\()((?:[\w\-]+\([^\)]*\)|[^)])*)(?=\))/;
const UrlRewritePostcssPlugin = (opts) => {
    if (!opts) {
        throw new Error('base or replace is required');
    }
    return {
        postcssPlugin: 'vite-url-rewrite',
        Once(root) {
            const promises = [];
            root.walkDecls((declaration) => {
                const isCssUrl = exports.cssUrlRE.test(declaration.value);
                const isCssImageSet = cssImageSetRE.test(declaration.value);
                if (isCssUrl || isCssImageSet) {
                    const replacerForDeclaration = (rawUrl) => {
                        var _a;
                        const importer = (_a = declaration.source) === null || _a === void 0 ? void 0 : _a.input.file;
                        return opts.replacer(rawUrl, importer);
                    };
                    const rewriterToUse = isCssImageSet
                        ? rewriteCssImageSet
                        : rewriteCssUrls;
                    promises.push(rewriterToUse(declaration.value, replacerForDeclaration).then((url) => {
                        declaration.value = url;
                    }));
                }
            });
            if (promises.length) {
                return Promise.all(promises);
            }
        },
    };
};
UrlRewritePostcssPlugin.postcss = true;
function rewriteCssUrls(css, replacer) {
    return (0, utils_1.asyncReplace)(css, exports.cssUrlRE, async (match) => {
        const [matched, rawUrl] = match;
        return await doUrlReplace(rawUrl, matched, replacer);
    });
}
function rewriteCssDataUris(css, replacer) {
    return (0, utils_1.asyncReplace)(css, exports.cssDataUriRE, async (match) => {
        const [matched, rawUrl] = match;
        return await doUrlReplace(rawUrl, matched, replacer, 'data-uri');
    });
}
function rewriteImportCss(css, replacer) {
    return (0, utils_1.asyncReplace)(css, exports.importCssRE, async (match) => {
        const [matched, rawUrl] = match;
        return await doImportCSSReplace(rawUrl, matched, replacer);
    });
}
// TODO: image and cross-fade could contain a "url" that needs to be processed
// https://drafts.csswg.org/css-images-4/#image-notation
// https://drafts.csswg.org/css-images-4/#cross-fade-function
const cssNotProcessedRE = /(gradient|element|cross-fade|image)\(/;
async function rewriteCssImageSet(css, replacer) {
    return await (0, utils_1.asyncReplace)(css, cssImageSetRE, async (match) => {
        const [, rawUrl] = match;
        const url = await (0, utils_1.processSrcSet)(rawUrl, async ({ url }) => {
            // the url maybe url(...)
            if (exports.cssUrlRE.test(url)) {
                return await rewriteCssUrls(url, replacer);
            }
            if (!cssNotProcessedRE.test(url)) {
                return await doUrlReplace(url, url, replacer);
            }
            return url;
        });
        return url;
    });
}
async function doUrlReplace(rawUrl, matched, replacer, funcName = 'url') {
    let wrap = '';
    const first = rawUrl[0];
    if (first === `"` || first === `'`) {
        wrap = first;
        rawUrl = rawUrl.slice(1, -1);
    }
    if ((0, utils_1.isExternalUrl)(rawUrl) ||
        (0, utils_1.isDataUrl)(rawUrl) ||
        rawUrl.startsWith('#') ||
        varRE.test(rawUrl)) {
        return matched;
    }
    const newUrl = await replacer(rawUrl);
    if (wrap === '' && newUrl !== encodeURI(newUrl)) {
        // The new url might need wrapping even if the original did not have it, e.g. if a space was added during replacement
        wrap = "'";
    }
    return `${funcName}(${wrap}${newUrl}${wrap})`;
}
async function doImportCSSReplace(rawUrl, matched, replacer) {
    let wrap = '';
    const first = rawUrl[0];
    if (first === `"` || first === `'`) {
        wrap = first;
        rawUrl = rawUrl.slice(1, -1);
    }
    if ((0, utils_1.isExternalUrl)(rawUrl) || (0, utils_1.isDataUrl)(rawUrl) || rawUrl.startsWith('#')) {
        return matched;
    }
    return `@import ${wrap}${await replacer(rawUrl)}${wrap}`;
}
async function minifyCSS(css, config) {
    try {
        const { code, warnings } = await (0, esbuild_1.transform)(css, {
            loader: 'css',
            minify: true,
            target: config.build.cssTarget || undefined,
        });
        if (warnings.length) {
            const msgs = await (0, esbuild_1.formatMessages)(warnings, { kind: 'warning' });
            config.logger.warn(picocolors_1.default.yellow(`warnings when minifying css:\n${msgs.join('\n')}`));
        }
        return code;
    }
    catch (e) {
        if (e.errors) {
            const msgs = await (0, esbuild_1.formatMessages)(e.errors, { kind: 'error' });
            e.frame = '\n' + msgs.join('\n');
            e.loc = e.errors[0].location;
        }
        throw e;
    }
}
exports.minifyCSS = minifyCSS;
async function hoistAtRules(css) {
    const s = new magic_string_1.default(css);
    const cleanCss = (0, cleanString_1.emptyCssComments)(css);
    let match;
    // #1845
    // CSS @import can only appear at top of the file. We need to hoist all @import
    // to top when multiple files are concatenated.
    // match until semicolon that's not in quotes
    const atImportRE = /@import\s*(?:url\([^\)]*\)|"([^"]|(?<=\\)")*"|'([^']|(?<=\\)')*'|[^;]*).*?;/gm;
    while ((match = atImportRE.exec(cleanCss))) {
        s.remove(match.index, match.index + match[0].length);
        // Use `appendLeft` instead of `prepend` to preserve original @import order
        s.appendLeft(0, match[0]);
    }
    // #6333
    // CSS @charset must be the top-first in the file, hoist the first to top
    const atCharsetRE = /@charset\s*(?:"([^"]|(?<=\\)")*"|'([^']|(?<=\\)')*'|[^;]*).*?;/gm;
    let foundCharset = false;
    while ((match = atCharsetRE.exec(cleanCss))) {
        s.remove(match.index, match.index + match[0].length);
        if (!foundCharset) {
            s.prepend(match[0]);
            foundCharset = true;
        }
    }
    return s.toString();
}
exports.hoistAtRules = hoistAtRules;
const loadedPreprocessors = {};
function loadPreprocessor(lang, root) {
    var _a, _b;
    if (lang in loadedPreprocessors) {
        return loadedPreprocessors[lang];
    }
    try {
        // Search for the preprocessor in the root directory first, and fall back
        // to the default require paths.
        const fallbackPaths = ((_b = (_a = require.resolve).paths) === null || _b === void 0 ? void 0 : _b.call(_a, lang)) || [];
        const resolved = require.resolve(lang, { paths: [root, ...fallbackPaths] });
        return (loadedPreprocessors[lang] = require(resolved));
    }
    catch (e) {
        throw new Error(`Preprocessor dependency "${lang}" not found. Did you install it?`);
    }
}
// .scss/.sass processor
const scss = async (source, root, options, resolvers, isNVue) => {
    const render = loadPreprocessor("sass" /* sass */, root).render;
    const internalImporter = (url, importer, done) => {
        resolvers.sass(url, importer).then((resolved) => {
            if (resolved) {
                rebaseUrls(resolved, options.filename, options.alias, isNVue)
                    .then((data) => done === null || done === void 0 ? void 0 : done(data))
                    .catch((data) => done === null || done === void 0 ? void 0 : done(data));
            }
            else {
                done === null || done === void 0 ? void 0 : done(null);
            }
        });
    };
    const importer = [internalImporter];
    if (options.importer) {
        (0, shared_1.isArray)(options.importer)
            ? importer.push(...options.importer)
            : importer.push(options.importer);
    }
    const { content: data, map: additionalMap } = await getSource(source, options.filename, options.additionalData, options.enableSourcemap);
    const finalOptions = {
        ...options,
        data,
        file: options.filename,
        outFile: options.filename,
        importer,
        ...(options.enableSourcemap
            ? {
                sourceMap: true,
                omitSourceMapUrl: true,
                sourceMapRoot: path_1.default.dirname(options.filename),
            }
            : {}),
    };
    try {
        const result = await new Promise((resolve, reject) => {
            render(finalOptions, (err, res) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
        });
        const deps = result.stats.includedFiles;
        const map = result.map
            ? JSON.parse(result.map.toString())
            : undefined;
        return {
            code: result.css.toString(),
            map,
            additionalMap,
            errors: [],
            deps,
        };
    }
    catch (e) {
        // normalize SASS error
        e.id = e.file;
        e.frame = e.formatted;
        return { code: '', errors: [e], deps: [] };
    }
};
const sass = (source, root, options, aliasResolver, isNVue) => scss(source, root, {
    ...options,
    indentedSyntax: true,
}, aliasResolver, isNVue);
function preprocessCss(content, isNVue = false) {
    if (content.includes('#endif')) {
        return isNVue ? (0, preprocess_1.preNVueCss)(content) : (0, preprocess_1.preCss)(content);
    }
    return content;
}
/**
 * relative url() inside \@imported sass and less files must be rebased to use
 * root file as base.
 */
async function rebaseUrls(file, rootFile, alias, isNVue = false) {
    file = path_1.default.resolve(file); // ensure os-specific flashes
    // fixed by xxxxxx 条件编译
    let contents = preprocessCss(fs_1.default.readFileSync(file, 'utf-8'), isNVue);
    // in the same dir, no need to rebase
    const fileDir = path_1.default.dirname(file);
    const rootDir = path_1.default.dirname(rootFile);
    if (fileDir === rootDir) {
        return { file, contents };
    }
    // no url()
    const hasUrls = exports.cssUrlRE.test(contents);
    // data-uri() calls
    const hasDataUris = exports.cssDataUriRE.test(contents);
    // no @import xxx.css
    const hasImportCss = exports.importCssRE.test(contents);
    if (!hasUrls && !hasDataUris && !hasImportCss) {
        return { file, contents };
    }
    let rebased;
    const rebaseFn = (url) => {
        if (url.startsWith('/'))
            return url;
        // match alias, no need to rewrite
        for (const { find } of alias) {
            const matches = (0, shared_1.isString)(find) ? url.startsWith(find) : find.test(url);
            if (matches) {
                return url;
            }
        }
        const absolute = path_1.default.resolve(fileDir, url);
        const relative = path_1.default.relative(rootDir, absolute);
        return (0, utils_1.normalizePath)(relative);
    };
    // fix css imports in less such as `@import "foo.css"`
    if (hasImportCss) {
        contents = await rewriteImportCss(contents, rebaseFn);
    }
    if (hasUrls) {
        contents = await rewriteCssUrls(rebased || contents, rebaseFn);
    }
    if (hasDataUris) {
        contents = await rewriteCssDataUris(rebased || contents, rebaseFn);
    }
    return {
        file,
        contents,
    };
}
// .less
const less = async (source, root, options, resolvers, isNVue) => {
    const nodeLess = loadPreprocessor("less" /* less */, root);
    const viteResolverPlugin = createViteLessPlugin(nodeLess, options.filename, options.alias, resolvers, isNVue);
    const { content, map: additionalMap } = await getSource(source, options.filename, options.additionalData, options.enableSourcemap);
    let result;
    try {
        result = await nodeLess.render(content, {
            ...options,
            plugins: [viteResolverPlugin, ...(options.plugins || [])],
            ...(options.enableSourcemap
                ? {
                    sourceMap: {
                        outputSourceFiles: true,
                        sourceMapFileInline: false,
                    },
                }
                : {}),
        });
    }
    catch (e) {
        const error = e;
        // normalize error info
        const normalizedError = new Error(error.message || error.type);
        normalizedError.loc = {
            file: error.filename || options.filename,
            line: error.line,
            column: error.column,
        };
        return { code: '', errors: [normalizedError], deps: [] };
    }
    const map = result.map && JSON.parse(result.map);
    if (map) {
        delete map.sourcesContent;
    }
    return {
        code: result.css.toString(),
        map,
        additionalMap,
        deps: result.imports,
        errors: [],
    };
};
/**
 * Less manager, lazy initialized
 */
let ViteLessManager;
function createViteLessPlugin(less, rootFile, alias, resolvers, isNVue) {
    if (!ViteLessManager) {
        ViteLessManager = class ViteManager extends less.FileManager {
            constructor(rootFile, resolvers, alias) {
                super();
                this.rootFile = rootFile;
                this.resolvers = resolvers;
                this.alias = alias;
            }
            supports() {
                return true;
            }
            supportsSync() {
                return false;
            }
            async loadFile(filename, dir, opts, env) {
                const resolved = await this.resolvers.less(filename, path_1.default.join(dir, '*'));
                if (resolved) {
                    const result = await rebaseUrls(resolved, this.rootFile, this.alias, isNVue);
                    let contents;
                    if (result && 'contents' in result) {
                        contents = result.contents;
                    }
                    else {
                        contents = fs_1.default.readFileSync(resolved, 'utf-8');
                    }
                    return {
                        filename: path_1.default.resolve(resolved),
                        contents,
                    };
                }
                else {
                    return super.loadFile(filename, dir, opts, env);
                }
            }
        };
    }
    return {
        install(_, pluginManager) {
            pluginManager.addFileManager(new ViteLessManager(rootFile, resolvers, alias));
        },
        minVersion: [3, 0, 0],
    };
}
// .styl
const styl = async (source, root, options) => {
    var _a;
    const nodeStylus = loadPreprocessor("stylus" /* stylus */, root);
    // Get source with preprocessor options.additionalData. Make sure a new line separator
    // is added to avoid any render error, as added stylus content may not have semi-colon separators
    const { content, map: additionalMap } = await getSource(source, options.filename, options.additionalData, options.enableSourcemap, '\n');
    // Get preprocessor options.imports dependencies as stylus
    // does not return them with its builtin `.deps()` method
    const importsDeps = ((_a = options.imports) !== null && _a !== void 0 ? _a : []).map((dep) => path_1.default.resolve(dep));
    try {
        const ref = nodeStylus(content, options);
        if (options.enableSourcemap) {
            ref.set('sourcemap', {
                comment: false,
                inline: false,
                basePath: root,
            });
        }
        const result = ref.render();
        // Concat imports deps with computed deps
        const deps = [...ref.deps(), ...importsDeps];
        // @ts-expect-error sourcemap exists
        const map = ref.sourcemap;
        return {
            code: result,
            map: formatStylusSourceMap(map, root),
            additionalMap,
            errors: [],
            deps,
        };
    }
    catch (e) {
        return { code: '', errors: [e], deps: [] };
    }
};
function formatStylusSourceMap(mapBefore, root) {
    if (!mapBefore)
        return undefined;
    const map = { ...mapBefore };
    const resolveFromRoot = (p) => (0, utils_1.normalizePath)(path_1.default.resolve(root, p));
    if (map.file) {
        map.file = resolveFromRoot(map.file);
    }
    map.sources = map.sources.map(resolveFromRoot);
    return map;
}
async function getSource(source, filename, additionalData, enableSourcemap, sep = '') {
    if (!additionalData)
        return { content: source };
    if ((0, shared_1.isFunction)(additionalData)) {
        const newContent = await additionalData(source, filename);
        if ((0, shared_1.isString)(newContent)) {
            return { content: newContent };
        }
        return newContent;
    }
    if (!enableSourcemap) {
        return { content: additionalData + sep + source };
    }
    const ms = new magic_string_1.default(source);
    ms.appendLeft(0, sep);
    ms.appendLeft(0, additionalData);
    const map = ms.generateMap({ hires: true });
    map.file = filename;
    map.sources = [filename];
    return {
        content: ms.toString(),
        map,
    };
}
const preProcessors = Object.freeze({
    ["less" /* less */]: less,
    ["sass" /* sass */]: sass,
    ["scss" /* scss */]: scss,
    ["styl" /* styl */]: styl,
    ["stylus" /* stylus */]: styl,
});
function isPreProcessor(lang) {
    return lang && lang in preProcessors;
}

}, function(modId) { var map = {"../utils":1660207800526,"./asset":1660207800525,"../../../../preprocess":1660207800515,"../../../../constants":1660207800503,"../cleanString":1660207800529}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800529, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.emptyCssComments = void 0;
const utils_1 = require("./utils");
const blankReplacer = (s) => ' '.repeat(s.length);
function emptyCssComments(raw) {
    return raw.replace(utils_1.multilineCommentsRE, blankReplacer);
}
exports.emptyCssComments = emptyCssComments;

}, function(modId) { var map = {"./utils":1660207800526}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800530, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findMiniProgramUsingComponents = exports.isMiniProgramUsingComponent = exports.addMiniProgramUsingComponents = exports.addMiniProgramComponentJson = exports.addMiniProgramPageJson = exports.addMiniProgramAppJson = exports.findChangedJsonFiles = exports.normalizeJsonFilename = exports.findUsingComponents = exports.findJsonFile = exports.getComponentJsonFilenames = exports.hasJsonFile = exports.isMiniProgramPageSfcFile = exports.isMiniProgramPageFile = void 0;
const path_1 = __importDefault(require("path"));
const shared_1 = require("@vue/shared");
const utils_1 = require("../../utils");
const resolve_1 = require("../../resolve");
const utils_2 = require("../../vue/utils");
let appJsonCache = {};
const jsonFilesCache = new Map();
const jsonPagesCache = new Map();
const jsonComponentsCache = new Map();
const jsonUsingComponentsCache = new Map();
function isMiniProgramPageFile(file, inputDir) {
    if (inputDir && path_1.default.isAbsolute(file)) {
        file = (0, utils_1.normalizePath)(path_1.default.relative(inputDir, file));
    }
    return jsonPagesCache.has((0, utils_1.removeExt)(file));
}
exports.isMiniProgramPageFile = isMiniProgramPageFile;
function isMiniProgramPageSfcFile(file, inputDir) {
    return (0, utils_2.isVueSfcFile)(file) && isMiniProgramPageFile(file, inputDir);
}
exports.isMiniProgramPageSfcFile = isMiniProgramPageSfcFile;
function hasJsonFile(filename) {
    return (filename === 'app' ||
        jsonPagesCache.has(filename) ||
        jsonComponentsCache.has(filename));
}
exports.hasJsonFile = hasJsonFile;
function getComponentJsonFilenames() {
    return [...jsonComponentsCache.keys()];
}
exports.getComponentJsonFilenames = getComponentJsonFilenames;
function findJsonFile(filename) {
    if (filename === 'app') {
        return appJsonCache;
    }
    return jsonPagesCache.get(filename) || jsonComponentsCache.get(filename);
}
exports.findJsonFile = findJsonFile;
function findUsingComponents(filename) {
    return jsonUsingComponentsCache.get(filename);
}
exports.findUsingComponents = findUsingComponents;
function normalizeJsonFilename(filename) {
    return (0, utils_1.normalizeNodeModules)(filename);
}
exports.normalizeJsonFilename = normalizeJsonFilename;
function findChangedJsonFiles(supportGlobalUsingComponents = true) {
    const changedJsonFiles = new Map();
    function findChangedFile(filename, json) {
        var _a;
        const newJson = JSON.parse(JSON.stringify(json));
        if (!newJson.usingComponents) {
            newJson.usingComponents = {};
        }
        (0, shared_1.extend)(newJson.usingComponents, jsonUsingComponentsCache.get(filename));
        // 格式化为相对路径，这样作为分包也可以直接运行
        // app.json mp-baidu 在 win 不支持相对路径。所有平台改用绝对路径
        if (filename !== 'app') {
            let usingComponents = newJson.usingComponents;
            const globalUsingComponents = (_a = appJsonCache === null || appJsonCache === void 0 ? void 0 : appJsonCache.usingComponents) !== null && _a !== void 0 ? _a : {};
            // 如果小程序不支持 global 的 usingComponents
            if (!supportGlobalUsingComponents) {
                // 从 appJsonCache 中读取全局的 usingComponents 并补充到子组件 usingComponents 中
                usingComponents = {
                    ...globalUsingComponents,
                    ...newJson.usingComponents,
                };
            }
            Object.keys(usingComponents).forEach((name) => {
                const componentFilename = usingComponents[name];
                if (componentFilename.startsWith('/')) {
                    usingComponents[name] = (0, resolve_1.relativeFile)(filename, componentFilename.slice(1));
                }
            });
            newJson.usingComponents = usingComponents;
        }
        const jsonStr = JSON.stringify(newJson, null, 2);
        if (jsonFilesCache.get(filename) !== jsonStr) {
            changedJsonFiles.set(filename, jsonStr);
            jsonFilesCache.set(filename, jsonStr);
        }
    }
    function findChangedFiles(jsonsCache) {
        for (const name of jsonsCache.keys()) {
            findChangedFile(name, jsonsCache.get(name));
        }
    }
    findChangedFile('app', appJsonCache);
    findChangedFiles(jsonPagesCache);
    findChangedFiles(jsonComponentsCache);
    return changedJsonFiles;
}
exports.findChangedJsonFiles = findChangedJsonFiles;
function addMiniProgramAppJson(appJson) {
    appJsonCache = appJson;
}
exports.addMiniProgramAppJson = addMiniProgramAppJson;
function addMiniProgramPageJson(filename, json) {
    jsonPagesCache.set(filename, json);
}
exports.addMiniProgramPageJson = addMiniProgramPageJson;
function addMiniProgramComponentJson(filename, json) {
    jsonComponentsCache.set(filename, json);
}
exports.addMiniProgramComponentJson = addMiniProgramComponentJson;
function addMiniProgramUsingComponents(filename, json) {
    jsonUsingComponentsCache.set(filename, json);
}
exports.addMiniProgramUsingComponents = addMiniProgramUsingComponents;
function isMiniProgramUsingComponent(name, options) {
    return !!findMiniProgramUsingComponents(options)[name];
}
exports.isMiniProgramUsingComponent = isMiniProgramUsingComponent;
function findMiniProgramUsingComponents({ filename, inputDir, componentsDir, }) {
    const globalUsingComponents = appJsonCache && appJsonCache.usingComponents;
    const miniProgramComponents = {};
    if (globalUsingComponents) {
        (0, shared_1.extend)(miniProgramComponents, findMiniProgramUsingComponent(globalUsingComponents, componentsDir));
    }
    const jsonFile = findJsonFile((0, utils_1.removeExt)((0, utils_1.normalizeMiniProgramFilename)(filename, inputDir)));
    if (jsonFile === null || jsonFile === void 0 ? void 0 : jsonFile.usingComponents) {
        (0, shared_1.extend)(miniProgramComponents, findMiniProgramUsingComponent(jsonFile.usingComponents, componentsDir));
    }
    return miniProgramComponents;
}
exports.findMiniProgramUsingComponents = findMiniProgramUsingComponents;
function findMiniProgramUsingComponent(usingComponents, componentsDir) {
    return Object.keys(usingComponents).reduce((res, name) => {
        const path = usingComponents[name];
        if (path.includes('plugin://')) {
            res[name] = 'plugin';
        }
        else if (componentsDir && path.includes(componentsDir + '/')) {
            res[name] = 'component';
        }
        return res;
    }, {});
}

}, function(modId) { var map = {"../../utils":1660207800502,"../../resolve":1660207800531,"../../vue/utils":1660207800533}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800531, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveComponentsLibPath = exports.resolveVueI18nRuntime = exports.resolveBuiltIn = exports.getBuiltInPaths = exports.resolveMainPathOnce = exports.relativeFile = exports.requireResolve = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const debug_1 = __importDefault(require("debug"));
const resolve_1 = __importDefault(require("resolve"));
const uni_shared_1 = require("@dcloudio/uni-shared");
const utils_1 = require("./utils");
const env_1 = require("./hbx/env");
const constants_1 = require("./constants");
function requireResolve(filename, basedir) {
    return resolveWithSymlinks(filename, basedir);
}
exports.requireResolve = requireResolve;
function resolveWithSymlinks(id, basedir) {
    return resolve_1.default.sync(id, {
        basedir,
        extensions: constants_1.extensions,
        // necessary to work with pnpm
        preserveSymlinks: true,
        pathFilter(pkg, filepath, relativePath) {
            if (pkg.dcloudext && pkg.dcloudext.type === 'native-uts') {
                if (process.env.UNI_APP_PLATFORM === 'app-android' ||
                    process.env.UNI_APP_PLATFORM === 'app-ios') {
                    const file = process.env.UNI_APP_PLATFORM + '/index.uts';
                    if (fs_1.default.existsSync(path_1.default.join(filepath.replace(relativePath, ''), file))) {
                        return file;
                    }
                }
            }
            return relativePath;
        },
    });
}
function relativeFile(from, to) {
    const relativePath = (0, utils_1.normalizePath)(path_1.default.relative(path_1.default.dirname(from), to));
    return relativePath.startsWith('.') ? relativePath : './' + relativePath;
}
exports.relativeFile = relativeFile;
exports.resolveMainPathOnce = (0, uni_shared_1.once)((inputDir) => {
    const mainTsPath = path_1.default.resolve(inputDir, 'main.ts');
    if (fs_1.default.existsSync(mainTsPath)) {
        return (0, utils_1.normalizePath)(mainTsPath);
    }
    return (0, utils_1.normalizePath)(path_1.default.resolve(inputDir, 'main.js'));
});
const ownerModules = ['@dcloudio/uni-app', '@dcloudio/vite-plugin-uni'];
const paths = [];
function resolveNodeModulePath(modulePath) {
    const nodeModulesPaths = [];
    const nodeModulesPath = path_1.default.join(modulePath, 'node_modules');
    if (fs_1.default.existsSync(nodeModulesPath)) {
        nodeModulesPaths.push(nodeModulesPath);
    }
    const index = modulePath.lastIndexOf('node_modules');
    if (index > -1) {
        nodeModulesPaths.push(path_1.default.join(modulePath.slice(0, index), 'node_modules'));
    }
    return nodeModulesPaths;
}
function initPaths() {
    const cliContext = process.env.UNI_CLI_CONTEXT;
    if (cliContext) {
        const pathSet = new Set();
        pathSet.add(path_1.default.join(cliContext, 'node_modules'));
        if (!(0, env_1.isInHBuilderX)()) {
            ;
            [`@dcloudio/uni-` + process.env.UNI_PLATFORM, ...ownerModules].forEach((ownerModule) => {
                let pkgPath = '';
                try {
                    pkgPath = require.resolve(ownerModule + '/package.json', {
                        paths: [cliContext],
                    });
                }
                catch (e) { }
                if (pkgPath) {
                    resolveNodeModulePath(path_1.default.dirname(pkgPath)).forEach((nodeModulePath) => {
                        pathSet.add(nodeModulePath);
                    });
                }
            });
        }
        paths.push(...pathSet);
        (0, debug_1.default)('uni-paths')(paths);
    }
}
function getBuiltInPaths() {
    if (!paths.length) {
        initPaths();
    }
    return paths;
}
exports.getBuiltInPaths = getBuiltInPaths;
function resolveBuiltIn(path) {
    return require.resolve(path, { paths: getBuiltInPaths() });
}
exports.resolveBuiltIn = resolveBuiltIn;
function resolveVueI18nRuntime() {
    return path_1.default.resolve(__dirname, '../lib/vue-i18n/dist/vue-i18n.runtime.esm-bundler.js');
}
exports.resolveVueI18nRuntime = resolveVueI18nRuntime;
let componentsLibPath = '';
function resolveComponentsLibPath() {
    if (!componentsLibPath) {
        if ((0, env_1.isInHBuilderX)()) {
            componentsLibPath = path_1.default.join(resolveBuiltIn('@dcloudio/uni-components/package.json'), '../lib');
        }
        else {
            componentsLibPath = path_1.default.join(resolveWithSymlinks('@dcloudio/uni-components/package.json', process.env.UNI_INPUT_DIR), '../lib');
        }
    }
    return componentsLibPath;
}
exports.resolveComponentsLibPath = resolveComponentsLibPath;

}, function(modId) { var map = {"fs":1660207800499,"resolve":1660207800531,"./utils":1660207800502,"./hbx/env":1660207800532,"./constants":1660207800503}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800532, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initModulePaths = exports.runByHBuilderX = exports.isInHBuilderX = void 0;
const path_1 = __importDefault(require("path"));
const module_1 = __importDefault(require("module"));
const uni_shared_1 = require("@dcloudio/uni-shared");
exports.isInHBuilderX = (0, uni_shared_1.once)(() => {
    try {
        const { name } = require(path_1.default.resolve(process.cwd(), '../about/package.json'));
        if (name === 'about') {
            process.env.UNI_HBUILDERX_PLUGINS = path_1.default.resolve(process.cwd(), '..');
            return true;
        }
    }
    catch (e) {
        // console.error(e)
    }
    return false;
});
exports.runByHBuilderX = (0, uni_shared_1.once)(() => {
    return !!process.env.UNI_HBUILDERX_PLUGINS;
});
/**
 * 增加 node_modules
 */
function initModulePaths() {
    if (!(0, exports.isInHBuilderX)()) {
        return;
    }
    const Module = module.constructor.length > 1 ? module.constructor : module_1.default;
    const nodeModulesPath = path_1.default.resolve(process.env.UNI_CLI_CONTEXT, 'node_modules');
    const oldNodeModulePaths = Module._nodeModulePaths;
    Module._nodeModulePaths = function (from) {
        const paths = oldNodeModulePaths.call(this, from);
        if (!paths.includes(nodeModulesPath)) {
            paths.push(nodeModulesPath);
        }
        return paths;
    };
}
exports.initModulePaths = initModulePaths;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800533, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.renameProp = exports.getBaseNodeTransforms = exports.createUniVueTransformAssetUrls = exports.createBindDirectiveNode = exports.createOnDirectiveNode = exports.createDirectiveNode = exports.addStaticClass = exports.createAttributeNode = exports.isUserComponent = exports.isVueSfcFile = exports.VUE_REF_IN_FOR = exports.VUE_REF = void 0;
const shared_1 = require("@vue/shared");
const uni_shared_1 = require("@dcloudio/uni-shared");
const compiler_core_1 = require("@vue/compiler-core");
const templateTransformAssetUrl_1 = require("./transforms/templateTransformAssetUrl");
const templateTransformSrcset_1 = require("./transforms/templateTransformSrcset");
const ast_1 = require("../vite/utils/ast");
const url_1 = require("../vite/utils/url");
const constants_1 = require("../constants");
exports.VUE_REF = 'r';
exports.VUE_REF_IN_FOR = 'r-i-f';
function isVueSfcFile(id) {
    const { filename, query } = (0, url_1.parseVueRequest)(id);
    return constants_1.EXTNAME_VUE_RE.test(filename) && !query.vue;
}
exports.isVueSfcFile = isVueSfcFile;
function isUserComponent(node, context) {
    return (node.type === 1 /* ELEMENT */ &&
        node.tagType === 1 /* COMPONENT */ &&
        !(0, uni_shared_1.isComponentTag)(node.tag) &&
        !(0, compiler_core_1.isCoreComponent)(node.tag) &&
        !context.isBuiltInComponent(node.tag));
}
exports.isUserComponent = isUserComponent;
function createAttributeNode(name, content) {
    return {
        type: 6 /* ATTRIBUTE */,
        loc: compiler_core_1.locStub,
        name,
        value: {
            type: 2 /* TEXT */,
            loc: compiler_core_1.locStub,
            content,
        },
    };
}
exports.createAttributeNode = createAttributeNode;
function createClassAttribute(clazz) {
    return createAttributeNode('class', clazz);
}
function addStaticClass(node, clazz) {
    const classProp = node.props.find((prop) => prop.type === 6 /* ATTRIBUTE */ && prop.name === 'class');
    if (!classProp) {
        return node.props.unshift(createClassAttribute(clazz));
    }
    if (classProp.value) {
        return (classProp.value.content = classProp.value.content + ' ' + clazz);
    }
    classProp.value = {
        type: 2 /* TEXT */,
        loc: compiler_core_1.locStub,
        content: clazz,
    };
}
exports.addStaticClass = addStaticClass;
function createDirectiveNode(name, arg, exp) {
    return {
        type: 7 /* DIRECTIVE */,
        name,
        modifiers: [],
        loc: compiler_core_1.locStub,
        arg: (0, compiler_core_1.createSimpleExpression)(arg, true),
        exp: (0, shared_1.isString)(exp) ? (0, compiler_core_1.createSimpleExpression)(exp, false) : exp,
    };
}
exports.createDirectiveNode = createDirectiveNode;
function createOnDirectiveNode(name, value) {
    return createDirectiveNode('on', name, value);
}
exports.createOnDirectiveNode = createOnDirectiveNode;
function createBindDirectiveNode(name, value) {
    return createDirectiveNode('bind', name, value);
}
exports.createBindDirectiveNode = createBindDirectiveNode;
function createUniVueTransformAssetUrls(base) {
    return {
        base,
        includeAbsolute: true,
        tags: {
            audio: ['src'],
            video: ['src', 'poster'],
            img: ['src'],
            image: ['src'],
            'cover-image': ['src'],
            // h5
            'v-uni-audio': ['src'],
            'v-uni-video': ['src', 'poster'],
            'v-uni-image': ['src'],
            'v-uni-cover-image': ['src'],
            // nvue
            'u-image': ['src'],
            'u-video': ['src', 'poster'],
        },
    };
}
exports.createUniVueTransformAssetUrls = createUniVueTransformAssetUrls;
function getBaseNodeTransforms(base) {
    const transformAssetUrls = createUniVueTransformAssetUrls(base);
    return [
        (0, templateTransformAssetUrl_1.createAssetUrlTransformWithOptions)(transformAssetUrls),
        (0, templateTransformSrcset_1.createSrcsetTransformWithOptions)(transformAssetUrls),
    ];
}
exports.getBaseNodeTransforms = getBaseNodeTransforms;
function renameProp(name, prop) {
    if (!prop) {
        return;
    }
    if ((0, ast_1.isDirectiveNode)(prop)) {
        if (prop.arg && (0, compiler_core_1.isStaticExp)(prop.arg)) {
            prop.arg.content = name;
        }
    }
    else {
        prop.name = name;
    }
}
exports.renameProp = renameProp;

}, function(modId) { var map = {"./transforms/templateTransformAssetUrl":1660207800534,"./transforms/templateTransformSrcset":1660207800536,"../vite/utils/ast":1660207800522,"../vite/utils/url":1660207800523,"../constants":1660207800503}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800534, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformAssetUrl = exports.createAssetUrlTransformWithOptions = exports.normalizeOptions = exports.defaultAssetUrlOptions = void 0;
const path_1 = __importDefault(require("path"));
const compiler_core_1 = require("@vue/compiler-core");
const templateUtils_1 = require("./templateUtils");
const shared_1 = require("@vue/shared");
exports.defaultAssetUrlOptions = {
    base: null,
    includeAbsolute: false,
    tags: {
        video: ['src', 'poster'],
        source: ['src'],
        img: ['src'],
        image: ['xlink:href', 'href'],
        use: ['xlink:href', 'href'],
    },
};
const normalizeOptions = (options) => {
    if (Object.keys(options).some((key) => (0, shared_1.isArray)(options[key]))) {
        // legacy option format which directly passes in tags config
        return {
            ...exports.defaultAssetUrlOptions,
            tags: options,
        };
    }
    return {
        ...exports.defaultAssetUrlOptions,
        ...options,
    };
};
exports.normalizeOptions = normalizeOptions;
const createAssetUrlTransformWithOptions = (options) => {
    return (node, context) => exports.transformAssetUrl(node, context, options);
};
exports.createAssetUrlTransformWithOptions = createAssetUrlTransformWithOptions;
/**
 * A `@vue/compiler-core` plugin that transforms relative asset urls into
 * either imports or absolute urls.
 *
 * ``` js
 * // Before
 * createVNode('img', { src: './logo.png' })
 *
 * // After
 * import _imports_0 from './logo.png'
 * createVNode('img', { src: _imports_0 })
 * ```
 */
const transformAssetUrl = (node, context, options = exports.defaultAssetUrlOptions) => {
    if (node.type === 1 /* ELEMENT */) {
        if (!node.props.length) {
            return;
        }
        const tags = options.tags || exports.defaultAssetUrlOptions.tags;
        const attrs = tags[node.tag];
        const wildCardAttrs = tags['*'];
        if (!attrs && !wildCardAttrs) {
            return;
        }
        // 策略：
        // h5 平台保留原始策略
        // 非 h5 平台
        // - 绝对路径 static 资源不做转换
        // - 相对路径 static 资源转换为绝对路径
        // - 非 static 资源转换为 import
        const assetAttrs = (attrs || []).concat(wildCardAttrs || []);
        node.props.forEach((attr, index) => {
            if (attr.type !== 6 /* ATTRIBUTE */ ||
                !assetAttrs.includes(attr.name) ||
                !attr.value ||
                (0, templateUtils_1.isExternalUrl)(attr.value.content) ||
                (0, templateUtils_1.isDataUrl)(attr.value.content) ||
                attr.value.content[0] === '#') {
                return;
            }
            // fixed by xxxxxx 区分 static 资源
            const isStaticAsset = attr.value.content.indexOf('/static/') > -1;
            // 绝对路径的静态资源不作处理
            if (isStaticAsset && !(0, templateUtils_1.isRelativeUrl)(attr.value.content)) {
                return;
            }
            const url = (0, templateUtils_1.parseUrl)(attr.value.content);
            if (options.base && attr.value.content[0] === '.' && isStaticAsset) {
                // explicit base - directly rewrite relative urls into absolute url
                // to avoid generating extra imports
                // Allow for full hostnames provided in options.base
                const base = (0, templateUtils_1.parseUrl)(options.base);
                const protocol = base.protocol || '';
                const host = base.host ? protocol + '//' + base.host : '';
                const basePath = base.path || '/';
                // when packaged in the browser, path will be using the posix-
                // only version provided by rollup-plugin-node-builtins.
                attr.value.content =
                    host +
                        (path_1.default.posix || path_1.default).join(basePath, url.path + (url.hash || ''));
                return;
            }
            // otherwise, transform the url into an import.
            // this assumes a bundler will resolve the import into the correct
            // absolute url (e.g. webpack file-loader)
            const exp = getImportsExpressionExp(url.path, url.hash, attr.loc, context);
            node.props[index] = {
                type: 7 /* DIRECTIVE */,
                name: 'bind',
                arg: (0, compiler_core_1.createSimpleExpression)(attr.name, true, attr.loc),
                exp,
                modifiers: [],
                loc: attr.loc,
            };
        });
    }
};
exports.transformAssetUrl = transformAssetUrl;
function getImportsExpressionExp(path, hash, loc, context) {
    if (path) {
        let name;
        let exp;
        const existingIndex = context.imports.findIndex((i) => i.path === path);
        if (existingIndex > -1) {
            name = `_imports_${existingIndex}`;
            exp = context.imports[existingIndex].exp;
        }
        else {
            name = `_imports_${context.imports.length}`;
            exp = (0, compiler_core_1.createSimpleExpression)(name, false, loc, 2 /* CAN_HOIST */);
            context.imports.push({ exp, path });
        }
        if (!hash) {
            return exp;
        }
        const hashExp = `${name} + '${hash}'`;
        const existingHoistIndex = context.hoists.findIndex((h) => {
            return (h &&
                h.type === 4 /* SIMPLE_EXPRESSION */ &&
                !h.isStatic &&
                h.content === hashExp);
        });
        if (existingHoistIndex > -1) {
            return (0, compiler_core_1.createSimpleExpression)(`_hoisted_${existingHoistIndex + 1}`, false, loc, 2 /* CAN_HOIST */);
        }
        return context.hoist((0, compiler_core_1.createSimpleExpression)(hashExp, false, loc, 2 /* CAN_HOIST */));
    }
    else {
        return (0, compiler_core_1.createSimpleExpression)(`''`, false, loc, 2 /* CAN_HOIST */);
    }
}

}, function(modId) { var map = {"./templateUtils":1660207800535}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800535, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.parseUrl = exports.isDataUrl = exports.isExternalUrl = exports.isRelativeUrl = void 0;
const url_1 = require("url");
const shared_1 = require("@vue/shared");
function isRelativeUrl(url) {
    const firstChar = url.charAt(0);
    return firstChar === '.' || firstChar === '~' || firstChar === '@';
}
exports.isRelativeUrl = isRelativeUrl;
const externalRE = /^(https?:)?\/\//;
function isExternalUrl(url) {
    return externalRE.test(url);
}
exports.isExternalUrl = isExternalUrl;
const dataUrlRE = /^\s*data:/i;
function isDataUrl(url) {
    return dataUrlRE.test(url);
}
exports.isDataUrl = isDataUrl;
/**
 * Parses string url into URL object.
 */
function parseUrl(url) {
    const firstChar = url.charAt(0);
    if (firstChar === '~') {
        const secondChar = url.charAt(1);
        url = url.slice(secondChar === '/' ? 2 : 1);
    }
    return parseUriParts(url);
}
exports.parseUrl = parseUrl;
/**
 * vuejs/component-compiler-utils#22 Support uri fragment in transformed require
 * @param urlString an url as a string
 */
function parseUriParts(urlString) {
    // A TypeError is thrown if urlString is not a string
    // @see https://nodejs.org/api/url.html#url_url_parse_urlstring_parsequerystring_slashesdenotehost
    return (0, url_1.parse)((0, shared_1.isString)(urlString) ? urlString : '', false, true);
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800536, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformSrcset = exports.createSrcsetTransformWithOptions = void 0;
const path_1 = __importDefault(require("path"));
const compiler_core_1 = require("@vue/compiler-core");
const templateUtils_1 = require("./templateUtils");
const templateTransformAssetUrl_1 = require("./templateTransformAssetUrl");
const srcsetTags = ['img', 'source'];
// http://w3c.github.io/html/semantics-embedded-content.html#ref-for-image-candidate-string-5
const escapedSpaceCharacters = /( |\\t|\\n|\\f|\\r)+/g;
const createSrcsetTransformWithOptions = (options) => {
    return (node, context) => exports.transformSrcset(node, context, options);
};
exports.createSrcsetTransformWithOptions = createSrcsetTransformWithOptions;
const transformSrcset = (node, context, options = templateTransformAssetUrl_1.defaultAssetUrlOptions) => {
    if (node.type === 1 /* ELEMENT */) {
        if (srcsetTags.includes(node.tag) && node.props.length) {
            node.props.forEach((attr, index) => {
                if (attr.name === 'srcset' && attr.type === 6 /* ATTRIBUTE */) {
                    if (!attr.value)
                        return;
                    const value = attr.value.content;
                    if (!value)
                        return;
                    const imageCandidates = value
                        .split(',')
                        .map((s) => {
                        // The attribute value arrives here with all whitespace, except
                        // normal spaces, represented by escape sequences
                        const [url, descriptor] = s
                            .replace(escapedSpaceCharacters, ' ')
                            .trim()
                            .split(' ', 2);
                        return { url, descriptor };
                    });
                    // data urls contains comma after the ecoding so we need to re-merge
                    // them
                    for (let i = 0; i < imageCandidates.length; i++) {
                        const { url } = imageCandidates[i];
                        if ((0, templateUtils_1.isDataUrl)(url)) {
                            imageCandidates[i + 1].url =
                                url + ',' + imageCandidates[i + 1].url;
                            imageCandidates.splice(i, 1);
                        }
                    }
                    const hasQualifiedUrl = imageCandidates.some(({ url }) => {
                        return (!(0, templateUtils_1.isExternalUrl)(url) &&
                            !(0, templateUtils_1.isDataUrl)(url) &&
                            (options.includeAbsolute || (0, templateUtils_1.isRelativeUrl)(url)));
                    });
                    // When srcset does not contain any qualified URLs, skip transforming
                    if (!hasQualifiedUrl) {
                        return;
                    }
                    if (options.base) {
                        const base = options.base;
                        const set = [];
                        imageCandidates.forEach(({ url, descriptor }) => {
                            descriptor = descriptor ? ` ${descriptor}` : ``;
                            if ((0, templateUtils_1.isRelativeUrl)(url)) {
                                set.push((path_1.default.posix || path_1.default).join(base, url) + descriptor);
                            }
                            else {
                                set.push(url + descriptor);
                            }
                        });
                        attr.value.content = set.join(', ');
                        return;
                    }
                    const compoundExpression = (0, compiler_core_1.createCompoundExpression)([], attr.loc);
                    imageCandidates.forEach(({ url, descriptor }, index) => {
                        if (!(0, templateUtils_1.isExternalUrl)(url) &&
                            !(0, templateUtils_1.isDataUrl)(url) &&
                            (options.includeAbsolute || (0, templateUtils_1.isRelativeUrl)(url))) {
                            const { path } = (0, templateUtils_1.parseUrl)(url);
                            let exp;
                            if (path) {
                                const existingImportsIndex = context.imports.findIndex((i) => i.path === path);
                                if (existingImportsIndex > -1) {
                                    exp = (0, compiler_core_1.createSimpleExpression)(`_imports_${existingImportsIndex}`, false, attr.loc, 2 /* CAN_HOIST */);
                                }
                                else {
                                    exp = (0, compiler_core_1.createSimpleExpression)(`_imports_${context.imports.length}`, false, attr.loc, 2 /* CAN_HOIST */);
                                    context.imports.push({ exp, path });
                                }
                                compoundExpression.children.push(exp);
                            }
                        }
                        else {
                            const exp = (0, compiler_core_1.createSimpleExpression)(`"${url}"`, false, attr.loc, 2 /* CAN_HOIST */);
                            compoundExpression.children.push(exp);
                        }
                        const isNotLast = imageCandidates.length - 1 > index;
                        if (descriptor && isNotLast) {
                            compoundExpression.children.push(` + ' ${descriptor}, ' + `);
                        }
                        else if (descriptor) {
                            compoundExpression.children.push(` + ' ${descriptor}'`);
                        }
                        else if (isNotLast) {
                            compoundExpression.children.push(` + ', ' + `);
                        }
                    });
                    const hoisted = context.hoist(compoundExpression);
                    hoisted.constType = 2 /* CAN_HOIST */;
                    node.props[index] = {
                        type: 7 /* DIRECTIVE */,
                        name: 'bind',
                        arg: (0, compiler_core_1.createSimpleExpression)('srcset', true, attr.loc),
                        exp: hoisted,
                        modifiers: [],
                        loc: attr.loc,
                    };
                }
            });
        }
    }
};
exports.transformSrcset = transformSrcset;

}, function(modId) { var map = {"./templateUtils":1660207800535,"./templateTransformAssetUrl":1660207800534}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800537, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.parseExternalClasses = exports.updateMiniProgramComponentExternalClasses = exports.findMiniProgramComponentExternalClasses = exports.hasExternalClasses = void 0;
const types_1 = require("@babel/types");
const estree_walker_1 = require("estree-walker");
const externalClassesCache = new Map();
function hasExternalClasses(code) {
    return code.includes('externalClasses');
}
exports.hasExternalClasses = hasExternalClasses;
function findMiniProgramComponentExternalClasses(filename) {
    return externalClassesCache.get(filename);
}
exports.findMiniProgramComponentExternalClasses = findMiniProgramComponentExternalClasses;
function updateMiniProgramComponentExternalClasses(filename, classes) {
    externalClassesCache.set(filename, classes);
}
exports.updateMiniProgramComponentExternalClasses = updateMiniProgramComponentExternalClasses;
function parseExternalClasses(ast) {
    const classes = [];
    estree_walker_1.walk(ast, {
        enter(child, parent) {
            if (!(0, types_1.isIdentifier)(child) || child.name !== 'externalClasses') {
                return;
            }
            // export default { externalClasses: ['my-class'] }
            if (!(0, types_1.isObjectProperty)(parent)) {
                return;
            }
            if (!(0, types_1.isArrayExpression)(parent.value)) {
                return;
            }
            parent.value.elements.forEach((element) => {
                if ((0, types_1.isStringLiteral)(element)) {
                    classes.push(element.value);
                }
            });
        },
    });
    return classes;
}
exports.parseExternalClasses = parseExternalClasses;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800538, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeBase64Url = exports.encodeBase64Url = void 0;
const base64url_1 = __importDefault(require("base64url"));
function encodeBase64Url(str) {
    return base64url_1.default.encode(str);
}
exports.encodeBase64Url = encodeBase64Url;
function decodeBase64Url(str) {
    return base64url_1.default.decode(str);
}
exports.decodeBase64Url = decodeBase64Url;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800539, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.initH5Provide = exports.initAppProvide = exports.initDefine = void 0;
var define_1 = require("./define");
Object.defineProperty(exports, "initDefine", { enumerable: true, get: function () { return define_1.initDefine; } });
var provide_1 = require("./provide");
Object.defineProperty(exports, "initAppProvide", { enumerable: true, get: function () { return provide_1.initAppProvide; } });
Object.defineProperty(exports, "initH5Provide", { enumerable: true, get: function () { return provide_1.initH5Provide; } });

}, function(modId) { var map = {"./define":1660207800540,"./provide":1660207800570}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800540, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.initDefine = void 0;
const env_1 = require("../hbx/env");
const json_1 = require("../json");
function initDefine(stringifyBoolean = false) {
    const manifestJson = (0, json_1.parseManifestJsonOnce)(process.env.UNI_INPUT_DIR);
    const isRunByHBuilderX = (0, env_1.runByHBuilderX)();
    const isDebug = !!manifestJson.debug;
    return {
        ...initCustomDefine(),
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.UNI_DEBUG': stringifyBoolean
            ? JSON.stringify(isDebug)
            : isDebug,
        'process.env.UNI_APP_ID': JSON.stringify(manifestJson.appid || ''),
        'process.env.UNI_APP_NAME': JSON.stringify(manifestJson.name || ''),
        'process.env.UNI_APP_VERSION_NAME': JSON.stringify(manifestJson.versionName || ''),
        'process.env.UNI_APP_VERSION_CODE': JSON.stringify(manifestJson.versionCode || ''),
        'process.env.UNI_PLATFORM': JSON.stringify(process.env.UNI_PLATFORM),
        'process.env.UNI_SUB_PLATFORM': JSON.stringify(process.env.UNI_SUB_PLATFORM),
        'process.env.UNI_MP_PLUGIN': JSON.stringify(process.env.UNI_MP_PLUGIN),
        'process.env.UNI_SUBPACKAGE': JSON.stringify(process.env.UNI_SUBPACKAGE),
        'process.env.UNI_COMPILER_VERSION': JSON.stringify(process.env.UNI_COMPILER_VERSION),
        'process.env.RUN_BY_HBUILDERX': stringifyBoolean
            ? JSON.stringify(isRunByHBuilderX)
            : isRunByHBuilderX,
        'process.env.UNI_AUTOMATOR_WS_ENDPOINT': JSON.stringify(process.env.UNI_AUTOMATOR_WS_ENDPOINT),
        'process.env.UNI_CLOUD_PROVIDER': JSON.stringify(process.env.UNI_CLOUD_PROVIDER),
        'process.env.UNICLOUD_DEBUG': JSON.stringify(process.env.UNICLOUD_DEBUG),
        // 兼容旧版本
        'process.env.VUE_APP_PLATFORM': JSON.stringify(process.env.UNI_PLATFORM),
    };
}
exports.initDefine = initDefine;
function initCustomDefine() {
    let define = {};
    if (process.env.UNI_CUSTOM_DEFINE) {
        try {
            define = JSON.parse(process.env.UNI_CUSTOM_DEFINE);
        }
        catch (e) { }
    }
    return Object.keys(define).reduce((res, name) => {
        res['process.env.' + name] = JSON.stringify(define[name]);
        return res;
    }, {});
}

}, function(modId) { var map = {"../hbx/env":1660207800532,"../json":1660207800541}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800541, function(require, module, exports) {

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./mp"), exports);
__exportStar(require("./app"), exports);
__exportStar(require("./json"), exports);
__exportStar(require("./pages"), exports);
__exportStar(require("./manifest"), exports);

}, function(modId) { var map = {"./mp":1660207800542,"./app":1660207800547,"./json":1660207800514,"./pages":1660207800544,"./manifest":1660207800553}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800542, function(require, module, exports) {

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMiniProgramProjectJson = exports.parseMiniProgramPagesJson = exports.mergeMiniProgramAppJson = void 0;
__exportStar(require("./jsonFile"), exports);
var pages_1 = require("./pages");
Object.defineProperty(exports, "mergeMiniProgramAppJson", { enumerable: true, get: function () { return pages_1.mergeMiniProgramAppJson; } });
Object.defineProperty(exports, "parseMiniProgramPagesJson", { enumerable: true, get: function () { return pages_1.parseMiniProgramPagesJson; } });
var project_1 = require("./project");
Object.defineProperty(exports, "parseMiniProgramProjectJson", { enumerable: true, get: function () { return project_1.parseMiniProgramProjectJson; } });

}, function(modId) { var map = {"./jsonFile":1660207800530,"./pages":1660207800543,"./project":1660207800546}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800543, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeMiniProgramAppJson = exports.parseMiniProgramPagesJson = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const shared_1 = require("@vue/shared");
const json_1 = require("../json");
const pages_1 = require("../pages");
const utils_1 = require("./utils");
const utils_2 = require("../../utils");
const project_1 = require("./project");
function parseMiniProgramPagesJson(jsonStr, platform, options = { subpackages: false }) {
    return parsePagesJson(jsonStr, platform, options);
}
exports.parseMiniProgramPagesJson = parseMiniProgramPagesJson;
const NON_APP_JSON_KEYS = [
    'unipush',
    'usingComponents',
    'optimization',
    'scopedSlotsCompiler',
    'usingComponents',
    'uniStatistics',
];
function mergeMiniProgramAppJson(appJson, platformJson = {}) {
    Object.keys(platformJson).forEach((name) => {
        if (!(0, project_1.isMiniProgramProjectJsonKey)(name) &&
            !NON_APP_JSON_KEYS.includes(name)) {
            appJson[name] = platformJson[name];
        }
    });
}
exports.mergeMiniProgramAppJson = mergeMiniProgramAppJson;
function parsePagesJson(jsonStr, platform, { debug, darkmode, networkTimeout, subpackages, windowOptionsMap, tabBarOptionsMap, tabBarItemOptionsMap, } = {
    subpackages: false,
}) {
    const appJson = {
        pages: [],
    };
    const pageJsons = {};
    const nvuePages = [];
    // preprocess
    const pagesJson = (0, json_1.parseJson)(jsonStr, true);
    if (!pagesJson) {
        throw new Error(`[vite] Error: pages.json parse failed.\n`);
    }
    function addPageJson(pagePath, style) {
        const filename = path_1.default.join(process.env.UNI_INPUT_DIR, pagePath);
        if (fs_1.default.existsSync(filename + '.nvue') &&
            !fs_1.default.existsSync(filename + '.vue')) {
            nvuePages.push(pagePath);
        }
        const windowOptions = {};
        if (platform === 'mp-baidu') {
            // 仅百度小程序需要页面配置 component:true
            // 快手小程序反而不能配置 component:true，故不能统一添加，目前硬编码处理
            windowOptions.component = true;
        }
        pageJsons[pagePath] = (0, shared_1.extend)(windowOptions, (0, utils_1.parseWindowOptions)(style, platform, windowOptionsMap));
    }
    // pages
    (0, pages_1.validatePages)(pagesJson, jsonStr);
    pagesJson.pages.forEach((page) => {
        appJson.pages.push(page.path);
        addPageJson(page.path, page.style);
    });
    // subpackages
    pagesJson.subPackages = pagesJson.subPackages || pagesJson.subpackages;
    if (pagesJson.subPackages) {
        if (subpackages) {
            appJson.subPackages = pagesJson.subPackages.map(({ root, pages, ...rest }) => {
                return (0, shared_1.extend)({
                    root,
                    pages: pages.map((page) => {
                        addPageJson((0, utils_2.normalizePath)(path_1.default.join(root, page.path)), page.style);
                        return page.path;
                    }),
                }, rest);
            });
        }
        else {
            pagesJson.subPackages.forEach(({ root, pages }) => {
                pages.forEach((page) => {
                    const pagePath = (0, utils_2.normalizePath)(path_1.default.join(root, page.path));
                    appJson.pages.push(pagePath);
                    addPageJson(pagePath, page.style);
                });
            });
        }
    }
    // window
    if (pagesJson.globalStyle) {
        const windowOptions = (0, utils_1.parseWindowOptions)(pagesJson.globalStyle, platform, windowOptionsMap);
        const { usingComponents } = windowOptions;
        if (usingComponents) {
            delete windowOptions.usingComponents;
            appJson.usingComponents = usingComponents;
        }
        else {
            delete appJson.usingComponents;
        }
        appJson.window = windowOptions;
    }
    // tabBar
    if (pagesJson.tabBar) {
        const tabBar = (0, utils_1.parseTabBar)(pagesJson.tabBar, platform, tabBarOptionsMap, tabBarItemOptionsMap);
        if (tabBar) {
            appJson.tabBar = tabBar;
        }
    }
    ;
    ['preloadRule', 'workers', 'plugins'].forEach((name) => {
        if ((0, shared_1.hasOwn)(pagesJson, name)) {
            appJson[name] = pagesJson[name];
        }
    });
    if (debug) {
        appJson.debug = debug;
    }
    if (networkTimeout) {
        appJson.networkTimeout = networkTimeout;
    }
    if (darkmode) {
        appJson.darkmode = true;
        appJson.themeLocation = 'theme.json';
    }
    return {
        appJson,
        pageJsons,
        nvuePages,
    };
}

}, function(modId) { var map = {"../json":1660207800514,"../pages":1660207800544,"./utils":1660207800545,"../../utils":1660207800502,"./project":1660207800546}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800544, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSubpackagesRootOnce = exports.normalizePagesRoute = exports.removePlatformStyle = exports.validatePages = exports.normalizePagesJson = exports.parsePagesJsonOnce = exports.parsePagesJson = exports.isUniPageSfcFile = exports.isUniPageFile = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const shared_1 = require("@vue/shared");
const uni_shared_1 = require("@dcloudio/uni-shared");
const utils_1 = require("../utils");
const json_1 = require("./json");
const utils_2 = require("../vue/utils");
const pagesCacheSet = new Set();
function isUniPageFile(file, inputDir = process.env.UNI_INPUT_DIR) {
    if (inputDir && path_1.default.isAbsolute(file)) {
        file = (0, utils_1.normalizePath)(path_1.default.relative(inputDir, file));
    }
    return pagesCacheSet.has((0, utils_1.removeExt)(file));
}
exports.isUniPageFile = isUniPageFile;
function isUniPageSfcFile(file, inputDir = process.env.UNI_INPUT_DIR) {
    return (0, utils_2.isVueSfcFile)(file) && isUniPageFile(file, inputDir);
}
exports.isUniPageSfcFile = isUniPageSfcFile;
/**
 * 小程序平台慎用，因为该解析不支持 subpackages
 * @param inputDir
 * @param platform
 * @param normalize
 * @returns
 */
const parsePagesJson = (inputDir, platform, normalize = true) => {
    const jsonStr = fs_1.default.readFileSync(path_1.default.join(inputDir, 'pages.json'), 'utf8');
    if (normalize) {
        return normalizePagesJson(jsonStr, platform);
    }
    return (0, json_1.parseJson)(jsonStr, true);
};
exports.parsePagesJson = parsePagesJson;
/**
 * 该方法解析出来的是不支持 subpackages，会被合并入 pages
 */
exports.parsePagesJsonOnce = (0, uni_shared_1.once)(exports.parsePagesJson);
/**
 * 目前 App 和 H5 使用了该方法
 * @param jsonStr
 * @param platform
 * @param param2
 * @returns
 */
function normalizePagesJson(jsonStr, platform, { subpackages, } = { subpackages: false }) {
    let pagesJson = {
        pages: [],
        globalStyle: {
            navigationBar: {},
        },
    };
    // preprocess
    try {
        pagesJson = (0, json_1.parseJson)(jsonStr, true);
    }
    catch (e) {
        console.error(`[vite] Error: pages.json parse failed.\n`, jsonStr, e);
    }
    // pages
    validatePages(pagesJson, jsonStr);
    pagesJson.subPackages = pagesJson.subPackages || pagesJson.subpackages;
    delete pagesJson.subpackages;
    // subpackages
    if (pagesJson.subPackages) {
        if (subpackages) {
            pagesJson.subPackages.forEach(({ pages }) => {
                pages && normalizePages(pages, platform);
            });
        }
        else {
            pagesJson.pages.push(...normalizeSubpackages(pagesJson.subPackages));
            delete pagesJson.subPackages;
        }
    }
    else {
        delete pagesJson.subPackages;
    }
    // pageStyle
    normalizePages(pagesJson.pages, platform);
    // globalStyle
    pagesJson.globalStyle = normalizePageStyle(null, pagesJson.globalStyle, platform);
    // tabBar
    if (pagesJson.tabBar) {
        const tabBar = normalizeTabBar(pagesJson.tabBar, platform);
        if (tabBar) {
            pagesJson.tabBar = tabBar;
        }
        else {
            delete pagesJson.tabBar;
        }
    }
    // 缓存页面列表
    pagesCacheSet.clear();
    pagesJson.pages.forEach((page) => pagesCacheSet.add(page.path));
    return pagesJson;
}
exports.normalizePagesJson = normalizePagesJson;
function validatePages(pagesJson, jsonStr) {
    if (!(0, shared_1.isArray)(pagesJson.pages)) {
        pagesJson.pages = [];
        throw new Error(`[uni-app] Error: pages.json->pages parse failed.`);
    }
    else if (!pagesJson.pages.length) {
        throw new Error(`[uni-app] Error: pages.json->pages must contain at least 1 page.`);
    }
}
exports.validatePages = validatePages;
function normalizePages(pages, platform) {
    pages.forEach((page) => {
        page.style = normalizePageStyle(page.path, page.style, platform);
    });
    if (platform !== 'app') {
        return;
    }
    const subNVuePages = [];
    // subNVues
    pages.forEach(({ style: { subNVues } }) => {
        if (!(0, shared_1.isArray)(subNVues)) {
            return;
        }
        subNVues.forEach((subNVue) => {
            if (subNVue && subNVue.path) {
                subNVuePages.push({
                    path: subNVue.path,
                    style: { isSubNVue: true, isNVue: true, navigationBar: {} },
                });
            }
        });
    });
    if (subNVuePages.length) {
        pages.push(...subNVuePages);
    }
}
function normalizeSubpackages(subpackages) {
    const pages = [];
    if ((0, shared_1.isArray)(subpackages)) {
        subpackages.forEach(({ root, pages: subPages }) => {
            if (root && subPages.length) {
                subPages.forEach((subPage) => {
                    subPage.path = (0, utils_1.normalizePath)(path_1.default.join(root, subPage.path));
                    subPage.style = normalizeSubpackageSubNVues(root, subPage.style);
                    pages.push(subPage);
                });
            }
        });
    }
    return pages;
}
function normalizeSubpackageSubNVues(root, style = { navigationBar: {} }) {
    const platformStyle = style['app'] || style['app-plus'];
    if (!platformStyle) {
        return style;
    }
    if ((0, shared_1.isArray)(platformStyle.subNVues)) {
        platformStyle.subNVues.forEach((subNVue) => {
            if (subNVue.path) {
                subNVue.path = (0, utils_1.normalizePath)(path_1.default.join(root, subNVue.path));
            }
        });
    }
    return style;
}
function normalizePageStyle(pagePath, pageStyle, platform) {
    const hasNVue = pagePath &&
        process.env.UNI_INPUT_DIR &&
        fs_1.default.existsSync(path_1.default.join(process.env.UNI_INPUT_DIR, pagePath + '.nvue'))
        ? true
        : undefined;
    let isNVue = false;
    if (hasNVue) {
        const hasVue = fs_1.default.existsSync(path_1.default.join(process.env.UNI_INPUT_DIR, pagePath + '.vue'));
        if (hasVue) {
            if (platform === 'app') {
                if (process.env.UNI_NVUE_COMPILER !== 'vue') {
                    isNVue = true;
                }
            }
        }
        else {
            isNVue = true;
        }
    }
    if (pageStyle) {
        if (platform === 'h5') {
            (0, shared_1.extend)(pageStyle, pageStyle['app'] || pageStyle['app-plus']);
        }
        if (platform === 'app') {
            (0, shared_1.extend)(pageStyle, pageStyle['app'] || pageStyle['app-plus']);
        }
        else {
            (0, shared_1.extend)(pageStyle, pageStyle[platform]);
        }
        if (['h5', 'app'].includes(platform)) {
            pageStyle.navigationBar = normalizeNavigationBar(pageStyle);
            if (isEnablePullDownRefresh(pageStyle)) {
                pageStyle.enablePullDownRefresh = true;
                pageStyle.pullToRefresh = normalizePullToRefresh(pageStyle);
            }
            if (platform === 'app') {
                pageStyle.disableSwipeBack === true
                    ? (pageStyle.popGesture = 'none')
                    : delete pageStyle.popGesture;
                delete pageStyle.disableSwipeBack;
            }
        }
        pageStyle.isNVue = isNVue;
        removePlatformStyle(pageStyle);
        return pageStyle;
    }
    return { navigationBar: {}, isNVue };
}
const navigationBarMaps = {
    navigationBarBackgroundColor: 'backgroundColor',
    navigationBarTextStyle: 'textStyle',
    navigationBarTitleText: 'titleText',
    navigationStyle: 'style',
    titleImage: 'titleImage',
    titlePenetrate: 'titlePenetrate',
    transparentTitle: 'transparentTitle',
};
function normalizeNavigationBar(pageStyle) {
    const navigationBar = Object.create(null);
    Object.keys(navigationBarMaps).forEach((name) => {
        if ((0, shared_1.hasOwn)(pageStyle, name)) {
            navigationBar[navigationBarMaps[name]] =
                pageStyle[name];
            delete pageStyle[name];
        }
    });
    const { titleNView } = pageStyle;
    if ((0, shared_1.isPlainObject)(titleNView)) {
        (0, shared_1.extend)(navigationBar, titleNView);
        delete pageStyle.titleNView;
    }
    else if (titleNView === false) {
        navigationBar.style = 'custom';
    }
    if ((0, shared_1.hasOwn)(navigationBar, 'transparentTitle')) {
        const transparentTitle = navigationBar.transparentTitle;
        if (transparentTitle === 'always') {
            navigationBar.style = 'custom';
            navigationBar.type = 'float';
        }
        else if (transparentTitle === 'auto') {
            navigationBar.type = 'transparent';
        }
        else {
            navigationBar.type = 'default';
        }
        delete navigationBar.transparentTitle;
    }
    if (navigationBar.titleImage && navigationBar.titleText) {
        delete navigationBar.titleText;
    }
    if (!navigationBar.titleColor && (0, shared_1.hasOwn)(navigationBar, 'textStyle')) {
        navigationBar.titleColor =
            navigationBar.textStyle === 'black' ? '#000000' : '#ffffff';
        delete navigationBar.textStyle;
    }
    if (pageStyle.navigationBarShadow &&
        pageStyle.navigationBarShadow.colorType) {
        navigationBar.shadowColorType = pageStyle.navigationBarShadow.colorType;
        delete pageStyle.navigationBarShadow;
    }
    if ((0, shared_1.isArray)(navigationBar.buttons)) {
        navigationBar.buttons = navigationBar.buttons.map((btn) => normalizeNavigationBarButton(btn, navigationBar.type, navigationBar.titleColor));
    }
    if ((0, shared_1.isPlainObject)(navigationBar.searchInput)) {
        navigationBar.searchInput = normalizeNavigationBarSearchInput(navigationBar.searchInput);
    }
    if (navigationBar.type === 'transparent') {
        navigationBar.coverage = navigationBar.coverage || '132px';
    }
    return navigationBar;
}
function normalizeNavigationBarButton(btn, type, titleColor) {
    btn.color = type === 'transparent' ? '#ffffff' : btn.color || titleColor;
    if (!btn.fontSize) {
        btn.fontSize =
            type === 'transparent' || (btn.text && /\\u/.test(btn.text))
                ? '22px'
                : '27px';
    }
    else if (/\d$/.test(btn.fontSize)) {
        btn.fontSize += 'px';
    }
    btn.text = btn.text || '';
    return btn;
}
function normalizeNavigationBarSearchInput(searchInput) {
    return (0, shared_1.extend)({
        autoFocus: false,
        align: 'center',
        color: '#000',
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: '0px',
        placeholder: '',
        placeholderColor: '#CCCCCC',
        disabled: false,
    }, searchInput);
}
const DEFAULT_TAB_BAR = {
    position: 'bottom',
    color: '#999',
    selectedColor: '#007aff',
    borderStyle: 'black',
    blurEffect: 'none',
    fontSize: '10px',
    iconWidth: '24px',
    spacing: '3px',
    height: uni_shared_1.TABBAR_HEIGHT + 'px',
};
function normalizeTabBar(tabBar, platform) {
    const { list, midButton } = tabBar;
    if (!list || !list.length) {
        return;
    }
    tabBar = (0, shared_1.extend)({}, DEFAULT_TAB_BAR, tabBar);
    if (platform === 'h5') {
        const len = list.length;
        if (len % 2 === 0 && (0, shared_1.isPlainObject)(midButton)) {
            list.splice(Math.floor(len / 2), 0, (0, shared_1.extend)({
                type: 'midButton',
                width: '50px',
                height: '50px',
                iconWidth: '24px',
            }, midButton));
        }
        else {
            delete tabBar.midButton;
        }
    }
    list.forEach((item) => {
        if (item.iconPath) {
            item.iconPath = normalizeFilepath(item.iconPath);
        }
        if (item.selectedIconPath) {
            item.selectedIconPath = normalizeFilepath(item.selectedIconPath);
        }
        if (item.type === 'midButton' && item.backgroundImage) {
            item.backgroundImage = normalizeFilepath(item.backgroundImage);
        }
    });
    tabBar.selectedIndex = 0;
    tabBar.shown = true;
    return tabBar;
}
const SCHEME_RE = /^([a-z-]+:)?\/\//i;
const DATA_RE = /^data:.*,.*/;
function normalizeFilepath(filepath) {
    if (!(SCHEME_RE.test(filepath) || DATA_RE.test(filepath)) &&
        filepath.indexOf('/') !== 0) {
        return (0, uni_shared_1.addLeadingSlash)(filepath);
    }
    return filepath;
}
const platforms = ['h5', 'app', 'mp-', 'quickapp'];
function removePlatformStyle(pageStyle) {
    Object.keys(pageStyle).forEach((name) => {
        if (platforms.find((prefix) => name.startsWith(prefix))) {
            delete pageStyle[name];
        }
    });
    return pageStyle;
}
exports.removePlatformStyle = removePlatformStyle;
function normalizePagesRoute(pagesJson) {
    const firstPagePath = pagesJson.pages[0].path;
    const tabBarList = (pagesJson.tabBar && pagesJson.tabBar.list) || [];
    return pagesJson.pages.map((pageOptions) => {
        const pagePath = pageOptions.path;
        const isEntry = firstPagePath === pagePath ? true : undefined;
        const tabBarIndex = tabBarList.findIndex((tabBarPage) => tabBarPage.pagePath === pagePath);
        const isTabBar = tabBarIndex !== -1 ? true : undefined;
        let windowTop = 0;
        const meta = (0, shared_1.extend)({
            isQuit: isEntry || isTabBar ? true : undefined,
            isEntry: isEntry || undefined,
            isTabBar: isTabBar || undefined,
            tabBarIndex: isTabBar ? tabBarIndex : undefined,
            windowTop: windowTop || undefined,
        }, pageOptions.style);
        return {
            path: pageOptions.path,
            meta,
        };
    });
}
exports.normalizePagesRoute = normalizePagesRoute;
function isEnablePullDownRefresh(pageStyle) {
    var _a;
    return pageStyle.enablePullDownRefresh || ((_a = pageStyle.pullToRefresh) === null || _a === void 0 ? void 0 : _a.support);
}
function normalizePullToRefresh(pageStyle) {
    return pageStyle.pullToRefresh;
}
function parseSubpackagesRoot(inputDir, platform) {
    const pagesJson = (0, exports.parsePagesJson)(inputDir, platform, false);
    const subpackages = pagesJson.subPackages || pagesJson.subpackages;
    const roots = [];
    if ((0, shared_1.isArray)(subpackages)) {
        subpackages.forEach(({ root }) => {
            if (root) {
                roots.push(root);
            }
        });
    }
    return roots;
}
exports.parseSubpackagesRootOnce = (0, uni_shared_1.once)(parseSubpackagesRoot);

}, function(modId) { var map = {"../utils":1660207800502,"./json":1660207800514,"../vue/utils":1660207800533}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800545, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTabBar = exports.parseWindowOptions = void 0;
const shared_1 = require("@vue/shared");
const pages_1 = require("../pages");
function trimJson(json) {
    delete json.maxWidth;
    delete json.topWindow;
    delete json.leftWindow;
    delete json.rightWindow;
    if (json.tabBar) {
        delete json.tabBar.matchMedia;
    }
    return json;
}
function convert(to, from, map) {
    Object.keys(map).forEach((key) => {
        if ((0, shared_1.hasOwn)(from, map[key])) {
            to[key] = from[map[key]];
        }
    });
    return to;
}
function parseWindowOptions(style, platform, windowOptionsMap) {
    if (!style) {
        return {};
    }
    const platformStyle = style[platform] || {};
    (0, pages_1.removePlatformStyle)(trimJson(style));
    const res = {};
    if (windowOptionsMap) {
        return (0, shared_1.extend)(convert(res, style, windowOptionsMap), platformStyle);
    }
    return (0, shared_1.extend)(res, style, platformStyle);
}
exports.parseWindowOptions = parseWindowOptions;
function trimTabBarJson(tabBar) {
    ;
    [
        'fontSize',
        'height',
        'iconWidth',
        'midButton',
        'selectedIndex',
        'spacing',
    ].forEach((name) => {
        delete tabBar[name];
    });
    return tabBar;
}
function parseTabBar(tabBar, platform, tabBarOptionsMap, tabBarItemOptionsMap) {
    const platformStyle = tabBar[platform] || {};
    (0, pages_1.removePlatformStyle)(trimTabBarJson(tabBar));
    const res = {};
    if (tabBarOptionsMap) {
        if (tabBarItemOptionsMap && tabBar.list) {
            tabBar.list = tabBar.list.map((item) => {
                return convert({}, item, tabBarItemOptionsMap);
            });
        }
        convert(res, tabBar, tabBarOptionsMap);
        return (0, shared_1.extend)(res, platformStyle);
    }
    return (0, shared_1.extend)(res, tabBar, platformStyle);
}
exports.parseTabBar = parseTabBar;

}, function(modId) { var map = {"../pages":1660207800544}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800546, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMiniProgramProjectJson = exports.isMiniProgramProjectJsonKey = void 0;
const shared_1 = require("@vue/shared");
const json_1 = require("../json");
const projectKeys = [
    'appid',
    'setting',
    'miniprogramRoot',
    'cloudfunctionRoot',
    'qcloudRoot',
    'pluginRoot',
    'compileType',
    'libVersion',
    'projectname',
    'packOptions',
    'debugOptions',
    'scripts',
    'cloudbaseRoot',
];
function isMiniProgramProjectJsonKey(name) {
    return projectKeys.includes(name);
}
exports.isMiniProgramProjectJsonKey = isMiniProgramProjectJsonKey;
function parseMiniProgramProjectJson(jsonStr, platform, { template, pagesJson }) {
    const projectJson = JSON.parse(JSON.stringify(template));
    const manifestJson = (0, json_1.parseJson)(jsonStr);
    if (manifestJson) {
        projectJson.projectname = manifestJson.name;
        const platformConfig = manifestJson[platform];
        if (platformConfig) {
            projectKeys.forEach((name) => {
                if ((0, shared_1.hasOwn)(platformConfig, name)) {
                    ;
                    projectJson[name] = platformConfig[name];
                }
            });
        }
    }
    // 其实仅开发期间 condition 生效即可，暂不做判断
    const miniprogram = parseMiniProgramCondition(pagesJson);
    if (miniprogram) {
        if (!projectJson.condition) {
            projectJson.condition = {};
        }
        projectJson.condition.miniprogram = miniprogram;
    }
    if (!projectJson.appid) {
        projectJson.appid = 'touristappid';
    }
    return projectJson;
}
exports.parseMiniProgramProjectJson = parseMiniProgramProjectJson;
function parseMiniProgramCondition(pagesJson) {
    const launchPagePath = process.env.UNI_CLI_LAUNCH_PAGE_PATH || '';
    if (launchPagePath) {
        return {
            current: 0,
            list: [
                {
                    id: 0,
                    name: launchPagePath,
                    pathName: launchPagePath,
                    query: process.env.UNI_CLI_LAUNCH_PAGE_QUERY || '', // 启动参数，在页面的onLoad函数里面得到。
                },
            ],
        };
    }
    const condition = pagesJson.condition;
    if (!condition || !(0, shared_1.isArray)(condition.list) || !condition.list.length) {
        return;
    }
    condition.list.forEach(function (item, index) {
        item.id = item.id || index;
        if (item.path) {
            item.pathName = item.path;
            delete item.path;
        }
    });
    return condition;
}

}, function(modId) { var map = {"../json":1660207800514}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800547, function(require, module, exports) {

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restoreGlobalCode = exports.arrayBufferCode = exports.polyfillCode = void 0;
__exportStar(require("./pages"), exports);
__exportStar(require("./manifest"), exports);
var code_1 = require("./pages/code");
Object.defineProperty(exports, "polyfillCode", { enumerable: true, get: function () { return code_1.polyfillCode; } });
Object.defineProperty(exports, "arrayBufferCode", { enumerable: true, get: function () { return code_1.arrayBufferCode; } });
Object.defineProperty(exports, "restoreGlobalCode", { enumerable: true, get: function () { return code_1.restoreGlobalCode; } });

}, function(modId) { var map = {"./pages":1660207800548,"./manifest":1660207800554,"./pages/code":1660207800549}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800548, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeAppConfigService = exports.normalizeAppNVuePagesJson = exports.normalizeAppPagesJson = void 0;
const code_1 = require("./code");
const definePage_1 = require("./definePage");
const uniConfig_1 = require("./uniConfig");
const uniRoutes_1 = require("./uniRoutes");
function normalizeAppPagesJson(pagesJson) {
    return (0, definePage_1.definePageCode)(pagesJson);
}
exports.normalizeAppPagesJson = normalizeAppPagesJson;
function normalizeAppNVuePagesJson(pagesJson) {
    return (0, definePage_1.defineNVuePageCode)(pagesJson);
}
exports.normalizeAppNVuePagesJson = normalizeAppNVuePagesJson;
function normalizeAppConfigService(pagesJson, manifestJson) {
    return `
  ;(function(){
  let u=void 0,isReady=false,onReadyCallbacks=[],isServiceReady=false,onServiceReadyCallbacks=[];
  const __uniConfig = ${(0, uniConfig_1.normalizeAppUniConfig)(pagesJson, manifestJson)};
  const __uniRoutes = ${(0, uniRoutes_1.normalizeAppUniRoutes)(pagesJson)}.map(uniRoute=>(uniRoute.meta.route=uniRoute.path,__uniConfig.pages.push(uniRoute.path),uniRoute.path='/'+uniRoute.path,uniRoute));
  __uniConfig.styles=${process.env.UNI_NVUE_APP_STYLES || '[]'};//styles
  __uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
  __uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
  service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:16})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,${code_1.globalCode}}}}}); 
  })();
  `;
}
exports.normalizeAppConfigService = normalizeAppConfigService;

}, function(modId) { var map = {"./code":1660207800549,"./definePage":1660207800550,"./uniConfig":1660207800551,"./uniRoutes":1660207800569}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800549, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.globalCode = exports.restoreGlobalCode = exports.polyfillCode = exports.arrayBufferCode = void 0;
exports.arrayBufferCode = `
if (typeof uni !== 'undefined' && uni && uni.requireGlobal) {
  const global = uni.requireGlobal()
  ArrayBuffer = global.ArrayBuffer
  Int8Array = global.Int8Array
  Uint8Array = global.Uint8Array
  Uint8ClampedArray = global.Uint8ClampedArray
  Int16Array = global.Int16Array
  Uint16Array = global.Uint16Array
  Int32Array = global.Int32Array
  Uint32Array = global.Uint32Array
  Float32Array = global.Float32Array
  Float64Array = global.Float64Array
  BigInt64Array = global.BigInt64Array
  BigUint64Array = global.BigUint64Array
};
`;
exports.polyfillCode = `
if (typeof Promise !== 'undefined' && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor
    return this.then(
      value => promise.resolve(callback()).then(() => value),
      reason => promise.resolve(callback()).then(() => {
        throw reason
      })
    )
  }
};
${exports.arrayBufferCode}
`;
exports.restoreGlobalCode = `
if(uni.restoreGlobal){
  uni.restoreGlobal(Vue,weex,plus,setTimeout,clearTimeout,setInterval,clearInterval)
}
`;
const GLOBALS = [
    'global',
    'window',
    'document',
    'frames',
    'self',
    'location',
    'navigator',
    'localStorage',
    'history',
    'Caches',
    'screen',
    'alert',
    'confirm',
    'prompt',
    'fetch',
    'XMLHttpRequest',
    'WebSocket',
    'webkit',
    'print',
];
exports.globalCode = GLOBALS.map((g) => `${g}:u`).join(',');

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800550, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.defineNVuePageCode = exports.definePageCode = void 0;
const utils_1 = require("../../../utils");
function definePageCode(pagesJson) {
    const importPagesCode = [];
    const definePagesCode = [];
    pagesJson.pages.forEach((page) => {
        if (page.style.isNVue) {
            return;
        }
        const pagePath = page.path;
        const pageIdentifier = (0, utils_1.normalizeIdentifier)(pagePath);
        const pagePathWithExtname = (0, utils_1.normalizePagePath)(pagePath, 'app');
        if (pagePathWithExtname) {
            if (process.env.UNI_APP_CODE_SPLITING) {
                // 拆分页面
                importPagesCode.push(`const ${pageIdentifier} = ()=>import('./${pagePathWithExtname}')`);
            }
            else {
                importPagesCode.push(`import ${pageIdentifier} from './${pagePathWithExtname}'`);
            }
            definePagesCode.push(`__definePage('${pagePath}',${pageIdentifier})`);
        }
    });
    return importPagesCode.join('\n') + '\n' + definePagesCode.join('\n');
}
exports.definePageCode = definePageCode;
function defineNVuePageCode(pagesJson) {
    const importNVuePagesCode = [];
    pagesJson.pages.forEach((page) => {
        if (!page.style.isNVue) {
            return;
        }
        const pagePathWithExtname = (0, utils_1.normalizePagePath)(page.path, 'app');
        if (pagePathWithExtname) {
            importNVuePagesCode.push(`import('./${pagePathWithExtname}').then(()=>{})`);
        }
    });
    return importNVuePagesCode.join('\n');
}
exports.defineNVuePageCode = defineNVuePageCode;

}, function(modId) { var map = {"../../../utils":1660207800502}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800551, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeAppUniConfig = void 0;
const path_1 = __importDefault(require("path"));
const i18n_1 = require("../../../i18n");
const manifest_1 = require("../../manifest");
const manifest_2 = require("../manifest");
const arguments_1 = require("../manifest/arguments");
const splashscreen_1 = require("../manifest/splashscreen");
function normalizeAppUniConfig(pagesJson, manifestJson) {
    var _a;
    const { autoclose, alwaysShowBeforeRender } = (0, splashscreen_1.getSplashscreen)(manifestJson);
    const config = {
        pages: [],
        globalStyle: pagesJson.globalStyle,
        nvue: {
            compiler: (0, manifest_2.getNVueCompiler)(manifestJson),
            styleCompiler: (0, manifest_2.getNVueStyleCompiler)(manifestJson),
            'flex-direction': (0, manifest_2.getNVueFlexDirection)(manifestJson),
        },
        renderer: ((_a = manifestJson['app-plus']) === null || _a === void 0 ? void 0 : _a.renderer) === 'native' ? 'native' : 'auto',
        appname: manifestJson.name || '',
        splashscreen: {
            alwaysShowBeforeRender,
            autoclose,
        },
        compilerVersion: process.env.UNI_COMPILER_VERSION,
        ...parseEntryPagePath(pagesJson),
        networkTimeout: (0, manifest_1.normalizeNetworkTimeout)(manifestJson.networkTimeout),
        tabBar: pagesJson.tabBar,
        locales: (0, i18n_1.initLocales)(path_1.default.join(process.env.UNI_INPUT_DIR, 'locale')),
    };
    // TODO 待支持分包
    return JSON.stringify(config);
}
exports.normalizeAppUniConfig = normalizeAppUniConfig;
function parseEntryPagePath(pagesJson) {
    var _a;
    const res = {
        entryPagePath: '',
        entryPageQuery: '',
        realEntryPagePath: '',
    };
    if (!pagesJson.pages.length) {
        return res;
    }
    res.entryPagePath = pagesJson.pages[0].path;
    const argsJsonStr = (0, arguments_1.parseArguments)(pagesJson);
    if (argsJsonStr) {
        try {
            const args = JSON.parse(argsJsonStr);
            const entryPagePath = args.path || args.pathName;
            const realEntryPagePath = res.entryPagePath;
            if (entryPagePath && realEntryPagePath !== entryPagePath) {
                res.entryPagePath = entryPagePath;
                res.entryPageQuery = args.query ? '?' + args.query : '';
                // non tabBar page
                if (!(((_a = pagesJson.tabBar) === null || _a === void 0 ? void 0 : _a.list) || []).find((page) => page.pagePath === entryPagePath)) {
                    res.realEntryPagePath = realEntryPagePath;
                }
            }
        }
        catch (e) { }
    }
    return res;
}

}, function(modId) { var map = {"../../../i18n":1660207800552,"../../manifest":1660207800553,"../manifest":1660207800554,"../manifest/arguments":1660207800559,"../manifest/splashscreen":1660207800561}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800552, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveI18nLocale = exports.initLocales = exports.getLocaleFiles = exports.isUniAppLocaleFile = exports.initI18nOptionsOnce = exports.initI18nOptions = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const fast_glob_1 = require("fast-glob");
const shared_1 = require("@vue/shared");
const uni_shared_1 = require("@dcloudio/uni-shared");
const json_1 = require("./json");
const messages_1 = require("./messages");
function initI18nOptions(platform, inputDir, warning = false, withMessages = true) {
    const locales = initLocales(path_1.default.resolve(inputDir, 'locale'), withMessages);
    if (!Object.keys(locales).length) {
        return;
    }
    const manifestJson = (0, json_1.parseManifestJsonOnce)(inputDir);
    const fallbackLocale = manifestJson.fallbackLocale || manifestJson.locale;
    const locale = resolveI18nLocale(platform, Object.keys(locales), fallbackLocale);
    if (warning) {
        if (!fallbackLocale) {
            console.warn(messages_1.M['i18n.fallbackLocale.default'].replace('{locale}', locale));
        }
        else if (locale !== fallbackLocale) {
            console.warn(messages_1.M['i18n.fallbackLocale.missing'].replace('{locale}', fallbackLocale));
        }
    }
    return {
        locale,
        locales,
        delimiters: uni_shared_1.I18N_JSON_DELIMITERS,
    };
}
exports.initI18nOptions = initI18nOptions;
exports.initI18nOptionsOnce = (0, uni_shared_1.once)(initI18nOptions);
const localeJsonRE = /uni-app.*.json/;
function isUniAppLocaleFile(filepath) {
    if (!filepath) {
        return false;
    }
    return localeJsonRE.test(path_1.default.basename(filepath));
}
exports.isUniAppLocaleFile = isUniAppLocaleFile;
function parseLocaleJson(filepath) {
    let jsonObj = (0, json_1.parseJson)(fs_1.default.readFileSync(filepath, 'utf8'));
    if (isUniAppLocaleFile(filepath)) {
        jsonObj = jsonObj.common || {};
    }
    return jsonObj;
}
function getLocaleFiles(cwd) {
    return (0, fast_glob_1.sync)('*.json', { cwd, absolute: true });
}
exports.getLocaleFiles = getLocaleFiles;
function initLocales(dir, withMessages = true) {
    if (!fs_1.default.existsSync(dir)) {
        return {};
    }
    return fs_1.default.readdirSync(dir).reduce((res, filename) => {
        if (path_1.default.extname(filename) === '.json') {
            try {
                const locale = path_1.default
                    .basename(filename)
                    .replace(/(uni-app.)?(.*).json/, '$2');
                if (withMessages) {
                    (0, shared_1.extend)(res[locale] || (res[locale] = {}), parseLocaleJson(path_1.default.join(dir, filename)));
                }
                else {
                    res[locale] = {};
                }
            }
            catch (e) { }
        }
        return res;
    }, {});
}
exports.initLocales = initLocales;
function resolveI18nLocale(platfrom, locales, locale) {
    if (locale && locales.includes(locale)) {
        return locale;
    }
    const defaultLocales = ['zh-Hans', 'zh-Hant'];
    if (platfrom === 'app' || platfrom === 'h5') {
        defaultLocales.unshift('en');
    }
    else {
        // 小程序
        defaultLocales.push('en');
    }
    return defaultLocales.find((locale) => locales.includes(locale)) || locales[0];
}
exports.resolveI18nLocale = resolveI18nLocale;

}, function(modId) { var map = {"fs":1660207800499,"./json":1660207800541,"./messages":1660207800518}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800553, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDevServerOptions = exports.isEnableTreeShaking = exports.getRouterOptions = exports.isUniPushOffline = exports.isEnableUniPushV2 = exports.isEnableUniPushV1 = exports.getUniStatistics = exports.normalizeNetworkTimeout = exports.parseCompatConfigOnce = exports.parseRpx2UnitOnce = exports.parseManifestJsonOnce = exports.parseManifestJson = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const shared_1 = require("@vue/shared");
const uni_shared_1 = require("@dcloudio/uni-shared");
const json_1 = require("./json");
const parseManifestJson = (inputDir) => {
    return (0, json_1.parseJson)(fs_1.default.readFileSync(path_1.default.join(inputDir, 'manifest.json'), 'utf8'));
};
exports.parseManifestJson = parseManifestJson;
exports.parseManifestJsonOnce = (0, uni_shared_1.once)(exports.parseManifestJson);
exports.parseRpx2UnitOnce = (0, uni_shared_1.once)((inputDir, platform = 'h5') => {
    const rpx2unit = platform === 'h5' || platform === 'app'
        ? uni_shared_1.defaultRpx2Unit
        : uni_shared_1.defaultMiniProgramRpx2Unit;
    const platformOptions = (0, exports.parseManifestJsonOnce)(inputDir)[platform];
    if (platformOptions && platformOptions.rpx) {
        return (0, shared_1.extend)({}, rpx2unit, platformOptions);
    }
    return (0, shared_1.extend)({}, rpx2unit);
});
function parseCompatConfig(_inputDir) {
    // 不支持 mode:2
    return { MODE: 3 }; //parseManifestJsonOnce(inputDir).compatConfig || {}
}
exports.parseCompatConfigOnce = (0, uni_shared_1.once)(parseCompatConfig);
const defaultNetworkTimeout = {
    request: 60000,
    connectSocket: 60000,
    uploadFile: 60000,
    downloadFile: 60000,
};
function normalizeNetworkTimeout(networkTimeout) {
    return {
        ...defaultNetworkTimeout,
        ...networkTimeout,
    };
}
exports.normalizeNetworkTimeout = normalizeNetworkTimeout;
function getUniStatistics(inputDir, platform) {
    const manifest = (0, exports.parseManifestJsonOnce)(inputDir);
    return (0, shared_1.extend)({}, manifest.uniStatistics, manifest[platform] && manifest[platform].uniStatistics);
}
exports.getUniStatistics = getUniStatistics;
function isEnableUniPushV1(inputDir, platform) {
    var _a, _b, _c;
    if (isEnableUniPushV2(inputDir, platform)) {
        return false;
    }
    const manifest = (0, exports.parseManifestJsonOnce)(inputDir);
    if (platform === 'app') {
        const push = (_c = (_b = (_a = manifest['app-plus']) === null || _a === void 0 ? void 0 : _a.distribute) === null || _b === void 0 ? void 0 : _b.sdkConfigs) === null || _c === void 0 ? void 0 : _c.push;
        if (push && (0, shared_1.hasOwn)(push, 'unipush')) {
            return true;
        }
    }
    return false;
}
exports.isEnableUniPushV1 = isEnableUniPushV1;
function isEnableUniPushV2(inputDir, platform) {
    var _a, _b, _c, _d, _e, _f, _g;
    const manifest = (0, exports.parseManifestJsonOnce)(inputDir);
    if (platform === 'app') {
        return (((_e = (_d = (_c = (_b = (_a = manifest['app-plus']) === null || _a === void 0 ? void 0 : _a.distribute) === null || _b === void 0 ? void 0 : _b.sdkConfigs) === null || _c === void 0 ? void 0 : _c.push) === null || _d === void 0 ? void 0 : _d.unipush) === null || _e === void 0 ? void 0 : _e.version) ==
            '2');
    }
    return ((_g = (_f = manifest[platform]) === null || _f === void 0 ? void 0 : _f.unipush) === null || _g === void 0 ? void 0 : _g.enable) === true;
}
exports.isEnableUniPushV2 = isEnableUniPushV2;
function isUniPushOffline(inputDir) {
    var _a, _b, _c, _d, _e;
    const manifest = (0, exports.parseManifestJsonOnce)(inputDir);
    return (((_e = (_d = (_c = (_b = (_a = manifest['app-plus']) === null || _a === void 0 ? void 0 : _a.distribute) === null || _b === void 0 ? void 0 : _b.sdkConfigs) === null || _c === void 0 ? void 0 : _c.push) === null || _d === void 0 ? void 0 : _d.unipush) === null || _e === void 0 ? void 0 : _e.offline) ===
        true);
}
exports.isUniPushOffline = isUniPushOffline;
function getRouterOptions(manifestJson) {
    var _a;
    return (0, shared_1.extend)({}, (_a = manifestJson.h5) === null || _a === void 0 ? void 0 : _a.router);
}
exports.getRouterOptions = getRouterOptions;
function isEnableTreeShaking(manifestJson) {
    var _a, _b, _c;
    return ((_c = (_b = (_a = manifestJson.h5) === null || _a === void 0 ? void 0 : _a.optimization) === null || _b === void 0 ? void 0 : _b.treeShaking) === null || _c === void 0 ? void 0 : _c.enable) !== false;
}
exports.isEnableTreeShaking = isEnableTreeShaking;
function getDevServerOptions(manifestJson) {
    var _a;
    return (0, shared_1.extend)({}, (_a = manifestJson.h5) === null || _a === void 0 ? void 0 : _a.devServer);
}
exports.getDevServerOptions = getDevServerOptions;

}, function(modId) { var map = {"./json":1660207800514}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800554, function(require, module, exports) {

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNVueFlexDirection = exports.getNVueStyleCompiler = exports.getNVueCompiler = exports.hasConfusionFile = exports.isConfusionFile = exports.APP_CONFUSION_FILENAME = exports.normalizeAppManifestJson = void 0;
const merge_1 = require("./merge");
const defaultManifestJson_1 = require("./defaultManifestJson");
const statusbar_1 = require("./statusbar");
const plus_1 = require("./plus");
const nvue_1 = require("./nvue");
const arguments_1 = require("./arguments");
const safearea_1 = require("./safearea");
const splashscreen_1 = require("./splashscreen");
const confusion_1 = require("./confusion");
const uniApp_1 = require("./uniApp");
const launchwebview_1 = require("./launchwebview");
const checksystemwebview_1 = require("./checksystemwebview");
const tabBar_1 = require("./tabBar");
const i18n_1 = require("./i18n");
function normalizeAppManifestJson(userManifestJson, pagesJson) {
    const manifestJson = (0, merge_1.initRecursiveMerge)((0, statusbar_1.initAppStatusbar)((0, defaultManifestJson_1.initDefaultManifestJson)(), pagesJson), userManifestJson);
    (0, arguments_1.initArguments)(manifestJson, pagesJson);
    (0, plus_1.initPlus)(manifestJson, pagesJson);
    (0, nvue_1.initNVue)(manifestJson, pagesJson);
    (0, safearea_1.initSafearea)(manifestJson, pagesJson);
    (0, splashscreen_1.initSplashscreen)(manifestJson, userManifestJson);
    (0, confusion_1.initConfusion)(manifestJson);
    (0, uniApp_1.initUniApp)(manifestJson);
    // 依赖 initArguments 先执行
    (0, tabBar_1.initTabBar)((0, launchwebview_1.initLaunchwebview)(manifestJson, pagesJson), manifestJson, pagesJson);
    // 依赖 initUniApp 先执行
    (0, checksystemwebview_1.initCheckSystemWebview)(manifestJson);
    return (0, i18n_1.initI18n)(manifestJson);
}
exports.normalizeAppManifestJson = normalizeAppManifestJson;
__exportStar(require("./env"), exports);
var confusion_2 = require("./confusion");
Object.defineProperty(exports, "APP_CONFUSION_FILENAME", { enumerable: true, get: function () { return confusion_2.APP_CONFUSION_FILENAME; } });
Object.defineProperty(exports, "isConfusionFile", { enumerable: true, get: function () { return confusion_2.isConfusionFile; } });
Object.defineProperty(exports, "hasConfusionFile", { enumerable: true, get: function () { return confusion_2.hasConfusionFile; } });
var nvue_2 = require("./nvue");
Object.defineProperty(exports, "getNVueCompiler", { enumerable: true, get: function () { return nvue_2.getNVueCompiler; } });
Object.defineProperty(exports, "getNVueStyleCompiler", { enumerable: true, get: function () { return nvue_2.getNVueStyleCompiler; } });
Object.defineProperty(exports, "getNVueFlexDirection", { enumerable: true, get: function () { return nvue_2.getNVueFlexDirection; } });

}, function(modId) { var map = {"./merge":1660207800555,"./defaultManifestJson":1660207800556,"./statusbar":1660207800557,"./plus":1660207800558,"./nvue":1660207800506,"./arguments":1660207800559,"./safearea":1660207800560,"./splashscreen":1660207800561,"./confusion":1660207800562,"./uniApp":1660207800563,"./launchwebview":1660207800564,"./checksystemwebview":1660207800565,"./tabBar":1660207800566,"./i18n":1660207800567,"./env":1660207800568}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800555, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.initRecursiveMerge = void 0;
const merge_1 = require("merge");
function initRecursiveMerge(manifestJson, userManifestJson) {
    return (0, merge_1.recursive)(true, manifestJson, {
        id: userManifestJson.appid || '',
        name: userManifestJson.name || '',
        description: userManifestJson.description || '',
        version: {
            name: userManifestJson.versionName,
            code: userManifestJson.versionCode,
        },
        locale: userManifestJson.locale,
        uniStatistics: userManifestJson.uniStatistics,
    }, { plus: userManifestJson['app-plus'] });
}
exports.initRecursiveMerge = initRecursiveMerge;

}, function(modId) { var map = {"merge":1660207800555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800556, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.initDefaultManifestJson = void 0;
function initDefaultManifestJson() {
    return JSON.parse(defaultManifestJson);
}
exports.initDefaultManifestJson = initDefaultManifestJson;
const defaultManifestJson = `{
    "@platforms": [
        "android",
        "iPhone",
        "iPad"
    ],
    "id": "__WEAPP_ID",
    "name": "__WEAPP_NAME",
    "version": {
        "name": "1.0",
        "code": ""
    },
    "description": "",
    "developer": {
        "name": "",
        "email": "",
        "url": ""
    },
    "permissions": {},
    "plus": {
        "useragent": {
            "value": "uni-app appservice",
            "concatenate": true
        },
        "splashscreen": {
            "target":"id:1",
            "autoclose": true,
            "waiting": true,
            "alwaysShowBeforeRender":true
        },
        "popGesture": "close",
        "launchwebview": {}
    }
  }`;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800557, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.initAppStatusbar = void 0;
function initAppStatusbar(manifestJson, pagesJson) {
    var _a;
    const { titleColor = '#000', backgroundColor = '#000000' } = ((_a = pagesJson.globalStyle) === null || _a === void 0 ? void 0 : _a.navigationBar) || {};
    manifestJson.plus.statusbar = {
        immersed: 'supportedDevice',
        style: titleColor === '#000' ? 'dark' : 'light',
        background: backgroundColor,
    };
    return manifestJson;
}
exports.initAppStatusbar = initAppStatusbar;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800558, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.initPlus = void 0;
const shared_1 = require("@vue/shared");
const merge_1 = require("merge");
const wxPageOrientationMapping = {
    auto: [
        'portrait-primary',
        'portrait-secondary',
        'landscape-primary',
        'landscape-secondary',
    ],
    portrait: ['portrait-primary', 'portrait-secondary'],
    landscape: ['landscape-primary', 'landscape-secondary'],
};
function initPlus(manifestJson, pagesJson) {
    var _a;
    initUniStatistics(manifestJson);
    // 转换为老版本配置
    if (manifestJson.plus.modules) {
        manifestJson.permissions = manifestJson.plus.modules;
        delete manifestJson.plus.modules;
    }
    const distribute = manifestJson.plus.distribute;
    if (distribute) {
        if (distribute.android) {
            manifestJson.plus.distribute.google = distribute.android;
            delete manifestJson.plus.distribute.android;
        }
        if (distribute.ios) {
            manifestJson.plus.distribute.apple = distribute.ios;
            delete manifestJson.plus.distribute.ios;
        }
        if (distribute.sdkConfigs) {
            manifestJson.plus.distribute.plugins = distribute.sdkConfigs;
            delete manifestJson.plus.distribute.sdkConfigs;
        }
    }
    // 屏幕启动方向
    if (manifestJson.plus.screenOrientation) {
        // app平台优先使用 manifest 配置
        manifestJson.screenOrientation = manifestJson.plus.screenOrientation;
        delete manifestJson.plus.screenOrientation;
    }
    else if ((_a = pagesJson.globalStyle) === null || _a === void 0 ? void 0 : _a.pageOrientation) {
        // 兼容微信小程序
        const pageOrientationValue = wxPageOrientationMapping[pagesJson.globalStyle
            .pageOrientation];
        if (pageOrientationValue) {
            manifestJson.screenOrientation = pageOrientationValue;
        }
    }
    // 全屏配置
    manifestJson.fullscreen = manifestJson.plus.fullscreen;
    // 地图坐标系
    if (manifestJson.permissions && manifestJson.permissions.Maps) {
        manifestJson.permissions.Maps.coordType = 'gcj02';
    }
    if (!manifestJson.permissions) {
        manifestJson.permissions = {};
    }
    manifestJson.permissions.UniNView = {
        description: 'UniNView原生渲染',
    };
    // 允许内联播放视频
    manifestJson.plus.allowsInlineMediaPlayback = true;
    if (!manifestJson.plus.distribute) {
        manifestJson.plus.distribute = {
            plugins: {},
        };
    }
    if (!manifestJson.plus.distribute.plugins) {
        manifestJson.plus.distribute.plugins = {};
    }
    // 录音支持 mp3
    manifestJson.plus.distribute.plugins.audio = {
        mp3: {
            description: 'Android平台录音支持MP3格式文件',
        },
    };
    // 有效值为 close,none
    if (!['close', 'none'].includes(manifestJson.plus.popGesture)) {
        manifestJson.plus.popGesture = 'close';
    }
}
exports.initPlus = initPlus;
function initUniStatistics(manifestJson) {
    var _a;
    // 根节点配置了统计
    if (manifestJson.uniStatistics) {
        manifestJson.plus.uniStatistics = (0, merge_1.recursive)(true, manifestJson.uniStatistics, manifestJson.plus.uniStatistics);
        delete manifestJson.uniStatistics;
    }
    if (!process.env.UNI_CLOUD_PROVIDER) {
        return;
    }
    let spaces = [];
    try {
        spaces = JSON.parse(process.env.UNI_CLOUD_PROVIDER);
    }
    catch (e) { }
    if (!(0, shared_1.isArray)(spaces) || !spaces.length) {
        return;
    }
    const space = spaces[0];
    if (!space) {
        return;
    }
    const uniStatistics = (_a = manifestJson.plus) === null || _a === void 0 ? void 0 : _a.uniStatistics;
    if (!uniStatistics) {
        return;
    }
    if (uniStatistics.version === 2 || uniStatistics.version === '2') {
        if (uniStatistics.uniCloud && uniStatistics.uniCloud.spaceId) {
            return;
        }
        uniStatistics.uniCloud = {
            provider: space.provider,
            spaceId: space.spaceId,
            clientSecret: space.clientSecret,
            endpoint: space.endpoint,
        };
    }
}

}, function(modId) { var map = {"merge":1660207800555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800559, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.parseArguments = exports.initArguments = void 0;
function initArguments(manifestJson, pagesJson) {
    const args = parseArguments(pagesJson);
    if (args) {
        manifestJson.plus.arguments = args;
    }
}
exports.initArguments = initArguments;
function parseArguments(pagesJson) {
    var _a;
    if (process.env.NODE_ENV !== 'development') {
        return;
    }
    // 指定了入口
    if (process.env.UNI_CLI_LAUNCH_PAGE_PATH) {
        return JSON.stringify({
            path: process.env.UNI_CLI_LAUNCH_PAGE_PATH,
            query: process.env.UNI_CLI_LAUNCH_PAGE_QUERY,
        });
    }
    const condition = pagesJson.condition;
    if (condition && ((_a = condition.list) === null || _a === void 0 ? void 0 : _a.length)) {
        const list = condition.list;
        let current = condition.current || 0;
        if (current < 0) {
            current = 0;
        }
        if (current >= list.length) {
            current = 0;
        }
        return JSON.stringify(list[current]);
    }
}
exports.parseArguments = parseArguments;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800560, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.initSafearea = void 0;
function initSafearea(manifestJson, pagesJson) {
    var _a, _b;
    if ((_b = (_a = pagesJson.tabBar) === null || _a === void 0 ? void 0 : _a.list) === null || _b === void 0 ? void 0 : _b.length) {
        // 安全区配置 仅包含 tabBar 的时候才配置
        if (!manifestJson.plus.safearea) {
            manifestJson.plus.safearea = {
                background: pagesJson.tabBar.backgroundColor || '#FFFFFF',
                bottom: {
                    offset: 'auto',
                },
            };
        }
    }
    else {
        if (!manifestJson.plus.launchwebview) {
            manifestJson.plus.launchwebview = {
                render: 'always',
            };
        }
        else if (!manifestJson.plus.launchwebview.render) {
            manifestJson.plus.launchwebview.render = 'always';
        }
    }
}
exports.initSafearea = initSafearea;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800561, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.getSplashscreen = exports.initSplashscreen = void 0;
const shared_1 = require("@vue/shared");
function initSplashscreen(manifestJson, userManifestJson) {
    if (!manifestJson.plus.splashscreen) {
        return;
    }
    // 强制白屏检测
    const splashscreenOptions = userManifestJson['app-plus'] && userManifestJson['app-plus'].splashscreen;
    const hasAlwaysShowBeforeRender = splashscreenOptions && (0, shared_1.hasOwn)(splashscreenOptions, 'alwaysShowBeforeRender');
    if (!hasAlwaysShowBeforeRender &&
        manifestJson.plus.splashscreen.autoclose === false) {
        // 兼容旧版本仅配置了 autoclose 为 false
        manifestJson.plus.splashscreen.alwaysShowBeforeRender = false;
    }
    if (manifestJson.plus.splashscreen.alwaysShowBeforeRender) {
        // 白屏检测
        if (!manifestJson.plus.splashscreen.target) {
            manifestJson.plus.splashscreen.target = 'id:1';
        }
        manifestJson.plus.splashscreen.autoclose = true;
        manifestJson.plus.splashscreen.delay = 0;
    }
    else {
        // 不启用白屏检测
        delete manifestJson.plus.splashscreen.target;
        if (manifestJson.plus.splashscreen.autoclose) {
            // 启用 uni-app 框架关闭 splash
            manifestJson.plus.splashscreen.autoclose = false; // 原 5+ autoclose 改为 false
        }
    }
    delete manifestJson.plus.splashscreen.alwaysShowBeforeRender;
}
exports.initSplashscreen = initSplashscreen;
function getSplashscreen(manifestJson) {
    var _a;
    const splashscreenOptions = (_a = manifestJson['app-plus']) === null || _a === void 0 ? void 0 : _a.splashscreen;
    return {
        autoclose: splashscreenOptions.autoclose !== false,
        alwaysShowBeforeRender: splashscreenOptions.alwaysShowBeforeRender !== false,
    };
}
exports.getSplashscreen = getSplashscreen;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800562, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initConfusion = exports.hasConfusionFile = exports.isConfusionFile = exports.APP_CONFUSION_FILENAME = void 0;
const path_1 = __importDefault(require("path"));
const utils_1 = require("../../../utils");
const constants_1 = require("../../../constants");
const manifest_1 = require("../../manifest");
function isJsFile(filename) {
    return constants_1.EXTNAME_JS_RE.test(filename);
}
function isStaticJsFile(filename) {
    return (filename.indexOf('hybrid/html') === 0 ||
        filename.indexOf('static/') === 0 ||
        filename.indexOf('/static/') !== -1); // subpackages, uni_modules 中的 static 目录
}
const dynamicConfusionJsFiles = [];
exports.APP_CONFUSION_FILENAME = 'app-confusion.js';
function isConfusionFile(filename) {
    return dynamicConfusionJsFiles.includes((0, utils_1.normalizePath)(filename));
}
exports.isConfusionFile = isConfusionFile;
function hasConfusionFile(inputDir) {
    var _a, _b;
    if (inputDir) {
        const manifestJson = (0, manifest_1.parseManifestJsonOnce)(inputDir);
        const resources = (_b = (_a = manifestJson['app-plus']) === null || _a === void 0 ? void 0 : _a.confusion) === null || _b === void 0 ? void 0 : _b.resources;
        if (resources && parseConfusion(resources)[1].length) {
            return true;
        }
    }
    return !!dynamicConfusionJsFiles.length;
}
exports.hasConfusionFile = hasConfusionFile;
function parseConfusion(resources) {
    const res = {};
    const dynamicJsFiles = [];
    Object.keys(resources).reduce((res, name) => {
        const extname = path_1.default.extname(name);
        if (extname === '.nvue') {
            res[name.replace('.nvue', '.js')] = resources[name];
        }
        else if (isJsFile(name)) {
            // 静态 js 加密
            if (isStaticJsFile(name)) {
                res[name] = resources[name];
            }
            else {
                // 非静态 js 将被合并进 app-confusion.js
                dynamicJsFiles.push(name);
            }
        }
        else {
            throw new Error(`原生混淆仅支持 nvue 页面，错误的页面路径：${name}`);
        }
        // TODO 旧编译器会检查要加密的 nvue 页面（包括subnvue）是否被使用？后续有时间再考虑支持吧，意义不太大
        return res;
    }, res);
    if (dynamicJsFiles.length) {
        res[exports.APP_CONFUSION_FILENAME] = {};
    }
    return [res, dynamicJsFiles];
}
function initConfusion(manifestJson) {
    var _a;
    dynamicConfusionJsFiles.length = 0;
    if (!((_a = manifestJson.plus.confusion) === null || _a === void 0 ? void 0 : _a.resources)) {
        return;
    }
    const resources = manifestJson.plus.confusion.resources;
    const [res, dynamicJsFiles] = parseConfusion(resources);
    manifestJson.plus.confusion.resources = res;
    dynamicConfusionJsFiles.push(...dynamicJsFiles);
}
exports.initConfusion = initConfusion;

}, function(modId) { var map = {"../../../utils":1660207800502,"../../../constants":1660207800503,"../../manifest":1660207800553}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800563, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.initUniApp = void 0;
const nvue_1 = require("./nvue");
function initUniApp(manifestJson) {
    manifestJson.plus['uni-app'] = {
        control: 'uni-v3',
        vueVersion: '3',
        compilerVersion: process.env.UNI_COMPILER_VERSION,
        nvueCompiler: (0, nvue_1.getNVueCompiler)(manifestJson),
        renderer: 'auto',
        nvue: {
            'flex-direction': (0, nvue_1.getNVueFlexDirection)(manifestJson),
        },
        nvueLaunchMode: manifestJson.plus.nvueLaunchMode === 'fast' ? 'fast' : 'normal',
    };
    delete manifestJson.plus.nvueLaunchMode;
}
exports.initUniApp = initUniApp;

}, function(modId) { var map = {"./nvue":1660207800506}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800564, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.initLaunchwebview = void 0;
const shared_1 = require("@vue/shared");
function initLaunchwebview(manifestJson, pagesJson) {
    let entryPagePath = pagesJson.pages[0].path;
    // 依赖前置执行initArguments
    if (manifestJson.plus.arguments) {
        try {
            const args = JSON.parse(manifestJson.plus.arguments);
            if (args.path) {
                entryPagePath = args.path;
            }
        }
        catch (e) { }
    }
    manifestJson.plus.useragent.value = 'uni-app';
    (0, shared_1.extend)(manifestJson.plus.launchwebview, {
        id: '1',
        kernel: 'WKWebview',
    });
    // 首页为nvue
    const entryPage = pagesJson.pages.find((p) => p.path === entryPagePath);
    if (entryPage === null || entryPage === void 0 ? void 0 : entryPage.style.isNVue) {
        manifestJson.plus.launchwebview.uniNView = { path: entryPagePath + '.js' };
    }
    else {
        manifestJson.launch_path = '__uniappview.html';
    }
    return entryPagePath;
}
exports.initLaunchwebview = initLaunchwebview;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800565, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.initCheckSystemWebview = void 0;
function initCheckSystemWebview(manifestJson) {
    // 检查Android系统webview版本 || 下载X5后启动
    let plusWebview = manifestJson.plus.webView;
    if (plusWebview) {
        manifestJson.plus['uni-app'].webView = plusWebview;
        delete manifestJson.plus.webView;
    }
}
exports.initCheckSystemWebview = initCheckSystemWebview;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800566, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.initTabBar = void 0;
const uni_shared_1 = require("@dcloudio/uni-shared");
const TABBAR_WHITE = 'rgba(255,255,255,0.4)';
const TABBAR_BLACK = 'rgba(0,0,0,0.4)';
function initTabBar(entryPagePath, manifestJson, pagesJson) {
    var _a, _b;
    if (!((_b = (_a = pagesJson.tabBar) === null || _a === void 0 ? void 0 : _a.list) === null || _b === void 0 ? void 0 : _b.length)) {
        return;
    }
    const tabBar = JSON.parse(JSON.stringify(pagesJson.tabBar));
    tabBar.borderStyle = (tabBar.borderStyle === 'white' ? TABBAR_WHITE : TABBAR_BLACK);
    if (!tabBar.selectedColor) {
        tabBar.selectedColor = uni_shared_1.SELECTED_COLOR;
    }
    tabBar.height = `${parseFloat(tabBar.height) || uni_shared_1.TABBAR_HEIGHT}px`;
    // 首页是 tabBar 页面
    const item = tabBar.list.find((page) => page.pagePath === entryPagePath);
    if (item) {
        ;
        tabBar.child = ['lauchwebview'];
        tabBar.selected = tabBar.list.indexOf(item);
    }
    manifestJson.plus.tabBar = tabBar;
}
exports.initTabBar = initTabBar;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800567, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.initI18n = void 0;
const uni_i18n_1 = require("@dcloudio/uni-i18n");
const i18n_1 = require("../../../i18n");
function initI18n(manifestJson) {
    const i18nOptions = (0, i18n_1.initI18nOptions)(process.env.UNI_PLATFORM, process.env.UNI_INPUT_DIR, true);
    if (i18nOptions) {
        manifestJson = JSON.parse((0, uni_i18n_1.compileI18nJsonStr)(JSON.stringify(manifestJson), i18nOptions));
        manifestJson.fallbackLocale = i18nOptions.locale;
    }
    return manifestJson;
}
exports.initI18n = initI18n;

}, function(modId) { var map = {"../../../i18n":1660207800552}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800568, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppStyleIsolation = exports.getAppCodeSpliting = exports.getAppRenderer = void 0;
function getAppRenderer(manifestJson) {
    const platformOptions = manifestJson['app-plus'];
    if (platformOptions && platformOptions.renderer === 'native') {
        return 'native';
    }
    return '';
}
exports.getAppRenderer = getAppRenderer;
function getAppCodeSpliting(manifestJson) {
    var _a, _b;
    if (((_b = (_a = manifestJson['app-plus']) === null || _a === void 0 ? void 0 : _a.optimization) === null || _b === void 0 ? void 0 : _b.codeSpliting) === true) {
        return true;
    }
    return false;
}
exports.getAppCodeSpliting = getAppCodeSpliting;
function getAppStyleIsolation(manifestJson) {
    var _a, _b, _c;
    return ((_c = (_b = (_a = manifestJson['app-plus']) === null || _a === void 0 ? void 0 : _a.optimization) === null || _b === void 0 ? void 0 : _b.styleIsolation) !== null && _c !== void 0 ? _c : 'apply-shared');
}
exports.getAppStyleIsolation = getAppStyleIsolation;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800569, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeAppUniRoutes = void 0;
const pages_1 = require("../../pages");
function normalizeAppUniRoutes(pagesJson) {
    return JSON.stringify((0, pages_1.normalizePagesRoute)(pagesJson));
}
exports.normalizeAppUniRoutes = normalizeAppUniRoutes;

}, function(modId) { var map = {"../../pages":1660207800544}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800570, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initH5Provide = exports.initAppProvide = void 0;
const path_1 = __importDefault(require("path"));
const libDir = path_1.default.resolve(__dirname, '../../lib');
function initAppProvide() {
    const cryptoDefine = [path_1.default.join(libDir, 'crypto.js'), 'default'];
    return {
        __f__: ['@dcloudio/uni-shared', 'formatAppLog'],
        crypto: cryptoDefine,
        'window.crypto': cryptoDefine,
        'global.crypto': cryptoDefine,
        'uni.getCurrentSubNVue': ['@dcloudio/uni-app', 'getCurrentSubNVue'],
        'uni.requireNativePlugin': ['@dcloudio/uni-app', 'requireNativePlugin'],
    };
}
exports.initAppProvide = initAppProvide;
function initH5Provide() {
    return {
        __f__: ['@dcloudio/uni-shared', 'formatH5Log'],
    };
}
exports.initH5Provide = initH5Provide;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800571, function(require, module, exports) {

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniHBuilderXConsolePlugin = exports.formatInstallHBuilderXPluginTips = exports.installHBuilderXPlugin = exports.initModuleAlias = exports.formatAtFilename = void 0;
const path_1 = __importDefault(require("path"));
const utils_1 = require("../utils");
const console_1 = require("../vite/plugins/console");
var log_1 = require("./log");
Object.defineProperty(exports, "formatAtFilename", { enumerable: true, get: function () { return log_1.formatAtFilename; } });
__exportStar(require("./env"), exports);
var alias_1 = require("./alias");
Object.defineProperty(exports, "initModuleAlias", { enumerable: true, get: function () { return alias_1.initModuleAlias; } });
Object.defineProperty(exports, "installHBuilderXPlugin", { enumerable: true, get: function () { return alias_1.installHBuilderXPlugin; } });
Object.defineProperty(exports, "formatInstallHBuilderXPluginTips", { enumerable: true, get: function () { return alias_1.formatInstallHBuilderXPluginTips; } });
function uniHBuilderXConsolePlugin() {
    return (0, console_1.uniConsolePlugin)({
        filename(filename) {
            filename = path_1.default.relative(process.env.UNI_INPUT_DIR, filename);
            if (filename.startsWith('.') || path_1.default.isAbsolute(filename)) {
                return '';
            }
            return (0, utils_1.normalizePath)(filename);
        },
    });
}
exports.uniHBuilderXConsolePlugin = uniHBuilderXConsolePlugin;

}, function(modId) { var map = {"../utils":1660207800502,"../vite/plugins/console":1660207800572,"./log":1660207800574,"./env":1660207800532,"./alias":1660207800575}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800572, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniConsolePlugin = void 0;
const debug_1 = __importDefault(require("debug"));
const pluginutils_1 = require("@rollup/pluginutils");
const utils_1 = require("../utils");
const console_1 = require("../../logs/console");
const utils_2 = require("../../vite/utils/utils");
const debugConsole = (0, debug_1.default)('uni:console');
function uniConsolePlugin(options) {
    const filter = (0, pluginutils_1.createFilter)(options.include, options.exclude);
    let resolvedConfig;
    return {
        name: 'uni:console',
        enforce: 'pre',
        configResolved(config) {
            resolvedConfig = config;
        },
        transform(code, id) {
            if (!filter(id))
                return null;
            if (!(0, utils_1.isJsFile)(id))
                return null;
            let { filename } = (0, utils_1.parseVueRequest)(id);
            if (options.filename) {
                filename = options.filename(filename);
            }
            if (!filename) {
                return null;
            }
            if (!code.includes('console.')) {
                return null;
            }
            debugConsole(id);
            return (0, console_1.rewriteConsoleExpr)(id, filename, code, (0, utils_2.withSourcemap)(resolvedConfig));
        },
    };
}
exports.uniConsolePlugin = uniConsolePlugin;

}, function(modId) { var map = {"../utils":1660207800521,"../../logs/console":1660207800573,"../../vite/utils/utils":1660207800527}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800573, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rewriteConsoleExpr = void 0;
const magic_string_1 = __importDefault(require("magic-string"));
const utils_1 = require("../utils");
const F = '__f__';
function rewriteConsoleExpr(id, filename, code, sourceMap = false) {
    filename = (0, utils_1.normalizePath)(filename);
    const re = /(console\.(log|info|debug|warn|error))\(([^)]+)\)/g;
    const locate = getLocator(code);
    const s = new magic_string_1.default(code);
    let match;
    while ((match = re.exec(code))) {
        const [, expr, type] = match;
        s.overwrite(match.index, match.index + expr.length + 1, F + `('${type}','at ${filename}:${locate(match.index).line + 1}',`);
    }
    return {
        code: s.toString(),
        map: sourceMap ? s.generateMap({ source: id, hires: true }) : null,
    };
}
exports.rewriteConsoleExpr = rewriteConsoleExpr;
function getLocator(source) {
    const originalLines = source.split('\n');
    const lineOffsets = [];
    for (let i = 0, pos = 0; i < originalLines.length; i++) {
        lineOffsets.push(pos);
        pos += originalLines[i].length + 1;
    }
    return function locate(index) {
        let i = 0;
        let j = lineOffsets.length;
        while (i < j) {
            const m = (i + j) >> 1;
            if (index < lineOffsets[m]) {
                j = m;
            }
            else {
                i = m + 1;
            }
        }
        const line = i - 1;
        const column = index - lineOffsets[line];
        return { line, column };
    };
}

}, function(modId) { var map = {"../utils":1660207800502}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800574, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorFormatter = exports.removeWarnFormatter = exports.removeInfoFormatter = exports.h5ServeFormatter = exports.formatAtFilename = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const picocolors_1 = __importDefault(require("picocolors"));
const shared_1 = require("@vue/shared");
const utils_1 = require("../utils");
const constants_1 = require("../constants");
const ast_1 = require("../vite/utils/ast");
const utils_2 = require("../vite/plugins/vitejs/utils");
const SIGNAL_H5_LOCAL = ' > Local:';
const SIGNAL_H5_NETWORK = ' > Network:';
const networkLogs = [];
function formatAtFilename(filename, line, column) {
    return `at ${picocolors_1.default.cyan((0, utils_1.normalizePath)(path_1.default.relative(process.env.UNI_INPUT_DIR, filename.split('?')[0])) +
        ':' +
        (line || 1) +
        ':' +
        (column || 0))}`;
}
exports.formatAtFilename = formatAtFilename;
exports.h5ServeFormatter = {
    test(msg) {
        return msg.includes(SIGNAL_H5_LOCAL) || msg.includes(SIGNAL_H5_NETWORK);
    },
    format(msg) {
        if (msg.includes(SIGNAL_H5_NETWORK)) {
            networkLogs.push(msg);
            process.nextTick(() => {
                if (networkLogs.length) {
                    // 延迟打印所有 network,仅最后一个 network 替换 > 为 -，通知 hbx
                    const len = networkLogs.length - 1;
                    networkLogs[len] = networkLogs[len].replace('>', '-');
                    console.log(networkLogs.join('\n'));
                    networkLogs.length = 0;
                }
            });
            return '';
        }
        return msg.replace('>', '-');
    },
};
const REMOVED_MSGS = [
    'build started...',
    (msg) => {
        return /built in [0-9]+ms\./.test(msg);
    },
    'watching for file changes...',
];
exports.removeInfoFormatter = {
    test(msg) {
        return !!REMOVED_MSGS.find((m) => ((0, shared_1.isString)(m) ? msg.includes(m) : m(msg)));
    },
    format() {
        return '';
    },
};
const REMOVED_WARN_MSGS = [];
exports.removeWarnFormatter = {
    test(msg) {
        return !!REMOVED_WARN_MSGS.find((m) => msg.includes(m));
    },
    format() {
        return '';
    },
};
exports.errorFormatter = {
    test(_, opts) {
        return !!(opts && opts.error);
    },
    format(_, opts) {
        return buildErrorMessage(opts.error, [], false);
    },
};
function buildErrorMessage(err, args = [], includeStack = true) {
    var _a, _b;
    if (err.plugin) {
        args.push(`${picocolors_1.default.magenta('[plugin:' + err.plugin + ']')} ${picocolors_1.default.red(err.message)}`);
        if (err.loc &&
            err.hook === 'transform' &&
            err.plugin === 'rollup-plugin-dynamic-import-variables' &&
            err.id &&
            constants_1.EXTNAME_VUE_RE.test(err.id)) {
            try {
                const ast = (0, ast_1.parseVue)(fs_1.default.readFileSync(err.id, 'utf8'), []);
                const scriptNode = ast.children.find((node) => node.type === 1 /* ELEMENT */ && node.tag === 'script');
                if (scriptNode) {
                    const scriptLoc = scriptNode.loc;
                    args.push(picocolors_1.default.yellow(pad((0, utils_2.generateCodeFrame)(scriptLoc.source, err.loc))));
                    // correct error location
                    err.loc.line = scriptLoc.start.line + err.loc.line - 1;
                }
            }
            catch (e) { }
        }
    }
    else {
        args.push(picocolors_1.default.red(err.message));
    }
    if (err.id) {
        args.push(formatAtFilename(err.id, (_a = err.loc) === null || _a === void 0 ? void 0 : _a.line, (_b = err.loc) === null || _b === void 0 ? void 0 : _b.column));
    }
    if (err.frame) {
        args.push(picocolors_1.default.yellow(pad(err.frame)));
    }
    if (includeStack && err.stack) {
        args.push(pad(cleanStack(err.stack)));
    }
    return args.join('\n');
}
function cleanStack(stack) {
    return stack
        .split(/\n/g)
        .filter((l) => /^\s*at/.test(l))
        .join('\n');
}
const splitRE = /\r?\n/;
function pad(source, n = 2) {
    const lines = source.split(splitRE);
    return lines.map((l) => ` `.repeat(n) + l).join(`\n`);
}

}, function(modId) { var map = {"../utils":1660207800502,"../constants":1660207800503,"../vite/utils/ast":1660207800522,"../vite/plugins/vitejs/utils":1660207800526}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800575, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatInstallHBuilderXPluginTips = exports.moduleAliasFormatter = exports.installHBuilderXPlugin = exports.initModuleAlias = void 0;
const path_1 = __importDefault(require("path"));
const module_alias_1 = __importDefault(require("module-alias"));
const env_1 = require("./env");
const hbxPlugins = {
    // typescript: 'compile-typescript/node_modules/typescript',
    less: 'compile-less/node_modules/less',
    sass: 'compile-dart-sass/node_modules/sass',
    stylus: 'compile-stylus/node_modules/stylus',
    pug: 'compile-pug-cli/node_modules/pug',
};
function initModuleAlias() {
    const compilerSfcPath = require.resolve('@vue/compiler-sfc');
    const serverRendererPath = require.resolve('@vue/server-renderer');
    module_alias_1.default.addAliases({
        '@vue/shared': require.resolve('@vue/shared'),
        '@vue/shared/dist/shared.esm-bundler.js': require.resolve('@vue/shared/dist/shared.esm-bundler.js'),
        '@vue/compiler-dom': require.resolve('@vue/compiler-dom'),
        '@vue/compiler-sfc': compilerSfcPath,
        '@vue/server-renderer': serverRendererPath,
        'vue/compiler-sfc': compilerSfcPath,
        'vue/server-renderer': serverRendererPath,
    });
    if (process.env.VITEST) {
        module_alias_1.default.addAliases({
            vue: '@dcloudio/uni-h5-vue',
        });
    }
    if ((0, env_1.isInHBuilderX)()) {
        Object.keys(hbxPlugins).forEach((name) => {
            module_alias_1.default.addAlias(name, path_1.default.resolve(process.env.UNI_HBUILDERX_PLUGINS, hbxPlugins[name]));
        });
    }
}
exports.initModuleAlias = initModuleAlias;
function supportAutoInstallPlugin() {
    return !!process.env.HX_Version;
}
function installHBuilderXPlugin(plugin) {
    if (!supportAutoInstallPlugin()) {
        return;
    }
    return console.error(`%HXRunUniAPPPluginName%${plugin}%HXRunUniAPPPluginName%`);
}
exports.installHBuilderXPlugin = installHBuilderXPlugin;
exports.moduleAliasFormatter = {
    test(msg) {
        return msg.includes('Preprocessor dependency');
    },
    format(msg) {
        let lang = '';
        let preprocessor = '';
        if (msg.includes(`"sass"`)) {
            lang = 'sass';
            preprocessor = 'compile-dart-sass';
        }
        else if (msg.includes(`"less"`)) {
            lang = 'less';
            preprocessor = 'compile-less';
        }
        else if (msg.includes('"stylus"')) {
            lang = 'stylus';
            preprocessor = 'compile-stylus';
        }
        if (lang) {
            installHBuilderXPlugin(preprocessor);
            return formatInstallHBuilderXPluginTips(lang, preprocessor);
        }
        return msg;
    },
};
function formatInstallHBuilderXPluginTips(lang, preprocessor) {
    return `预编译器错误：代码使用了${lang}语言，但未安装相应的编译器插件，${supportAutoInstallPlugin() ? '正在从' : '请前往'}插件市场安装该插件:
https://ext.dcloud.net.cn/plugin?name=${preprocessor}`;
}
exports.formatInstallHBuilderXPluginTips = formatInstallHBuilderXPluginTips;

}, function(modId) { var map = {"./env":1660207800532}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800576, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.stripOptions = void 0;
exports.stripOptions = {
    include: ['**/*.js', '**/*.ts', '**/*.tsx', '**/*.vue'],
    functions: [
        'onBeforeMount',
        'onMounted',
        'onBeforeUpdate',
        'onUpdated',
        'onActivated',
        'onDeactivated',
        'onBeforeActivate',
        'onBeforeDeactivate',
        'onBeforeUnmount',
        'onUnmounted',
        'onRenderTracked',
        'onRenderTriggered',
    ],
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800577, function(require, module, exports) {

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isExternalUrl = exports.transformUniH5Jsx = void 0;
__exportStar(require("./transforms"), exports);
__exportStar(require("./utils"), exports);
__exportStar(require("./parse"), exports);
var babel_1 = require("./babel");
Object.defineProperty(exports, "transformUniH5Jsx", { enumerable: true, get: function () { return babel_1.transformUniH5Jsx; } });
var templateUtils_1 = require("./transforms/templateUtils");
Object.defineProperty(exports, "isExternalUrl", { enumerable: true, get: function () { return templateUtils_1.isExternalUrl; } });

}, function(modId) { var map = {"./transforms":1660207800578,"./utils":1660207800533,"./parse":1660207800586,"./babel":1660207800587,"./transforms/templateUtils":1660207800535}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800578, function(require, module, exports) {

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformComponentLink = exports.transformTapToClick = exports.transformMatchMedia = exports.transformH5BuiltInComponents = exports.matchTransformModel = exports.createTransformModel = exports.matchTransformOn = exports.createTransformOn = exports.ATTR_DATASET_EVENT_OPTS = exports.STRINGIFY_JSON = exports.createSrcsetTransformWithOptions = exports.createAssetUrlTransformWithOptions = void 0;
const uni_shared_1 = require("@dcloudio/uni-shared");
const transformTag_1 = require("./transformTag");
const transformEvent_1 = require("./transformEvent");
const transformComponent_1 = require("./transformComponent");
const constants_1 = require("../../mp/constants");
__exportStar(require("./transformRef"), exports);
__exportStar(require("./transformPageHead"), exports);
__exportStar(require("./transformComponent"), exports);
__exportStar(require("./transformEvent"), exports);
__exportStar(require("./transformTag"), exports);
var templateTransformAssetUrl_1 = require("./templateTransformAssetUrl");
Object.defineProperty(exports, "createAssetUrlTransformWithOptions", { enumerable: true, get: function () { return templateTransformAssetUrl_1.createAssetUrlTransformWithOptions; } });
var templateTransformSrcset_1 = require("./templateTransformSrcset");
Object.defineProperty(exports, "createSrcsetTransformWithOptions", { enumerable: true, get: function () { return templateTransformSrcset_1.createSrcsetTransformWithOptions; } });
var vOn_1 = require("./vOn");
Object.defineProperty(exports, "STRINGIFY_JSON", { enumerable: true, get: function () { return vOn_1.STRINGIFY_JSON; } });
Object.defineProperty(exports, "ATTR_DATASET_EVENT_OPTS", { enumerable: true, get: function () { return vOn_1.ATTR_DATASET_EVENT_OPTS; } });
Object.defineProperty(exports, "createTransformOn", { enumerable: true, get: function () { return vOn_1.createTransformOn; } });
Object.defineProperty(exports, "matchTransformOn", { enumerable: true, get: function () { return vOn_1.defaultMatch; } });
var vModel_1 = require("./vModel");
Object.defineProperty(exports, "createTransformModel", { enumerable: true, get: function () { return vModel_1.createTransformModel; } });
Object.defineProperty(exports, "matchTransformModel", { enumerable: true, get: function () { return vModel_1.defaultMatch; } });
exports.transformH5BuiltInComponents = (0, transformTag_1.createTransformTag)(uni_shared_1.BUILT_IN_TAG_NAMES.reduce((tags, tag) => ((tags[tag] = uni_shared_1.COMPONENT_PREFIX + tag), tags), {}));
exports.transformMatchMedia = (0, transformTag_1.createTransformTag)({
    'match-media': 'uni-match-media',
});
exports.transformTapToClick = (0, transformEvent_1.createTransformEvent)({
    tap: (node) => {
        // 地图组件有自己特定的 tap 事件
        if (node.tag === 'map' || node.tag === 'v-uni-map') {
            return 'tap';
        }
        return 'click';
    },
});
exports.transformComponentLink = (0, transformComponent_1.createTransformComponentLink)(constants_1.COMPONENT_BIND_LINK);

}, function(modId) { var map = {"./transformTag":1660207800579,"./transformEvent":1660207800580,"./transformComponent":1660207800581,"../../mp/constants":1660207800511,"./transformRef":1660207800582,"./transformPageHead":1660207800583,"./templateTransformAssetUrl":1660207800534,"./templateTransformSrcset":1660207800536,"./vOn":1660207800584,"./vModel":1660207800585}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800579, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransformTag = void 0;
const ast_1 = require("../../vite/utils/ast");
function createTransformTag(opts) {
    return function transformTag(node, context) {
        if (!(0, ast_1.isElementNode)(node)) {
            return;
        }
        const oldTag = node.tag;
        const newTag = opts[oldTag];
        if (!newTag) {
            return;
        }
        node.tag = newTag;
    };
}
exports.createTransformTag = createTransformTag;

}, function(modId) { var map = {"../../vite/utils/ast":1660207800522}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800580, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransformEvent = void 0;
const shared_1 = require("@vue/shared");
const ast_1 = require("../../vite/utils/ast");
function createTransformEvent(options) {
    return function transformEvent(node) {
        if (!(0, ast_1.isElementNode)(node)) {
            return;
        }
        node.props.forEach((prop) => {
            const { name, arg } = prop;
            if (name === 'on' && arg && (0, ast_1.isSimpleExpressionNode)(arg)) {
                const eventType = options[arg.content];
                if (eventType) {
                    // e.g tap => click
                    if ((0, shared_1.isFunction)(eventType)) {
                        arg.content = eventType(node, prop);
                    }
                    else {
                        arg.content = eventType;
                    }
                }
            }
        });
    };
}
exports.createTransformEvent = createTransformEvent;

}, function(modId) { var map = {"../../vite/utils/ast":1660207800522}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800581, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransformComponentLink = void 0;
const compiler_core_1 = require("@vue/compiler-core");
const utils_1 = require("../utils");
function createTransformComponentLink(name, type = 7 /* DIRECTIVE */) {
    return function transformComponentLink(node, context) {
        if (!(0, utils_1.isUserComponent)(node, context)) {
            return;
        }
        if (type === 7 /* DIRECTIVE */) {
            node.props.push({
                type: 7 /* DIRECTIVE */,
                name: 'on',
                modifiers: [],
                loc: compiler_core_1.locStub,
                arg: (0, compiler_core_1.createSimpleExpression)(name, true),
                exp: (0, compiler_core_1.createSimpleExpression)('__l', true),
            });
        }
        else {
            node.props.push((0, utils_1.createAttributeNode)(name, '__l'));
        }
    };
}
exports.createTransformComponentLink = createTransformComponentLink;

}, function(modId) { var map = {"../utils":1660207800533}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800582, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.transformRef = void 0;
const compiler_core_1 = require("@vue/compiler-core");
const utils_1 = require("../utils");
function transformRef(node, context) {
    if (!(0, utils_1.isUserComponent)(node, context)) {
        return;
    }
    addVueRef(node, context);
}
exports.transformRef = transformRef;
function addVueRef(node, context) {
    // 仅配置了 ref 属性的，才需要增补 vue-ref
    const refProp = (0, compiler_core_1.findProp)(node, 'ref');
    if (!refProp) {
        return;
    }
    if (refProp.type === 6 /* ATTRIBUTE */) {
        refProp.name = 'u-' + utils_1.VUE_REF;
    }
    else {
        ;
        refProp.arg.content = 'u-' + utils_1.VUE_REF;
    }
    return (0, utils_1.addStaticClass)(node, 
    // ref-in-for
    // ref
    context.inVFor
        ? utils_1.VUE_REF_IN_FOR
        : utils_1.VUE_REF);
}

}, function(modId) { var map = {"../utils":1660207800533}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800583, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.transformPageHead = void 0;
const utils_1 = require("../../utils");
const transformPageHead = (node, context) => {
    // 发现是page-meta下的head,直接remove该节点
    (0, utils_1.checkElementNodeTag)(node, 'head') &&
        (0, utils_1.checkElementNodeTag)(context.parent, 'page-meta') &&
        context.removeNode(node);
};
exports.transformPageHead = transformPageHead;

}, function(modId) { var map = {"../../utils":1660207800502}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800584, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.STRINGIFY_JSON = exports.ATTR_DATASET_EVENT_OPTS = exports.addEventOpts = exports.createCustomEventExpr = exports.createTransformOn = exports.defaultMatch = void 0;
const uni_shared_1 = require("@dcloudio/uni-shared");
const compiler_core_1 = require("@vue/compiler-core");
const utils_1 = require("../utils");
function defaultMatch(name, node, context) {
    return isCustomEvent(name) && (0, utils_1.isUserComponent)(node, context);
}
exports.defaultMatch = defaultMatch;
/**
 * 百度、快手小程序的自定义组件，不支持动态事件绑定，故转换为静态事件 + dataset
 * @param baseTransformOn
 * @returns
 */
function createTransformOn(baseTransformOn, { match } = {
    match: defaultMatch,
}) {
    return (dir, node, context, augmentor) => {
        const res = baseTransformOn(dir, node, context, augmentor);
        const { name, arg, exp } = dir;
        if (name !== 'on' || !arg || !exp || !(0, compiler_core_1.isStaticExp)(arg)) {
            return res;
        }
        if (!match(arg.content, node, context)) {
            return res;
        }
        const value = res.props[0].value;
        res.props[0].value = createCustomEventExpr();
        addEventOpts(node.tagType === 1 /* COMPONENT */
            ? (0, uni_shared_1.customizeEvent)(arg.content)
            : arg.content, value, node, context);
        return res;
    };
}
exports.createTransformOn = createTransformOn;
function createCustomEventExpr() {
    return (0, compiler_core_1.createSimpleExpression)('__e', true);
}
exports.createCustomEventExpr = createCustomEventExpr;
function addEventOpts(event, value, node, context) {
    const attrName = node.tagType === 1 /* COMPONENT */
        ? ATTR_DATA_EVENT_OPTS
        : exports.ATTR_DATASET_EVENT_OPTS;
    const opts = (0, compiler_core_1.findProp)(node, attrName, true);
    if (!opts) {
        node.props.push(createDataEventOptsProp(attrName, event, value, context));
    }
    else {
        const children = opts.exp.children;
        children.splice(children.length - 2, 0, createDataEventOptsProperty(event, value));
    }
}
exports.addEventOpts = addEventOpts;
const ATTR_DATA_EVENT_OPTS = 'eO';
exports.ATTR_DATASET_EVENT_OPTS = 'data-e-o';
function createDataEventOptsProperty(event, exp) {
    return (0, compiler_core_1.createCompoundExpression)([`'${event}'`, ': ', exp, ',']);
}
exports.STRINGIFY_JSON = Symbol(`stringifyJson`);
function createDataEventOptsProp(name, event, exp, context) {
    const children = [];
    const stringify = name === ATTR_DATA_EVENT_OPTS;
    if (stringify) {
        children.push(context.helperString(exports.STRINGIFY_JSON) + '(');
    }
    children.push('{', createDataEventOptsProperty(event, exp), '}');
    if (stringify) {
        children.push(')');
    }
    return {
        type: 7 /* DIRECTIVE */,
        name: 'bind',
        loc: compiler_core_1.locStub,
        modifiers: [],
        arg: (0, compiler_core_1.createSimpleExpression)(name, true),
        exp: (0, compiler_core_1.createCompoundExpression)(children),
    };
}
const builtInEvents = [
    '__l',
    'tap',
    'longtap',
    'longpress',
    'touchstart',
    'touchmove',
    'touchcancel',
    'touchend',
    'touchforcechange',
    'transitionend',
    'animationstart',
    'animationiteration',
    'animationend',
];
function isCustomEvent(name) {
    return !builtInEvents.includes(name);
}

}, function(modId) { var map = {"../utils":1660207800533}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800585, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransformModel = exports.defaultMatch = void 0;
const utils_1 = require("../utils");
const vOn_1 = require("./vOn");
function defaultMatch(node, context) {
    return (0, utils_1.isUserComponent)(node, context);
}
exports.defaultMatch = defaultMatch;
/**
 * 百度、快手小程序的自定义组件，不支持动态事件绑定，故 v-model 也需要调整
 * @param baseTransformModel
 * @returns
 */
function createTransformModel(baseTransformModel, { match } = {
    match: defaultMatch,
}) {
    return (dir, node, context, augmentor) => {
        const res = baseTransformModel(dir, node, context, augmentor);
        if (!match(node, context)) {
            return res;
        }
        const props = res.props;
        if (props[1]) {
            // input,textarea 的 v-model 事件可能会被合并到已有的 input 中
            const { arg, exp } = props[1];
            (0, vOn_1.addEventOpts)(arg.content, exp, node, context);
            props[1].exp = (0, vOn_1.createCustomEventExpr)();
        }
        return res;
    };
}
exports.createTransformModel = createTransformModel;

}, function(modId) { var map = {"../utils":1660207800533,"./vOn":1660207800584}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800586, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseWxsCode = exports.parseWxsNodes = exports.parseBlockCode = exports.parseVueCode = void 0;
const magic_string_1 = __importDefault(require("magic-string"));
const ast_1 = require("../vite/utils/ast");
const BLOCK_RE = /<\/block>/;
const WXS_LANG_RE = /lang=["|'](renderjs|wxs|sjs)["|']/;
const WXS_ATTRS = ['wxs', 'renderjs', 'sjs'];
function parseVueCode(code, isNVue = false) {
    const hasBlock = BLOCK_RE.test(code);
    const hasWxs = WXS_LANG_RE.test(code);
    if (!hasBlock && !hasWxs) {
        return { code };
    }
    const errors = [];
    const files = [];
    let ast = (0, ast_1.parseVue)(code, errors);
    if (hasBlock) {
        code = parseBlockCode(ast, code);
        // 重新解析新的 code
        ast = (0, ast_1.parseVue)(code, errors);
    }
    if (!isNVue && hasWxs) {
        const wxsNodes = parseWxsNodes(ast);
        code = parseWxsCode(wxsNodes, code);
        // add watch
        for (const wxsNode of wxsNodes) {
            const srcProp = wxsNode.props.find((prop) => prop.type === 6 /* ATTRIBUTE */ && prop.name === 'src');
            if (srcProp && srcProp.value) {
                files.push(srcProp.value.content);
            }
        }
    }
    return { code, files, errors };
}
exports.parseVueCode = parseVueCode;
function traverseChildren({ children }, blockNodes) {
    children.forEach((node) => traverseNode(node, blockNodes));
}
function traverseNode(node, blockNodes) {
    if ((0, ast_1.isElementNode)(node) && node.tag === 'block') {
        blockNodes.push(node);
    }
    if (node.type === 10 /* IF_BRANCH */ ||
        node.type === 11 /* FOR */ ||
        node.type === 1 /* ELEMENT */ ||
        node.type === 0 /* ROOT */) {
        traverseChildren(node, blockNodes);
    }
}
function parseBlockCode(ast, code) {
    const blockNodes = [];
    traverseNode(ast, blockNodes);
    if (blockNodes.length) {
        return parseBlockNode(code, blockNodes);
    }
    return code;
}
exports.parseBlockCode = parseBlockCode;
const BLOCK_END_LEN = '</block>'.length;
const BLOCK_START_LEN = '<block'.length;
function parseBlockNode(code, blocks) {
    const magicString = new magic_string_1.default(code);
    blocks.forEach(({ loc }) => {
        const startOffset = loc.start.offset;
        const endOffset = loc.end.offset;
        magicString.overwrite(startOffset, startOffset + BLOCK_START_LEN, '<template');
        magicString.overwrite(endOffset - BLOCK_END_LEN, endOffset, '</template>');
    });
    return magicString.toString();
}
function parseWxsNodes(ast) {
    return ast.children.filter((node) => node.type === 1 /* ELEMENT */ &&
        node.tag === 'script' &&
        node.props.find((prop) => prop.name === 'lang' &&
            prop.type === 6 /* ATTRIBUTE */ &&
            prop.value &&
            WXS_ATTRS.includes(prop.value.content)));
}
exports.parseWxsNodes = parseWxsNodes;
function parseWxsCode(wxsNodes, code) {
    if (wxsNodes.length) {
        code = parseWxsNode(code, wxsNodes);
    }
    return code;
}
exports.parseWxsCode = parseWxsCode;
const SCRIPT_END_LEN = '</script>'.length;
const SCRIPT_START_LEN = '<script'.length;
function parseWxsNode(code, nodes) {
    const magicString = new magic_string_1.default(code);
    nodes.forEach(({ loc, props }) => {
        const langAttr = props.find((prop) => prop.name === 'lang');
        const moduleAttr = props.find((prop) => prop.name === 'module');
        const startOffset = loc.start.offset;
        const endOffset = loc.end.offset;
        const lang = langAttr.value.content;
        const langStartOffset = langAttr.loc.start.offset;
        magicString.overwrite(startOffset, startOffset + SCRIPT_START_LEN, '<' + lang); // <renderjs or <wxs
        magicString.overwrite(langStartOffset, langStartOffset + ('lang="' + lang + '"').length, ''); // remove lang="renderjs" or lang="wxs"
        magicString.overwrite(endOffset - SCRIPT_END_LEN, endOffset, '</' + lang + '>'); //</renderjs> or </wxs>
        if (moduleAttr) {
            const moduleStartOffset = moduleAttr.loc.start.offset;
            magicString.overwrite(moduleStartOffset, moduleStartOffset + 'module'.length, 'name'); // module="echarts" => name="echarts"
        }
    });
    return magicString.toString();
}

}, function(modId) { var map = {"../vite/utils/ast":1660207800522}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800587, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.transformUniH5Jsx = void 0;
const uni_shared_1 = require("@dcloudio/uni-shared");
function transformUniH5Jsx({ types }) {
    return {
        name: 'babel-plugin-uni-h5-jsx',
        visitor: {
            JSXOpeningElement({ node: { name } }) {
                if (types.isJSXIdentifier(name) && (0, uni_shared_1.isBuiltInComponent)(name.name)) {
                    name.name = 'v-uni-' + name.name;
                }
            },
        },
    };
}
exports.transformUniH5Jsx = transformUniH5Jsx;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800588, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.output = exports.formatWarnMsg = exports.formatInfoMsg = exports.formatErrMsg = void 0;
var format_1 = require("./format");
Object.defineProperty(exports, "formatErrMsg", { enumerable: true, get: function () { return format_1.formatErrMsg; } });
Object.defineProperty(exports, "formatInfoMsg", { enumerable: true, get: function () { return format_1.formatInfoMsg; } });
Object.defineProperty(exports, "formatWarnMsg", { enumerable: true, get: function () { return format_1.formatWarnMsg; } });
let lastType;
let lastMsg;
function output(type, msg) {
    if (type === lastType && msg === lastMsg) {
        return;
    }
    lastMsg = msg;
    lastType = type;
    const method = type === 'info' ? 'log' : type;
    console[method](msg);
}
exports.output = output;

}, function(modId) { var map = {"./format":1660207800589}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800589, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.formatWarnMsg = exports.formatInfoMsg = exports.removeNVueInfoFormatter = exports.formatErrMsg = void 0;
const uni_shared_1 = require("@dcloudio/uni-shared");
const shared_1 = require("@vue/shared");
const env_1 = require("../hbx/env");
const alias_1 = require("../hbx/alias");
const log_1 = require("../hbx/log");
const errFormatters = [];
const infoFormatters = [];
const warnFormatters = [];
const initErrFormattersOnce = (0, uni_shared_1.once)(() => {
    if ((0, env_1.isInHBuilderX)()) {
        errFormatters.push(alias_1.moduleAliasFormatter);
    }
    errFormatters.push(log_1.errorFormatter);
});
const initInfoFormattersOnce = (0, uni_shared_1.once)(() => {
    if ((0, env_1.runByHBuilderX)()) {
        if (
        // 开发模式下
        process.env.UNI_PLATFORM === 'h5' &&
            process.env.NODE_ENV !== 'production') {
            infoFormatters.push(log_1.h5ServeFormatter);
        }
    }
    infoFormatters.push(log_1.removeInfoFormatter);
});
const initWarnFormattersOnce = (0, uni_shared_1.once)(() => {
    warnFormatters.push(log_1.removeWarnFormatter);
});
function formatErrMsg(msg, options) {
    initErrFormattersOnce();
    const formatter = errFormatters.find(({ test }) => test(msg, options));
    if (formatter) {
        return formatter.format(msg, options);
    }
    return msg;
}
exports.formatErrMsg = formatErrMsg;
const REMOVED_NVUE_MSGS = [
    (msg) => {
        // vite v2.7.10 building for development... (x2)
        return msg.includes('vite v') && msg.includes('building ');
    },
];
exports.removeNVueInfoFormatter = {
    test(msg) {
        return !!REMOVED_NVUE_MSGS.find((m) => (0, shared_1.isString)(m) ? msg.includes(m) : m(msg));
    },
    format() {
        return '';
    },
};
const nvueInfoFormatters = [];
const initNVueInfoFormattersOnce = (0, uni_shared_1.once)(() => {
    nvueInfoFormatters.push(exports.removeNVueInfoFormatter);
});
function formatInfoMsg(msg, options) {
    if (options && (0, env_1.isInHBuilderX)()) {
        options.timestamp = false;
    }
    initInfoFormattersOnce();
    const formatter = infoFormatters.find(({ test }) => test(msg, options));
    if (formatter) {
        return formatter.format(msg, options);
    }
    if (options === null || options === void 0 ? void 0 : options.nvue) {
        initNVueInfoFormattersOnce();
        const formatter = nvueInfoFormatters.find(({ test }) => test(msg, options));
        if (formatter) {
            return formatter.format(msg, options);
        }
    }
    return msg;
}
exports.formatInfoMsg = formatInfoMsg;
function formatWarnMsg(msg, options) {
    initWarnFormattersOnce();
    const formatter = warnFormatters.find(({ test }) => test(msg, options));
    if (formatter) {
        return formatter.format(msg, options);
    }
    return msg;
}
exports.formatWarnMsg = formatWarnMsg;

}, function(modId) { var map = {"../hbx/env":1660207800532,"../hbx/alias":1660207800575,"../hbx/log":1660207800574}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800590, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.COMPONENT_DEPS_CSS = exports.API_DEPS_CSS = void 0;
const constants_1 = require("./constants");
const RESIZE_SENSOR_CSS = constants_1.BASE_COMPONENTS_STYLE_PATH + 'resize-sensor.css';
exports.API_DEPS_CSS = {
    showModal: [`${constants_1.H5_API_STYLE_PATH}modal.css`],
    showToast: [`${constants_1.H5_API_STYLE_PATH}toast.css`],
    showActionSheet: [`${constants_1.H5_API_STYLE_PATH}action-sheet.css`],
    previewImage: [
        RESIZE_SENSOR_CSS,
        `${constants_1.BASE_COMPONENTS_STYLE_PATH}swiper.css`,
        `${constants_1.BASE_COMPONENTS_STYLE_PATH}swiper-item.css`,
        `${constants_1.BASE_COMPONENTS_STYLE_PATH}movable-area.css`,
        `${constants_1.BASE_COMPONENTS_STYLE_PATH}movable-view.css`,
    ],
    openLocation: [`${constants_1.H5_API_STYLE_PATH}location-view.css`],
    chooseLocation: [
        `${constants_1.H5_API_STYLE_PATH}/location-picker.css`,
        `${constants_1.BASE_COMPONENTS_STYLE_PATH}/input.css`,
        `${constants_1.H5_COMPONENTS_STYLE_PATH}/map.css`,
        `${constants_1.BASE_COMPONENTS_STYLE_PATH}/scroll-view.css`,
    ],
};
exports.COMPONENT_DEPS_CSS = {
    canvas: [RESIZE_SENSOR_CSS],
    image: [RESIZE_SENSOR_CSS],
    'movable-area': [RESIZE_SENSOR_CSS],
    'picker-view': [RESIZE_SENSOR_CSS],
    'picker-view-column': [RESIZE_SENSOR_CSS],
    'rich-text': [RESIZE_SENSOR_CSS],
    textarea: [RESIZE_SENSOR_CSS],
    'web-view': [RESIZE_SENSOR_CSS],
    picker: [
        RESIZE_SENSOR_CSS,
        `${constants_1.BASE_COMPONENTS_STYLE_PATH}picker-view.css`,
        `${constants_1.BASE_COMPONENTS_STYLE_PATH}picker-view-column.css`,
    ],
};

}, function(modId) { var map = {"./constants":1660207800503}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800591, function(require, module, exports) {

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cssTarget = void 0;
exports.cssTarget = 'chrome53';
__exportStar(require("./utils"), exports);
__exportStar(require("./plugins"), exports);
__exportStar(require("./features"), exports);

}, function(modId) { var map = {"./utils":1660207800521,"./plugins":1660207800592,"./features":1660207800600}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800592, function(require, module, exports) {

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCodeFrame = exports.commonjsProxyRE = exports.cssLangRE = exports.minifyCSS = exports.cssPostPlugin = exports.cssPlugin = exports.isCSSRequest = exports.getAssetHash = exports.assetPlugin = void 0;
__exportStar(require("./cssScoped"), exports);
__exportStar(require("./copy"), exports);
__exportStar(require("./inject"), exports);
__exportStar(require("./mainJs"), exports);
__exportStar(require("./jsonJs"), exports);
__exportStar(require("./console"), exports);
__exportStar(require("./dynamicImportPolyfill"), exports);
var asset_1 = require("./vitejs/plugins/asset");
Object.defineProperty(exports, "assetPlugin", { enumerable: true, get: function () { return asset_1.assetPlugin; } });
Object.defineProperty(exports, "getAssetHash", { enumerable: true, get: function () { return asset_1.getAssetHash; } });
var css_1 = require("./vitejs/plugins/css");
Object.defineProperty(exports, "isCSSRequest", { enumerable: true, get: function () { return css_1.isCSSRequest; } });
Object.defineProperty(exports, "cssPlugin", { enumerable: true, get: function () { return css_1.cssPlugin; } });
Object.defineProperty(exports, "cssPostPlugin", { enumerable: true, get: function () { return css_1.cssPostPlugin; } });
Object.defineProperty(exports, "minifyCSS", { enumerable: true, get: function () { return css_1.minifyCSS; } });
Object.defineProperty(exports, "cssLangRE", { enumerable: true, get: function () { return css_1.cssLangRE; } });
Object.defineProperty(exports, "commonjsProxyRE", { enumerable: true, get: function () { return css_1.commonjsProxyRE; } });
var utils_1 = require("./vitejs/utils");
Object.defineProperty(exports, "generateCodeFrame", { enumerable: true, get: function () { return utils_1.generateCodeFrame; } });

}, function(modId) { var map = {"./cssScoped":1660207800593,"./copy":1660207800594,"./inject":1660207800596,"./mainJs":1660207800597,"./jsonJs":1660207800598,"./console":1660207800572,"./dynamicImportPolyfill":1660207800599,"./vitejs/plugins/asset":1660207800525,"./vitejs/plugins/css":1660207800528,"./vitejs/utils":1660207800526}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800593, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniCssScopedPlugin = exports.uniRemoveCssScopedPlugin = exports.addScoped = void 0;
const path_1 = __importDefault(require("path"));
const debug_1 = __importDefault(require("debug"));
const constants_1 = require("../../constants");
const preprocess_1 = require("../../preprocess");
const parse_1 = require("../../vue/parse");
const debugScoped = (0, debug_1.default)('uni:scoped');
const SCOPED_RE = /<style\s[^>]*scoped[^>]*>/i;
function addScoped(code) {
    return code.replace(/(<style\b[^><]*)>/gi, (str, $1) => {
        if ($1.includes('scoped')) {
            return str;
        }
        return `${$1} scoped>`;
    });
}
exports.addScoped = addScoped;
function removeScoped(code) {
    if (!SCOPED_RE.test(code)) {
        return code;
    }
    return code.replace(/(<style.*)scoped(.*>)/gi, '$1$2');
}
function uniRemoveCssScopedPlugin({ filter } = { filter: () => false }) {
    return {
        name: 'uni:css-remove-scoped',
        enforce: 'pre',
        transform(code, id) {
            if (!filter(id))
                return null;
            debugScoped(id);
            return {
                code: removeScoped(code),
                map: null,
            };
        },
    };
}
exports.uniRemoveCssScopedPlugin = uniRemoveCssScopedPlugin;
function uniCssScopedPlugin({ filter } = { filter: () => false }) {
    return {
        name: 'uni:css-scoped',
        enforce: 'pre',
        transform(code, id) {
            if (!filter(id))
                return null;
            debugScoped(id);
            return {
                code: addScoped(code),
                map: null,
            };
        },
        // 仅 h5
        handleHotUpdate(ctx) {
            if (!constants_1.EXTNAME_VUE.includes(path_1.default.extname(ctx.file))) {
                return;
            }
            const scoped = !ctx.file.endsWith('App.vue');
            debugScoped('hmr', ctx.file);
            const oldRead = ctx.read;
            ctx.read = async () => {
                let code = await oldRead();
                // hotUpdate preprocess
                if (code.includes('#endif')) {
                    code = (0, preprocess_1.preJs)((0, preprocess_1.preHtml)(code));
                }
                if (scoped) {
                    code = addScoped(code);
                }
                // 处理 block, wxs 等
                return (0, parse_1.parseVueCode)(code).code;
            };
        },
    };
}
exports.uniCssScopedPlugin = uniCssScopedPlugin;

}, function(modId) { var map = {"../../constants":1660207800503,"../../preprocess":1660207800515,"../../vue/parse":1660207800586}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800594, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.uniViteCopyPlugin = void 0;
const watcher_1 = require("../../watcher");
const messages_1 = require("../../messages");
const logs_1 = require("../../logs");
function uniViteCopyPlugin({ targets, verbose, }) {
    let resolvedConfig;
    let initialized = false;
    return {
        name: 'uni:copy',
        apply: 'build',
        configResolved(config) {
            resolvedConfig = config;
        },
        writeBundle() {
            if (initialized) {
                return;
            }
            if (resolvedConfig.build.ssr) {
                return;
            }
            initialized = true;
            return new Promise((resolve) => {
                Promise.all(targets.map(({ watchOptions, ...target }) => {
                    return new Promise((resolve) => {
                        new watcher_1.FileWatcher({
                            verbose,
                            ...target,
                        }).watch({
                            cwd: process.env.UNI_INPUT_DIR,
                            ...watchOptions,
                        }, (watcher) => {
                            if (process.env.NODE_ENV !== 'development') {
                                // 生产模式下，延迟 close，否则会影响 chokidar 初始化的 add 等事件
                                setTimeout(() => {
                                    watcher.close().then(() => resolve(void 0));
                                }, 2000);
                            }
                            else {
                                resolve(void 0);
                            }
                        }, () => {
                            // TODO 目前初始化编译时，也会不停地触发此函数。
                            (0, logs_1.output)('log', messages_1.M['dev.watching.end']);
                        });
                    });
                })).then(() => resolve());
            });
        },
    };
}
exports.uniViteCopyPlugin = uniViteCopyPlugin;

}, function(modId) { var map = {"../../watcher":1660207800595,"../../messages":1660207800518,"../../logs":1660207800588}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800595, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileWatcher = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const chokidar_1 = require("chokidar");
const shared_1 = require("@vue/shared");
class FileWatcher {
    constructor({ src, dest, transform, verbose }) {
        this.src = !(0, shared_1.isArray)(src) ? [src] : src;
        this.dest = dest;
        this.transform = transform;
        this.verbose = verbose;
    }
    watch(watchOptions, onReady, onChange) {
        if (!this.watcher) {
            const copy = this.copy.bind(this);
            const remove = this.remove.bind(this);
            this.watcher = (0, chokidar_1.watch)(this.src, watchOptions)
                .on('add', copy)
                .on('addDir', copy)
                .on('change', copy)
                .on('unlink', remove)
                .on('unlinkDir', remove)
                .on('ready', () => {
                onReady && onReady(this.watcher);
                setTimeout(() => {
                    this.onChange = onChange;
                }, 1000);
            })
                .on('error', (e) => console.error('watch', e));
        }
        return this.watcher;
    }
    add(paths) {
        this.info('add', paths);
        return this.watcher.add(paths);
    }
    unwatch(paths) {
        this.info('unwatch', paths);
        return this.watcher.unwatch(paths);
    }
    close() {
        this.info('close');
        return this.watcher.close();
    }
    copy(from) {
        const to = this.to(from);
        this.info('copy', from + '=>' + to);
        let content;
        if (this.transform) {
            const filename = this.from(from);
            content = this.transform(fs_extra_1.default.readFileSync(filename), filename);
        }
        if (content) {
            return fs_extra_1.default
                .outputFile(to, content)
                .catch(() => {
                // this.info('copy', e)
            })
                .then(() => this.onChange && this.onChange());
        }
        return fs_extra_1.default
            .copy(this.from(from), to, { overwrite: true })
            .catch(() => {
            // this.info('copy', e)
        })
            .then(() => this.onChange && this.onChange());
    }
    remove(from) {
        const to = this.to(from);
        this.info('remove', from + '=>' + to);
        return fs_extra_1.default
            .remove(to)
            .catch(() => {
            // this.info('remove', e)
        })
            .then(() => this.onChange && this.onChange());
    }
    info(type, msg) {
        this.verbose && console.log(type, msg);
    }
    from(from) {
        return path_1.default.join(this.watcher.options.cwd, from);
    }
    to(from) {
        return path_1.default.join(this.dest, from);
    }
}
exports.FileWatcher = FileWatcher;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800596, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniViteInjectPlugin = void 0;
const path_1 = require("path");
const debug_1 = __importDefault(require("debug"));
const pluginutils_1 = require("@rollup/pluginutils");
const estree_walker_1 = require("estree-walker");
const shared_1 = require("@vue/shared");
const magic_string_1 = __importDefault(require("magic-string"));
const utils_1 = require("../utils");
const debugInject = (0, debug_1.default)('uni:inject');
const debugInjectTry = (0, debug_1.default)('uni:inject-try');
function uniViteInjectPlugin(name, options) {
    if (!options)
        throw new Error('Missing options');
    const filter = (0, pluginutils_1.createFilter)(options.include, options.exclude);
    const modules = (0, shared_1.extend)({}, options);
    delete modules.include;
    delete modules.exclude;
    delete modules.sourceMap;
    delete modules.callback;
    const reassignments = new Set();
    const modulesMap = new Map();
    const namespaceModulesMap = new Map();
    Object.keys(modules).forEach((name) => {
        if (name.endsWith('.')) {
            namespaceModulesMap.set(name, modules[name]);
        }
        modulesMap.set(name, modules[name]);
    });
    const hasNamespace = namespaceModulesMap.size > 0;
    // Fix paths on Windows
    if (path_1.sep !== '/') {
        normalizeModulesMap(modulesMap);
        normalizeModulesMap(namespaceModulesMap);
    }
    const firstpass = new RegExp(`(?:${Array.from(modulesMap.keys()).map(escape).join('|')})`, 'g');
    const sourceMap = options.sourceMap !== false;
    const callback = options.callback;
    return {
        name,
        // 确保在 commonjs 之后，否则会混合 es6 module 与 cjs 的代码，导致 commonjs 失效
        enforce: 'post',
        transform(code, id) {
            if (!filter(id))
                return null;
            if (!(0, utils_1.isJsFile)(id))
                return null;
            debugInjectTry(id);
            if (code.search(firstpass) === -1)
                return null;
            if (path_1.sep !== '/')
                id = id.split(path_1.sep).join('/');
            const ast = this.parse(code);
            const imports = new Set();
            ast.body.forEach((node) => {
                if (node.type === 'ImportDeclaration') {
                    node.specifiers.forEach((specifier) => {
                        imports.add(specifier.local.name);
                    });
                }
            });
            // analyse scopes
            let scope = (0, pluginutils_1.attachScopes)(ast, 'scope');
            const magicString = new magic_string_1.default(code);
            const newImports = new Map();
            function handleReference(node, name, keypath, parent) {
                let mod = modulesMap.get(keypath);
                if (!mod && hasNamespace) {
                    const mods = keypath.split('.');
                    if (mods.length === 2) {
                        mod = namespaceModulesMap.get(mods[0] + '.');
                        if (mod) {
                            if ((0, shared_1.isArray)(mod)) {
                                const testFn = mod[1];
                                if (testFn(mods[1])) {
                                    mod = [mod[0], mods[1]];
                                }
                                else {
                                    mod = undefined;
                                }
                            }
                            else {
                                mod = [mod, mods[1]];
                            }
                        }
                    }
                }
                if (mod && !imports.has(name) && !scope.contains(name)) {
                    if ((0, shared_1.isString)(mod))
                        mod = [mod, 'default'];
                    if (mod[0] === id)
                        return false;
                    const hash = `${keypath}:${mod[0]}:${mod[1]}`;
                    // 当 API 被覆盖定义后，不再摇树
                    if (reassignments.has(hash)) {
                        return false;
                    }
                    if (parent &&
                        (0, utils_1.isAssignmentExpression)(parent) &&
                        parent.left === node) {
                        reassignments.add(hash);
                        return false;
                    }
                    const importLocalName = name === keypath ? name : (0, pluginutils_1.makeLegalIdentifier)(`$inject_${keypath}`);
                    if (!newImports.has(hash)) {
                        if (mod[1] === '*') {
                            newImports.set(hash, `import * as ${importLocalName} from '${mod[0]}';`);
                        }
                        else {
                            newImports.set(hash, `import { ${mod[1]} as ${importLocalName} } from '${mod[0]}';`);
                            callback && callback(newImports, mod);
                        }
                    }
                    if (name !== keypath) {
                        magicString.overwrite(node.start, node.end, importLocalName, {
                            storeName: true,
                        });
                    }
                    return true;
                }
                return false;
            }
            (0, estree_walker_1.walk)(ast, {
                enter(node, parent) {
                    if (sourceMap) {
                        magicString.addSourcemapLocation(node.start);
                        magicString.addSourcemapLocation(node.end);
                    }
                    if (node.scope) {
                        scope = node.scope;
                    }
                    if ((0, utils_1.isProperty)(node) && node.shorthand) {
                        const { name } = node.key;
                        handleReference(node, name, name);
                        this.skip();
                        return;
                    }
                    if ((0, utils_1.isReference)(node, parent)) {
                        const { name, keypath } = flatten(node);
                        const handled = handleReference(node, name, keypath, parent);
                        if (handled) {
                            this.skip();
                        }
                    }
                },
                leave(node) {
                    if (node.scope) {
                        scope = scope.parent;
                    }
                },
            });
            debugInject(id, newImports.size);
            if (newImports.size === 0) {
                return {
                    code,
                    // 不能返回 ast ，否则会导致代码不能被再次修改
                    // 比如 App.vue 中，console.log('uniCloud') 触发了 inject 检测，检测完，发现不需要
                    // 此时返回 ast，会导致 import { setupApp } from '@dcloudio/uni-h5' 不会被编译
                    // ast
                    map: sourceMap ? magicString.generateMap({ hires: true }) : null,
                };
            }
            const importBlock = Array.from(newImports.values()).join('\n\n');
            magicString.prepend(`${importBlock}\n\n`);
            return {
                code: magicString.toString(),
                map: sourceMap ? magicString.generateMap({ hires: true }) : null,
            };
        },
    };
}
exports.uniViteInjectPlugin = uniViteInjectPlugin;
const escape = (str) => str.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
const flatten = (startNode) => {
    const parts = [];
    let node = startNode;
    while ((0, utils_1.isMemberExpression)(node)) {
        parts.unshift(node.property.name);
        node = node.object;
    }
    const { name } = node;
    parts.unshift(name);
    return { name, keypath: parts.join('.') };
};
function normalizeModulesMap(modulesMap) {
    modulesMap.forEach((mod, key) => {
        modulesMap.set(key, (0, shared_1.isArray)(mod)
            ? [mod[0].split(path_1.sep).join('/'), mod[1]]
            : mod.split(path_1.sep).join('/'));
    });
}

}, function(modId) { var map = {"../utils":1660207800521}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800597, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineUniMainJsPlugin = void 0;
const path_1 = __importDefault(require("path"));
const utils_1 = require("../../utils");
function defineUniMainJsPlugin(createUniMainJsPlugin) {
    const opts = {
        resolvedConfig: {},
        filter(id) {
            return id === mainJsPath || id === mainTsPath;
        },
    };
    const plugin = createUniMainJsPlugin(opts);
    const origConfigResolved = plugin.configResolved;
    let mainJsPath = '';
    let mainTsPath = '';
    plugin.configResolved = function (config) {
        opts.resolvedConfig = config;
        const mainPath = (0, utils_1.normalizePath)(path_1.default.resolve(process.env.UNI_INPUT_DIR, 'main'));
        mainJsPath = mainPath + '.js';
        mainTsPath = mainPath + '.ts';
        return origConfigResolved && origConfigResolved(config);
    };
    return plugin;
}
exports.defineUniMainJsPlugin = defineUniMainJsPlugin;

}, function(modId) { var map = {"../../utils":1660207800502}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800598, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineUniManifestJsonPlugin = exports.defineUniPagesJsonPlugin = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const constants_1 = require("../../constants");
const utils_1 = require("../../utils");
exports.defineUniPagesJsonPlugin = createDefineJsonJsPlugin('pages.json');
exports.defineUniManifestJsonPlugin = createDefineJsonJsPlugin('manifest.json');
function createDefineJsonJsPlugin(name) {
    const JSON_JS = constants_1.JSON_JS_MAP[name];
    return function (createVitePlugin) {
        const opts = {
            resolvedConfig: {},
            filter(id) {
                return id.endsWith(JSON_JS);
            },
        };
        const plugin = createVitePlugin(opts);
        const origLoad = plugin.load;
        const origResolveId = plugin.resolveId;
        const origConfigResolved = plugin.configResolved;
        let jsonPath = '';
        let jsonJsPath = '';
        plugin.resolveId = function (id, importer, options) {
            const res = origResolveId && origResolveId.call(this, id, importer, options);
            if (res) {
                return res;
            }
            if (id.endsWith(JSON_JS)) {
                return jsonJsPath;
            }
        };
        plugin.configResolved = function (config) {
            opts.resolvedConfig = config;
            jsonPath = (0, utils_1.normalizePath)(path_1.default.join(process.env.UNI_INPUT_DIR, name));
            jsonJsPath = (0, utils_1.normalizePath)(path_1.default.join(process.env.UNI_INPUT_DIR, JSON_JS));
            return origConfigResolved && origConfigResolved(config);
        };
        plugin.load = function (id, ssr) {
            const res = origLoad && origLoad.call(this, id, ssr);
            if (res) {
                return res;
            }
            if (!opts.filter(id)) {
                return;
            }
            return fs_1.default.readFileSync(jsonPath, 'utf8');
        };
        return plugin;
    };
}

}, function(modId) { var map = {"../../constants":1660207800503,"../../utils":1660207800502}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800599, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.dynamicImportPolyfill = void 0;
function dynamicImportPolyfill(promise = false) {
    return {
        name: 'dynamic-import-polyfill',
        renderDynamicImport() {
            return {
                left: promise ? 'Promise.resolve(' : '(',
                right: ')',
            };
        },
    };
}
exports.dynamicImportPolyfill = dynamicImportPolyfill;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800600, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initFeatures = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const shared_1 = require("@vue/shared");
function initProjectFeature({ inputDir }) {
    const features = {
        i18nLocale: false,
        i18nEn: true,
        i18nEs: true,
        i18nFr: true,
        i18nZhHans: true,
        i18nZhHant: true,
        uniCloud: false,
    };
    const localesDir = path_1.default.resolve(inputDir, 'locale');
    if (fs_1.default.existsSync(localesDir)) {
        if (fs_1.default.readdirSync(localesDir).find((file) => path_1.default.extname(file) === '.json')) {
            features.i18nLocale = true;
        }
    }
    if (process.env.UNI_CLOUD_PROVIDER) {
        try {
            const providers = JSON.parse(process.env.UNI_CLOUD_PROVIDER);
            if (providers.length) {
                features.uniCloud = true;
            }
        }
        catch (e) { }
    }
    return features;
}
function initPagesFeature({ pagesJson, command, inputDir, ssr, }) {
    const features = {
        nvue: true,
        pages: true,
        tabBar: true,
        tabBarMidButton: true,
        topWindow: false,
        leftWindow: false,
        rightWindow: false,
        navigationBar: true,
        pullDownRefresh: false,
        navigationBarButtons: true,
        navigationBarSearchInput: true,
        navigationBarTransparent: true,
    };
    const { tabBar, pages, topWindow, leftWindow, rightWindow, globalStyle } = pagesJson;
    // ssr 时强制启用多页面（需要用到router）
    if (!ssr && pages && pages.length === 1) {
        features.pages = false;
    }
    if (!(tabBar && tabBar.list && tabBar.list.length)) {
        features.tabBar = false;
        features.tabBarMidButton = false;
    }
    if (features.tabBar && !tabBar.midButton) {
        features.tabBarMidButton = false;
    }
    if (topWindow && topWindow.path) {
        features.topWindow = true;
    }
    if (leftWindow && leftWindow.path) {
        features.leftWindow = true;
    }
    if (rightWindow && rightWindow.path) {
        features.rightWindow = true;
    }
    if (globalStyle.enablePullDownRefresh) {
        features.pullDownRefresh = true;
    }
    else {
        if (pages.find((page) => page.style && page.style.enablePullDownRefresh)) {
            features.pullDownRefresh = true;
        }
    }
    if (command === 'build') {
        if (!pages.find((page) => fs_1.default.existsSync(path_1.default.resolve(inputDir, page.path + '.nvue')))) {
            features.nvue = false;
        }
        let isNavigationCustom = false;
        if (globalStyle.navigationBar.style === 'custom') {
            isNavigationCustom = true; // 全局custom
            if (pages.find((page) => page.style.navigationBar.style === 'default')) {
                isNavigationCustom = false;
            }
        }
        else {
            // 所有页面均custom
            if (pages.every((page) => page.style.navigationBar.style === 'custom')) {
                isNavigationCustom = true;
            }
        }
        if (isNavigationCustom) {
            features.navigationBar = false;
            features.navigationBarButtons = false;
            features.navigationBarSearchInput = false;
            features.navigationBarTransparent = false;
        }
        else {
            if (!pages.find((page) => (0, shared_1.isArray)(page.style.navigationBar.buttons) &&
                page.style.navigationBar.buttons.length)) {
                features.navigationBarButtons = false;
            }
            if (!globalStyle.navigationBar.searchInput &&
                !pages.find((page) => page.style.navigationBar.searchInput)) {
                features.navigationBarSearchInput = false;
            }
            if (globalStyle.navigationBar.type !== 'transparent' &&
                !pages.find((page) => page.style.navigationBar.type === 'transparent')) {
                features.navigationBarTransparent = false;
            }
        }
    }
    return features;
}
function initManifestFeature({ manifestJson, command, platform, }) {
    const features = {
        wx: false,
        wxs: true,
        rpx: true,
        promise: false,
        longpress: true,
        routerMode: '"hash"',
        vueOptionsApi: true,
        vueProdDevTools: false,
    };
    if (command === 'build') {
        // TODO 需要预编译一遍？
        // features.wxs = false
        // features.longpress = false
    }
    if (manifestJson.h5 &&
        manifestJson.h5.router &&
        manifestJson.h5.router.mode === 'history') {
        features.routerMode = '"history"';
    }
    // TODO other features
    return features;
}
function initFeatures(options) {
    const { wx, wxs, rpx, nvue, uniCloud, i18nEn, i18nEs, i18nFr, i18nZhHans, i18nZhHant, i18nLocale, vueOptionsApi, vueProdDevTools, pages, tabBar, tabBarMidButton, promise, longpress, routerMode, topWindow, leftWindow, rightWindow, navigationBar, pullDownRefresh, navigationBarButtons, navigationBarSearchInput, navigationBarTransparent, } = (0, shared_1.extend)(initManifestFeature(options), initPagesFeature(options), initProjectFeature(options));
    const features = {
        // vue
        __VUE_OPTIONS_API__: vueOptionsApi,
        __VUE_PROD_DEVTOOLS__: vueProdDevTools,
        // uni
        __UNI_FEATURE_WX__: wx,
        __UNI_FEATURE_WXS__: wxs,
        __UNI_FEATURE_RPX__: rpx,
        __UNI_FEATURE_PROMISE__: promise,
        __UNI_FEATURE_LONGPRESS__: longpress,
        __UNI_FEATURE_I18N_EN__: i18nEn,
        __UNI_FEATURE_I18N_ES__: i18nEs,
        __UNI_FEATURE_I18N_FR__: i18nFr,
        __UNI_FEATURE_I18N_ZH_HANS__: i18nZhHans,
        __UNI_FEATURE_I18N_ZH_HANT__: i18nZhHant,
        // 以下特性，编译器已自动识别是否需要启用
        __UNI_FEATURE_UNI_CLOUD__: uniCloud,
        __UNI_FEATURE_I18N_LOCALE__: i18nLocale,
        __UNI_FEATURE_NVUE__: nvue,
        __UNI_FEATURE_ROUTER_MODE__: routerMode,
        __UNI_FEATURE_PAGES__: pages,
        __UNI_FEATURE_TABBAR__: tabBar,
        __UNI_FEATURE_TABBAR_MIDBUTTON__: tabBarMidButton,
        __UNI_FEATURE_TOPWINDOW__: topWindow,
        __UNI_FEATURE_LEFTWINDOW__: leftWindow,
        __UNI_FEATURE_RIGHTWINDOW__: rightWindow,
        __UNI_FEATURE_RESPONSIVE__: topWindow || leftWindow || rightWindow,
        __UNI_FEATURE_NAVIGATIONBAR__: navigationBar,
        __UNI_FEATURE_PULL_DOWN_REFRESH__: pullDownRefresh,
        __UNI_FEATURE_NAVIGATIONBAR_BUTTONS__: navigationBarButtons,
        __UNI_FEATURE_NAVIGATIONBAR_SEARCHINPUT__: navigationBarSearchInput,
        __UNI_FEATURE_NAVIGATIONBAR_TRANSPARENT__: navigationBarTransparent, // 是否启用透明标题栏
    };
    // ssr nodejs features
    if (options.ssr) {
        Object.keys(features).forEach((name) => {
            const value = features[name];
            (0, shared_1.extend)(globalThis, {
                [name]: (0, shared_1.isString)(value) ? JSON.parse(value) : value,
            });
        });
    }
    return features;
}
exports.initFeatures = initFeatures;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800601, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UNI_EASYCOM_EXCLUDE = exports.genResolveEasycomCode = exports.addImportDeclaration = exports.matchEasycom = exports.initEasycomsOnce = exports.initEasycoms = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const debug_1 = __importDefault(require("debug"));
const shared_1 = require("@vue/shared");
const pluginutils_1 = require("@rollup/pluginutils");
const uni_shared_1 = require("@dcloudio/uni-shared");
const utils_1 = require("./utils");
const pages_1 = require("./json/pages");
const messages_1 = require("./messages");
const debugEasycom = (0, debug_1.default)('uni:easycom');
const easycoms = [];
const easycomsCache = new Map();
const easycomsInvalidCache = new Set();
let hasEasycom = false;
function clearEasycom() {
    easycoms.length = 0;
    easycomsCache.clear();
    easycomsInvalidCache.clear();
}
function initEasycoms(inputDir, { dirs, platform }) {
    const componentsDir = path_1.default.resolve(inputDir, 'components');
    const uniModulesDir = path_1.default.resolve(inputDir, 'uni_modules');
    const initEasycomOptions = (pagesJson) => {
        // 初始化时，从once中读取缓存，refresh时，实时读取
        const { easycom } = pagesJson || (0, pages_1.parsePagesJson)(inputDir, platform, false);
        const easycomOptions = {
            dirs: easycom && easycom.autoscan === false
                ? [...dirs] // 禁止自动扫描
                : [
                    ...dirs,
                    componentsDir,
                    ...initUniModulesEasycomDirs(uniModulesDir),
                ],
            rootDir: inputDir,
            autoscan: !!(easycom && easycom.autoscan),
            custom: (easycom && easycom.custom) || {},
        };
        debugEasycom(easycomOptions);
        return easycomOptions;
    };
    const options = initEasycomOptions((0, pages_1.parsePagesJsonOnce)(inputDir, platform));
    initEasycom(options);
    const res = {
        options,
        filter: (0, pluginutils_1.createFilter)([
            'components/*/*.(vue|jsx|tsx)',
            'uni_modules/*/components/*/*.(vue|jsx|tsx)',
        ], [], {
            resolve: inputDir,
        }),
        refresh() {
            res.options = initEasycomOptions();
            initEasycom(res.options);
        },
        easycoms,
    };
    return res;
}
exports.initEasycoms = initEasycoms;
exports.initEasycomsOnce = (0, uni_shared_1.once)(initEasycoms);
function initUniModulesEasycomDirs(uniModulesDir) {
    if (!fs_1.default.existsSync(uniModulesDir)) {
        return [];
    }
    return fs_1.default
        .readdirSync(uniModulesDir)
        .map((uniModuleDir) => {
        const uniModuleComponentsDir = path_1.default.resolve(uniModulesDir, uniModuleDir, 'components');
        if (fs_1.default.existsSync(uniModuleComponentsDir)) {
            return uniModuleComponentsDir;
        }
    })
        .filter(Boolean);
}
function initEasycom({ dirs, rootDir, custom, extensions = ['.vue', '.jsx', '.tsx'], }) {
    clearEasycom();
    const easycomsObj = Object.create(null);
    if (dirs && dirs.length && rootDir) {
        (0, shared_1.extend)(easycomsObj, initAutoScanEasycoms(dirs, rootDir, extensions));
    }
    if (custom) {
        Object.keys(custom).forEach((name) => {
            const componentPath = custom[name];
            easycomsObj[name] = componentPath.startsWith('@/')
                ? (0, utils_1.normalizePath)(path_1.default.join(rootDir, componentPath.slice(2)))
                : componentPath;
        });
    }
    Object.keys(easycomsObj).forEach((name) => {
        easycoms.push({
            pattern: new RegExp(name),
            replacement: easycomsObj[name],
        });
    });
    debugEasycom(easycoms);
    hasEasycom = !!easycoms.length;
    return easycoms;
}
function matchEasycom(tag) {
    if (!hasEasycom) {
        return;
    }
    let source = easycomsCache.get(tag);
    if (source) {
        return source;
    }
    if (easycomsInvalidCache.has(tag)) {
        return false;
    }
    const matcher = easycoms.find((matcher) => matcher.pattern.test(tag));
    if (!matcher) {
        easycomsInvalidCache.add(tag);
        return false;
    }
    source = tag.replace(matcher.pattern, matcher.replacement);
    easycomsCache.set(tag, source);
    debugEasycom('matchEasycom', tag, source);
    return source;
}
exports.matchEasycom = matchEasycom;
const isDir = (path) => fs_1.default.lstatSync(path).isDirectory();
function initAutoScanEasycom(dir, rootDir, extensions) {
    if (!path_1.default.isAbsolute(dir)) {
        dir = path_1.default.resolve(rootDir, dir);
    }
    const easycoms = Object.create(null);
    if (!fs_1.default.existsSync(dir)) {
        return easycoms;
    }
    fs_1.default.readdirSync(dir).forEach((name) => {
        const folder = path_1.default.resolve(dir, name);
        if (!isDir(folder)) {
            return;
        }
        const importDir = (0, utils_1.normalizePath)(folder);
        const files = fs_1.default.readdirSync(folder);
        // 读取文件夹文件列表，比对文件名（fs.existsSync在大小写不敏感的系统会匹配不准确）
        for (let i = 0; i < extensions.length; i++) {
            const ext = extensions[i];
            if (files.includes(name + ext)) {
                easycoms[`^${name}$`] = `${importDir}/${name}${ext}`;
                break;
            }
        }
    });
    return easycoms;
}
function initAutoScanEasycoms(dirs, rootDir, extensions) {
    const conflict = {};
    const res = dirs.reduce((easycoms, dir) => {
        const curEasycoms = initAutoScanEasycom(dir, rootDir, extensions);
        Object.keys(curEasycoms).forEach((name) => {
            // Use the first component when name conflict
            const compath = easycoms[name];
            if (!compath) {
                easycoms[name] = curEasycoms[name];
            }
            else {
                ;
                (conflict[compath] || (conflict[compath] = [])).push(normalizeCompath(curEasycoms[name], rootDir));
            }
        });
        return easycoms;
    }, Object.create(null));
    const conflictComs = Object.keys(conflict);
    if (conflictComs.length) {
        console.warn(messages_1.M['easycom.conflict']);
        conflictComs.forEach((com) => {
            console.warn([normalizeCompath(com, rootDir), conflict[com]].join(','));
        });
    }
    return res;
}
function normalizeCompath(compath, rootDir) {
    return (0, utils_1.normalizePath)(path_1.default.relative(rootDir, compath));
}
function addImportDeclaration(importDeclarations, local, source, imported) {
    importDeclarations.push(createImportDeclaration(local, source, imported));
    return local;
}
exports.addImportDeclaration = addImportDeclaration;
function createImportDeclaration(local, source, imported) {
    if (imported) {
        return `import {${imported} as ${local}} from '${source}';`;
    }
    return `import ${local} from '${source}';`;
}
const RESOLVE_EASYCOM_IMPORT_CODE = `import { resolveDynamicComponent as __resolveDynamicComponent } from 'vue';import { resolveEasycom } from '@dcloudio/uni-app';`;
function genResolveEasycomCode(importDeclarations, code, name) {
    if (!importDeclarations.includes(RESOLVE_EASYCOM_IMPORT_CODE)) {
        importDeclarations.push(RESOLVE_EASYCOM_IMPORT_CODE);
    }
    return `resolveEasycom(${code.replace('_resolveComponent', '__resolveDynamicComponent')}, ${name})`;
}
exports.genResolveEasycomCode = genResolveEasycomCode;
exports.UNI_EASYCOM_EXCLUDE = [/App.vue$/, /@dcloudio\/uni-h5/];

}, function(modId) { var map = {"fs":1660207800499,"./utils":1660207800502,"./json/pages":1660207800544,"./messages":1660207800518}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800602, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initPostcssPlugin = exports.uniPostcssScopedPlugin = exports.uniPostcssPlugin = void 0;
const stylePluginScoped_1 = __importDefault(require("./plugins/stylePluginScoped"));
exports.uniPostcssScopedPlugin = stylePluginScoped_1.default;
const uniapp_1 = __importDefault(require("./plugins/uniapp"));
exports.uniPostcssPlugin = uniapp_1.default;
function initPostcssPlugin({ uniApp, autoprefixer, } = {}) {
    const plugins = [(0, uniapp_1.default)(uniApp)];
    // nvue 不需要 autoprefixer
    if (autoprefixer !== false) {
        plugins.push(require('autoprefixer')(autoprefixer));
    }
    return plugins;
}
exports.initPostcssPlugin = initPostcssPlugin;

}, function(modId) { var map = {"./plugins/stylePluginScoped":1660207800603,"./plugins/uniapp":1660207800604}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800603, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postcss_selector_parser_1 = __importDefault(require("postcss-selector-parser"));
const scopedPlugin = () => {
    return {
        postcssPlugin: 'uni-sfc-scoped',
        prepare({ processor: { plugins } }) {
            const hasVueSfcScoped = !!plugins.find((plugin) => plugin.postcssPlugin === 'vue-sfc-scoped');
            return {
                Rule(rule) {
                    processRule(rule, hasVueSfcScoped);
                },
            };
        },
    };
};
const processedRules = new WeakSet();
function processRule(rule, hasVueSfcScoped) {
    if (processedRules.has(rule) ||
        (rule.parent &&
            rule.parent.type === 'atrule' &&
            /-?keyframes$/.test(rule.parent.name))) {
        return;
    }
    processedRules.add(rule);
    rule.selector = (0, postcss_selector_parser_1.default)((selectorRoot) => {
        selectorRoot.each((selector) => {
            hasVueSfcScoped
                ? rewriteDeprecatedSelector(selector)
                : rewriteSelector(selector, selectorRoot);
        });
    }).processSync(rule.selector);
}
/**
 * @param selector
 * @returns
 */
function rewriteDeprecatedSelector(selector) {
    const nodes = [];
    let deepNode;
    selector.each((n) => {
        if (deepNode) {
            nodes.push(n);
            selector.removeChild(n);
        }
        else {
            const { type, value } = n;
            if (type === 'pseudo' && value === '::v-deep') {
                deepNode = n;
            }
            else if (type === 'combinator' &&
                (value === '>>>' || value === '/deep/')) {
                deepNode = n;
            }
        }
    });
    if (!deepNode) {
        return;
    }
    if (deepNode.type === 'combinator') {
        const index = selector.index(deepNode);
        if (index > 0) {
            selector.insertBefore(deepNode, postcss_selector_parser_1.default.combinator({ value: ' ' }));
        }
    }
    // remove first combinator
    // ::v-deep a{color:red;} => :deep(a){color:red;}
    const firstNode = nodes[0];
    if (firstNode && firstNode.type === 'combinator' && firstNode.value === ' ') {
        nodes.shift();
    }
    selector.insertBefore(deepNode, postcss_selector_parser_1.default.pseudo({
        value: ':deep',
        nodes: [postcss_selector_parser_1.default.selector({ value: '', nodes })],
    }));
    selector.removeChild(deepNode);
}
function rewriteSelector(selector, selectorRoot) {
    let node = null;
    // find the last child node to insert attribute selector
    selector.each((n) => {
        // DEPRECATED ">>>" and "/deep/" combinator
        if (n.type === 'combinator' &&
            (n.value === '>>>' || n.value === '/deep/')) {
            n.value = ' ';
            n.spaces.before = n.spaces.after = '';
            // warn(
            //   `the >>> and /deep/ combinators have been deprecated. ` +
            //     `Use :deep() instead.`
            // )
            return false;
        }
        if (n.type === 'pseudo') {
            const { value } = n;
            // deep: inject [id] attribute at the node before the ::v-deep
            // combinator.
            if (value === ':deep' || value === '::v-deep') {
                if (n.nodes.length) {
                    // .foo ::v-deep(.bar) -> .foo[xxxxxxx] .bar
                    // replace the current node with ::v-deep's inner selector
                    let last = n;
                    n.nodes[0].each((ss) => {
                        selector.insertAfter(last, ss);
                        last = ss;
                    });
                    // insert a space combinator before if it doesn't already have one
                    const prev = selector.at(selector.index(n) - 1);
                    if (!prev || !isSpaceCombinator(prev)) {
                        selector.insertAfter(n, postcss_selector_parser_1.default.combinator({
                            value: ' ',
                        }));
                    }
                    selector.removeChild(n);
                }
                else {
                    // DEPRECATED usage
                    // .foo ::v-deep .bar -> .foo[xxxxxxx] .bar
                    // warn(
                    //   `::v-deep usage as a combinator has ` +
                    //     `been deprecated. Use :deep(<inner-selector>) instead.`
                    // )
                    const prev = selector.at(selector.index(n) - 1);
                    if (prev && isSpaceCombinator(prev)) {
                        selector.removeChild(prev);
                    }
                    selector.removeChild(n);
                }
                return false;
            }
            // slot: use selector inside `::v-slotted` and inject [id + '-s']
            // instead.
            // ::v-slotted(.foo) -> .foo[xxxxxxx-s]
            if (value === ':slotted' || value === '::v-slotted') {
                rewriteSelector(n.nodes[0], selectorRoot);
                let last = n;
                n.nodes[0].each((ss) => {
                    selector.insertAfter(last, ss);
                    last = ss;
                });
                // selector.insertAfter(n, n.nodes[0])
                selector.removeChild(n);
                // since slotted attribute already scopes the selector there's no
                // need for the non-slot attribute.
                return false;
            }
            // global: replace with inner selector and do not inject [id].
            // ::v-global(.foo) -> .foo
            if (value === ':global' || value === '::v-global') {
                selectorRoot.insertAfter(selector, n.nodes[0]);
                selectorRoot.removeChild(selector);
                return false;
            }
        }
        if (n.type !== 'pseudo' && n.type !== 'combinator') {
            node = n;
        }
    });
    if (node) {
        ;
        node.spaces.after = '';
    }
    else {
        // For deep selectors & standalone pseudo selectors,
        // the attribute selectors are prepended rather than appended.
        // So all leading spaces must be eliminated to avoid problems.
        selector.first.spaces.before = '';
    }
}
function isSpaceCombinator(node) {
    return node.type === 'combinator' && /^\s+$/.test(node.value);
}
scopedPlugin.postcss = true;
exports.default = scopedPlugin;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800604, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("@vue/shared");
const postcss_selector_parser_1 = __importDefault(require("postcss-selector-parser"));
const uni_shared_1 = require("@dcloudio/uni-shared");
const defaultUniAppCssProcessorOptions = (0, shared_1.extend)({}, uni_shared_1.defaultRpx2Unit);
const BG_PROPS = [
    'background',
    'background-clip',
    'background-color',
    'background-image',
    'background-origin',
    'background-position',
    'background-repeat',
    'background-size',
    'background-attachment',
];
function transform(selector, state, { rewriteTag }) {
    if (selector.type !== 'tag') {
        return;
    }
    const { value } = selector;
    selector.value = rewriteTag(value);
    if (value === 'page' && selector.value === 'uni-page-body') {
        state.bg = true;
    }
}
function createBodyBackgroundRule(origRule) {
    const bgDecls = [];
    origRule.walkDecls((decl) => {
        if (BG_PROPS.indexOf(decl.prop) !== -1) {
            bgDecls.push(decl.clone());
        }
    });
    if (bgDecls.length) {
        const { rule } = require('postcss');
        origRule.after(rule({ selector: 'body' }).append(bgDecls));
    }
}
function walkRules(options) {
    return (rule) => {
        const state = { bg: false };
        rule.selector = (0, postcss_selector_parser_1.default)((selectors) => selectors.walk((selector) => transform(selector, state, options))).processSync(rule.selector);
        state.bg && createBodyBackgroundRule(rule);
    };
}
function walkDecls(rpx2unit) {
    return (decl) => {
        const { value } = decl;
        if (value.indexOf('rpx') === -1 && value.indexOf('upx') === -1) {
            return;
        }
        decl.value = rpx2unit(decl.value);
    };
}
const baiduTags = {
    navigator: 'nav',
};
function rewriteBaiduTags(tag) {
    return baiduTags[tag] || tag;
}
function rewriteUniH5Tags(tag) {
    if (tag === 'page') {
        return 'uni-page-body';
    }
    if ((0, uni_shared_1.isBuiltInComponent)(tag)) {
        return uni_shared_1.COMPONENT_SELECTOR_PREFIX + tag;
    }
    return tag;
}
function rewriteUniAppTags(tag) {
    if (tag === 'page') {
        return 'body';
    }
    if ((0, uni_shared_1.isBuiltInComponent)(tag)) {
        return uni_shared_1.COMPONENT_SELECTOR_PREFIX + tag;
    }
    return tag;
}
const transforms = {
    h5: rewriteUniH5Tags,
    app: rewriteUniAppTags,
    'mp-baidu': rewriteBaiduTags,
};
const uniapp = (opts) => {
    const platform = process.env.UNI_PLATFORM;
    const { unit, unitRatio, unitPrecision } = (0, shared_1.extend)({}, defaultUniAppCssProcessorOptions, opts);
    const rpx2unit = (0, uni_shared_1.createRpx2Unit)(unit, unitRatio, unitPrecision);
    return {
        postcssPlugin: 'uni-app',
        prepare() {
            return {
                OnceExit(root) {
                    root.walkDecls(walkDecls(rpx2unit));
                    const rewriteTag = transforms[platform];
                    if (rewriteTag) {
                        root.walkRules(walkRules({
                            rewriteTag,
                        }));
                    }
                },
            };
        },
    };
};
uniapp.postcss = true;
exports.default = uniapp;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800605, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.parseFilterNames = exports.missingModuleName = exports.parseRenderjs = exports.isRenderjs = exports.isSjs = exports.isWxs = void 0;
const url_1 = require("./vite/utils/url");
const WXS_RE = /vue&type=wxs/;
function isWxs(id) {
    return WXS_RE.test(id);
}
exports.isWxs = isWxs;
const SJS_RE = /vue&type=sjs/;
function isSjs(id) {
    return SJS_RE.test(id);
}
exports.isSjs = isSjs;
const RENDERJS_RE = /vue&type=renderjs/;
function isRenderjs(id) {
    return RENDERJS_RE.test(id);
}
exports.isRenderjs = isRenderjs;
function parseRenderjs(id) {
    if (isWxs(id) || isRenderjs(id) || isSjs(id)) {
        const { query, filename } = (0, url_1.parseVueRequest)(id);
        return {
            type: query.type,
            name: query.name,
            filename,
        };
    }
    return {
        type: '',
        name: '',
        filename: '',
    };
}
exports.parseRenderjs = parseRenderjs;
function missingModuleName(type, code) {
    return `<script module="missing module name" lang="${type}">
${code}
</script>`;
}
exports.missingModuleName = missingModuleName;
const moduleRE = /module=["'](.*?)["']/;
function parseFilterNames(lang, code) {
    const names = [];
    const scriptTags = code.match(/<script\b[^>]*>/gm);
    if (!scriptTags) {
        return names;
    }
    const langRE = new RegExp(`lang=["']${lang}["']`);
    scriptTags.forEach((scriptTag) => {
        if (langRE.test(scriptTag)) {
            const matches = scriptTag.match(moduleRE);
            if (matches) {
                names.push(matches[1]);
            }
        }
    });
    return names;
}
exports.parseFilterNames = parseFilterNames;

}, function(modId) { var map = {"./vite/utils/url":1660207800523}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800606, function(require, module, exports) {

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.esbuild = exports.transformWithEsbuild = void 0;
const path_1 = __importDefault(require("path"));
function transformWithEsbuild(code, filename, options) {
    options.stdin = {
        contents: code,
        resolveDir: path_1.default.dirname(filename),
    };
    return Promise.resolve().then(() => __importStar(require('esbuild'))).then((esbuild) => {
        return esbuild.build(options);
    });
}
exports.transformWithEsbuild = transformWithEsbuild;
function esbuild(options) {
    return Promise.resolve().then(() => __importStar(require('esbuild'))).then((esbuild) => {
        return esbuild.build(options);
    });
}
exports.esbuild = esbuild;

}, function(modId) { var map = {"esbuild":1660207800606}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800607, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseScripts = void 0;
const shared_1 = require("@vue/shared");
const fs_1 = __importDefault(require("fs"));
function parseScripts(name, pkgPath) {
    var _a, _b;
    if (!fs_1.default.existsSync(pkgPath)) {
        return;
    }
    const pkg = JSON.parse(fs_1.default.readFileSync(pkgPath, 'utf8'));
    const scripts = ((_a = pkg['uni-app']) === null || _a === void 0 ? void 0 : _a.scripts) || {};
    const options = scripts[name];
    if (!options) {
        return;
    }
    if (!((_b = options.env) === null || _b === void 0 ? void 0 : _b.UNI_PLATFORM)) {
        console.error(`package.json->uni-app->scripts->${name}->env->UNI_PLATFORM is required`);
        process.exit(0);
    }
    const { UNI_PLATFORM, ...define } = options.env;
    const context = options.define || {};
    // 补充当前编译环境未定义的其他编译环境 define
    Object.keys(scripts).forEach((scriptName) => {
        if (scriptName !== name) {
            const scriptDefine = scripts[scriptName].define || {};
            Object.keys(scriptDefine).forEach((key) => {
                if (!(0, shared_1.hasOwn)(context, key)) {
                    context[key] = false;
                }
            });
        }
    });
    return {
        name: name,
        platform: UNI_PLATFORM,
        define,
        context,
    };
}
exports.parseScripts = parseScripts;

}, function(modId) { var map = {"fs":1660207800499}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800608, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlatforms = exports.registerPlatform = void 0;
const BUILT_IN_PLATFORMS = [
    'app',
    'app-plus',
    'h5',
    'mp-360',
    'mp-alipay',
    'mp-baidu',
    'mp-jd',
    'mp-kuaishou',
    'mp-lark',
    'mp-qq',
    'mp-toutiao',
    'mp-weixin',
    'quickapp-webview',
    'quickapp-webview-huawei',
    'quickapp-webview-union',
];
const platforms = [...BUILT_IN_PLATFORMS];
function registerPlatform(platform) {
    if (!platforms.includes(platform)) {
        platforms.push(platform);
    }
}
exports.registerPlatform = registerPlatform;
function getPlatforms() {
    return platforms;
}
exports.getPlatforms = getPlatforms;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800609, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chokidar = void 0;
var chokidar_1 = require("chokidar");
Object.defineProperty(exports, "chokidar", { enumerable: true, get: function () { return __importDefault(chokidar_1).default; } });

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800610, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPostData = exports.getMac = exports.md5 = exports.checkLocalCache = exports.checkUpdate = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const debug_1 = __importDefault(require("debug"));
const crypto_1 = __importDefault(require("crypto"));
const https_1 = require("https");
const compare_versions_1 = __importDefault(require("compare-versions"));
const shared_1 = require("@vue/shared");
const json_1 = require("./json");
const hbx_1 = require("./hbx");
const debugCheckUpdate = (0, debug_1.default)('uni:check-update');
const INTERVAL = 1000 * 60 * 60 * 24;
async function checkUpdate(options) {
    if (process.env.CI) {
        debugCheckUpdate('isInCI');
        return;
    }
    if ((0, hbx_1.isInHBuilderX)()) {
        debugCheckUpdate('isInHBuilderX');
        return;
    }
    const { inputDir, compilerVersion } = options;
    const updateCache = readCheckUpdateCache(inputDir);
    debugCheckUpdate('read.cache', updateCache);
    const res = checkLocalCache(updateCache, compilerVersion);
    if (res) {
        if ((0, shared_1.isString)(res)) {
            console.log();
            console.log(res);
        }
    }
    else {
        await checkVersion(options, normalizeUpdateCache(updateCache, (0, json_1.parseManifestJsonOnce)(inputDir)));
    }
    writeCheckUpdateCache(inputDir, statUpdateCache(normalizeUpdateCache(updateCache)));
}
exports.checkUpdate = checkUpdate;
function normalizeUpdateCache(updateCache, manifestJson) {
    const platform = process.env.UNI_PLATFORM;
    if (!updateCache[platform]) {
        updateCache[platform] = {
            appid: '',
            dev: 0,
            build: 0,
        };
    }
    if (manifestJson) {
        const platformOptions = manifestJson[platform === 'app' ? 'app-plus' : platform];
        updateCache[platform].appid = platformOptions
            ? platformOptions.appid || platformOptions.package || ''
            : '';
    }
    return updateCache;
}
function statUpdateCache(updateCache) {
    debugCheckUpdate('stat.before', updateCache);
    const platform = process.env.UNI_PLATFORM;
    const type = process.env.NODE_ENV === 'production' ? 'build' : 'dev';
    const platformOptions = updateCache[platform];
    platformOptions[type] = (platformOptions[type] || 0) + 1;
    debugCheckUpdate('stat.after', updateCache);
    return updateCache;
}
function getFilepath(inputDir, filename) {
    return path_1.default.resolve(os_1.default.tmpdir(), 'uni-app-cli', md5(inputDir), filename);
}
function getCheckUpdateFilepath(inputDir) {
    return getFilepath(inputDir, 'check-update.json');
}
function generateVid() {
    let result = '';
    for (let i = 0; i < 4; i++) {
        result += ((65536 * (1 + Math.random())) | 0).toString(16).substring(1);
    }
    return 'UNI_' + result.toUpperCase();
}
function createCheckUpdateCache(vid = generateVid()) {
    return {
        vid: generateVid(),
        lastCheck: 0,
    };
}
function readCheckUpdateCache(inputDir) {
    const updateFilepath = getCheckUpdateFilepath(inputDir);
    debugCheckUpdate('read:', updateFilepath);
    if (fs_extra_1.default.existsSync(updateFilepath)) {
        try {
            return require(updateFilepath);
        }
        catch (e) {
            debugCheckUpdate('read.error', e);
        }
    }
    return createCheckUpdateCache();
}
/**
 * 检查本地缓存，返回 false 表示需要执行云端检查，返回 true 表示，无需云端检查，返回 string 表示，无需云端检测，且有更新
 * @param inputDir
 * @param compilerVersion
 * @param interval
 * @returns
 */
function checkLocalCache(updateCache, compilerVersion, interval = INTERVAL) {
    if (!updateCache.lastCheck) {
        debugCheckUpdate('cache: lastCheck not found');
        return false;
    }
    if (Date.now() - updateCache.lastCheck > interval) {
        debugCheckUpdate('cache: lastCheck > interval');
        return false;
    }
    if (updateCache.newVersion &&
        (0, compare_versions_1.default)(updateCache.newVersion, compilerVersion) > 0) {
        debugCheckUpdate('cache: find new version');
        return updateCache.note;
    }
    return true;
}
exports.checkLocalCache = checkLocalCache;
function writeCheckUpdateCache(inputDir, updateCache) {
    const filepath = getCheckUpdateFilepath(inputDir);
    debugCheckUpdate('write:', filepath, updateCache);
    try {
        fs_extra_1.default.outputFileSync(filepath, JSON.stringify(updateCache));
    }
    catch (e) {
        debugCheckUpdate('write.error', e);
    }
}
function md5(str) {
    return crypto_1.default.createHash('md5').update(str).digest('hex');
}
exports.md5 = md5;
function getMac() {
    let mac = '';
    const network = os_1.default.networkInterfaces();
    for (const key in network) {
        const array = network[key];
        for (let i = 0; i < array.length; i++) {
            const item = array[i];
            if (!item.family || (item.mac && item.mac === '00:00:00:00:00:00')) {
                continue;
            }
            if (
            // Node < v18
            (0, shared_1.isString)(item.family) &&
                (item.family === 'IPv4' || item.family === 'IPv6')) {
                mac = item.mac;
                break;
            }
            else if (
            // Node >= v18
            typeof item.family === 'number' &&
                (item.family === 4 || item.family === 6)) {
                mac = item.mac;
                break;
            }
        }
    }
    return mac;
}
exports.getMac = getMac;
function createPostData({ versionType, compilerVersion }, manifestJson, updateCache) {
    const data = {
        vv: 3,
        device: md5(getMac()),
        vtype: versionType,
        vcode: compilerVersion,
    };
    if (manifestJson.appid) {
        data.appid = manifestJson.appid;
    }
    else {
        data.vid = updateCache.vid;
    }
    Object.keys(updateCache).forEach((name) => {
        const value = updateCache[name];
        if ((0, shared_1.isPlainObject)(value) &&
            ((0, shared_1.hasOwn)(value, 'dev') || (0, shared_1.hasOwn)(value, 'build'))) {
            data[name] = value;
        }
    });
    return JSON.stringify(data);
}
exports.createPostData = createPostData;
function handleCheckVersion({ code, isUpdate, newVersion, note }, updateCache) {
    if (code !== 0) {
        return;
    }
    // clear
    Object.keys(updateCache).forEach((key) => {
        if (key !== 'vid')
            delete updateCache[key];
    });
    updateCache.lastCheck = Date.now();
    if (isUpdate) {
        updateCache.note = note;
        updateCache.newVersion = newVersion;
    }
    else {
        delete updateCache.note;
        delete updateCache.newVersion;
    }
}
const HOSTNAME = 'uniapp.dcloud.net.cn';
const PATH = '/update/cli';
function checkVersion(options, updateCache) {
    return new Promise((resolve) => {
        const postData = JSON.stringify({
            id: createPostData(options, (0, json_1.parseManifestJsonOnce)(options.inputDir), updateCache),
        });
        let responseData = '';
        const req = (0, https_1.request)({
            hostname: HOSTNAME,
            path: PATH,
            port: 443,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': postData.length,
            },
        }, (res) => {
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                responseData += chunk;
            });
            res.on('end', () => {
                debugCheckUpdate('response: ', responseData);
                try {
                    handleCheckVersion(JSON.parse(responseData), updateCache);
                }
                catch (e) { }
                resolve(true);
            });
            res.on('error', (e) => {
                debugCheckUpdate('response.error:', e);
                resolve(false);
            });
        }).on('error', (e) => {
            debugCheckUpdate('request.error:', e);
            resolve(false);
        });
        debugCheckUpdate('request: ', postData);
        req.write(postData);
        req.end();
    });
}

}, function(modId) { var map = {"./json":1660207800541,"./hbx":1660207800571}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1660207800498);
})()
//miniprogram-npm-outsideDeps=["path","fs-extra","@babel/parser","os","@vue/shared","hash-sum","pnpapi","@babel/types","estree-walker","fs","@dcloudio/uni-shared","jsonc-parser","../../lib/preprocess","magic-string","os-locale-s-fix","@vue/compiler-dom","url","mime/lite","crypto","@ampproject/remapping","fast-glob","picocolors","postcss-load-config","@rollup/pluginutils","esbuild","postcss-import","postcss-modules","postcss","debug","module","@vue/compiler-core","base64url","@dcloudio/uni-i18n","module-alias","chokidar","autoprefixer","postcss-selector-parser","https","compare-versions"]
//# sourceMappingURL=index.js.map