define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/dom-class",
         "dojo/dom-construct",
         "dojo/_base/window",
         "dojo/query",
         "dojox/mobile/Container"
         ],
    function(declare, lang, domClass, domConstruct, window, query, Container) {

    return declare("com.wcg.mobile.help.HelpButtons", [ Container ], {


        buildRendering: function() {
            this.inherited(arguments);

            var phoneContainer = new Container({"class" : "HelpButtons"});
            phoneContainer.containerNode.appendChild(domConstruct.create("a", {
                href: 'tel:01908264789'
            }));

            phoneContainer.containerNode.children[0].appendChild(domConstruct.create("img", { src: "images/color_phone.png" }));
            //phoneContainer.containerNode.children[0].appendChild(domConstruct.create("div", { innerHTML:"01908 264789" }));

            var skypeContainer = new Container({"class" : "HelpButtons"});

            skypeContainer.containerNode.appendChild(domConstruct.create("a", {
                href: 'skype:echo123?call'
            }));
            skypeContainer.containerNode.children[0].appendChild(domConstruct.create("img", { src: "images/skype.png" }));
            //skypeContainer.containerNode.children[0].appendChild(domConstruct.create("div", { innerHTML:"WCG_Calms" }));

            var emailContainer = new Container({"class" : "HelpButtons"});
            emailContainer.containerNode.appendChild(domConstruct.create("a", {
                href: 'mailto:support@whiteclarkegroup.com'
            }));
            emailContainer.containerNode.children[0].appendChild(domConstruct.create("img", { src: "images/color_email.png" }));
            //emailContainer.containerNode.children[0].appendChild(domConstruct.create("div", { innerHTML: "support@whiteclarkegroup.com" }));

            this.addChild(phoneContainer);
            this.addChild(skypeContainer);
            this.addChild(emailContainer);
        }


    });
});