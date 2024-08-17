sap.ui.define(
  [
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter",
    "sap/m/MessageBox",
    "sap/f/library",
  ],
  function (
    JSONModel,
    Controller,
    Filter,
    FilterOperator,
    Sorter,
    MessageBox,
    fioriLibrary
  ) {
    "use strict";

    return Controller.extend("flexso.controller.List", {
      onInit: function () {
        this.oRouter = this.getOwnerComponent().getRouter();
        

        var oView = this.getView();
        if(sessionStorage.getItem('status') != 'Organisator'){
            oView.byId("addEvent").setVisible(false);
      
        }
      },
      onListItemPress: function (oEvent) {
        var productPath = oEvent
            .getSource()
            .getBindingContext("eventModel")
            .getPath(),
          product = productPath.split("/").slice(-1).pop();

        this.oRouter.navTo("detail", {
          layout: fioriLibrary.LayoutType.TwoColumnsMidExpanded,
          eventID: product,
        });
      },
      onAddEventPress: function(oEvent) {
			    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			    oRouter.navTo("eventManager")
		  },
      onHandleLanguage: function () {
        var oResoureceModel = this.getView().getModel("i18n");
        if (oResoureceModel.sLocale == "nl") {
          this.onLanguageSwitchToEnglish();
        } else {
          this.onLanguageSwitchToDutch();
        }
      },
      onLanguageSwitchToEnglish: function () {
        var oResoureceModel = this.getView().getModel("i18n");
        oResoureceModel.sLocale = "en";
        sap.ui.getCore().getConfiguration().setLanguage("en");
        localStorage.setItem("language", "en");
        this.getView().getModel("i18n").refresh();
        window.onload = function () {
          window.location.reload();
        };
      },
      onLanguageSwitchToDutch: function () {
        var oResoureceModel = this.getView().getModel("i18n");
        oResoureceModel.sLocale = "nl";
        sap.ui.getCore().getConfiguration().setLanguage("nl");
        localStorage.setItem("language", "nl");
        this.getView().getModel("i18n").refresh();
      },
      onMenuAction: function (oEvent) {
        var oItem = oEvent.getParameter("item"),
          sItemPath = "";

        while (oItem instanceof MenuItem) {
          sItemPath = oItem.getText();
          oItem = oItem.getParent();
        }

        switch (sItemPath) {
          case "English":
            this.onLanguageSwitchToEnglish();
            window.location.reload();

            break;
          case "Dutch":
            this.onLanguageSwitchToDutch();
            window.location.reload();

            break;
        }
      },
    });
  }
);
