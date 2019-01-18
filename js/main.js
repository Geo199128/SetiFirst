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

            $(document).find('svg').find('*').removeAttr('style').removeAttr('fill');
            /* Exit the function: */
            return;
        }
    }
}

includeHTML();

//Global variables
$window = $(window);
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
        detailsGalleryRelatedCarousel = $('.gallery-related-carousel'),
        detailsGalleryContainer = $('.gallery-container'),
        cruiseItineraryCarousel = $('.cruise-itinerary-carousel'),
        cruiseItineraryContainer = $('.cruise-itinerary-container'),
        programItineraryCarousel = $('.program-itinerary-carousel'),
        programItineraryContainer = $('.program-itinerary-container'),
        deckPlansCarousel = $('.deck-plans-carousel'),
        deckPlansContainer = $('.deck-plans-container');
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
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 500,
            fade: true,
            arrows: false,
            dots: false,
            asNavFor: detailsGalleryRelatedCarousel,
            cssEase: 'linear'
        });
        detailsGalleryRelatedCarousel.slick({
            slidesToShow: 9,
            slidesToScroll: 1,
            infinity: false,
            asNavFor: detailsGalleryCarousel,
            speed: 250,
            arrows: true,
            prevArrow: detailsGalleryContainer.find('.gallery-prev'),
            nextArrow: detailsGalleryContainer.find('.gallery-next'),
            dots: false,
            centerMode: true,
            focusOnSelect: true,
            cssEase: 'ease'
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

    if (programItineraryCarousel.length) {
        var programItineraryProgress = $('.program-itinerary-progress');
        var itemsCount = programItineraryCarousel.find('.program-itinerary-item').length;
        var progressPercentage = 100 / itemsCount;
        console.log(progressPercentage);
        programItineraryProgress.find('.fill').css('width', progressPercentage + '%');
        programItineraryCarousel.slick({
            arrows: true,
            prevArrow: programItineraryContainer.find('.program-itinerary-prev'),
            nextArrow: programItineraryContainer.find('.program-itinerary-next'),
            infinite: false,
            speed: 500
        }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            percentage = (nextSlide + 1) * progressPercentage;
            programItineraryProgress.find('.fill').css('width', percentage + '%');
        });
    }

    if (deckPlansCarousel.length) {
        deckPlansCarousel.slick({
            slidesToShow: 4,
            slidesToScroll: 2,
            arrows: true,
            prevArrow: deckPlansContainer.find('.deck-plans-prev'),
            nextArrow: deckPlansContainer.find('.deck-plans-next'),
            infinite: false,
            variableWidth: true
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

//Init popup
var InitPopup = function (container) {
    var popup = $('.popup');
    $('body').addClass('unscrollable');
    popup.fadeIn(300).find(container).fadeIn(300);
    $(popup, popup.find('.popup-close-btn')).off().on('click', function (e) {
        if (!$(e.target).closest('.popup-content').length && !$(e.target).hasClass('.popup-content')) {
            popup.fadeOut(300).find(container).fadeOut(300);
            setTimeout(function () {
                $('body').removeClass('unscrollable');
            }, 300);
        }
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

//Render fixed details menu
var RenderFixedDetailsMenu = function () {
    if ($('.details-tabs-section').length) {
        var distance = $('.details-tabs-section').offset().top - $('.details-tabs').height();
        var windowTopWithoutMenu = $window.scrollTop() + $('.details-tabs').height();

        if ($window.scrollTop() >= distance) {
            // Your div has reached the top
            $('.details-tabs').addClass('menu-fixed').css('top', 0);
        } else {
            $('.details-tabs').removeClass('menu-fixed').removeAttr('style');
        }

        $('.details-tabs a').each(function () {
            var detailsSection = $($(this).attr('href'));
            if (detailsSection.length) {
                // adding 1px before the section top to avoid sections menu issue of not marking the active section when it scrolls to the top of the section
                var detailsSectionTop = detailsSection.offset().top - 1;
                var detailsSectionHeight = detailsSection.outerHeight();
                if (windowTopWithoutMenu >= detailsSectionTop && windowTopWithoutMenu < (detailsSectionTop + detailsSectionHeight)) {
                    $(this).addClass('active');
                } else {
                    if ($(this).closest('li').index() == 0 && windowTopWithoutMenu < detailsSectionTop) {
                        $(this).addClass('active');
                    } else {
                        $(this).removeClass('active');
                    }
                }
            }
        });
    }
}

$(document).ready(function () {
    InitCarousels();
    InitParallax();
    RenderFixedDetailsMenu();

    if ($('#home-video').length) {
        InitHomeVideo();
    }

    if ($('.view-map-btn').length) {
        $('.view-map-btn').on('click', function () {
            var long = $(this).data('long');
            var lat = $(this).data('lat');
            GenerateMap(long, lat);
            InitPopup($('#map'));
        });
    }

    if ($('.setifirst-top-btn').length) {
        $('.setifirst-top-btn').on('click', function () {
            $('html,body').animate({
                scrollTop: 0
            });
        });
    }

    if ($('.details-tabs-section').length) {
        $('.details-tabs-section a').on('click', function (e) {
            e.preventDefault;
            // $('.details-tabs-section a').not(this).removeClass('active');
            // $(this).addClass('active');
            $('html,body').animate({
                scrollTop: $($(this).attr('href')).offset().top - $('.details-tabs').height()
            });
            return false;
        });
    }

    if ($('.program-full-itinerary-btn').length) {
        $('.program-full-itinerary-btn').on('click', function () {
            InitPopup($('#program-itinerary-popup'));
        });
    }
});

$window.on('scroll', function () {
    RenderFixedDetailsMenu();
});