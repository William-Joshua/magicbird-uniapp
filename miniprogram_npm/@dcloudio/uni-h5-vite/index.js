module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1660207800613, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const plugin_1 = require("./plugin");
const css_1 = require("./plugins/css");
const easycom_1 = require("./plugins/easycom");
const inject_1 = require("./plugins/inject");
const mainJs_1 = require("./plugins/mainJs");
const manifestJson_1 = require("./plugins/manifestJson");
const pagesJson_1 = require("./plugins/pagesJson");
const postVue_1 = require("./plugins/postVue");
const renderjs_1 = require("./plugins/renderjs");
const resolveId_1 = require("./plugins/resolveId");
const setup_1 = require("./plugins/setup");
const ssr_1 = require("./plugins/ssr");
exports.default = [
    (0, easycom_1.uniEasycomPlugin)({ exclude: uni_cli_shared_1.UNI_EASYCOM_EXCLUDE }),
    (0, uni_cli_shared_1.uniCssScopedPlugin)({
        filter: (id) => (0, uni_cli_shared_1.isVueSfcFile)(id) && !id.endsWith('App.vue'),
    }),
    (0, resolveId_1.uniResolveIdPlugin)(),
    ...(process.env.UNI_H5_BROWSER === 'builtin'
        ? [
            (0, uni_cli_shared_1.uniViteInjectPlugin)('uni:h5-inject-hbx', (0, uni_cli_shared_1.initH5Provide)()),
            (0, uni_cli_shared_1.uniHBuilderXConsolePlugin)(),
        ]
        : []),
    (0, mainJs_1.uniMainJsPlugin)(),
    (0, manifestJson_1.uniManifestJsonPlugin)(),
    (0, pagesJson_1.uniPagesJsonPlugin)(),
    (0, inject_1.uniInjectPlugin)(),
    (0, css_1.uniCssPlugin)(),
    (0, ssr_1.uniSSRPlugin)(),
    (0, setup_1.uniSetupPlugin)(),
    (0, renderjs_1.uniRenderjsPlugin)(),
    (0, plugin_1.uniH5Plugin)(),
    (0, postVue_1.uniPostVuePlugin)(),
];

}, function(modId) {var map = {"./plugin":1660207800614,"./plugins/css":1660207800630,"./plugins/easycom":1660207800631,"./plugins/inject":1660207800632,"./plugins/mainJs":1660207800633,"./plugins/manifestJson":1660207800634,"./plugins/pagesJson":1660207800635,"./plugins/postVue":1660207800636,"./plugins/renderjs":1660207800637,"./plugins/resolveId":1660207800638,"./plugins/setup":1660207800639,"./plugins/ssr":1660207800640}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800614, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniH5Plugin = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const handleHotUpdate_1 = require("./handleHotUpdate");
const transformIndexHtml_1 = require("./transformIndexHtml");
const configureServer_1 = require("./configureServer");
const uni_1 = require("./uni");
const config_1 = require("./config");
const shared_1 = require("@vue/shared");
function uniH5Plugin() {
    const configOptions = {
        resolvedConfig: null,
    };
    rewriteReadFileSync();
    return {
        name: 'uni:h5',
        uni: (0, uni_1.createUni)(),
        config: (0, config_1.createConfig)(configOptions),
        configResolved(config) {
            configOptions.resolvedConfig = config;
        },
        configureServer: (0, configureServer_1.createConfigureServer)(),
        handleHotUpdate: (0, handleHotUpdate_1.createHandleHotUpdate)(),
        transformIndexHtml: (0, transformIndexHtml_1.createTransformIndexHtml)(),
    };
}
exports.uniH5Plugin = uniH5Plugin;
/**
 * 重写 readFileSync
 * 目前主要解决 scss 文件被 @import 的条件编译
 */
function rewriteReadFileSync() {
    const { readFileSync } = fs_1.default;
    fs_1.default.readFileSync = ((filepath, options) => {
        const content = readFileSync(filepath, options);
        if ((0, shared_1.isString)(filepath) &&
            (0, shared_1.isString)(content) &&
            path_1.default.extname(filepath) === '.scss' &&
            content.includes('#endif')) {
            return (0, uni_cli_shared_1.preCss)(content);
        }
        return content;
    });
}

}, function(modId) { var map = {"./handleHotUpdate":1660207800615,"./transformIndexHtml":1660207800616,"./configureServer":1660207800617,"./uni":1660207800622,"./config":1660207800623}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800615, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHandleHotUpdate = void 0;
const path_1 = __importDefault(require("path"));
const debug_1 = __importDefault(require("debug"));
const shared_1 = require("@vue/shared");
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const debugHmr = (0, debug_1.default)('uni:hmr');
async function invalidate(file, moduleGraph) {
    const mods = await moduleGraph.getModulesByFile((0, uni_cli_shared_1.normalizePath)(file));
    if (mods && mods.size) {
        ;
        [...mods].forEach((mod) => {
            debugHmr('invalidate', mod.id);
            moduleGraph.invalidateModule(mod);
        });
    }
}
let invalidateFiles;
function createHandleHotUpdate() {
    return async function ({ file, server }) {
        const inputDir = process.env.UNI_INPUT_DIR;
        const platform = process.env.UNI_PLATFORM;
        if (!invalidateFiles) {
            invalidateFiles = [
                path_1.default.resolve(inputDir, uni_cli_shared_1.PAGES_JSON_JS),
                path_1.default.resolve(inputDir, uni_cli_shared_1.MANIFEST_JSON_JS),
                (0, uni_cli_shared_1.resolveBuiltIn)('@dcloudio/uni-h5/dist/uni-h5.es.js'),
            ];
            try {
                invalidateFiles.push((0, uni_cli_shared_1.resolveBuiltIn)('vite/dist/client/env.mjs'));
            }
            catch (e) { }
        }
        // TODO 目前简单处理，当pages.json,manifest.json发生变化，就直接刷新，理想情况下，应该区分变化的内容，仅必要时做整页面刷新
        const isPagesJson = file.endsWith('pages.json');
        const isManifestJson = file.endsWith('manifest.json');
        if (!isPagesJson && !isManifestJson) {
            return;
        }
        debugHmr(file);
        const pagesJson = (0, uni_cli_shared_1.parsePagesJson)(inputDir, platform);
        // 更新define
        const { define, server: { middlewareMode }, } = server.config;
        (0, shared_1.extend)(define, (0, uni_cli_shared_1.initFeatures)({
            inputDir,
            command: 'serve',
            platform,
            pagesJson,
            manifestJson: (0, uni_cli_shared_1.parseManifestJson)(inputDir),
            ssr: !!middlewareMode,
        }));
        debugHmr('define', define);
        if (isPagesJson) {
            const easycom = pagesJson.easycom || {};
            const { options, refresh } = (0, uni_cli_shared_1.initEasycomsOnce)(inputDir, {
                dirs: [(0, uni_cli_shared_1.resolveComponentsLibPath)()],
                platform,
            });
            if (!equal({ autoscan: easycom.autoscan, custom: easycom.custom }, { autoscan: options.autoscan, custom: options.custom })) {
                refresh();
            }
        }
        // 当pages.json,manifest.json发生变化时，作废pages.json.js缓存
        for (const file of invalidateFiles) {
            await invalidate(file, server.moduleGraph);
        }
        server.ws.send({
            type: 'full-reload',
            path: '*',
        });
        return [];
    };
}
exports.createHandleHotUpdate = createHandleHotUpdate;
function equal(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800616, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransformIndexHtml = void 0;
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
function createTransformIndexHtml() {
    return async function (html) {
        var _a;
        const manifestJson = (0, uni_cli_shared_1.parseManifestJsonOnce)(process.env.UNI_INPUT_DIR);
        const title = ((_a = manifestJson.h5) === null || _a === void 0 ? void 0 : _a.title) || manifestJson.name || '';
        return html.replace(/<title>(.*?)<\/title>/, `<title>${title}</title>`);
    };
}
exports.createTransformIndexHtml = createTransformIndexHtml;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800617, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.createConfigureServer = void 0;
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const timestamp_1 = require("./middlewares/timestamp");
const ssr_1 = require("./ssr");
const static_1 = require("./static");
function createConfigureServer() {
    return function (server) {
        (0, ssr_1.initSSR)(server);
        const routerOptions = (0, uni_cli_shared_1.getRouterOptions)((0, uni_cli_shared_1.parseManifestJsonOnce)(process.env.UNI_INPUT_DIR));
        if (routerOptions.mode === 'history') {
            server.middlewares.use((0, timestamp_1.uniTimestampMiddleware)(server));
        }
        return () => {
            (0, static_1.initStatic)(server);
        };
    };
}
exports.createConfigureServer = createConfigureServer;

}, function(modId) { var map = {"./middlewares/timestamp":1660207800618,"./ssr":1660207800619,"./static":1660207800620}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800618, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniTimestampMiddleware = void 0;
const url_1 = require("url");
const path_1 = __importDefault(require("path"));
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
function uniTimestampMiddleware(server) {
    return async function timestampMiddleware(req, _, next) {
        // 当页面被作为组件引用时，会导致history刷新该页面直接显示js代码，因为该页面已被缓存为了module，
        // https://github.com/vitejs/vite/blob/702d50315535c189151c67d33e4a22124f926bed/packages/vite/src/node/server/transformRequest.ts#L52
        // /pages/tabBar/API/API
        let { url } = req;
        if (url) {
            const base = server.config.base;
            const parsed = (0, url_1.parse)(url);
            let newUrl = url;
            if ((parsed.pathname || '/').startsWith(base)) {
                newUrl = newUrl.replace(base, '/');
            }
            if (!path_1.default.extname(newUrl) &&
                !newUrl.endsWith('/') &&
                !newUrl.includes('?')) {
                const module = await server.moduleGraph.getModuleByUrl(newUrl);
                if (module && module.file && uni_cli_shared_1.EXTNAME_VUE_RE.test(module.file)) {
                    // /pages/tabBar/API/API => /pages/tabBar/API/API?__t__=time
                    req.url = url + '?__t__=' + Date.now();
                }
            }
        }
        next();
    };
}
exports.uniTimestampMiddleware = uniTimestampMiddleware;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800619, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.initSSR = exports.external = void 0;
exports.external = [
    '@dcloudio/uni-app',
    '@dcloudio/uni-app-plus',
    '@dcloudio/uni-cloud',
    '@dcloudio/uni-components',
    '@dcloudio/uni-h5',
    '@dcloudio/uni-h5-vue',
    '@dcloudio/uni-i18n',
    '@dcloudio/uni-mp-alipay',
    '@dcloudio/uni-mp-baidu',
    '@dcloudio/uni-mp-kuaishou',
    '@dcloudio/uni-mp-lark',
    '@dcloudio/uni-mp-qq',
    '@dcloudio/uni-mp-toutiao',
    '@dcloudio/uni-mp-weixin',
    '@dcloudio/uni-quickapp-webview',
    '@dcloudio/uni-shared',
    '@dcloudio/uni-stat',
    '@dcloudio/uni-stacktracey',
    '@vue/shared',
    'vue',
    'vue-i18n',
    'vue-router',
    'vuex',
    // dev
    '@dcloudio/types',
    '@dcloudio/uni-automator',
    '@dcloudio/uni-cli-shared',
    '@dcloudio/vite-plugin-uni',
    'autoprefixer',
    'typescript',
    'vite',
];
function initSSR(server) {
    const { ssrLoadModule } = server;
    let added = false;
    server.ssrLoadModule = (url) => {
        const res = ssrLoadModule(url);
        if (!added) {
            // HBuilderX项目，根目录可能没有package.json，导致 ssrExternals 不生效
            added = true;
            if (server._ssrExternals) {
                const { _ssrExternals } = server;
                exports.external.forEach((module) => {
                    if (!_ssrExternals.includes(module)) {
                        _ssrExternals.push(module);
                    }
                });
            }
        }
        return res;
    };
}
exports.initSSR = initSSR;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800620, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPublicFileFilter = exports.initStatic = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const debug_1 = __importDefault(require("debug"));
const pluginutils_1 = require("@rollup/pluginutils");
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const static_1 = require("./middlewares/static");
const debugStatic = (0, debug_1.default)('uni:static');
/**
 * devServer时提供static等目录的静态资源服务
 * @param server
 * @param param
 */
const initStatic = (server) => {
    const filter = createPublicFileFilter();
    const serve = (0, static_1.uniStaticMiddleware)({
        etag: true,
        resolve(pathname) {
            if (!filter(pathname)) {
                return;
            }
            const filename = path_1.default.join(process.env.UNI_INPUT_DIR, pathname);
            if (fs_1.default.existsSync(filename)) {
                debugStatic(filename, 'success');
                return filename;
            }
            else {
                debugStatic(filename, 'fail');
            }
        },
    });
    const viteServePublicMiddlewareIndex = server.middlewares.stack.findIndex((middleware) => {
        return (middleware.handle.name === 'viteServePublicMiddleware');
    });
    // 替换 vite 自带的 public middleware
    if (viteServePublicMiddlewareIndex > -1) {
        server.middlewares.stack.splice(viteServePublicMiddlewareIndex, 1, {
            route: '',
            handle: ((req, res, next) => {
                if ((0, uni_cli_shared_1.isImportRequest)(req.url) || (0, uni_cli_shared_1.isInternalRequest)(req.url)) {
                    return next();
                }
                return serve(req, res, next);
            }),
        });
    }
};
exports.initStatic = initStatic;
function createPublicFileFilter(base = '/') {
    const publicDir = (0, uni_cli_shared_1.normalizePath)(path_1.default.join(base, uni_cli_shared_1.PUBLIC_DIR + '/**/*'));
    const uniModulesDir = (0, uni_cli_shared_1.normalizePath)(path_1.default.join(base, 'uni_modules/*/' + uni_cli_shared_1.PUBLIC_DIR + '/**/*'));
    return (0, pluginutils_1.createFilter)([publicDir, uniModulesDir]);
}
exports.createPublicFileFilter = createPublicFileFilter;

}, function(modId) { var map = {"./middlewares/static":1660207800621}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800621, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniStaticMiddleware = void 0;
const fs_1 = __importDefault(require("fs"));
const url_1 = __importDefault(require("url"));
const lite_1 = __importDefault(require("mime/lite"));
function normalizeFile(filename, isEtag) {
    const stats = fs_1.default.statSync(filename);
    return {
        stats,
        headers: normalizeHeaders(filename, stats, isEtag),
    };
}
function normalizeHeaders(filename, stats, isEtag) {
    const headers = {
        'Content-Length': stats.size,
        'Content-Type': lite_1.default.getType(filename) || '',
        'Last-Modified': stats.mtime.toUTCString(),
    };
    if (isEtag) {
        headers['ETag'] = `W/"${stats.size}-${stats.mtime.getTime()}"`;
    }
    return headers;
}
function send(req, res, filename, stats, headers) {
    let code = 200;
    headers = { ...headers };
    const opts = {};
    for (const key in headers) {
        const value = res.getHeader(key);
        if (value) {
            headers[key] = value;
        }
    }
    if (res.getHeader('content-type')) {
        headers['Content-Type'] = res.getHeader('content-type');
    }
    if (req.headers.range) {
        code = 206;
        const [x, y] = req.headers.range.replace('bytes=', '').split('-');
        const end = (opts.end = parseInt(y, 10) || stats.size - 1);
        const start = (opts.start = parseInt(x, 10) || 0);
        if (start >= stats.size || end >= stats.size) {
            res.setHeader('Content-Range', `bytes */${stats.size}`);
            res.statusCode = 416;
            return res.end();
        }
        headers['Content-Range'] = `bytes ${start}-${end}/${stats.size}`;
        headers['Content-Length'] = end - start + 1;
        headers['Accept-Ranges'] = 'bytes';
    }
    res.writeHead(code, headers);
    fs_1.default.createReadStream(filename, opts).pipe(res);
}
function uniStaticMiddleware(opts) {
    const isEtag = !!opts.etag;
    return function staticMiddleware(req, res, next) {
        const pathname = url_1.default.parse(req.url).pathname;
        if (!pathname) {
            return next();
        }
        const filename = opts.resolve(pathname);
        if (!filename) {
            return next();
        }
        const data = normalizeFile(filename, isEtag);
        if (!data) {
            return next();
        }
        if (isEtag && req.headers['if-none-match'] === data.headers['ETag']) {
            res.writeHead(304);
            return res.end();
        }
        return send(req, res, filename, data.stats, data.headers);
    };
}
exports.uniStaticMiddleware = uniStaticMiddleware;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800622, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.createUni = exports.compilerOptions = void 0;
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const uni_shared_1 = require("@dcloudio/uni-shared");
exports.compilerOptions = {
    isNativeTag: uni_shared_1.isH5NativeTag,
    isCustomElement: uni_shared_1.isH5CustomElement,
    nodeTransforms: [
        uni_cli_shared_1.transformH5BuiltInComponents,
        uni_cli_shared_1.transformTapToClick,
        uni_cli_shared_1.transformMatchMedia,
        uni_cli_shared_1.transformPageHead,
    ],
};
function createUni() {
    return {
        copyOptions: {
            assets: ['hybrid/html/**/*', 'uni_modules/*/hybrid/html/**/*'],
        },
        compilerOptions: exports.compilerOptions,
        jsxOptions: {
            babelPlugins: [uni_cli_shared_1.transformUniH5Jsx],
        },
    };
}
exports.createUni = createUni;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800623, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConfig = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const utils_1 = require("../utils");
const esbuildPrePlugin_1 = require("./esbuild/esbuildPrePlugin");
const ssr_1 = require("./configureServer/ssr");
const shared_1 = require("@vue/shared");
function createConfig(options) {
    return function config(config, env) {
        const inputDir = process.env.UNI_INPUT_DIR;
        if ((0, uni_cli_shared_1.isInHBuilderX)()) {
            if (!fs_1.default.existsSync(path_1.default.resolve(inputDir, 'index.html'))) {
                console.error(`请确认您的项目模板是否支持vue3：根目录缺少 index.html`);
                process.exit();
            }
        }
        const server = {
            host: true,
            fs: { strict: false },
            watch: {
                ignored: ['**/uniCloud**'],
            },
            ...(0, uni_cli_shared_1.getDevServerOptions)((0, uni_cli_shared_1.parseManifestJsonOnce)(inputDir)),
        };
        if (server.port === '') {
            delete server.port;
        }
        const { server: userServer } = config;
        if (userServer) {
            if ((0, shared_1.hasOwn)(userServer, 'host')) {
                server.host = userServer.host;
            }
            if ((0, shared_1.hasOwn)(userServer, 'fs')) {
                (0, shared_1.extend)(server.fs, userServer.fs);
            }
            if ((0, shared_1.hasOwn)(userServer, 'watch')) {
                (0, shared_1.extend)(server.watch, userServer.watch);
            }
        }
        return {
            css: {
                postcss: {
                    plugins: (0, uni_cli_shared_1.initPostcssPlugin)({
                        uniApp: (0, uni_cli_shared_1.parseRpx2UnitOnce)(inputDir, process.env.UNI_PLATFORM),
                    }),
                },
            },
            optimizeDeps: {
                entries: (0, uni_cli_shared_1.resolveMainPathOnce)(inputDir),
                exclude: ssr_1.external,
                esbuildOptions: {
                    plugins: [(0, esbuildPrePlugin_1.esbuildPrePlugin)()],
                },
            },
            define: (0, utils_1.createDefine)(env.command, config),
            server,
            ssr: {
                external: ssr_1.external,
            },
            build: {
                rollupOptions: {
                    // resolveSSRExternal 会判定package.json，hbx 工程可能没有，通过 rollup 来配置
                    external: (0, uni_cli_shared_1.isSsr)(env.command, config) ? ssr_1.external : [],
                    output: {
                        chunkFileNames(chunkInfo) {
                            const { assetsDir } = options.resolvedConfig.build;
                            if (chunkInfo.facadeModuleId) {
                                const dirname = path_1.default.relative(inputDir, path_1.default.dirname(chunkInfo.facadeModuleId));
                                if (dirname) {
                                    return path_1.default.posix.join(assetsDir, (0, uni_cli_shared_1.normalizePath)(dirname).replace(/\//g, '-') +
                                        '-[name].[hash].js');
                                }
                            }
                            return path_1.default.posix.join(assetsDir, '[name].[hash].js');
                        },
                    },
                },
            },
        };
    };
}
exports.createConfig = createConfig;

}, function(modId) { var map = {"../utils":1660207800624,"./esbuild/esbuildPrePlugin":1660207800629,"./configureServer/ssr":1660207800619}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800624, function(require, module, exports) {

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
__exportStar(require("./ssr"), exports);
__exportStar(require("./features"), exports);
__exportStar(require("./constants"), exports);

}, function(modId) { var map = {"./ssr":1660207800625,"./features":1660207800627,"./constants":1660207800628}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800625, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rewriteSsrRenderStyle = exports.rewriteSsrNativeTag = exports.rewriteSsrResolve = exports.rewriteSsrVue = exports.generateSsrEntryServerCode = exports.generateSsrDefineCode = exports.initSsrDefine = exports.isSsrManifest = exports.isSSR = void 0;
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const shared_1 = require("@vue/shared");
const uni_shared_1 = require("@dcloudio/uni-shared");
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const transformPageHead_1 = require("../plugin/transforms/transformPageHead");
// Temporal handling for 2.7 breaking change
const isSSR = (opt) => opt === undefined ? false : typeof opt === 'boolean' ? opt : (opt === null || opt === void 0 ? void 0 : opt.ssr) === true;
exports.isSSR = isSSR;
function isSsrManifest(command, config) {
    if (command === 'build') {
        return !!(config.build && config.build.ssrManifest);
    }
    return false;
}
exports.isSsrManifest = isSsrManifest;
function initSsrDefine(config) {
    return (0, shared_1.extend)(globalThis, {
        __IMPORT_META_ENV_BASE_URL__: config.env.BASE_URL,
    });
}
exports.initSsrDefine = initSsrDefine;
function serializeDefine(define) {
    let res = `{`;
    for (const key in define) {
        const val = define[key];
        res += `${JSON.stringify(key)}: ${(0, shared_1.isString)(val) ? `(${val})` : JSON.stringify(val)}, `;
    }
    return res + `}`;
}
function normalizeSsrDefine(config) {
    const defines = (0, shared_1.extend)({
        __IMPORT_META_ENV_BASE_URL__: JSON.stringify(config.env.BASE_URL),
    }, config.define);
    delete defines['import.meta.env.LEGACY'];
    return defines;
}
function generateSsrDefineCode(config, { unit, unitRatio, unitPrecision }) {
    return fs_extra_1.default
        .readFileSync(path_1.default.join(__dirname, '../../lib/ssr/define.js'), 'utf8')
        .replace('__DEFINES__', serializeDefine(normalizeSsrDefine(config)))
        .replace('__UNIT__', JSON.stringify(unit))
        .replace('__UNIT_RATIO__', JSON.stringify(unitRatio))
        .replace('__UNIT_PRECISION__', JSON.stringify(unitPrecision));
}
exports.generateSsrDefineCode = generateSsrDefineCode;
function generateSsrEntryServerCode() {
    return fs_extra_1.default.readFileSync(path_1.default.join(__dirname, '../../lib/ssr/entry-server.js'), 'utf8');
}
exports.generateSsrEntryServerCode = generateSsrEntryServerCode;
function rewriteSsrVue() {
    // 解决 @vue/server-renderer 中引入 vue 的映射
    require('module-alias').addAlias('vue', (0, uni_cli_shared_1.resolveBuiltIn)('@dcloudio/uni-h5-vue/dist/vue.runtime.cjs.js'));
    // TODO vite 2.7.0 版本会定制 require 的解析，解析后缓存的文件路径会被格式化，导致 windows 平台路径不一致，导致 cache 不生效
    if (require('os').platform() === 'win32') {
        require('vue');
        const vuePath = require.resolve('vue');
        require.cache[(0, uni_cli_shared_1.normalizePath)(vuePath)] = require.cache[vuePath];
    }
}
exports.rewriteSsrVue = rewriteSsrVue;
function initResolveSyncOpts(opts) {
    if (!opts) {
        opts = {};
    }
    if (!opts.paths) {
        opts.paths = [];
    }
    if ((0, shared_1.isString)(opts.paths)) {
        opts.paths = [opts.paths];
    }
    if ((0, shared_1.isArray)(opts.paths)) {
        opts.paths.push(...(0, uni_cli_shared_1.getBuiltInPaths)());
    }
    return opts;
}
function rewriteSsrResolve() {
    // 解决 ssr 时 __vite_ssr_import__("vue") 的映射
    const resolve = require(require.resolve('resolve', {
        paths: [
            path_1.default.resolve(require.resolve('vite/package.json'), '../node_modules'),
        ],
    }));
    const oldSync = resolve.sync;
    resolve.sync = (id, opts) => {
        if (id === 'vue') {
            return (0, uni_cli_shared_1.resolveBuiltIn)(`@dcloudio/uni-h5-vue/dist/vue.runtime.cjs.js`);
        }
        else if (id === 'vue/package.json') {
            return (0, uni_cli_shared_1.resolveBuiltIn)(`@dcloudio/uni-h5-vue/package.json`);
        }
        else if (id === 'vue/server-renderer/package.json') {
            return (0, uni_cli_shared_1.resolveBuiltIn)(`@vue/server-renderer/package.json`);
        }
        return oldSync(id, initResolveSyncOpts(opts));
    };
}
exports.rewriteSsrResolve = rewriteSsrResolve;
function rewriteSsrNativeTag() {
    // @ts-ignore
    const compilerDom = require((0, uni_cli_shared_1.resolveBuiltIn)('@vue/compiler-dom'));
    // TODO compiler-ssr时，传入的 isNativeTag 会被 @vue/compiler-dom 的 isNativeTag 覆盖
    // https://github.com/vuejs/vue-next/blob/master/packages/compiler-ssr/src/index.ts#L36
    compilerDom.parserOptions.isNativeTag = uni_shared_1.isH5NativeTag;
    // ssr 时，ssrTransformComponent 执行时机很早，导致无法正确重写 tag，故通过 resolveComponentType 解决重写
    const oldResolveComponentType = compilerDom.resolveComponentType;
    const newResolveComponentType = function (node, context, ssr) {
        (0, transformPageHead_1.transformPageHead)(node, context);
        (0, uni_cli_shared_1.transformMatchMedia)(node, context);
        (0, uni_cli_shared_1.transformH5BuiltInComponents)(node, context);
        return oldResolveComponentType(node, context, ssr);
    };
    compilerDom.resolveComponentType = newResolveComponentType;
}
exports.rewriteSsrNativeTag = rewriteSsrNativeTag;
function rewriteSsrRenderStyle(inputDir) {
    const { unit, unitRatio, unitPrecision } = (0, uni_cli_shared_1.parseRpx2UnitOnce)(inputDir, 'h5');
    const rpx2unit = (0, uni_shared_1.createRpx2Unit)(unit, unitRatio, unitPrecision);
    const shared = require('@vue/shared');
    const oldStringifyStyle = shared.stringifyStyle;
    shared.stringifyStyle = (styles) => rpx2unit(oldStringifyStyle(styles));
    const serverRender = require('@vue/server-renderer');
    const oldSsrRenderStyle = serverRender.ssrRenderStyle;
    // 仅对字符串类型做转换，非字符串类型，通过 stringifyStyle 转换
    serverRender.ssrRenderStyle = (raw) => (0, shared_1.isString)(raw) ? rpx2unit(oldSsrRenderStyle(raw)) : oldSsrRenderStyle(raw);
}
exports.rewriteSsrRenderStyle = rewriteSsrRenderStyle;

}, function(modId) { var map = {"../plugin/transforms/transformPageHead":1660207800626}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800626, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.transformPageHead = void 0;
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const transformPageHead = (node, context) => {
    if ((0, uni_cli_shared_1.checkElementNodeTag)(node, 'page-meta')) {
        const headNode = node.children.find((child) => (0, uni_cli_shared_1.checkElementNodeTag)(child, 'head'));
        if (headNode) {
            headNode.tag = 'page-meta-head';
        }
        return;
    }
    if ((0, uni_cli_shared_1.checkElementNodeTag)(node, 'head') &&
        (0, uni_cli_shared_1.checkElementNodeTag)(context.parent, 'page-meta')) {
        ;
        node.tag = 'page-meta-head';
    }
};
exports.transformPageHead = transformPageHead;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800627, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefine = void 0;
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const ssr_1 = require("./ssr");
function createDefine(command, config) {
    const platform = process.env.UNI_PLATFORM;
    const inputDir = process.env.UNI_INPUT_DIR;
    return (0, uni_cli_shared_1.initFeatures)({
        inputDir,
        command,
        platform,
        pagesJson: (0, uni_cli_shared_1.parsePagesJsonOnce)(inputDir, platform),
        manifestJson: (0, uni_cli_shared_1.parseManifestJsonOnce)(inputDir),
        ssr: (0, uni_cli_shared_1.isSsr)(command, config) || (0, ssr_1.isSsrManifest)(command, config),
    });
}
exports.createDefine = createDefine;

}, function(modId) { var map = {"./ssr":1660207800625}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800628, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.ownerModuleName = void 0;
exports.ownerModuleName = '@dcloudio/uni-h5';

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800629, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.esbuildPrePlugin = exports.JS_TYPES_RE = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
exports.JS_TYPES_RE = /\.(?:j|t)sx?$|\.mjs$/;
function esbuildPrePlugin() {
    return {
        name: 'uni:dep-scan',
        setup(build) {
            build.onLoad({ filter: exports.JS_TYPES_RE }, ({ path: id }) => {
                let ext = path_1.default.extname(id).slice(1);
                if (ext === 'mjs')
                    ext = 'js';
                let contents = fs_1.default.readFileSync(id, 'utf-8');
                if (contents.includes('#endif')) {
                    contents = (0, uni_cli_shared_1.preJs)(contents);
                }
                return {
                    loader: ext,
                    contents,
                };
            });
        },
    };
}
exports.esbuildPrePlugin = esbuildPrePlugin;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800630, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assetFileNamesToFileName = exports.uniCssPlugin = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const vite_1 = require("vite");
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const shared_1 = require("@vue/shared");
function isCombineBuiltInCss(config) {
    return config.command === 'build' && config.build.cssCodeSplit;
}
function uniCssPlugin() {
    let resolvedConfig;
    let file = '';
    let fileName = '';
    return {
        name: 'uni:h5-css',
        apply: 'build',
        enforce: 'pre',
        configResolved(config) {
            resolvedConfig = config;
            file = path_1.default.join(process.env.UNI_INPUT_DIR, 'uni.css');
        },
        async generateBundle() {
            if (!isCombineBuiltInCss(resolvedConfig) || !uni_cli_shared_1.buildInCssSet.size) {
                return;
            }
            // 生成框架css
            const content = await (0, uni_cli_shared_1.minifyCSS)(generateBuiltInCssCode([...uni_cli_shared_1.buildInCssSet]), resolvedConfig);
            const contentHash = (0, uni_cli_shared_1.getAssetHash)(Buffer.from(content, 'utf-8'));
            const assetFileNames = path_1.default.posix.join(resolvedConfig.build.assetsDir, '[name].[hash][extname]');
            fileName = assetFileNamesToFileName(assetFileNames, file, contentHash, content);
            const name = (0, vite_1.normalizePath)(path_1.default.relative(resolvedConfig.root, file));
            this.emitFile({
                name,
                fileName,
                type: 'asset',
                source: content,
            });
        },
        transformIndexHtml: {
            enforce: 'post',
            transform() {
                if (!fileName) {
                    return;
                }
                // 追加框架css
                return [
                    {
                        tag: 'link',
                        attrs: {
                            rel: 'stylesheet',
                            href: toPublicPath(fileName, resolvedConfig),
                        },
                        injectTo: 'head-prepend',
                    },
                ];
            },
        },
    };
}
exports.uniCssPlugin = uniCssPlugin;
function toPublicPath(filename, config) {
    return (0, uni_cli_shared_1.isExternalUrl)(filename) ? filename : config.base + filename;
}
function generateBuiltInCssCode(cssImports) {
    return cssImports
        .map((cssImport) => fs_1.default.readFileSync((0, uni_cli_shared_1.resolveBuiltIn)(cssImport), 'utf8'))
        .join('\n');
}
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
    const ext = extname.slice(1);
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

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800631, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniEasycomPlugin = void 0;
const path_1 = __importDefault(require("path"));
const pluginutils_1 = require("@rollup/pluginutils");
const shared_1 = require("@vue/shared");
const uni_shared_1 = require("@dcloudio/uni-shared");
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const H5_COMPONENTS_PATH = '@dcloudio/uni-h5';
const baseComponents = [
    'audio',
    'button',
    'canvas',
    'checkbox',
    'checkbox-group',
    'editor',
    'form',
    'icon',
    'image',
    'input',
    'label',
    'movable-area',
    'movable-view',
    'navigator',
    'picker-view',
    'picker-view-column',
    'progress',
    'radio',
    'radio-group',
    'resize-sensor',
    'rich-text',
    'scroll-view',
    'slider',
    'swiper',
    'swiper-item',
    'switch',
    'text',
    'textarea',
    'view',
];
function uniEasycomPlugin(options) {
    const filter = (0, pluginutils_1.createFilter)(options.include, options.exclude);
    let needCombineBuiltInCss = false;
    return {
        name: 'uni:h5-easycom',
        configResolved(config) {
            needCombineBuiltInCss = (0, uni_cli_shared_1.isCombineBuiltInCss)(config);
        },
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
                    if ((0, uni_shared_1.isBuiltInComponent)(name)) {
                        name = name.replace(uni_shared_1.COMPONENT_PREFIX, '');
                        const local = `__syscom_${i++}`;
                        if (needCombineBuiltInCss) {
                            // 发行模式下，应该将内置组件css输出到入口css中
                            resolveBuiltInCssImport(name).forEach((cssImport) => uni_cli_shared_1.buildInCssSet.add(cssImport));
                            return (0, uni_cli_shared_1.addImportDeclaration)(importDeclarations, local, H5_COMPONENTS_PATH, (0, shared_1.capitalize)((0, shared_1.camelize)(name)));
                        }
                        return addBuiltInImportDeclaration(importDeclarations, local, name);
                    }
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
function resolveBuiltInCssImport(name) {
    const cssImports = [];
    if (baseComponents.includes(name)) {
        cssImports.push(uni_cli_shared_1.BASE_COMPONENTS_STYLE_PATH + name + '.css');
    }
    else {
        cssImports.push(uni_cli_shared_1.H5_COMPONENTS_STYLE_PATH + name + '.css');
    }
    const deps = uni_cli_shared_1.COMPONENT_DEPS_CSS[name];
    deps && deps.forEach((dep) => cssImports.push(dep));
    return cssImports;
}
function addBuiltInImportDeclaration(importDeclarations, local, name) {
    resolveBuiltInCssImport(name).forEach((cssImport) => importDeclarations.push(`import '${cssImport}';`));
    return (0, uni_cli_shared_1.addImportDeclaration)(importDeclarations, local, H5_COMPONENTS_PATH, (0, shared_1.capitalize)((0, shared_1.camelize)(name)));
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800632, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniInjectPlugin = void 0;
const path_1 = __importDefault(require("path"));
const shared_1 = require("@vue/shared");
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const apiJson = require(path_1.default.resolve(__dirname, '../../lib/api.json'));
const uniInjectPluginOptions = {
    exclude: [...uni_cli_shared_1.COMMON_EXCLUDE],
    'uni.': [
        '@dcloudio/uni-h5',
        ((method) => apiJson.includes(method)),
    ],
    // 兼容 wx 对象
    'wx.': [
        '@dcloudio/uni-h5',
        ((method) => apiJson.includes(method)),
    ],
    getApp: ['@dcloudio/uni-h5', 'getApp'],
    getCurrentPages: ['@dcloudio/uni-h5', 'getCurrentPages'],
    UniServiceJSBridge: ['@dcloudio/uni-h5', 'UniServiceJSBridge'],
    UniViewJSBridge: ['@dcloudio/uni-h5', 'UniViewJSBridge'],
};
function uniInjectPlugin() {
    let resolvedConfig;
    const callback = function (imports, mod) {
        const styles = mod[0] === '@dcloudio/uni-h5' &&
            uni_cli_shared_1.API_DEPS_CSS[mod[1]];
        if (!styles) {
            return;
        }
        styles.forEach((style) => {
            if ((0, uni_cli_shared_1.isCombineBuiltInCss)(resolvedConfig)) {
                uni_cli_shared_1.buildInCssSet.add(style);
            }
            else {
                if (!imports.has(style)) {
                    imports.set(style, `import '${style}';`);
                }
            }
        });
    };
    let injectPlugin;
    return {
        name: 'uni:h5-inject',
        apply: 'build',
        enforce: 'post',
        configResolved(config) {
            resolvedConfig = config;
            const enableTreeShaking = (0, uni_cli_shared_1.isEnableTreeShaking)((0, uni_cli_shared_1.parseManifestJsonOnce)(process.env.UNI_INPUT_DIR));
            if (!enableTreeShaking) {
                // 不启用摇树优化，移除 wx、uni 等 API 配置
                delete uniInjectPluginOptions['wx.'];
                delete uniInjectPluginOptions['uni.'];
            }
            injectPlugin = (0, uni_cli_shared_1.uniViteInjectPlugin)('uni:h5-inject', (0, shared_1.extend)(uniInjectPluginOptions, {
                callback,
            }));
        },
        transform(code, id) {
            return injectPlugin.transform.call(this, code, id);
        },
    };
}
exports.uniInjectPlugin = uniInjectPlugin;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800633, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.uniMainJsPlugin = void 0;
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const utils_1 = require("../utils");
function uniMainJsPlugin() {
    return (0, uni_cli_shared_1.defineUniMainJsPlugin)((opts) => {
        let runSSR = false;
        return {
            name: 'uni:h5-main-js',
            enforce: 'pre',
            configResolved(config) {
                runSSR =
                    (0, uni_cli_shared_1.isSsr)(config.command, config) || (0, utils_1.isSsrManifest)(config.command, config);
            },
            transform(code, id, options) {
                if (opts.filter(id)) {
                    if (!runSSR) {
                        code = code.includes('createSSRApp')
                            ? createApp(code)
                            : createLegacyApp(code);
                    }
                    else {
                        code = (0, utils_1.isSSR)(options)
                            ? createSSRServerApp(code)
                            : createSSRClientApp(code);
                    }
                    code = `import './${uni_cli_shared_1.PAGES_JSON_JS}';${code}`;
                    return {
                        code,
                        map: this.getCombinedSourcemap(),
                    };
                }
            },
        };
    });
}
exports.uniMainJsPlugin = uniMainJsPlugin;
function createApp(code) {
    return `import { plugin as __plugin } from '@dcloudio/uni-h5';${code.replace('createSSRApp', 'createVueApp as createSSRApp')};createApp().app.use(__plugin).mount("#app");`;
}
function createLegacyApp(code) {
    return `import { plugin as __plugin } from '@dcloudio/uni-h5';function createApp(rootComponent,rootProps){return createVueApp(rootComponent, rootProps).use(__plugin)};${code.replace('createApp', 'createVueApp')}`;
}
function createSSRClientApp(code) {
    return `import { plugin as __plugin } from '@dcloudio/uni-h5';import { UNI_SSR, UNI_SSR_STORE } from '@dcloudio/uni-shared';${code};const { app: __app, store: __store } = createApp();__app.use(__plugin);__store && window[UNI_SSR] && window[UNI_SSR][UNI_SSR_STORE] && __store.replaceState(window[UNI_SSR][UNI_SSR_STORE]);__app.router.isReady().then(() => __app.mount("#app"));`;
}
function createSSRServerApp(code) {
    return code;
}

}, function(modId) { var map = {"../utils":1660207800624}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800634, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.uniManifestJsonPlugin = void 0;
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const defaultRouter = {
    mode: 'hash',
    base: '/',
    assets: 'assets',
};
const defaultAsync = {
    loading: 'AsyncLoading',
    error: 'AsyncError',
    delay: 200,
    timeout: 60000,
    suspensible: true,
};
function uniManifestJsonPlugin() {
    return (0, uni_cli_shared_1.defineUniManifestJsonPlugin)((opts) => {
        let resolvedConfig;
        return {
            name: 'uni:h5-manifest-json',
            enforce: 'pre',
            configResolved(config) {
                defaultRouter.assets = config.build.assetsDir;
                resolvedConfig = config;
            },
            transform(code, id) {
                if (!opts.filter(id)) {
                    return;
                }
                const manifest = (0, uni_cli_shared_1.parseJson)(code);
                const { debug, h5 } = manifest;
                const router = {
                    ...defaultRouter,
                    ...{ base: resolvedConfig.base },
                    ...((h5 && h5.router) || {}),
                };
                if (!router.base) {
                    router.base = '/';
                }
                const async = { ...defaultAsync, ...((h5 && h5.async) || {}) };
                const networkTimeout = (0, uni_cli_shared_1.normalizeNetworkTimeout)(manifest.networkTimeout);
                const sdkConfigs = (h5 && h5.sdkConfigs) || {};
                const qqMapKey = sdkConfigs.maps && sdkConfigs.maps.qqmap && sdkConfigs.maps.qqmap.key;
                const googleMapKey = sdkConfigs.maps &&
                    sdkConfigs.maps.google &&
                    sdkConfigs.maps.google.key;
                const aMapKey = sdkConfigs.maps && sdkConfigs.maps.amap && sdkConfigs.maps.amap.key;
                const aMapSecurityJsCode = sdkConfigs.maps &&
                    sdkConfigs.maps.amap &&
                    sdkConfigs.maps.amap.securityJsCode;
                const aMapServiceHost = sdkConfigs.maps &&
                    sdkConfigs.maps.amap &&
                    sdkConfigs.maps.amap.serviceHost;
                let locale = manifest.locale;
                locale = locale && locale.toUpperCase() !== 'AUTO' ? locale : '';
                const i18nOptions = (0, uni_cli_shared_1.initI18nOptions)(process.env.UNI_PLATFORM, process.env.UNI_INPUT_DIR, false, false);
                const fallbackLocale = (i18nOptions && i18nOptions.locale) || '';
                const flexDirection = (manifest['app'] &&
                    manifest['app'].nvue &&
                    manifest['app'].nvue['flex-direction']) ||
                    'column';
                return {
                    code: `export const appId = ${JSON.stringify(manifest.appid || '')}
  export const appName = ${JSON.stringify(manifest.name || '')}
  export const appVersion = ${JSON.stringify(manifest.versionName || '')}
  export const appVersionCode = ${JSON.stringify(manifest.versionCode || '')}

  export const debug = ${!!debug}
  export const nvue = ${JSON.stringify({
                        'flex-direction': flexDirection,
                    })}
  export const networkTimeout = ${JSON.stringify(networkTimeout)}
  // h5
  export const router = ${JSON.stringify(router)}
  export const async = ${JSON.stringify(async)}
  export const qqMapKey = ${JSON.stringify(qqMapKey)}
  export const googleMapKey = ${JSON.stringify(googleMapKey)}
  export const aMapKey = ${JSON.stringify(aMapKey)}
  export const aMapSecurityJsCode = ${JSON.stringify(aMapSecurityJsCode)}
  export const aMapServiceHost = ${JSON.stringify(aMapServiceHost)}
  export const sdkConfigs = ${JSON.stringify(sdkConfigs)}
  export const locale = '${locale}'
  export const fallbackLocale = '${fallbackLocale}'
  `,
                    map: { mappings: '' },
                };
            },
        };
    });
}
exports.uniManifestJsonPlugin = uniManifestJsonPlugin;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800635, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.uniPagesJsonPlugin = void 0;
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const utils_1 = require("../utils");
function uniPagesJsonPlugin() {
    return (0, uni_cli_shared_1.defineUniPagesJsonPlugin)((opts) => {
        return {
            name: 'uni:h5-pages-json',
            enforce: 'pre',
            transform(code, id, opt) {
                if (opts.filter(id)) {
                    const { resolvedConfig } = opts;
                    const ssr = (0, utils_1.isSSR)(opt);
                    return {
                        code: registerGlobalCode(resolvedConfig, ssr) +
                            generatePagesJsonCode(ssr, code, resolvedConfig),
                        map: { mappings: '' },
                    };
                }
            },
        };
    });
}
exports.uniPagesJsonPlugin = uniPagesJsonPlugin;
function generatePagesJsonCode(ssr, jsonStr, config) {
    const globalName = getGlobal(ssr);
    const pagesJson = (0, uni_cli_shared_1.normalizePagesJson)(jsonStr, process.env.UNI_PLATFORM);
    const { importLayoutComponentsCode, defineLayoutComponentsCode } = generateLayoutComponentsCode(globalName, pagesJson);
    const definePagesCode = generatePagesDefineCode(pagesJson, config);
    const uniRoutesCode = generateRoutes(globalName, pagesJson, config);
    const uniConfigCode = generateConfig(globalName, pagesJson, config);
    const cssCode = generateCssCode(config);
    return `
import { defineAsyncComponent, resolveComponent, createVNode, withCtx, openBlock, createBlock } from 'vue'
import { PageComponent, AsyncLoadingComponent, AsyncErrorComponent, useI18n, setupWindow, setupPage } from '@dcloudio/uni-h5'
import { appId, appName, appVersion, appVersionCode, debug, networkTimeout, router, async, sdkConfigs, qqMapKey, googleMapKey, aMapKey, aMapSecurityJsCode, aMapServiceHost, nvue, locale, fallbackLocale } from './${uni_cli_shared_1.MANIFEST_JSON_JS}'
const locales = import.meta.globEager('./locale/*.json')
${importLayoutComponentsCode}
const extend = Object.assign
${cssCode}
${uniConfigCode}
${defineLayoutComponentsCode}
${definePagesCode}
${uniRoutesCode}
${config.command === 'serve' ? hmrCode : ''}
export {}
`;
}
const hmrCode = `if(import.meta.hot){
  import.meta.hot.on('invalidate', (data) => {
      import.meta.hot.invalidate()
  })
}`;
function getGlobal(ssr) {
    return ssr ? 'global' : 'window';
}
// 兼容 wx 对象
function registerGlobalCode(config, ssr) {
    const name = getGlobal(ssr);
    const enableTreeShaking = (0, uni_cli_shared_1.isEnableTreeShaking)((0, uni_cli_shared_1.parseManifestJsonOnce)(process.env.UNI_INPUT_DIR));
    if (enableTreeShaking && config.command === 'build' && !ssr) {
        // 非 SSR 的发行模式，补充全局 uni 对象
        return `import { upx2px, getApp } from '@dcloudio/uni-h5';${name}.uni = {};${name}.wx = {};${name}.rpx2px = upx2px`;
    }
    return `
import {uni,upx2px,getCurrentPages,getApp,UniServiceJSBridge,UniViewJSBridge} from '@dcloudio/uni-h5'
${name}.getApp = getApp
${name}.getCurrentPages = getCurrentPages
${name}.wx = uni
${name}.uni = uni
${name}.UniViewJSBridge = UniViewJSBridge
${name}.UniServiceJSBridge = UniServiceJSBridge
${name}.rpx2px = upx2px
${name}.__setupPage = (com)=>setupPage(com)
`;
}
function generateCssCode(config) {
    const define = config.define;
    const cssFiles = [uni_cli_shared_1.H5_FRAMEWORK_STYLE_PATH + 'base.css'];
    if (config.isProduction) {
        cssFiles.push(uni_cli_shared_1.H5_FRAMEWORK_STYLE_PATH + 'shadow.css');
    }
    // if (define.__UNI_FEATURE_PAGES__) {
    cssFiles.push(uni_cli_shared_1.H5_FRAMEWORK_STYLE_PATH + 'async.css');
    // }
    if (define.__UNI_FEATURE_RESPONSIVE__) {
        cssFiles.push(uni_cli_shared_1.H5_FRAMEWORK_STYLE_PATH + 'layout.css');
    }
    if (define.__UNI_FEATURE_NAVIGATIONBAR__) {
        cssFiles.push(uni_cli_shared_1.H5_FRAMEWORK_STYLE_PATH + 'pageHead.css');
    }
    if (define.__UNI_FEATURE_TABBAR__) {
        cssFiles.push(uni_cli_shared_1.H5_FRAMEWORK_STYLE_PATH + 'tabBar.css');
    }
    if (define.__UNI_FEATURE_NVUE__) {
        cssFiles.push(uni_cli_shared_1.H5_FRAMEWORK_STYLE_PATH + 'nvue.css');
    }
    if (define.__UNI_FEATURE_PULL_DOWN_REFRESH__) {
        cssFiles.push(uni_cli_shared_1.H5_FRAMEWORK_STYLE_PATH + 'pageRefresh.css');
    }
    if (define.__UNI_FEATURE_NAVIGATIONBAR_SEARCHINPUT__) {
        cssFiles.push(uni_cli_shared_1.BASE_COMPONENTS_STYLE_PATH + 'input.css');
    }
    const enableTreeShaking = (0, uni_cli_shared_1.isEnableTreeShaking)((0, uni_cli_shared_1.parseManifestJsonOnce)(process.env.UNI_INPUT_DIR));
    if (config.command === 'serve' || !enableTreeShaking) {
        // 开发模式或禁用摇树优化，自动添加所有API相关css
        Object.keys(uni_cli_shared_1.API_DEPS_CSS).forEach((name) => {
            const styles = uni_cli_shared_1.API_DEPS_CSS[name];
            styles.forEach((style) => {
                if (!cssFiles.includes(style)) {
                    cssFiles.push(style);
                }
            });
        });
    }
    return cssFiles.map((file) => `import '${file}'`).join('\n');
}
function generateLayoutComponentsCode(globalName, pagesJson) {
    const windowNames = {
        topWindow: -1,
        leftWindow: -2,
        rightWindow: -3,
    };
    let importLayoutComponentsCode = '';
    let defineLayoutComponentsCode = `${globalName}.__uniLayout = ${globalName}.__uniLayout || {}\n`;
    Object.keys(windowNames).forEach((name) => {
        const windowConfig = pagesJson[name];
        if (windowConfig && windowConfig.path) {
            importLayoutComponentsCode += `import ${name} from './${windowConfig.path}'\n`;
            defineLayoutComponentsCode += `${globalName}.__uniConfig.${name}.component = setupWindow(${name},${windowNames[name]})\n`;
        }
    });
    return {
        importLayoutComponentsCode,
        defineLayoutComponentsCode,
    };
}
function generatePageDefineCode(pageOptions) {
    let pagePathWithExtname = (0, uni_cli_shared_1.normalizePagePath)(pageOptions.path, 'h5');
    if (!pagePathWithExtname) {
        // 不存在时，仍引用，此时编译会报错文件不存在
        pagePathWithExtname = pageOptions.path + '.vue';
    }
    const pageIdent = (0, uni_cli_shared_1.normalizeIdentifier)(pageOptions.path);
    return `const ${pageIdent}Loader = ()=>import('./${pagePathWithExtname}').then(com => setupPage(com.default || com))
const ${pageIdent} = defineAsyncComponent(extend({loader:${pageIdent}Loader},AsyncComponentOptions))`;
}
function generatePagesDefineCode(pagesJson, _config) {
    const { pages } = pagesJson;
    return (`const AsyncComponentOptions = {
  loadingComponent: AsyncLoadingComponent,
  errorComponent: AsyncErrorComponent,
  delay: async.delay,
  timeout: async.timeout,
  suspensible: async.suspensible
}
` + pages.map((pageOptions) => generatePageDefineCode(pageOptions)).join('\n'));
}
function generatePageRoute({ path, meta }, _config) {
    const { isEntry } = meta;
    const alias = isEntry ? `\n  alias:'/${path}',` : '';
    // 目前单页面未处理 query=>props
    return `{
  path:'/${isEntry ? '' : path}',${alias}
  component:{setup(){ const app = getApp(); const query = app && app.$route && app.$route.query || {}; return ()=>renderPage(${(0, uni_cli_shared_1.normalizeIdentifier)(path)},query)}},
  loader: ${(0, uni_cli_shared_1.normalizeIdentifier)(path)}Loader,
  meta: ${JSON.stringify(meta)}
}`;
}
function generatePagesRoute(pagesRouteOptions, config) {
    return pagesRouteOptions.map((pageOptions) => generatePageRoute(pageOptions, config));
}
function generateRoutes(globalName, pagesJson, config) {
    return `
function renderPage(component,props){
  return (openBlock(), createBlock(PageComponent, null, {page: withCtx(() => [createVNode(component, extend({},props,{ref: "page"}), null, 512 /* NEED_PATCH */)]), _: 1 /* STABLE */}))
}
${globalName}.__uniRoutes=[${[
        ...generatePagesRoute((0, uni_cli_shared_1.normalizePagesRoute)(pagesJson), config),
    ].join(',')}].map(uniRoute=>(uniRoute.meta.route = (uniRoute.alias || uniRoute.path).slice(1),uniRoute))`;
}
function generateConfig(globalName, pagesJson, config) {
    delete pagesJson.pages;
    delete pagesJson.subPackages;
    delete pagesJson.subpackages;
    pagesJson.compilerVersion = process.env.UNI_COMPILER_VERSION;
    return `${globalName}.__uniConfig=extend(${JSON.stringify(pagesJson)},{
  appId,
  appName,
  appVersion,
  appVersionCode,
  async,
  debug,
  networkTimeout,
  sdkConfigs,
  qqMapKey,
  googleMapKey,
  aMapKey,
  aMapSecurityJsCode,
  aMapServiceHost,
  nvue,
  locale,
  fallbackLocale,
  locales:Object.keys(locales).reduce((res,name)=>{const locale=name.replace(/\\.\\/locale\\/(uni-app.)?(.*).json/,'$2');extend(res[locale]||(res[locale]={}),locales[name].default);return res},{}),
  router,
})
`;
}

}, function(modId) { var map = {"../utils":1660207800624}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800636, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniPostVuePlugin = void 0;
const path_1 = __importDefault(require("path"));
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const WXS_RE = /vue&type=(wxs|renderjs)/;
function uniPostVuePlugin() {
    return {
        name: 'uni:post-vue',
        apply: 'serve',
        enforce: 'post',
        async transform(code, id) {
            const { filename, query } = (0, uni_cli_shared_1.parseVueRequest)(id);
            if (query.vue) {
                return;
            }
            if (!uni_cli_shared_1.EXTNAME_VUE.includes(path_1.default.extname(filename))) {
                return;
            }
            if (!WXS_RE.test(code)) {
                return;
            }
            const hmrId = parseHmrId(code);
            if (!hmrId) {
                return;
            }
            // TODO 内部解决 @vitejs/plugin-vue 自定义块外链热刷的问题
            // https://github.com/vitejs/vite/blob/main/packages/plugin-vue/src/main.ts#L387
            // 没有增加 src=descriptor.id
            // 包含外链 wxs,renderjs
            code = code.replace(/vue&type=(wxs|renderjs)&index=([0-9]+)&src&/gi, (_, type, index) => {
                return `vue&type=${type}&index=${index}&src=${hmrId}&`;
            });
            return {
                code: code,
                map: null,
            };
        },
    };
}
exports.uniPostVuePlugin = uniPostVuePlugin;
function parseHmrId(code) {
    const matches = code.match(/_sfc_main.__hmrId = "(.*)"/);
    return matches && matches[1];
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800637, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniRenderjsPlugin = void 0;
const debug_1 = __importDefault(require("debug"));
const compiler_sfc_1 = require("@vue/compiler-sfc");
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const debugRenderjs = (0, debug_1.default)('uni:h5-renderjs');
function uniRenderjsPlugin() {
    return {
        name: 'uni:h5-renderjs',
        transform(code, id) {
            const { type, name } = (0, uni_cli_shared_1.parseRenderjs)(id);
            if (!type) {
                return;
            }
            debugRenderjs(id);
            if (!name) {
                this.error((0, uni_cli_shared_1.missingModuleName)(type, code));
            }
            return `${(0, compiler_sfc_1.rewriteDefault)(code.replace(/module\.exports\s*=/, 'export default '), '_sfc_' + type)}
${type === 'renderjs' ? genRenderjsCode(name) : genWxsCode(name)}`;
        },
    };
}
exports.uniRenderjsPlugin = uniRenderjsPlugin;
function genRenderjsCode(name) {
    return `export default Comp => {
  if(!Comp.$renderjs){Comp.$renderjs = []}
  Comp.$renderjs.push('${name}')
  if(!Comp.mixins){Comp.mixins = []}
  Comp.mixins.push({beforeCreate(){ this['${name}'] = this },mounted(){ this.$ownerInstance = this.$gcd(this, true) }})
  Comp.mixins.push(_sfc_renderjs)
}`;
}
function genWxsCode(name) {
    return `export default Comp => {
  if(!Comp.$wxs){Comp.$wxs = []} 
  Comp.$wxs.push('${name}')
  if(!Comp.mixins){Comp.mixins = []}
  Comp.mixins.push({beforeCreate(){ this['${name}'] = _sfc_wxs }})
}`;
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800638, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniResolveIdPlugin = void 0;
const path_1 = __importDefault(require("path"));
const debug_1 = __importDefault(require("debug"));
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const utils_1 = require("../utils");
const debugResolve = (0, debug_1.default)('uni:resolve');
function uniResolveIdPlugin() {
    const resolveCache = {};
    return {
        name: 'uni:h5-resolve-id',
        enforce: 'pre',
        config() {
            resolveCache[utils_1.ownerModuleName] = (0, uni_cli_shared_1.resolveBuiltIn)(path_1.default.join(utils_1.ownerModuleName, 'dist/uni-h5.es.js'));
            resolveCache['@dcloudio/uni-h5-vue'] = (0, uni_cli_shared_1.resolveBuiltIn)(path_1.default.join('@dcloudio/uni-h5-vue', `dist/vue.runtime.${process.env.VITEST ? 'cjs' : 'esm'}.js`));
        },
        resolveId(id) {
            if (id === 'vue') {
                id = '@dcloudio/uni-h5-vue';
            }
            const cache = resolveCache[id];
            if (cache) {
                debugResolve('cache', id, cache);
                return cache;
            }
            if (id.startsWith('@dcloudio/uni-h5/style')) {
                return (resolveCache[id] = (0, uni_cli_shared_1.resolveBuiltIn)(id));
            }
            if (id.startsWith('@dcloudio/uni-components/style')) {
                return (resolveCache[id] = (0, uni_cli_shared_1.resolveBuiltIn)(id));
            }
        },
    };
}
exports.uniResolveIdPlugin = uniResolveIdPlugin;

}, function(modId) { var map = {"../utils":1660207800624}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800639, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniSetupPlugin = void 0;
const path_1 = __importDefault(require("path"));
const debug_1 = __importDefault(require("debug"));
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const debugSetup = (0, debug_1.default)('uni:setup');
function uniSetupPlugin() {
    let appVuePath;
    let resolvedConfig;
    return {
        name: 'uni:setup',
        configResolved(config) {
            resolvedConfig = config;
            appVuePath = (0, uni_cli_shared_1.normalizePath)(path_1.default.resolve(process.env.UNI_INPUT_DIR, 'App.vue'));
        },
        transform(code, id) {
            const { filename, query } = (0, uni_cli_shared_1.parseVueRequest)(id);
            if (filename === appVuePath && !query.vue) {
                debugSetup(filename);
                return {
                    code: code +
                        `;import { setupApp } from '@dcloudio/uni-h5';setupApp(_sfc_main);`,
                    map: (0, uni_cli_shared_1.withSourcemap)(resolvedConfig)
                        ? this.getCombinedSourcemap()
                        : null,
                };
            }
        },
    };
}
exports.uniSetupPlugin = uniSetupPlugin;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1660207800640, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniSSRPlugin = void 0;
const path_1 = __importDefault(require("path"));
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const utils_1 = require("../utils");
const ENTRY_SERVER_JS = 'entry-server.js';
function uniSSRPlugin() {
    let entryServerJs;
    let resolvedConfig;
    const entryServerJsCode = (0, utils_1.generateSsrEntryServerCode)();
    return {
        name: 'uni:h5-ssr',
        config(userConfig, env) {
            if ((0, uni_cli_shared_1.isSsr)(env.command, userConfig)) {
                (0, utils_1.rewriteSsrVue)();
                (0, utils_1.rewriteSsrResolve)();
                (0, utils_1.rewriteSsrNativeTag)();
                (0, utils_1.rewriteSsrRenderStyle)(process.env.UNI_INPUT_DIR);
            }
        },
        configResolved(config) {
            resolvedConfig = config;
            entryServerJs = path_1.default.join(process.env.UNI_INPUT_DIR, ENTRY_SERVER_JS);
            if ((0, uni_cli_shared_1.isSsr)(resolvedConfig.command, resolvedConfig)) {
                (0, utils_1.initSsrDefine)(resolvedConfig);
            }
        },
        resolveId(id) {
            if (id.endsWith(ENTRY_SERVER_JS)) {
                return entryServerJs;
            }
        },
        load(id) {
            if (id.endsWith(ENTRY_SERVER_JS)) {
                return entryServerJsCode;
            }
        },
        generateBundle(_options, bundle) {
            const chunk = bundle['entry-server.js'];
            if (chunk) {
                chunk.code =
                    (0, utils_1.generateSsrDefineCode)(resolvedConfig, (0, uni_cli_shared_1.parseRpx2UnitOnce)(process.env.UNI_INPUT_DIR, process.env.UNI_PLATFORM)) +
                        '\n' +
                        chunk.code;
            }
        },
    };
}
exports.uniSSRPlugin = uniSSRPlugin;

}, function(modId) { var map = {"../utils":1660207800624}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1660207800613);
})()
//miniprogram-npm-outsideDeps=["@dcloudio/uni-cli-shared","fs","path","@vue/shared","debug","url","@rollup/pluginutils","mime/lite","@dcloudio/uni-shared","fs-extra","module-alias","os","vue","@vue/server-renderer","vite","@vue/compiler-sfc"]
//# sourceMappingURL=index.js.map