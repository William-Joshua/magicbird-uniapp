module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1660207800466, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("./vue");
const nvue_1 = require("./nvue");
const plugin_1 = require("./plugin");
exports.default = () => {
    return [
        (0, plugin_1.uniAppPlugin)({
            renderer: process.env.UNI_RENDERER,
            appService: process.env.UNI_RENDERER_NATIVE === 'appService',
        }),
        ...(process.env.UNI_COMPILER === 'nvue'
            ? (0, nvue_1.initNVuePlugins)()
            : (0, vue_1.initVuePlugins)()),
    ];
};

}, function(modId) {var map = {"./vue":1660207800467,"./nvue":1660207800482,"./plugin":1660207800494}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800467, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.initVuePlugins = void 0;
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const template_1 = require("../plugins/template");
const manifestJson_1 = require("../plugins/manifestJson");
const stats_1 = require("../plugins/stats");
const easycom_1 = require("../plugins/easycom");
const confusion_1 = require("./plugins/confusion");
const mainJs_1 = require("./plugins/mainJs");
const pagesJson_1 = require("./plugins/pagesJson");
const renderjs_1 = require("./plugins/renderjs");
const plugin_1 = require("./plugin");
function initUniCssScopedPluginFilter(inputDir) {
    const styleIsolation = (0, uni_cli_shared_1.getAppStyleIsolation)((0, uni_cli_shared_1.parseManifestJsonOnce)(inputDir));
    if (styleIsolation === 'shared') {
        return;
    }
    if (styleIsolation === 'isolated') {
        // isolated: 对所有非 App.vue 增加 scoped
        return (id) => (0, uni_cli_shared_1.isVueSfcFile)(id) && !id.endsWith('App.vue');
    }
    // apply-shared: 仅对非页面组件增加 scoped
    return (id) => (0, uni_cli_shared_1.isVueSfcFile)(id) && !id.endsWith('App.vue') && !(0, uni_cli_shared_1.isUniPageFile)(id, inputDir);
}
function initVuePlugins() {
    const plugins = [
        (0, easycom_1.uniEasycomPlugin)({ exclude: uni_cli_shared_1.UNI_EASYCOM_EXCLUDE }),
        (0, uni_cli_shared_1.uniHBuilderXConsolePlugin)(),
        (0, mainJs_1.uniMainJsPlugin)(),
        (0, manifestJson_1.uniManifestJsonPlugin)(),
        (0, pagesJson_1.uniPagesJsonPlugin)(),
        (0, uni_cli_shared_1.uniViteInjectPlugin)('uni:app-inject', (0, uni_cli_shared_1.initAppProvide)()),
        (0, renderjs_1.uniRenderjsPlugin)(),
        (0, template_1.uniTemplatePlugin)(),
        (0, stats_1.uniStatsPlugin)(),
        (0, plugin_1.uniAppVuePlugin)(),
        (0, confusion_1.uniConfusionPlugin)(),
    ];
    const filter = initUniCssScopedPluginFilter(process.env.UNI_INPUT_DIR);
    if (filter) {
        plugins.unshift((0, uni_cli_shared_1.uniCssScopedPlugin)({ filter }));
    }
    return plugins;
}
exports.initVuePlugins = initVuePlugins;

}, function(modId) { var map = {"../plugins/template":1660207800468,"../plugins/manifestJson":1660207800470,"../plugins/stats":1660207800471,"../plugins/easycom":1660207800472,"./plugins/confusion":1660207800473,"./plugins/mainJs":1660207800474,"./plugins/pagesJson":1660207800475,"./plugins/renderjs":1660207800479,"./plugin":1660207800480}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800468, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniTemplatePlugin = void 0;
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const utils_1 = require("../utils");
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
function uniTemplatePlugin({ renderer, } = {}) {
    let outputDir;
    return {
        name: 'uni:app-template',
        enforce: 'post',
        configResolved() {
            outputDir = process.env.UNI_OUTPUT_DIR;
            if (renderer !== 'native') {
                fs_extra_1.default.copySync((0, uni_cli_shared_1.resolveBuiltIn)('@dcloudio/uni-app-plus/dist/uni-app-view.umd.js'), path_1.default.resolve(outputDir, 'uni-app-view.umd.js'), {
                    overwrite: true,
                });
            }
            fs_extra_1.default.copySync(utils_1.templateDir, outputDir, {
                overwrite: true,
                filter(src) {
                    if (renderer === 'native') {
                        if (src.includes('__uniappquill') ||
                            src.includes('__uniappautomator')) {
                            return false;
                        }
                    }
                    return !src.includes('__uniappview.html');
                },
            });
        },
    };
}
exports.uniTemplatePlugin = uniTemplatePlugin;

}, function(modId) { var map = {"../utils":1660207800469}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800469, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nvueOutDir = exports.templateDir = void 0;
const path_1 = __importDefault(require("path"));
exports.templateDir = path_1.default.resolve(__dirname, '../lib/template/');
function nvueOutDir() {
    return path_1.default.join(process.env.UNI_OUTPUT_DIR, '../.nvue');
}
exports.nvueOutDir = nvueOutDir;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800470, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniManifestJsonPlugin = void 0;
const path_1 = __importDefault(require("path"));
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
function uniManifestJsonPlugin() {
    return (0, uni_cli_shared_1.defineUniManifestJsonPlugin)((opts) => {
        const inputDir = process.env.UNI_INPUT_DIR;
        return {
            name: 'uni:app-manifest-json',
            enforce: 'pre',
            transform(code, id) {
                if (!opts.filter(id)) {
                    return;
                }
                this.addWatchFile(path_1.default.resolve(inputDir, 'manifest.json'));
                (0, uni_cli_shared_1.getLocaleFiles)(path_1.default.resolve(inputDir, 'locale')).forEach((filepath) => {
                    this.addWatchFile(filepath);
                });
                const manifestJson = (0, uni_cli_shared_1.normalizeAppManifestJson)((0, uni_cli_shared_1.parseJson)(code), (0, uni_cli_shared_1.parsePagesJsonOnce)(inputDir, process.env.UNI_PLATFORM));
                // 生成一个空的 app-config.js，兼容基座已有规范
                this.emitFile({
                    fileName: uni_cli_shared_1.APP_CONFIG,
                    type: 'asset',
                    source: '(function(){})();',
                });
                this.emitFile({
                    fileName: `manifest.json`,
                    type: 'asset',
                    source: JSON.stringify(manifestJson, null, 2),
                });
                return {
                    code: '',
                    map: null,
                };
            },
        };
    });
}
exports.uniManifestJsonPlugin = uniManifestJsonPlugin;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800471, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.uniStatsPlugin = void 0;
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const emittedHashMap = new WeakMap();
function uniStatsPlugin() {
    let resolvedConfig;
    return {
        name: 'uni:app-stats',
        enforce: 'post',
        configResolved(config) {
            resolvedConfig = config;
            emittedHashMap.set(resolvedConfig, new Map());
        },
        writeBundle(_, bundle) {
            if (resolvedConfig.isProduction) {
                // 仅dev生效
                return;
            }
            const emittedHash = emittedHashMap.get(resolvedConfig);
            const changedFiles = [];
            Object.keys(bundle).forEach((filename) => {
                const outputFile = bundle[filename];
                let outputFileHash = '';
                if (outputFile.type === 'asset') {
                    outputFileHash = (0, uni_cli_shared_1.hash)(outputFile.source);
                }
                else {
                    outputFileHash = (0, uni_cli_shared_1.hash)(outputFile.code);
                }
                if (emittedHash.get(filename) !== outputFileHash) {
                    emittedHash.set(filename, outputFileHash);
                    changedFiles.push(filename);
                }
            });
            process.env.UNI_APP_CHANGED_FILES = changedFiles.length
                ? JSON.stringify(changedFiles)
                : '';
        },
    };
}
exports.uniStatsPlugin = uniStatsPlugin;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800472, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniEasycomPlugin = void 0;
const path_1 = __importDefault(require("path"));
const pluginutils_1 = require("@rollup/pluginutils");
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
function uniEasycomPlugin(options) {
    const filter = (0, pluginutils_1.createFilter)(options.include, options.exclude);
    return {
        name: 'uni:app-easycom',
        transform(code, id) {
            if (!filter(id)) {
                return;
            }
            const { filename, query } = (0, uni_cli_shared_1.parseVueRequest)(id);
            if (query.type !== 'template' &&
                (query.vue || !uni_cli_shared_1.EXTNAME_VUE_TEMPLATE.includes(path_1.default.extname(filename)))) {
                return;
            }
            let i = 0;
            const importDeclarations = [];
            code = code.replace(/_resolveComponent\("(.+?)"(, true)?\)/g, (str, name) => {
                if (name && !name.startsWith('_')) {
                    const source = (0, uni_cli_shared_1.matchEasycom)(name);
                    if (source) {
                        // 处理easycom组件优先级
                        return (0, uni_cli_shared_1.genResolveEasycomCode)(importDeclarations, str, (0, uni_cli_shared_1.addImportDeclaration)(importDeclarations, `__easycom_${i++}`, source));
                    }
                }
                return str;
            });
            if (importDeclarations.length) {
                code = importDeclarations.join('') + code;
            }
            return {
                code,
                map: null,
            };
        },
    };
}
exports.uniEasycomPlugin = uniEasycomPlugin;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800473, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniConfusionPlugin = void 0;
const path_1 = __importDefault(require("path"));
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
function uniConfusionPlugin() {
    const inputDir = process.env.UNI_INPUT_DIR;
    const hasConfusion = process.env.NODE_ENV === 'production' && (0, uni_cli_shared_1.hasConfusionFile)(inputDir);
    return {
        name: 'uni:app-vue-confusion',
        enforce: 'post',
        apply: 'build',
        config() {
            if (!hasConfusion) {
                return;
            }
            return {
                build: {
                    rollupOptions: {
                        output: {
                            format: process.env.UNI_APP_CODE_SPLITING ? 'amd' : 'cjs',
                            manualChunks(id) {
                                if ((0, uni_cli_shared_1.isConfusionFile)(path_1.default.relative(inputDir, id))) {
                                    return (0, uni_cli_shared_1.removeExt)(uni_cli_shared_1.APP_CONFUSION_FILENAME);
                                }
                            },
                        },
                    },
                },
            };
        },
        generateBundle(_, bundle) {
            if (!hasConfusion) {
                return;
            }
            const appConfusionChunk = bundle[uni_cli_shared_1.APP_CONFUSION_FILENAME];
            if (!appConfusionChunk) {
                return;
            }
            appConfusionChunk.code = wrapperAppConfusionCode(appConfusionChunk.code);
            const appServiceChunk = bundle[uni_cli_shared_1.APP_SERVICE_FILENAME];
            if (!appServiceChunk) {
                return;
            }
            appServiceChunk.code = wrapperAppServiceCode(appServiceChunk.code);
        },
    };
}
exports.uniConfusionPlugin = uniConfusionPlugin;
function replaceRequireVueCode(code) {
    return code.replace(/require\(['"]vue['"]\)/gi, `$cjs_require$('vue')`);
}
function replaceRequireAppConfusionCode(code) {
    return code.replace(new RegExp(`require\\(['"].\\/${uni_cli_shared_1.APP_CONFUSION_FILENAME}['"]\\)`, 'gi'), `$cjs_require$('./${uni_cli_shared_1.APP_CONFUSION_FILENAME}')`);
}
function wrapperAppServiceCode(code) {
    return replaceRequireAppConfusionCode(replaceRequireVueCode(code));
}
function wrapperAppConfusionCode(code) {
    return `function $cjs_require$(name){if(name==='vue'){return Vue;}if(name==='./${uni_cli_shared_1.APP_CONFUSION_FILENAME}'){return $appConfusion$;}};const $appConfusion$ = {};(function(exports){${replaceRequireVueCode(code)}})($appConfusion$);
`;
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800474, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.uniMainJsPlugin = void 0;
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
function uniMainJsPlugin() {
    return (0, uni_cli_shared_1.defineUniMainJsPlugin)((opts) => {
        return {
            name: 'uni:app-vue-main-js',
            enforce: 'pre',
            transform(code, id) {
                if (opts.filter(id)) {
                    code = code.includes('createSSRApp')
                        ? createApp(code)
                        : createLegacyApp(code);
                    return {
                        code: `import './${uni_cli_shared_1.PAGES_JSON_JS}';` + code,
                        map: { mappings: '' },
                    };
                }
            },
        };
    });
}
exports.uniMainJsPlugin = uniMainJsPlugin;
function createApp(code) {
    return `${code.replace('createSSRApp', 'createVueApp as createSSRApp')};const {app:__app__,Vuex:__Vuex__,Pinia:__Pinia__}=createApp();uni.Vuex=__Vuex__;uni.Pinia=__Pinia__;__app__.provide('__globalStyles', __uniConfig.styles);__app__._component.mpType='app';__app__._component.render=()=>{};__app__.mount("#app");`;
}
function createLegacyApp(code) {
    return `function createApp(rootComponent,rootProps){rootComponent.mpTye='app';rootComponent.render=()=>{};const app=createVueApp(rootComponent,rootProps);app.provide('__globalStyles', __uniConfig.styles);const oldMount=app.mount;app.mount=(container)=>{const appVm=oldMount.call(app,container);return appVm;};return app;};${code.replace('createApp', 'createVueApp')}`;
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800475, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniPagesJsonPlugin = void 0;
const path_1 = __importDefault(require("path"));
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const esbuild_1 = require("../../nvue/plugins/esbuild");
function uniPagesJsonPlugin() {
    return (0, uni_cli_shared_1.defineUniPagesJsonPlugin)((opts) => {
        return {
            name: 'uni:app-vue-pages-json',
            enforce: 'pre',
            transform(code, id) {
                if (!opts.filter(id)) {
                    return;
                }
                this.addWatchFile(path_1.default.resolve(process.env.UNI_INPUT_DIR, 'pages.json'));
                (0, uni_cli_shared_1.getLocaleFiles)(path_1.default.resolve(process.env.UNI_INPUT_DIR, 'locale')).forEach((filepath) => {
                    this.addWatchFile(filepath);
                });
                const pagesJson = (0, uni_cli_shared_1.normalizePagesJson)(code, process.env.UNI_PLATFORM);
                pagesJson.pages.forEach((page) => {
                    if (!page.style.isNVue) {
                        this.addWatchFile(path_1.default.resolve(process.env.UNI_INPUT_DIR, page.path + '.vue'));
                    }
                });
                this.emitFile({
                    fileName: uni_cli_shared_1.APP_CONFIG_SERVICE,
                    type: 'asset',
                    source: (0, uni_cli_shared_1.normalizeAppConfigService)(pagesJson, (0, uni_cli_shared_1.parseManifestJsonOnce)(process.env.UNI_INPUT_DIR)),
                });
                return {
                    code: `import './${uni_cli_shared_1.MANIFEST_JSON_JS}'\n` +
                        (0, uni_cli_shared_1.normalizeAppPagesJson)(pagesJson),
                    map: { mappings: '' },
                };
            },
            generateBundle(_, bundle) {
                const outputFile = bundle[uni_cli_shared_1.APP_CONFIG_SERVICE];
                if (outputFile && outputFile.type === 'asset') {
                    // 补充 nvue styles
                    ;
                    outputFile.source = (0, esbuild_1.wrapperNVueAppStyles)(outputFile.source);
                }
            },
        };
    });
}
exports.uniPagesJsonPlugin = uniPagesJsonPlugin;

}, function(modId) { var map = {"../../nvue/plugins/esbuild":1660207800476}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800476, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapperNVueAppStyles = exports.uniEsbuildPlugin = void 0;
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const debug_1 = __importDefault(require("debug"));
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const utils_1 = require("../../utils");
const utils_2 = require("../utils");
const appCss_1 = require("./appCss");
const debugEsbuild = (0, debug_1.default)('uni:app-nvue-esbuild');
const emittedHashMap = new WeakMap();
function uniEsbuildPlugin({ appService, }) {
    let resolvedConfig;
    let buildOptions;
    const nvueOutputDir = (0, utils_1.nvueOutDir)();
    const outputDir = process.env.UNI_OUTPUT_DIR;
    let isFirst = true;
    return {
        name: 'uni:app-nvue-esbuild',
        enforce: 'post',
        configResolved(config) {
            buildOptions = {
                format: 'iife',
                target: 'es6',
                minify: config.build.minify ? true : false,
                banner: {
                    js: `"use weex:vue";
${uni_cli_shared_1.polyfillCode}`,
                },
                bundle: true,
                write: false,
                plugins: [esbuildGlobalPlugin((0, utils_2.esbuildGlobals)(appService))],
            };
            resolvedConfig = config;
            emittedHashMap.set(resolvedConfig, new Map());
        },
        async writeBundle(_, bundle) {
            const entryPoints = [];
            const assets = [];
            Object.keys(bundle).forEach((name) => {
                const chunk = bundle[name];
                if (chunk.type === 'chunk' &&
                    chunk.facadeModuleId &&
                    chunk.facadeModuleId.endsWith('.nvue')) {
                    entryPoints.push(name);
                }
                else if (chunk.type === 'asset') {
                    assets.push(name);
                }
            });
            // 仅 nvueOutputDir 时 copy
            if (!appService) {
                assets.forEach((name) => {
                    fs_extra_1.default.copySync(path_1.default.resolve(nvueOutputDir, name), path_1.default.resolve(outputDir, name), { overwrite: false });
                });
            }
            if (!entryPoints.length) {
                return;
            }
            const emittedHash = emittedHashMap.get(resolvedConfig);
            const changedFiles = [];
            if (buildAppCss()) {
                changedFiles.push(uni_cli_shared_1.APP_CONFIG_SERVICE);
            }
            debugEsbuild('start', entryPoints.length, entryPoints);
            for (const filename of entryPoints) {
                await buildNVuePage(filename, buildOptions).then((code) => {
                    const outputFileHash = (0, uni_cli_shared_1.hash)(code);
                    if (emittedHash.get(filename) !== outputFileHash) {
                        changedFiles.push(filename);
                        emittedHash.set(filename, outputFileHash);
                        return fs_extra_1.default.outputFile(path_1.default.resolve(outputDir, filename), code);
                    }
                });
            }
            if (!isFirst && changedFiles.length) {
                process.env[changedFiles.includes(uni_cli_shared_1.APP_CONFIG_SERVICE)
                    ? 'UNI_APP_CHANGED_FILES'
                    : 'UNI_APP_CHANGED_PAGES'] = JSON.stringify(changedFiles);
            }
            debugEsbuild('end');
            isFirst = false;
        },
    };
}
exports.uniEsbuildPlugin = uniEsbuildPlugin;
/**
 * 将 nvue 全局 css 样式注入 app-config-service.js
 * @returns
 */
function buildAppCss() {
    const appCssJsFilename = path_1.default.join((0, utils_1.nvueOutDir)(), appCss_1.APP_CSS_JS);
    if (!fs_extra_1.default.existsSync(appCssJsFilename)) {
        return;
    }
    const appCssJsCode = fs_extra_1.default.readFileSync(appCssJsFilename, 'utf8');
    const appCssJsFn = new Function('exports', appCssJsCode);
    const exports = { styles: [] };
    appCssJsFn(exports);
    const appCssJsonCode = JSON.stringify(exports.styles);
    if (process.env.UNI_NVUE_APP_STYLES === appCssJsonCode) {
        return;
    }
    process.env.UNI_NVUE_APP_STYLES = appCssJsonCode;
    // 首次 build 时，可能还没生成 app-config-service 的文件，故仅写入环境变量
    const appConfigServiceFilename = path_1.default.join(process.env.UNI_OUTPUT_DIR, uni_cli_shared_1.APP_CONFIG_SERVICE);
    if (!fs_extra_1.default.existsSync(appConfigServiceFilename)) {
        return;
    }
    const appConfigServiceCode = fs_extra_1.default.readFileSync(appConfigServiceFilename, 'utf8');
    fs_extra_1.default.writeFileSync(appConfigServiceFilename, wrapperNVueAppStyles(appConfigServiceCode));
    return true;
}
function buildNVuePage(filename, options) {
    return (0, uni_cli_shared_1.transformWithEsbuild)(`import App from './${filename}'
const webview = plus.webview.currentWebview()
if(webview){
  const __pageId = parseInt(webview.id)
  const __pagePath = '${(0, uni_cli_shared_1.removeExt)(filename)}'
  let __pageQuery = {}
  try{ __pageQuery = JSON.parse(webview.__query__) }catch(e){}
  App.mpType = 'page'
  const app = Vue.createPageApp(App,{$store:getApp({allowDefault:true}).$store,__pageId,__pagePath,__pageQuery})
  app.provide('__globalStyles', Vue.useCssStyles([...__uniConfig.styles, ...(App.styles||[])]))
  app.mount('#root')
}`, path_1.default.join((0, utils_1.nvueOutDir)(), 'main.js'), options).then((res) => {
        if (res.outputFiles) {
            return res.outputFiles[0].text;
        }
        return '';
    });
}
function esbuildGlobalPlugin(options) {
    const keys = Object.keys(options);
    return {
        name: 'global',
        setup(build) {
            keys.forEach((key) => {
                const namespace = key + '-ns';
                build.onResolve({ filter: new RegExp('^' + key + '$') }, ({ path }) => {
                    return {
                        path,
                        namespace,
                    };
                });
                build.onLoad({ filter: /.*/, namespace }, () => ({
                    contents: `module.exports = ${options[key]}`,
                    loader: 'js',
                }));
            });
        },
    };
}
function wrapperNVueAppStyles(code) {
    return code.replace(/__uniConfig.styles=(.*);\/\/styles/, `__uniConfig.styles=${process.env.UNI_NVUE_APP_STYLES || '[]'};//styles`);
}
exports.wrapperNVueAppStyles = wrapperNVueAppStyles;

}, function(modId) { var map = {"../../utils":1660207800469,"../utils":1660207800477,"./appCss":1660207800478}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800477, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.esbuildGlobals = exports.globals = exports.external = void 0;
function external(appService) {
    return appService ? ['vue'] : ['vue', 'vuex', 'pinia'];
}
exports.external = external;
function globals(appService) {
    return appService
        ? { vue: 'Vue' }
        : {
            vue: 'Vue',
            vuex: 'Vuex',
            pinia: 'Pinia',
        };
}
exports.globals = globals;
function esbuildGlobals(appService) {
    return appService
        ? { vue: 'Vue' }
        : {
            vue: 'Vue',
            vuex: 'uni.Vuex',
            pinia: 'uni.Pinia',
        };
}
exports.esbuildGlobals = esbuildGlobals;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800478, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRollupError = exports.uniAppCssPlugin = exports.APP_CSS_JS = void 0;
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const compiler_sfc_1 = require("@vue/compiler-sfc");
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
exports.APP_CSS_JS = './app.css.js';
function uniAppCssPlugin() {
    const inputDir = process.env.UNI_INPUT_DIR;
    const appVueFilename = (0, uni_cli_shared_1.normalizePath)(path_1.default.resolve(inputDir, 'App.vue'));
    return {
        name: 'uni:app-nvue-app-style',
        // 提前到 @vite/plugin-vue 之前执行，因为在 nvue 编译时，仅 import 了 App.vue 的 styles，这样导致 descriptor
        // 一直使用的是上一次的（plugin-vue 会在 transformMain 中生成新的 descriptor），故不再交由 plugin-vue 来 load
        // 而是当前插件直接处理
        enforce: 'pre',
        resolveId(id) {
            if (id === exports.APP_CSS_JS) {
                return exports.APP_CSS_JS;
            }
        },
        load(id) {
            if (id === exports.APP_CSS_JS) {
                return genAppStylesCode(appVueFilename, this);
            }
            const { filename, query } = (0, uni_cli_shared_1.parseVueRequest)(id);
            if (query.vue && query.type === 'style' && appVueFilename === filename) {
                const descriptor = createAppDescriptor(filename, this);
                const block = descriptor.styles[query.index];
                if (block) {
                    return {
                        code: block.content,
                        map: '',
                    };
                }
            }
        },
    };
}
exports.uniAppCssPlugin = uniAppCssPlugin;
const defaultAppStylesCode = `exports.styles = []`;
async function genAppStylesCode(filename, pluginContext) {
    pluginContext.addWatchFile(filename);
    const descriptor = createAppDescriptor(filename, pluginContext);
    if (!descriptor.styles.length) {
        return defaultAppStylesCode;
    }
    let stylesCode = ``;
    const styleVars = [];
    for (let i = 0; i < descriptor.styles.length; i++) {
        const style = descriptor.styles[i];
        const src = style.src || descriptor.filename;
        const attrsQuery = attrsToQuery(style.attrs, 'css');
        const srcQuery = style.src ? `&src=${descriptor.id}` : ``;
        const query = `?vue&type=style&index=${i}${srcQuery}&inline`;
        const styleRequest = src + query + attrsQuery;
        stylesCode += `\nimport _style_${i} from ${JSON.stringify(styleRequest)}`;
        styleVars.push(`_style_${i}`);
    }
    return `
${stylesCode}
exports.styles = [${styleVars.join(',')}]
`;
}
function readAppCode(filename) {
    if (!fs_extra_1.default.existsSync(filename)) {
        return ``;
    }
    const source = fs_extra_1.default.readFileSync(filename, 'utf8');
    if (source.includes('#endif')) {
        return (0, uni_cli_shared_1.preNVueJs)((0, uni_cli_shared_1.preNVueHtml)(source));
    }
    return source;
}
let appDescriptor;
function createAppDescriptor(filename, pluginContext) {
    const source = readAppCode(filename);
    const id = (0, uni_cli_shared_1.hash)(source);
    if (!appDescriptor || appDescriptor.id !== id) {
        const { descriptor, errors } = (0, compiler_sfc_1.parse)(source, {
            filename,
        });
        descriptor.id = id;
        if (errors.length) {
            errors.forEach((error) => pluginContext.error(createRollupError(filename, error)));
        }
        appDescriptor = descriptor;
    }
    return appDescriptor;
}
function createRollupError(id, error) {
    const { message, name, stack } = error;
    const rollupError = {
        id,
        plugin: 'vue',
        message,
        name,
        stack,
    };
    if ('code' in error && error.loc) {
        rollupError.loc = {
            file: id,
            line: error.loc.start.line,
            column: error.loc.start.column,
        };
    }
    return rollupError;
}
exports.createRollupError = createRollupError;
// these are built-in query parameters so should be ignored
// if the user happen to add them as attrs
const ignoreList = ['id', 'index', 'src', 'type', 'lang', 'module'];
function attrsToQuery(attrs, langFallback, forceLangFallback = false) {
    let query = ``;
    for (const name in attrs) {
        const value = attrs[name];
        if (!ignoreList.includes(name)) {
            query += `&${encodeURIComponent(name)}${value ? `=${encodeURIComponent(value)}` : ``}`;
        }
    }
    if (langFallback || attrs.lang) {
        query +=
            `lang` in attrs
                ? forceLangFallback
                    ? `&lang.${langFallback}`
                    : `&lang.${attrs.lang}`
                : `&lang.${langFallback}`;
    }
    return query;
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800479, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniRenderjsPlugin = exports.APP_RENDERJS_JS = exports.APP_WXS_JS = void 0;
const path_1 = __importDefault(require("path"));
const debug_1 = __importDefault(require("debug"));
const uni_shared_1 = require("@dcloudio/uni-shared");
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const debugRenderjs = (0, debug_1.default)('uni:app-renderjs');
exports.APP_WXS_JS = 'app-wxs.js';
exports.APP_RENDERJS_JS = 'app-renderjs.js';
const wxsModulesCache = new WeakMap();
const renderjsModulesCache = new WeakMap();
function uniRenderjsPlugin() {
    let resolvedConfig;
    let changed = false;
    return {
        name: 'uni:app-vue-renderjs',
        configResolved(config) {
            resolvedConfig = config;
            wxsModulesCache.set(resolvedConfig, new Map());
            renderjsModulesCache.set(resolvedConfig, new Map());
        },
        async transform(code, id) {
            const { type, name, filename } = (0, uni_cli_shared_1.parseRenderjs)(id);
            if (!type) {
                return;
            }
            if (type !== 'wxs' && type !== 'renderjs') {
                return;
            }
            debugRenderjs(id);
            this.addWatchFile((0, uni_cli_shared_1.cleanUrl)(id));
            if (!name) {
                this.error((0, uni_cli_shared_1.missingModuleName)(type, code));
            }
            const modulePath = (0, uni_cli_shared_1.normalizePath)(path_1.default.normalize(path_1.default.relative(process.env.UNI_INPUT_DIR, id)));
            const moduleHashId = (0, uni_cli_shared_1.hash)(modulePath);
            const globalName = type === 'wxs' ? uni_shared_1.WXS_MODULES : uni_shared_1.RENDERJS_MODULES;
            const { isProduction } = resolvedConfig;
            const resultCode = normalizeCode(type === 'wxs'
                ? await transformWxs(code, filename, `__${globalName}['${moduleHashId}']`, isProduction)
                : await transformRenderjs(code, filename, `__${globalName}['${moduleHashId}']`, isProduction), globalName, isProduction);
            if (type === 'wxs') {
                wxsModulesCache.get(resolvedConfig).set(moduleHashId, resultCode);
            }
            else {
                renderjsModulesCache.get(resolvedConfig).set(moduleHashId, resultCode);
            }
            changed = true;
            debugRenderjs(type, modulePath, moduleHashId);
            return {
                code: `export default Comp => {
          ;(Comp.$${type} || (Comp.$${type} = [])).push('${name}')
          ;(Comp.$${globalName} || (Comp.$${globalName} = {}))['${name}'] = '${moduleHashId}'
        }`,
                map: { mappings: '' },
            };
        },
        generateBundle() {
            if (!changed) {
                return;
            }
            const wxsCode = [...wxsModulesCache.get(resolvedConfig).values()].join('\n');
            if (wxsCode) {
                this.emitFile({
                    fileName: exports.APP_WXS_JS,
                    source: `var __${uni_shared_1.WXS_MODULES}={};\n` + wxsCode,
                    type: 'asset',
                });
            }
            const renderjsCode = [
                ...renderjsModulesCache.get(resolvedConfig).values(),
            ].join('\n');
            if (renderjsCode) {
                this.emitFile({
                    fileName: exports.APP_RENDERJS_JS,
                    source: `var __${uni_shared_1.RENDERJS_MODULES}={};\n` + renderjsCode,
                    type: 'asset',
                });
            }
        },
    };
}
exports.uniRenderjsPlugin = uniRenderjsPlugin;
function normalizeCode(code, globalName, isProduction) {
    return code.replace(isProduction
        ? `var __${globalName}=__${globalName}||{};`
        : `var __${globalName} = __${globalName} || {};`, '');
}
function transformWxs(code, filename, globalName, isProduction) {
    return (0, uni_cli_shared_1.transformWithEsbuild)(code, filename, {
        format: 'iife',
        globalName,
        target: 'es6',
        minify: isProduction ? true : false,
        bundle: true,
        write: false,
    }).then((res) => {
        if (res.outputFiles) {
            return res.outputFiles[0].text;
        }
        return '';
    });
}
function transformRenderjs(code, filename, globalName, isProduction) {
    return (0, uni_cli_shared_1.transformWithEsbuild)(code, filename, {
        format: 'iife',
        globalName,
        target: 'es6',
        minify: isProduction ? true : false,
        bundle: true,
        write: false,
    }).then((res) => {
        if (res.outputFiles) {
            return res.outputFiles[0].text;
        }
        return '';
    });
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800480, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniAppVuePlugin = void 0;
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const renderjs_1 = require("../plugins/renderjs");
const configResolved_1 = require("../../plugin/configResolved");
const utils_1 = require("../../utils");
const code_1 = require("@dcloudio/uni-cli-shared/dist/json/app/pages/code");
function uniAppVuePlugin() {
    const inputDir = process.env.UNI_INPUT_DIR;
    const mainPath = (0, uni_cli_shared_1.resolveMainPathOnce)(inputDir);
    let appCss = '';
    function normalizeCssChunkFilename(id) {
        return (0, uni_cli_shared_1.removeExt)((0, uni_cli_shared_1.normalizePath)(path_1.default.relative(inputDir, id))) + '.css';
    }
    return {
        name: 'uni:app-vue',
        config() {
            return {
                css: {
                    postcss: {
                        plugins: (0, uni_cli_shared_1.initPostcssPlugin)({
                            uniApp: (0, uni_cli_shared_1.parseRpx2UnitOnce)(inputDir, process.env.UNI_PLATFORM),
                        }),
                    },
                },
                build: {
                    rollupOptions: {
                        external: ['vue', '@vue/shared'],
                        output: {
                            name: 'AppService',
                            banner: uni_cli_shared_1.polyfillCode + code_1.restoreGlobalCode,
                            format: process.env.UNI_APP_CODE_SPLITING ? 'amd' : 'iife',
                            amd: {
                                autoId: true,
                            },
                            entryFileNames: uni_cli_shared_1.APP_SERVICE_FILENAME,
                            globals: {
                                vue: 'Vue',
                                '@vue/shared': 'uni.VueShared',
                            },
                        },
                    },
                },
            };
        },
        configResolved: (0, configResolved_1.createConfigResolved)({
            createCssPostPlugin(config) {
                return (0, uni_cli_shared_1.cssPostPlugin)(config, {
                    chunkCssFilename(id) {
                        if (id === mainPath) {
                            return 'app.css';
                        }
                        else if ((0, uni_cli_shared_1.isUniPageSfcFile)(id, inputDir)) {
                            return normalizeCssChunkFilename(id);
                        }
                    },
                    chunkCssCode(filename, cssCode) {
                        if (filename === 'app.css') {
                            if (!appCss) {
                                appCss = fs_extra_1.default.readFileSync((0, uni_cli_shared_1.resolveBuiltIn)('@dcloudio/uni-app-plus/dist/style.css'), 'utf8');
                            }
                            return appCss + '\n' + cssCode;
                        }
                        return cssCode;
                    },
                });
            },
        }),
        generateBundle(_, bundle) {
            this.emitFile({
                fileName: '__uniappview.html',
                source: genViewHtml(bundle),
                type: 'asset',
            });
        },
    };
}
exports.uniAppVuePlugin = uniAppVuePlugin;
function genViewHtml(bundle) {
    const viewHtmlStr = fs_extra_1.default.readFileSync(path_1.default.join(utils_1.templateDir, '__uniappview.html'), 'utf8');
    const { globalStyle } = (0, uni_cli_shared_1.parsePagesJsonOnce)(process.env.UNI_INPUT_DIR, process.env.UNI_PLATFORM);
    const __uniConfig = {
        globalStyle: {
            rpxCalcMaxDeviceWidth: globalStyle.rpxCalcMaxDeviceWidth,
            rpxCalcBaseDeviceWidth: globalStyle.rpxCalcBaseDeviceWidth,
        },
    };
    const wxsCode = bundle[renderjs_1.APP_WXS_JS]
        ? `<script src="${renderjs_1.APP_WXS_JS}"></script>`
        : '';
    const renderjsCode = bundle[renderjs_1.APP_RENDERJS_JS]
        ? `<script src="${renderjs_1.APP_RENDERJS_JS}"></script>`
        : '';
    const automatorCode = process.env.UNI_AUTOMATOR_WS_ENDPOINT
        ? `<script src="__uniappautomator.js"></script>`
        : '';
    return viewHtmlStr
        .toString()
        .replace('<!--wxsCode-->', wxsCode)
        .replace('<!--renderjsCode-->', renderjsCode)
        .replace('<!--automatorCode-->', automatorCode)
        .replace('/*__uniConfig*/', `var __uniConfig = ${JSON.stringify(__uniConfig)}`);
}

}, function(modId) { var map = {"../plugins/renderjs":1660207800479,"../../plugin/configResolved":1660207800481,"../../utils":1660207800469}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800481, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.createConfigResolved = void 0;
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
function createConfigResolved({ createCssPostPlugin, }) {
    return (config) => {
        (0, uni_cli_shared_1.injectCssPlugin)(config);
        (0, uni_cli_shared_1.injectCssPostPlugin)(config, createCssPostPlugin(config));
        // 强制不inline
        config.build.assetsInlineLimit = 0;
        (0, uni_cli_shared_1.injectAssetPlugin)(config);
    };
}
exports.createConfigResolved = createConfigResolved;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800482, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.initNVuePlugins = exports.initNVueNodeTransforms = void 0;
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const easycom_1 = require("../plugins/easycom");
const manifestJson_1 = require("../plugins/manifestJson");
const stats_1 = require("../plugins/stats");
const template_1 = require("../plugins/template");
const plugin_1 = require("./plugin");
const appCss_1 = require("./plugins/appCss");
const esbuild_1 = require("./plugins/esbuild");
const mainJs_1 = require("./plugins/mainJs");
const pagesJson_1 = require("./plugins/pagesJson");
const renderjs_1 = require("./plugins/renderjs");
var plugin_2 = require("./plugin");
Object.defineProperty(exports, "initNVueNodeTransforms", { enumerable: true, get: function () { return plugin_2.initNVueNodeTransforms; } });
function initNVuePlugins() {
    const renderer = process.env.UNI_RENDERER;
    const appService = process.env.UNI_RENDERER_NATIVE === 'appService';
    return [
        (0, appCss_1.uniAppCssPlugin)(),
        (0, easycom_1.uniEasycomPlugin)({ exclude: uni_cli_shared_1.UNI_EASYCOM_EXCLUDE }),
        (0, uni_cli_shared_1.uniHBuilderXConsolePlugin)(),
        (0, mainJs_1.uniMainJsPlugin)({ renderer, appService }),
        (0, manifestJson_1.uniManifestJsonPlugin)(),
        (0, pagesJson_1.uniPagesJsonPlugin)({ renderer, appService }),
        (0, uni_cli_shared_1.uniViteInjectPlugin)('uni:app-inject', (0, uni_cli_shared_1.initAppProvide)()),
        (0, renderjs_1.uniRenderjsPlugin)(),
        (0, plugin_1.uniAppNVuePlugin)({ appService }),
        (0, esbuild_1.uniEsbuildPlugin)({ renderer, appService }),
        ...(appService ? [(0, stats_1.uniStatsPlugin)(), (0, template_1.uniTemplatePlugin)({ renderer })] : []),
    ];
}
exports.initNVuePlugins = initNVuePlugins;

}, function(modId) { var map = {"../plugins/easycom":1660207800472,"../plugins/manifestJson":1660207800470,"../plugins/stats":1660207800471,"../plugins/template":1660207800468,"./plugin":1660207800483,"./plugins/appCss":1660207800478,"./plugins/esbuild":1660207800476,"./plugins/mainJs":1660207800492,"./plugins/pagesJson":1660207800491,"./plugins/renderjs":1660207800493}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800483, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniAppNVuePlugin = exports.initNVueDirectiveTransforms = exports.initNVueNodeTransforms = void 0;
const path_1 = __importDefault(require("path"));
const picocolors_1 = __importDefault(require("picocolors"));
const uni_shared_1 = require("@dcloudio/uni-shared");
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const uni_nvue_styler_1 = require("@dcloudio/uni-nvue-styler");
const utils_1 = require("../../utils");
// import { transformRenderWhole } from './transforms/transformRenderWhole'
// import { transformAppendAsTree } from './transforms/transformAppendAsTree'
const transformVideo_1 = require("./transforms/transformVideo");
const transformText_1 = require("./transforms/transformText");
const configResolved_1 = require("../../plugin/configResolved");
const utils_2 = require("../utils");
const transformRootNode_1 = require("./transforms/transformRootNode");
const vModel_1 = require("./transforms/vModel");
const vShow_1 = require("./transforms/vShow");
const transformAttrs_1 = require("./transforms/transformAttrs");
const pagesJson_1 = require("../plugins/pagesJson");
const uTags = {
    text: 'u-text',
    image: 'u-image',
    input: 'u-input',
    textarea: 'u-textarea',
    video: 'u-video',
    'web-view': 'u-web-view',
    slider: 'u-slider',
};
function initNVueNodeTransforms() {
    // 优先级必须确保 renderWhole > appendAsTree
    return [
        transformRootNode_1.transformRootNode,
        (0, uni_cli_shared_1.createTransformTag)(uTags),
        transformAttrs_1.transformAttrs,
        transformText_1.transformText,
        transformVideo_1.transformVideo,
        // transformRenderWhole,
        // transformAppendAsTree,
    ];
}
exports.initNVueNodeTransforms = initNVueNodeTransforms;
function initNVueDirectiveTransforms() {
    return {
        model: vModel_1.transformModel,
        show: vShow_1.transformShow,
    };
}
exports.initNVueDirectiveTransforms = initNVueDirectiveTransforms;
function uniAppNVuePlugin({ appService, }) {
    const inputDir = process.env.UNI_INPUT_DIR;
    const mainPath = (0, uni_cli_shared_1.resolveMainPathOnce)(inputDir);
    return {
        name: 'uni:app-nvue',
        config() {
            return {
                css: {
                    postcss: {
                        plugins: (0, uni_cli_shared_1.initPostcssPlugin)({
                            uniApp: uni_shared_1.defaultNVueRpx2Unit,
                            autoprefixer: false,
                        }),
                    },
                },
                build: {
                    lib: {
                        name: 'AppService',
                        // 必须使用 lib 模式，否则会生成 preload 等代码
                        fileName: appService ? 'app-service' : 'app',
                        entry: mainPath,
                        formats: [appService ? 'iife' : 'es'],
                    },
                    outDir: appService ? process.env.UNI_OUTPUT_DIR : (0, utils_1.nvueOutDir)(),
                    rollupOptions: {
                        external: (0, utils_2.external)(appService),
                        output: {
                            entryFileNames(chunk) {
                                if (chunk.name === 'main' && chunk.isEntry) {
                                    return appService ? uni_cli_shared_1.APP_SERVICE_FILENAME : 'app.js';
                                }
                                return chunk.name + '.js';
                            },
                            assetFileNames: '[name][extname]',
                            chunkFileNames: createChunkFileNames(inputDir),
                            plugins: [(0, uni_cli_shared_1.dynamicImportPolyfill)(true)],
                            globals: (0, utils_2.globals)(appService),
                        },
                    },
                },
            };
        },
        configResolved: (0, configResolved_1.createConfigResolved)({
            createCssPostPlugin(config) {
                return {
                    name: 'vite:css-post',
                    buildStart() {
                        // 用于覆盖原始插件方法
                        // noop
                    },
                    async transform(source, filename) {
                        if (!uni_cli_shared_1.cssLangRE.test(filename) || uni_cli_shared_1.commonjsProxyRE.test(filename)) {
                            return;
                        }
                        const nvuePages = pagesJson_1.nvuePagesCache.get(config);
                        if (!nvuePages || !Object.keys(nvuePages).length) {
                            // 当前项目没有 nvue 文件
                            return { code: `export default {}`, map: { mappings: '' } };
                        }
                        const { code, messages } = await (0, uni_nvue_styler_1.parse)(source, {
                            filename,
                            logLevel: 'WARNING',
                        });
                        messages.forEach((message) => {
                            if (message.type === 'warning') {
                                let msg = `[plugin:vite:nvue-css] ${message.text}`;
                                if (message.line && message.column) {
                                    msg += `\n${(0, uni_cli_shared_1.generateCodeFrame)(source, {
                                        line: message.line,
                                        column: message.column,
                                    })}`;
                                }
                                msg += `\n${(0, uni_cli_shared_1.formatAtFilename)(filename)}`;
                                config.logger.warn(picocolors_1.default.yellow(msg));
                            }
                        });
                        return { code: `export default ${code}`, map: { mappings: '' } };
                    },
                    generateBundle() {
                        // 用于覆盖原始插件方法
                        // noop
                    },
                };
            },
        }),
    };
}
exports.uniAppNVuePlugin = uniAppNVuePlugin;
function createChunkFileNames(inputDir) {
    return function chunkFileNames(chunk) {
        if (chunk.isDynamicEntry && chunk.facadeModuleId) {
            const { filename } = (0, uni_cli_shared_1.parseVueRequest)(chunk.facadeModuleId);
            if (filename.endsWith('.nvue')) {
                return ((0, uni_cli_shared_1.removeExt)((0, uni_cli_shared_1.normalizePath)(path_1.default.relative(inputDir, filename))) + '.js');
            }
        }
        return '[name].js';
    };
}

}, function(modId) { var map = {"../../utils":1660207800469,"./transforms/transformVideo":1660207800484,"./transforms/transformText":1660207800485,"../../plugin/configResolved":1660207800481,"../utils":1660207800477,"./transforms/transformRootNode":1660207800486,"./transforms/vModel":1660207800487,"./transforms/vShow":1660207800488,"./transforms/transformAttrs":1660207800490,"../plugins/pagesJson":1660207800491}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800484, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.transformVideo = void 0;
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const compiler_core_1 = require("@vue/compiler-core");
function isVideo(node) {
    return node.tag === 'video' || node.tag === 'u-video';
}
const transformVideo = (node, _) => {
    if (!(0, uni_cli_shared_1.isElementNode)(node)) {
        return;
    }
    if (!isVideo(node)) {
        return;
    }
    if (!node.children.length) {
        return;
    }
    const firstChild = node.children[0];
    if ((0, uni_cli_shared_1.isElementNode)(firstChild) && firstChild.tag === 'u-scalable') {
        return;
    }
    node.children = [createScalable(node)];
};
exports.transformVideo = transformVideo;
function createScalable(node) {
    return {
        tag: 'u-scalable',
        type: 1 /* ELEMENT */,
        tagType: 0 /* ELEMENT */,
        props: [
            (0, uni_cli_shared_1.createBindDirectiveNode)('style', (0, compiler_core_1.createSimpleExpression)('{position:"absolute",left:"0",right:"0",top:"0",bottom:"0"}')),
        ],
        isSelfClosing: true,
        children: node.children,
        codegenNode: undefined,
        ns: node.ns,
        loc: node.loc,
    };
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800485, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.transformText = void 0;
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
function isTextNode({ tag }) {
    return tag === 'text' || tag === 'u-text' || tag === 'button';
}
function isText(node) {
    const { type } = node;
    return (type === 2 /* TEXT */ ||
        type === 12 /* TEXT_CALL */ ||
        type === 5 /* INTERPOLATION */ ||
        type === 8 /* COMPOUND_EXPRESSION */);
}
const transformText = (node, _) => {
    if (!(0, uni_cli_shared_1.isElementNode)(node)) {
        return;
    }
    if (isTextNode(node)) {
        return;
    }
    const { children } = node;
    if (!children.length) {
        return;
    }
    children.forEach((child, index) => {
        if (isText(child)) {
            children.splice(index, 1, createText(node, child));
        }
    });
};
exports.transformText = transformText;
function createText(parent, node) {
    return {
        tag: 'u-text',
        type: 1 /* ELEMENT */,
        tagType: 0 /* ELEMENT */,
        props: [],
        isSelfClosing: false,
        children: [node],
        codegenNode: undefined,
        ns: parent.ns,
        loc: node.loc,
    };
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800486, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.transformRootNode = void 0;
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const compiler_core_1 = require("@vue/compiler-core");
const SCROLLER_COMPONENTS = [
    'list',
    'scroller',
    'scroll-view',
    'waterfall',
    'recycle-list',
];
const transformRootNode = (node, context) => {
    if (node.type !== 0 /* ROOT */ || !context.bindingMetadata.__pageOptions) {
        return;
    }
    const { disableScroll, scrollIndicator } = context.bindingMetadata
        .__pageOptions;
    // 禁用滚动，或已包含滚动元素
    if (disableScroll || hasScrollerElement(node)) {
        return wrapperByView(node);
    }
    return wrapperByScrollView(node, { scrollIndicator });
};
exports.transformRootNode = transformRootNode;
function hasScrollerElement(node) {
    return node.children.some((child) => {
        if (child.type === 1 /* ELEMENT */) {
            return SCROLLER_COMPONENTS.includes(child.tag);
        }
    });
}
function wrapperByScrollView(node, { scrollIndicator }) {
    node.children = [
        createElement('scroll-view', createScrollViewProps({ scrollIndicator }), node.children),
    ];
}
const trueExpr = (0, compiler_core_1.createSimpleExpression)('true');
const falseExpr = (0, compiler_core_1.createSimpleExpression)('false');
function createScrollViewProps({ scrollIndicator, }) {
    return [
        (0, uni_cli_shared_1.createBindDirectiveNode)('scrollY', trueExpr),
        (0, uni_cli_shared_1.createBindDirectiveNode)('showScrollbar', scrollIndicator === 'none' ? falseExpr : trueExpr),
        (0, uni_cli_shared_1.createBindDirectiveNode)('enableBackToTop', trueExpr),
        (0, uni_cli_shared_1.createAttributeNode)('bubble', 'true'),
        (0, uni_cli_shared_1.createBindDirectiveNode)('style', `{flexDirection:'column'}`),
    ];
}
/**
 * 目前暂不支持多节点，故发现多节点时，自动补充一个 view 根节点
 * @param node
 */
function wrapperByView(node) {
    if (node.children.length > 1) {
        node.children = [createElement('view', [], node.children)];
    }
}
function createElement(tag, props, children) {
    return {
        type: 1 /* ELEMENT */,
        ns: 0,
        tag,
        isSelfClosing: false,
        props,
        children,
        tagType: 0 /* ELEMENT */,
        codegenNode: undefined,
        loc: compiler_core_1.locStub,
    };
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800487, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.transformModel = void 0;
const compiler_core_1 = require("@vue/compiler-core");
const shared_1 = require("@vue/shared");
const tags = ['u-input', 'u-textarea'];
const transformModel = (dir, node, context) => {
    const result = (0, compiler_core_1.transformModel)(dir, node, context);
    // 将 u-input,u-textarea 的 onUpdate:modelValue 事件转换为 onInput
    if (tags.includes(node.tag) && result.props.length >= 2) {
        const key = result.props[1].key;
        let value = result.props[1].value;
        if (value.type === 20 /* JS_CACHE_EXPRESSION */) {
            value = value.value;
        }
        if ((0, compiler_core_1.isStaticExp)(key) &&
            key.content === 'onUpdate:modelValue' &&
            value.type === 8 /* COMPOUND_EXPRESSION */) {
            key.content = 'onInput';
            // 替换 $event 为 $event.detail.value
            value.children = value.children.map((child) => {
                if ((0, shared_1.isString)(child)) {
                    return child.replace(/=\s\$event/g, `= $event.detail.value`);
                }
                return child;
            });
        }
    }
    return result;
};
exports.transformModel = transformModel;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800488, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.transformShow = void 0;
const errors_1 = require("./errors");
const transformShow = (dir, node, context) => {
    context.onError((0, errors_1.createNVueCompilerError)(0 /* X_V_SHOW */, dir.loc));
    return {
        props: [],
    };
};
exports.transformShow = transformShow;

}, function(modId) { var map = {"./errors":1660207800489}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800489, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.createNVueCompilerError = void 0;
const compiler_core_1 = require("@vue/compiler-core");
const NVueErrorMessages = {
    [0 /* X_V_SHOW */]: 'nvue: v-show is not supported',
    [1 /* X_V_MODEL_DYNAMIC_TYPE */]: 'nvue: v-model with :type="" is not supported',
    [2 /* X_V_MODEL_AND_V_BIND */]: 'nvue: v-model with v-bind is not supported',
};
function createNVueCompilerError(code, loc, additionalMessage) {
    return (0, compiler_core_1.createCompilerError)(code, loc, NVueErrorMessages, additionalMessage);
}
exports.createNVueCompilerError = createNVueCompilerError;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800490, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.transformAttrs = void 0;
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const uni_shared_1 = require("@dcloudio/uni-shared");
const shared_1 = require("@vue/shared");
/**
 * 将内置组件属性调整为驼峰
 * @param node
 * @param context
 * @returns
 */
const transformAttrs = (node, context) => {
    if (!(0, uni_cli_shared_1.isElementNode)(node)) {
        return;
    }
    if (!(0, uni_shared_1.isAppNVueNativeTag)(node.tag)) {
        return;
    }
    node.props.forEach((prop) => {
        if ((0, uni_cli_shared_1.isDirectiveNode)(prop)) {
            const { arg } = prop;
            if (arg && (0, uni_cli_shared_1.isSimpleExpressionNode)(arg)) {
                arg.content = normalizePropName(arg.content);
            }
        }
        else {
            prop.name = normalizePropName(prop.name);
        }
    });
};
exports.transformAttrs = transformAttrs;
function normalizePropName(name) {
    if (name.startsWith('data-')) {
        return name;
    }
    return (0, shared_1.camelize)(name);
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800491, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniPagesJsonPlugin = exports.nvuePagesCache = void 0;
const path_1 = __importDefault(require("path"));
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
exports.nvuePagesCache = new Map();
function uniPagesJsonPlugin({ renderer, appService, }) {
    const nvuePages = {};
    // 仅编译nvue页面时重写
    if (!appService) {
        rewriteBindingMetadata(nvuePages);
    }
    return (0, uni_cli_shared_1.defineUniPagesJsonPlugin)((opts) => {
        return {
            name: 'uni:app-nvue-pages-json',
            enforce: 'pre',
            configResolved(config) {
                exports.nvuePagesCache.set(config, nvuePages);
            },
            transform(code, id) {
                if (!opts.filter(id)) {
                    return;
                }
                this.addWatchFile(path_1.default.resolve(process.env.UNI_INPUT_DIR, 'pages.json'));
                (0, uni_cli_shared_1.getLocaleFiles)(path_1.default.resolve(process.env.UNI_INPUT_DIR, 'locale')).forEach((filepath) => {
                    this.addWatchFile(filepath);
                });
                const pagesJson = (0, uni_cli_shared_1.normalizePagesJson)(code, process.env.UNI_PLATFORM);
                Object.keys(nvuePages).forEach((name) => {
                    delete nvuePages[name];
                });
                pagesJson.pages.forEach((page) => {
                    if (page.style.isNVue) {
                        const filename = (0, uni_cli_shared_1.normalizePath)(path_1.default.resolve(process.env.UNI_INPUT_DIR, page.path + '.nvue'));
                        nvuePages[filename] = {
                            disableScroll: page.style.disableScroll,
                            scrollIndicator: page.style.scrollIndicator,
                        };
                        this.addWatchFile(filename);
                    }
                });
                if (renderer === 'native' && appService) {
                    this.emitFile({
                        fileName: uni_cli_shared_1.APP_CONFIG_SERVICE,
                        type: 'asset',
                        source: (0, uni_cli_shared_1.normalizeAppConfigService)(pagesJson, (0, uni_cli_shared_1.parseManifestJsonOnce)(process.env.UNI_INPUT_DIR)),
                    });
                    return {
                        code: '',
                        map: { mappings: '' },
                    };
                }
                return {
                    code: (0, uni_cli_shared_1.normalizeAppNVuePagesJson)(pagesJson),
                    map: { mappings: '' },
                };
            },
        };
    });
}
exports.uniPagesJsonPlugin = uniPagesJsonPlugin;
/**
 * 在 BindingMetadata 中补充页面标记
 */
function rewriteBindingMetadata(nvuePages) {
    const compilerDom = require((0, uni_cli_shared_1.resolveBuiltIn)('@vue/compiler-dom'));
    const { compile } = compilerDom;
    compilerDom.compile = (template, options = {}) => {
        if (options.filename && options.bindingMetadata) {
            if (nvuePages[options.filename]) {
                ;
                options.bindingMetadata.__pageOptions =
                    nvuePages[options.filename];
            }
        }
        return compile(template, options);
    };
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800492, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.uniMainJsPlugin = void 0;
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const appCss_1 = require("./appCss");
function uniMainJsPlugin({ renderer, appService, }) {
    return (0, uni_cli_shared_1.defineUniMainJsPlugin)((opts) => {
        return {
            name: 'uni:app-nvue-main-js',
            enforce: 'pre',
            transform(code, id) {
                if (opts.filter(id)) {
                    if (renderer !== 'native') {
                        return {
                            code: `import './${uni_cli_shared_1.PAGES_JSON_JS}';import('${appCss_1.APP_CSS_JS}').then(()=>{})`,
                            map: { mappings: '' },
                        };
                    }
                    if (appService) {
                        code = code.includes('createSSRApp')
                            ? createApp(code)
                            : createLegacyApp(code);
                        return {
                            code: `import './${uni_cli_shared_1.MANIFEST_JSON_JS}';\nimport './${uni_cli_shared_1.PAGES_JSON_JS}';\n` +
                                code,
                            map: { mappings: '' },
                        };
                    }
                    return {
                        code: `import './${uni_cli_shared_1.PAGES_JSON_JS}';`,
                        map: { mappings: '' },
                    };
                }
            },
        };
    });
}
exports.uniMainJsPlugin = uniMainJsPlugin;
function createApp(code) {
    return `${code.replace('createSSRApp', 'createVueApp as createSSRApp')};const {app:__app__,Vuex:__Vuex__,Pinia:__Pinia__}=createApp();uni.Vuex=__Vuex__;uni.Pinia=__Pinia__;__app__._component.mpType='app';__app__._component.render=()=>{};__app__.mount('#app');`;
}
function createLegacyApp(code) {
    return `function createApp(rootComponent,rootProps){rootComponent.mpTye='app';rootComponent.render=()=>{};const app=createVueApp(rootComponent,rootProps);const oldMount=app.mount;app.mount=(container)=>{const appVm=oldMount.call(app,container);return appVm;};return app;};${code.replace('createApp', 'createVueApp')}`;
}

}, function(modId) { var map = {"./appCss":1660207800478}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800493, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.uniRenderjsPlugin = void 0;
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
function uniRenderjsPlugin() {
    return {
        name: 'uni:app-nvue-renderjs',
        async transform(code, id) {
            const { type } = (0, uni_cli_shared_1.parseRenderjs)(id);
            if (!type) {
                return;
            }
            return {
                code: `export default {}`,
                map: { mappings: '' },
            };
        },
    };
}
exports.uniRenderjsPlugin = uniRenderjsPlugin;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800494, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.uniAppPlugin = void 0;
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const uni_1 = require("./uni");
const build_1 = require("./build");
function uniAppPlugin({ renderer, appService, } = {
    appService: false,
}) {
    return {
        name: 'uni:app',
        uni: (0, uni_1.uniOptions)(),
        config(config, env) {
            return {
                base: '/',
                build: (0, build_1.buildOptions)({ renderer, appService }, config, env),
                resolve: {
                    alias: {
                        // vue-i18n 默认会启用 new Function 来构造翻译函数，导致在 Android 上可能报`TypeError: no access` 错误
                        // 故：启用 runtime 模式，内部定制了简易的 compileToFunction
                        'vue-i18n': (0, uni_cli_shared_1.resolveVueI18nRuntime)(),
                    },
                },
            };
        },
    };
}
exports.uniAppPlugin = uniAppPlugin;

}, function(modId) { var map = {"./uni":1660207800495,"./build":1660207800496}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800495, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniOptions = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const uni_shared_1 = require("@dcloudio/uni-shared");
const uni_i18n_1 = require("@dcloudio/uni-i18n");
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const nvue_1 = require("../../nvue");
const plugin_1 = require("../../nvue/plugin");
function uniOptions() {
    const isNVueCompiler = process.env.UNI_COMPILER === 'nvue';
    return {
        copyOptions() {
            const platfrom = process.env.UNI_PLATFORM;
            const inputDir = process.env.UNI_INPUT_DIR;
            const outputDir = process.env.UNI_OUTPUT_DIR;
            const targets = [];
            // 自动化测试时，不启用隐私政策
            if (!process.env.UNI_AUTOMATOR_WS_ENDPOINT) {
                targets.push({
                    src: 'androidPrivacy.json',
                    dest: outputDir,
                    transform(source) {
                        const options = (0, uni_cli_shared_1.initI18nOptions)(platfrom, inputDir, false, true);
                        if (!options) {
                            return;
                        }
                        return (0, uni_i18n_1.compileI18nJsonStr)(source.toString(), options);
                    },
                });
                const debugFilename = '__nvue_debug__';
                if (fs_extra_1.default.existsSync(path_1.default.resolve(inputDir, debugFilename))) {
                    targets.push({
                        src: debugFilename,
                        dest: outputDir,
                    });
                }
            }
            return {
                assets: ['hybrid/html/**/*', 'uni_modules/*/hybrid/html/**/*'],
                targets,
            };
        },
        compilerOptions: {
            isNativeTag: isNVueCompiler ? uni_shared_1.isAppNVueNativeTag : uni_shared_1.isAppNativeTag,
            nodeTransforms: [
                ...(isNVueCompiler ? (0, nvue_1.initNVueNodeTransforms)() : []),
                uni_cli_shared_1.transformTapToClick,
                uni_cli_shared_1.transformMatchMedia,
                uni_cli_shared_1.transformPageHead,
            ],
            directiveTransforms: {
                ...(isNVueCompiler ? (0, plugin_1.initNVueDirectiveTransforms)() : {}),
            },
        },
    };
}
exports.uniOptions = uniOptions;

}, function(modId) { var map = {"../../nvue":1660207800482,"../../nvue/plugin":1660207800483}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800496, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildOptions = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const utils_1 = require("../utils");
function buildOptions({ appService, renderer, }, userConfig, _) {
    var _a;
    const inputDir = process.env.UNI_INPUT_DIR;
    const outputDir = process.env.UNI_OUTPUT_DIR;
    // 开始编译时，清空输出目录
    function emptyNVueDir() {
        const nvueOutputDir = (0, utils_1.nvueOutDir)();
        if (fs_1.default.existsSync(nvueOutputDir)) {
            (0, uni_cli_shared_1.emptyDir)(nvueOutputDir);
        }
    }
    function emptyOutDir() {
        if (fs_1.default.existsSync(outputDir)) {
            (0, uni_cli_shared_1.emptyDir)(outputDir);
        }
    }
    if (renderer === 'native') {
        if (appService) {
            // 仅编译 main.js+App.vue 的时候才清空
            emptyNVueDir();
            emptyOutDir();
        }
    }
    else {
        if ((0, uni_cli_shared_1.isInHybridNVue)(userConfig)) {
            emptyNVueDir();
        }
        else {
            emptyOutDir();
        }
    }
    const sourcemap = process.env.SOURCEMAP === 'true'
        ? 'hidden'
        : ((_a = userConfig.build) === null || _a === void 0 ? void 0 : _a.sourcemap)
            ? 'inline'
            : false;
    return {
        // App 端目前仅提供 inline
        sourcemap,
        emptyOutDir: false,
        assetsInlineLimit: 0,
        rollupOptions: {
            input: (0, uni_cli_shared_1.resolveMainPathOnce)(inputDir),
            output: {
                sourcemapPathTransform(relativeSourcePath, sourcemapPath) {
                    const sourcePath = (0, uni_cli_shared_1.normalizePath)(path_1.default.relative(inputDir, path_1.default.resolve(path_1.default.dirname(sourcemapPath), relativeSourcePath)));
                    if (sourcePath.startsWith('..')) {
                        return '';
                    }
                    return 'uni-app:///' + sourcePath;
                },
                manualChunks: {},
                chunkFileNames(chunk) {
                    if (chunk.isDynamicEntry && chunk.facadeModuleId) {
                        const filepath = path_1.default.relative(inputDir, chunk.facadeModuleId);
                        return (0, uni_cli_shared_1.normalizePath)(filepath.replace(path_1.default.extname(filepath), '.js'));
                    }
                    return '[name].js';
                },
                assetFileNames: '[name][extname]',
            },
        },
    };
}
exports.buildOptions = buildOptions;

}, function(modId) { var map = {"../utils":1660207800469}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1660207800466);
})()
//miniprogram-npm-outsideDeps=["@dcloudio/uni-cli-shared","path","fs-extra","@rollup/pluginutils","debug","@vue/compiler-sfc","@dcloudio/uni-shared","@dcloudio/uni-cli-shared/dist/json/app/pages/code","picocolors","@dcloudio/uni-nvue-styler","@vue/compiler-core","@vue/shared","@dcloudio/uni-i18n","fs"]
//# sourceMappingURL=index.js.map