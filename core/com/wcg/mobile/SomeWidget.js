define([ "dojox/mobile/parser", "dojox/mobile", "dojox/mobile/compat",
		"dojo/_base/declare", "dojox/mobile/ScrollableView",
		"dojox/mobile/Heading", "dojox/mobile/RoundRectDataList",
		"dojox/mobile/ListItem", "dojo/data/ItemFileWriteStore",
        "dojox/mobile/SpinWheel",
        "dojox/mobile/SpinWheelSlot" 

], function(parser, mobile, compat, declare, View, Heading, List, ListItem, ItemFileWriteStore, SpinWheel, SpinWheelSlot) {


	return declare("com.wcg.mobile.SomeWidget", [ View ], {

		buildRendering : function() {
			this.inherited(arguments);
			this.addChild(new Heading({
				label : "hello"
			}));
			var storeData = {
				"items" : [ {
					"label" : "Wi-Fi",
					"icon" : "images/i-icon-3.png",
					"rightText" : "Off",
					"moveTo" : "bar"
				}, {
					"label" : "VPN",
					"icon" : "images/i-icon-4.png",
					"rightText" : "VPN",
					"moveTo" : "bar"
				} ]
			};
			var sampleStore = new ItemFileWriteStore({
				data : storeData
			});
			var list = new List({
				store : sampleStore
			});
			this.addChild(list);
			
            var spinner = new SpinWheel({});
            var slot = new SpinWheelSlot({
              labels:['A','B','C','D','E','F','G','H','I','J','K','L','M',
                      'N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
              style:{textAlign:"center", width:"40px"}});
            spinner.addChild(slot);
            spinner.startup();        
            this.addChild(spinner);
		}
	});
});