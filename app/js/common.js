$(function() {

	//init Animate On Scroll Library
	AOS.init();

	$(".mob-menu-btn").click(function(){
		$(this).toggleClass('menu-open');
		$('html').toggleClass('body-menu-open');
	});

	// Custom JS
	$('.big-slider').slick({
		infinite: true,
		dots: false,
		arrows: true
	});

	$('.vertical-slider').slick({
		infinite: true,
		dots: true,
		arrows: false,
		//fade: true,
		vertical: true,
		responsive: [{
			breakpoint: 768,
			  settings: {
			  	vertical: false
			 	}
		}],
		customPaging: function(slider, i) {
      // this example would render "tabs" with titles
      return '';
    }
	});

	$('.comments-slider').slick({
		infinite: true,
		dots: true,
		arrows: false,
		//fade: true,
		//vertical: true,
		customPaging: function(slider, i) {
      // this example would render "tabs" with titles
      return '';
    },
	});
	$('.contacts-slider').slick({
		infinite: true,
		dots: true,
		arrows: false,
		fade: true,
		//vertical: true,
		customPaging: function(slider, i) {
      // this example would render "tabs" with titles
      return '';
    },
	});

	$('.popup-page-slider').slick({
		infinite: true,
		dots: true,
		arrows: false,
		fade: true,
		customPaging: function(slider, i) {
      // this example would render "tabs" with titles
      return '';
    },
	});

	if($('.transparent-header').length){
		if($('.content').scrollTop() > 100)
			$('#main_header').removeClass('transparent-header');
		$('.content').scroll(function() {
			var offset = $('.content').scrollTop();
			//window
		  if(offset > 100) {
		    $('#main_header').removeClass('transparent-header');
		  } else {
		    $('#main_header').addClass('transparent-header');
		  }
		});
	}
	//if services-page
	if($('.services-page').length){
		var breakpoints = $('.bg-screen');
		$(document).scroll(function() {
			var index;
			for(var i = 0; i < breakpoints.length; i++){
				
				if( ($(document).scrollTop() + (window.screen.height / 2)) > ($(breakpoints[i]).offset()).top ){
					index = i;
				}
				else{
					break;
				}
			}
			
			$('.services-nav .item').removeClass('active');
			$('.services-nav .item:eq(' + index + ')').addClass('active');
		});
	}

	//popup buttons 
	$('#three').click(function(e){
		e.preventDefault();
	  var buttonId = $(this).attr('id');
	  $('#modal-container').removeAttr('class').addClass(buttonId);
	  $('html').addClass('modal-active');
	  $('#main_header').addClass('header-out');
	});

	$('.close-three').click(function(){
	  $('#modal-container').addClass('out');
	  $('html').removeClass('modal-active');
	  $('#main_header').removeClass('header-out');
	});

	//anchor links scroll animation
	$('.anchor-link').click(function(e){
		e.preventDefault();
		var id = $(this).attr('href');
		$('.content').animate({
			scrollTop: $(id).offset().top - 50
		}, 500);
	});
	//add classes to modal container
	//$('#modal-container').addClass('three out');

	$('.gallery-nav li').click(function(){
		var category = $(this).data('category');
		$('.gallery-nav li').removeClass('active');
		$(this).addClass('active');

		//display gallery items of selected category
		$('.gallery-item').addClass('dnone');
		$('.gallery-item[data-categories~="' + category +'"]').removeClass('dnone');

	});

	//init gallery slider
	if($('.gallery-page').length){

		$('.gallery-item').click(function(){
			$('html').addClass('gallery-popup-open');
			//ajax slider loading
			$('.gallery-popup-wrap').addClass('popup-open');
			var album = $(this).data('album');
			$.ajax({
			  type: 'get',
			  url: '/api/get-gallery-set',
			  dataType: 'json',
			  data: {id: album},
			  success: function(data) {
			    console.log(data);
			    data.forEach(function(item){
			    	var img = $("<img>").attr('src', item);
			    	$('.gallery-slider').append(img);
			    	img.wrap('<div class="slide"> </div>');
			    	img.wrap('<div class="img-wrap"></div>');
			    });
			    $('.gallery-slider').slick({
			    	infinite: true,
			    	dots: false,
			    	arrows: true,
			    });
			  }
			});
		});
		$('.close-gallery').click(function(){
			$('html').removeClass('gallery-popup-open');
			$('.gallery-popup-wrap').removeClass('popup-open');

			$('.gallery-slider').slick('unslick');
    	$('.gallery-slider .slide').remove(); 
		})
	}

	//gallery via photoswipe


});

$(window).on('load', function() {
  AOS.refresh();
});
