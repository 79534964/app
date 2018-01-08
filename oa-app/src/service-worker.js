/**
 * Check out https://googlechrome.github.io/sw-toolbox/ for
 * more info on how to use sw-toolbox to custom configure your service worker.
 */


'use strict';
importScripts('./build/sw-toolbox.js');

self.toolbox.options.cache = {
  name: 'ionic-cache'
};

// 预缓
self.toolbox.precache(
  [
    './build/main.js',
    './build/main.css',
    './build/polyfills.js',
    './build/polyfills.js',
    'index.html',
    'manifest.json'
  ]
);

// 动态缓存任何其他本地资源
self.toolbox.router.any('/*', self.toolbox.cacheFirst);

// 对于任何其他请求去网络，缓存，
// 然后，如果用户脱机，则只使用缓存的资源
self.toolbox.router.default = self.toolbox.networkFirst;
