const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function resolve(dir) {
    return path.join(__dirname, dir);
}

function getEntry(rootSrc, paths) {
    const map = {};
    glob.sync(rootSrc + paths).forEach((file) => {
        let key = path.relative(rootSrc, file).replace('.vue', '');
        map[key] = file;
    });
    return map;
}



module.exports = {
    entry(){
        const appEntry = { app: resolve('./src/app.vue') };
        const pagesEntry = getEntry(resolve('./src'), '/pages/**/main.vue');
        const component = getEntry(resolve('./src'), '/components/**/main.vue');
//        分包操作，如果需要分包的话
// const pagesEntryB = getEntry(resolve('./src'), '/packageb/pages/**/main.js');
// const pagesEntryC = getEntry(resolve('./src'), '/packagec/pages/**/main.js');
        return Object.assign({}, appEntry, pagesEntry, component)

},
    mode: 'development',
    devtool:'source-map',
    // mode: 'production',
    target: 'node',
    // output: { path: path.resolve(__dirname, './miniprogram') },
    output: {
        publicPath: 'http://localhost:3333/dist/',
    },
    resolve: {
        extensions: ['.js'],
    },
    optimization: {
        splitChunks: {
            // include all types of chunks
            chunks: 'all',
        },
    },
    resolveLoader: {
        alias: {
            // 'demo-loader': require.resolve('./loader/demo-loader.cjs'),
            'demo-loader': '@yiper.fan/wx-mini-loader/demo-loader.cjs',
            'wxss-loader': '@yiper.fan/wx-mini-loader/wxss-loader.cjs',
            'wxml-loader': '@yiper.fan/wx-mini-loader/wxml-loader.cjs',
        },
    },
    module: {
        rules: [

            {
                resourceQuery: /asset-resource/,
                type: 'asset/resource',
                generator: {
                    filename: 'img/[hash][ext][query]',
                },
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                type: 'asset/resource',
                generator: {
                    filename: 'img/[name].[hash:5][ext]',
                }
            },

            {
                test: /\.vue$/,
                oneOf: [
                    {
                        resourceQuery: /css/, // foo.css?inline
                        use: [
                            MiniCssExtractPlugin.loader,
                            'css-loader',
                            {
                                loader: 'px2rpx-loader',
                                options: {
                                    baseDpr: 1,
                                    rpxUnit: 0.5,
                                },
                            },
                            'less-loader',
                            {
                                loader: 'wxss-loader',
                                options: {
                                    root: 'src',
                                },
                            },
                        ],
                    },
                    {
                        resourceQuery: /template/, // foo.css?external
                        use: [
                            {
                                loader: 'wxml-loader',
                                options: {
                                    root: 'src',
                                },
                            }

                        ],
                    },
                ],
                // use: ['demo-loader'],
                use: [
                    {
                        loader: 'demo-loader',
                        options: {
                            root: 'src',
                        },
                    },
                ],
            },


        ],
    },
    node: false,
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].wxss',
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: '**/*.json',
                    to: '',
                    context: 'src/',
                },
                {
                    from: 'static/**',
                    to: '',
                    context: 'src/',
                },
            ],
        }),
    ],
};
