sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent"
], function(Controller, UIComponent) {
    "use strict";

    return Controller.extend("flexso.controller.Detail", {
        onInit: function () {
            
            
            var oOwnerComponent = this.getOwnerComponent();
            
            this.oRouter = oOwnerComponent.getRouter();
            this.oModel = oOwnerComponent.getModel();

            this.oRouter.getRoute("list").attachPatternMatched(this._onProductMatched, this);
            this.oRouter.getRoute("detail").attachPatternMatched(this._onProductMatched, this);

            var oView = this.getView();

            if(sessionStorage.getItem('status') != 'Organisator'){
                oView.byId("addSession").setVisible(false);
                oView.byId("editEvent").setVisible(false);
                oView.byId("deleteEvent").setVisible(false);
            }
          },

        _onProductMatched: function (oEvent) {// bind with correct item
              
              this._event = oEvent.getParameter("arguments").eventID || this._event|| "Event(1)" 
              this.getView().bindElement({
                path: "/" + this._event,
                model: "eventModel"
              });

            },

        onAddSessionPress: function() {
            // Haal het geselecteerde evenementID op
            var sEventID = this._event;
        
            // Doorverwijzing naar SessionManager om een nieuwe sessie toe te voegen
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("sessionManager", {
                eventID: sEventID // Voeg het geselecteerde evenementID toe als parameter
            });
        },

        onEditSessionPress: function() {
            // Ophalen van de geselecteerde sessie voor bewerking
            var oSelectedSession = this.getView().getModel("v2model").getProperty("/SelectedSession");

            // Controleer of een sessie is geselecteerd
            if (oSelectedSession) {
                // Doorverwijzing naar de SessionEditor-view voor het bewerken van de sessie
                var oRouter = UIComponent.getRouterFor(this);
                oRouter.navTo("SessionEditor", {
                    sessionId: oSelectedSession.id // Stuur de sessie-id mee naar de bewerkingsweergave
                });
            } else {
                // Toon een melding aan de gebruiker dat er geen sessie is geselecteerd
                sap.m.MessageToast.show("First select a session to edit");
            }
        },

        onDeleteSessionPress: function() {
            // Ophalen van de geselecteerde sessie voor verwijdering
            var oEventModel = this.getView().getModel("v2model"); // Verwijzing naar v2model
            var oSelectedSession = oEventModel.getProperty("/SelectedSession");
            
            console.log("Selected Session:", oSelectedSession); // Controleer de geselecteerde sessie
            
            // Controleer of een sessie is geselecteerd
            if (oSelectedSession) {
                // Implementeer logica voor het verwijderen van de sessie
                var aSessions = this.getView().byId("ObjectPageLayout").getModel().getProperty("/Sessions");
            
                // Zoek de index van de geselecteerde sessie
                var nIndex = aSessions.findIndex(function(session) {
                    return session.id === oSelectedSession.id;
                });
            
                // Verwijder de sessie uit de array
                if (nIndex > -1) {
                    aSessions.splice(nIndex, 1);
            
                    // Update het model om de verwijderde sessie uit de weergave te verwijderen
                    this.getView().byId("ObjectPageLayout").getModel().setProperty("/Sessions", aSessions);
            
                    // Toon een bevestigingsbericht aan de gebruiker
                    sap.m.MessageToast.show("Session deleted successfully");
                }
            } else {
                // Toon een melding aan de gebruiker dat er geen sessie is geselecteerd
                sap.m.MessageToast.show("First select a session to delete");
            }
        }        
        ,
        onSessionSelect: function(oEvent) {
            var oSelectedItem = oEvent.getSource();
            var oContext = oSelectedItem.getBindingContext("eventModel");
            
            if (oContext) {
                var oSelectedSession = oContext.getObject();
                
                // Stel de geselecteerde sessie in het v2model in
                var oEventModel = this.getView().getModel("v2model");
                if (oEventModel) {
                    var sPath = oContext.getPath();
                    oEventModel.setProperty(sPath + "/SelectedSession", oSelectedSession);
                    oEventModel.updateBindings();
                } else {
                    console.error("Model 'v2model' is not available.");
                }
            } else {
                console.error("No binding context found for eventModel.");
            }
        },
        onRegisterParticipant: function(oEvent) {
            var oSelectedItem = oEvent.getSource();
            var oContext = oSelectedItem.getBindingContext("eventModel");
            if (oContext) {
                var oSelectedSession = oContext.getObject();
                
                // Haal het e-mailadres van de ingelogde gebruiker op
                var sUserId = sap.ushell.Container.getService("UserInfo").getId();
                
                var aParticipants = oSelectedSession.participants || [];
                if (!aParticipants.includes(sUserId)) {
                    aParticipants.push(sUserId);
                    // Update de lijst van ingeschreven deelnemers in het model
                    oEventModel.setProperty(oContext.getPath() + "/participants", aParticipants);
                    oEventModel.updateBindings();
                    // Geef een bevestiging aan de gebruiker
                    sap.m.MessageToast.show("You are successfully registered for this session.");
                } else {
                    sap.m.MessageToast.show("You are already registered for this session.");
                }
            }
        },

        onShowParticipantsList: function() {
            var oSelectedSession = this.getView().getModel("v2model").getProperty("/SelectedSession");
            if (oSelectedSession) {
                var aParticipants = oSelectedSession.participants || [];
                // Toon de lijst van ingeschreven deelnemers
                if (aParticipants.length > 0) {
                    // Vernieuw de lijst in de weergave
                    this.byId("participantsList").getModel().setProperty("/participants", aParticipants);
                } else {
                    // Toon een melding als er geen deelnemers zijn ingeschreven
                    sap.m.MessageToast.show("Er zijn geen deelnemers ingeschreven voor deze sessie.");
        }
            }
        },
        onExit: function () {
            this.oRouter.getRoute("list").detachPatternMatched(this._onProductMatched, this);
            this.oRouter.getRoute("detail").detachPatternMatched(this._onProductMatched, this);
        }
    });
});
