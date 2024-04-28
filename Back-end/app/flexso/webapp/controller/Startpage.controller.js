
sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("flexso.controller.Startpage", {
            onInit: function () {
                // Initialiseer modellen met gegevens uit CSV-bestanden
        var eventsPath = sap.ui.require.toUrl("../../db/csv/my.event-Events.csv");
        var sessionsPath = sap.ui.require.toUrl("../../db/csv/my.event-Sessions.csv");
        // var usersPath = sap.ui.require.toUrl("../../db/csv/my.event-Users.csv");

        var eventsModel = new JSONModel(eventsPath);
        var sessionsModel = new JSONModel(sessionsPath);
        // var usersModel = new JSONModel(usersPath);

        // Stel de modellen in op de view
        this.getView().setModel(eventsModel, "events");
        this.getView().setModel(sessionsModel, "sessions");
        // this.getView().setModel(usersModel, "users");
            }
        });
    });

/*
sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel'
], function(Controller, JSONModel) {
"use strict";

return Controller.extend("Startpage.controller.App", {

    onInit: function() {
        // Initialiseer modellen met gegevens uit CSV-bestanden
        var eventsPath = sap.ui.require.toUrl("../../db/csv/my.event-Events.csv");
        var sessionsPath = sap.ui.require.toUrl("../../db/csv/my.event-Sessions.csv");
        // var usersPath = sap.ui.require.toUrl("../../db/csv/my.event-Users.csv");

        var eventsModel = new JSONModel(eventsPath);
        var sessionsModel = new JSONModel(sessionsPath);
        // var usersModel = new JSONModel(usersPath);

        // Stel de modellen in op de view
        this.getView().setModel(eventsModel, "events");
        this.getView().setModel(sessionsModel, "sessions");
        // this.getView().setModel(usersModel, "users");
    },

    handleBusyPress : function (oEvent) {
        var oTileContainer = this.byId("container"),
            bBusy = !oTileContainer.getBusy();

        oTileContainer.setBusy(bBusy);
        oEvent.getSource().setText(bBusy ? "Done" : "Busy state");
    },

    handleTileDelete : function (oEvent) {
        var oTile = oEvent.getParameter("tile");
        oEvent.getSource().removeTile(oTile);
    }
});

});

/* sap.ui.define([
    "sap/ui/core/mvc/Controller", 
    "sap/m/MessageToast", 
    "sap/ui/model/json/JSONModel",
    "d3-fetch" // Importeer de d3-fetch bibliotheek
],
function (Controller, JSONModel, d3) {
    "use strict";

    return Controller.extend("Startpage.controller.App", {
        onInit: function () {
            // Pad naar de CSV-bestanden
            const csvFilePaths = [
                "./db/csv/my.event-Events.csv",
                "./db/csv/my.event-Sessions.csv",
                "./db/csv/my.event-Users.csv"
            ];

            // Laad elk CSV-bestand afzonderlijk
            Promise.all(csvFilePaths.map(filePath => d3.csv(filePath)))
                .then(data => {
                    // Gegevens verwerken voor elk CSV-bestand
                    const [eventsData, sessionsData, usersData] = data;

                    // Maak JSON-modellen voor elke dataset en stel deze in op de weergave
                    const eventsModel = new JSONModel(eventsData);
                    this.getView().setModel(eventsModel, "events");

                    const sessionsModel = new JSONModel(sessionsData);
                    this.getView().setModel(sessionsModel, "sessions");

                    const usersModel = new JSONModel(usersData);
                    this.getView().setModel(usersModel, "users");
                })
                .catch(error => {
                    console.error("Error loading CSV-files:", error);
                });
        },

        
        /* // Testen of data wordt opgehaald
        logDataToConsole: function() {
            // Voorbeeld van het ophalen van gegevens uit een van de modellen
            const eventsModel = this.getView().getModel("events");
            const firstEvent = eventsModel.getProperty("/0"); // Eerste item in de dataset
            console.log(firstEvent);

            const sessionsModel = this.getView().getModel("sessions");
            const firstSession = sessionsModel.getProperty("/0"); // Eerste item in de dataset
            console.log(firstSession);

            const usersModel = this.getView().getModel("users");
            const firstUser = usersModel.getProperty("/0"); // Eerste item in de dataset
            console.log(firstUser);
        } 
    });
}); */


