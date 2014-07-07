var varSearchPanelHeight=450;
var varSearchPanelWidth=800;
var varSearchPanelStatus=true;

Ext.define('Apm.view.managetokens.Search',
{
    extend: 'Ext.form.Panel',
    alias : 'widget.managetokenssearch',

	requires:
	[

		'Ext.form.Panel',
        //'Ext.form.field.Date',
        'Ext.tip.QuickTipManager',
        'Ext.ux.statusbar.StatusBar',
        //'Ext.ux.statusbar.ValidationStatus',
        //'Ext.ux.form.field.DateTime',

        'Apm.view.SearchFooter',
        'Apm.view.lookup.Institution',
        'Apm.view.lookup.Issuer',
        'Apm.view.lookup.TokenProduct',
	],

	id		: 'idManageTokensSearch',
	renderTo: 'divManageTokensSearch',
	title	: 'Search Criteria',
	hidden	: false,
    activeRecord: null,
    defaultType: 'textfield',
    listClass: 'x-column-header-text',

    waitMsgTarget: true,
    frame	: true,
	//autoWidth: true,
    width	: (varSearchPanelWidth-30),
    height	: (varSearchPanelHeight-60),
    bodyPadding: 25,
    fieldDefaults:
    {
        labelAlign: 'left',
        labelWidth: 120,
        anchor: '100%',
    },

	items:
    [
        {
            id			: 'idSInstitution',
            fieldLabel	: '<span style="color:red;font-weight:bold">*</span>Institution',
            blankText   : 'Institution is required',
            xtype		: 'institutionlookup',
            name		: 'institutionId',
            allowBlank	: false,
            readOnly	: false,
            /*
			listeners:
			{
				select : function(combo, records,eOpts )
				{
				 var id = this.getValue();
				 Ext.StoreMgr.lookup('Issuer').load({params: {institutionId: id}});
				 Ext.ComponentQuery.query("#idSIssuer")[0].enable();

				},
			},  */
        },
        {
            id			: 'idSIssuer',
            fieldLabel	: '<span style="color:white;font-weight:bold">*</span>Issuer',
            blankText   : 'Issuer is required',
			xtype		: 'issuerlookup',
            name		: 'issuerId',
            allowBlank	: true,
            //readOnly	: true,
			disabled: true,
			/*
			listeners:
			{

				select : function(combo, records,eOpts )
				{
				 var id = this.getValue();
				 Ext.StoreMgr.lookup('TokenProducts').load({params: {issuerId: id}});
				 Ext.ComponentQuery.query("#idSTokenProduct")[0].enable();

				},

			}, */
        },
        {
            id			: 'idSTokenProduct',
            fieldLabel	: '<span style="color:white;font-weight:bold">*</span>Token Product',
            blankText   : 'You need to select at one Token Product',
            name		: 'tokenProductIds',
			xtype		: 'tokenproductlookup',
            allowBlank	: true,
            //readOnly	: true,
			disabled: true,
			multiSelect : false,
			size : 100,
        },
        {
            id			: 'idSClearPan',
            fieldLabel	: '<span style="color:white;font-weight:bold">*</span>Clear PAN',
            name		: 'clearPan',
            //readOnly	: true,
            listeners:  {
                change: {
                      fn: function (){
                        isProductIdMandatory();
                      }
                }
            },
			size : 100,
        },
        {
            id			: 'idSEncryptedPan',
            fieldLabel	: '<span style="color:white;font-weight:bold">*</span>Encrypted Pan',
            name		: 'encryptedPan',
			size : 100,
        },
        {
            id			: 'idSCustomerCode',
            fieldLabel	: '<span style="color:white;font-weight:bold">*</span>Customer Code',
            name		: 'customerCode',
			size : 100,
        },
        {
            id			: 'idSPanId',
            fieldLabel	: '<span style="color:white;font-weight:bold">*</span>PAN Id',
            name		: 'panId',
			size : 50,
			listeners:  {
                            change: {
                                  fn: function (){
                                    isProductIdMandatory();
                                  }
                            }
                        }
        },
        {
            id			: 'idSExpiryDate',
            fieldLabel	: '<span style="color:white;font-weight:bold">*</span>Expiry Date',
            name		: 'expiryDate',
			size : 50,
        },

        {
            id			: 'idSPanSequence',
            fieldLabel	: '<span style="color:white;font-weight:bold">*</span>PAN sequence',
            name		: 'panSequence',
			size : 50,
        },

    ],

  dockedItems:
    [
         {
            id 		: 'idManageTokensSearchFooter',
            xtype	: 'searchfooter',
            dock	: 'bottom',
            ui		: 'footer',
            hidden	: false,
        },
        {
            xtype: 'statusbar',
            dock: 'bottom',
            id: 'idManageTokensSearchStatusbar',
            //defaultText: 'Ready',
            //plugins: Ext.create('Ext.ux.statusbar.ValidationStatus', {form:'idIssuerSearch'})
        },

    ],

	initComponent: function()
	{
        this.callParent(arguments);
    },

});

function isProductIdMandatory(){
    var clearVal = Ext.getCmp("idSClearPan").value;
    var panID = Ext.getCmp("idSPanId").value;
    if((clearVal != null && clearVal.length > 0)||(panID != null && panID.length > 0)){
        Ext.getCmp("idSTokenProduct").forceSelection = false;
        document.getElementById(Ext.getCmp("idSTokenProduct").labelEl.id).innerHTML = '<span style="color:white;font-weight:bold">*</span>Token Product:';
        Ext.getCmp("idSTokenProduct").labelEl.innerHTML = '<span style="color:white;font-weight:bold">*</span>Token Product:';
        Ext.getCmp("idSTokenProduct").allowBlank = true;
    }
    else{
        Ext.getCmp("idSTokenProduct").forceSelection = true;
        document.getElementById(Ext.getCmp("idSTokenProduct").labelEl.id).innerHTML = '<span style="color:red;font-weight:bold">*</span>Token Product:';
        Ext.getCmp("idSTokenProduct").allowBlank = false;
    }
}

