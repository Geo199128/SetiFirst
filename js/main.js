//Init carousels
var InitCarousels = function () {
    var heroCarousel = $('.hero-carousel'),
    heroList = heroCarousel.find('.hero-list'),
    newsSectionContainer = $('.latest-news .container');
    latestNewsCarousel = $('.latest-news-carousel');
    if (heroList.length) {
        heroList.slick({
            infinite: true,
            autoplay:true,
            autoplaySpeed: 4000,
            speed: 700,
            arrows: true,
            prevArrow:heroCarousel.find('.hero-prev'),
            nextArrow:heroCarousel.find('.hero-next'),
            dots: true,
            cssEase: 'ease-out'
        });
    }

    if (latestNewsCarousel.length) {
        latestNewsCarousel.slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: true,
            prevArrow:newsSectionContainer.find('.hero-prev'),
            nextArrow:newsSectionContainer.find('.hero-next'),
            infinite:false
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