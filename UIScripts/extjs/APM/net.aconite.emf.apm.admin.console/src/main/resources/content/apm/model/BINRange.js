Ext.define('Apm.model.BINRange', 
{
	extend	: 'Ext.data.Model',
	id		: 'idBINRangeModel',
	fields: 
			[				
				{name: 'id',						 mapping: 'id'	, type: 'int'	, useNull: true},		
				{name: 'tokenProductId',	 		 mapping: 'tokenProductId'	, type: 'int'	, useNull: true},
				{name: 'appSeqNumber',	 		 	 mapping: 'appSeqNumber'	, type: 'int'	, useNull: true},
				{name: 'binFrom',					 mapping: 'binFrom' , type: 'int'},
				{name: 'binTo', 					 mapping: 'binTo', type: 'long'},
				{name: 'description',	  		 	 mapping: 'description'}

				
			]
	
});	
