sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox"
], function(Controller, JSONModel, MessageBox) {
	"use strict";

	return Controller.extend("flexso.controller.EventManager", {
		onInit: function() {
			var oEvent = {
				eventID: "",
				name: "",
				description: "",
				date: null,
				startTime: null,
				endTime: null,
				location: ""
			};
			var oModel = new JSONModel(oEvent);
			this.getView().setModel(oModel, "eventForm");
		},
		handleEventSavePress: function() {
			var oFormData = this.getView().getModel("eventForm").getData();
			oFormData.naam = new String(oFormData.naam);
            oFormData.beschrijving = new String(oFormData.beschrijving);
            oFormData.datum = new Date(oFormData.datum);
			oFormData.begintijd = new Time(oFormData.begintijd);
			oFormData.eindtijd = new Time(oFormData.eindtijd);
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
            // Doorverwijzing naar SessionManager om een nieuwe sessie toe te voegen
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("sessionManager");
        }
	});
});
