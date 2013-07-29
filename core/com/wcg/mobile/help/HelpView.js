define([ "dojox/mobile/parser", "dojox/mobile", "dojox/mobile/compat", "dojo/on",
         "dojo/_base/lang", "dojo/_base/declare", "dojox/mobile/View", "dojox/mobile/ContentPane",
		"dojox/mobile/EdgeToEdgeList", "dojox/mobile/ListItem",
		"dojo/data/ItemFileWriteStore", "dojox/mobile/Container",
		"dojox/mobile/ScrollableView", "dojox/mobile/RoundRect",
		"com/wcg/mobile/help/ContactUsView", "com/wcg/mobile/help/ChatView",
		"com/wcg/mobile/help/FaqsView", "dijit/registry"


], function(parser, mobile, compat, on, lang, declare, View, Pane, List, ListItem, ItemFileWriteStore, Container, ScrollableView, RoundRect, ContactUsView, ChatView, FaqsView, registry ) {

	return declare("com.wcg.mobile.HelpView", [ View ], {

		id: "HelpView",

		postCreate: function() {
            this.inherited(arguments);
            on(this, "BeforeTransitionIn", lang.hitch(this, this.movedToThis));
		},

		buildRendering : function() {

			this.inherited(arguments);

			this.addChild(this.getPersonalMenu());
			this.addChild(this.getPersonalContent());

		},

		getPersonalMenu: function() {
			var menu = new List({
				"class" : "leftMenu",
				transition: "none",
				stateful: true
			});

			menu.addChild(new ListItem({icon:"images/info2.png", label:"FAQs","class":"inbox", "moveTo" : "FaqsView", selected: true}));
			menu.addChild(new ListItem({icon:"images/at.png", label:"Contact Us","class":"inbox", "moveTo" : "ContactUsView"}));
			menu.addChild(new ListItem({icon:"images/chat.png", label:"24/7 Chat","class":"inbox", "moveTo" : "ChatView"}));

			return menu;
		},

		getPersonalContent: function() {
			var content = new Container({"class": "helpContent"});
			content.addChild(new FaqsView( {selected : true} ));
			content.addChild(new ContactUsView());
			content.addChild(new ChatView());
			return content;
		},

		movedToThis: function() {
            var chatView = registry.byId("ChatView");
            var chatMenu = registry.byId("chatMenuItem");
            if (chatView.chatInProgress) {
                chatView.show();
                chatMenu.set("selected", true);
            }

		}


	});
});