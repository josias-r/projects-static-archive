$(function(){
	$('.tile').each(function() {
		target = $(this).find('.desc h1').text();
		$(this).find('.img').append('<a class="img-btn" href="'+target+'.html"></a><a class="force-click" href="'+target+'.html"></a>')
		$(this).append('<a class="btn" href="'+target+'.html">View Project</a>')



		$(this).attr('id', target);
		$('.sub.pj-list').append('<li><a href="#'+target+'">'+target+'</a></li>')
	});
});
