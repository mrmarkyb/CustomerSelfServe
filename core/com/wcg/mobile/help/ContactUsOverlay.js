define(["dojo/_base/declare",
        "dojo/on",
        "dojo/_base/lang",
        "dojox/mobile/Opener",
        "com/wcg/mobile/help/HelpButtons"
       
       ], 
function(
       declare,
       on,
       lang,
       Opener,
       HelpButtons
    ) {
  
    return declare("com.wcg.mobile.personal.ContactUsOverlay", [Opener], {
       
        id: "ContactUsOverlay",
        
        invokedByView: {},
        
        buildRendering: function() {
            this.inherited(arguments);
            this.domNode.appendChild(new HelpButtons().domNode);
        }

    });
    
});