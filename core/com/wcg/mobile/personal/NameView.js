define([ "dojo/_base/declare", "dojo/_base/window", "dojox/mobile/View", "dojox/mobile/TextBox", "dojox/mobile/Pane","dojox/mobile/RoundRectList", "dojox/mobile/ListItem","dojox/mobile/RoundRectCategory", "dojox/mobile/Heading"],
    function(declare, window, View, TextBox, Pane, List, ListItem, Category, Heading ) {

    return declare("com.wcg.mobile.NameView", [ View ], {

        id: "NameView",

        buildRendering: function() {

            this.inherited(arguments);

			this.heading = new Heading({label: "Customer details"});
			this.addChild(this.heading);

            var nameList = new List();

            nameList.addChild(this.getListItem("Title", "Mr", "summaryName"));
            nameList.addChild(this.getListItem("First Name", "Eli", "summaryName"));
            nameList.addChild(this.getListItem("Middle Name", "", "summaryName"));
            nameList.addChild(this.getListItem("Last Name", "Bishop", "summaryName"));
            nameList.addChild(this.getListItem("Date of Birth", "01/01/1985", "summaryName"));

            this.addChild(nameList);


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