define([ "dojox/mobile/parser", "dojox/mobile", "dojox/mobile/compat",
		"dojo/_base/declare", "dojox/mobile/Container",
		"dojox/mobile/ContentPane", "dojox/mobile/Button"

], function(parser, mobile, compat, declare, View, Pane, Button) {


	return declare("com.wcg.mobile.AvatarMenu", [ View ], {

		buildRendering : function() {
			this.inherited(arguments);
			this.addChild(new Pane({content: "&nbsp", "class": "avatarPicture"}));
			this.addChild(new Pane({content: "Johnathan Williams", "class": "avatarName"}));
			this.addChild(new Pane({content: "&nbsp", class: "avatarLogout"}));
			//this.addChild(new Pane({content: "last login", class: "avatarLastLoginLabel"}));
			//this.addChild(new Pane({content: "21/03/2013 11:13am", class: "avatarLastLoginDate"}));
			//this.addChild(new Button({moveTo : "LoginView",
			//	label : "logout", class: "logoutButton"}));
		}
	});
});