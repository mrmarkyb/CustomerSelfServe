define([ "dojo/_base/declare",
         "dojo/_base/window",
         "dojox/mobile/View",
         "dojox/mobile/IconMenu",
         "dojox/mobile/IconMenuItem",
         "dojox/mobile/Heading",
         "dojox/mobile/Pane",
         "dojox/mobile/ContentPane"],
    function(declare,
            window,
            View,
            IconMenu,
            IconMenuItem,
            Heading,
            Pane,
            ContentPane
            ) {

    return declare("com.wcg.mobile.ContractsMenuView", [ View ], {

        id: "ContractsMenuView",

        buildRendering: function() {

            this.inherited(arguments);
            var heading = new Heading({label: "Contract options"});

            //heading.addChild(new ContentPane({content:"", class:"contractTitleImage"}));
            this.addChild(heading);
            //this.addChild(new ContentPane({content: "TOOLTIP", "class": "tooltipPane"}));

            this.addChild(this.getIconMenu());
        },

        getIconMenu: function() {

            var menu = new IconMenu({
                  cols: 3, transition:"slide"
              }, "iconMenu");
              menu.startup();

              var item = new IconMenuItem({
                  label: "contract details<br><div class='subText'>view your contract, asset and <br>payment details</div>",
                  icon: "images/color_folder.png",
                  moveTo: "VehicleView"
              });
              menu.addChild(item);

              item = new IconMenuItem({
                  label: "make a payment<br><div class='subText'>make and additional payment if<br>your account in arrears</div>",
                  icon: "images/color_credit_card.png",
                  moveTo: "MakePaymentView"
              });
              menu.addChild(item);

              item = new IconMenuItem({
            	  label: "payment history<br><div class='subText'>view and print a summary of all<br>past payments</div>",
                  icon: "images/color_calendar.png",
                  moveTo: "PaymentDetailsView"
              });
              menu.addChild(item);

              item = new IconMenuItem({
            	  label: "statements<br><div class='subText'>view and print past statements<br>&nbsp</div>",
                  icon: "images/color_statement2.png",
                  moveTo: "StatementsView"
              });
              menu.addChild(item);

              item = new IconMenuItem({
                  label: "bank details<br><div class='subText'>view and modify your <br>direct debit details</div>",
                  icon: "images/color_wallet.png",
                  moveTo: "BankDetailsView"
              });
              menu.addChild(item);

/*              item = new IconMenuItem({
                  label: "payment history",
                  icon: "images/chart.png",
                  moveTo: "PaymentHistoryView"
              });
              menu.addChild(item);

              item = new IconMenuItem({
                  label: "transaction history",
                  icon: "images/chart.png",
                  moveTo: "TransactionHistoryView"
              });
              menu.addChild(item);*/

              item = new IconMenuItem({
                  label: "statement quote<br><div class='subText'>calculate the amount required to<br>settle your contract</div>",
                  icon: "images/color_calculator.png",
                  moveTo: "SettlementQuoteView"
              });
              menu.addChild(item);

/*              item = new IconMenuItem({
                  label: "finance options",
                  icon: "images/chart.png",
                  moveTo: "FinanceOptionsView"
              });
              menu.addChild(item);*/

              return menu;

      }


    });
});