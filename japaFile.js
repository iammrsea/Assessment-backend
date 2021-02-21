const getPort = require('get-port');
const { configure } = require('japa');

process.env.NODE_ENV = 'testing';

async function startHttpServer() {
	const Server = await require('./src/app');
	process.env.PORT = String(await getPort());
	await Server.registerMiddleware().startHttpServer();
}

function getTestFiles() {
	let userDefined = process.argv.slice(2)[0];
	if (!userDefined) {
		return 'tests/**/*.spec.js';
	}
	return `${userDefined.replace(/\.ts$|\.js$/, '')}.js`;
}

configure({
	files: getTestFiles(),
	before: [startHttpServer],
	timeout: 40000,
});
