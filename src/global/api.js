import config from '../../config';

let url={
	ctxPath: "/dist", //node服务dist目录
	staticPath: process.env.NODE_ENV !== 'development' ?  config.build.staticPath: config.dev.staticPath
}

export const api={
	'login':url.staticPath+'dataJson/login.json',
	'personal':url.staticPath+'dataJson/personal.json',
	'inquiryData':url.staticPath+'dataJson/inquiryData.json',
	'style':url.staticPath+'dataJson/style.json',
	'style_search':url.staticPath+'dataJson/style_search.json',
	'smallproject':url.staticPath+'dataJson/smallproject.json',
	'smallproject_search':url.staticPath+'dataJson/smallproject_search.json',
	'package':url.staticPath+'dataJson/package.json',
	'package_search':url.staticPath+'dataJson/package_search.json',
	'testData':url.staticPath+'dataJson/testData.json'
}
// export default api;
