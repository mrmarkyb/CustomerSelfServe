define([ "dojo/_base/declare", 
         "dojo/_base/lang",
         "dojo/on",
         "dojo/dom-class",
         "dojo/_base/window", 
         "dojo/query",
         "dojox/mobile/View", 
         "dojox/mobile/TextBox", 
         "dojox/mobile/Container", 
         "dojox/mobile/Pane", 
         "dojox/mobile/RoundRectList", 
         "dojox/mobile/ListItem",
         "dojox/mobile/RoundRectCategory",
         "dojox/mobile/Button",
         "dojox/mobile/Heading",
         "com/wcg/mobile/ChatWidget",
         "dijit/registry"
         ], 
	function(declare, lang, on, domClass, window, query, View, TextBox, Container, Pane, List, ListItem, Category, Button, Heading, ChatWidget, registry ) {

	return declare("com.wcg.mobile.ChatView", [ View ], {
		
		id: "ChatView",
		chatInProgress: false,
		
		postCreate: function() {
            this.inherited(arguments);
            on(this, "BeforeTransitionIn", lang.hitch(this, this.movedToThis));
            on(this, "BeforeTransitionOut", lang.hitch(this, function() {
                this.selected = false;
            }));
		},
		
		buildRendering: function() {
            this.inherited(arguments);

            this.heading = new Heading({label: "24/7 Chat"});
            this.addChild(this.heading);
            
            this.chat = new ChatWidget( {id: "chatWindow", username: "E. Bishop"} );
            this.chat.startup();
			this.addChild(this.chat);
			this.chatLauncher = this.getChatLauncher();
			this.addChild(this.chatLauncher);
		},
		
		getChatLauncher: function() {
            var container = new Container( { id: "chatLauncher" });
            
            var text = "<p><b>24/7 Chat</b></br>You can access our chat feature 24 hours a day." + 
                "Click the button below to start chatting with one of out advisors.</p>";

            container.containerNode.innerHTML = text;

            container.addChild(new Button({
                label: "Launch 24/7 Chat",
                onClick: lang.hitch(this, function() {
                    this.chatInProgress = true;
                    this.showChat();
                })
            }));
            return container;
		},
		
		movedToThis: function() {
            var menuItem = registry.byId("topMenu-help");
            if(menuItem) {
                menuItem.set("badge", null);
            }
            if (this.chatInProgress) {
                this.showChat();
            } 
            else {
                this.hideChat();
            }
            this.selected = true;
		},
		
		showChat: function() {
            domClass.remove(this.chat.domNode, "componentHidden");
            domClass.add(this.chatLauncher.containerNode, "componentHidden");
		},
		
		hideChat: function() {
            domClass.add(this.chat.domNode, "componentHidden");
            domClass.remove(this.chatLauncher.containerNode, "componentHidden"); 
		}
		

	});
});