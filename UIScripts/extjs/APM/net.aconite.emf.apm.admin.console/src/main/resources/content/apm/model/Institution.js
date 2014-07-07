Ext.define('Apm.model.Institution', 
{
	extend	: 'Ext.data.Model',
	id		: 'idInstitutionModel',
	fields	: 
	[				
		{name: 'id'			, mapping: 'id'	, type: 'int'	, useNull: true},		
		{name: 'name'		, mapping: 'name'},
		{name: 'authMethod'	, mapping: 'authMethod'},
		{name: 'localEncryptionZoneId'	, mapping: 'localEncryptionZoneId'},
		{name: 'institutionEncryptionZoneId'	, mapping: 'institutionEncryptionZoneId'},
	]

});	
