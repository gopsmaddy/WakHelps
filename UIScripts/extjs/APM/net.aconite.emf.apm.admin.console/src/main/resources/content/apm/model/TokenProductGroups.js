Ext.define('Apm.model.TokenProductGroups', 
{
	extend	: 'Ext.data.Model',
	id		: 'idTokenProductGroupsModel',
	fields: 
			[				
				{name: 'id',						 mapping: 'id'	, type: 'int'	, useNull: true},
				{name: 'name', 						 mapping: 'name'},
				{name: 'issuerId',					 mapping: 'issuerId'	, type: 'int'},
				{name: 'groupCode',					 mapping: 'groupCode'}
			]
	
});	
