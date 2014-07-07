Ext.define('Apm.store.SchedulerType',
{
	extend		: 'Ext.data.Store',
	id			: 'idAuthMethodStore',
	model		: 'Apm.model.SchedulerType',
	data   		:				
				[
					{name : 'pinmailer'                 ,  value: 'pinmailer'},
					{name : 'pinsms'                 ,  value: 'pinsms'},
					{name : 'housekeeping'                 ,  value: 'housekeeping'},
					{name : 'tokenimportfeedback'       ,  value: 'tokenimportfeedback'},
					{name : 'tokenorderfeedback'        ,  value: 'tokenorderfeedback'},
					{name : 'institutiondataextract'    ,  value: 'institutiondataextract'},
					{name : 'issuerdataextract'         ,  value: 'issuerdataextract'},
					{name : 'tokenproductgroupdataextract'         ,  value: 'tokenproductgroupdataextract'},
					{name : 'tokenproductdataextract'         ,  value: 'tokenproductdataextract'},
					{name : 'binrangedataextract'         ,  value: 'binrangedataextract'},
					{name : 'tokenappprofiledataextract'         ,  value: 'tokenappprofiledataextract'},
					{name : 'tokendataextract'         ,  value: 'tokendataextract'},
					{name : 'tokenapplicationdataextract'         ,  value: 'tokenapplicationdataextract'},
					{name : 'pindataextract'         ,  value: 'pindataextract'},
					{name : 'accesslogdataextract'         ,  value: 'accesslogdataextract'},
					{name : 'transactionlogdataextract'         ,  value: 'transactionlogdataextract'},
				],
	sorters: [{property: 'name', direction: 'asc'}]	
});	
///////////////////////////////////////////////////