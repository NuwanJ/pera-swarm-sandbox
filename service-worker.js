!function(){"use strict";var e={913:function(){try{self["workbox:core:6.0.2"]&&_()}catch(e){}},977:function(){try{self["workbox:precaching:6.0.2"]&&_()}catch(e){}},80:function(){try{self["workbox:routing:6.0.2"]&&_()}catch(e){}},873:function(){try{self["workbox:strategies:6.0.2"]&&_()}catch(e){}}},t={};function s(n){if(t[n])return t[n].exports;var r=t[n]={exports:{}};return e[n](r,r.exports,s),r.exports}!function(){s(913);const e=(e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}const n={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},r=e=>[n.prefix,e,n.suffix].filter((e=>e&&e.length>0)).join("-"),a=e=>e||r(n.precache),i=e=>e||r(n.runtime);function o(e,t){const s=t();return e.waitUntil(s),s}s(977);function c(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:n}=e;if(!n)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(n,location.href);return{cacheKey:e.href,url:e.href}}const r=new URL(n,location.href),a=new URL(n,location.href);return r.searchParams.set("__WB_REVISION__",s),{cacheKey:r.href,url:a.href}}class h{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if("install"===e.type){const e=t.originalRequest.url;s?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return s}}}class l{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:t})=>{const s=t&&t.cacheKey||this._precacheController.getCacheKeyForURL(e.url);return s?new Request(s):e},this._precacheController=e}}let u;async function f(e,s){let n=null;if(e.url){n=new URL(e.url).origin}if(n!==self.location.origin)throw new t("cross-origin-copy-response",{origin:n});const r=e.clone(),a={headers:new Headers(r.headers),status:r.status,statusText:r.statusText},i=s?s(a):a,o=function(){if(void 0===u){const e=new Response("");if("body"in e)try{new Response(e.body),u=!0}catch(e){u=!1}u=!1}return u}()?r.body:await r.blob();return new Response(o,i)}function d(e,t){const s=new URL(e);for(const e of t)s.searchParams.delete(e);return s.href}class p{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}const w=new Set;s(873);function y(e){return"string"==typeof e?new Request(e):e}class g{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new p,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const e of this._plugins)this._pluginStateMap.set(e,{});this.event.waitUntil(this._handlerDeferred.promise)}fetch(e){return this.waitUntil((async()=>{const{event:s}=this;let n=y(e);if("navigate"===n.mode&&s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const r=this.hasCallback("fetchDidFail")?n.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))n=await e({request:n.clone(),event:s})}catch(e){throw new t("plugin-error-request-will-fetch",{thrownError:e})}const a=n.clone();try{let e;e=await fetch(n,"navigate"===n.mode?void 0:this._strategy.fetchOptions);for(const t of this.iterateCallbacks("fetchDidSucceed"))e=await t({event:s,request:a,response:e});return e}catch(e){throw r&&await this.runCallbacks("fetchDidFail",{error:e,event:s,originalRequest:r.clone(),request:a.clone()}),e}})())}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}cacheMatch(e){return this.waitUntil((async()=>{const t=y(e);let s;const{cacheName:n,matchOptions:r}=this._strategy,a=await this.getCacheKey(t,"read"),i={...r,cacheName:n};s=await caches.match(a,i);for(const e of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await e({cacheName:n,matchOptions:r,cachedResponse:s,request:a,event:this.event})||void 0;return s})())}async cachePut(e,s){const n=y(e);var r;await(r=0,new Promise((e=>setTimeout(e,r))));const a=await this.getCacheKey(n,"write");if(!s)throw new t("cache-put-with-no-response",{url:(i=a.url,new URL(String(i),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var i;const o=await this._ensureResponseSafeToCache(s);if(!o)return void 0;const{cacheName:c,matchOptions:h}=this._strategy,l=await self.caches.open(c),u=this.hasCallback("cacheDidUpdate"),f=u?await async function(e,t,s,n){const r=d(t.url,s);if(t.url===r)return e.match(t,n);const a={...n,ignoreSearch:!0},i=await e.keys(t,a);for(const t of i)if(r===d(t.url,s))return e.match(t,n)}(l,a.clone(),["__WB_REVISION__"],h):null;try{await l.put(a,u?o.clone():o)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of w)await e()}(),e}for(const e of this.iterateCallbacks("cacheDidUpdate"))await e({cacheName:c,oldResponse:f,newResponse:o.clone(),request:a,event:this.event})}async getCacheKey(e,t){if(!this._cacheKeys[t]){let s=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))s=y(await e({mode:t,request:s,event:this.event,params:this.params}));this._cacheKeys[t]=s}return this._cacheKeys[t]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if("function"==typeof t[e]){const s=this._pluginStateMap.get(t),n=n=>{const r={...n,state:s};return t[e](r)};yield n}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve()}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(const e of this.iterateCallbacks("cacheWillUpdate"))if(t=await e({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&200!==t.status&&(t=void 0),t}}const m={cacheWillUpdate:async({response:e})=>e.redirected?await f(e):e};class _ extends class{constructor(e={}){this.cacheName=i(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s="string"==typeof e.request?new Request(e.request):e.request,n="params"in e?e.params:void 0,r=new g(this,{event:t,request:s,params:n}),a=this._getResponse(r,s,t);return[a,this._awaitComplete(a,r,s,t)]}async _getResponse(e,s,n){let r;await e.runCallbacks("handlerWillStart",{event:n,request:s});try{if(r=await this._handle(s,e),!r||"error"===r.type)throw new t("no-response",{url:s.url})}catch(t){for(const a of e.iterateCallbacks("handlerDidError"))if(r=await a({error:t,event:n,request:s}),r)break;if(!r)throw t}for(const t of e.iterateCallbacks("handlerWillRespond"))r=await t({event:n,request:s,response:r});return r}async _awaitComplete(e,t,s,n){let r,a;try{r=await e}catch(a){}try{await t.runCallbacks("handlerDidRespond",{event:n,request:s,response:r}),await t.doneWaiting()}catch(e){a=e}if(await t.runCallbacks("handlerDidComplete",{event:n,request:s,response:r,error:a}),t.destroy(),a)throw a}}{constructor(e={}){e.cacheName=a(e.cacheName),super(e),this._fallbackToNetwork=!1!==e.fallbackToNetwork,this.plugins.push(m)}async _handle(e,t){const s=await t.cacheMatch(e);return s||(t.event&&"install"===t.event.type?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,s){let n;if(!this._fallbackToNetwork)throw new t("missing-precache-entry",{cacheName:this.cacheName,url:e.url});return n=await s.fetch(e),n}async _handleInstall(e,s){const n=await s.fetchAndCachePut(e);let r=Boolean(n);if(n&&n.status>=400&&!this._usesCustomCacheableResponseLogic()&&(r=!1),!r)throw new t("bad-precaching-response",{url:e.url,status:n.status});return n}_usesCustomCacheableResponseLogic(){return this.plugins.some((e=>e.cacheWillUpdate&&e!==m))}}class R{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new _({cacheName:a(e),plugins:[...t,new l({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){const s=[];for(const n of e){"string"==typeof n?s.push(n):n&&void 0===n.revision&&s.push(n.url);const{cacheKey:e,url:r}=c(n),a="string"!=typeof n&&n.revision?"reload":"default";if(this._urlsToCacheKeys.has(r)&&this._urlsToCacheKeys.get(r)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(r),secondEntry:e});if("string"!=typeof n&&n.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==n.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:r});this._cacheKeysToIntegrities.set(e,n.integrity)}if(this._urlsToCacheKeys.set(r,e),this._urlsToCacheModes.set(r,a),s.length>0){const e=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}install(e){return o(e,(async()=>{const t=new h;this.strategy.plugins.push(t);for(const[t,s]of this._urlsToCacheKeys){const n=this._cacheKeysToIntegrities.get(s),r=this._urlsToCacheModes.get(t),a=new Request(t,{integrity:n,cache:r,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:s},request:a,event:e}))}const{updatedURLs:s,notUpdatedURLs:n}=t;return{updatedURLs:s,notUpdatedURLs:n}}))}activate(e){return o(e,(async()=>{const e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),n=[];for(const r of t)s.has(r.url)||(await e.delete(r),n.push(r.url));return{deletedURLs:n}}))}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.strategy.cacheName)).match(s)}}createHandlerBoundToURL(e){const s=this.getCacheKeyForURL(e);if(!s)throw new t("non-precached-url",{url:e});return t=>(t.request=new Request(e),t.params={cacheKey:s,...t.params},this.strategy.handle(t))}}let v;const C=()=>(v||(v=new R),v);s(80);const U=e=>e&&"object"==typeof e?e:{handle:e};class L{constructor(e,t,s="GET"){this.handler=U(t),this.match=e,this.method=s}}class b extends L{constructor(e,t,s){super((({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)}),t,s)}}class q{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",(e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data;0;const s=Promise.all(t.urlsToCache.map((t=>{"string"==typeof t&&(t=[t]);const s=new Request(...t);return this.handleRequest({request:s,event:e})})));e.waitUntil(s),e.ports&&e.ports[0]&&s.then((()=>e.ports[0].postMessage(!0)))}}))}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return void 0;const n=s.origin===location.origin,{params:r,route:a}=this.findMatchingRoute({event:t,request:e,sameOrigin:n,url:s});let i=a&&a.handler;const o=e.method;if(!i&&this._defaultHandlerMap.has(o)&&(i=this._defaultHandlerMap.get(o)),!i)return void 0;let c;try{c=i.handle({url:s,request:e,event:t,params:r})}catch(e){c=Promise.reject(e)}return c instanceof Promise&&this._catchHandler&&(c=c.catch((n=>this._catchHandler.handle({url:s,request:e,event:t})))),c}findMatchingRoute({url:e,sameOrigin:t,request:s,event:n}){const r=this._routes.get(s.method)||[];for(const a of r){let r;const i=a.match({url:e,sameOrigin:t,request:s,event:n});if(i)return r=i,(Array.isArray(i)&&0===i.length||i.constructor===Object&&0===Object.keys(i).length||"boolean"==typeof i)&&(r=void 0),{route:a,params:r}}return{}}setDefaultHandler(e,t="GET"){this._defaultHandlerMap.set(t,U(e))}setCatchHandler(e){this._catchHandler=U(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new t("unregister-route-but-not-found-with-method",{method:e.method});const s=this._routes.get(e.method).indexOf(e);if(!(s>-1))throw new t("unregister-route-route-not-registered");this._routes.get(e.method).splice(s,1)}}let k;class T extends L{constructor(e,t){super((({request:s})=>{const n=e.getURLsToCacheKeys();for(const e of function*(e,{ignoreURLParametersMatching:t=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:n=!0,urlManipulation:r}={}){const a=new URL(e,location.href);a.hash="",yield a.href;const i=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some((e=>e.test(s)))&&e.searchParams.delete(s);return e}(a,t);if(yield i.href,s&&i.pathname.endsWith("/")){const e=new URL(i.href);e.pathname+=s,yield e.href}if(n){const e=new URL(i.href);e.pathname+=".html",yield e.href}if(r){const e=r({url:a});for(const t of e)yield t.href}}(s.url,t)){const t=n.get(e);if(t)return{cacheKey:t}}}),e.strategy)}}function K(e){const s=C();!function(e,s,n){let r;if("string"==typeof e){const t=new URL(e,location.href);r=new L((({url:e})=>e.href===t.href),s,n)}else if(e instanceof RegExp)r=new b(e,s,n);else if("function"==typeof e)r=new L(e,s,n);else{if(!(e instanceof L))throw new t("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});r=e}(k||(k=new q,k.addFetchListener(),k.addCacheListener()),k).registerRoute(r)}(new T(s,e))}var x;(function(e){C().precache(e)})([{'revision':'ecdb4be5e8067c0066c56eed5ae3f283','url':'css/app.css'},{'revision':'f30e029218958bd6aad3cd424f865f94','url':'fonts/Framework7Icons-Regular.eot'},{'revision':'1b6b2c3ed476f4d4b7555af75e387d73','url':'fonts/Framework7Icons-Regular.ttf'},{'revision':'8f897db6f41a6ae1661072172143a21b','url':'fonts/Framework7Icons-Regular.woff'},{'revision':'9393ad14858229d680936a6206688704','url':'fonts/Framework7Icons-Regular.woff2'},{'revision':'e79bfd88537def476913f3ed52f4f4b3','url':'fonts/MaterialIcons-Regular.eot'},{'revision':'a37b0c01c0baf1888ca812cc0508f6e2','url':'fonts/MaterialIcons-Regular.ttf'},{'revision':'012cf6a10129e2275d79d6adac7f3b02','url':'fonts/MaterialIcons-Regular.woff'},{'revision':'570eb83859dc23dd0eec423a49e147fe','url':'fonts/MaterialIcons-Regular.woff2'},{'revision':'66d6e7294e6fb60b7b6ddb0eda6a75f9','url':'js/app.js'},{'revision':'23200fb75778ef603949cb91dcbab00d','url':'js/app.js.LICENSE.txt'},{'revision':'4729efe015581c7c461c8d74c21ea039','url':'manifest.json'},{'revision':'9fca6476ee7ca855ffffd59b44c38071','url':'static/icons/favicon.ico'},{'revision':'c91f47a00782196038ce83252a569ce9','url':'static/icons/logo.png'}]||[]),K(x)}()}();
//# sourceMappingURL=service-worker.js.map