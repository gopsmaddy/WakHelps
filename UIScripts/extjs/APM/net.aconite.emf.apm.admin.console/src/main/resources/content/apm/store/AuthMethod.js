Ext.define('Apm.store.AuthMethod',
{
	extend		: 'Ext.data.Store',
	id			: 'idAuthMethodStore',
	model		: 'Apm.model.AuthMethod',
	data   		:
				[
					{name : 'Ldap'     ,  value: 'L'},
					{name : 'Native'   ,  value: 'N'},			
				],
	sorters: [{property: 'name', direction: 'asc'}]	
});	
///////////////////////////////////////////////////