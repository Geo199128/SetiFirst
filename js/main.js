//Init carousels
var InitCarousels = function () {
    var heroCarousel = $('.hero-carousel');
    if (heroCarousel.length) {
        heroCarousel.owlCarousel({
            items:1,
            loop:true,
            //autoplay:true,
            autoplayTimeout:5000,
            nav:true,
            navText:['<i class="icon-right-arrow"></i>','<i class="icon-right-arrow"></i>'],
            dots:true,
            mouseDrag:true,
            touchDrag:true,
        });
    }
}

$(document).ready(function () {
    InitCarousels();
});