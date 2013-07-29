define([ "dojo/dom-geometry", "dojo/_base/declare", "dojox/mobile/Heading", "dojo/_base/lang", "dojo/dom", "dojo/on", "dojo/dom-construct", "dojo/query",
			"dojo/dom-style", "dojox/mobile/parser", "dojox/mobile/deviceTheme",
			"dojox/mobile/compat", "dojox/mobile", "dojox/mobile/Button", 
			"dojox/mobile/TextBox", "dojox/mobile/TextArea", "dojox/mobile/Container", "dojox/mobile/ScrollableView", "dojox/mobile/RoundRectList", "dojox/mobile/ListItem", "dijit/registry",
             "dojox/mobile/Badge"

], function(domGeo, declare, Heading, lang, dom, on, domConstruct, query, domStyle, parser, deviceTheme, compat, mobile, Button, TextBox, TextArea, Container, ScrollableView, RoundRectList, ListItem, registry, Badge) {

	return declare("com.wcg.mobile.ChatWidget", [ Container ], {

		chatRef: new Firebase('https://calms-mobile-chat.firebaseIO.com/chat/' + 1),
		authClient: {},
		username: null,
		
		postCreate : function() {
			this.inherited(arguments);
			this.chatRef.on('child_added', lang.hitch(this, function(snapshot) {
				var message = snapshot.val();
				this.displayChatMessage(message.name, message.text);
				var chatView = registry.byId("ChatView");
				if (!chatView.selected && chatView.chatInProgress) {
                    var menuItem = registry.byId("topMenu-help");
                    if (menuItem) {
                        if (menuItem.get("badge")) {
                            menuItem.set("badge", (Number(menuItem.get("badge")) + 1) + "");
                        }
                        else {
                            menuItem.set("badge", "1");
                        }
                    }
				}
			}));
			this.chatRef.remove();
			this.displayChatMessage("Calms", "Welcome to 24/7. Please send us a message and we'll reply straight away.");
		},
		
		startup: function() {
			this.inherited(arguments);

		},
		
		buildRendering: function() {
			this.inherited(arguments);

			this.chatMessageContainer = new Container({
				id: "chatMessageContainer"
			});
			this.messageBox = new RoundRectList({
				id: "chatMessages"
			});
			this.chatMessageContainer.addChild(this.messageBox);
			this.addChild(this.chatMessageContainer);
//			
			var textBoxAndButtonContainer = new Container({
				id: "textBoxAndButtonContainer"
			});
			textBoxAndButtonContainer.addChild(new TextArea({
				id: "chatMessageBox"
			}));
			textBoxAndButtonContainer.addChild(new Button({
				id: "sendMessageButton",
				onClick: lang.hitch(this, this.sendMessage),
				label: "Send"
			}));
			this.addChild(textBoxAndButtonContainer);
		},
		
		displayChatMessage: function(name, text) {
			var listItem = new ListItem({
				innerHTML: "<b>" + name + "</b> - " + text
			});
			this.messageBox.addChild(listItem);
			this.chatMessageContainer.domNode.scrollTop = this.chatMessageContainer.domNode.scrollHeight;
		},
		
		sendMessage: function(name, text) {
			this.chatRef.push({
				name : this.username,
				text : dom.byId("chatMessageBox").value
			});
			dom.byId('chatMessageBox').value = '';
		}
		
	});
});