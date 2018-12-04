//Init carousels
var InitCarousels = function () {
    var heroCarousel = $('.hero-carousel');
    if (heroCarousel.length) {
        heroCarousel.owlCarousel({
            items: 1,
            loop: true,
            /*stagePadding: 0,
            singleItem:true,
            margin:0,*/
            //autoplay:true,
            autoplayTimeout: 5000,
            nav: true,
            navText: ['<i class="icon-right-arrow"></i>', '<i class="icon-right-arrow"></i>'],
            dots: true,
            mouseDrag: true,
            touchDrag: true,
        });
    }
}

//Init parallax
var InitParallax = function () {
    //$('.parallaxie').parallaxie();
    $('.parallaxie').miniParallax({
        inset: 1,
        speed: 0.15
    });

}

$(document).ready(function () {
    InitCarousels();
    //InitParallax();
});