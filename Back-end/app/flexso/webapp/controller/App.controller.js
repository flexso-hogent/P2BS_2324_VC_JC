sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Item"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, UIComponent, Filter, FilterOperator, Item, MessageToast) {
        "use strict";

        return Controller.extend("flexso.controller.App", {
            
            onEventClick: function (oEvent) {
                var oItem = oEvent.getSource();
                var sEventID = oItem.getBindingContext().getProperty("eventID");
                
               // MessageToast.show("Navigating to Event ID: " + sEventID);

                // Navigeer naar de nieuwe view, geef de eventID door
                var oRouter = UIComponent.getRouterFor(this);
                oRouter.navTo("RouteEvent", {
                    eventID: sEventID
                });
            },

            onLocationChange: function (oEvent) {
                var sSelectedKey = oEvent.getParameter("selectedItem").getKey();
                var oHBox = this.byId("eventsHBox");
                var oBinding = oHBox.getBinding("items");
        
                if (sSelectedKey === "All") {
                    oBinding.filter([]); // Geen filter als "All" is geselecteerd
                } else {
                    var oFilter = new Filter("locatie", FilterOperator.EQ, sSelectedKey);
                    oBinding.filter([oFilter]);
                }
            },
    
            onSortChange: function (oEvent) {
                var sSelectedKey = oEvent.getParameter("selectedItem").getKey();
                var oHBox = this.byId("eventsHBox");
                var oBinding = oHBox.getBinding("items");
    
                var bDescending = (sSelectedKey === "Descending");
                var oSorter = new Sorter("naam", bDescending);
                oBinding.sort([oSorter]);
            },
            onSearch: function (oEvent) {
                var sQuery = oEvent.getParameter("query");
                var oHBox = this.byId("eventsHBox");
                var oBinding = oHBox.getBinding("items");
    
                var oFilter = new Filter("eventName", FilterOperator.Contains, sQuery);
                oBinding.filter([oFilter]);
            },
    
        });
    });

