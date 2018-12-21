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
        newsSectionContainer = $('.latest-news .container');
    latestNewsCarousel = $('.latest-news-carousel');
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
            prevArrow: newsSectionContainer.find('.hero-prev'),
            nextArrow: newsSectionContainer.find('.hero-next'),
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
        if (target.closest('#' + element.attr('id')).length) {
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
            if (target.closest('#' + element.attr('id')).length) {
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
        if (target.closest('#' + element.attr('id')).length) {
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

$(document).ready(function () {
    InitCarousels();
    InitParallax();

    if ($('#home-video').length) {
        InitHomeVideo();
    }
});