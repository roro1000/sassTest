
const config = {};
var path = require('path');


config.destPath = './Content/';
config.testResultsPath = './test-results/';
config.taskConfiguration = {
	build: {},
	copy: {
		sources: [
			{
				src: './Scripts/library/pdfjs-1.8.188-dist/build/pdf.js',
				dest: 'js',
			},
			{
				src: './Scripts/library/pdfjs-1.8.188-dist/build/pdf.worker.js',
				dest: 'js',
			},
		],
	},
	clean: {
		targetPaths: [config.destPath + '/images/', config.destPath + '/js/', config.destPath + '/css/', config.testResultsPath],
		delOptions: {
		},
	},
	lint: {
		sourcePaths: [
			'!./Scripts/server.js',
			'!./Scripts/components.js',
			'!./Scripts/libs/*',
			'./Scripts/*.js',
			'./Scripts/**/*.js',
			'./Scripts/**/*.jsx',
			'./Views/**/js/*.jsx',
		],
	},
	images: {
		sourcePaths: ['./images/**/!(dir.txt)'],
		imageminPlugins: {
			gifsicle: {},
			jpegtran: {},
			optipng: {},
			svgo: {
				plugins: [
					{ removeViewBox: false },
					{ removeUselessStrokeAndFill: false },
					{ convertPathData: { straightCurves: false } },
					{ cleanupIDs: false },
				],
			},
		},
	},
	styles: {
		genericOutputFolder: './css/',
		bundles: [
		],

		sassSettings: {
			outputStyle: process.env.NODE_ENV === 'production' ? 'compressed' : 'compact',
		},

		autoPrefixSettings: {
			browsers: ['last 2 versions', 'iOS >= 7.1', 'Android >= 4', 'ie >= 9'],
			cascade: false,
		},
		sourcemapOptions: {
			type: 'External_EmbeddedFiles',
			sourceRoot: '/',
		},
	},
	scripts: {
		genericOutputFolder: './js/',
		uglifySettings: {
			compress: {
				drop_console: true,
				drop_debugger: true,
			},
		},
		webpackSettings: {
			watch: false,
			devtool: process.env.NODE_ENV === 'production' ? 'none' : 'source-map',
			entry: {},
			output: {
				filename: '[name].js',
			},
			module: {
				loaders: [
					{
						test: /\.(js|jsx)$/,
						exclude: /(node_modules|bower_components|run\/tasks\/test\/wrapper\.js)/,
						loader: 'babel',
					},
					{
						test: /\.s[ac]ss$/i,
						loader: 'sass-loader',
					},
				],
			},
			plugins: [
			],
			resolve: {
                extensions: ['', '.js', '.jsx', '.scss'],
                alias: {
					Requests: path.resolve(__dirname, '../../Shared.Project/Scripts/request-wrapper'),
					SharedComponents: path.resolve(__dirname, '../../Shared.Project/Scripts/components'),
					SharedStyles: path.resolve(__dirname, '../../Shared.Project/Styles/components'),
					Utilities: path.resolve(__dirname, '../../Shared.Project/Scripts/utilities'),
                },
			},
		},
	},
	test: {
		src: ['./Views/**/*.test.jsx', '/Scripts/Components/tests/*.test.jsx'],
	},
	watch: {
		sourcePaths: {
			styles: ['./Styles/**/*.scss', './Views/**/scss/*.scss'],
			scripts: ['./Scripts/*.*', './Scripts/**/*.*', './Views/**/js/*.*'],
		},
	},
};

export default config;
