define([ "dojo/_base/declare", 
         "dojo/_base/lang",
         "dojo/dom-class",
         "dojo/dom-construct",
         "dojo/_base/window", 
         "dojo/query",
         "com/wcg/mobile/help/HelpButtons",
         "dojox/mobile/View", 
         "dojox/mobile/TextBox", 
         "dojox/mobile/Container", 
         "dojox/mobile/ContentPane", 
         "dojox/mobile/Pane", 
         "dojox/mobile/RoundRectList", 
         "dojox/mobile/ListItem",
         "dojox/mobile/RoundRectCategory",
         "dojox/mobile/Button",
         "dojox/mobile/SimpleDialog",
         "dojox/mobile/Heading",
         "dojo/dom-construct",
         'dojox/form/Uploader',
         "dojox/form/uploader/plugins/IFrame"], 
	function(declare, lang, domClass, domConstruct, window, query, HelpButtons, View, TextBox, Container, ContentPane, Pane, List, ListItem, Category, Button, SimpleDialog, Heading, domConstruct, Uploader, IFramePlugin ) {

	return declare("com.wcg.mobile.ContactUsView", [ View ], {
		
		id: "ContactUsView",
		
		buildRendering: function() {
            this.inherited(arguments);

            this.heading = new Heading({label: "Contact Us"});
            this.addChild(this.heading);
            
            this.containerNode.appendChild(domConstruct.create("img", {"class": "ContactUsImage", src: "images/woman-in-headset.jpg"}));
            this.addChild(new ContentPane({"class": "ContactTimes", href: "contact/contactDetails.html"}));
            
            this.addChild(new HelpButtons({"class": "ContactUsHelpButtons"}));
		}
		
		
				

	});
});