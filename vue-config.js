export const pwa = {
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
        // swSrc is required in InjectManifest mode.
        swSrc: 'src/registerServiceWorker.js',
        // ...other Workbox options...
        exclude: ['_redirects'],
    }
};