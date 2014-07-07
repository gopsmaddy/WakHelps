var varEditPanelHeight=650;
var varEditPanelWidth=600;
var varEditPanelStatus=true;

Ext.define('Apm.view.interface.Edit',
{
    extend: 'Ext.form.Panel',
    alias : 'widget.interfaceedit',

	requires:
	[

		'Ext.form.Panel',
        'Ext.form.field.Date',
        'Ext.tip.QuickTipManager',
        'Ext.ux.statusbar.StatusBar',
        //'Ext.ux.statusbar.ValidationStatus',

        'Ext.ux.form.field.DateTime',
        'Apm.view.EditorFooter',
		'Apm.view.lookup.InterfaceType',
        'Apm.view.lookup.EncryptionZone',
        'Apm.view.lookup.Institution',


	],

    //title 	: 'Edit User',
    //layout	: 'fit',
    //autoShow: true,


	id		: 'idInterfaceEdit',
	renderTo: 'divInterfaceEdit',
	title	: 'Interface Details',
	hidden	: true,
	activeRecord: null,
    defaultType: 'textfield',
    listClass: 'x-column-header-text',

    waitMsgTarget: true,
    //frame	: true,
    width	: (varEditPanelWidth-30),
    height	: (varEditPanelHeight-150),
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
            xtype		: 'displayfield',
            fieldLabel	: '<span style="color:white;font-weight:bold">*</span>Id',
            name		: 'id',
            value		: '<span style="color:black;">Id will be generated</span>',

        },
        {
            id			: 'idName',
            fieldLabel	: '<span style="color:red;font-weight:bold">*</span>Interface Name',
            blankText   : 'Interface Name is required',
            name		: 'name',
            allowBlank	: false,
            readOnly	: false,
			maxLength	: 128,
			enforceMaxLength: true,
        },
        {
            id			: 'idInterfaceType',
            fieldLabel	: '<span style="color:red;font-weight:bold">*</span>Interface Type',
            blankText   : 'Interface Type is required',
			xtype		: 'interfacetypelookup',
            name		: 'interfaceTypeId',
            allowBlank	: false,
            readOnly	: false,
        },

        {
            id			: 'idInstitution',
            fieldLabel	: '<span style="color:red;font-weight:bold">*</span>Institution',
            blankText   : 'Institution is required',
            xtype		: 'institutionlookup',
            name		: 'institutionId',
            allowBlank	: false,
            readOnly	: false,
        },
        {
            id			: 'idEncryptionZone',
            fieldLabel	: '<span style="color:red;font-weight:bold">*</span>Encryption Zone',
            blankText   : 'Encryption Zone is required',
            xtype		: 'encriptionzonelookup',
            name		: 'encryptionZoneId',
            allowBlank	: false,
            readOnly	: false,
        },
        {
            id			: 'idIPAddress',
            fieldLabel	: '<span style="color:white;font-weight:bold">*</span>IP Address',
            blankText   : 'IP Address is required',
            name		: 'ipAddress',
            allowBlank	: true,
            readOnly	: false,
			maxLength	: 15,
			enforceMaxLength: true,
			maskRe		: /[\d\.]/i,
			regex		: /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
			regexText	: 'Must be a numeric IP address in the format xxx.xxx.xxx.xxx',
        },             
        {
            id			: 'idIPPort',
            fieldLabel	: '<span style="color:white;font-weight:bold">*</span>IP Port',
            blankText   : 'IP Port is required',
            name		: 'ipPort',
            allowBlank	: true,
            readOnly	: false,
			maxLength	: 6,
			enforceMaxLength: true,
			maskRe		: /[\d]/i,
			regex		: /^\d{1,6}$/,
			regexText	: 'Must be a numeric port',
        },
        {
            id			: 'idTimeout',
            fieldLabel	: '<span style="color:white;font-weight:bold">*</span>Timeout',
            blankText   : 'Timeout is required',
            name		: 'timeout',
            allowBlank	: true,
            readOnly	: false,
			maxLength	: 10,
			enforceMaxLength: true,
			maskRe		: /[\d]/i,
			regex		: /^\d{1,10}$/,
			regexText	: 'Must be a numeric timeout',
        },
        {
            id			: 'idKeepAlive',
			xtype       : 'checkboxfield',
            fieldLabel	: '<span style="color:white;font-weight:bold">*</span>KeepAlive',
            name		: 'keepAlive',

            readOnly	: false,
        },
        {
            id			: 'idSession',
			xtype       : 'checkboxfield',
            fieldLabel	: '<span style="color:white;font-weight:bold">*</span>Session',
            name		: 'session',
            readOnly	: false,
        },
        {
            id			: 'idSSL',
			xtype       : 'checkboxfield',
            fieldLabel	: '<span style="color:white;font-weight:bold">*</span>SSL',
            name		: 'ssl',
            readOnly	: false,
        },
        {
            id			: 'idKeystorePath',
            fieldLabel	: '<span style="color:white;font-weight:bold">*</span>Keystore Path',
            blankText   : 'Keystore Path is required',
            name		: 'keystorePath',
            allowBlank	: true,
            readOnly	: false,
			maxLength	: 128,
			enforceMaxLength: true,
        },
        {
            id			: 'idKeystorePassword',
            fieldLabel	: '<span style="color:white;font-weight:bold">*</span>Keystore Password',
            blankText   : 'Keystore Password is required',
            name		: 'keystorePassword',
            allowBlank	: true,
            readOnly	: false,
			maxLength	: 128,
			enforceMaxLength: true,
        },
        {
            id			: 'idCertificateAlias',
            fieldLabel	: '<span style="color:white;font-weight:bold">*</span>Certificate Alias',
            blankText   : 'Certificate Alias is required',
            name		: 'certificateAlias',
            allowBlank	: true,
            readOnly	: false,
			maxLength	: 128,
			enforceMaxLength: true,
        },
        {
            id			: 'idKeyPassword',
            fieldLabel	: '<span style="color:white;font-weight:bold">*</span>Key Password',
            blankText   : 'Key Password is required',
            name		: 'keyPassword',
            allowBlank	: true,
            readOnly	: false,
			maxLength	: 128,
			enforceMaxLength: true,
        },
    ],
    dockedItems:
    [
        {
            id 		: 'idInterfaceEditFooter',
            xtype	: 'editorfooter',
            dock	: 'bottom',
            ui		: 'footer',
            hidden	: false,
        },
        {
            xtype: 'statusbar',
            dock: 'bottom',
            id: 'idInterfaceEditStatusbar',
            //defaultText: 'Ready',
            //plugins: Ext.create('Ext.ux.statusbar.ValidationStatus', {form:'idInterfaceEdit'})
        },

    ],


	initComponent: function()
	{
        this.callParent(arguments);
    },

});

