define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/dom-class",
         "dojo/_base/window",
         "dojo/query",
         "dojox/mobile/View",
         "dojox/mobile/TextBox",
         "dojox/mobile/Container",
         "dojox/mobile/Pane",
         "dojox/mobile/Accordion",
         "dojox/mobile/Heading"],
    function(declare, lang, domClass, window, query, View, TextBox, Container, Pane, Accordion, Heading) {

    return declare("com.wcg.mobile.FaqsView", [ View ], {

        id: "FaqsView",

        buildRendering: function() {
            this.inherited(arguments);

            this.heading = new Heading({label: "FAQs"});
            this.addChild(this.heading);
            
            this.addChild(this.getFAQs());
        },

        getFAQs: function() {
            var accordian = new Accordion({ id: "FAQs" });
            accordian.startup();
            accordian.addChild(this.getFAQ("What supporting documents do I need to change my address?",
                    "The following can be used as proof for change of address,</br><ul><li>Bank statement</li><li>Utility bill</li></ul>"));
            accordian.addChild(this.getFAQ("How do I change my password?",
            "Passwords can be changed by clicking your user name in the top right corner of the screen."));
            accordian.addChild(this.getFAQ("Can I make payments by credit card?",
            "Credit card payments can be made when an account is in arrears and you have been informed by us that you need to make a payment. Regular payments should be made using direct debit."));
            accordian.addChild(this.getFAQ("How do I update the bank account details used for my payments?",
            "In the left hand menu expand the 'my contracts' option. Choose the contract on which you would like to modify the payment details. Click on the 'bank details' options icon. Modify your banking details and click submit."));

            return accordian;
        },

        getFAQ: function(question, answer) {
            var pane = new Pane({
                label: question
            });
            pane.containerNode.innerHTML = answer;
            return pane;
        }


    });
});