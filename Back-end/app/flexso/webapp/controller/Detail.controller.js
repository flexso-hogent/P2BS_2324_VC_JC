sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent"
], function(Controller, UIComponent) {
    "use strict";

    return Controller.extend("flexso.controller.Detail", {
        onInit: function () {
            var oRouter = this.getOwnerComponent().getRouter();
        },

        onAddSessionPress: function() {
            // Doorverwijzing naar SessionManager om een nieuwe sessie toe te voegen
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("SessionManager");
        },

        onEditSessionPress: function() {
            // Ophalen van de geselecteerde sessie voor bewerking
            var oSelectedSession = this.getView().byId("ObjectPageLayout").getModel().getProperty("/SelectedSession");

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
            var oSelectedSession = this.getView().byId("ObjectPageLayout").getModel().getProperty("/SelectedSession");
        
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
        
    });
});
