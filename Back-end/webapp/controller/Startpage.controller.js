// sap.ui.define([
//     "sap/ui/core/mvc/Controller",
// ],
//     /**
//      * @param {typeof sap.ui.core.mvc.Controller} Controller
//      */
//     function (Controller) {
//         "use strict";

//         return Controller.extend("flexso.controller.Startpage", {
//             onInit: function () {},
//         });
//     }
// );

// // In de controller
// sap.ui.define([
//     "sap/ui/core/mvc/Controller",
//     "sap/ui/model/json/JSONModel"
// ], function(Controller, JSONModel) {
//     "use strict";

//     return Controller.extend("helloworld.controller.App", {
//         onInit: function() {
//             // Mockdata voor evenementen, sessies en gebruikers
//             var eventData = [
//                 { eventID: 1, naam: 'Conferentie over Kunstmatige Intelligentie', beschrijving: 'Een conferentie gewijd aan de nieuwste ontwikkelingen op het gebied van AI.', datum: '2024-06-15T09:00', locatie: 'Gent' },
//                 { eventID: 2, naam: 'Workshop over Machine Learning', beschrijving: 'Een praktische workshop om de basis van machine learning te leren.', datum: '2024-06-25T13:00', locatie: 'Gent' },
//                 { eventID: 3, naam: 'Data Science Summit', beschrijving: 'Een bijeenkomst van experts om de laatste trends en toepassingen in data science te bespreken.', datum: '2024-06-20T10:00:00Z', locatie: 'Aalst' }
//             ];

//             var sessionData = [
//                 { sessieID: 1, naam: 'Introductie tot AI', beschrijving: 'Een introductie tot de basisconcepten van kunstmatige intelligentie.', spreker: 'John Doe', datum: '2024-06-15T09:00', lokaalnummer: 'A2', eventID: 1 },
//                 { sessieID: 2, naam: 'Toepassingen van ML in de industrie', beschrijving: 'Een diepgaande analyse van machine learning-toepassingen in verschillende industrieën.', spreker: 'Jane Smith', datum: '2024-06-15T10:00', lokaalnummer: 'A4', eventID: 1 },
//                 { sessieID: 3, naam: 'Machine Learning in de gezondheidszorg', beschrijving: 'Een verkenning van machine learning-toepassingen in de medische sector.', spreker: 'Alice Johnson', datum: '2024-06-15T10:00', lokaalnummer: 'A1', eventID: 1 },
//                 { sessieID: 4, naam: 'Introductie tot neurale netwerken', beschrijving: 'Een overzicht van de basisprincipes en toepassingen van neurale netwerken.', spreker: 'David Brown', datum: '2024-06-25T13:00', lokaalnummer: 'B1', eventID: 2 },
//                 { sessieID: 5, naam: 'Praktische toepassingen van deep learning', beschrijving: 'Een hands-on workshop over het implementeren van deep learning-modellen.', spreker: 'Emma Wilson', datum: '2024-06-25T14:00', lokaalnummer: 'B2', eventID: 2 },
//                 { sessieID: 6, naam: 'Machine Learning Operations (MLOps) best practices', beschrijving: 'Een bespreking van best practices voor het beheren van machine learning-modellen in productie.', spreker: 'Michael Lee', datum: '2024-06-25T15:00', lokaalnummer: 'B3', eventID: 2 },
//                 { sessieID: 7, naam: 'Big Data-analyse in de zakelijke omgeving', beschrijving: 'Een analyse van hoe big data de besluitvorming in bedrijven beïnvloedt.', spreker: 'Sophia Garcia', datum: '2024-06-20T10:00', lokaalnummer: 'C1', eventID: 3 },
//                 { sessieID: 8, naam: 'Data Mining in actie', beschrijving: 'Een demonstratie van data mining-technieken en -tools.', spreker: 'Daniel Martinez', datum: '2024-06-20T11:00', lokaalnummer: 'C2', eventID: 3 },
//                 { sessieID: 9, naam: 'Data Science in de financiële sector', beschrijving: 'Een verkenning van data science-toepassingen in de financiële dienstverlening.', spreker: 'Olivia Adams', datum: '2024-06-20T12:00', lokaalnummer: 'C3', eventID: 3 }
//             ];

//             var userData = [
//                 { mail: 'john.doe@example.com', voornaam: 'John', achternaam: 'Doe', bedrijf: 'XYZ Corp', titel: 'Data Scientist', stad: 'Antwerpen', rol: 'Deelnemer' },
//                 { mail: 'jane.smith@example.com', voornaam: 'Jane', achternaam: 'Smith', bedrijf: 'ABC Inc', titel: 'Machine Learning Engineer', stad: 'Gent', rol: 'Organisator' },
//                 { mail: 'emily.johnson@example.com', voornaam: 'Emily', achternaam: 'Johnson', bedrijf: 'Data Insights Ltd', titel: 'Data Analyst', stad: 'Hasselt', rol: 'Deelnemer' },
//                 { mail: 'michael.brown@example.com', voornaam: 'Michael', achternaam: 'Brown', bedrijf: 'BlockTech Solutions', titel: 'Blockchain Developer', stad: 'Brugge', rol: 'Deelnemer' },
//                 { mail: 'david.lee@example.com', voornaam: 'David', achternaam: 'Lee', bedrijf: 'Cloud Innovations', titel: 'Cloud Architect', stad: 'Aalst', rol: 'Organisator' }
//             ];

//             // Model aanmaken en gegevens instellen
//             var oModel = new JSONModel({
//                 events: eventData,
//                 sessions: sessionData,
//                 users: userData
//             });

//             // Model instellen op de view
//             this.getView().setModel(oModel);
//         }
//     });
// });

sap.ui.define([
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
        } */
    });
});


