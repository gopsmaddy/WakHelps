var varEditPanelHeight=500;
var varEditPanelWidth=600;
var varEditPanelStatus=true;

Ext.define('Apm.view.managetokens.Detail',
{
    extend: 'Ext.form.Panel',
    alias : 'widget.managetokensdetail',
	
	requires: 
	[
			
		'Ext.form.Panel',
        'Ext.form.field.Date',
        'Ext.tip.QuickTipManager',
        'Apm.view.lookup.TokenAppStatus',
        'Apm.view.lookup.TokenProduct',
        'Apm.view.EditorFooter',
        'Ext.ux.statusbar.StatusBar',
	],
	

						
	id		: 'idManageTokensDetail',
	renderTo: 'divManageTokensDetail',
	//title	: 'Token Details',
	hidden	: true,
    activeRecord: null,
    defaultType: 'textfield',
    listClass: 'x-column-header-text',

    waitMsgTarget: true,
    //frame	: true,
    width	: (varEditPanelWidth-30),
    height	: (varEditPanelHeight-60),
    bodyPadding: 5,
    fieldDefaults:
    {
        labelAlign: 'left',
        labelWidth: 90,
        anchor: '100%'
    },
	items: 
    [
        {
            xtype		: 'displayfield',
            fieldLabel	: 'Id',
            name		: 'id',
            value		: '<span style="color:black;">Id will be generated</span>',

        },
        {
            id			: 'idEStatus',
            fieldLabel	: 'Active',
            xtype		: 'displayfield',
            name		: 'status',
        },
        {
            id			: 'idETokenProductId',
            fieldLabel	: 'Token Product',
            name        : 'tokenProductId',
		    xtype		: 'tokenproductlookup',

        },
        {
            id			: 'idEPANId',
            fieldLabel	: 'PAN Id',
            name        : 'panId',
            xtype		: 'displayfield',
        },
        {
            id			: 'idEDefaultTokenAppId',
            fieldLabel	: 'Default App Id',
            name        : 'defaultTokenAppId',
            xtype		: 'displayfield',
        },
        {
            id			: 'idECustomerCode',
            fieldLabel	: 'CustomerCode',
            name        : 'customerCode',
            xtype		: 'displayfield',
        },
        {
            id			: 'idEAppSeqeunceNumber',
            fieldLabel	: 'App Sequence Number',
            name        : 'appSequenceNumber',
            xtype		: 'displayfield',
        },
        {
           id			: 'idEStatusId',
           fieldLabel	: 'Application Status',
           name         : 'statusId',
		   allowBlank   :false,
           blankText    : 'Please Specify a status for the application',
           xtype		: 'tokenappstatuslookup',
        },
        {
           id			: 'idEPanEncrypted',
           fieldLabel	: 'Pan Encrypted',
           name        : 'panEncrypted',
           xtype		: 'displayfield',
        },
        {
          id			: 'idEPanDisplay',
          fieldLabel	: 'Pan Display',
          name        : 'panDisplay',
          xtype		: 'displayfield',
        },
        {
          id			: 'idEPanAlias',
          fieldLabel	: 'Pan Alias',
          name        : 'panAlias',
          xtype		: 'displayfield',
        },
        {
          id			: 'idEPanSequenceNumber',
          fieldLabel	: 'Pan Sequence Number',
          name        : 'panSeqNumber',
          xtype		: 'displayfield',
        },
        {
          id			: 'idEExpiryDate',
          fieldLabel	: 'Expiry Date',
          name        : 'expiryDate',
          xtype		: 'displayfield',
        },
    /*    {
           id			: 'idEPinId',
           fieldLabel	: 'Pin Id',
           name        : 'pinId',
           xtype		: 'displayfield',
        },         {
           id			: 'idEPinTriesRemaining',
           fieldLabel	: 'Pin Remaining tries',
           name        : 'pinTriesRemaining',
           xtype		: 'displayfield',
        },
        {
           id			: 'idEPukId',
           fieldLabel	: 'Puk Id',
           name        : 'pukId',
           xtype		: 'displayfield',
        },
        */

    ],
    dockedItems:
    [
        {
            id 		: 'idManageTokensEditFooter',
            xtype	: 'editorfooter',
            dock	: 'bottom',
            ui		: 'footer',
            hidden	: false,
        },
//        {
//            id		: 'idmanageTokensEditStatusbar',
//            xtype	: 'statusbar',
//            dock	: 'bottom',
//            //defaultText: 'Ready',
//            //plugins: Ext.create('Ext.ux.statusbar.ValidationStatus', {form:'idTokenProductsEdit'})
//        },
	],

	initComponent: function() 
	{   
        this.callParent(arguments);
    },	
	
});

