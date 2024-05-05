sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("flexso.controller.EventManager", {
        onInit: function () {
            var oModel = new JSONModel({
                newEvent: {
                    naam: "",
                    beschrijving: "",
                    datum: null,
                    locatie: "",
                    sessions: []
                }
            });
            this.getView().setModel(oModel);
        },

        onAddSession: function () {
            var oModel = this.getView().getModel();
            var aSessions = oModel.getProperty("/newEvent/sessions");

            aSessions.push({
                naam: "",
                beschrijving: "",
                spreker: "",
                datum: null,
                lokaalnummer: ""
            });

            oModel.setProperty("/newEvent/sessions", aSessions);
            MessageToast.show("Session added.");
        },

        onDeleteSession: function (oEvent) {
            var oModel = this.getView().getModel();
            var aSessions = oModel.getProperty("/newEvent/sessions");
            var oItem = oEvent.getParameter("listItem");
            var iIndex = oItem.getBindingContext().getPath().split("/").pop();

            aSessions.splice(iIndex, 1);
            oModel.setProperty("/newEvent/sessions", aSessions);
            MessageToast.show("Session deleted.");
        },

        onSaveEvent: function () {
            var oModel = this.getView().getModel();
            var oEvent = oModel.getProperty("/newEvent");

            MessageToast.show("Event saved: " + JSON.stringify(oEvent));
        },

        onNavBack: function () {
            var oHistory = sap.ui.core.routing.History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.back();
            } else {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("home", {}, true);
            }
        }
    });
});
