define([ "dojox/mobile/parser", "dojox/mobile", "dojox/mobile/compat",
		"dojo/_base/declare", "dojox/mobile/View",
		"dojox/mobile/EdgeToEdgeList", "dojox/mobile/ListItem",
		"dojox/mobile/Container",
		"dojox/mobile/ScrollableView", "dojox/mobile/RoundRect",
		"dojox/mobile/ContentPane", "dojo/on", "dojox/mobile/RoundRectList", "com/wcg/mobile/WelcomeMailContent", "com/wcg/mobile/EolMailContent", "dojox/mobile/Accordion"

], function(parser, mobile, compat, declare, View, List, ListItem,
		Container, ScrollableView, RoundRect, ContentPane, on, RoundRectList, WelcomeMailContent, EolMailContent, Accordion) {

	return declare("com.wcg.mobile.AlertsView", [ View ], {

		id : "AlertsView",
		selected : true,
		partExchangeAction: null,


		buildRendering : function() {

			this.inherited(arguments);

			this.addChild(this.getAlertsMenu());
			this.addChild(this.getAlertsContent());

		},

		getAlertsMenu : function() {

			var menu = new List({
				"class" : "leftMenu",
				stateful: true,
				select: "single",
				tag: "div"
			});

			menu.addChild(new ListItem({icon:"images/inbox.png", checked: false, tag:"div", label:"inbox", "class":"inbox", selected: true}));

			return menu;
		},

		getAlertsContent : function() {
			var content = new Container({"class":"contentView"});

            var accordian = new Accordion({ id: "Mail", singleOpen:true});
            accordian.startup();


			var welcomeMailListItem = new ContentPane({
				"label" : "Welcome to Self Serve...",
				"icon1" : "images/mail5.png",
				"class": "welcome read",
				"rightText": "read",
				"selected": true
			});
			var eolMailListItem = new ContentPane({
				"label" : "End of Contract Notification",
				"icon1" : "/core/com/wcg/mobile/images/dialog-important.png",
				"class": "eolMail",
				"rightText": "unread"
			});
			on(eolMailListItem,     "click", this.getMailItemClickEvent(eolMailListItem));
			on(welcomeMailListItem, "click", this.getMailItemClickEvent(welcomeMailListItem));


			var eolMailContent = new EolMailContent({id:"EolMailContent"});
			var welcomeMailContent = new WelcomeMailContent({id:"WelcomeMailContent", selected: true});

			eolMailListItem.addChild(eolMailContent);
			welcomeMailListItem.addChild(welcomeMailContent);
			accordian.addChild(welcomeMailListItem);
			accordian.addChild(eolMailListItem);
			content.addChild(accordian);
			return content;
		},

		getMailItemClickEvent: function(item) {
			return function() {
				require(["dojo/dom-class"], function(domClass){
                    domClass.add(item.domNode, "read");
                    item.set("rightText","read");
				});
			};
		}
	});
});