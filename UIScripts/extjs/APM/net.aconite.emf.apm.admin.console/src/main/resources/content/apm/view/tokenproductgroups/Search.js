var varSearchPanelHeight=220;
var varSearchPanelWidth=800;
var varSearchPanelStatus=true;

Ext.define('Apm.view.tokenproductgroups.Search',
{
    extend: 'Ext.form.Panel',
    alias : 'widget.tokenproductgroupssearch',
	
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
        //'Apm.view.lookup.Country',
	],
	

						
	id		: 'idTokenProductGroupsSearch',
	renderTo: 'divTokenProductGroupsSearch',
	title	: 'TokenProductGroups Search Criteria',
	hidden	: false,
    activeRecord: null,
    defaultType: 'textfield',
    listClass: 'x-column-header-text',

    waitMsgTarget: true,
    //frame	: true,
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
        },
        {
            id			: 'idSIssuer',
            fieldLabel	: '<span style="color:red;font-weight:bold">*</span>Issuer',
            blankText   : 'Issuer is required',
            xtype		: 'issuerlookup',
            name		: 'issuerId',
            allowBlank	: false,
            readOnly	: false,
        },
        
    ],
	
    dockedItems:
    [
         {
            id 		: 'idTokenProductGroupsSearchFooter',
            xtype	: 'searchfooter',
            dock	: 'bottom',
            ui		: 'footer',
            hidden	: false,
        },
        {
            xtype: 'statusbar',
            dock: 'bottom',
            id: 'idTokenProductGroupsSearchStatusbar',
            //defaultText: 'Ready',
            //plugins: Ext.create('Ext.ux.statusbar.ValidationStatus', {form:'idTokenProductGroupsSearch'})
        },

    ],
	
	initComponent: function() 
	{   
        this.callParent(arguments);
    },	
	
});

