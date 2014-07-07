var varEditPanelHeight=500;
var varEditPanelWidth=600;
var varEditPanelStatus=true;

Ext.define('Apm.view.persoBureau.Edit',
{
    extend: 'Ext.form.Panel',
    alias : 'widget.persoBureauedit',

	requires:
	[

		'Ext.form.Panel',
        'Ext.form.field.Date',
        'Ext.tip.QuickTipManager',
        'Ext.ux.statusbar.StatusBar',
        //'Ext.ux.statusbar.ValidationStatus',
        'Apm.view.EditorFooter',
        'Ext.ux.form.field.DateTime',
        'Apm.view.lookup.EncryptionZone'
	],

    //title 	: 'Edit User',
    //layout	: 'fit',
    //autoShow: true,


	id		: 'idPersoBureauEdit',
	renderTo: 'divPersoBureauEdit',
	title	: 'PersoBureau Details',
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
            fieldLabel	: '<span style="color:red;font-weight:bold">*</span>PersoBureau Name',
            blankText   : 'PersoBureau Name is required',
            name		: 'name',
            allowBlank	: false,
            readOnly	: false,
        },
		
        {
            id			: 'idCode',
            fieldLabel	: '<span style="color:red;font-weight:bold">*</span>PersoBureau Code',
            blankText   : 'PersoBureau Code is required',
            name		: 'code',
            allowBlank	: false,
            readOnly	: false,
        },		
		
        {
            id			: 'idDestinationDirectory',
            fieldLabel	: '<span style="color:red;font-weight:bold">*</span>Destination Directory',
            blankText   : 'Destination Directory is required',
            name		: 'destinationDirectory',
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
            id			: 'idExtractPan',
            fieldLabel	: '<span style="color:white;font-weight:bold">*</span>Extract Pan',
            name		: 'extractPan',
            xtype       : 'checkboxfield',
            readOnly	: false,
        },		
						
        {
            id			: 'idExtractPanDisplay',
            fieldLabel	: '<span style="color:white;font-weight:bold">*</span>Extract Pan Display',
            name		: 'extractPanDisplay',
            xtype       : 'checkboxfield',
            readOnly	: false,
        },                   

    ],
    dockedItems:
    [
         {
            id 		: 'idPersoBureauEditFooter',
            xtype	: 'editorfooter',
            dock	: 'bottom',
            ui		: 'footer',
            hidden	: false,
        },
        {
            xtype: 'statusbar',
            dock: 'bottom',
            id: 'idPersoBureauEditStatusbar',
            //defaultText: 'Ready',
            //plugins: Ext.create('Ext.ux.statusbar.ValidationStatus', {form:'idPersoBureauEdit'})
        }

    ],


	initComponent: function()
	{
        this.callParent(arguments);
    },

});

