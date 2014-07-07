Ext.define('Apm.model.DataExtractLog',
{
	extend	: 'Ext.data.Model',
	id		: 'idDataExtractLogModel',
	fields: 
			[				
				{name: 'id',	mapping: 'id'},
				{name: 'originator', mapping: 'originator'},
				{name: 'extractTypeId', mapping: 'extractTypeId'},
				{name: 'startDateTime', mapping: 'startDateTime'} ,
				{name: 'finishDateTime', mapping: 'finishDateTime'} ,
				{name: 'idFrom', mapping: 'idFrom'} ,
				{name: 'idTo', mapping: 'idTo'} ,
				{name: 'dateFrom', mapping: 'dateFrom'} ,
				{name: 'dateTo', mapping: 'dateTo'} ,
				{name: 'status', mapping: 'status'} ,
				{name: 'files', mapping: 'files'}
			]
	
});	
