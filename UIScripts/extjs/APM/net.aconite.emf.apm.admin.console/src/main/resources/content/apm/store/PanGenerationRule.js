Ext.define('Apm.store.PanGenerationRule',
{
	extend		: 'Ext.data.Store',
	id			: 'idPanGenerationRuleStore',
	model		: 'Apm.model.PanGenerationRule',
	data   		:
				[
					{id : 1,       name: 'Sequential PAN'},
					{id : 2,       name: 'Linear congruential PAN'},
				],
	sorters: [{property: 'name', direction: 'asc'}]	
});	
///////////////////////////////////////////////////

