var varSearchPanelHeight=250;
var varSearchPanelWidth=800;
var varSearchPanelStatus=true;

Ext.define('Apm.view.tokenproducts.Search',
{
    extend: 'Ext.form.Panel',
    alias : 'widget.tokenproductssearch',
	
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
        'Apm.view.lookup.MTokenProductGroup',

	],
	

	id		: 'idTokenProductsSearch',
	renderTo: 'divTokenProductsSearch',
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
        labelWidth: 150,
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
            //readOnly	: true,
            /*
			listeners: 
			{       
				select : function(combo, records,eOpts )
				{   
				 var id = this.getValue();
				 Ext.StoreMgr.lookup('Issuer').load({params: {institutionId: id}});
				 Ext.ComponentQuery.query("#idSIssuer")[0].enable();

				},      
			},*/
        },
        {
            id			: 'idSIssuer',
            fieldLabel	: '<span style="color:red;font-weight:bold">*</span>Issuer',
            blankText   : 'Issuer is required',
			xtype		: 'issuerlookup',
            name		: 'issuerId',
            allowBlank	: false,
            //readOnly	: true,
			disabled: true,
			/*
			listeners: 
			{       

				select : function(combo, records,eOpts )
				{   
				 var id = this.getValue();
				 Ext.StoreMgr.lookup('TokenProductGroups').load({params: {issuerId: id}});


				},  						
				
			},	*/
        },

        {
            id			    : 'idSTokenProductGroups',
            fieldLabel	    : '<span style="color:white;font-weight:bold">*</span>Token Product Groups',
            blankText       : 'You need to select at least one Token Product group',
			name		    : 'tokenProductGroups',
			xtype		    : 'mtokenproductgrouplookup',
			//forceSelection	: false,
			//autoSelect:false ,
            allowBlank	    : true,
            //readOnly	    : true,
			disabled        : true,
			multiSelect     : true,
			size            : 10,
			//pageSize        : 10,
			//value           : '<span style="color:blue;font-size:9px">x</span>'
			//emptyText       : 'You can select multiple values on this list, deselect values to clear the selection',
			//submitEmptyText : false,
        },
        /*{
            xtype		: 'displayfield',
            fieldLabel	: '<span style="color:white;font-weight:bold"></span>',
            //name		: 'option',
            value		: '<span style="color:#808080;font-size:12px;">(You can select multiple values on this list, deselect values to clear the selection)</span>',
        }, */


        
    ],
	
  dockedItems:
    [
         {
            id 		: 'idTokenProductSearchFooter',
            xtype	: 'searchfooter',
            dock	: 'bottom',
            ui		: 'footer',
            hidden	: false,
        },
        {
            xtype: 'statusbar',
            dock: 'bottom',
            id: 'idTokenProductSearchStatusbar',
            //defaultText: 'Ready',
            //plugins: Ext.create('Ext.ux.statusbar.ValidationStatus', {form:'idIssuerSearch'})
        },

    ],
	
	initComponent: function() 
	{   
        this.callParent(arguments);
    },	
	
});

