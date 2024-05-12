sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox"
], function(Controller, JSONModel, MessageBox) {
	"use strict";

	return Controller.extend("flexso.controller.SessionManager", {
		onInit: function() {
			var oSession = {
				sessieID: "",
				naam: "",
				type: "",
				beschrijving: "",
				spreker: "",
				datum: null,
				begintijd: null,
				eindtijd: null,
				lokaalnummer: "",
				event_eventID: ""
			};
			var oModel = new JSONModel(oSession);
			this.getView().setModel(oModel, "sessionForm");
		},
		handleSessionSavePress: function() {
			var oFormData = this.getView().getModel("sessionForm").getData();
			oFormData.datum = new Date(oFormData.datum);
			oFormData.begintijd = new Date(oFormData.begintijd);
			oFormData.eindtijd = new Date(oFormData.eindtijd);

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
