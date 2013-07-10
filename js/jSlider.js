/*  Plugin Name:        A Simple jQuery Slider, jSlider
    Plugin Version:     1.0.1
    Plugin URL:         
    Author:             Bappi D Great
    Author E-mail:      shimul.ashok@gmail.com
    Author Web:         http://bappi.d.great.com*/

;(function($) {
    
        var defaults = {
            width:          618,
            startTime:      500,
            intervalTime:   5000,
            images:         []
        }
	
	$.fn.jSlider = function(options) {
            
                var config = $.extend({}, defaults, options);
		
		var number_of_images = config.images[0].length;
		var imageIndex = 1;
                var imgWidth;
                
                function init(obj) {
                    var galleryList = $('<ul class="jSliderGallery"/>').appendTo($('<div class="jSliderWrap"/>').appendTo(obj));
                    var i;
                    for(i = 0; i < number_of_images; i++) {
                        $('<li/>', {
                            html: "<img id='jImg-"+i+"' src='"+config.images[0][i]+"'/><div class='jScaption'><h2>"+config.images[1][i]+"</h2><p>"+config.images[2][i]+"</p></div>"
                        }).appendTo(galleryList);
                    }
                    obj
                        .addClass('jSlider')
                        .css({
                            width: config.width
                        })
                }

		
		function activeBullet(pos, obj)
		{
			obj.find('.jSactive').removeClass('jSactive');
			obj.find('.jSliderNav li').eq(pos).find('a').addClass('jSactive');
		}
		
		function slide(obj)
		{
			if(imageIndex >= number_of_images)
			{
				obj.find('.jSliderWrap').animate({
					marginLeft: '0'
				});
				imageIndex = 1;
			}
			else {
				obj.find('.jSliderWrap').animate({
					marginLeft: '-='+config.width+'px'
				});
				imageIndex++;
			}
			activeBullet(imageIndex-1, obj);
		}
		
		function startSlide(obj) {
			slideTimeout = setTimeout(function () {
			    slideInterval = setInterval(function () {
			        slide(obj);
			    }, config.intervalTime);
			}, config.startTime);
		}
		
		function bulletPoint(obj)
		{
			var list = $('<ul class="jSliderNav" />').appendTo(obj.find('.jSliderWrap'));
			var i;
			for(i = 1; i <= number_of_images; i++)
			{
				$('<a />', {
					text: i,
					href: '#'
				}).appendTo($('<li/>').appendTo(list));
			}
			list.find('li:first-child a').addClass('jSactive');
		}
		
		function bulletNavigate(obj)
		{
			obj.find('ul.jSliderNav a').on('click', function(e) {
				e.preventDefault();
				var index = $(this).parent().index();
				obj.find('.jSliderWrap').animate({
					marginLeft: -index * config.width + 'px'
				});
				imageIndex = index + 1;
				activeBullet(index, obj);
				clearIntervalSlider();
				startSlide(obj);
			});
		}
		
		function clearIntervalSlider()
		{
			clearInterval(slideInterval);
			clearTimeout(slideTimeout);
		}
		
		return this.each(function() {
                        init($(this));
			bulletPoint($(this));
                        startSlide($(this));
			bulletNavigate($(this));
		});
	}
	
}(jQuery));