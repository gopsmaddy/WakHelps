Ext.define('Apm.model.Issuer', 
{
	extend	: 'Ext.data.Model',
	id		: 'idIssuerModel',
	fields	: 
	[				
		{name: 'id'			, mapping: 'id'	, type: 'int'	, useNull: true},		
		{name: 'name'		, mapping: 'name'},
		{name: 'institutionId', mapping: 'institutionId'},
		{name: 'countryId'	, mapping: 'countryId'},
	]

});	
