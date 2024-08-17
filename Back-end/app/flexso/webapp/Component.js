/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "flexso/model/models",
    "sap/f/library",
    "sap/ui/model/resource/ResourceModel",
    "sap/ui/model/json/JSONModel"
], function (UIComponent, Device, models, fioriLibrary, ResourceModel, JSONModel) {
    "use strict";

    return UIComponent.extend("flexso.Component", {
        metadata: {
            manifest: "json"
        },

        /**
         * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
         * @public
         * @override
         */
        init: function () {
            var oModel,
                oProductsModel,
                oRouter,
                i18nModel;

            // Call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // Set up the i18n model
            i18nModel = new ResourceModel({
                bundleName: "flexso.i18n.i18n" // Ensure this matches your i18n folder structure
            });
            this.setModel(i18nModel, "i18n");

            // Create and set up the JSON model
            oModel = new JSONModel();
            this.setModel(oModel);

            // Enable routing
            oRouter = this.getRouter();
            oRouter.attachBeforeRouteMatched(this._onBeforeRouteMatched, this);
            this.getRouter().initialize();

            // Set the device model
            this.setModel(models.createDeviceModel(), "device");
        },

        _onBeforeRouteMatched: function (oEvent) {
            var oModel = this.getModel(),
                sLayout = oEvent.getParameters().arguments.layout;

            // If there is no layout parameter, set a default layout (normally OneColumn)
            if (!sLayout) {
                sLayout = fioriLibrary.LayoutType.OneColumn;
            }

            oModel.setProperty("/layout", sLayout);
        },

        /**
         * Changes the language of the application.
         * @param {string} sLanguageCode - The language code (e.g., 'en', 'nl', 'de')
         */
        setLanguage: function (sLanguageCode) {
            var oI18nModel = this.getModel("i18n");
            var oLocale = new sap.ui.core.Locale(sLanguageCode);
            oI18nModel.setProperty("/locale", oLocale.toString());

            // Optionally refresh the resource bundle to pick up new language
            oI18nModel.getResourceBundle().refresh(true);
        }
    });
});
