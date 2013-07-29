define([ "dojox/mobile/parser", "dojox/mobile", "dojox/mobile/compat",
		"dojo/_base/declare", "dojox/mobile/Container",
		"dojox/mobile/TabBar", "dojox/mobile/TabBarButton", "dojox/mobile/ContentPane", "dojo/on", "dijit/registry"

], function(parser, mobile, compat, declare, View, TabBar, TabButton, Pane, on, registry) {


	return declare("com.wcg.mobile.TopMenu2", [ View ], {

		buildRendering : function() {

			this.inherited(arguments);
			var tabBar = new TabBar({
				iconBase : "images/tab-icons.png",
				center : false,
				barType : "flatTab",
				fill : "always"
			});
			
			tabBar.addChild(new Pane({content: "&nbsp", "class": "appLogo"}));
			var helpDropDown = new Pane({content: "&nbsp", "class": "helpMenuDropDown"});
			on(helpDropDown.domNode, "click", function() {
                var overlay = registry.byId("ContactUsOverlay");
                overlay.show(helpDropDown.domNode, ['below-centered','after','before']);
			});
			tabBar.addChild(helpDropDown);
			

			this.addChild(tabBar);

		}
	});
});