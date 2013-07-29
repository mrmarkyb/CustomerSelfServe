define([ "dojox/mobile/parser", "dojox/mobile", "dojox/mobile/compat",
        "dojo/_base/declare", "dojox/mobile/View",
        "dojox/mobile/EdgeToEdgeList", "dojox/mobile/ListItem",
        "dojox/mobile/Container",
        "com/wcg/mobile/contracts/ContractsSummaryView",
        "com/wcg/mobile/contracts/SettlementQuoteView"


], function(parser, mobile, compat, declare, View, List, ListItem, Container, ContractsSummaryView, SettlementQuoteView) {

    return declare("com.wcg.mobile.ContractsView", [ View ], {

        id: "ContractsView",
        selected : false,

        buildRendering : function() {

            this.inherited(arguments);
            this.addChild(this.getContractsMenu());
            this.addChild(this.getContractsContent());
        },

        getContractsMenu : function() {

            var menu = new List({
                "class" : "leftMenu",
                stateful: true,
                select: "single",
                tag: "div"
            });

            menu.addChild(new ListItem({icon:"images/contractsummary.png", moveTo:"ContractsSummaryView", checked: false, tag:"div", label:"summary", selected: true}));
            menu.addChild(new ListItem({icon:"images/contracts.png", checked: false, tag:"div", label:"statements"}));
            menu.addChild(new ListItem({icon:"images/transactions.png", checked: false, tag:"div", label:"transaction history"}));
            menu.addChild(new ListItem({icon:"images/card2.png", checked: false, tag:"div", label:"bank details"}));
            menu.addChild(new ListItem({icon:"images/blank.png", moveTo:"SettlementQuoteView", checked: false, tag:"div", label:"settlement quote"}));

            return menu;
        },

		getContractsContent : function() {
			var content = new Container({"class":"contentView"});

            content.addChild(new ContractsSummaryView());
            content.addChild(new SettlementQuoteView());

            return content;
        }

    });
});