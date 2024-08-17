sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
  ], function(Controller, History) {
    "use strict";
  
    return Controller.extend("flexso.controller.SessionDetail", {
  
      onInit: function() {
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.getRoute("sessionDetail").attachPatternMatched(this._onObjectMatched, this);
      },
  
      _onObjectMatched: function(oEvent) {
        var sObjectId = oEvent.getParameter("arguments").sessieID;
        this.getView().bindElement({
          path: "/Sessions(" + sObjectId + ")"
        });
      },
  
      onNavBack: function() {
        var oHistory = History.getInstance();
        var sPreviousHash = oHistory.getPreviousHash();
  
        if (sPreviousHash !== undefined) {
          window.history.go(-1);
        } else {
          var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
          oRouter.navTo("home", {}, true);
        }
      }
  
    });
  });
  