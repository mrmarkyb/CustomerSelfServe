define([ "dojox/mobile/parser", "dojox/mobile", "dojox/mobile/compat",
		"dojo/_base/declare", "dojox/mobile/View","dojox/mobile/EdgeToEdgeList", "dojox/mobile/ListItem", "dojox/gesture/swipe", "dojo/on", "dojo/_base/lang"

], function(parser, mobile, compat, declare, View, EdgeToEdgeList, ListItem, swipe, on, lang) {

	return declare("com.wcg.mobile.contracts.ContractsSummaryView", [ View ], {

		id: "ContractsSummaryView",
		selected : false,

		buildRendering : function() {

			this.inherited(arguments);
			this.buildView();
		},

		buildView : function() {

            var contractList = new EdgeToEdgeList({
                "class" : "contractList",
                transition: "none",
                stateful: true
            });

            contractList.addChild( new ListItem({id:"test",label:"198291 - 2013 Toyota Prius - Active", selected:true}));
            contractList.addChild( new ListItem({id:"test2",label:"178291 - 2009 Toyota Corolla - Inactive"}));

            this.addChild(contractList);

		}
		


	});
});