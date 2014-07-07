Ext.define('Apm.store.GenerationRule',
{
	extend		: 'Ext.data.Store',
	id			: 'idGenerationRuleStore',
	model		: 'Apm.model.GenerationRule',
	data   		:
				[
					{id : '1',       name: 'Random PIN'},
					{id : '2',       name: 'PIN derived from IBM PIN offset'},
				],
	sorters: [{property: 'name', direction: 'asc'}]	
});	
///////////////////////////////////////////////////

