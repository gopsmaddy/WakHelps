var varEditPanelHeight=510;
var varEditPanelWidth=680;
var varEditPanelStatus=true;

function renderToDeliveryMethodLookup(value)
{
	if(Ext.StoreMgr.lookup('PinDeliveryMethod')!=null && Ext.StoreMgr.lookup('PinDeliveryMethod').findRecord('id', value)!=null && Ext.StoreMgr.lookup('PinDeliveryMethod').findRecord('id', value).get('name')!=null)
		return Ext.String.format (Ext.StoreMgr.lookup('PinDeliveryMethod').findRecord('id', value).get('name'));
	else
		return value;
};

function renderToTxStatusLookup(value)
{
	if(Ext.StoreMgr.lookup('TxStatus')!=null && Ext.StoreMgr.lookup('TxStatus').findRecord('id', value)!=null && Ext.StoreMgr.lookup('TxStatus').findRecord('id', value).get('name')!=null)
		return Ext.String.format (Ext.StoreMgr.lookup('TxStatus').findRecord('id', value).get('name'));
	else
		return value;
};


Ext.define('Apm.view.transactionquery.Detail',
{
    extend: 'Ext.form.Panel',
    alias : 'widget.transactionquerydetail',
	
	requires: 
	[
			
		'Ext.form.Panel',
		'Ext.tab.Panel',
        'Ext.form.field.Date',
        'Ext.tip.QuickTipManager',
        'Apm.view.lookup.TokenAppStatus',
        'Apm.view.lookup.TxStatus',
        'Apm.view.lookup.TokenProduct',
        'Apm.view.lookup.PinDeliveryMethod',
        'Apm.view.EditorFooter',
        'Ext.ux.statusbar.StatusBar',
	],
	

						
	id		: 'idTransactionQueryDetail',
	renderTo: 'divTransactionQueryDetail',
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
        labelWidth: 120,
        anchor: '100%'
    },

  items:
                    [
                       {
                        xtype		: 'tabpanel',
                        height: 450,
                            items: [
                               {
                                 title: 'Summary',
                                    items:[
                                                            {
                                                                id			: 'idEStatus',
                                                                fieldLabel	: 'Status',
                                                                renderer	: 'displayfield',
                                                                name		: 'status',
                                                            },
                                                            {
                                                                xtype		: 'displayfield',
                                                                fieldLabel	: 'System DateTime',
                                                                name		: 'systemDateTime',
                                                                value		: '<span style="color:black;">Id will be generated</span>',

                                                            },
                                                            {
                                                                id			: 'idERequestDateTime',
                                                                fieldLabel	: 'Request DateTime',
                                                                xtype		: 'displayfield',
                                                                name		: 'requestDateTime',
                                                            },
                                                            {
                                                                id			: 'idEResponseDateTime',
                                                                fieldLabel	: 'Response DateTime',
                                                                xtype		: 'displayfield',
                                                                name		: 'responseDateTime',
                                                            },
                                                            {
                                                                id			: 'idEResponseCode',
                                                                fieldLabel	: 'responseCode',
                                                                xtype		: 'displayfield',
                                                                name		: 'responseCode',
                                                            },
                                                            {
                                                                id			: 'idEErrorDescription',
                                                                fieldLabel	: 'Error Description',
                                                                xtype		: 'displayfield',
                                                                name		: 'errorDescription',
                                                            },
                                    ]

                                 },
                                {
                                    title: 'Request',
                                    bodyPadding: 10,
                                    autoScroll : true,
                                    items:[
                                                            {
                                                                id			: 'idERequestDateTime',
                                                                fieldLabel	: 'DateTime',
                                                                xtype		: 'displayfield',
                                                                name		: 'requestDateTime',
                                                            },
                                                            {
                                                                id			: 'idERequestPANId',
                                                                fieldLabel	: 'PAN Id',
                                                                xtype		: 'displayfield',
                                                                name		: 'requestPanId',
                                                            }, {
                                                                id			: 'idERequestPANDisplay',
                                                                fieldLabel	: 'PAN Display',
                                                                xtype		: 'displayfield',
                                                                name		: 'requestPanDisplay',
                                                            },
                                                            {
                                                                id			: 'idERequestTokenAppSeqNum',
                                                                fieldLabel	: 'TokenAppSeqNum',
                                                                xtype		: 'displayfield',
                                                                name		: 'requestTokenAppSeqNum',
                                                            },
                                                            {
                                                                id			: 'idERequestIssuerTokenProductCode',
                                                                fieldLabel	: 'Issuer Token ProductCode',
                                                                xtype		: 'displayfield',
                                                                name		: 'requestIssuerTokenProductCode',
                                                            },
                                                            {
                                                                id			: 'idERequestPinExpiryDate',
                                                                fieldLabel	: 'PIN Expiry Date',
                                                                xtype		: 'displayfield',
                                                                name		: 'requestPinExpiryDate',
                                                            },
                                                            {
                                                                id			: 'idERequestPanExpiryDate',
                                                                fieldLabel	: 'PAN Expiry Date',
                                                                xtype		: 'displayfield',
                                                                name		: 'requestPanExpiryDate',
                                                            },
                                                            {
                                                                id			: 'idERequestPinDeliveryMethod',
                                                                fieldLabel	: 'PIN Delivery Method',
                                                                 xtype		: 'displayfield',
                                                                name		: 'requestPinDeliveryMethod',
                                                            },
                                                     /*       {
                                                                id			: 'idERequestFirstName',
                                                                fieldLabel	: 'Firstname',
                                                                xtype		: 'displayfield',
                                                                name		: 'requestFirstName',
                                                            },
                                                            {
                                                                id			: 'idERequestLastName',
                                                                fieldLabel	: 'Lastname',
                                                                xtype		: 'displayfield',
                                                                name		: 'requestLastName',
                                                            },
                                                            {
                                                                id			: 'idErequestAddress1',
                                                                fieldLabel	: 'Address 1',
                                                                xtype		: 'displayfield',
                                                                name		: 'requestAddress1',
                                                            },
                                                            {
                                                                id			: 'idErequestAddress2',
                                                                fieldLabel	: 'Address 2',
                                                                xtype		: 'displayfield',
                                                                name		: 'requestAddress2',
                                                            },
                                                            {
                                                                id			: 'idErequestAddress3',
                                                                fieldLabel	: 'Address 3',
                                                                xtype		: 'displayfield',
                                                                name		: 'requestAddress3',
                                                            },
                                                            {
                                                                id			: 'idErequestAddress4',
                                                                fieldLabel	: 'Address 4',
                                                                xtype		: 'displayfield',
                                                                name		: 'requestAddress4',
                                                            },
                                                            {
                                                                id			: 'idErequestAddress5',
                                                                fieldLabel	: 'Address 5',
                                                                xtype		: 'displayfield',
                                                                name		: 'requestAddress5',
                                                            },
                                                            {
                                                                id			: 'idErequestAddress6',
                                                                fieldLabel	: 'Address 6',
                                                                xtype		: 'displayfield',
                                                                name		: 'requestAddress6',
                                                            },
                                                            {
                                                                id			: 'idERequestTown',
                                                                fieldLabel	: 'Town',
                                                                xtype		: 'displayfield',
                                                                name		: 'requestTown',
                                                            },
                                                            {
                                                                id			: 'idERequestPostCode',
                                                                fieldLabel	: 'Postcode',
                                                                xtype		: 'displayfield',
                                                                name		: 'requestPostCode',
                                                            },      */
                                                            {
                                                                id			: 'idERequestCountryCode',
                                                                fieldLabel	: 'Country',
                                                                xtype		: 'displayfield',
                                                                name		: 'requestCountryCode',
                                                            },
                                                            {
                                                                id			: 'idERequestCompanyName',
                                                                fieldLabel	: 'Company Name',
                                                                xtype		: 'displayfield',
                                                                name		: 'requestCompanyName',
                                                            },
                                                            {
                                                                id			: 'idERequestCompanyContact',
                                                                fieldLabel	: 'Company Contact',
                                                                xtype		: 'displayfield',
                                                                name		: 'requestCompanyContact',
                                                            },
                                                       /*     {
                                                                id			: 'idErequestAddress6',
                                                                fieldLabel	: 'Address 6',
                                                                xtype		: 'displayfield',
                                                                name		: 'requestAddress6',
                                                            },     */
                                                            {
                                                                id			: 'idERequestNumberOfTokens',
                                                                fieldLabel	: 'No. of Tokens',
                                                                xtype		: 'displayfield',
                                                                name		: 'requestNumberOfTokens',
                                                            },
                                                            {
                                                                id			: 'idERequestGeneratePinFlag',
                                                                fieldLabel	: 'Generate PIN',
                                                                xtype		: 'displayfield',
                                                                name		: 'requestGeneratePinFlag',
                                                            },
                                                            {
                                                                id			: 'idERequestGeneratePukFlag',
                                                                fieldLabel	: 'Generate PUK',
                                                                xtype		: 'displayfield',
                                                                name		: 'requestGeneratePukFlag',
                                                            },
                                    ]
                                },
                                {
                                    title: 'Response',
                                    autoScroll : true,
                                    items:[
                                                            {
                                                                id			: 'idEResponseDateTime',
                                                                fieldLabel	: 'DateTime',
                                                                xtype		: 'displayfield',
                                                                name		: 'responseDateTime',
                                                            },
                                                            {
                                                                id			: 'idEResponsePANId',
                                                                fieldLabel	: 'PAN Id',
                                                                xtype		: 'displayfield',
                                                                name		: 'responsePanId',
                                                            },
                                                             {
                                                               id			: 'idEResponsePANDisplay',
                                                               fieldLabel	: 'PAN Display',
                                                               xtype		: 'displayfield',
                                                               name		: 'responsePanDisplay',
                                                             },
                                                            {
                                                                id			: 'idEResponseTokenAppSeqNum',
                                                                fieldLabel	: 'TokenAppSeqNum',
                                                                xtype		: 'displayfield',
                                                                name		: 'responseTokenAppSeqNum',
                                                            },
                                                            {
                                                                id			: 'idEResponseIssuerTokenProductCode',
                                                                fieldLabel	: 'Issuer Token ProductCode',
                                                                xtype		: 'displayfield',
                                                                name		: 'responseIssuerTokenProductCode',
                                                            },
                                    ]
                                }
                            ],


                       },





                    ],




    dockedItems:
    [
        {
            id 		: 'idTransactionQueryEditFooter',
            xtype	: 'editorfooter',
            dock	: 'bottom',
            ui		: 'footer',
            hidden	: false,
        },
        {
            id		: 'idTransactionQueryEditStatusbar',
            xtype	: 'statusbar',
            dock	: 'bottom',
            //defaultText: 'Ready',
            //plugins: Ext.create('Ext.ux.statusbar.ValidationStatus', {form:'idTokenProductsEdit'})
        },
	],

	initComponent: function() 
	{   
        this.callParent(arguments);
    },	
	
});

