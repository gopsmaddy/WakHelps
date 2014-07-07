Ext.define('Apm.model.AuditLog',
{
	extend	: 'Ext.data.Model',
	id		: 'idAuditLogModel',
	fields: 
			[				
				{name: 'datetime',	mapping: 'datetime'},
				{name: 'username', mapping: 'username'},
				{name: 'originator', mapping: 'originator'},
				{name: 'description', mapping: 'description'} ,
			]
	
});	
