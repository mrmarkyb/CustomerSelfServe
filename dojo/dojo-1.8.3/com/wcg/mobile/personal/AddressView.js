define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/dom-class",
         "dojo/_base/window",
         "dojo/query",
         "dojo/on",
         "dijit/registry",
         "dojox/mobile/View",
         "dojox/mobile/TextBox",
         "dojox/mobile/Container",
         "dojox/mobile/Pane",
         "dojox/mobile/ContentPane",
         "dojox/mobile/RoundRectList",
         "dojox/mobile/ListItem",
         "dojox/mobile/RoundRectCategory",
         "dojox/mobile/Button",
         "dojox/mobile/SimpleDialog",
         "dojo/dom-construct",
         'dojox/form/Uploader',
         'dojox/form/uploader/plugins/IFrame',
         "dojox/mobile/Heading"],
	function(declare, lang, domClass, window, query, on, registry, View, TextBox, Container, Pane, ContentPane, List, ListItem, Category, Button, SimpleDialog, domConstruct, Uploader, IFramePlugin, Heading ) {

	return declare("com.wcg.mobile.AddressView", [ View ], {

		id: "AddressView",
		newAddress: {},
		currentAddress: {},
		pendingAddressChange: true,
		pendingAddressChangeStatus: "Awaiting Verification",

		postCreate: function() {
            on(this, "BeforeTransitionOut", lang.hitch(this, function() {
                var overlay = registry.byId("AddressBookOverlay");
                overlay.hide();
            }));
		},

		buildRendering: function() {

			this.inherited(arguments);

			this.heading = new Heading({label: "Residential address"});
			this.addChild(this.heading);

			var labelPane = new Container({ "class" : "tooltipContainer"});
			labelPane.addChild( new ContentPane({content: "<img src='images/info.png'>", "class": "infoImage"}));
			labelPane.addChild( new ContentPane({content: "Your current address details are shown below.<br>Supporting documentation to verify your new address will be required.<br>You will be notified when the address change has been made", "class": "infoText"}));
			this.addChild(labelPane);


			var addressList = new List();

			addressList.addChild(this.getListItem("address line 1", "Breckland", "addressLine1", "changeAddress", this.newAddress));
			addressList.addChild(this.getListItem("address line 2", "Linford Wood", "addressLine2", "changeAddress", this.newAddress));
			addressList.addChild(this.getListItem("city", "Milton Keynes", "city", "changeAddress", this.newAddress));
			addressList.addChild(this.getListItem("postcode", "MK14 6FG", "postcode", "changeAddress", this.newAddress));

			this.addChild(addressList);
			this.submitConfirmation = this.getSubmitAndUploadConfirmationOverlay();
			this.addChild(this.submitConfirmation);
			this.submitConfirmation.startup();
			//this.addChild(this.getSubmitAndPostButton());
			this.addChild(this.getChooseFromAddressBookButton());
			this.addChild(this.getSubmitAndUploadButton());
			this.pendingAddressChangeMessageBox = this.getPendingAddressChange();
			this.addChild(this.pendingAddressChangeMessageBox);

			if (this.pendingAddressChange) {
				domClass.add(this.pendingAddressChangeMessageBox.domNode, "componentHidden");
			}

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



		getSubmitAndUploadButton: function() {
			this.submitAndUpload = new Button( {
				label: "Submit",
				onClick: lang.hitch(this, this.submitAddressChange)
			} );
			this.submitAndUpload.domNode.appendChild(domConstruct.create("img", {src: "images/upload.png"}));
			return this.submitAndUpload;
		},


		getChooseFromAddressBookButton: function() {
            this.chooseFromAddressBookButton = new Button({
                label: "Address Book"
            });
            
            this.chooseFromAddressBookButton.domNode.appendChild(domConstruct.create("img", {src: "images/book_address.png"}));

            this.chooseFromAddressBookButton.onClick = lang.hitch(this, function() {
                var overlay = registry.byId("AddressBookOverlay");
                overlay.invokedByView = this;
                overlay.show(this.chooseFromAddressBookButton.domNode, ['below-centered','after','before']);
            });

            return this.chooseFromAddressBookButton;
		},

		getSubmitAndPostButton: function() {
              this.submitAndPost = new Button( {
                    label: "Submit and Post Documents",
                    onClick: lang.hitch(this, function() {
                        this.pendingAddressChangeStatus = "Awaiting Proof";
                        this.showAddressPendingMessage();
                    })
                } );
                return this.submitAndPost;
		},

		getPendingAddressChange: function() {
			var container = new Container({
				id : "pendingAddressChangeWarning"
			});
			var warning = "You currently have a pending address change case open.";
			container.containerNode.appendChild(window.doc.createTextNode(warning));
			this.addressChangeStatusMessage = new Pane();
			this.addressChangeStatusMessage.containerNode.innerHTML = this.getStatusMessage();
			container.addChild(this.addressChangeStatusMessage);
			container.addChild(new Button({
				id: "cancelAddressChangeButton",
				label: "Cancel Address Change",
				"class":"redButton",
				onClick: lang.hitch(this, this.cancelAddressChange)
			}));
			return container;
		},

		getStatusMessage: function() {
			var warning = "";
			if (this.pendingAddressChangeStatus === "Awaiting Verification") {
				warning = "Your documents have been received and are awaiting verification by one of our advisors.";
			}
			if (this.pendingAddressChangeStatus === "Awaiting Proof") {
				warning = "We are awaiting your proof of name change documents. " +
						"If you have not already done so, " +
						"please post them to us with a note of your contract number or vehicle registration";
			}
			return warning;
		},

		cancelAddressChange: function() {
			this.enableAddressChange();
			domClass.add(this.pendingAddressChangeMessageBox.domNode, "componentHidden");
		},

		disableAddressChange: function() {
			for (var line in this.newAddress) {
				this.newAddress[line].textbox.disabled = true;
				domClass.add(this.newAddress[line].textbox, "textBoxDisabled");
			}
			this.submitAndUpload.disabled = true;
			domClass.add(this.submitAndUpload.domNode, "componentHidden");
			domClass.add(this.chooseFromAddressBookButton.domNode, "componentHidden");
			//domClass.add(this.submitAndPost.domNode, "componentHidden");

		},

		enableAddressChange: function() {
			for (var line in this.newAddress) {
				this.newAddress[line].textbox.disabled = false;
				domClass.remove(this.newAddress[line].textbox, "textBoxDisabled");
			}
			this.submitAndUpload.disabled = false;
			domClass.remove(this.submitAndUpload.domNode, "componentHidden");
			domClass.remove(this.submitAndPost.domNode, "componentHidden");
		},

		submitAddressChange: function() {
			this.submitConfirmation.show(this.submitAndUpload.domNode, ['above-centered','after','before']);

		},

		getSubmitAndUploadConfirmationOverlay: function() {
			var dlg = new SimpleDialog();
            var msgBox = domConstruct.create("div",
                                             {"class": "mblSimpleDialogText",
                                              innerHTML: "Your address change case has been opened.</br>" +
                                              "Please upload scanned copies of your verification documents."},
                                              dlg.domNode);
            var cancelBtn = new Button({"class": "mblSimpleDialogButton mblRedButton",
                                        innerHTML: "Cancel"});
            cancelBtn.connect(cancelBtn.domNode, "click",
                              function(e){dlg.hide();});
            cancelBtn.placeAt(dlg.domNode);
            var uploader = this.getUploader();
            uploader.placeAt(dlg.domNode);
            uploader.startup();
            return dlg;
		},

		getUploader: function() {
			var uploader = new dojox.form.Uploader({
                label:"Upload documents",
                multiple:true,
                uploadOnSelect:true,
                url:"UploadFile.php"});

			domClass.add(uploader.domNode, "mblButton");
			domClass.add(uploader.domNode, "addressUploadDocsButton");
			on(uploader, "Begin", lang.hitch(this, function() {
                this.pendingAddressChange = true;
                this.pendingAddressChangeStatus = "Awaiting Verification";
                this.showAddressPendingMessage();
                this.submitConfirmation.hide();
			}));
			return uploader;
		},

		showAddressPendingMessage: function() {
            this.disableAddressChange();
            this.addressChangeStatusMessage.containerNode.innerHTML = this.getStatusMessage();
            domClass.remove(this.pendingAddressChangeMessageBox.domNode, "componentHidden");

		},

		updateDetails: function(details) {
            this.newAddress.addressLine1.set("value", details.addressLine1);
            this.newAddress.addressLine2.set("value", details.addressLine2);
            this.newAddress.city.set ("value", details.city);
            this.newAddress.postcode.set("value", details.postcode);
		}


	});
});