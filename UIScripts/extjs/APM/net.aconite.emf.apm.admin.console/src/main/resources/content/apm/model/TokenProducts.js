Ext.define('Apm.model.TokenProducts', 
{
	extend	: 'Ext.data.Model',
	id		: 'idTokenProductsModel',
	fields: 
			[				
				{name: 'id',						 mapping: 'id'	, type: 'int'	, useNull: true},		
				{name: 'issuerTokenProductCode',	 mapping: 'issuerTokenProductCode'},			
				{name: 'status',					 mapping: 'status', type: 'bool', convert: function(v){return (v === "on" || v === true) ? true : false;}},
				{name: 'name', 						 mapping: 'name'},
				{name: 'issuerId',					 mapping: 'issuerId', type: 'int'	, useNull: true},
				{name: 'tokenProductGroupId',		 mapping: 'tokenProductGroupId', type: 'int'	, useNull: true},
				{name: 'reissueTokenProductId', 	 mapping: 'reissueTokenProductId', type: 'int'	, useNull: true},
				{name: 'retentionDays', 			 mapping: 'retentionDays', type: 'int'	, useNull: true},
				{name: 'countryCode',				 mapping: 'countryCode'},
                {name: 'languageCode',				 mapping: 'languageCode'},
				{name: 'persoBureauId', 			 mapping: 'persoBureauId', type: 'int'	, useNull: true},
				{name: 'feedbackRequired',	  		 mapping: 'feedbackRequired', type: 'bool', convert: function(v){return (v === "on" || v === true) ? true : false;}}

				
			]
	
});	
