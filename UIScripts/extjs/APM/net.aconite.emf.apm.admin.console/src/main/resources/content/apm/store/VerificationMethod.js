Ext.define('Apm.store.VerificationMethod',
{
	extend		: 'Ext.data.Store',
	id			: 'idVerificationMethodStore',
	model		: 'Apm.model.VerificationMethod',
	data   		:
				[
					{id : 1,       name: 'VISA PIN Verification Value (PVV)'},
					{id : 2,       name: 'IBM PIN offset'},
					{id : 3,       name: 'Password comparison'},
				],
	sorters: [{property: 'name', direction: 'asc'}]	
});	
///////////////////////////////////////////////////