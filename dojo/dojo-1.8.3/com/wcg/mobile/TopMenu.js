define([ "dojox/mobile/parser", "dojox/mobile", "dojox/mobile/compat",
		"dojo/_base/declare", "dojox/mobile/Container",
		"dojox/mobile/TabBar", "dojox/mobile/TabBarButton"

], function(parser, mobile, compat, declare, View, TabBar, TabButton) {


	return declare("com.wcg.mobile.TopMenu", [ View ], {

		buildRendering : function() {

			this.inherited(arguments);
			var tabBar = new TabBar({
				iconBase : "images/tab-icons.png",
				center : false,
				barType : "flatTab",
				fill : "always"
			});
			tabBar.addChild(new TabButton({
				icon1:"images/mail5.png", icon2:"images/mail5.png",
				moveTo : "AlertsView",
				label : "alerts",
				transition: "slide",
				badge : "",
				selected : true
			}));
			tabBar.addChild(new TabButton({
				icon1:"images/contracts2.png", icon2:"images/contracts2.png",
				moveTo : "ContractsView",
				transition: "slide",
				label : "contracts"
			}));
			tabBar.addChild(new TabButton({
				icon1:"images/user.png", icon2:"images/user.png",
				moveTo : "PersonalView",
				transition: "slide",
				label : "personal"
			}));

			tabBar.addChild(new TabButton({
				icon1:"images/newfinance.png", icon2:"images/newfinance.png",
				moveTo : "NewFinanceView",
				transition: "slide",
				label : "new finance"
			}));

			tabBar.addChild(new TabButton({
				icon1:"images/help.png", icon2:"images/help.png",
				moveTo : "HelpView",
				label : "help",
				transition: "slide",
				id: "topMenu-help"
				
			}));

			tabBar.addChild(new TabButton({
				icon1:"images/settings7.png", icon2:"images/settings7.png",
				moveTo : "SettingsView",
				transition: "slide",
				label : "settings"
					
			}));

		/*	tabBar.addChild(new TabButton({
				icon1:"images/logout.png", icon2:"images/logout.png",
				moveTo : "PersonalView",
				label : "",
				transition: "slide",
				"class" : "logoutButton"
			}));*/

			this.addChild(tabBar);

		}
	});
});