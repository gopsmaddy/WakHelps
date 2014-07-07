Ext.define('Apm.model.EncryptionZone', 
{
	extend	: 'Ext.data.Model',
	id		: 'idEncryptionZoneModel',
	fields	: 
	[				
		{name: 'id'			, mapping: 'id'	, type: 'int'	, useNull: true},		
		{name: 'name'		, mapping: 'name'},
	]
	
});	
