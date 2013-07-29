define([ "dojox/mobile/parser",
         "dojox/mobile",
         "dojox/mobile/compat",
		"dojo/_base/declare",
		"dojo/dom-construct",
		"dojox/mobile/View",
		"dojox/mobile/ContentPane",
		"dojox/mobile/Accordion",
		"dojox/mobile/Container",
		"dojox/mobile/FixedSplitter",
		"dojox/mobile/ScreenSizeAware",
		"dojox/mobile/EdgeToEdgeList",
		"dojox/mobile/ListItem",
		"dojox/mobile/Button",
		"dojo/_base/lang",
		"dojo/on",
		"com/wcg/mobile/actions/ApplicationActions",
		"com/wcg/mobile/TopMenu2",
		"com/wcg/mobile/AvatarMenu",

		"com/wcg/mobile/help/ChatView",
		"com/wcg/mobile/help/ContactUsView",
		"com/wcg/mobile/help/FaqsView",
		"com/wcg/mobile/help/ContactUsOverlay",


		"com/wcg/mobile/personal/AddressView",
		"com/wcg/mobile/personal/PersonalSummaryView",
		"com/wcg/mobile/personal/NameView",
		"com/wcg/mobile/personal/ContactsView",
		"com/wcg/mobile/personal/EmailView",
		"com/wcg/mobile/personal/AddressBookOverlay",

		"com/wcg/mobile/EolMailView",
		"com/wcg/mobile/WelcomeMailView",
		"com/wcg/mobile/MapView",

		"com/wcg/mobile/contracts/ContractsMenuView",
        "com/wcg/mobile/contracts/VehicleView",
        "com/wcg/mobile/contracts/BankDetailsView",
        "com/wcg/mobile/contracts/MakePaymentView",
        "com/wcg/mobile/contracts/FinanceOptionsView",
        "com/wcg/mobile/contracts/PaymentDetailsView",
        "com/wcg/mobile/contracts/PaymentHistoryView",
        "com/wcg/mobile/contracts/StatementsView",
        "com/wcg/mobile/contracts/TransactionHistoryView",
        "com/wcg/mobile/contracts/SettlementQuoteView",
        "com/wcg/mobile/finance/PartExchangeView",
        "com/wcg/mobile/finance/NewFinanceView",
        "com/wcg/mobile/finance/PartExchangeView",
        "com/wcg/mobile/finance/NewQuoteView"


], function(parser,
        mobile,
        compat,
        declare,
        domConstruct,
        View,
        Pane,
        Accordian,
        Container,
        FixedSplitter,
        ScreenSizeAware,
        List,
        ListItem,
        Button,
        lang,
        on,
        ApplicationActions,
        TopMenu,
        AvatarMenu,
        ChatView,
        ContactUsView,
        FaqsView,
        ContactUsOverlay,
        AddressView,
        PersonalSummaryView,
        NameView,
        ContactsView,
        EmailView,
        AddressBookOverlay,
        EolMailView,
        WelcomeMailView,
        MapView,

        ContractsMenuView,
        VehicleView,
        BankDetailsView,
        MakePaymentView,
        FinanceOptionsView,
        PaymentDetailsView,
        PaymentHistoryView,
        StatementsView,
        TransactionHistoryView,
        SettlementQuoteView,
        NewFinanceView,
        PartExchangeView,
        NewQuoteView
        ) {

	return declare("com.wcg.mobile.Application2", [ View ], {

        id: "application",

		buildRendering : function() {
			this.menuLookup = {};
			this.inherited(arguments);
			var applicationActions = new ApplicationActions();
			applicationActions.defineAction("partExchangeAction", lang.hitch(this, "partExchangeAction"));
			applicationActions.defineAction("finalPaymentAction", lang.hitch(this, "finalPaymentAction"));
			applicationActions.defineAction("returnVehicleAction", lang.hitch(this, "returnVehicleAction"));

//			this.addView(new TopMenu({"class":"topMenu"}));
			var topBar = new Container({});
			topBar.addChild(new TopMenu({"class":"topMenu"}));
			topBar.addChild(new AvatarMenu({"class":"avatarMenu"}));
			var topBottomSplitter = new FixedSplitter({orientation:"V"});
			topBottomSplitter.addChild(topBar);
			this.mainContentSplitter = new FixedSplitter({orientation:"H",screenSizeAware:true});
			this.mainContentSplitter.addChild(this.getMenu({"class" : "leftMenu"}));
			this.viewContainer = new Container({});
            this.addView(new ChatView({ "class": "contentView" }));
			this.addView(new ContactUsView({ "class": "contentView" }));
			this.addView(new FaqsView({"class": "contentView"}));
			this.addView(new AddressView({ "class": "contentView personalDetails" }));
			this.addView(new PersonalSummaryView({ "class": "contentView" }));
			this.addView(new NameView({ "class": "contentView" }));
			this.addView(new ContactsView({ "class": "contentView personalDetails" }));
			this.addView(new EmailView({ "class": "contentView personalDetails" }));
			this.addView(new EolMailView({ id:"EOLMailView", "class":"contentView"}));
			this.addView(new ContractsMenuView({selected: true, "class":"contentView"}));
//			this.addView(new WelcomeMailView({id:"WelcomeMailView", "class":"contentView"}));
			this.addView(new VehicleView({"class":"contentView"}));
			this.addView(new BankDetailsView({"class":"contentView"}));
			this.addView(new MakePaymentView({"class":"contentView"}));
			this.addView(new FinanceOptionsView({"class":"contentView"}));
			this.addView(new PaymentDetailsView({"class":"contentView"}));
			this.addView(new PaymentHistoryView({"class":"contentView"}));
			this.addView(new StatementsView({"class":"contentView"}));
			this.addView(new TransactionHistoryView({"class":"contentView"}));
			this.addView(new SettlementQuoteView({"class":"contentView"}));

			mapView = new MapView({"class":"contentView"});
			this.addView(mapView);

			this.addView(new PartExchangeView({"class":"contentView"}));
			this.addView(new NewQuoteView({"class":"contentView"}));
			//this.addView(new CompanyLogoView({"class":"companyLogo"}));
			this.mainContentSplitter.addChild(this.viewContainer);
			this.mainContentSplitter.startup();
			topBottomSplitter.addChild(this.mainContentSplitter);
			topBottomSplitter.startup();
			this.addChild(topBottomSplitter);
            this.addChild(new AddressBookOverlay({}));
            this.addChild(new ContactUsOverlay({}));
		},

		addView: function(view) {
			this[view.id] = view;
			this.viewContainer.addChild(view);
            on(view, "BeforeTransitionIn", lang.hitch(this, function(event) {
            	this.viewSelected(view.id);
            }));			
		},
		
		viewSelected: function(viewId) {
			if(this.menuLookup[viewId]) {
				var menuData = this.menuLookup[viewId];
				this.accordian.expand(menuData.parent);
				this.accordian.select(menuData.parent);
				menuData.list.selectItem(menuData.listItem);
			}
		},

		getMenu : function() {
            var accordian = new Accordian({"class" : "leftMenu", singleOpen: true, fixedHeight: true, id : "mainMenu"});

            accordian.addChild(this.getAlertsSubMenu());
            accordian.addChild(this.getContractsSubMenu());
            accordian.addChild(this.getNewFinanceSubMenu());
            accordian.addChild(this.getPersonalSubMenu());
            accordian.addChild(this.getHelpSubMenu());
            //accordian.addChild(this.getSettingsSubMenu());
            accordian.startup();

            on(accordian.getChildren()[0], "Focus", function(event) {
                console.log(event);
            });

            this.accordian = accordian;
            return accordian;

        },


        getAlertsSubMenu : function() {

            var content = new Container({label : "notifications", selected: true, icon1:"images/message_black.png", icon2:"images/message_red.png", checkClass:"images/messagex.png"});
            var messageList = new List({
                stateful: true,
                select: "single",
                transition: "slide"
            });

            //messageList.addChild(new ListItem({icon:"images/contractsummary.png", checked: false, tag:"div", label:"summary", "class":"inbox"}));


            var message1 = new ListItem({
                "class": "notificationListItem",
                "moveTo" : "EOLMailView",
                variableHeight: false
            });
            message1.addChild(this.getMailItem("End Of Contract Notification", "Your Fiat 500 reg GV09 OKO is coming to the end of its contract"));
            this.registerMenuItem(messageList,message1,content);

            var message2 = new ListItem({
                "class": "notificationListItem",
                "moveTo" : "EOLMailView",
                variableHeight: false
            });

            message2.addChild(this.getMailItem("Welcom to Customer Self Service", "Welcome to the customer self service application."));
            this.registerMenuItem(messageList,message2,content);

            var message3 = new ListItem({
                "class": "notificationListItem",
                "moveTo" : "EOLMailView",
                variableHeight: false
            });

            message3.addChild(this.getMailItem("Welcom to Customer Self Service", "Welcome to the customer self service application."));
            this.registerMenuItem(messageList,message3,content);


            content.addChild(messageList);

            return content;
        },

        getMailItem: function(subject, preview) {
            var item = new Container({"class" : "emailPreview", layout: "center"});
            var topArea = new Container({"class" : "emailPreviewTop"});
            var bottomArea = new Container({"class" : "emailPreviewBottom"});

            topArea.containerNode.appendChild(domConstruct.create("img", {src: "images/mail5.png", "class": "mblImageIcon"}));
            topArea.containerNode.appendChild(domConstruct.create("div", {innerHTML: subject}));
            bottomArea.containerNode.appendChild(domConstruct.create("div", {innerHTML: preview}));
            item.addChild(topArea);
            item.addChild(bottomArea);
            return item;
        },

        getMailItemClickEvent: function(listItem) {
            return function() {
                require(["dojo/dom-class"], function(domClass){
                    domClass.add(listItem.domNode, "read");
                    listItem.set("rightText","read");
                });
            };
        },

        getNewFinanceSubMenu: function() {

            var pane = new Container({
                label: "new finance",
                icon1:"images/calculator_black.png",
                icon2:"images/calculator_red.png"});

            var menu = new List({
                stateful: true,
                select: "single",
                tag: "div",
                transition: "slide"
            });

            var partExchangeMenuItem = new ListItem({icon:"images/exchange_black.png", checked: false, tag:"div", label:"part exchange<br><div class='menuSubText'>view options to purchase a new vehicle</div>", "class":"partExchangeListItem", moveTo: "PartExchangeView"});
            this.registerMenuItem(menu, partExchangeMenuItem, pane);
            this.registerMenuItem(menu, new ListItem({icon:"images/plus_black.png", checked: false, tag:"div", label:"new quote<br><div class='menuSubText'>calculate your payments for a new vehicle</div>", "class":"newFinanceListItem", moveTo: "NewFinanceView"}),pane);

            pane.addChild(menu);
            return pane;
        },
        
        registerMenuItem: function (list, listItem, parent) {
        	list.addChild(listItem);
        	if(!this.menuLookup[listItem.moveTo]) {
        		this.menuLookup[listItem.moveTo] = {list: list, listItem: listItem, parent:parent};
        	}
        },

        getContractsSubMenu: function() {

            var content = new Container({label : "my contracts", selected: true, icon1:"images/contracts_black.png", icon2:"images/contracts_red.png"});
            var messageList = new List({
                stateful: true,
                select: "single",
                transition: "slide"
            });

            /* Contract 1 */
            var contract1 = new ListItem({
                "class": "contractListItem",
                variableHeight: false,
                moveTo: "ContractsMenuView",
                selected: true
            });

            contract1.addChild(this.getContractItem(
                    "images/toyota_yaris_red.png",
                    "2013 Toyota Yaris",
                    "Consumer Loan 36 months",
                    "Status:Active", "(In Arrears)" ));

            this.registerMenuItem(messageList, contract1, content);

            /* Contract 2 */
            var contract2 = new ListItem({
                "class": "contractListItem",
                variableHeight: false
            });

            contract2.addChild(this.getContractItem(
                    "images/toyota_prius_white.png",
                    "2011 Toyota Prius",
                    "Consumer Loan 42 months",
                    "Status:Inactive", "" ));

            this.registerMenuItem(messageList, contract2, content);

            content.addChild(messageList);

            return content;

        },

        getContractItem: function(image, desc, product,status, arrears) {
            var item = new Container({"class" : "contractLayout", layout: "left"});
            var carimage = new Container({"class" : "contractImage"});
            var bottomArea = new Container({"class" : "contractBottom"});

            carimage.containerNode.appendChild(domConstruct.create("img", {src: image, "class": "mblImageIcon"}));
            //topArea.containerNode.appendChild(domConstruct.create("div", {innerHTML: desc}));
            bottomArea.containerNode.appendChild(domConstruct.create("div", {innerHTML: desc, class:"contractDesc"}));
            bottomArea.containerNode.appendChild(domConstruct.create("div", {innerHTML: product, class:"productDesc"}));
            bottomArea.containerNode.appendChild(domConstruct.create("div", {innerHTML: status, class:"contractStatus"}));
            bottomArea.containerNode.appendChild(domConstruct.create("div", {innerHTML: arrears, class:"arrearsStatus"}));
            item.addChild(carimage);
            item.addChild(bottomArea);
            return item;
        },

        getHelpSubMenu: function() {

            var pane = new Container({
                label: "help",
                icon1:"images/help_black.png",
                icon2:"images/help2_red.png"});

            var menu = new List({
                stateful: true,
                select: "single",
                tag: "div",
                transition: "slide"
            });

            this.registerMenuItem(menu,new ListItem({icon:"images/info_black.png", label:"frequently asked questions<br><div class='menuSubText'>search through a list of common questions</div>","class":"faqListItem", "moveTo" : "FaqsView"}),pane);
            this.registerMenuItem(menu,new ListItem({icon:"images/at_black.png", label:"contact us<br><div class='menuSubText'>contact our customer service staff by phone or email</div>","class":"emailListItem", "moveTo" : "ContactUsView"}),pane);
            this.registerMenuItem(menu,new ListItem({icon:"images/chat_black.png", label:"24/7 chat<br><div class='menuSubText'>speak directly to one of customer service staff</div>","class":"chatListItem", "moveTo" : "ChatView"}),pane);

            pane.addChild(menu);
            return pane;
        },

        getPersonalSubMenu: function() {

            var pane = new Container({label: "personal details", icon1:"images/membercard_black.png", icon2:"images/membercard_red.png"});

            var menu = new List({
                stateful: true,
                select: "single",
                tag: "div",
                transition: "slide"
            });

            this.registerMenuItem(menu,this.getNameMenuItem("johnathan williams","primary borrower", true),pane);
            this.registerMenuItem(menu,this.getNameMenuItem("jane williams", "co-borrower", false),pane);
            this.registerMenuItem(menu,this.getAddresMenuItem(),pane);
            this.registerMenuItem(menu,this.getMailingAddresMenuItem(),pane);
            this.registerMenuItem(menu,this.getContactMenuItem(),pane);
            this.registerMenuItem(menu,this.getEmailMenuItem(),pane);

            pane.addChild(menu);
            return pane;
        },

        getNameMenuItem: function( name, borrowerType, showImage  ) {

            var listItem = new ListItem({
                moveTo: "NameView", class: "nameListItem"
            });

            var nameContainer = new Container({"layout" : "center"});

            /* primary borrower*/

            if (showImage)
            	nameContainer.containerNode.appendChild(domConstruct.create("img", {src: "images/username_black.png", "class": "personalMenuIcon personalNameIcon"}));
            else
            	nameContainer.containerNode.appendChild(domConstruct.create("img", {src: "images/blank.png", "class": "personalMenuIcon personalNameIcon"}));
            nameContainer.containerNode.appendChild(domConstruct.create("div", {innerHTML: borrowerType, "class": "menuPreText"}));
            nameContainer.containerNode.appendChild(domConstruct.create("div", {innerHTML: name, "class": "personalMenuDetail personalName"}));
            listItem.addChild(nameContainer);

            return listItem;
        },

        getAddresMenuItem: function() {
            var listItem = new ListItem({
                moveTo: "AddressView", class: "addressListItem"
                //icon:"images/home2.png"
            });
            var addressContainer = new Container({"layout" : "center"});
            addressContainer.containerNode.appendChild(domConstruct.create("img", {src: "images/home2_black.png", "class": "personalMenuIcon personalAddressIcon"}));
            var address = "<div class='menuPreText'>residential address</div>Linford Wood</br>Milton Keynes</br>MK14 6FG";
            addressContainer.containerNode.appendChild(domConstruct.create("div", {innerHTML: address, "class": "personalMenuDetail personalAddress"}));
            listItem.addChild(addressContainer);
            return listItem;
        },

        getMailingAddresMenuItem: function() {
            var listItem = new ListItem({
                moveTo: "AddressView", class: "addressListItem"
                //icon:"images/home2.png"
            });
            var addressContainer = new Container({"layout" : "center"});
            addressContainer.containerNode.appendChild(domConstruct.create("img", {src: "images/blank.png", "class": "personalMenuIcon personalAddressIcon"}));
            var address = "<div class='menuPreText'>mailing address</div>Linford Wood</br>Milton Keynes</br>MK14 6FG";
            addressContainer.containerNode.appendChild(domConstruct.create("div", {innerHTML: address, "class": "personalMenuDetail personalAddress"}));
            listItem.addChild(addressContainer);
            return listItem;
        },

        getContactMenuItem: function() {
            var listItem = new ListItem({
                moveTo: "ContactsView", class: "contactsListItem"
                    //icon:"images/home2.png"
            });
            var contactContainer = new Container({"layout" : "center"});
            contactContainer.containerNode.appendChild(domConstruct.create("img", {src: "images/phone1_black.png", "class": "personalMenuIcon personalPhoneIcon"}));
            var contact = "<div class='menuPreText'>mobile</div>07456 126854<div class='menuPreText'>home</div>01908 456784";
            contactContainer.containerNode.appendChild(domConstruct.create("div", {innerHTML: contact, "class": "personalMenuDetail personalPhone"}));
            listItem.addChild(contactContainer);
            return listItem;
        },

        getEmailMenuItem: function() {
            var listItem = new ListItem({
                moveTo: "EmailView", class : "emailListItem"
                    //icon:"images/home2.png"
            });
            var contactContainer = new Container({"layout" : "center"});
            contactContainer.containerNode.appendChild(domConstruct.create("img", {src: "images/at_black.png", "class": "personalMenuIcon personalEmailIcon"}));
            var contact = "j.williams@whiteclarkegroup.com.au";
            contactContainer.containerNode.appendChild(domConstruct.create("div", {innerHTML: contact, "class": "personalMenuDetail personalEmail"}));
            listItem.addChild(contactContainer);
            return listItem;
        },



        getSettingsSubMenu: function() {

            var pane = new Container({label: "Settings", icon1:"images/settings7.png", icon2:"images/settings7.png"});

            var menu = new List({
                stateful: true,
                select: "single",
                tag: "div",
                transition: "slide"
            });

            menu.addChild(new ListItem({icon:"images/phone1.png", checked: false, tag:"div", label:"account details", "class":"acctDetails"}));
            menu.addChild(new ListItem({icon:"images/lockclosed.png", checked: false, tag:"div", label:"change password","class":"changePassword"}));

            pane.addChild(menu);
            return pane;
        },

		partExchangeAction: function(contractNumber) {
			console.log("part Exchange: " + contractNumber);
			this.PartExchangeView.getShowingView().performTransition("PartExchangeView",1,"slide",null);
		},
		finalPaymentAction: function(contractNumber) {
			console.log("final Payment: " + contractNumber);
		},
		returnVehicleAction: function(contractNumber) {
			console.log("return vehicle: " + contractNumber);
		}
	});
});