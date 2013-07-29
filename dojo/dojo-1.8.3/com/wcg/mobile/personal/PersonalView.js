define([ "dojox/mobile/parser", "dojox/mobile", "dojox/mobile/compat",
		"dojo/_base/declare", "dojox/mobile/View", "dojox/mobile/ContentPane",
		"dojox/mobile/EdgeToEdgeList", "dojox/mobile/ListItem",
		"dojo/data/ItemFileWriteStore", "dojox/mobile/Container",
		"dojox/mobile/ScrollableView", "dojox/mobile/RoundRect",
		"com/wcg/mobile/personal/AddressView", "com/wcg/mobile/personal/PersonalSummaryView"


], function(parser, mobile, compat, declare, View, Pane, List, ListItem, ItemFileWriteStore, Container, ScrollableView, RoundRect, AddressView, PersonalSummaryView ) {

	return declare("com.wcg.mobile.PersonalView", [ View ], {

		id: "PersonalView",

		buildRendering : function() {

			this.inherited(arguments);

			this.addChild(this.getPersonalMenu());
			this.addChild(this.getPersonalContent());

		},

		getPersonalMenu: function() {
			var menu = new List({
				"class" : "leftMenu",
				transition: "none",
				stateful: true
			});

			menu.addChild(new ListItem({icon:"images/list.png",label:"summary",class:"personalSummary", "moveTo" : "PersonalSummaryView"}));
			menu.addChild(new ListItem({icon:"images/home2.png",label:"change address",class:"addressView", "moveTo" : "AddressView"}));
			menu.addChild(new ListItem({icon:"images/username.png",label:"change name",class:"nameView", "moveTo" : "AddressView"}));
			menu.addChild(new ListItem({icon:"images/phone1.png",label:"change contacts",class:"contactsView", "moveTo" : "AddressView"}));

			return menu;
		},

		getPersonalContent: function() {
			var content = new Container({"class": "personalContent"});
			content.addChild(new PersonalSummaryView( {selected : true} ));
			content.addChild(new AddressView());
			return content;
		}
	});
});