var carouselModule = (function() {
	//private fields
	var $carousel, $img, interval, defaultMargin, smallItemWidth, liBorderWidth,smallItemWidth
		time = 5000;

		animate = function() {
			var $li = $('.carousel li');

			//calculate new margin left, don't forget li borders 
			var newMarginLeft = defaultMargin - smallItemWidth - liBorderWidth*2; 

			//slide the carousel
			$carousel.animate({marginLeft: newMarginLeft},1000, swapElems);
			
			//make second item big and surrounding first and third small
			$li.eq(1).animate({width: smallItemWidth},1000);
			$li.eq(2).animate({width: bigItemWidth},1000);
			$li.eq(3).animate({width: smallItemWidth},1000);

		},
		swapElems = function() {
			var $firstLi = $carousel.find("li:first"),
				$lastLi = $carousel.find("li:last");
			//move the first item to the end
			$lastLi.after($firstLi);

			//set the carousel to correct default position
			$carousel.css({marginLeft: defaultMargin});
		},

		//slide on click
		clicked_animation = function() {
			//if current animation is running do nothing
			if ($carousel.is(':animated')) {
				return;
			}
			animate();
		},
    	bindUIActions = function() {
    		//set sliding timer
    		interval = setInterval(animate,time);
    		
    		//if user clicks on image
			$img.click(clicked_animation);
			
			//on mouseOver remove auto animation, on mouseOut start again
			$img.hover(
				function() {
					clearInterval(interval)
			    },
				function() {
					interval = setInterval(animate,time)
				}
			);
    	};
    //public methods
	return {
		init: function () {
			//our carousel
			$carousel = $('.carousel');

			//carousel-img
			$img = $('.carousel-img');

			//small img size
			smallItemWidth = $img.width();

			//big img size
			bigItemWidth = $img.eq(1).width();

			//parse li border width
			liBorderWidth = parseInt($carousel.find('li').css('border'));

			//default margin left of carousel
			defaultMargin = parseInt($carousel.css('margin-left'));
			
			// bind click and hover events
			bindUIActions();
		}
	}
}());

$(function() {
	//init and set defaults
	carouselModule.init();
});