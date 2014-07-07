var varEditPanelHeight=300;
var varEditPanelWidth=600;
var varEditPanelStatus=true;

Ext.define('Apm.view.sysconfig.Edit',
{
    extend: 'Ext.form.Panel',
    alias : 'widget.sysconfigedit',
	
	requires: 
	[
			
		'Ext.form.Panel',
        'Ext.form.field.Date',
        'Ext.tip.QuickTipManager',
        'Ext.ux.statusbar.StatusBar',
        //'Ext.ux.statusbar.ValidationStatus',

        'Ext.ux.form.field.DateTime',
		'Apm.view.EditorFooter',
        //'Apm.view.lookup.EncryptionZone',
		
	],
	
    //title 	: 'Edit User',
    //layout	: 'fit',
    //autoShow: true,
	
						
	id		: 'idSysConfigEdit',
    renderTo: 'divSysConfigEdit',
    title	: 'SysConfig Details',
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
            xtype		: 'displayfield',
            fieldLabel	: '<span style="color:white;font-weight:bold">*</span>Id',
            name		: 'id',
            value		: '<span style="color:black;">Id will be generated</span>',
            hidden      : true,

        },
        {
            id			: 'idName',
            fieldLabel	: '<span style="color:red;font-weight:bold">*</span>SysConfig Name',
            blankText   : 'Name is required',
            name		: 'name',
            allowBlank	: false,
            readOnly	: true,
			maxLength	: 128,
			enforceMaxLength: true,
        },
        {
            id			: 'idValue',
            fieldLabel	: '<span style="color:white;font-weight:bold">*</span>Value',
            blankText   : 'value is required',            
            name		: 'value',
            allowBlank	: true,
            readOnly	: false,
			maxLength	: 1028,
			enforceMaxLength: true,
        },
		{
            id			: 'idDescription',
            fieldLabel	: '<span style="color:white;font-weight:bold">*</span>Description',
            blankText   : 'Description is required',            
            name		: 'descr',
            allowBlank	: true,
            readOnly	: false,
			maxLength	: 512,
			enforceMaxLength: true,
        },        
        {
            id			: 'idStatus',
            fieldLabel  : '<span style="color:white;font-weight:bold">*</span>Status',
            xtype       : 'checkboxfield',
            name        : 'status',
            boxLabel    : 'Obsolete Flag'
        },

    ],
	dockedItems:
    [
        {
			id 		: 'idSysConfigEditFooter',
			xtype	: 'editorfooter',
			dock	: 'bottom',
            ui		: 'footer',
			hidden	: false,
		},
        {
            id		: 'idSysConfigEditStatusbar',
			xtype	: 'statusbar',
            dock	: 'bottom',            
            //defaultText: 'Ready',
            //plugins: Ext.create('Ext.ux.statusbar.ValidationStatus', {form:'idSysConfigEdit'})
        },

    ],

	initComponent: function() 
	{   
        this.callParent(arguments);
    },	
	
});

