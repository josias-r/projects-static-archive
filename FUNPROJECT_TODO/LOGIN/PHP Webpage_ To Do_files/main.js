"use strict";

//FIXES
function fixCopyright() {
	if ($('body').height() < $(window).height()) {
		$('.copyright').addClass('fixed');
	}
	if ($('body').height() + $('.copyright').outerHeight(true) > $(window).height()){
		$('.copyright.fixed').removeClass('fixed');
	}
}
function fixEmptyList() {
	$('.todo > .lists > div:not(.add)').each(function() {
		var length = $(this).find('> ul > li').length;
		if (length > 0) {
			$(this).find('> div.warning').addClass('hidden');
		} else {
			$(this).find('> div.warning.hidden').removeClass('hidden');
		}
		// console.log(length);
	});
}
function fixNoList() {
		var length = $('.todo > .lists > div:not(.add):not(.warning)').length;
		if (length > 0) {
			$('.todo > .lists > div.warning').addClass('hidden');
		} else {
			$('.todo > .lists > div.warning.hidden').removeClass('hidden');
		}
		// console.log('Length: '+length);
}



//Popup
function showAlert(info, action, param) {
	var title = info.children('.title').text();
	var text = info.children('.text').text();
	var input = info.children('.input').text();
	var button = info.children('.button').text();

	var atitle = $('.alert > .box > h3');
	var atext = $('.alert > .box > span');
	var ainput = $('.alert > .box > input');
	var abutton = $('.alert > .box > button');
	if (title) {
		atitle.text(title);
		if (!atitle.hasClass('enabled')) {
			atitle.addClass('enabled');
		};
	} else {
		if (atitle.hasClass('enabled')) {
			atitle.removeClass('enabled');
		};
	}
	if (text) {
		atext.text(text);
		if (!atext.hasClass('enabled')) {
			atext.addClass('enabled');
		};
	} else {
		if (atext.hasClass('enabled')) {
			atext.removeClass('enabled');
		};
	}
	if (input) {
		ainput.attr('placeholder', input);
		if (!ainput.hasClass('enabled')) {
			ainput.addClass('enabled');
		};
	} else {
		if (ainput.hasClass('enabled')) {
			ainput.removeClass('enabled');
		};
	}
	if (button) {
		abutton.find('.value').text(button);
		$(abutton).off('click').on('click', function(e) {
			e.preventDefault();
			action(param);
		});
		if (!abutton.hasClass('enabled')) {
			abutton.addClass('enabled');
		};
	} else {
		if (abutton.hasClass('enabled')) {
			abutton.removeClass('enabled');
		};
	}
	if (!$('.alert').hasClass('active')) {
		$('.alert').addClass('active');
	};
};


function createFolder() {
	var parent = null;
	var url = new URL(window.location.href);
	var parent = url.searchParams.get("folder");
	var input = $('.alert > .box > input');
	var name = $.trim(input.val());
	if (name && name.length <= 20) {
		$.ajax({
			dataType: 'json',
			data: {parent_id: parent, name: name},
			url: 'app/addFolder.php',
			type: 'post',
			success: function(res) {
				location.reload();
				// console.log(res);
			},
			error: function(error) {
				// console.log(error);
			}
		});
	} else {
		input.addClass('warning').delay(500).queue(function(){
			$(this).removeClass("warning").dequeue();
		});
	}
}
function removeFolder(folderid){
	// console.log('Deleting Folder.');
	$.ajax({
		dataType: 'json',
		data: {folder_id: folderid},
		url: 'app/removeFolder.php',
		type: 'post',
		success: function(res) {
			location.reload();
			// console.log(res);
		}
	});
};
function removeList(listid){
	// console.log('Deleting List '+listid);
	$.ajax({
		dataType: 'json',
		data: {list_id: listid},
		url: 'app/removeList.php',
		type: 'post',
		success: function(res) {
			location.reload();
			// console.log(res);
		}
	});
};



