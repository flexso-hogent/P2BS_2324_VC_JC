sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/core/Fragment",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, UIComponent, MessageBox, Fragment) {
        "use strict";

        return Controller.extend("flexso.controller.Login", {

            onInit: function(){
                var sLanguage = localStorage.getItem("language") || "nl"; // Standaard naar Nederlands
                sap.ui.getCore().getConfiguration().setLanguage(sLanguage);
            },

            onLoginPress: function() {
                var username = this.getView().byId("usernameInput").getValue();
                var password = this.getView().byId("passwordInput").getValue();
                this.checkMail(username,password);                
            },

            checkMail: function(mail,password) {
                var oModel = this.getOwnerComponent().getModel("v2model");
                var sUrl = `/Users(mail='${mail}')`;
                var mailExists = false;
                var that = this;
                
                oModel.read(sUrl,{
                    success: function(oData) {
                        mailExists = true;
                        
                        if(password == oData.wachtwoord){
                            console.log("login success");
                            sessionStorage.setItem('user',mail);
                            sessionStorage.setItem('status',oData.rol);
                            
                            var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
                            oRouter.navTo("account")
                        }else{
                            
                            sap.m.MessageToast.show("Incorrect password");;
                        }
                    },
                    error: function(oError){
                        
                        MessageBox.error("Incorrect username");
                    },
                 })
            },
            onRegister: function () {
                var oRouter = UIComponent.getRouterFor(this);
                oRouter.navTo("register");
              },

              onHandleLanguage: function () {
                var oResoureceModel = this.getView().getModel("i18n");
                if (oResoureceModel.sLocale == "nl") {
                  this.onLanguageSwitchToEnglish();
                } else {
                  this.onLanguageSwitchToDutch();
                }
              },
              onPress: function () {
                var oView = this.getView(),
                  oButton = oView.byId("button");
        
                  if (!this._oMenuFragment) {
                    this._oMenuFragment = sap.ui.xmlfragment(oView.getId(), "flexso.view.Menu", this);
                    this.getView().addDependent(this._oMenuFragment);
                  }
                  this._oMenuFragment.openBy(oButton);
                  
              },
              onMenuAction: function (oEvent) {
                var oItem = oEvent.getParameter("item"),
                  sItemPath = "";
        
                while (oItem instanceof sap.m.MenuItem) {
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
        });
    });