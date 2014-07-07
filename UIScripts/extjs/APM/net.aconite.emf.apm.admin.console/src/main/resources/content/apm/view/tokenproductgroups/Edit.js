var varEditPanelHeight=300;
var varEditPanelWidth=600;
var varEditPanelStatus=true;

Ext.define('Apm.view.tokenproductgroups.Edit',
{
    extend: 'Ext.form.Panel',
	//extend: 'Ext.window.Window',
    alias : 'widget.tokenproductgroupsedit',
	
	requires: 
	[
		'Ext.form.Panel',
        'Ext.form.field.Date',
        'Ext.tip.QuickTipManager',
        'Ext.ux.statusbar.StatusBar',
        //'Ext.ux.statusbar.ValidationStatus',

        'Ext.ux.form.field.DateTime',
        'Apm.view.EditorFooter',
        'Apm.view.lookup.Issuer',
	],

	id		: 'idTokenProductGroupsEdit',
    renderTo: 'divTokenProductGroupsEdit',
   // title	: 'TokenProductGroups Details',
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

            },
            {
                id			: 'idEName',
                fieldLabel	: '<span style="color:red;font-weight:bold">*</span>Name',
                blankText   : 'Name is required',
                name		: 'name',
                allowBlank	: false,
                readOnly	: false,
                maxLength	: 128,
                enforceMaxLength: true,
            },
            {
                id			: 'idEIssuer',
                fieldLabel	: '<span style="color:red;font-weight:bold">*</span>Issuer',
                blankText   : 'Issuer is required',
                xtype		: 'issuerlookup',
                name		: 'issuerId',
                allowBlank	: false,
                readOnly	: false,
            },
            {
                id			: 'idEGroupCode',
                fieldLabel	: 'Group Code',
              //  blankText   : 'Name is required',
                name		: 'groupCode',
                allowBlank	: true,
                readOnly	: false,
                maxLength	: 20,
                enforceMaxLength: true,
            },
        ],

	dockedItems:
    [
         {
            id 		: 'idTokenProductGroupsEditFooter',
            xtype	: 'editorfooter',
            dock	: 'bottom',
            ui		: 'footer',
            hidden	: false,
        },
        {
            xtype: 'statusbar',
            dock: 'bottom',
            id: 'idTokenProductGroupsEditStatusbar',
            //defaultText: 'Ready',
           // plugins: Ext.create('Ext.ux.statusbar.ValidationStatus', {form:'idTokenProductGroupsEdit'})
        }

    ],

	initComponent: function() 
	{   
        this.callParent(arguments);
    },	
	
});

