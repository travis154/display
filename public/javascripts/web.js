$(function(){
	$.getJSON('http://iulogy.com:3019/pics/%7B%22limit%22%3A%22500%22%7D', function(res){
		res.forEach(function(tweet){
			tweet.imgs.forEach(function(img){
				var d = [
					"<div style='display:inline-block;position:relative'>",
					"<h4 style='position:absolute;top:0;background:rgba(255,255,255,.6);padding:3px;'>"+tweet.text+" - <span class='rt' data-id='"+tweet.tweet_id+"'>rt</span><h4>",
					'<img src="'+img+'" tite="" />',
					"</div>"
				].join("");
				$("#container").append(d);
			});
		});
		//$("#container").stalactite();	
	});
	$("body").on("click", ".rt", function(){
		var id = $(this).data().id;
		$.ajax({
			url:"http://iulogy.com:3003/retweet/" + id,
			//crossDomain:true
			dataType: 'jsonp'
		});
	});
});

var socket = io.connect('http://localhost:3000');
	socket.on('news', function (data) {
	console.log(data);
	socket.emit('my other event', { my: 'data' });
});
