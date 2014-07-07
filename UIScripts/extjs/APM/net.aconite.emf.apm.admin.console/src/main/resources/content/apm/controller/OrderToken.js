Ext.define('Apm.controller.OrderToken',
{
    extend	: 'Ext.app.Controller',
	
	id		: 'idOrderTokenController',
	
	stores	: ['TokenProductGroups','Institution','Issuer','TokenProducts','TokenOrderType','PinDeliveryMethod','PinPukFlag','Country','Title','TokenApp','Interface'],
	
	models	: ['TokenProductGroups','Institution','Issuer','TokenProducts','TokenOrderType','PinDeliveryMethod','PinPukFlag','Country','Title','TokenApp','Interface'],
	
	views	: 
	[
        'ordertoken.Order',
        'ordertoken.List',
		'ordertoken.Edit',
    ],
	
	refs: 
	[
		{ref: 'orderTokenOrder'	, selector: 'ordertokenorder'},
		{ref: 'orderTokenList'	, selector: 'ordertokenlist'},
        {ref: 'orderTokenEdit', selector: 'ordertokenedit'},
    ],
	
	//###################################################################################
	/////////////////// Initializing Controller /////////////////////////////////////////
    init: function() 
	{
        this.control(
		{
		    //---------Start : Grid Actions---------------
            'ordertokenlist':
            {
                afterrender	: this.afterRender,
                //itemdblclick	: this.rowDblclicked,
                selectionchange	: this.rowSelected
            },
		    //---------Start : Toolbar Actions---------------
            'ordertokenlist > toolbar button[action=add]':
            {
                click: this.toolbarAdd
            },
		    'ordertokenorder > toolbar button[action=reset]':
            {
                click: this.orderPanelReset
            },
            'ordertokenorder > toolbar button[action=submit]':
            {
                click: this.orderPanelCreate
            },
            'ordertokenorder #idSInstitution':
            {
                select: this.onInstitutionComboSelect
            },
            'ordertokenorder #idSIssuer':
            {
                select: this.onIssuerComboSelect
            },
            //---------Start : Column Actions---------------
            'ordertokenlist actioncolumn':
            {
                itemclick : this.handleActionColumn
            },
            /////////////////Start: Edit Panel Actions /////////////////////////////////
            'ordertokenedit #idEPinDeliveryMethod':
            {
                select: this.onPinDeliveryMethodComboSelect
            },
            'ordertokenedit > toolbar button[action=save]':
            {
                click: this.editpanelSave
            },
            'ordertokenedit > toolbar button[action=create]':
            {
                click: this.editpanelCreate
            },
            'ordertokenedit > toolbar button[action=close]':
            {
                click: this.editpanelClose
            },
            /////////////////End: EditPanel Actions /////////////////////////////////
        });
		
    },
	//###################################################################################
	/////////////////// Implementing Action Functions ///////////////////////////////////

	onLaunch: function()
    {
        console.log('onLaunch.... ');
        this.getCountryStore().getProxy().extraParams={limit:1000};
        this.getCountryStore().load();

        this.getInstitutionStore().getProxy().extraParams={limit:1000};
        this.getInstitutionStore().load();

        this.getTokenOrderTypeStore().load();
    },
    afterRender: function()
    {
        console.log('afterRender ');
        Ext.ComponentQuery.query("ordertokenorder > toolbar button[action=submit]")[0].show();
        Ext.ComponentQuery.query("ordertokenorder > toolbar button[action=search]")[0].hide();
    },
    rowSelected: function(model, records)
    {
        if (records[0])
        {
            this.setActiveRecord(records[0] || null);

            console.log('rowSelected ');
            Ext.ComponentQuery.query("ordertokenlist > toolbar button[action=delete]")[0].enable();
            Ext.ComponentQuery.query("ordertokenlist > toolbar button[action=edit]")[0].enable();
            Ext.ComponentQuery.query("ordertokenlist > toolbar button[action=run]")[0].enable();
        }
    },
	/////////////////Start Grid Panel Actions ///////////////////////////////////
	//---------start : Grid Actions---------------
	// please use this section to setup the application panel features //

	//=================================
    onInstitutionComboSelect: function(combo, records,eOpts )
    {
         console.log('onInstitutionComboSelect.... '+records[0].get('id'));
         this.getIssuerStore().getProxy().extraParams={limit:1000,institutionId: records[0].get('id')};
         this.getIssuerStore().load();
         Ext.ComponentQuery.query("#idSIssuer")[0].enable();

         this.getInterfaceStore().getProxy().extraParams={limit:1000,institutionId: records[0].get('id')};
         this.getInterfaceStore().load();
         Ext.ComponentQuery.query("#idSInterface")[0].enable();
    },
    onIssuerComboSelect: function(combo, records,eOpts )
    {
        console.log('onIssuerComboSelect.... '+records[0].get('id'));
        this.getTokenProductsStore().getProxy().extraParams={limit:1000,issuerId: records[0].get('id')};
        this.getTokenProductsStore().load();
        Ext.ComponentQuery.query("#idSTokenProduct")[0].enable();
    },
    onPinDeliveryMethodComboSelect: function(combo, records, eOpts)
    {
        console.log('onPinDeliveryMethodComboSelect.... '+records[0].get('id'));
        var id = records[0].get('id');

        this.hidePinDeliveryMethodTabs();
        this.showPinDeliveryMethodTabs(id);
    },
    showPinDeliveryMethodTabs: function(orderTypeId)
    {
        if(orderTypeId == 2 || orderTypeId == 6)
        {
            Ext.getCmp('idETabsPanel').add(Ext.getCmp('idEMailerTab'));
        }
        else if (orderTypeId == 3 || orderTypeId == 4)
        {
            Ext.getCmp('idETabsPanel').add(Ext.getCmp('idESMSTab'));
        }
        else if (orderTypeId == 5)
        {
            Ext.getCmp('idETabsPanel').add(Ext.getCmp('idEWebTab'));
        }
    },
    hidePinDeliveryMethodTabs: function()
    {
        Ext.getCmp('idETabsPanel').remove(Ext.getCmp('idEMailerTab'), false);
        Ext.getCmp('idETabsPanel').remove(Ext.getCmp('idESMSTab'), false);
        Ext.getCmp('idETabsPanel').remove(Ext.getCmp('idEWebTab'), false);
    },
    hideTokenAppFields: function(orderTypeId)
    {
        Ext.getCmp('idEPANId').setVisible(true);
        Ext.getCmp('idEPAN').setVisible(true);
//        Ext.getCmp('idEPANEncrypted').setVisible(true);
        Ext.getCmp('idEPANSeqNumber').setVisible(true);
        Ext.getCmp('idEPANExpiryDate').setVisible(true);
        Ext.getCmp('idEPINId').setVisible(true);
        Ext.getCmp('idEIssuerPINId').setVisible(true);
        Ext.getCmp('idEPUKId').setVisible(true);
        Ext.getCmp('idEIssuerPUKId').setVisible(true);
        Ext.getCmp('idEPrevPANId').setVisible(true);
        Ext.getCmp('idEPrevPAN').setVisible(true);
//        Ext.getCmp('idEPrevPANEncrypted').setVisible(true);
        Ext.getCmp('idEPrevPANSeqNumber').setVisible(true);
        Ext.getCmp('idEPrevPANExpiryDate').setVisible(true);

        if(orderTypeId == 1)
        {
             Ext.getCmp('idEPANId').setVisible(false);
             Ext.getCmp('idEPINId').setVisible(false);
             Ext.getCmp('idEIssuerPINId').setVisible(false);
             Ext.getCmp('idEPUKId').setVisible(false);
             Ext.getCmp('idEIssuerPUKId').setVisible(false);
             Ext.getCmp('idEPrevPANId').setVisible(false);
             Ext.getCmp('idEPrevPAN').setVisible(false);
//             Ext.getCmp('idEPrevPANEncrypted').setVisible(false);
             Ext.getCmp('idEPrevPANSeqNumber').setVisible(false);
             Ext.getCmp('idEPrevPANExpiryDate').setVisible(false);
        }
        else if(orderTypeId == 2)
        {
             Ext.getCmp('idEPAN').setVisible(false);
             Ext.getCmp('idEPINId').setVisible(false);
//             Ext.getCmp('idEPANEncrypted').setVisible(false);
             Ext.getCmp('idEIssuerPINId').setVisible(false);
             Ext.getCmp('idEPUKId').setVisible(false);
             Ext.getCmp('idEIssuerPUKId').setVisible(false);
             Ext.getCmp('idEPrevPANId').setVisible(false);
             Ext.getCmp('idEPrevPAN').setVisible(false);
//             Ext.getCmp('idEPrevPANEncrypted').setVisible(false);
             Ext.getCmp('idEPrevPANSeqNumber').setVisible(false);
             Ext.getCmp('idEPrevPANExpiryDate').setVisible(false);
        }
        else if(orderTypeId == 3)
        {
             Ext.getCmp('idEPANId').setVisible(false);
             Ext.getCmp('idEPINId').setVisible(false);
             Ext.getCmp('idEIssuerPINId').setVisible(false);
             Ext.getCmp('idEPUKId').setVisible(false);
             Ext.getCmp('idEIssuerPUKId').setVisible(false);
        }
        else if(orderTypeId == 4)
        {
             Ext.getCmp('idEPANId').setVisible(false);
             Ext.getCmp('idEPrevPANId').setVisible(false);
             Ext.getCmp('idEPrevPAN').setVisible(false);
//             Ext.getCmp('idEPrevPANEncrypted').setVisible(false);
             Ext.getCmp('idEPrevPANSeqNumber').setVisible(false);
             Ext.getCmp('idEPrevPANExpiryDate').setVisible(false);
        }
        else if(orderTypeId == 5)
        {
             Ext.getCmp('idEPrevPANId').setVisible(false);
             Ext.getCmp('idEPrevPAN').setVisible(false);
//             Ext.getCmp('idEPrevPANEncrypted').setVisible(false);
             Ext.getCmp('idEPrevPANSeqNumber').setVisible(false);
             Ext.getCmp('idEPrevPANExpiryDate').setVisible(false);
        }
    },
    orderPanelCreate: function()
    {
        var form = this.getOrderTokenOrder().getForm();
        store = this.getTokenAppStore();

        if (form.isValid() && store.data.length > 0)
        {
            var datar = new Array();
            var records = store.getRange();
            for (var i = 0; i < records.length; i++) {
                datar.push(records[i].data);
            }

            var wbParams = new Object();
            var cbTokenProductCode = Ext.getCmp('idSTokenProduct');
            var index = cbTokenProductCode.getStore().findExact("id", cbTokenProductCode.getValue());
            var record = cbTokenProductCode.getStore().getAt(index);
            wbParams['issuerTokenProductCode'] = record.get("issuerTokenProductCode");
            wbParams['insitutionId'] = Ext.getCmp('idSInstitution').getValue();
            wbParams['interfaceId'] = Ext.getCmp('idSInterface').getValue();
            wbParams['username'] = Apm.app.username;
            wbParams['orderType'] = Ext.getCmp('idSTokenOrderType').getValue();
            wbParams['feedbackRequiredFlag'] = Ext.getCmp('idSTokenFeedbackFlag').getValue()['feedbackFlag'];
            wbParams['listTokenApplication'] = datar;

            Ext.Ajax.request(
            {
                url: urlTokenOrderData,
                method: 'POST',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'pageName': document.getElementById('pageName').value
                },
                jsonData: Ext.encode(wbParams),
                success: function(response)
                {
                    var obj = Ext.decode(response.responseText);
                    Ext.Msg.show(
                    {
                         title:'Success',
                         msg: obj['message'],
                         buttons: Ext.Msg.OK,
                         icon: Ext.Msg.INFO
                    });
                },
                failure: function(response)
                {
                    var obj = Ext.decode(response.responseText);
                    Ext.Msg.show(
                    {
                         title:'Error',
                         msg: obj['message'],
                         buttons: Ext.Msg.OK,
                         icon: Ext.Msg.ERROR
                    });
                }
            });
        }
        else
        {
            var errMsg = 'Please check the required fields in the form';
            if (store.data.length == 0)
            {
                errMsg = 'Please provide a least one token application';
            }

            Ext.Msg.show(
            {
                 title:'Error',
                 msg: errMsg,
                 buttons: Ext.Msg.OK,
                 icon: Ext.Msg.ERROR
            });
        }
    },
    toolbarAdd: function()
    {
        console.log('Clicked toolbarAdd');
        var orderTypeId = Ext.getCmp('idSTokenOrderType').getValue();

        if (orderTypeId > 0)
        {
            Ext.ComponentQuery.query("ordertokenedit > toolbar button[action=save]")[0].hide();
            Ext.ComponentQuery.query("ordertokenedit > toolbar button[action=create]")[0].show();

            this.getOrderTokenList().getView().getSelectionModel().deselectAll();
            this.setActiveRecord(null);

            this.hidePinDeliveryMethodTabs();

            console.log('hideTokenAppFields.... '+orderTypeId);
            this.hideTokenAppFields(orderTypeId);

            this.editpanelOpen();
        }
        else
        {
            Ext.Msg.show(
            {
                 title:'Information',
                 msg: 'Please select an order type before adding a token application',
                 buttons: Ext.Msg.OK,
                 icon: Ext.Msg.INFO
            });
        }
    },
    handleActionColumn : function(column, action, grid, rowIndex, colIndex, record, node)
    {
        console.log(action);
        this.getOrderTokenList().getView().getSelectionModel().select(rowIndex,false);
        store = this.getTokenAppStore();
        editor=this.getOrderTokenEdit();
        var me = this;
        if(action=='delete')
        {
            console.log('Clicked actioncolumnDelete '+ record.get('id'));
            Ext.Msg.confirm
            (
                'Confirm',
                'Are you sure you want to delete this record?',
                function (btn)
                {
                    if (btn == 'yes')
                    {
                        store.remove(record);
                        me.disabledOrderType();
                        editor.hide();
                    }
                }
            );
        }
        if(action=='edit')
        {
            console.log('Clicked actioncolumnEdit '+ record.get('id'));
            Ext.ComponentQuery.query("ordertokenedit > toolbar button[action=save]")[0].show();
            Ext.ComponentQuery.query("ordertokenedit > toolbar button[action=create]")[0].hide();

            this.editpanelOpen();
            this.hidePinDeliveryMethodTabs();
            this.showPinDeliveryMethodTabs(record.get('pinDeliveryMethod'));
            this.getOrderTokenEdit().loadRecord(record);
        }
    },
    editpanelCreate: function()
    {
        console.log('Clicked editpanelCreate....');
        var form = this.getOrderTokenEdit().getForm();
        var selmodel=this.getOrderTokenList().getView().getSelectionModel();
        store = this.getTokenAppStore();
        if (form.isValid())
        {
            console.log('store.insert... ');
            store.insert(0, form.getValues());
            selmodel.select(0, false);
            //store.load();

            this.disabledOrderType();
            this.editpanelClose();
        }
        else
        {
            Ext.Msg.show(
            {
                 title:'Error',
                 msg: 'Please check the required fields in the form',
                 buttons: Ext.Msg.OK,
                 icon: Ext.Msg.ERROR
            });
        }
    },
    editpanelSave: function()
    {
        console.log('Clicked editpanelSave....');
        var active = this.getOrderTokenEdit().activeRecord;
        if (!active)
        {
            return;
        }
        var form = this.getOrderTokenEdit().getForm();
        if (form.isValid())
        {
            var selection = this.getOrderTokenList().getView().getSelectionModel().getSelection()[0];

            console.log('form.updateRecord.... ');
            form.updateRecord(selection);

            this.editpanelClose();
        }
    },
    disabledOrderType: function()
    {
        var store = this.getTokenAppStore();
        Ext.ComponentQuery.query("#idSTokenOrderType")[0].setDisabled(store.data.length > 0);
    },
    orderPanelReset: function()
    {
        console.log('Clicked orderPanelReset....');
        var fp = this.getOrderTokenOrder();
        var store = this.getTokenAppStore();
        store.removeAll()
        //this.getIssuerSearch().getForm().setActiveRecord(null);
        fp.getForm().reset();
        //this.loadData(fp,store);
        //this.getManageTokensList().hide();
        Ext.ComponentQuery.query("#idSIssuer")[0].disable();
        Ext.ComponentQuery.query("#idSInterface")[0].disable();
        Ext.ComponentQuery.query("#idSTokenProduct")[0].disable();

        this.disabledOrderType();
    },
    editpanelOpen: function()
    {
        $( "#divOrderTokenEdit" ).dialog(
        {
            open: function() { $(".ui-dialog-titlebar-close").hide(); },

            height: varEditPanelHeight,
            width : varEditPanelWidth,
            modal : varEditPanelStatus
        });
        this.getOrderTokenEdit().show();
    },
    editpanelClose: function()
    {
        console.log('Clicked editpanelClose....');
        $("#divOrderTokenEdit").dialog('close');
        this.getOrderTokenEdit().hide();
    },
    setActiveRecord: function(record)
    {
        this.getOrderTokenEdit().activeRecord = record;
        if (record)
        {
            this.getOrderTokenEdit().down('#idBtnSave').enable();
            this.getOrderTokenEdit().getForm().loadRecord(record);
        }
        else
        {
            this.getOrderTokenEdit().down('#idBtnSave').disable();
            this.getOrderTokenEdit().getForm().reset();
        }
    },
	//###################################################################################
    loadData: function(formpanel,store)
    {
        formpanel.getEl().mask();
        //getForm() retrieves the Ext.basic.Form (from Ext.panel.Form)
        var params = formpanel.getForm().getValues();
        //Write over
        store.getProxy().extraParams = params;
        //load
        store.load();
        formpanel.getEl().unmask();
    },

});