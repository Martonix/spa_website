
(function($) {

    var list = $(".nav__list");
    
    var navToggle = $(".nav__toggle").first();

    var gallery = $(".gallery");

    var opacity;

    /****************************************/

    navToggle.click(function(){
        $("body").toggleClass("nav-open")
    });
     
	// skryjeme elementy 
	//list.find('li').slideUp();

	// zobrazime nav bar  po kliknuti na 
	list.find("button").click(function(){
		$(this).next().slideToggle();   
		//event.preventDefault();
    });
    
/************************************/
    

gallery.find("img").css({
    opacity: 0.75
}).on("mouseenter mouseleave", function(event){

    
    
    if(event.type === "mouseenter"){
        opacity = 1;
    } else {
        opacity = .75;
    }

    $(this).stop().fadeTo(200,opacity);
});


})(jQuery);
