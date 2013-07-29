define([ "dojox/mobile/parser", "dojox/mobile", "dojox/mobile/compat",
        "dojo/_base/declare", "dojox/mobile/View", "dojox/mobile/RoundRect",
        "dojox/mobile/ContentPane","dojox/mobile/Heading","dijit/registry", "dojo/on", "dojo/_base/lang", "dojox/mobile/Heading", "dojox/mobile/Container"


], function(parser, mobile, compat, declare, View, RoundRect, ContentPane, Heading, registry, on, lang, Heading, Container) {

    return declare("com.wcg.mobile.MapView", [View ], {
        id:"MapView",
        buildRendering : function() {

            this.inherited(arguments);
            this.heading = new Heading({label: "Find a Dealer"});
            this.addChild(this.heading);
            this.geocoder = new google.maps.Geocoder();
            this.mapsNode = new Container({id: "MapNode"});
            this.addChild(this.mapsNode);
            
        },
        
        postCreate: function(){
            var latlng = new google.maps.LatLng(52.058032,-0.765953);
            this.options = {
              zoom:11,
              center: latlng,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            
            on(this, "BeforeTransitionIn", lang.hitch(this, function(event) {
                    this.heading.set("back", "Back");
                    this.heading.set("moveTo", this.movedFrom);
                    this.heading.backButton.back = false;
            }));
            
        },
        
        openMap: function(address, that){
            //if (document.getElementById("map")){
                if (typeof wcg_app_gmap === "undefined"){
                wcg_app_gmap = new google.maps.Map(this.mapsNode.containerNode, this.options);
                }
            //}
            
            this.geocoder.geocode({'address': address}, function(results, status) {
              if (status == google.maps.GeocoderStatus.OK) {
                  wcg_app_gmap.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: wcg_app_gmap, 
                    position: results[0].geometry.location
                });
                
              } else {
                alert("Geocode was not successful for the following reason: " + status);
              }
            });
            
            if (registry.byId("AlertsView")) {
                registry.byId("AlertsView").performTransition(this.id,1,"slide");
            }
            else {
                that.performTransition(this.id,1,"slide");
            }
        }
        
    });
});
    