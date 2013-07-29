define([ "dojox/mobile/parser", "dojox/mobile", "dojox/mobile/compat",
		"dojo/_base/declare", "dojox/mobile/View",
		"dojox/mobile/EdgeToEdgeList", "dojox/mobile/ListItem",
		"dojo/data/ItemFileWriteStore", "dojox/mobile/Container",
		"dojox/mobile/ScrollableView", "dojox/mobile/RoundRect",
		"dojox/mobile/ContentPane", "dojox/mobile/RoundRectDataList",
		"dojox/mobile/ScrollablePane", "com/wcg/mobile/finance/PartExchangeView"

], function(parser, mobile, compat, declare, View, List, ListItem,
		ItemFileWriteStore, Container, ScrollableView, RoundRect, ContentPane, DataList, ScrollablePane, PartExchangeView) {

	return declare("com.wcg.mobile.NewFinanceView", [ View ], {

		id: "NewFinanceView",
		selected : false,

		buildRendering : function() {

			this.inherited(arguments);
			this.addChild(this.getNewFinanceMenu());
			this.addChild(new PartExchangeView({class:"contentView"}));
		},

		getNewFinanceMenu : function() {

			var menu = new List({
				"class" : "leftMenu",
				stateful: true,
				select: "single",
				tag: "div",
				syncWithViews: true
			});

			menu.addChild(new ListItem({icon:"images/phone1.png", checked: false, tag:"div", label:"finance quote"}));
			menu.addChild(new ListItem({icon:"images/phone1.png", moveTo: "PartExchangeView", checked: false, tag:"div", label:"Part Exchange", selected: true}));
			menu.addChild(new ListItem({icon:"images/phone1.png", checked: false, tag:"div", label:"contact us"}));

			
			return menu;
		},
		
		selectPartExchange: function() {
			
		}

	});
});