$(function () {
	fixCopyright();
	fixEmptyList();
	fixNoList();
	$(window).on('resize', function(){
		fixCopyright();
	});
	$('.preloader').fadeOut();

	//Close Popup
	$('.alert').on('click', function(e) {
		if (e.target !== this) {
			return;
		}
		if ($('.alert').hasClass('active')) {
			$('.alert').removeClass('active');
		}
	});
	// $('.lists .sortable').sortable();

	//Open folder
	$('.folders > div:not(.add), .path > span').click(function(e) {
		var folder_id = $(this).data('id');
		// console.log(folder_id);
		if (folder_id) {
			location.href = '?folder=' + folder_id;
		} else {
			location.href = '/';
		}
	});

	//Create folder
	$('.folders > .add').on('click', function(e) {
		e.preventDefault();
		showAlert($(this).children('.info'), createFolder);
		e.stopPropagation();
	});
	//Remove folder
	$('.folders > div > .trash').on('click', function(e) {
		e.preventDefault();
		var id = $.trim($(this).parent().attr('data-id'));
		showAlert($(this).children('.info'), removeFolder, id);
		e.stopPropagation();
	});
	//Remove List
	$('.lists .tools > .trash').on('click', function(e) {
		e.preventDefault();
		var id = $.trim($(this).parents('.tools').siblings('form').attr('data-id'));
		showAlert($(this).children('.info'), removeList, id);
		e.stopPropagation();
	});





	//New list
	$('.lists .add h2').on('click', function(e) {
		e.preventDefault();
		var folder = null;
		var url = new URL(window.location.href);
		var folder = url.searchParams.get("folder");
		$.ajax({
			dataType: 'json',
			data: {folderid: folder},
			url: 'app/addList.php',
			type: 'post',
			success: function() {
				location.reload();
			},
			error: function(error) {
				// console.log(error);
			}
		});
	});


	//Add Item
  $('.addItem button').on('click', function(e) {
    e.preventDefault();
		var listid = $.trim($(this).parent('form').attr('data-id'));
		var list = $(this).parent('.addItem');
		var content = $.trim($(list).find('input').val());
		if (content && listid) {
			$.ajax({
				dataType: 'json',
				data: {item: content, listid: listid},
				url: 'app/addItem.php',
				type: 'post',
				success: function(res) {
					$(list).find('input').val('');
					$(list).next('ul').prepend('<li><div class="content">'+content+'</div><div class="btns" data-id="'+res.id+'"><span class="del">+</span><span class="mark"></span></div></li>');
					fixCopyright();
					fixEmptyList();
					// console.log('New Item ID: '+res.id);
				}
			});
		} else {
			$(list).find('input').stop().addClass('warning').delay(500).queue(function(){
				$(this).removeClass("warning").dequeue();
			});
		}
  });
	//Remove Item
	$('.todo').on('click', 'span.del', function (e){
		e.preventDefault();
		var id = $.trim($(this).parent('.btns').attr('data-id'));
		var item = $(this).parent('.btns');
		if (id) {
			$.ajax({
				dataType: 'json',
				data: {item_id: id},
				url: 'app/removeItem.php',
				type: 'post',
				success: function(res) {
					item.parent().remove();
					fixCopyright();
					fixEmptyList();
					// console.log(res);
				}
			});
		}
		e.stopPropagation();
	});
	//Mark Item
	$('.todo').on('click', 'li', function (e){
		e.preventDefault();
    var id = $.trim($(this).find('.btns').attr('data-id'));
    var item = $(this);
		if (id) {
			$.ajax({
				dataType: 'json',
				data: {item_id: id},
				url: 'app/mark.php',
				type: 'post',
				success: function(res) {
					if (item.is('.done')) {
						item.removeClass('done');
					} else {
						item.addClass('done');
					}
					// console.log(res);
				}
			});
		}
	});
})
