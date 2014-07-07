Ext.define('Apm.store.PinPukFlag',
{
	extend		: 'Ext.data.Store',
	id			: 'idPinPukFlagStore',
	model		: 'Apm.model.PinPukFlag',
	data   		:
				[
				 	{id : 0,       name: '&nbsp;'},
					{id : 1,       name: 'PIN'},
					{id : 2,       name: 'PUK'},
					{id : 3,       name: 'PIN and PUK'},
				],
	sorters: [{property: 'id', direction: 'asc'}]
});	
///////////////////////////////////////////////////
