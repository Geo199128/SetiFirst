//Global variables
var player; //home video player

/*//Define Youtube parameters
//This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
//This function creates an <iframe> (and YouTube player)
//after the API code downloads.
var onYouTubeIframeAPIReady = function(){
    player = new YT.Player('home-video', {
        height: '100%',
        width: '100%',
        videoId: 'mfxQy5A_tHs'
    });
}*/

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
GetMouseDownCoordinates = function () {
    var mouseDownX, mouseUpX, xDiff = 0,
        isMouseDown = false,
        trackLength = $('.home-video').find('.container').outerWidth();
    $('.home-video').on('mousedown', function (e) {
        isMouseDown = true;
        mouseDownX = e.pageX;
    });

    $(document).on('mouseup', function (e) {
        isMouseDown = false;
        mouseUpX = e.pageX;
        if (xDiff < trackLength) {
            $(this).find('i').animate({
                'margin-left': 0
            }, 500);
        }
    });

    $('.home-video').on('mousemove mouseover', function (e) {
        xDiff = e.pageX - mouseDownX;
        console.log(isMouseDown);
        if (e.pageX > mouseDownX && xDiff <= trackLength && isMouseDown) {
            $(this).find('i').css('margin-left', xDiff);
        }
    });
}

//Init home video
var InitHomeVideo = function () {
    //onYouTubeIframeAPIReady();
}

$(document).ready(function () {
    InitCarousels();
    InitParallax();

    if ($('#home-video').length) {
        InitHomeVideo();
        GetMouseDownCoordinates();
    }
});