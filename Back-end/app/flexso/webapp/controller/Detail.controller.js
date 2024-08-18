sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/MessageToast"
], function (Controller, UIComponent, MessageToast) {
    "use strict";

    return Controller.extend("flexso.controller.Detail", {
        onInit: function () {
            
            var oOwnerComponent = this.getOwnerComponent();
            this.oRouter = oOwnerComponent.getRouter();
            this.oModel = oOwnerComponent.getModel();

            this.oRouter.getRoute("list").attachPatternMatched(this._onEventMatched, this);
            this.oRouter.getRoute("detail").attachPatternMatched(this._onEventMatched, this);

            var oView = this.getView();

            if (sessionStorage.getItem('status') != 'Organisator') {
                oView.byId("addSession").setVisible(false);
                oView.byId("editEvent").setVisible(false);
                oView.byId("deleteEvent").setVisible(false);
            }
        },

        _onEventMatched: function (oEvent) {
            this._event = oEvent.getParameter("arguments").eventID || this._event || "Events(1)";
            this.getView().bindElement({
                path: "/" + this._event,
                model: "eventModel"
            });
        },
        /* onSessionSelect: function(oEvent) {
            console.log("onSessionSelect called", new Date());
            var oSelectedItem = oEvent.getSource();
            var oBindingContext = oSelectedItem.getBindingContext();
            
            if (oBindingContext) {
              var oSelectedSession = oBindingContext.getObject();
              var sPath = oBindingContext.getPath();
              var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      
              // Retrieve sessieID from the selected item
              var sSessieID = oSelectedSession.sessieID;
              
              // Navigate to the session detail page
              oRouter.navTo("sessionDetail", {
                sessieID: sSessieID
              });
            } else {
              console.warn("No binding context found for the selected item.");
            }
          },
        */ 
       onSessionSelect: function (oEvent) {
            var oSelectedItem = oEvent.getSource();
            var oContext = oSelectedItem.getBindingContext("eventModel");
            var sessieID = oContext.getProperty("sessieID");
            var eventID = oContext.getProperty("eventID");

            this.getOwnerComponent().getRouter().navTo("sessionDetail", {
                sessieID: sessieID,
                eventID: eventID
            });

            if (oContext) {
                this._selectedSession = oContext.getObject();
                console.log("Selected session:", this._selectedSession);
                console.log("Selected session ID:", this._selectedSession.sessieID);
                console.log("Selected event ID:", this._selectedSession._event);

                // Navigeren naar de SessionDetail view met het geselecteerde sessieID
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("sessionDetail", {
                    sessieID: this._selectedSession.sessieID
                });
            } else {
                console.error("No context found for selected session");
            }
        }, 

        onAddSessionPress: function () {
            var sEventID = this._event;
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("sessionManager", {
                eventID: sEventID
            });
        },

        onEditSessionPress: function () {
            var oSelectedSession = this._selectedSession;
            console.log("Selected session ID:", oSelectedSession.sessieID);

            if (oSelectedSession) {
                var oRouter = UIComponent.getRouterFor(this);
                oRouter.navTo("sessionManagerEditor", {
                    sessionID: oSelectedSession.sessieID,
                    editMode: true
                });
            } else {
                MessageToast.show("First select a session to edit");
            }
        },

        onDeleteSessionPress: function () {
            var oSelectedSession = this._selectedSession;

            if (oSelectedSession) {
                var aSessions = this.getView().getModel("v2model").getProperty("/Sessions") || [];
                var nIndex = aSessions.findIndex(function (session) {
                    return session.sessieID === oSelectedSession.sessieID;
                });

                if (nIndex > -1) {
                    aSessions.splice(nIndex, 1);
                    this.getView().getModel("v2model").setProperty("/Sessions", aSessions);
                    MessageToast.show("Session deleted successfully");
                } else {
                    MessageToast.show("Selected session not found in the list");
                }
            } else {
                MessageToast.show("First select a session to delete");
            }
        },



        onRegisterParticipant: function (oEvent) {
            var oSelectedItem = oEvent.getSource();
            var oContext = oSelectedItem.getBindingContext("eventModel");

            if (oContext) {
                var oSelectedSession = oContext.getObject();

                var sSessionID = oSelectedSession.sessieID;
                var sSessionName = oSelectedSession.naam;

                if (sSessionID && sSessionName) {
                    var sSubject = "Register for Session ID: " + sSessionID + " - " + sSessionName;
                    var sBody = "I would like to register for the session with ID: " + sSessionID + " and Name: " + sSessionName;
                    var sMailtoLink = "mailto:register@example.com?subject=" + encodeURIComponent(sSubject) + "&body=" + encodeURIComponent(sBody);
                    window.location.href = sMailtoLink;
                } else {
                    MessageToast.show("Session ID or Name is missing. Cannot send email.");
                }
            } else {
                MessageToast.show("No session selected. Please select a session first.");
            } /*

               /* var sUserId = sap.ushell.Container.getService("UserInfo").getId();
                var oDataModel = this.getView().getModel("v2model");

                oDataModel.create("/SessionParticipants", {
                    sessieID: oSelectedSession.sessieID,
                    userEmail: sUserId
                }, {
                    success: function () {
                        MessageToast.show("You are successfully registered for this session.");
                    },
                    error: function () {
                        MessageToast.show("Failed to register for this session. Please try again later.");
                    }
                }); */
        },

        _isUserAdmin: function () {
            var oUserModel = this.getView().getModel("eventModel"); // Zorg ervoor dat je een model hebt dat de gebruikersinfo bevat
            var sUserRole = oUserModel.getProperty("/rol"); // Stel dat de rol van de gebruiker hier is opgeslagen
            console.log("User role:", sUserRole); 
            return sUserRole === "beheerder"; // Controleer of de gebruiker een beheerder is
        },
        

        onShowParticipantsList: function () {
            if (!this._isUserAdmin()) {
                MessageToast.show("You do not have permission to view the participants.");
                this.byId("_IDGenObjectPageSection2").setVisible(false); // Verberg de sectie als de gebruiker geen beheerder is
                return;
            }

            var oSelectedSession = this._selectedSession;

            if (oSelectedSession) {
                var aParticipants = oSelectedSession.participants || [];
                
                if (aParticipants.length > 0) {
                    this.getView().getModel("v2model").setProperty("/participants", aParticipants);
                } else {
                    MessageToast.show("There are no participants registered for this session.");
                }
            }
        },
        formatter: {
            isBeheerder: function (rol) {
                return rol === "beheerder";
            }
        },
        

        onExit: function () {
            this.oRouter.getRoute("list").detachPatternMatched(this._onEventMatched, this);
            this.oRouter.getRoute("detail").detachPatternMatched(this._onEventMatched, this);
        }
    });
});
