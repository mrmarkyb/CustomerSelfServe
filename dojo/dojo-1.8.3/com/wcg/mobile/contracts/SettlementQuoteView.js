define([ "dojox/mobile/parser", "dojox/mobile", "dojox/mobile/compat",
		"dojo/_base/declare", "dojox/mobile/View", "dojox/mobile/ContentPane",
		"dojox/mobile/Button","dojox/mobile/RoundRectList", 
        "dojox/mobile/ListItem",
        "dojox/mobile/RoundRectCategory",
        "dojox/mobile/SpinWheel",
        "dojox/mobile/SpinWheelSlot",        
        "dojox/mobile/Heading", 
        "com/wcg/mobile/contracts/ContractPageMixin"        

], function(parser, mobile, compat, declare, View, ContentPane, Button, List, ListItem, Category, SpinWheel, SpinWheelSlot, Heading, ContractPageMixin) {

	return declare("com.wcg.mobile.contracts.SettlementQuoteView", [ View, ContractPageMixin ], {

		id: "SettlementQuoteView",
		selected : false,

		buildRendering : function() {
			this.inherited(arguments);
			var heading = new Heading({label: "Settlement Quote", back: "Back", moveTo: "ContractsMenuView"});
            this.addChild(heading);
			this.buildView();
		},

		buildView : function() {
			this.addChild(Category( { label : "Vehicle Details" } ));
			var vehicleDetailsList = new List();
			vehicleDetailsList.addChild(this.getListItem("Contract", "0001129939", "summaryName"));
			vehicleDetailsList.addChild(this.getSpinnerListItem("Date of Settlement", "Immediate", "summaryName"));
			this.addChild(vehicleDetailsList);

			this.addChild(new Button({"class": "mblSimpleDialogButton mblRedButton",
                innerHTML: "Get Quote!"}));
		},
		
		getListItem: function(label, value, clazz) {
			var listItem = new ListItem({ "class" : clazz });
			var labelPane = new ContentPane({ "class" : "personalSummaryLabel", content: label});
			listItem.addChild(labelPane);
			var valuePane = new ContentPane({ "class" : "personalSummaryValue", content: value});
			listItem.addChild(valuePane);

			return listItem;
		},
		
		getSpinnerListItem: function(label, value, clazz) {
			var listItem = new ListItem({ "class" : clazz });
			var labelPane = new ContentPane({ "class" : "personalSummaryLabel", content: label});
			listItem.addChild(labelPane);
			var valuePane = new ContentPane({ "class" : "personalSummaryValue"});
			
            var spinner = new SpinWheel({});
            var slot = new SpinWheelSlot({
              labels:['A','B','C','D','E','F','G','H','I','J','K','L','M',
                      'N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
              style:{textAlign:"center", width:"40px"}});
            spinner.addChild(slot);
            spinner.startup();
			
			valuePane.addChild(spinner);
			listItem.addChild(valuePane);

			return listItem;
		}		



	});
});