sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, UIComponent, MessageBox) {
        "use strict";

        return Controller.extend("flexso.controller.App", {

            onInit: function(){
                sessionStorage.clear();
                if(sessionStorage.getItem('user')){
                    //TODO: route to start page if a user is already in storage
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    oRouter.navTo("account")
                }
            },

            onLoginPress: function() {
                var username = this.getView().byId("usernameInput").getValue();
                var password = this.getView().byId("passwordInput").getValue();
                this.checkMail(username,password);
                console.log(sessionStorage.getItem('user'),sessionStorage.getItem('status'))
                
            },

            checkMail: function(mail,password) {
                console.log(mail, password);
                var oModel = this.getOwnerComponent().getModel("v2model");
                var sUrl = `/Users(mail='${mail}')`;
                var mailExists = false;
                var that = this;
                
                oModel.read(sUrl,{
                    success: function(oData) {
                        mailExists = true;
                        
                        if(password == oData.voornaam){
                            sessionStorage.setItem('user',mail);
                            sessionStorage.setItem('status',oData.rol);
                            //TODO: route to startpage after succesfully logging in
                            var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
                            oRouter.navTo("account")
                        }else{
                            //TODO: show error wrong login information, messagetoast?
                            sap.m.MessageToast.show("Try again");;
                        }
                    },
                    error: function(oError){
                        //TODO: show error wrong login information, messagetoast?
                        MessageBox.error("Error");
                    }
                 })
              
              
            }

        });
    });