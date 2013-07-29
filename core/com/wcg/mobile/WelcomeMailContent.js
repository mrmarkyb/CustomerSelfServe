define([ "dojox/mobile/parser", "dojox/mobile", "dojox/mobile/compat",
		"dojo/_base/declare", "dojox/mobile/ScrollableView", "dojox/mobile/RoundRect",
		"dojox/mobile/ContentPane", "dojox/dtl/Context", "dojox/dtl", "dojo/text!./templates/WelcomeMailTemplate.html"


], function(parser, mobile, compat, declare, ScrollableView, RoundRect, ContentPane, Context, dtl, templateText) {

	return declare("com.wcg.mobile.WelcomeMailContent", [ ContentPane ], {
		buildRendering : function() {

			this.inherited(arguments);

			var template = new dtl.Template(templateText);

			var context = new Context({
				title:"Mr",
				forename:"Johnathan",
				surname: "Williams",
				agreementNumber: "0001129939",
				registrationNumber: "GV09 OKO",
				finalPaymentDate: "06/07/2013",
				dateSent: "03/06/2013",
				addressLine1: "23 Elm House",
				addressLine2: "Loughton",
				addressLine3: "Milton Keynes",
				postcode: "MK4 567"
			});


			var welcomeMailRect = new RoundRect({shadow:true});
			welcomeMailRect.addChild(new ContentPane({content: template.render(context)}));
			this.addChild(welcomeMailRect);
		}

	});
});
