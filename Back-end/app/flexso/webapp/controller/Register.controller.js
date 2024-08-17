sap.ui.define(
    [
      "sap/ui/core/mvc/Controller",
      "sap/ui/model/json/JSONModel",
      "sap/m/MessageBox",
    ],
    function (Controller, JSONModel, MessageBox) {
      "use strict";
  
      return Controller.extend("flexso.controller.Register", {
        onInit: function () {
          var oRegistreer = {
            mail: "",
            voornaam: "",
            achternaam: "",
            bedrijf: "",
            titel: "",
            stad: "",
            wachtwoord: "",
            herhaalWachtwoord: ""
          };
  
          var oModel = new JSONModel(oRegistreer);
          this.getView().setModel(oModel, "form");
        },
  
        validateForm: function (formData) {
          for (var key in formData) {
            if (formData.hasOwnProperty(key)) {
              if (!formData[key] && key !== "herhaalWachtwoord") {
                return false;
              }
            }
          }
          return true;
        },
  
        onRegister: function () {
          var oForm = this.getView().getModel("form").getData();
          var sHerhaalWachtwoord = oForm.herhaalWachtwoord;
  
          if (!this.validateForm(oForm)) {
            MessageBox.error("Please fill in all fields");
            this._clearPasswordFields();
            return;
          }
  
          var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(oForm.mail)) {
            MessageBox.error("Please enter a valid email address. Example: test@example.com");
            this._clearPasswordFields();
            return;
          }
  
          if (oForm.wachtwoord !== sHerhaalWachtwoord) {
            MessageBox.error("Passwords do not match! Please try again.");
            this._clearPasswordFields();
            return;
          }
  
          var oDataModel = this.getView().getModel("v2model");
          var oData = {
            mail: oForm.mail,
            voornaam: oForm.voornaam,
            achternaam: oForm.achternaam,
            bedrijf: oForm.bedrijf,
            titel: oForm.titel,
            stad: oForm.stad,
            wachtwoord: oForm.wachtwoord,
            rol: "user"
          };
          var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
  
          oDataModel.create("/Users", oData, {
            success: function () {
              MessageBox.success(oResourceBundle.getText("registerenGelukt"));
              var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
              oRouter.navTo("login");
            },
            error: function (oError) {
              MessageBox.error("Registration failed. Please try again.");
            }
          });
        },
  
        onBack: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("login");
        },
  
        _clearPasswordFields: function () {
          this.getView().byId("wachtwoord").setValue("");
          this.getView().byId("herhaalWachtwoord").setValue("");
        }
      });
    }
  );
  