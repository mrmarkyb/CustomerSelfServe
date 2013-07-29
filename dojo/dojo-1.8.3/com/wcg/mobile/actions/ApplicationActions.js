define([ "dojox/mobile/parser", "dojox/mobile", "dojox/mobile/compat",
		"dojo/_base/declare", 'dojo/_base/json' 
], function(parser, mobile, compat, declare, json) {

	return declare("com.wcg.mobile.actions.ApplicationAction", [ ], {
		
		defineAction: function(actionName, actionFunction) {
			com.wcg.mobile.actions[actionName] = actionFunction;
		},
		
		getActionWriter: function(actionName) {
			return function() {
				return "com.wcg.mobile.actions."+actionName+"("+arguments[0]+");";
			};
		}
			
	});
});