var varEditPanelHeight=300;
var varEditPanelWidth=600;
var varEditPanelStatus=true;

Ext.define('Apm.view.institution.Edit',
{
    extend: 'Ext.form.Panel',
    alias : 'widget.institutionedit',
	
	requires: 
	[
			
		'Ext.form.Panel',
        'Ext.form.field.Date',
        'Ext.tip.QuickTipManager',
        'Ext.ux.statusbar.StatusBar',
        //'Ext.ux.statusbar.ValidationStatus',

        'Ext.ux.form.field.DateTime',
        'Apm.view.EditorFooter',
        'Apm.view.lookup.EncryptionZone',
		'Apm.view.lookup.AuthMethod',
		
	],
	
    //title 	: 'Edit User',
    //layout	: 'fit',
    //autoShow: true,
	
						
	id		: 'idInstitutionEdit',
    renderTo: 'divInstitutionEdit',
    title	: 'Institution Details',
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
            id			: 'idName',
            fieldLabel	: '<span style="color:red;font-weight:bold">*</span>Institution Name',
            blankText   : 'Name is required',
            name		: 'name',
            allowBlank	: false,
            readOnly	: false,
			maxLength	: 128,
			enforceMaxLength: true,
        },
        {
            id			: 'idAuthmethod',
            fieldLabel	: '<span style="color:red;font-weight:bold">*</span>Auth Method',
            blankText   : 'Auth Method is required',
            xtype		: 'authmethodlookup',
            name		: 'authMethod',
            allowBlank	: false,
            readOnly	: false,
        },
        {
            id			: 'idLocalzone',
            fieldLabel	: '<span style="color:red;font-weight:bold">*</span>Local Zone',
            blankText   : 'Local Zone is required',
            xtype		: 'encriptionzonelookup',
            name		: 'localEncryptionZoneId',
             allowBlank	: false,
            readOnly	: false,
        },
        {
            id			: 'idInstzone',
            fieldLabel	: '<span style="color:red;font-weight:bold">*</span>Institution Zone',
            blankText   : 'Institution Zone is required',
            xtype		: 'encriptionzonelookup',
            name		: 'institutionEncryptionZoneId',
            allowBlank	: false,
            readOnly	: false,
        },

    ],
	dockedItems:
    [
        {
            id 		: 'idInstitutionEditFooter',
            xtype	: 'editorfooter',
            dock	: 'bottom',
            ui		: 'footer',
            hidden	: false,
        },
        {
            xtype: 'statusbar',
            dock: 'bottom',
            id: 'idInstitutionEditStatusbar',
            //defaultText: 'Ready',
            //plugins: Ext.create('Ext.ux.statusbar.ValidationStatus', {form:'idInstitutionEdit'})
        },

    ],

	initComponent: function() 
	{   
        this.callParent(arguments);
    },	
	
});

