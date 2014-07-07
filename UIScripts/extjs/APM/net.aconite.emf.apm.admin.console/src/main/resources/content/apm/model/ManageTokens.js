Ext.define('Apm.model.ManageTokens',
{
	extend	: 'Ext.data.Model',
	id		: 'idManageTokensModel',
	fields: 
			[				
				{name: 'id',						 mapping: 'id'	, type: 'int'	, useNull: true},
				{name: 'status',					 mapping: 'status', type: 'bool'},
				{name: 'tokenProductId',   			 mapping: 'tokenProductId', type: 'int'	, useNull: true},
				{name: 'defaultTokenAppId',			 mapping: 'defaultTokenAppId', type: 'int'	, useNull: true},
				{name: 'customerCode',				 mapping: 'customerCode'},
				{name: 'appSequenceNumber',			 mapping: 'appSequenceNumber'	,type: 'int' 			},
				{name: 'statusId',			         mapping: 'statusId'	,type: 'int' 			},
				{name: 'panEncrypted',				 mapping: 'panEncrypted'},
				{name: 'panDisplay',				 mapping: 'panDisplay'},
				{name: 'panAlias',				     mapping: 'panAlias'},
				{name: 'panSeqNumber',				 mapping: 'panSeqNumber', type: 'int',},
				{name: 'expiryDate',				 mapping: 'expiryDate'},
				{name: 'pinId',			             mapping: 'pinId'	, type: 'int' 			},
				{name: 'pinTriesRemaining',			 mapping: 'pinTriesRemaining'	, type: 'int' 			},
				{name: 'pukId',			             mapping: 'pukId'	, type: 'int' 			},
                {name: 'panId',			             mapping: 'panId', type: 'int'	, useNull: true},
			]
	
});	
