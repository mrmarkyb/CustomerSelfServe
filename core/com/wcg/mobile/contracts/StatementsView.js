define([ "dojo/_base/declare",
         "dojo/dom-construct",
         "dojo/_base/window",
         "dojox/mobile/View",
         "dojox/mobile/TextBox",
         "dojox/mobile/Pane",
         "dojox/mobile/RoundRectList",
         "dojox/mobile/ListItem",
         "dojox/mobile/RoundRectCategory",
         "dojox/mobile/Container",
         "dojox/mobile/Button",
         "dojox/mobile/Heading",
         "dojox/mobile/ContentPane",
         "dojox/mobile/SwapView",
         "dojox/mobile/Carousel"

         ],
    function(declare,
            domConstruct,
            window,
            View,
            TextBox,
            Pane,
            List,
            ListItem,
            Category,
            Container,
            Button,
            Heading,
            ContentPane,
            SwapView,
            Carousel) {

    return declare("com.wcg.mobile.contracts.StatementsView", [ View ], {

        id: "StatementsView",
        email: {},

        buildRendering: function() {
            this.inherited(arguments);

            var heading = new Heading({label: "Statements", back: "Back", moveTo: "ContractsMenuView"});
            this.addChild(heading);
            this.buildView();
        },

        buildView : function() {

			var statement1 = new SwapView();
			statement1.addChild(new ContentPane({href: "statements/Statement1.html", class:"left"}));
			var statement2 = new SwapView();
			statement2.addChild(new ContentPane({href: "statements/Statement2.html", class:"center"}));
			var statement3 = new SwapView();
			statement3.addChild(new ContentPane({href: "statements/Statement3.html", class:"right"}));

			var carousel = new Carousel({height:"100%", navButton:true, numVisible:1, title:""});
			carousel.addChild(statement1);
			carousel.addChild(statement2);
			carousel.addChild(statement3);
			carousel.startup();
			this.addChild(carousel);
		}
    });
});