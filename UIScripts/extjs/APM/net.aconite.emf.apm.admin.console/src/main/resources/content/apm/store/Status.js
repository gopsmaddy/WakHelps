Ext.define('Apm.store.Status',
{
	extend		: 'Ext.data.Store',
	id			: 'idStatusStore',
	model		: 'Apm.model.Status',
	data   		:				
				[
        {"value":true, "name":"Active"},
        {"value":false, "name":"Inactive"},
				],
	sorters: [{property: 'name', direction: 'asc'}]	
});	
///////////////////////////////////////////////////