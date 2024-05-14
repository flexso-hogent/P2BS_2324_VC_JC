sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, UIComponent) {
        "use strict";

        return Controller.extend("flexso.controller.App", {

            onLoginPress: function() {
                var username = this.getView().byId("usernameInput").getValue();
                var password = this.getView().byId("passwordInput").getValue();
                console.log(username,password)
            }
        });
    });