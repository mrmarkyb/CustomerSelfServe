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

    return declare("com.wcg.mobile.contracts.MakePaymentView", [ View, ContractPageMixin ], {

        id: "MakePaymentView",
        email: {},
        
        buildRendering: function() {
            this.inherited(arguments);

            var heading = new Heading({label: "Make Payment", back: "Back", moveTo: "ContractsMenuView"});
            this.addChild(heading);
            
            
            
            
        }
        


    });
});