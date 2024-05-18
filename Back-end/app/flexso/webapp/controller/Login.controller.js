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

            onInit: function(){
                //TODO: route to start page if sessionStorage already contains user info
            },

            onLoginPress: function() {
                var username = this.getView().byId("usernameInput").getValue();
                var password = this.getView().byId("passwordInput").getValue();
                this.checkMail(username,password);
                console.log(sessionStorage.getItem('user'),sessionStorage.getItem('status'))
                
            },

            checkMail: function(mail,password) {
                var oModel = this.getOwnerComponent().getModel("v2model");
                var sUrl = `/Users(mail='${mail}')`;
                var mailExists = false;
                
                
                oModel.read(sUrl,{
                    success: function(oData) {
                        mailExists = true;
                        
                        if(password == oData.voornaam){
                            sessionStorage.setItem('user',mail);
                            sessionStorage.setItem('status',oData.rol);
                            //TODO: route to the next page

                        }else{
                            //TODO: show error, messagetoast?
                        }
                    },
                    error: function(oError){
                        mailExists = false;
                    }
                 })
              
              
            }

        });
    });