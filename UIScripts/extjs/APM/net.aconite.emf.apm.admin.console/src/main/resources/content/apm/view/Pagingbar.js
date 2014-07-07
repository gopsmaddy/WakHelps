Ext.define('Apm.view.Pagingbar' ,	
{
	extend	: 'Ext.PagingToolbar',
    alias 	: 'widget.apppagingbar',
	
	requires: ['Ext.toolbar.Paging'],
	
		
	//id 		: 'idPagingbarView',
	//xtype		: 'pagingtoolbar',
	//store		: this.bbstore,	
	displayInfo	: true,
	displayMsg	: 'Displaying topics {0} - {1} of {2}',
	emptyMsg	: "No items to display",
	//pageSize	: varGridDefaultPageSize,	
	//plugins: [new Ext.ux.PageSizePlugin()]	

	initComponent: function() 
	{
        this.callParent(arguments);
    },	
	
});