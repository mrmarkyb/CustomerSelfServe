define([ "dojox/mobile/parser", "dojox/mobile", "dojox/mobile/compat",
		"dojo/_base/declare", "dojox/mobile/Container",
		"dojox/mobile/ContentPane", "dojox/mobile/Button"

], function(parser, mobile, compat, declare, View, Pane, Button) {

	return declare("com.wcg.mobile.AppLogoView", [ View ], {

		buildRendering : function() {
			this.inherited(arguments);
			this.addChild(new Pane({content: "&nbsp", "class": "appLogo"}));
		}
	});
});