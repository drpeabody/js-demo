
const 
	https = require("https"),
	clog = console.log;


getPageText = (options) => {
	if(!options.port) options.port = 443;
	if(!options.callback) options.callback = clog;
	
	var content = "";   

	var req = https.get(options, (res) => {
		clog("Connected:", res.statusCode);

	    res.setEncoding("utf8");
	    res.on("data", (chunk)  => {
	        content += chunk;
	    });

	    res.on("end", () => {
	    	if(res.statusCode === 200)
	    		options.callback(filterHTML(content))
	    	else clog(content);
	    });

	});
}

count = (text) => {
	if(!text) text = '';
	var l = text.toLowerCase().split(" ");
	
	for(var i = 0; i < l.length; i++) l[i] = l[i].replace(/[^a-z]/g, '');

	l = l.filter(s => s !== '');

	var res = {}

	for(var h of l){
		if(!res[h]) res[h] = 0;
		res[h]++;
	}

	// clog(Object.keys(res).length);
	clog(res);
	// return res;
}

filterHTML = (htmlSource) => {
	var o = htmlSource.replace(/<script>[\s\S]*?script>/g , ' ')
		.replace(/<style[\s\S]*?style>/g , ' ')
		.replace(/<[\s\S]*?>/g , ' ')
		.replace(/&[\S]*;/g , ' ')
		.replace(/\s+/g, ' ');
	return o;
}

// getPageText({
//     host: "www.google.com",
//     path: "/",
//     callback: count
// });

//https://www.google.com/search?client=ubuntu&channel=fs&q=node+http+request+returns+empty+response+from+en.wikipedia.org&ie=utf-8&oe=utf-8
// getPageText({
//     host: "www.google.com",
//     path: "/search?client=ubuntu&channel=fs&q=node+http+request+returns+empty+response+from+en.wikipedia.org&ie=utf-8&oe=utf-8",
//     'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36',
//     callback: count
// });
// getPageText({
//     host: "stackoverflow.com",
//     path: "/questions/6968448/where-is-body-in-a-nodejs-http-get-response",
//     callback: count
// });

getPageText({
    host: "en.wikipedia.org",
    path: "/wiki/Stephen_Hawking",
    callback: clog
});
