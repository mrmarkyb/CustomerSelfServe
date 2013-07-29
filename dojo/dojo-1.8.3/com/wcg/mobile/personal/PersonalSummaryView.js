define([ "dojo/_base/declare", "dojo/_base/window", "dojox/mobile/View", "dojox/mobile/TextBox", "dojox/mobile/Pane","dojox/mobile/RoundRectList", "dojox/mobile/ListItem","dojox/mobile/RoundRectCategory"],
	function(declare, window, View, TextBox, Pane, List, ListItem, Category ) {

	return declare("com.wcg.mobile.PersonalSummaryView", [ View ], {

		id: "PersonalSummaryView",

		buildRendering: function() {

			this.inherited(arguments);

			this.addChild(Category( { label : "name" } ));

			/* primary borrower */
			var nameList = new List();
			nameList.addChild(this.getListItem("First Name", "Eli", "summaryName"));
			nameList.addChild(this.getListItem("Middle Name", "", "summaryName"));
			nameList.addChild(this.getListItem("Last Name", "Bishopx", "summaryName"));
			this.addChild(nameList);

			/* co-borrower */
			var nameList2 = new List();
			nameList2.addChild(this.getListItem("First Name", "Jane", "summaryName"));
			nameList2.addChild(this.getListItem("Middle Name", "", "summaryName"));
			nameList2.addChild(this.getListItem("Last Name", "Bishop", "summaryName"));
			this.addChild(nameList2);


			this.addChild(Category( { label : "address" } ));
			var addressList = new List();
			addressList.addChild(this.getListItem("Address Line 1", "Breckland", "summaryAddress"));
			addressList.addChild(this.getListItem("Address Line 2", "Linford Wood", "summaryAddress"));
			addressList.addChild(this.getListItem("City", "Milton Keynes", "summaryAddress"));
			addressList.addChild(this.getListItem("Postcode", "MK14 6FG", "summaryAddress"));

			this.addChild(addressList);

			this.addChild(Category( { label : "contacts" } ));
			var contactList = new List();
			contactList.addChild(this.getListItem("E-mail", "ebishop@whiteclarkegroup.com", "summaryContact"));
			contactList.addChild(this.getListItem("Home Telephone", "01908 975236", "summaryContact"));
			contactList.addChild(this.getListItem("Mobile Telephone", "07456 891232", "summaryContact"));

			this.addChild(contactList);
		},

		getListItem: function(label, value, clazz) {
			var listItem = new ListItem({ "class" : clazz });
			var labelPane = new Pane({ "class" : "personalSummaryLabel"});
			labelPane.containerNode.appendChild(window.doc.createTextNode(label));
			listItem.addChild(labelPane);
			var valuePane = new Pane({ "class" : "personalSummaryValue"});
			valuePane.containerNode.appendChild(window.doc.createTextNode(value));
			listItem.addChild(valuePane);

			return listItem;
		}
	});
});