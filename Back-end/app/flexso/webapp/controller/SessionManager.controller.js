sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox"
], function(Controller, JSONModel, MessageBox) {
	"use strict";

	return Controller.extend("flexso.controller.SessionManager", {
		onInit: function() {
			var oSession = {
				
				naam: "",
				type: "",
				beschrijving: "",
				spreker: "",
				datum: null,
				beginTijd: null,
				eindTijd: null,
				lokaalnummer: "",
				//event_eventID: ""
			};
			var oModel = new JSONModel(oSession);
			this.getView().setModel(oModel, "sessionForm");
		},
		handleSessionSavePress: function() {
			var oFormData = this.getView().getModel("sessionForm").getData();
			oFormData.naam = new String(oFormData.naam);
			oFormData.type = new String(oFormData.type);
            oFormData.beschrijving = new String(oFormData.beschrijving);
			oFormData.spreker = new String(oFormData.spreker);
			oFormData.datum = new Date(oFormData.datum).toDateString;
			oFormData.beginTijd = (oFormData.begintijd);
			oFormData.eindTijd = (oFormData.eindtijd);
			oFormData.lokaalnummer = new String(oFormData.lokaalnummer);

			var oDataModel = this.getView().getModel("v2model");

			oDataModel.create("/Sessions", oFormData, {
				success: function(data, response) {
					MessageBox.success("Session was created successfully");
				},
				error: function(error) {
					MessageBox.error("Error while creating the session");
				}
			});
		}
	});
});
