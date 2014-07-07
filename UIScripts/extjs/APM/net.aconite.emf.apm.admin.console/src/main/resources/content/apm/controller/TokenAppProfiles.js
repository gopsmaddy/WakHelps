Ext.define('Apm.controller.TokenAppProfiles', 
{
    extend	: 'Ext.app.Controller',
	
	id		: 'idTokenAppProfilesController',
	
	stores	: ['TokenAppProfiles'],
	
	models	: ['TokenAppProfiles'],
	
	views	: 
	[
        		
		'tokenappprofiles.List',
    ],
	
	refs: 
	[
        {ref: 'tokenappprofilesList'		, selector: 'tokenappprofileslist'},
	
    ],
	
	/*
	refs: [
        {ref: 'feedList'	, selector: 'feedlist'},
        {ref: 'feedData'	, selector: 'feedlist dataview'},
        {ref: 'feedShow'	, selector: 'feedshow'},
        {ref: 'feedForm'	, selector: 'feedwindow form'},
        {ref: 'feedCombo'	, selector: 'feedwindow combobox'},
        {ref: 'articleGrid'	, selector: 'articlegrid'},
        {ref: 'feedWindow'	, selector: 'feedwindow'	, autoCreate: true	, xtype: 'feedwindow'}
    ],
    
    requires: ['FV.lib.FeedValidator'],
	*/
	
    init: function() 
	{
        this.control(
		{
            'viewport > panel': 
			{
                render: this.onPanelRendered
            },
			//'tokenproductslist': 
			//{
                //itemdblclick	: this.rowDblclicked,
				//selectionchange	: this.rowSelected
            //},
			
			//---------Start : Toolbar Actions---------------
			/*'tokenappprofilesList > toolbar button[action=add]': 
			{
                click: this.toolbarAdd
            },
			'tokenappprofilesList > toolbar button[action=sync]': 
			{
                click: this.toolbarSync
            },
			'tokenappprofilesList > toolbar button[action=edit]': 
			{
                click: this.toolbarEdit
            },
			'tokenappprofilesList > toolbar button[action=delete]': 
			{
                click: this.toolbarDelete
            },
			//---------End : Toolbar Actions---------------
			//---------Start : Column Actions---------------
			
			'tokenappprofilesList > actioncolumn [action=delete]': 
			{
                click: this.actioncolumnDelete
            },
			'tokenappprofilesList > actioncolumn [action=edit]': 
			{
                click: this.actioncolumnEdit
            },*/
			//---------End : Column Actions---------------
        });
    },
	
	/*
	onLaunch: function() 
	{
        var dataview = this.getFeedData(),
            store = this.getFeedsStore();            
        dataview.bindStore(store);
        dataview.getSelectionModel().select(store.getAt(0));
    },
	*/

    onPanelRendered: function() 
	{
        console.log('The panel was rendered '+new Date().getTime());
    },
	
	//////////////start: Grid Actions/////////////////	
	rowSelected: function(model, records) 
	{
		if (records[0]) 
		{
			//this.up('form').getForm().loadRecord(records[0]);	

			console.log('rowSelected ');
		//	Ext.ComponentQuery.query("tokenappprofilesList > toolbar button[action=delete]")[0].enable();
		//	Ext.ComponentQuery.query("tokenappprofilesList > toolbar button[action=edit]")[0].enable();	
		
		}		
	},
	rowDblclicked: function(dv, record, item, index, e) 
	{
		console.log('rowDblclicked ');
		/*
		$( "#dialog-modal" ).dialog(
		{
			height: 600,
			width: 600,
			//modal: true
		});
		*/
	},
	//////////////end: Grid Actions/////////////////
	//////////////start: Toolbar Actions////////////
	toolbarAdd: function() 
	{
		console.log('Clicked toolbarAdd');		
        // empty record
		store = this.getTokenAppProfilesStore();
		model = this.getTokenAppProfilesModel();
		store.insert(0, new model);
		//rowEditing.startEdit(0, 0);	
		//cellEditing.startEdit(0, 3);	
		//this.getSchedulerTaskLookup().forceSelection=false;
    },	
	toolbarSync: function() 
	{
		console.log('Clicked toolbarSync');		
        store = this.getTokenAppProfilesStore(); 
		store.sync();
    },
	toolbarEdit: function() 
	{	
		console.log('Clicked toolbarEdit');		
    },
	toolbarDelete: function() 
	{			
	/*	var selection = this.getTokenappprofilesList().getView().getSelectionModel().getSelection()[0];
		if (selection) 
		{					
			console.log('Clicked toolbarDelete '+selection.get('id'));			
			Ext.Msg.confirm
			(
				'Confirm', 
				'Are you sure you want to delete '+selection.get('name')+' task?',
				function (btn) 
				{
					if (btn == 'yes')
					{
						store = this.getTokenAppProfilesStore(); 	
						store.remove(selection);
					}
				}
			);	
			
		}*/
    },
	//////////////end: Toolbar Actions/////////////////
	//////////////start: actioncolumn Actions////////////	
	actioncolumnDelete: function(grid, rowIndex, colIndex) 
	{	
		console.log('Clicked actioncolumnDelete ');
		var record = grid.getStore().getAt(rowIndex);		
		console.log('Clicked actioncolumnDelete '+ record.get('id'));
		
		Ext.Msg.confirm
		(
			'Confirm', 
			'Are you sure you want to delete '+record.get('name')+' task?',
			function (btn) 
			{
				if (btn == 'yes')
				{
					store = this.getTokenAppProfilesStore(); 	
					store.removeAt(rowIndex); 
				}
			}
		);				
	},
	actioncolumnEdit: function()
	{	
		console.log('Clicked actioncolumnEdit');		
    },
	//////////////end: Toolbar Actions/////////////////
	/*
	editUser: function(grid, record) 
	{
		console.log('Double clicked on ' + record.get('name'));
		
        //var view = Ext.widget('useredit');
        //view.down('form').loadRecord(record);
    },
	
	updateUser: function(button) 
	{
        console.log('clicked the Save button');
		
		//var win    = button.up('window'),
        //form   = win.down('form'),
        //record = form.getRecord(),
        //values = form.getValues();

		//record.set(values);
		//win.close();
		
		//this.getUsersStore().sync();
    }
	*/
});