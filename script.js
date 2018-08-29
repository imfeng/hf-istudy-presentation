var window_width = $(window).width();
var window_height = $(window).height();
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-85229009-1', 'auto');
ga('send', 'pageview');
/*
var isViewJoinus = false;

$(document).on('scroll', function() {
    if(!isViewJoinus){
        if($(this).scrollTop()>=$('#joinus').position().top){
            
            ga('send', 'event', 'view', '#joinus');
        }else{}
    }else{}
})
*/

jQuery(document).ready(function($) {





    $('#loader').hide('slow', function() {
    });


    var parser = new UAParser();
    parser.setUA(navigator.userAgent);
    var resultUAP = parser.getResult();
    // this will also produce the same result (without instantiation):
    // var result = UAParser(uastring);
    //console.log(result.browser);        // {name: "Chromium", version: "15.0.874.106"}
    //console.log(result.device);         // {model: undefined, type: undefined, vendor: undefined}
    //console.log(result.os);             // {name: "Ubuntu", version: "11.10"}

	$("#main-header").height(window_height);

	particlesJS("particles-js",
		{"particles":{"number":{"value":70,"density":{"enable":true,"value_area":600}},"color":{"value":"#ffffff"},"shape":{"type":"star","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":5},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":1,"random":true,"anim":{"enable":true,"speed":1,"opacity_min":0,"sync":false}},"size":{"value":4,"random":true,"anim":{"enable":true,"speed":4,"size_min":.3,"sync":false}},"line_linked":{"enable":false,"distance":150,"color":"#ffffff","opacity":.4,"width":1},"move":{"enable":true,"speed":1,"direction":"none","random":true,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":600}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"bubble"},"onclick":{"enable":false,"mode":"repulse"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},"bubble":{"distance":250,"size":0,"duration":2,"opacity":0,"speed":3},"repulse":{"distance":400,"duration":.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true}
	);

    /*
    var count_particles, stats, update;
    stats = new Stats;
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
*/
    /* count_particles */
    //document.body.appendChild(stats.domElement);
    //count_particles = document.querySelector('.js-count-particles');
    /*
    update = function() {
        stats.begin();
        stats.end();
        if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
            count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
        }
        requestAnimationFrame(update);
    };
    requestAnimationFrame(update);;
	*/
  
	if(window_width > window_height){
		if ( $(window).width() < 800 || window.Touch) { 
	        var $sensitivity = 10;
	    } else{
	        var $sensitivity = 100;
	    }
        
        $('#main-header').css('min-height',window_height);
        $('section[id^=sec]').css('min-height',window_height);
        $('.cp-sub').css('min-height', window_height*.33);
        
	    $('#main-cont').fullpage({
	    	sectionSelector: '.vertical-scrolling',
	    	slideSelector: '.horizontal-scrolling',
	        verticalCentered: true,
	        scrollOverflow: false,
	        paddingBottom: '0',
	        scrollingSpeed: '800',
	        navigation: true,
	        navigationPosition: 'right',
	        fixedElements:'#header',
	        resize: false,
	        css3: true,
	        touchSensitivity: $sensitivity,
	        controlArrows: false

	    });
        $('section[id^=sec]').each(function(index, el) {
            $(this).css('margin-top', '0');
        });
        /*
    var swiper = new Swiper('#main-cont', {
        pagination: '.vertical-scrolling',
        direction: 'vertical',
        slidesPerView: 1,
        paginationClickable: true,
        spaceBetween: 30,
        mousewheelControl: true
    });*/ 

	}


/*
    $('#main-cont').fullpage({
	    sectionSelector: '.vertical-scrolling',
	    slideSelector: '.horizontal-scrolling',
		navigation: true,
		slidesNavigation: true,
		controlArrows: false
	});*/
	
	/* cp */
	var cellPhoto_offset = window_height-(window_width/16*7);
	if(window_height < window_width)
		$('.cp-cont .content-box').css('margin-left', -cellPhoto_offset);

	/* Swiper */
/*
    var swiper_stuff = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        slidesPerView: 'auto',
        momentumBounceRatio: 1,
        paginationClickable: true,
        centeredSlides: true,
        spaceBetween: 0,
        freeMode: true
    });
    swiper_stuff.slideTo(1);*/

/* Semantic UI form */
    $('#joinus')
    .form({
        fields: {
          name     : 'empty',
          class   : 'empty',
          email : 'empty',
          fromwhere: ['minCount[1]', 'empty'],
          phone : ['minLength[8]', 'empty']
        },onSuccess:function(events,fields){
            console.log('submit');
            
            $('#joinus .loading').removeClass('disabled');
            $('#joinus .loading').addClass('active');
            $.ajax({
                type: "POST",
                dataType: 'json',
                cache: false,
                url: 'php/ajax/send.php',
                data: $('#joinus').serialize()
            }).done(function (data) {
                ga('send', 'event', 'form', 'submit.Done','referrer', document.referrer);
                if (data.status == 'success') {
                    $('#joinus').html('<h3>報名成功！感謝您的參加！^_^</h3>');
                }else{
                    $('#joinus .err.message').show('fast', function() {
            });
                    $('#joinus .message').html('<p>'+data.message+'</p>');
                }
                $('#joinus .loading').removeClass('active');
                $('#joinus .loading').addClass('disabled');
            }).fail(function() {
                $('#joinus .message p').html('錯誤！請檢察網路連線 OAOa');
                $('#joinus .err.message').show('fast', function() {
            });
                $('#joinus .loading').removeClass('active');
                $('#joinus .loading').addClass('disabled');
                //$response.html('<p>An error occurred, please try again</p>');
            })
            events.preventDefault();
        },onFailure:function(formErrors, fields){
            
            console.log('failed!');
            $('#joinus .err.message').show('fast', function() {
            });
            $('#joinus .message p').html('請檢查每個格子是否填寫完整唷～～');
            //console.log(formErrors);
            //console.log(fields);
        }
    });
    $('#joinus').submit(function () {
        //ga('send', 'event', [eventCategory], [eventAction], [eventLabel], [eventValue], [fieldsObject]);
        ga('send', 'event', 'form', 'submit.click', 'referrer' ,document.referrer);
        if(!($.isEmptyObject(resultUAP))){
            ga('send', 'event', 'form', 'submit.click', 'browser' ,resultUAP.browser.name);
            ga('send', 'event', 'form', 'submit.click', 'os' ,resultUAP.os.name+resultUAP.os.version);
            console.log('UAP:'+ resultUAP.browser.name +"," + resultUAP.os.name);
        }else{}
        
        return false;
    });

    $('.close.icon').click(function(){
      $(this).parent().hide('fast', function() {
          
      });
    });
    $('.ui.dropdown').dropdown();



        


});

jQuery(window).load(function() {
        
});
