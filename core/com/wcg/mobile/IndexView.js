define([ "dojox/mobile/parser",
         "dojox/mobile",
         "dojox/mobile/compat",
		"dojo/_base/declare",
		"dojo/dom-construct",
		"dojox/mobile/View",
		"dojox/mobile/ContentPane",
		"com/wcg/mobile/LoginView",
		"com/wcg/mobile/Application2"

], function(parser,
        mobile,
        compat,
        declare,
        domConstruct,
        View,
        Pane,
        LoginView,
        Application
        ) {

	return declare("com.wcg.mobile.IndexView", [ View ], {

        id: "index",

		buildRendering : function() {
			this.inherited(arguments);
			
			this.addView(new LoginView({"class":"loginView", selected:true}));
            this.addView(new Application({"class":"wcgApplication"}));
		},

		addView: function(view) {
			this[view.id] = view;
			this.addChild(view);
		}

	});
});