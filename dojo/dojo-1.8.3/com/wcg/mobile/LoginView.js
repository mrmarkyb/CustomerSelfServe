define([ "dojox/mobile/parser", "dojox/mobile", "dojox/mobile/compat",
		"dojo/_base/declare", "dojox/mobile/ScrollableView", "dojox/mobile/RoundRect",
		"dojox/mobile/ContentPane", "dojox/dtl/Context", "dojox/dtl", "dojo/text!./templates/LoginTemplate.html" , 
		"dojo/_base/lang","dijit/registry", "com/wcg/mobile/actions/ApplicationActions"


], function(parser, mobile, compat, declare, ScrollableView, RoundRect, ContentPane, Context, dtl, templateText, lang, registry, ApplicationActions) {

	return declare("com.wcg.mobile.LoginView", [ ScrollableView ], {
		id:"LoginView",
		
		buildRendering : function() {
			this.inherited(arguments);
			
			var applicationActions = new ApplicationActions();
			applicationActions.defineAction("attemptLogin", lang.hitch(this, "attemptLogin"));
			
			var template = new dtl.Template(templateText);
			
			var context = new Context({
				attemptLogin: applicationActions.getActionWriter("attemptLogin")()
			});
			
			var eolMailRect = new RoundRect({ shadow:true, class:"mailRect" });
			eolMailRect.addChild(new ContentPane({content: template.render(context)}));
			this.addChild(eolMailRect);
		},
		
		attemptLogin: function(){
			this.performTransition("application",1,"slide");
		}
	});
});