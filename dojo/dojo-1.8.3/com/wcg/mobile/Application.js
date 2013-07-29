define([ "dojox/mobile/parser", "dojox/mobile", "dojox/mobile/compat",
		"dojo/_base/declare", "dojox/mobile/View", "dojox/mobile/ContentPane",
		"com/wcg/mobile/TopMenu", "com/wcg/mobile/AvatarMenu", "com/wcg/mobile/AppLogoView",
		"com/wcg/mobile/AlertsView", "com/wcg/mobile/ContractsView", "com/wcg/mobile/personal/PersonalView",
		"com/wcg/mobile/NewFinanceView", "com/wcg/mobile/help/HelpView", "com/wcg/mobile/SettingsView", "com/wcg/mobile/CompanyLogoView","com/wcg/mobile/MapView",
		"dojo/_base/lang", "com/wcg/mobile/actions/ApplicationActions"

], function(parser, mobile, compat, declare, View, Pane, TopMenu, AvatarMenu, AppLogoView, AlertsView, ContractsView, PersonalView, NewFinanceView, HelpView, SettingsView, CompanyLogoView, MapView, lang, ApplicationActions) {

	return declare("com.wcg.mobile.Application", [ View ], {
		
		id: "application",
		
		buildRendering : function() {
			this.inherited(arguments);
			var applicationActions = new ApplicationActions();
			applicationActions.defineAction("partExchangeAction", lang.hitch(this, "partExchangeAction"));
			applicationActions.defineAction("finalPaymentAction", lang.hitch(this, "finalPaymentAction"));
			applicationActions.defineAction("returnVehicleAction", lang.hitch(this, "returnVehicleAction"));
			
			this.addView(new AppLogoView({"class":"appLogo"}));
			this.addView(new TopMenu({"class":"topMenu"}));
			this.addView(new AvatarMenu({"class":"avatarMenu"}));
			this.addView(new AlertsView({}));
			this.addView(new ContractsView({}));
			this.addView(new PersonalView({}));
			this.addView(new NewFinanceView({}));
			this.addView(new HelpView({}));
			this.addView(new SettingsView({}));
			this.addView(new CompanyLogoView({"class":"companyLogo"}));
			//mapView is global so it can be accessed from the alerts
			mapView = new MapView();
			this.addChild(mapView);
		},
		
		addView: function(view) {
			this[view.id] = view;
			this.addChild(view);
		},
		
		partExchangeAction: function(contractNumber) {
			console.log("part Exchange: " + contractNumber);
			this.NewFinanceView.getShowingView().performTransition("NewFinanceView",1,"slide",null);
			this.NewFinanceView.selectPartExchange();
		},
		finalPaymentAction: function(contractNumber) {
			console.log("final Payment: " + contractNumber);
		},
		returnVehicleAction: function(contractNumber) {
			console.log("return vehicle: " + contractNumber);
		}
	});
});