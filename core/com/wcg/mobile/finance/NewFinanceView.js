define([ "dojox/mobile",
         "dojox/mobile/parser",
         "dojox/mobile/compat",
         "dojo/_base/declare",
         "dojox/mobile/View",
         "dojox/mobile/SwapView",
         "dojox/mobile/ContentPane",
         "dojox/mobile/PageIndicator",
         "dojox/mobile/Carousel",
         "dojox/mobile/StoreCarousel",
         "dojox/mobile/Heading",
         "dojox/mobile/IconMenu",
         "dojox/mobile/IconMenuItem",
         "dojo/store/JsonRest"],

function(parser, mobile, compat, declare, View, SwapView, ContentPane, PageIndicator, Carousel, StoreCarousel, Heading, IconMenu, IconMenuItem, JsonRest)
{

	return declare("com.wcg.mobile.finance.NewFinanceView", [ View ], {

		id: "NewFinanceView",
		selected : false,

		buildRendering : function() {
			this.inherited(arguments);
			this.buildView();
		},

		buildView : function() {

            var heading = new Heading({label: "new finance quote", back: "Back", moveTo: "ContractsMenuView"});
            //this.addChild(heading);

			//var quotePage1 = new SwapView();
			//var contentPane = new ContentPane({content:"", class:"left"});
			//contentPane.addChild(this.getVehicleMakeCarousel());
			//this.addChild(contentPane);

			this.addChild(this.getVehicleMakeCarousel());

			//quotePage1.addChild(contentPane);

			//var quotePage2 = new SwapView();
			//quotePage2.addChild(new ContentPane({href: "deals/FiatPandaDeal.html", class:"center", }));

			//var carousel = new Carousel({height:"100%", navButton:true, numVisible:1, title:""});
			//carousel.addChild(quotePage1);
			//carousel.addChild(quotePage2);
			//carousel.startup();
			//this.addChild(carousel);

		},

		getVehicleMakeCarousel: function()
		{

	       var sampleStore = new JsonRest({target: "data/vehiclemakes.json"});
	       var carousel = new StoreCarousel({
	            store: sampleStore,
	            navButton: true,
	            numVisible: 2,
	            height: "inherit",
	            width: "inherit",
	            title: "Vehicle Make Selection"
	        }, "carousel1");
	        carousel.startup();
	        return carousel;
		},

        getVehicleMakeMenuxxx: function() {



            var menu = new IconMenu({
                  cols: 4, transition:"slide"
              }, "iconMenu");
              menu.startup();

              var item = new IconMenuItem({
                  label: "",
                  icon: "images/makes/fiat.png",
                  moveTo: "VehicleSelectionView"
              });
              menu.addChild(item);

              item = new IconMenuItem({
                  label: "",
                  icon: "images/makes/bmw.png",
                  moveTo: "VehicleSelectionView"
              });
              menu.addChild(item);

              item = new IconMenuItem({
            	  label: "",
                  icon: "images/makes/hyundai.png",
                  moveTo: "VehicleSelectionView"
              });
              menu.addChild(item);

              item = new IconMenuItem({
            	  label: "",
                  icon: "images/makes/ford.png",
                  moveTo: "VehicleSelectionView"
              });
              menu.addChild(item);

              item = new IconMenuItem({
                  label: "",
                  icon: "images/makes/holden.png",
                  moveTo: "VehicleSelectionView"
              });
              menu.addChild(item);

              item = new IconMenuItem({
                  label: "",
                  icon: "images/makes/mercedes.png",
                  moveTo: "VehicleSelectionView"
              });
              menu.addChild(item);

              item = new IconMenuItem({
                  label: "",
                  icon: "images/makes/chrysler.png",
                  moveTo: "VehicleSelectionView"
              });
              menu.addChild(item);

              item = new IconMenuItem({
                  label: "",
                  icon: "images/makes/honda.png",
                  moveTo: "VehicleSelectionView"
              });
              menu.addChild(item);

              return menu;

        }

	});
});