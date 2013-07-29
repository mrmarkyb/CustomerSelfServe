define(["dojo/_base/declare",
        "dojo/on",
        "dojo/_base/lang",
        "dojox/mobile/Opener",
        "dojox/mobile/Container",
        "dojox/mobile/EdgeToEdgeList",
        "dojox/mobile/ListItem",
        "dojox/mobile/EdgeToEdgeCategory"
       
       ], 
function(
       declare,
       on,
       lang,
       Opener,
       Container,
       EdgeToEdgeList,
       ListItem,
       EdgeToEdgeCategory
    ) {
  
    return declare("com.wcg.mobile.personal.AddressBookOverlay", [Opener], {
       
        id: "AddressBookOverlay",
        
        invokedByView: {},
        
        buildRendering: function() {
            this.inherited(arguments);
            this.domNode.appendChild(this.getAddressBookView().domNode);
        },
        
        getAddressBookView: function() {
            var container = new Container({"class" : "addressBookContainer"});
            var addresses = new EdgeToEdgeList();
            
            addresses.addChild(new EdgeToEdgeCategory({label: "M"}));
            addresses.addChild(this.getListItem({
                label : "Me",
                full: {
                    addressLine1: "16 Chase Avenue",
                    addressLine2: "Walton Park",
                    city: "Milton Keynes",
                    postcode: "MK5 7GH",
                    homePhone: "01908 456721",
                    mobilePhone: "07102 378945",
                    eMail: "ebishop@whiteclarkegroup.co.uk"
                }
            }));
            addresses.addChild(this.getListItem({
                label : "Dexter Morgan",
                full: {
                    addressLine1: "102 Engaine Close",
                    addressLine2: "Shenley Church End",
                    city: "Milton Keynes",
                    postcode: "MK12 7BD",
                    homePhone: "01908 578945",
                    mobilePhone: "07123 478454",
                    eMail: "dmorgan@whiteclarkegroup.co.uk"
                }
            }));
            addresses.addChild(new EdgeToEdgeCategory({label: "S"}));
            addresses.addChild(this.getListItem({
                label : "Jon Snow",
                full: {
                    addressLine1: "102 Engaine Close",
                    addressLine2: "Shenley Church End",
                    city: "Milton Keynes",
                    postcode: "MK12 7BD",
                    homePhone: "01908 578945",
                    mobilePhone: "07123 478454",
                    eMail: "dmorgan@whiteclarkegroup.co.uk"
                }
            }));
            addresses.addChild(this.getListItem({
                label : "Catelyn Stark",
                full: {
                    addressLine1: "102 Engaine Close",
                    addressLine2: "Shenley Church End",
                    city: "Milton Keynes",
                    postcode: "MK12 7BD",
                    homePhone: "01908 578945",
                    mobilePhone: "07123 478454",
                    eMail: "dmorgan@whiteclarkegroup.co.uk"
                }
            }));
            addresses.addChild(new EdgeToEdgeCategory({label: "W"}));
            addresses.addChild(this.getListItem({
                label : "Walter White",
                full: {
                    addressLine1: "4 Rosebay Close",
                    addressLine2: "Walnut Tree",
                    city: "Milton Keynes",
                    postcode: "MK7 7GH",
                    homePhone: "01908 312456",
                    mobilePhone: "07148 965132",
                    eMail: "WWhite@whiteclarkegroup.com"
                }
            }));
            
            container.addChild(addresses);
            
            return container;
        },
        
        getListItem: function(details) {
            var item = new ListItem(details);
            on(item.domNode, "click", lang.hitch(this, function(e) {
                this.returnFullDetails(item, e);
            }));
            return item;
        },
        
        returnFullDetails: function(item, e) {
            this.invokedByView.updateDetails(item.full);
            this.hide();
        }
        
        
        
        
    });
    
});