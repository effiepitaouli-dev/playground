module.exports = {
    module: {
        generator: {
            asset: {
                // Generator options for asset modules

                // Customize publicPath for asset modules, available since webpack 5.28.0
                publicPath: 'https://localhost:8000/assets/',

                // Emit the asset in the specified folder relative to 'output.path', available since webpack 5.67.0
                outputPath: 'assets/',
            },
            'asset/inline': {
                // Generator options for asset/inline modules
            },
            javascript: {
                // No generator options are supported for this module type yet
            },
            'javascript/auto': {
                // ditto
            },
            'javascript/dynamic': {
                // ditto
            },
            'javascript/esm': {
                // ditto
            },
            // others…
        },
    }
};