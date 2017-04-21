sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/resource/ResourceModel"
], function(Controller,MessageToast,JSONModel,ResourceModel) {
	"use strict";

	return Controller.extend("MyDemo.controller.HelloPanel", {
		onInit : function () {
           // set data model on view
           var oData = {
               recipient : {
                  name : "World"
               }
            };
            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel);
            // set i18n model on view
            var i18nModel = new ResourceModel({
               bundleName: "MyDemo.i18n.i18n"
            });
            this.getView().setModel(i18nModel, "i18n");
        },
        
        onShowHello : function () {
        	// read msg from i18n model
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            var sRecipient = this.getView().getModel().getProperty("/recipient/name");
            var sMsg = oBundle.getText("helloMsg", [sRecipient]);
            
            MessageToast.show(sMsg);
        },
        
        onOpenDialog : function () {
            var oView = this.getView();
            var oDialog = oView.byId("helloDialog");
            // create dialog lazily
            if (!oDialog) {
               // create dialog via fragment factory
               oDialog = sap.ui.xmlfragment(oView.getId(), "MyDemo.view.HelloDialog");
               oView.addDependent(oDialog);
            }
            oDialog.open();
        },
        
		onCloseDialog : function () {
			this.getView().byId("helloDialog").close();
		}
        
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf MyDemo.view.HelloPanel
		 */
		//	onInit: function() {
		//
		//	},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf MyDemo.view.HelloPanel
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf MyDemo.view.HelloPanel
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf MyDemo.view.HelloPanel
		 */
		//	onExit: function() {
		//
		//	}

	});

});