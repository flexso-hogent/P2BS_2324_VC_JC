sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v4/ODataModel"
], function (Controller, ODataModel) {
    "use strict";

    return Controller.extend("flexso.controller.Startpage", {
        onInit: function () {
            var sServiceUrl = "/odata/v2/event/"; // Het pad naar je OData-service
            var oModel = new ODataModel(sServiceUrl); // Stel het model in
            this.getView().setModel(oModel, "events"); // Verbind het model aan de view
        }
    });
});

