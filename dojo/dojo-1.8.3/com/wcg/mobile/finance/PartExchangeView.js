define([ "dojox/mobile/parser", "dojox/mobile", "dojox/mobile/compat", "dojo/on", "dojo/_base/lang", "dojo/dom-construct",
		"dojo/_base/declare", "dojox/mobile/View",
		"dojox/mobile/SwapView", "dojox/mobile/ContentPane", "dojox/mobile/PageIndicator", "dojox/mobile/Carousel", "dojox/mobile/Container", "dojox/mobile/Heading",
		"dojox/mobile/ScrollableView"

], function(parser, mobile, compat, on, lang, domConstruct, declare, View, SwapView, ContentPane, PageIndicator, Carousel, Container, Heading, ScrollableView) {

	return declare("com.wcg.mobile.finance.PartExchangeView", [ View ], {

		id: "PartExchangeView",
		selected : false,

		postCreate: function() {
            on(this, "BeforeTransitionIn", lang.hitch(this, function(event) {
                if (this.movedFrom === "EOLMailView") {
                    this.heading.set("back", "Back");
                    this.heading.set("moveTo", "EOLMailView");
                    this.heading.backButton.back = false;
                    this.heading.backButton.domNode.style.display = "";
                }
                else {
                    if (this.heading.backButton && this.movedFrom !== "MapView") {
                        this.heading.backButton.domNode.style.display = "none";
                    }
                    
                }
            }));
		},
		
		buildRendering : function() {
			this.inherited(arguments);
			this.buildView();
			//this.attachMapEvent();
		},

		buildView : function() {

            this.heading = new Heading({label: "New finance - part exchange options"});
            this.addChild(this.heading);

			var carSuggestion1 = new SwapView();
			carSuggestion1.addChild(new ContentPane({href: "deals/Fiat500Deal.html", class:"left"}));
			
//			var carSuggestion1 = new SwapView();
//			var carScroll1 = new ScrollableView();
//			carScroll1.addChild(new ContentPane({href: "deals/Fiat500Deal.html", class:"left"}));
//			carSuggestion1.addChild(carScroll1);
			
			
			var carSuggestion2 = new SwapView();
			carSuggestion2.addChild(new ContentPane({href: "deals/FiatPandaDeal.html", class:"center"}));
			var carSuggestion3 = new SwapView();
			carSuggestion3.addChild(new ContentPane({href: "deals/FiatQuboDeal.html", class:"right"}));

			var carousel = new Carousel({height:"80%", navButton:true, numVisible:1, title:""});
			carousel.addChild(carSuggestion1);
			carousel.addChild(carSuggestion2);
			carousel.addChild(carSuggestion3);
			carousel.startup();
			this.addChild(carousel);

			var findADealerContainer = new Container({class: "partExchangeFindADealer"});
			on(findADealerContainer.containerNode, "click", lang.hitch(this, function() {
                if (mapView&& mapView.openMap) {
                    mapView.openMap('16 St Albans Road,Watford,Hertfordshire,WD17 1UN', this);
                }
            }));
			
			findADealerContainer.containerNode.appendChild(domConstruct.create("div", {innerHTML: "Find a local dealer","class":"findADealerText"}));
			findADealerContainer.containerNode.appendChild(domConstruct.create("img", {src: "images/find-a-dealer.png", "class": "findADealerImage"}));
			this.addChild(findADealerContainer);
			
		},		

		selectPartExchange: function() {

		}

	});
});