define([ "dojox/mobile/parser", "dojox/mobile", "dojox/mobile/compat",
        "dojo/_base/declare", "dojox/mobile/View",
        "dojox/mobile/SwapView", "dojox/mobile/ContentPane", "dojox/mobile/PageIndicator", "dojox/mobile/Carousel", "dojox/mobile/Slider", "dojox/mobile/Container"

], function(parser, mobile, compat, declare, View, SwapView, ContentPane, PageIndicator, Carousel, Slider, Container) {

    return declare("com.wcg.mobile.finance.NewQuoteView", [ View ], {

        id: "NewQuoteView",
        selected : false,

        buildRendering : function() {
            this.inherited(arguments);
            this.buildCarCarousel();
            this.buildSliders();
        },
        
        buildCarCarousel : function() {

            var carSuggestion1 = new SwapView();
            carSuggestion1.addChild(new ContentPane({href: "newQuote/Fiat500Deal.html", class:"left"}));
            var carSuggestion2 = new SwapView();
            carSuggestion2.addChild(new ContentPane({href: "newQuote/FiatPandaDeal.html", class:"center"}));
            var carSuggestion3 = new SwapView();
            carSuggestion3.addChild(new ContentPane({href: "newQuote/FiatQuboDeal.html", class:"right"}));
            
            var carousel = new Carousel({height:"250px", navButton:false, numVisible:1, title:"Recommended Offers...", "class" : "newQuoteCarousel"});
            carousel.addChild(carSuggestion1);
            carousel.addChild(carSuggestion2);
            carousel.addChild(carSuggestion3);
            carousel.startup();
            this.addChild(carousel);

        },
        
        buildSliders: function() {
            var paymentSlider = new Slider({
                "class": "newQuoteSlider",
                max: 1000, 
                orientation: "H", 
                onChange: function(event) {
                    console.log(event);
            }});
            
            var contractLengthSlider = new Slider({
                "class": "newQuoteSlider",
                max: 48, 
                step: 6,
                orientation: "H", 
                onChange: function(event) {
                    console.log(event);
            }});
            
            var container = new Container({"class" : "newQuoteSliders"});
            container.addChild(paymentSlider);
            container.addChild(contractLengthSlider);
            
            this.addChild(container);
        }
        

        
        

    });
});