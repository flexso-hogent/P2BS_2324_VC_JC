sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/ui/core/routing/History",
    "sap/ui/model/type/Date",
    "sap/ui/model/type/Time"
], function(Controller, JSONModel, MessageBox, History, DateType, TimeType) {
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
                lokaalnummer: ""
            };
            var oModel = new JSONModel(oSession);
            this.getView().setModel(oModel, "sessionForm");

            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("sessionManager").attachPatternMatched(this._onObjectMatched, this);
        },

		_onObjectMatched: function(oEvent) {
			var sSessionId = oEvent.getParameter("arguments").sessionId;
    if (sSessionId) {
		MessageBox.show("Received sessionID: " + sSessionId);
        this._loadSessionData(sSessionId);
    }
},
        _loadSessionData: function(sSessionId) {
            var oDataModel = this.getView().getModel("v2model");
            var sPath = "/Sessions('" + sSessionId + "')";
            oDataModel.read(sPath, {
                success: function(oData) {
                    var oModel = this.getView().getModel("sessionForm");
                    oModel.setData(oData);
                }.bind(this),
                error: function(oError) {
                    MessageBox.error("Error loading session data");
                }
            });
        },

        handleSessionSavePress: function() {
            var oFormData = this.getView().getModel("sessionForm").getData();

            var oTimeType = new TimeType({ pattern: "HH:mm:ss" });

            var oDateType = new sap.ui.model.type.Date({pattern: "yyyy-MM-dd"});

            oFormData.datum = oDateType.formatValue(oFormData.datum, "string");
            
            oFormData.beginTijd = new Date(oFormData.beginTijd).toTimeString;
            oFormData.eindTijd = new Date(oFormData.eindTijd).toTimeString;

            var oDataModel = this.getView().getModel("v2model");

            if (oFormData.id) {
                var sPath = "/Sessions('" + oFormData.id + "')";
                oDataModel.update(sPath, oFormData, {
                    success: function() {
                        MessageBox.success("Session was updated successfully");
                        this._navBack();
                    }.bind(this),
                    error: function() {
                        MessageBox.error("Error while updating the session");
                    }
                });
            } else {
                oDataModel.create("/Sessions", oFormData, {
                    success: function() {
                        MessageBox.success("Session was created successfully");
                        this._navBack();
                    }.bind(this),
                    error: function() {
                        MessageBox.error("Error while creating the session");
                    }
                });
            }
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
                oRouter.navTo("eventManager", {}, true);
            }
        }
    });
});
