//Function to include html and svg icons in details facilities files
function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        elmnt.innerHTML = this.responseText;
                        elmnt.innerHTML
                    }
                    if (this.status == 404) {
                        elmnt.innerHTML = "Page not found.";
                    }
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();

            $(document).find('svg').find('*').removeAttr('style');
            /* Exit the function: */
            return;
        }
    }
}

includeHTML();

//Global variables
var player; //home video player

// This
// function creates an < iframe > (and YouTube player)
// after the API code downloads.
var onYouTubeIframeAPIReady = function () {
    player = new YT.Player('home-video', {
        height: '100%',
        width: '100%',
        videoId: 'mfxQy5A_tHs'
    });
}

//Init carousels
var InitCarousels = function () {
    var heroCarousel = $('.hero-carousel'),
        heroList = heroCarousel.find('.hero-list'),
        newsSectionContainer = $('.latest-news .container'),
        latestNewsCarousel = $('.latest-news-carousel'),
        detailsGalleryCarousel = $('.gallery-carousel'),
        detailsGalleryContainer = $('.gallery-container'),
        cruiseItineraryCarousel = $('.cruise-itinerary-carousel'),
        cruiseItineraryContainer = $('.cruise-itinerary-container');
    if (heroList.length) {
        heroList.slick({
            infinite: true,
            autoplay: true,
            autoplaySpeed: 4000,
            speed: 700,
            arrows: true,
            prevArrow: heroCarousel.find('.hero-prev'),
            nextArrow: heroCarousel.find('.hero-next'),
            dots: true,
            cssEase: 'ease-out'
        });
    }

    if (latestNewsCarousel.length) {
        latestNewsCarousel.slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: true,
            prevArrow: newsSectionContainer.find('.news-prev'),
            nextArrow: newsSectionContainer.find('.news-next'),
            infinite: false
        });
    }

    if (detailsGalleryCarousel.length) {
        detailsGalleryCarousel.slick({
            infinite: true,
            autoplay: true,
            autoplaySpeed: 4000,
            speed: 500,
            arrows: true,
            prevArrow: detailsGalleryContainer.find('.gallery-prev'),
            nextArrow: detailsGalleryContainer.find('.gallery-next'),
            fade: true,
            dots: true,
            customPaging : function(slider, i) {
                return '<a href="javascript:void(0);" style="background:#000 url(\''+$(slider.$slides[i]).attr('data-dot-image')+'\') 50% / cover no-repeat"></a>';
            },
            cssEase: 'linear'
        });
    }

    if (cruiseItineraryCarousel.length) {
        cruiseItineraryCarousel.slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: true,
            prevArrow: cruiseItineraryContainer.find('.cruise-itinerary-prev'),
            nextArrow: cruiseItineraryContainer.find('.cruise-itinerary-next'),
            infinite: false
        });
    }
}

//Init parallax
var InitParallax = function () {
    $(".paroller").paroller({
        factor: 0.3,
        factorXs: 0.2
    });
}

//Get mouse coordinates when mouse down
GetMouseDownCoordinates = function (element) {
    var mouseDownX,
        xDiff = 0,
        isMouseDown = false,
        trackLength = element.find('.container').outerWidth() - 70;
    $(document).on('mousedown touchstart', function (e) {
        var target = $(e.target);
        if (target.closest('#' + element.attr('id')).length && !target.hasClass('setifirst-top-btn')) {
            isMouseDown = true;
            mouseDownX = e.pageX;
        }
    }).on('mouseup touchend', function (e) {
        isMouseDown = false;
        if (xDiff < trackLength) {
            element.find('i').animate({
                'margin-left': 0
            }, 500);
        } else {
            var target = $(e.target);
            if (target.closest('#' + element.attr('id')).length && !target.hasClass('setifirst-top-btn')) {
                element.addClass('video-ready').find('.container').fadeOut();
                //Define Youtube parameters
                // This code loads the IFrame Player API code asynchronously.
                var tag = document.createElement('script');

                tag.src = "https://www.youtube.com/iframe_api";
                var firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            }
        }
    }).on('mousemove touchmove', function (e) {
        var target = $(e.target);
        if (target.closest('#' + element.attr('id')).length && !target.hasClass('setifirst-top-btn')) {
            if (e.pageX > mouseDownX && xDiff <= trackLength && isMouseDown) {
                xDiff = e.pageX - mouseDownX;
                element.find('i').css('margin-left', xDiff);
            }
        }
    });
}

//Init home video
var InitHomeVideo = function () {
    $('#home-video-section,#home-video-section *').attr('unselectable', 'on').attr('draggable', false);
    GetMouseDownCoordinates($('#home-video-section'));
}

//Trim text

//Init popup
var InitPopup = function () {
    var popup = $('.popup');
    $('body').addClass('unscrollable');
    popup.fadeIn(300);
    popup.find('.popup-close-btn').off().on('click', function () {
        popup.fadeOut(300);
        setTimeout(function () {
            $('body').removeClass('unscrollable');
        }, 300);
    });
}

//Change map location
var GenerateMap = function (locationLong, locationLat) {
    console.log(locationLat, locationLong)
    if ($('#map').length) {
        var iframe = '<iframe src="https://maps.google.com/maps?q=' + locationLat + ',' + locationLong + '&hl=en&z=12&amp;output=embed" width="100%" height="100%" frameborder="0" style="border:0" allowfullscreen></iframe>';
        $('#map').html(iframe);

    }
}

$(document).ready(function () {
    InitCarousels();
    InitParallax();

    if ($('#home-video').length) {
        InitHomeVideo();
    }

    if ($('.view-map-btn').length) {
        $('.view-map-btn').on('click', function () {
            var long = $(this).data('long');
            var lat = $(this).data('lat');
            GenerateMap(long, lat);
            InitPopup();
        });
    }

    if ($('.setifirst-top-btn').length) {
        $('.setifirst-top-btn').on('click', function (e) {
            $('html,body').animate({
                scrollTop: 0
            }, 'slow');
            return false;
        });
    }
});