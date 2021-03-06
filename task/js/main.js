ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
            center: [59.963841, 30.321429],
            zoom: 16
        }, {
            searchControlProvider: 'yandex#search'
        }),

        // Создаём макет содержимого.
        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        ),

        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
            hintContent: 'Собственный значок метки',
            balloonContent: 'Это красивая метка'
        }, {
            iconImageOffset: [-5, -38]
        });


    myMap.geoObjects
        .add(myPlacemark);
});

$(document).ready(function () {
    $('.accordion_item_title_block').click(function () {
        if($(this).children('span').hasClass('flaticon-up-arrow')){
            $(this).children('span').removeClass().addClass('flaticon-angle-arrow-down');
            $(this).css({
                 borderRadius: "9px"
                });
        }else{
            $(this).children('span').removeClass().addClass('flaticon-up-arrow');
            $(this).css({
                borderRadius: "9px 9px 0 0"
            });
        }
        var target = $(this).attr("data-href");
        $(target).slideToggle(300);
    });

    $('.go_to').click(function (event) { // ловим клик по ссылке с классом go_to
        event.preventDefault(); // вырубаем стандартное поведение
        var scroll_el = $(this).attr('href'); // возьмем содержимое атрибута href, должен быть селектором, т.е. например начинаться с # или .
        if(scroll_el == ".our-service" && $(window).width() < 991){
            scroll_el = scroll_el + '-md';
        }
        if ($(scroll_el).length != 0) { // проверим существование элемента чтобы избежать ошибки
            $('html, body').animate({scrollTop: $(scroll_el).offset().top}, 1000); // анимируем скроолинг к элементу scroll_el
        }
        return false; // выключаем стандартное действие
    });

    /* засунем сразу все элементы в переменные, чтобы скрипту не приходилось их каждый раз искать при кликах */
    var overlay = $('#overlay'); // подложка, должна быть одна на странице
    var open_modal = $('.open_modal'); // все ссылки, которые будут открывать окна
    var close = $('.modal_close, #overlay'); // все, что закрывает модальное окно, т.е. крестик и оверлэй-подложка
    var modal = $('.modal_div'); // все скрытые модальные окна

    open_modal.click(function (event) { // ловим клик по ссылке с классом open_modal
        event.preventDefault(); // вырубаем стандартное поведение
        var div = $(this).attr('href'); // возьмем строку с селектором у кликнутой ссылки
        overlay.fadeIn(400, //показываем оверлэй
            function () { // после окончания показывания оверлэя
                $(div) // берем строку с селектором и делаем из нее jquery объект
                    .css('display', 'block')
                    .animate({opacity: 1, top: '50%'}, 200); // плавно показываем
            });
    });

    close.click(function () { // ловим клик по крестику или оверлэю
        modal // все модальные окна
            .animate({opacity: 0, top: '45%'}, 200, // плавно прячем
                function () { // после этого
                    $(this).css('display', 'none');
                    overlay.fadeOut(400); // прячем подложку
                }
            );
    });



    $(window).scroll(function() {
        if($(this).scrollTop() >= 900 && $(window).width() > 1170) {
            $('nav.main-nav').css({
                display: "block"
            });
        }
        else{
            $('nav.main-nav').css({
                display: "none"
            });
        }
        if ($(window).width() > 800) {
            $('.single-item').slick({
                infinite: true,
                dots: false,
                slidesToShow: 3,
                slidesToScroll: 1,
                arrows: true,
                centerMode: true,
            });
            $('.single-iteml').slick();
        }
        if($(window).width() < 800){
            $('.single-item').slick({
                arrows: false,
                centerMode: true,});
            $('.single-iteml').slick({
                arrows: false,
            });
        }
    });

    $(window).resize(function(){
        if($(window).width() > 1170) {
            $('nav.main-nav').css({
                display: "none"
            });
        }
    });

    $('.our-service_content_item').click(function () {
        $('.our-service_content_item').removeClass('active_service-title');
        $('.our-service_content_box-info').removeClass('active_service-info');
        $(this).addClass('active_service-title');
        var target = $(this).attr("data-tab-href");
        $(target).addClass('active_service-info');
    });

    $('.our-service-md_content_item').click(function () {
        $('.our-service-md_content_item').removeClass('our-service-md_content_item-active');
        $('.our-service-md_content_box-info').removeClass('our-service-md_content_box-info-active');
        $(this).addClass('our-service-md_content_item-active');
        var target = $(this).attr("data-tab-href");
        $(target).addClass('our-service-md_content_box-info-active');
    });

    if ($(window).width() > 800) {
        $('.single-item').slick({
            infinite: true,
            dots: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: true,
            centerMode: true,
        });
        console.log($(window).width());
        $('.single-iteml').slick();
    }
    if($(window).width() < 800){
        $('.single-item').slick({
            arrows: false,
            centerMode: true,});
        console.log($(window).width());
        $('.single-iteml').slick({
            arrows: false,
        });
    }

    var link = $('.menu-link');
    var link_active = $('.menu-link_active');
    var menu = $('.menu_burger');
    var nav_link = $('.menu_burger_item_link');

    link.click(function(){
        link.toggleClass('menu-link_active');
        menu.toggleClass('menu_burger_active');
    });
    link_active.click(function(){
        link.removeClass('menu-link_active');
    });
    nav_link.click(function(){
        link.removeClass('menu-link_active');
        menu.removeClass('menu_burger_active');
    });
});