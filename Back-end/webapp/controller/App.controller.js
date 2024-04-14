sap.ui.define([
    "sap/ui/core/mvc/Controller", "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast) {
        "use strict";

        return Controller.extend("flexso.controller.App", {
            onInit: function () {},
            onPress: function (evt) {
                MessageToast.show(evt.getSource().getId() + " Pressed");
            },
        });
    }
);
