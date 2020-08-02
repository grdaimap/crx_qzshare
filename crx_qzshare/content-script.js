(function () {
	console.log('这是 qzshare 的content-script！');
	var url = window.location.href;
	var pic = document.getElementsByTagName("img")[0].getAttribute("src");
	var title = document.title;
	var dic = [
		['www.bilibili.com', '[itemprop="image"]', "content"],
		["mp.weixin.qq.com", 'meta[property="og:image"]', "content", 'meta[property="og:title"]', "content"],
		["zhihu.com", 1],
	];
	dic.forEach(element => {
		if (url.match(element[0])) {
			if (element.length > 3) {
				title = document.querySelector(element[3]).getAttribute(element[4]);
				pic = document.querySelector(element[1]).getAttribute(element[2]);
			}
			else if (element.length == 2) {
				pic = document.getElementsByTagName("img")[element[1]].getAttribute("src");
				try {
					document.getElementsByClassName("Button AppHeader-messages css-79elbk Button--plain")[0].parentNode.removeChild(document.getElementsByClassName("Button AppHeader-messages css-79elbk Button--plain")[0]);
					document.getElementById("Popover29-toggle").parentNode.removeChild(document.getElementById("Popover29-toggle"));
				} catch (error) {
					console.log('非知乎回答页');
				}
				
			}
			else
				pic = document.querySelector(element[1]).getAttribute(element[2]);
		}
		url = url.replace(/#\//, '');
		url = url.replace(/=/g, '%3d');
		url = url.replace(/&/g, '%26');
		if (!pic.match("http"))
			pic = "http://" + pic;
	});
	var e = document.createElement("a");
	e.id = "qqzoneshareurl";
	e.style.display = "none";
	e.innerHTML = "分享到QQ空间";
	e.href = "https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + url + "&title=" + title + "&pics=" + pic;
	document.body.append(e);
	console.log(document.getElementById("qqzoneshareurl").getAttribute("href"));
})();