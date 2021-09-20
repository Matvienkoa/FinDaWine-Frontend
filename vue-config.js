module.exports = {
    pwa: {
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            exclude: ['_redirects']
        }
    }
}