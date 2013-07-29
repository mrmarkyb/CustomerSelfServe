define([ "dojox/mobile/parser", "dojox/mobile", "dojox/mobile/compat",
		"dojo/_base/declare", "dojox/mobile/ScrollableView", "com/wcg/mobile/WelcomeMailContent"


], function(parser, mobile, compat, declare, ScrollableView, WelcomeMailContent) {

	return declare("com.wcg.mobile.WelcomeMailView", [ ScrollableView ], {
		id:"WelcomeMailView",
		buildRendering : function() {

			this.inherited(arguments);
			
			this.addChild(new WelcomeMailContent());
		}
			
	});
});
	