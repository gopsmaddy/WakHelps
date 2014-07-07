Ext.define('Apm.store.PinGenerationRule',
{
	extend		: 'Ext.data.Store',
	id			: 'idPinGenerationRuleStore',
	model		: 'Apm.model.PinGenerationRule',
	data   		:
				[
				 	{id : 0,       name: '&nbsp;'},				 
					{id : 1,       name: 'Random PIN'},
					{id : 2,       name: 'PIN derived from IBM PIN offset'},
				],
	sorters: [{property: 'name', direction: 'asc'}]	
});	
///////////////////////////////////////////////////

