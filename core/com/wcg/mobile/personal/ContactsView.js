define([ "dojo/_base/declare",
         "dojo/_base/window",
         "dojo/_base/lang",
         "dojo/on",
         "dojo/dom-construct",
         "dijit/registry",
         "dojox/mobile/View",
         "dojox/mobile/TextBox",
         "dojox/mobile/Pane",
         "dojox/mobile/RoundRectList",
         "dojox/mobile/ListItem",
         "dojox/mobile/RoundRectCategory",
         "dojox/mobile/Container",
         "dojox/mobile/Button",
         "dojox/mobile/ContentPane",
         "dojox/mobile/Heading"
         ],
    function(declare,
            window,
            lang,
            on,
            domConstruct,
            registry,
            View,
            TextBox,
            Pane,
            List,
            ListItem,
            Category,
            Container,
            Button,
            ContentPane,
            Heading) {

    return declare("com.wcg.mobile.ContactsView", [ View ], {

        id: "ContactsView",
        phones: {},

        postCreate: function() {
            on(this, "BeforeTransitionOut", lang.hitch(this, function() {
                var overlay = registry.byId("AddressBookOverlay");
                overlay.hide();
            }));
        },

        buildRendering: function() {

            this.inherited(arguments);

			//this.addChild(Category( { label : "contacts" } ));
			this.heading = new Heading({label: "contact details"});
			this.addChild(this.heading);

			var labelPane = new Container({ "class" : "tooltipContainer"});
			labelPane.addChild( new ContentPane({content: "<img src='images/info.png'>", "class": "infoImage"}));
			labelPane.addChild( new ContentPane({content: "Your current contact details are shown below.<br>A mobile phone number is required.", "class": "infoText"}));
			this.addChild(labelPane);

            var phoneList = new List();

            phoneList.addChild(this.getListItem("Mobile", "07456 126854", "mobile", "changePhone", this.phones));
            phoneList.addChild(this.getListItem("Home", "01908 456784", "home", "changePhone", this.phones));


            this.addChild(phoneList);
            this.addChild(this.getChooseFromAddressBookButton());
            this.addChild(this.getSubmitButton());


        },

        getSubmitButton: function() {
            this.submit = new Button( {
                label: "Submit"
            } );
            this.submit.domNode.appendChild(domConstruct.create("img", {src: "images/upload.png"}));
            return this.submit;
        },

        getListItem: function(label, value, variableName, clazz, addressObject, disabled) {
            var listItem = new ListItem({ "class" : clazz });
            var labelPane = new Container({ "class" : "personalSummaryLabel"});
            labelPane.containerNode.appendChild(window.doc.createTextNode(label));

            listItem.addChild(labelPane);
            var valuePane = new Container({ "class" : "personalSummaryValue"});
            addressObject[variableName] = new TextBox( { value : value, disabled: disabled ? true : false  } );
            if (disabled) {
                domClass.add(addressObject[variableName].textbox, "textBoxDisabled");
            }
            valuePane.addChild(addressObject[variableName]);

            listItem.addChild(valuePane);

            return listItem;
        },

        getChooseFromAddressBookButton: function() {
            this.chooseFromAddressBookButton = new Button({
                label: "Address Book"
            });

            this.chooseFromAddressBookButton.onClick = lang.hitch(this, function() {
                var overlay = registry.byId("AddressBookOverlay");
                overlay.invokedByView = this;
                overlay.show(this.chooseFromAddressBookButton.domNode, ['after','before']);
            });
            this.chooseFromAddressBookButton.domNode.appendChild(domConstruct.create("img", {src: "images/book_address.png"}));
            return this.chooseFromAddressBookButton;
        },

        updateDetails: function(details) {
            this.phones.home.set("value", details.homePhone);
            this.phones.mobile.set("value", details.mobilePhone);
        }


    });
});