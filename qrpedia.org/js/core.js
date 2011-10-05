onload = function (e){	setInterval('updateQR()', 50);	document.body.onkeypress = eventCloseAbout;	$('about').onclick = eventCloseAbout;	$('overlay').onclick = eventCloseAbout;	$('about_link').onclick = eventShowAbout;}function eventCloseAbout(e){	closeAbout();}function eventShowAbout(e){	showAbout();		e.preventDefault();}var previousURL = '';function updateQR(){	try	{		var original_URL = $('url').value;				if (original_URL != previousURL && original_URL.contains('wikipedia.org/wiki/'))		{			previousURL = original_URL;					var new_URL = original_URL.replace('wikipedia.org/wiki/','qrwp.org/');			var new_URL = new_URL.replace('https://','http://');					var qr_URL = 'http://chart.apis.google.com/chart?cht=qr&chs=400x400&chld=l&chl=' + encodeURIComponent(new_URL);						var image_HTML = '<a href="./?download_qr='+encodeURIComponent(new_URL)+'"><img src="'+qr_URL+'" width="400" height="400"></a>';						var validate_URL = './?url=' + encodeURIComponent(original_URL);						new Ajax.Request(validate_URL,			{				method:'get',				onSuccess: function(transport){					var response = transport.responseText || "";					//alert("Success! \n\n" + response);					try					{						if (response == '')						{							return;						}												var bundle = eval("(" + response + ")");												if (bundle['status'] != 'okay')						{							$('title').innerHTML = bundle['message'];														$('qr_image').innerHTML = '';						}						else						{							var article_title = bundle['title'];														/* $('title').innerHTML = article_title + ' QR code:'; */														$('qr_image').innerHTML = image_HTML;						}					}					catch (e)					{						/*alert('JS problem: '+e);*/						alert("Page problem:\n\n"+e+"\n\nContact qrpedia@shkspr.mobi for support");					}				},				onFailure: function()				{					/*alert("Can't talk to server\n\nTry restarting your browser");*/										alert("Problem talking to server\n\nContact qrpedia@shkspr.mobi for support");				}			});		}	}	catch (e)	{		alert("Page problem:\n\n"+e+"\n\nContact qrpedia@shkspr.mobi for support");	}}function showAbout(show){	show = (show == undefined) ? true : false;		$('overlay').style.display = (!show) ? 'none' : 'block';	$('about').style.display = (!show) ? 'none' : 'block';}function closeAbout(){	showAbout(false);}String.prototype.contains = function(it) { return this.indexOf(it) != -1; };function $(id){	return document.getElementById(id);}