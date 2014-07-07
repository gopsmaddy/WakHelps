var varEditPanelHeight=700;
var varEditPanelWidth=600;
var varEditPanelStatus=true;

Ext.define('Apm.view.ordertoken.Edit',
{
    extend: 'Ext.form.Panel',
    alias : 'widget.ordertokenedit',
	
	requires: 
	[
		'Ext.form.Panel',
        'Ext.form.field.Date',
        'Ext.tip.QuickTipManager',
        'Ext.ux.statusbar.StatusBar',
        //'Ext.ux.statusbar.ValidationStatus',

        'Apm.view.lookup.PinDeliveryMethod',
        'Apm.view.lookup.PinPukFlag',
        'Apm.view.lookup.Country',
        'Apm.view.lookup.Title',

        'Ext.ux.form.field.DateTime',
        'Apm.view.EditorFooter',
	],
						
	id		: 'idOrderTokenEdit',
    renderTo: 'divOrderTokenEdit',
    title	: 'Token Applications Details',
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
        anchor: '100%'
    },
	items: 
    [
        {
            id: 'idETabsPanel',
            xtype	: 'tabpanel',
            activeTab: 0,
            items:
            [
                {
                    ////////////////////////////// GENERAL TAB /////////////////////////////////////////////
                    title:'General',
                    defaultType: 'textfield',
                    bodyPadding: 5,
                    defaults:
                    {
                        labelWidth: 160,
                        anchor: '100%',
                    },
                    items:
                    [
                        {
                            xtype: 'fieldset',
                            title: 'PIN Delivery Method',
                            defaultType: 'textfield',
                            defaults:
                            {
                                labelWidth: 160,
                                anchor: '100%',
                            },
                            items:
                            [
                                {
                                    id          : 'idEPinDeliveryMethod',
                                    fieldLabel  : '<span style="color:red;font-weight:bold">*</span>Pin Delivery Method',
                                    name        : 'pinDeliveryMethod',
                                    xtype		: 'pindeliverymethodlookup',
                                    blankText   : 'Please Specify a Pin Delivery Method',
                                    allowBlank  : false,
                                },
                                {
                                    fieldLabel  : 'PIN PUK Flag',
                                    xtype		: 'pinpukflaglookup',
                                    name        : 'pinPukFlag',
                                },
                            ],
                        },
                        {
                            id: 'idESequenceNumber',
                            fieldLabel: '<span style="color:red;font-weight:bold">*</span>Sequence Number',
                            name: 'sequenceNumber',
                            xtype: 'numberfield',
                            hideTrigger: true,
                            allowBlank  : false,
                            maxLength: 2,
                        },
                        {
                            id: 'idEPANId',
                            fieldLabel: 'PAN ID',
                            name: 'panId',
                            xtype: 'numberfield',
                            hideTrigger: true,
                            maxLength: 15,
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            defaultType: 'textfield',
                            items:
                            [
                                {
                                    id: 'idEPAN',
                                    fieldLabel: 'PAN',
                                    name: 'pan',
                                    labelWidth: 160,
                                    flex: 1,
                                    maxLength: 32,
                                },
//                                {
//                                    xtype: 'splitter'
//                                },
//                                {
//                                    id: 'idEPANEncrypted',
//                                    fieldLabel: 'Encrypted?',
//                                    name: 'panEncrypted',
//                                    xtype: 'checkboxfield',
//                                    labelWidth: 80,
//                                },
                            ],
                        },
                        {
                            xtype: 'splitter'
                        },
                        {
                            id: 'idEPANSeqNumber',
                            fieldLabel: 'PAN Sequence Number',
                            name: 'panSeqNumber',
                            xtype: 'numberfield',
                            minValue: 0,
                            maxValue: 999,
                            maxLength: 3,
                        },
                        {
                            id: 'idEPANExpiryDate',
                            fieldLabel: 'PAN Expiry Date',
                            name: 'panExpiryDate',
                            xtype: 'datefield',
                            format: 'Y-m-d',
                            submitFormat: 'Y-m-d',
                        },
                        {
                            id: 'idEPINId',
                            fieldLabel: 'PIN ID',
                            name: 'pinId',
                            xtype: 'numberfield',
                            hideTrigger: true,
                            maxLength: 15,
                        },
                        {
                            id: 'idEIssuerPINId',
                            fieldLabel: 'Issuer PIN ID',
                            name: 'issuerPinId',
                            xtype: 'numberfield',
                            hideTrigger: true,
                            maxLength: 32,
                        },
                        {
                            id: 'idEPUKId',
                            fieldLabel: 'PUK ID',
                            name: 'pukId',
                            xtype: 'numberfield',
                            hideTrigger: true,
                            maxLength: 15,
                        },
                        {
                            id: 'idEIssuerPUKId',
                            fieldLabel: 'Issuer PUK ID',
                            name: 'issuerPukId',
                            xtype: 'numberfield',
                            hideTrigger: true,
                            maxLength: 32,
                        },
                        {
                            id: 'idEPrevPANId',
                            fieldLabel: 'Previous PAN ID',
                            name: 'prevPanId',
                            xtype: 'numberfield',
                            hideTrigger: true,
                            maxLength: 15,
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            defaultType: 'textfield',
                            items:
                            [
                                {
                                    id: 'idEPrevPAN',
                                    fieldLabel: 'Previous PAN',
                                    name: 'prevPan',
                                    labelWidth: 160,
                                    flex: 1,
                                    maxLength: 32,
                                },
//                                {
//                                    xtype: 'splitter'
//                                },
//                                {
//                                    id: 'idEPrevPANEncrypted',
//                                    fieldLabel: 'Encrypted?',
//                                    name: 'prevPanEncrypted',
//                                    xtype: 'checkboxfield',
//                                    labelWidth: 80,
//                                },
                            ],
                        },
                        {
                            xtype: 'splitter'
                        },
                        {
                            id: 'idEPrevPANSeqNumber',
                            fieldLabel: 'Previous PAN Sequence Number',
                            name: 'prevPanSequenceNumber',
                            xtype: 'numberfield',
                            minValue: 0,
                            maxValue: 999,
                            maxLength: 3,
                        },
                        {
                            id: 'idEPrevPANExpiryDate',
                            fieldLabel: 'Previous PAN Expiry Date',
                            name: 'prevPanExpiryDate',
                            xtype: 'datefield',
                            format: 'Y-m-d',
                            submitFormat: 'Y-m-d',
                        },
                    ],
                },
                {
                    ////////////////////////////// MAILER TAB /////////////////////////////////////////////
                    id: 'idEMailerTab',
                    title:'Mailer',
                    defaultType: 'textfield',
                    bodyPadding: 5,
                    defaults:
                    {
                        anchor: '100%',
                    },
                    items:
                    [
                        {
                            xtype: 'fieldset',
                            title: 'General Information',
                            defaultType: 'textfield',
                            bodyPadding: 5,
                            layout: 'anchor',
                            defaults:
                            {
                                labelWidth: 120,
                                anchor: '100%'
                            },
                            items:
                            [
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaultType: 'textfield',
                                    items:
                                    [
                                        {
                                            fieldLabel: '<span style="color:red;font-weight:bold">*</span>Mailing Code',
                                            name: 'mailingCode',
                                            xtype: 'numberfield',
                                            hideTrigger: true,
                                            allowBlank: false,
                                            labelWidth: 120,
                                            flex: 1,
                                            maxLength: 3,
                                        },
                                        {
                                            fieldLabel: 'Priority',
                                            name: 'priority',
                                            flex: 1,
                                            labelAlign: 'right',
                                            maxLength: 10,
                                        },
                                        {
                                            fieldLabel: 'Language Code',
                                            name: 'mailerlanguageCode',
                                            flex: 1,
                                            labelAlign: 'right',
                                            maxLength: 3,
                                        },
                                    ],
                                },
                                {
                                    xtype: 'splitter'
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    fieldLabel: 'Compagny',
                                    layout: 'hbox',
                                    combineErrors: true,
                                    defaultType: 'textfield',
                                    defaults:
                                    {
                                        hideLabel: 'true'
                                    },
                                    items:
                                    [
                                        {
                                            fieldLabel: 'Compagny Name',
                                            name: 'companyName',
                                            flex: 1,
                                            emptyText: 'Name',
                                            maxLength: 128,
                                        },
                                        {
                                            xtype: 'splitter'
                                        },
                                        {
                                            fieldLabel: 'Compagny Contact',
                                            name: 'companyContact',
                                            flex: 1,
                                            emptyText: 'Contact',
                                            maxLength: 128,
                                        },
                                    ],
                                },
                                {
                                    fieldLabel: 'Pass Through Data',
                                    name: 'mailerPassThroughData',
                                    maxLength: 2056,
                                },
                            ],
                        },
                        {
                            xtype	: 'tabpanel',
                            activeTab: 0,
                            items:
                            [
                                {
                                    ///////////////////////////// TOKEN HOLDER TAB ////////////////////////////////////
                                    title:'Token Holder',
                                    defaultType: 'textfield',
                                    bodyPadding: 5,
                                    defaults:
                                    {
                                        labelWidth: 50,
                                        anchor: '100%',
                                    },
                                    items:
                                    [
                                        {
                                            xtype: 'fieldset',
                                            title: 'Token Holder Name',
                                            defaultType: 'textfield',
                                            bodyPadding: 5,
                                            layout: 'anchor',
                                            defaults:
                                            {
                                                anchor: '100%'
                                            },
                                            items:
                                            [
                                                {
                                                    fieldLabel: 'Title',
                                                    name: 'title',
                                                    xtype: 'titlelookup',
                                                },
                                                {
                                                    xtype: 'fieldcontainer',
                                                    fieldLabel: '<span style="color:red;font-weight:bold">*</span>Name',
                                                    layout: 'hbox',
                                                    combineErrors: true,
                                                    defaultType: 'textfield',
                                                    defaults:
                                                    {
                                                        hideLabel: 'true'
                                                    },
                                                    items:
                                                    [
                                                        {
                                                            fieldLabel: '<span style="color:red;font-weight:bold">*</span>First Name',
                                                            name: 'firstName',
                                                            allowBlank: false,
                                                            flex: 3,
                                                            emptyText: 'First',
                                                            maxLength: 128,
                                                        },
                                                        {
                                                            fieldLabel: 'MiddleName',
                                                            name: 'middleName',
                                                            flex: 3,
                                                            emptyText: 'Middle',
                                                            margins: '0 0 0 6',
                                                            maxLength: 128,
                                                        },
                                                        {
                                                            fieldLabel: 'Last Name',
                                                            name: 'lastName',
                                                            flex: 3,
                                                            margins: '0 0 0 6',
                                                            emptyText: 'Last',
                                                            maxLength: 128,
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            xtype: 'fieldset',
                                            title: 'Token Holder Address',
                                            defaultType: 'textfield',
                                            layout: 'anchor',
                                            defaults:
                                            {
                                                anchor: '100%',
                                            },
                                            items:
                                            [
                                                {
                                                    fieldLabel: 'Street Address 1',
                                                    name: 'holderAddressLine1',
                                                    maxLength: 128,
                                                },
                                                {
                                                    fieldLabel: 'Street Address 2',
                                                    name: 'holderAddressLine2',
                                                    maxLength: 128,
                                                },
                                                {
                                                    fieldLabel: 'Street Address 3',
                                                    name: 'holderAddressLine3',
                                                    maxLength: 128,
                                                },
                                                {
                                                    fieldLabel: 'Street Address 4',
                                                    name: 'holderAddressLine4',
                                                    maxLength: 128,
                                                },
                                                {
                                                    fieldLabel: 'Street Address 5',
                                                    name: 'holderAddressLine5',
                                                    maxLength: 128,
                                                },
                                                {
                                                    fieldLabel: 'Street Address 6',
                                                    name: 'holderAddressLine6',
                                                    maxLength: 128,
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    items:
                                                    [
                                                        {
                                                            xtype: 'textfield',
                                                            fieldLabel: 'Town',
                                                            name: 'holderTown',
                                                            flex: 2,
                                                            maxLength: 128,
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            fieldLabel: 'Post Code',
                                                            name: 'holderPostCode',
                                                            labelAlign: 'right',
                                                            flex: 1,
                                                            maxLength: 32,
                                                        },
                                                    ],
                                                },
                                                {
                                                    xtype: 'splitter'
                                                },
                                                {
                                                    xtype: 'countrylookup',
                                                    fieldLabel: 'Country',
                                                    name: 'holderCountry',
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    ///////////////////////////// ISSUER BRANCH TAB  /////////////////////////////////
                                    title:'Issuer Branch',
                                    defaultType: 'textfield',
                                    bodyPadding: 5,
                                    defaults:
                                    {
                                        labelWidth: 50,
                                        anchor: '100%',
                                    },
                                    items:
                                    [
                                        {
                                            xtype: 'fieldset',
                                            title: 'Issuer Branch Name',
                                            defaultType: 'textfield',
                                            bodyPadding: 5,
                                            layout: 'anchor',
                                            defaults:
                                            {
                                                anchor: '100%'
                                            },
                                            items:
                                            [
                                                {
                                                    xtype: 'fieldcontainer',
                                                    fieldLabel: 'Branch',
                                                    layout: 'hbox',
                                                    combineErrors: true,
                                                    defaultType: 'textfield',
                                                    defaults:
                                                    {
                                                        hideLabel: 'true'
                                                    },
                                                    items:
                                                    [
                                                        {
                                                            fieldLabel: 'Branch Code',
                                                            name: 'branchCode',
                                                            flex: 2,
                                                            emptyText: 'Code',
                                                            maxLength: 64,
                                                        },
                                                        {
                                                            fieldLabel: 'Branch Name',
                                                            name: 'branchName',
                                                            flex: 3,
                                                            emptyText: 'Name',
                                                            margins: '0 0 0 6',
                                                            maxLength: 64,
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            xtype: 'fieldset',
                                            title: 'Issuer Branch Address',
                                            defaultType: 'textfield',
                                            layout: 'anchor',
                                            defaults:
                                            {
                                                anchor: '100%',
                                            },
                                            items:
                                            [
                                                {
                                                    fieldLabel: 'Street Address 1',
                                                    name: 'issuerAddressLine1',
                                                    maxLength: 128,
                                                },
                                                {
                                                    fieldLabel: 'Street Address 2',
                                                    name: 'issuerAddressLine2',
                                                    maxLength: 128,
                                                },
                                                {
                                                    fieldLabel: 'Street Address 3',
                                                    name: 'issuerAddressLine3',
                                                    maxLength: 128,
                                                },
                                                {
                                                    fieldLabel: 'Street Address 4',
                                                    name: 'issuerAddressLine4',
                                                    maxLength: 128,
                                                },
                                                {
                                                    fieldLabel: 'Street Address 5',
                                                    name: 'issuerAddressLine5',
                                                    maxLength: 128,
                                                },
                                                {
                                                    fieldLabel: 'Street Address 6',
                                                    name: 'issuerAddressLine6',
                                                    maxLength: 128,
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    items:
                                                    [
                                                        {
                                                            xtype: 'textfield',
                                                            fieldLabel: 'Town',
                                                            name: 'issuerTown',
                                                            flex: 2,
                                                            maxLength: 128,
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            fieldLabel: 'Post Code',
                                                            name: 'issuerPostCode',
                                                            labelAlign: 'right',
                                                            flex: 1,
                                                            maxLength: 32,
                                                        },
                                                    ],
                                                },
                                                {
                                                    xtype: 'splitter'
                                                },
                                                {
                                                    xtype: 'countrylookup',
                                                    fieldLabel: 'Country',
                                                    name: 'issuerCountry',
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    ////////////////////////////// SMS TAB /////////////////////////////////////////////
                    id: 'idESMSTab',
                    title:'SMS',
                    defaultType: 'textfield',
                    bodyPadding: 5,
                    items:
                    [
                        {
                            xtype: 'fieldset',
                            title: '',
                            defaultType: 'textfield',
                            layout: 'anchor',
                            defaults:
                            {
                                labelWidth: 150,
                                anchor: '100%',
                            },
                            items:
                            [
                                {
                                    fieldLabel: '<span style="color:red;font-weight:bold">*</span>Mobile Phone Number',
                                    name: 'mobilePhoneNumber',
                                    allowBlank: false,
                                    xtype: 'numberfield',
                                    hideTrigger: true,
                                    maxLength: 32,
                                },
                                {
                                    fieldLabel: '<span style="color:red;font-weight:bold">*</span>Language Code',
                                    name: 'smsLanguageCode',
                                    allowBlank: false,
                                    maxLength: 3
                                    ,
                                },
                                {
                                    fieldLabel: 'Pass Through Data',
                                    name: 'smsPassThroughData',
                                    maxLength: 2056,
                                },
                            ],
                        },
                    ],
                },
                {
                    ////////////////////////////// WEB TAB /////////////////////////////////////////////
                    id: 'idEWebTab',
                    title:'Web',
                    defaultType: 'textfield',
                    bodyPadding: 5,
                    items:
                    [
                        {
                            xtype: 'fieldset',
                            title: '',
                            defaultType: 'textfield',
                            layout: 'anchor',
                            defaults:
                            {
                                labelWidth: 150,
                                anchor: '100%',
                            },
                            items:
                            [
                                {
                                    fieldLabel: '<span style="color:red;font-weight:bold">*</span>Customer Code',
                                    name: 'customerCode',
                                    allowBlank: false,
                                    maxLength: 32,
                                },
                                {
                                    fieldLabel: 'Pass Through Data',
                                    name: 'webPassThroughData',
                                    maxLength: 2056,
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
	dockedItems:
    [
        {
            id 		: 'iddivOrderTokenEditFooter',
            xtype	: 'editorfooter',
            dock	: 'bottom',
            ui		: 'footer',
            hidden	: false,
        },
        {
            xtype: 'statusbar',
            dock: 'bottom',
            id: 'iddivOrderTokenEditStatusbar',
        },

    ],

	initComponent: function() 
	{   
        this.callParent(arguments);
    },	
	
});

