define([ "dojox/mobile/parser", "dojox/mobile", "dojox/mobile/compat",
        "dojo/_base/declare", "dojox/mobile/View", "dojox/mobile/Heading", "com/wcg/mobile/EolMailContent", 
        "com/wcg/mobile/help/HelpButtons",
        "dojox/mobile/Button", "dojo/_base/lang", "dojo/dom", "dojo/query", "dojo/dom-construct", "dojo/dom-class"


], function(parser, mobile, compat, declare, View, Heading, EolMailContent, HelpButtons, Button, lang, dom, query, domConstruct, domClass) {

    return declare("com.wcg.mobile.EolMailView", [ View ], {
        id:"WelcomeMailView",
        
        buildRendering : function() {
            this.inherited(arguments);
            
            this.heading = new Heading({label: "End of Contract Notification"});
            this.addChild(this.heading);
            
            this.addChild(new EolMailContent({"class": "hundredPercentHeight"}  ));
            //this.addChild(new HelpButtons({"class": "EOLHelpButtons"}));
            domClass.add(this.containerNode, "hundredPercentHeight");
            this.replaceOptionsWithButtons();
        },
        
        replaceOptionsWithButtons: function() {
            var partExchangeNode = this.domNode.getElementsByClassName("partExchangeAction")[0];
            partExchangeNode.firstChild.innerHTML = this.getPartExchangeButton().domNode.outerHTML;
            domConstruct.place(this.getPartExchangeButton().domNode, partExchangeNode, "replace");
            
            var finalPaymentNode = this.domNode.getElementsByClassName("finalPaymentAction")[0];
            domConstruct.place(this.getFinalPaymentButton().domNode, finalPaymentNode, "replace");
            
            var returnVehicleNode = this.domNode.getElementsByClassName("returnVehicleAction")[0];
            domConstruct.place(this.getReturnVehicleButton().domNode, returnVehicleNode, "replace");
            
            var findADealerNode = this.domNode.getElementsByClassName("EOLfindADealer")[0];
            domConstruct.place(this.getFindADealerButton().domNode, findADealerNode, "replace");
        },
        
        getPartExchangeButton: function() {
            var button = new Button({
                onClick: lang.hitch(this, function() {
                    this.performTransition("PartExchangeView", 1, "slide");
                }),
                label: "Part Exchange",
                icon: "images/phone.png"
            });
            return button;
        },
        
        getFinalPaymentButton: function() {
            var button = new Button({
                onClick: lang.hitch(this, function() {
                    this.performTransition("FinalPaymentView", 1, "slide");
                }),
                label: "Final Payment"
            });
            return button;
        },
        
        getReturnVehicleButton: function() {
            var button = new Button({
                onClick: lang.hitch(this, function() {
                    this.performTransition("ReturnVehicleView", 1, "slide");
                }),
                label: "Return Vehicle"
            });
            return button;
        },
        
        getFindADealerButton: function() {
            return new Button({
                onClick: lang.hitch(this, function() {
                    if (mapView&& mapView.openMap) {
                        mapView.openMap('16 St Albans Road,Watford,Hertfordshire,WD17 1UN', this);
                    }
                }),
                label: "Find a Dealer"
            });
            
        }
    
            
    });
});