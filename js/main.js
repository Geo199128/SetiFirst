//Init carousels
var InitCarousels = function () {
    var heroCarousel = $('.hero-carousel .hero-list');
    var latestNewsCarousel = $('.latest-news-carousel');
    if (heroCarousel.length) {
        heroCarousel.slick({
            infinite: true,
            autoplay:true,
            autoplaySpeed: 4000,
            speed: 1200,
            arrows: true,
            prevArrow:$('.hero-prev'),
            nextArrow:$('.hero-next'),
            dots: true,
            cssEase: 'ease-out'
        });
    }

    if (latestNewsCarousel.length) {
        latestNewsCarousel.slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            dots: true,
            arrows: true
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

$(document).ready(function () {
    InitCarousels();
    InitParallax();
});