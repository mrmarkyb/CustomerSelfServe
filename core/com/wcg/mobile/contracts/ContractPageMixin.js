define([ "dojo/_base/declare", 
         "dojox/gesture/swipe", 
         "dojo/on", 
         "dojo/_base/lang"
         
         ],
    function(declare,           
            swipe, 
            on, 
            lang) {

    return declare("com.wcg.mobile.contracts.ContractPageMixin", [], {

        buildRendering: function() {
            this.inherited(arguments);
            this.addSwipeBack();
        },
        
        addSwipeBack: function() {
            on(this.containerNode, swipe, lang.hitch(this, function(event) {
                if (event.dx > 0) {
                    this.performTransition("ContractsMenuView", -1, "slide");
                }
            }));
        }
    });
});