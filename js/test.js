(function ($) {
    window.HomeBannerSliderDistance;
    window.HomeBannerSlider = function (widgetContext) {
        var widgetContext = widgetContext || '.vgsp-wm-hi-banner',
            animSpeed = 600,
            animrunning = false,
            thumbsWidth = 0,
            slideElem = $('.vgsp-wm-hi-banner-rollup', widgetContext),
            slideIndex = 1,
            slideInterval, slideTimeout, indicatorString = '';

        function getBrowserWidth() {
            if (window.innerWidth) {
                return window.innerWidth;
            } else if (document.documentElement && document.documentElement.clientWidth != 0) {
                return document.documentElement.clientWidth;
            } else if (document.body) {
                return document.body.clientWidth;
            }
            return null;
        }

        function setSelectedAndEnd() {
            var selObj = $('figure:first', slideElem);
            selObj.addClass('vgsp-wm-hi-banner-selected').siblings().removeClass('vgsp-wm-hi-banner-selected');
            if (typeof selObj.attr('id') != "undefined") {
                $('#' + selObj.attr('id').replace('item', 'indicator')).addClass('vgsp-wm-hi-banner-selected').siblings().removeClass('vgsp-wm-hi-banner-selected');
                slideIndex = selObj.attr('id').replace('vgsp-wm-hi-banner-item', '');
            }
            animrunning = false;
        }

        function slideTo(myIndex) {
            if (!animrunning) {
                var finalLeft = 0,
                    movingLeft;
                animrunning = true;
                myIndex = Number(myIndex);
                if (myIndex > slideIndex) {
                    finalLeft -= (myIndex - slideIndex) * window.HomeBannerSliderDistance;
                    movingLeft = false;
                } else if (myIndex < slideIndex) {
                    finalLeft = 0;
                    myNewObj = $('figure', slideElem).slice($('figure', slideElem).length - (slideIndex - myIndex)).get().reverse();
                    $(myNewObj).each(function () {
                        slideElem.prepend($(this));
                    });
                    slideElem.css({
                        left: -(slideIndex - myIndex) * window.HomeBannerSliderDistance
                    });
                    movingLeft = true;
                }
                slideElem.animate({
                    left: finalLeft
                }, animSpeed, function () {
                    if (!movingLeft) {
                        slideElem.append($('figure', slideElem).slice(0, myIndex - slideIndex)).css({
                            left: 0
                        });
                    }
                    setSelectedAndEnd();
                });
            }
        }

        function slideRight() {
            if (!animrunning) {
                animrunning = true;
                slideElem.animate({
                    'left': -window.HomeBannerSliderDistance
                }, (animSpeed), function () {
                    slideElem.append($('figure:first', slideElem)).css({
                        left: 0
                    });
                    setSelectedAndEnd();
                });
            }
        };
        $('figure', slideElem).each(function (i) {
            var myId = 'vgsp-wm-hi-banner-item' + (i + 1);
            $(this).attr('id', myId);
            if (i == 0) {
                selClass = ' class="vgsp-wm-hi-banner-selected"';
                $(this).addClass('vgsp-wm-hi-banner-selected');
            } else {
                selClass = '';
            }
            thumbsWidth += window.HomeBannerSliderDistance;
            indicatorString += '<li id="' + myId.replace('item', 'indicator') + '"' + selClass + '><a href="#" rel="' + myId + '">' + (i + 1) + '</a></li>';
        });
        slideElem.width(thumbsWidth).after('<ol class="vgsp-wm-hi-banner-indicators">' + indicatorString + '</ol>');
        $('.vgsp-wm-hi-banner-indicators li a', widgetContext).click(function () {
            clearInterval(slideInterval);
            clearTimeout(slideTimeout);
            var newIndex = $(this).attr('rel').replace('vgsp-wm-hi-banner-item', '');
            slideTo(newIndex);
            return false;
        });
        slideInterval = setInterval(function () {
            slideRight();
        }, 8000);
        $('#hibaBannerRollupWrapper').css("visibility", "visible");

        function clearBannerTimeIntervals() {
            clearInterval(slideInterval);
            clearTimeout(slideTimeout);
        }

        function setBannerTimeIntervals() {
            slideTimeout = setTimeout(function () {
                slideInterval = setInterval(function () {
                    slideRight();
                }, 8000);
            }, 1000);
        }
        $('html').click(function () {
            $('.vgsp-wm-hi-dropdown-list').each(function () {
                if ($(this).css('display') == "block") {
                    slideElem.hover(clearBannerTimeIntervals, setBannerTimeIntervals);
                    setBannerTimeIntervals();
                };
            });
        });
        $('.vgsp-wm-hi-dropdown-link.vgsp-wm-hi-menu-item-link').click(function () {
            clearBannerTimeIntervals();
            slideElem.unbind('hover');
        });
        slideElem.hover(clearBannerTimeIntervals, setBannerTimeIntervals);
        $('.vgsp-wm-hi-banner-indicators').hover(clearBannerTimeIntervals, setBannerTimeIntervals);
    }
})(jQuery);