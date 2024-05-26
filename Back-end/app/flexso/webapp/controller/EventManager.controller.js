sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/ui/core/routing/History",
	"sap/ui/model/type/Date"
], function(Controller, JSONModel, MessageBox, History) {
    "use strict";

    return Controller.extend("flexso.controller.EventManager", {
        onInit: function() {
            var oEvent = {
                naam: "",
                beschrijving: "",
                datum: null,
                beginTijd: null,
                eindTijd: null,
                locatie: ""
            };
            var oModel = new JSONModel(oEvent);
            this.getView().setModel(oModel, "eventForm");
        },
        handleEventSavePress: function() {
            var oFormData = this.getView().getModel("eventForm").getData();
            oFormData.naam = new String(oFormData.naam);
            oFormData.beschrijving = new String(oFormData.beschrijving);
            
			var oDateType = new sap.ui.model.type.Date({pattern: "yyyy-MM-dd"});

            oFormData.datum = oDateType.formatValue(oFormData.datum, "string");


            oFormData.beginTijd = new Date(oFormData.beginTijd).toTimeString;
            oFormData.eindTijd = new Date(oFormData.eindTijd).toTimeString;
            
			oFormData.locatie = new String(oFormData.locatie);

            var oDataModel = this.getView().getModel("v2model");

            oDataModel.create("/Events", oFormData, {
                success: function(data, response) {
                    MessageBox.success("Event was created successfully");
                },
                error: function(error) {
                    MessageBox.error("Error while creating the event");
                }
            });
        },
        onAddSessionPress: function() {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("sessionManager");
        },
        handleCancelPress: function() {
            this._navBack();
        },
        _navBack: function() {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("account", {}, true);
            }
        }
    });
});
