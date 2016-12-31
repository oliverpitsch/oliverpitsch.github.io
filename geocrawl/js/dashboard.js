var filter = 'BizKubator';
var int = false;

$(function(){
	//: start up tabs
	$('#tabarea .tab').click(function(){
		$('.tab').removeClass('active');
		$(this).addClass('active');
		var name = $(this).attr('data-option-name');
		$('.container').removeClass('active');
		$('.container').each(function(key, obj){
			if ($(obj).attr('data-option-name') == name && !$(obj).hasClass('disabled')) {
				$(obj).addClass('active');
			}
		});
	});
	
	//: company tabs
	$('#company-navi .ctab').click(function(){
		if ($(this).attr('data-option-name') == 'biz') filter = 'BizKubator';
		else filter = 'BayernDortmundSpiel';
		
		clearInterval(int);
		$('#sw1 .stream-cell').remove();
		$('#sw1 .loading').show();
		refreshLiveStream();
		
		$('.ctab').removeClass('active');
		$(this).addClass('active');
		var name = $(this).attr('data-option-name');
		$('.company').removeClass('active');
		$('.company').each(function(key, obj){
			if ($(obj).attr('data-option-name') == name && !$(obj).hasClass('disabled')) {
				$(obj).addClass('active');
			}
		});
	});
	
	//: megaphone click
	$('#cell-navigation').mouseenter(function(){
		$('#overlay').show('fast');
	});
	$('#cell-navigation').mouseleave(function(){
		$('#overlay').hide('fast');
	});
	
	//: dashboard load live stream 1
	refreshLiveStream();
});

function refreshLiveStream()
{
	$.getJSON('http://localhost/index.php', function(data, status, xhr){
		var html = "";
		var html2 = "";
		var shtml = "";
		for (var i=0; i<data.length; i++)
		{
			var o = data[i];
			if (o.nachricht == '') continue;
			if (o.nachricht == null) continue;
			
			//: platform
			if (o.platform == 'Flickr') source='flickr';
			if (o.platform == 'Facebook') source='facebook';
			if (o.platform == 'Twitter') source='twitter';
			if (o.platform == 'Qype') source='qype';
			
			if (o.profil_url != '') img = o.profil_url;
			else img = 'assets/dummyAvatar.png';
			text = o.nachricht;
			
			meta = o.eingetragen_str + ' - at ' + o.OrtName;
			shtml = '<div class="stream-cell">' +
					'<div class="source ' + source + '"></div>' +
					'<div class="image"><img src="' + img + '" width="48" height="48" /></div>' +
					'<div class="text">' + text + '<span class="meta">' + meta + '</span></div></div>';
			if (filter == o.OrtName)
				html += shtml;
			
			if (source == 'twitter' && o.OrtName == 'Marketing Case' && o.username != 'GeoCrawl') 
				html2+=shtml;
		}
		$('#sw1 .loading').hide();
		$('#sw2 .loading').hide();
		$('#sw1 .stream-cell').remove();
		$('#sw2 .stream-cell').remove();
		$('#sw1').append(html);
		$('#sw2').append(html2);
	});
	
	int = setTimeout("refreshLiveStream()", 3000);
}