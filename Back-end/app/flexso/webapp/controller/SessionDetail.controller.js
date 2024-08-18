sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "sap/m/MessageBox",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator"
], function (Controller, MessageToast, MessageBox, Filter, FilterOperator) {
  "use strict";
  
  return Controller.extend("flexso.controller.SessionDetail", {
      onInit: function () {
          this.oRouter = this.getOwnerComponent().getRouter();
          this.oRouter.getRoute("sessionDetail").attachPatternMatched(this._onRouteMatched, this);
      },

      _onRouteMatched: function (oEvent) {
          var oArgs = oEvent.getParameter("arguments");
          var sessieID = oArgs.sessieID;
          
          var oView = this.getView();
          
          // Bind the view to the session data
          oView.bindElement({
              path: "/Sessions(" + sessieID + ")", 
              model: "eventModel"
          });
      },

      editSessie: function () {
          this.getOwnerComponent().getRouter().navTo("EditSession", {
              sessieID: this.getView().getBindingContext("v2model").getProperty("sessieID")
          });
      },

      deleteSessie: function () {
          var oDataModel = this.getView().getModel("v2model"),
              oResourceBundle = this.getView().getModel("i18n").getResourceBundle(),
              sessieID = this.getView().getBindingContext("v2model").getProperty("sessieID");

          oDataModel.remove("/Sessions(" + sessieID + ")", {
              success: function () {
                  MessageBox.success(oResourceBundle.getText("sessieRemove"), {
                      onClose: function () {
                          history.back();
                      }
                  });
              },
              error: function () {
                  MessageBox.error(oResourceBundle.getText("sessieRemoveError"));
              }
          });
      },

      onTerug: function () {
          window.history.back();
      },

      

      myFormatDateFunction: function (beginUur, eindUur) {
          try {
              if (beginUur && eindUur) {
                  var formattedBeginUur = beginUur.split(":").slice(0, 2).join(":");
                  var formattedEindUur = eindUur.split(":").slice(0, 2).join(":");
                  return formattedBeginUur + " - " + formattedEindUur;
              } else {
                  return "Invalid time";
              }
          } catch (error) {
              console.error("Error formatting date and time:", error);
              return "Error formatting date and time";
          }
      }
  });
});


/* sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
  ],
  function (Controller, MessageToast, MessageBox, Filter, FilterOperator) {
    "use strict";
    
    var sessieID;
    var user = JSON.parse(localStorage.getItem("user"));

    return Controller.extend("flexso.controller.SessionDetail", {
      onInit: function () {
        this.oOwnerComponent = this.getOwnerComponent();
        this.oRouter = this.oOwnerComponent.getRouter();
        this.oRouter
          .getRoute("sessionDetail")
          .attachPatternMatched(this._onRouteMatched, this);

      
      },

      _onRouteMatched: function (oEvent) {
        var oArgs = oEvent.getParameter("arguments");
        var oView = this.getView();
        sessieID = oArgs.sessieID;

        oView.bindElement({ 
          path: "/Sessions(" + sessieID + ")", 
          model: "eventModel"
        });

        this.setRating();
      },

      editSessie: function () {
        this.getOwnerComponent().getRouter().navTo("EditSessie", {
          sessieID: sessieID
        });
      },

      deleteSessie: function () {
        var oDataModel = this.getView().getModel("eventModel"),
            oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

        oDataModel.remove("/Sessions(" + sessieID + ")", {
          success: function () {
            MessageBox.success(oResourceBundle.getText("sessieRemove"), {
              onClose: function () {
                history.back();
              }
            });
          },
          error: function () {
            MessageBox.error(oResourceBundle.getText("sessieRemoveError"));
          }
        });
      },

      onTerug: function () {
        window.history.back();
      },

      setRating: function () {
        var that = this;
        var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
        var oDataModel = this.getView().getModel("eventModel");

        var oFilter = new Filter("participantID/sessieID_sessieID", FilterOperator.EQ, sessieID);

        oDataModel.read("/Feedback", {
          filters: [oFilter],
          success: function (oData) {
            var avrRating = 0;
            oData.results.forEach(function (e) {
              avrRating += parseInt(e.aantalSterren, 10);
            });

            var length = oData.results.length;
            if (length !== 0) {
              avrRating /= length;
              that.byId("rating2").setVisible(true);
              that.byId("geenRecensies").setVisible(false);
            } else {
              that.byId("rating2").setVisible(false);
              that.byId("geenRecensies").setVisible(true);
            }

            that.byId("rating").setValue(avrRating);
            that.byId("rating").setTooltip(
              oResourceBundle.getText("rating") + avrRating + " " +
              oResourceBundle.getText("rating2") + " " +
              length + " " + oResourceBundle.getText("rating3")
            );
          },
          error: function () {
            MessageBox.error(oResourceBundle.getText("ratingFetchError"));
          }
        });
      },

      myFormatDateFunction: function (beginUur, eindUur) {
        try {
          if (beginUur && eindUur) {
            var formattedBeginUur = beginUur.split(":").slice(0, 2).join(":");
            var formattedEindUur = eindUur.split(":").slice(0, 2).join(":");
            return formattedBeginUur + " - " + formattedEindUur;
          } else {
            return "Invalid time";
          }
        } catch (error) {
          console.error("Error formatting date and time:", error);
          return "Error formatting date and time";
        }
      }
    });
  }
);
 */