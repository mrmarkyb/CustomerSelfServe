define([ "dojo/_base/declare",
         "dojo/dom-construct",
         "dojo/_base/window",
         "dojox/mobile/View",
         "dojox/mobile/TextBox",
         "dojox/mobile/Pane",
         "dojox/mobile/RoundRectList",
         "dojox/mobile/ListItem",
         "dojox/mobile/RoundRectCategory",
         "dojox/mobile/Container",
         "dojox/mobile/Button",
         "dojox/mobile/Heading",
         "dojox/mobile/ContentPane",
         "com/wcg/mobile/contracts/ContractPageMixin"

         ],
    function(declare,
            domConstruct,
            window,
            View,
            TextBox,
            Pane,
            List,
            ListItem,
            Category,
            Container,
            Button,
            Heading,
            ContentPane,
            ContractPageMixin) {

    return declare("com.wcg.mobile.contracts.VehicleView", [ View, ContractPageMixin ], {

        id: "VehicleView",
        email: {},

        buildRendering: function() {
            this.inherited(arguments);

            var heading = new Heading({label: "Contract", back: "Back", moveTo: "ContractsMenuView"});
            this.addChild(heading);

            this.addChild(new ContentPane({href: "vehicle/VehicleInformation.html", class:"left"}));
            //this.addChild(new ContentPane({href: "vehicle/ContractInformation.html", class:"ContractBottom"}));
        }
    });
});