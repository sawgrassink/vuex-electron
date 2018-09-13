"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _deepmerge=_interopRequireDefault(require("deepmerge")),_electronStore=_interopRequireDefault(require("electron-store"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}var STORAGE_NAME="vuex",STORAGE_KEY="state",STORAGE_TEST_KEY="test";function createStorage(a){return new _electronStore.default({name:a.storageName||STORAGE_NAME})}function getState(a,b){return a.get(b)}function setState(a,b,c){a.set(b,c)}function loadFilter(a,b,c){if(!a)return null;return a instanceof Array?b(a):"function"==typeof a?a:void new Error("[Vuex Electron] Filter \"".concat(c,"\" should be Array or Function. Please, read the docs."))}function filterInArray(a){return function(b){return a.includes(b.type)}}function checkStorage(a){try{a.set(STORAGE_TEST_KEY,STORAGE_TEST_KEY),a.get(STORAGE_TEST_KEY),a.delete(STORAGE_TEST_KEY)}catch(a){throw new Error("[Vuex Electron] Storage is not valid. Please, read the docs.")}}function loadInitialState(a,b,c){var d=getState(b,c);if(d){var e=(0,_deepmerge.default)(a.state,d);a.replaceState(e)}}function subscribeOnChanges(a,b,c,d,e){a.subscribe(function(a,f){d&&d(a)||e&&!e(a)||setState(b,c,f)})}var _default=function(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:{};return function(b){var c=a.storage||createStorage(a),d=a.storageKey||STORAGE_KEY,e=loadFilter(a.whitelist,filterInArray,"whitelist"),f=loadFilter(a.blacklist,filterInArray,"blacklist");checkStorage(c),loadInitialState(b,c,d),subscribeOnChanges(b,c,d,f,e)}};exports.default=_default,module.exports=exports["default"];