sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/ui/core/routing/History",
    "sap/ui/model/type/Date",
    "sap/ui/model/type/Time"
], function(Controller, JSONModel, MessageBox, History, DateType, TimeType) {
    "use strict";

    return Controller.extend("flexso.controller.SessionManager", {
        onInit: function() {
            var oSession = {
                naam: "",
                type: "",
                beschrijving: "",
                spreker: "",
                datum: null,
                beginTijd: null,
                eindTijd: null,
                lokaalnummer: "",
                eventID: ""
            };
            var oModel = new JSONModel(oSession);
            this.getView().setModel(oModel, "sessionForm");

            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("sessionManager").attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: function(oEvent) {
            var sSessionId = oEvent.getParameter("arguments").sessionId;
            var sEventId = oEvent.getParameter("arguments").eventID;
            
            if (sSessionId) {
                MessageBox.show("Received sessionID: " + sSessionId);
                this._loadSessionData(sSessionId);
            }
            
            if (sEventId) {
                this.setEventID(sEventId);
            }
        },

        _loadSessionData: function(sSessionId) {
            var oDataModel = this.getView().getModel("v2model");
            var sPath = "/Sessions('" + sSessionId + "')";
            oDataModel.read(sPath, {
                success: function(oData) {
                    var oModel = this.getView().getModel("sessionForm");
                    oModel.setData(oData);
                }.bind(this),
                error: function(oError) {
                    MessageBox.error("Error loading session data");
                }
            });
        },

        setEventID: function(eventID) {
            var oSessionModel = this.getView().getModel("sessionForm");
            var oData = oSessionModel.getData();
            oData.eventID = eventID;
            oSessionModel.setData(oData);
        },

        validateSessionDateWithinEventRange: function(evenementID, sessionDate, callback) {
            var odatamodel = this.getView().getModel("v2model");

            odatamodel.read("/Events(" + evenementID + ")", {
                success: function(oEventDate) {
                    var eventBeginDate = new Date(oEventDate.datum + "T" + oEventDate.beginTijd);
                    var eventEndDate = new Date(oEventDate.datum + "T" + oEventDate.eindTijd);
                    var isValid = sessionDate >= eventBeginDate && sessionDate <= eventEndDate;
                    callback(isValid);
                },
                error: function(error) {
                    console.log("Failed to fetch event data: ", error);
                    callback(false);
                }
            });
        },

        handleSessionSavePress: function() {
            var oFormData = this.getView().getModel("sessionForm").getData(),
                oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

            // Controleer of de eventID beschikbaar is
            if (!oFormData.eventID) {
                MessageBox.error("Event ID is missing.");
                return;
            }

            // Format datum en tijd
            var oTimeType = new TimeType({ pattern: "HH:mm:ss" });
            var oDateType = new sap.ui.model.type.Date({ pattern: "yyyy-MM-dd" });

            oFormData.datum = oDateType.formatValue(oFormData.datum, "string");
            oFormData.beginTijd = oTimeType.formatValue(oFormData.beginTijd, "string");
            oFormData.eindTijd = oTimeType.formatValue(oFormData.eindTijd, "string");

            var evenementID = oFormData.eventID;

            if (!this.validateForm(oFormData)) {
                MessageBox.error(oResourceBundle.getText("sessieAlleVeldenError"));
                return;
            }

            var date = new Date(oFormData.datum);
            var currentDate = new Date();

            if (date <= currentDate) {
                MessageBox.error(oResourceBundle.getText("datumError"));
                return;
            }

            var beginTijd = new Date(oFormData.datum + "T" + oFormData.beginTijd);
            var eindTijd = new Date(oFormData.datum + "T" + oFormData.eindTijd);

            if (beginTijd >= eindTijd) {
                MessageBox.error(oResourceBundle.getText("uurError"));
                return;
            }

            this.validateSessionDateWithinEventRange(evenementID, date, function(isValid) {
                if (!isValid) {
                    MessageBox.error(oResourceBundle.getText("datumInEventDatumError"));
                    return;
                }

                var odatamodel = this.getView().getModel("v2model");

                if (oFormData.id) {
                    var sPath = "/Sessions('" + oFormData.id + "')";
                    odatamodel.update(sPath, oFormData, {
                        success: function() {
                            MessageBox.success(oResourceBundle.getText("sessieAangemaakt"), {
                                onClose: function() {
                                    window.location.href = "#/Events/" + evenementID;
                                }
                            });
                        },
                        error: function() {
                            MessageBox.error(oResourceBundle.getText("sessieAanmakenError"));
                        }
                    });
                } else {
                    odatamodel.create("/Sessions", oFormData, {
                        success: function() {
                            MessageBox.success(oResourceBundle.getText("sessieAangemaakt"), {
                                onClose: function() {
                                    window.location.href = "#/Events/" + evenementID;
                                }
                            });
                        },
                        error: function() {
                            MessageBox.error(oResourceBundle.getText("sessieAanmakenError"));
                        }
                    });
                }
            }.bind(this));
        },

        handleCancelPress: function() {
            this._navBack();
        },

        _navBack: function() {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("eventManager", {}, true);
            }
        },

        validateForm: function(formData) {
            for (var key in formData) {
                if (formData.hasOwnProperty(key)) {
                    if (!formData[key]) {
                        return false; // Return false if any field is empty
                    }
                }
            }
            return true;
        }
    });
});


/* sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/ui/core/routing/History",
    "sap/ui/model/type/Date",
    "sap/ui/model/type/Time"
], function(Controller, JSONModel, MessageBox, History, DateType, TimeType) {
    "use strict";

    return Controller.extend("flexso.controller.SessionManager", {
        onInit: function() {
            var oSession = {
                naam: "",
                type: "",
                beschrijving: "",
                spreker: "",
                datum: null,
                beginTijd: null,
                eindTijd: null,
                lokaalnummer: "",
                eventID: ""
            };
            var oModel = new JSONModel(oSession);
            this.getView().setModel(oModel, "sessionForm");

            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("sessionManager").attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: function(oEvent) {
            var sSessionId = oEvent.getParameter("arguments").sessionId;
            if (sSessionId) {
                MessageBox.show("Received sessionID: " + sSessionId);
                this._loadSessionData(sSessionId);
            }
        },

        _loadSessionData: function(sSessionId) {
            var oDataModel = this.getView().getModel("v2model");
            var sPath = "/Sessions('" + sSessionId + "')";
            oDataModel.read(sPath, {
                success: function(oData) {
                    var oModel = this.getView().getModel("sessionForm");
                    oModel.setData(oData);
                }.bind(this),
                error: function(oError) {
                    MessageBox.error("Error loading session data");
                }
            });
        },
        setEventID: function(eventID) {
            var oSessionModel = this.getView().getModel("sessionForm");
            var oData = oSessionModel.getData();
            oData.eventID = eventID;
            oSessionModel.setData(oData);
        },

        validateSessionDateWithinEventRange: function(evenementID, sessionDate, callback) {
            var odatamodel = this.getView().getModel("v2model");

            odatamodel.read("/Events(" + evenementID + ")", {
                success: function(oEventDate) {
                    var eventBeginDate = new Date(oEventDate.datum + "T" + oEventDate.beginTijd);
                    var eventEndDate = new Date(oEventDate.datum + "T" + oEventDate.eindTijd);
                    var isValid = sessionDate >= eventBeginDate && sessionDate <= eventEndDate;
                    callback(isValid);
                },
                error: function(error) {
                    console.log("Failed to fetch event data: ", error);
                    callback(false);
                }
            });
        },

        handleSessionSavePress: function() {
            var oForm = this.getView().getModel("sessionForm").getData(),
                oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

            if (!oFormData.eventID) {
                MessageBox.error("Event ID is missing.");
                return;
            }

            // Retrieve evenementID from URL
            var evenementID = this._getEvenementIDFromURL();

            // Add evenementID to form data
            oForm.event_ID = evenementID;

            if (!this.validateForm(oForm)) {
                MessageBox.error(oResourceBundle.getText("sessieAlleVeldenError"));
                return;
            }

            var date = new Date(oForm.datum);
            var currentDate = new Date();

            if (date <= currentDate) {
                MessageBox.error(oResourceBundle.getText("datumError"));
                return;
            }

            var beginTijd = new Date(oForm.datum + "T" + oForm.beginTijd);
            var eindTijd = new Date(oForm.datum + "T" + oForm.eindTijd);

            if (beginTijd >= eindTijd) {
                MessageBox.error(oResourceBundle.getText("uurError"));
                return;
            }

            this.validateSessionDateWithinEventRange(evenementID, date, function(isValid) {
                if (!isValid) {
                    MessageBox.error(oResourceBundle.getText("datumInEventDatumError"));
                    return;
                }

                var odatamodel = this.getView().getModel("v2model");

                odatamodel.create("/Sessions", oForm, {
                    success: function(data, response) {
                        MessageBox.success(oResourceBundle.getText("sessieAangemaakt"), {
                            onClose: function() {
                                window.location.href = "#/Events/" + evenementID;
                            }
                        });
                    },
                    error: function(error) {
                        MessageBox.error(oResourceBundle.getText("sessieAanmakenError"));
                    }
                });
            }.bind(this));
        },

        handleCancelPress: function() {
            this._navBack();
        },

        _navBack: function() {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("eventManager", {}, true);
            }
        },

        validateForm: function (formData) {
            for (var key in formData) {
              if (formData.hasOwnProperty(key)) {
                return true;
              }
            }
            return false;
          },
    });
}); 


/*
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/ui/core/routing/History",
    "sap/ui/model/type/Date",
    "sap/ui/model/type/Time"
], function(Controller, JSONModel, MessageBox, History, DateType, TimeType) {
    "use strict";

    return Controller.extend("flexso.controller.SessionManager", {
        onInit: function() {
            var oSession = {
                naam: "",
                type: "",
                beschrijving: "",
                spreker: "",
                datum: null,
                beginTijd: null,
                eindTijd: null,
                lokaalnummer: ""
            };
            var oModel = new JSONModel(oSession);
            this.getView().setModel(oModel, "sessionForm");

            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("sessionManager").attachPatternMatched(this._onObjectMatched, this);
        },

		_onObjectMatched: function(oEvent) {
			var sSessionId = oEvent.getParameter("arguments").sessionId;
            if (sSessionId) {
                MessageBox.show("Received sessionID: " + sSessionId);
                this._loadSessionData(sSessionId);
            }
},
        _loadSessionData: function(sSessionId) {
            var oDataModel = this.getView().getModel("v2model");
            var sPath = "/Sessions('" + sSessionId + "')";
            oDataModel.read(sPath, {
                success: function(oData) {
                    var oModel = this.getView().getModel("sessionForm");
                    oModel.setData(oData);
                }.bind(this),
                error: function(oError) {
                    MessageBox.error("Error loading session data");
                }
            });
        },

        handleSessionSavePress: function() {
            var oFormData = this.getView().getModel("sessionForm").getData();
        
            var oTimeType = new TimeType({ pattern: "HH:mm:ss" });
            var oDateType = new sap.ui.model.type.Date({pattern: "yyyy-MM-dd"});
        
            // Format the date and time fields
            oFormData.datum = oDateType.formatValue(oFormData.datum, "string");
            oFormData.beginTijd = oTimeType.formatValue(oFormData.beginTijd, "string");
            oFormData.eindTijd = oTimeType.formatValue(oFormData.eindTijd, "string");
        
            // Retrieve the event ID from the URL or another model
            var evenementID = this._getEvenementIDFromURL(); // Assuming you have a method to get the event ID from the URL
        
            // Add the event ID to the session data
            oFormData.evenementID = evenementID;
        
            var oDataModel = this.getView().getModel("v2model");
        
            if (oFormData.id) {
                var sPath = "/Sessions('" + oFormData.id + "')";
                oDataModel.update(sPath, oFormData, {
                    success: function() {
                        MessageBox.success("Session was updated successfully");
                        this._navBack();
                    }.bind(this),
                    error: function() {
                        MessageBox.error("Error while updating the session");
                    }
                });
            } else {
                oDataModel.create("/Sessions", oFormData, {
                    success: function() {
                        MessageBox.success("Session was created successfully");
                        this._navBack();
                    }.bind(this),
                    error: function() {
                        MessageBox.error("Error while creating the session");
                    }
                });
            }
        },

        handleCancelPress: function() {
            this._navBack();
        },

        _navBack: function() {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("eventManager", {}, true);
            }
        },
        _getEvenementIDFromURL: function() {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            var oHash = oRouter.oHashChanger.getHash();
            var aParts = oHash.split("/");
            return aParts[1]; // Assuming the event ID is in the second part of the URL
        }
    });
});
 */