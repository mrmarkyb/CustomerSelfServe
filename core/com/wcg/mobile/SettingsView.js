define([ "dojox/mobile/parser", "dojox/mobile", "dojox/mobile/compat",
		"dojo/_base/declare", "dojox/mobile/View",
		"dojox/mobile/EdgeToEdgeList", "dojox/mobile/ListItem",
		"dojo/data/ItemFileWriteStore", "dojox/mobile/Container",
		"dojox/mobile/ScrollableView", "dojox/mobile/RoundRect",
		"dojox/mobile/ContentPane", "dojox/mobile/RoundRectDataList",
		"dojox/mobile/ScrollablePane"

], function(parser, mobile, compat, declare, View, List, ListItem,
		ItemFileWriteStore, Container, ScrollableView, RoundRect, ContentPane, DataList, ScrollablePane) {

	return declare("com.wcg.mobile.SettingsView", [ View ], {

		id: "SettingsView",
		selected : false,

		buildRendering : function() {

			this.inherited(arguments);
			this.addChild(this.getSettingsView());
		},

		getSettingsView : function() {

			var menu = new List({
				"class" : "leftMenu",
				stateful: true,
				select: "single",
				tag: "div"
			});

			menu.addChild(new ListItem({icon:"images/phone1.png", checked: false, tag:"div", label:"account details", "class":"acctDetails", selected: true}));
			menu.addChild(new ListItem({icon:"images/lockclosed.png", checked: false, tag:"div", label:"change password","class":"changePassword"}));

			return menu;
		}

	});
});