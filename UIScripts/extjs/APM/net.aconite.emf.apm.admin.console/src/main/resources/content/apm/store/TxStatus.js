Ext.define('Apm.store.TxStatus',
{
	extend		: 'Ext.data.Store',
	id			: 'idTxStatusStore',
	model		: 'Apm.model.TxStatus',
	data   		:				
				[
        {"id":1, "name":"Pending"},
        {"id":2, "name":"Completed"},
        {"id":3, "name":"Failed"},
        {"id":4, "name":"Waiting reconciliation"},
        {"id":5, "name":"Purged"},

				],
	sorters: [{property: 'name', direction: 'asc'}]	
});	
///////////////////////////////////////////////////