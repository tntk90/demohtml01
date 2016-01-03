// JavaScript Document
	$.fn.slide = function(timerAuto) {
		var btnDisabled = false;
		var autoSlide;
		//set start at first position
		var current_index = 0;
		// time to next click action
		var timeAction = 900;
		// Hide all .slide_child
		$(this).children('.slide_content').children('.slide_child').hide();
		// Show only first .slide_child
		$(this).children('.slide_content').children('.slide_child:first').show();
		// Count .slide_child
		var countChild = $(this).children('.slide_content').children('.slide_child').length;
		// Get width,height
		var widthChild = $(this).children('.slide_content').children('.slide_active').find('img').width()
		var heightChild = $(this).children('.slide_content').children('.slide_active').find('img').height();
		// set width,height for current slide and slide child
		$(this).css({'width':widthChild,'height':heightChild});
		$(this).children('.slide_content').children('.slide_child').css({'width':widthChild,'height':heightChild});
		
		// Create option
		for(var i = 0; i < countChild ; i++){
			$(this).children('.slide_option').children().append('<li><i class="fa fa-circle"></i></li>');
		}
		// Set current option active
		$(this).children('.slide_option').children().children('li:first').addClass('option_active');
		
		// function move right
		function moveRight(current_index, current){
			current.find('.slide_child').hide("slide",{direction: "left"},"slow");
			current.find('.slide_child').eq(current_index).show("slide",{direction: "right"},"slow");
		}
		
		// function move left
		function moveLeft(current_index, current){
			current.find('.slide_child').hide("slide",{direction: "right"},"slow");
			current.find('.slide_child').eq(current_index).show("slide",{direction: "left"},"slow");
		}
		
		// click option thumnail
		$(this).children('.slide_option').children().children('li').click(function(){
			if (!btnDisabled) { 
				setTimeout(function () {
					btnDisabled = false;
				},timeAction);
				clearInterval(autoSlide);
				var curr = $(this).parent().parent().parent();
				if($(this).hasClass('option_active')){
					return false;
				}
				var old_index = curr.children().children().find('li.option_active').index();
				var new_index = $(this).index();
				current_index = new_index;
				curr.find('li.option_active').removeClass('option_active');
				$(this).addClass('option_active');
				if(new_index>old_index){
						moveRight(new_index,curr);
				}
				else if(new_index<old_index){
						moveLeft(new_index,curr);
				}
				startInterval(curr,timerAuto);
			}
			btnDisabled = true;
		});
		
		// click next button
		$(this).children('.next').click(function () {
			var curr = $(this).parent();
			if (!btnDisabled) { 
				setTimeout(function () {
				 	btnDisabled = false;
				},timeAction);
				clearInterval(autoSlide);
				current_index++;
				if(current_index==countChild)
					current_index=0;
				moveRight(current_index,curr);
				curr.children('.slide_option').children().children().removeClass('option_active');
				curr.children('.slide_option').children().children().eq(current_index).addClass('option_active');
				startInterval(curr,timerAuto);
			}
			btnDisabled = true;
		});
		
		// click prev button
		$(this).children('.prev').click(function(){
			var curr = $(this).parent();
			if (!btnDisabled) { 
				setTimeout(function () {
					btnDisabled = false;
				},timeAction);
				clearInterval(autoSlide);
				current_index--;
				if(current_index<0)
					current_index = countChild-1;
				moveLeft(current_index,curr);
				curr.children('.slide_option').children().children().removeClass('option_active');
				curr.children('.slide_option').children().children().eq(current_index).addClass('option_active');
				startInterval(curr,timerAuto);
			}
			btnDisabled = true;
		});	
		
		// auto play slide
		function startInterval(current,timerAuto){
			autoSlide = setInterval(function () {
				current_index++;
				if(current_index>=current.children('.slide_content').children('.slide_child').length)
					current_index=0;
				moveRight(current_index,current);
				current.children('.slide_option').children().children().removeClass('option_active');
				current.children('.slide_option').children().children().eq(current_index).addClass('option_active');
			}, timerAuto);
		}
		startInterval($(this),timerAuto);	
	};	