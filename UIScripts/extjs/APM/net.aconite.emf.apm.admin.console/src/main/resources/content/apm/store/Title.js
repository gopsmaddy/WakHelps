Ext.define('Apm.store.Title',
{
	extend		: 'Ext.data.Store',
	id			: 'idTitleStore',
	model		: 'Apm.model.Title',
	data   		:
				[
				 	{id : 0,       name: '&nbsp;'},
					{id : 1,       name: 'Mr'},
					{id : 2,       name: 'Mrs'},
				],
	sorters: [{property: 'id', direction: 'asc'}]
});	
///////////////////////////////////////////////////
