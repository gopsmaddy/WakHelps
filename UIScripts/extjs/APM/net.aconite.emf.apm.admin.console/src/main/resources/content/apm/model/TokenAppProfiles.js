Ext.define('Apm.model.TokenAppProfiles', 
{
	extend	: 'Ext.data.Model',
	id		: 'idTokenAppProfilesModel',
	fields: 
			[				
				{name: 'id',			             mapping: 'id'	, useNull: true},
				{name: 'tokenProductId',			 mapping: 'tokenProductId'	,type: 'int'},
				{name: 'appSequenceNumber',			 mapping: 'appSequenceNumber'	,type: 'int' 			},
                {name: 'status'      ,               mapping: 'status' , type: 'bool', convert: function(v){return (v === "on" || v === true) ? true : false;}},
				{name: 'name', 						 mapping: 'name'},
				{name: 'defaultAppFlag',	  		 mapping: 'defaultAppFlag', type: 'bool', convert: function(v){return (v === "on" || v === true) ? true : false;}},
				{name: 'pinRequiredFlag',	  		 mapping: 'pinRequiredFlag', type: 'bool', convert: function(v){return (v === "on" || v === true) ? true : false;}},
				{name: 'usesPinOfTokenAppSeqNum',	 mapping: 'usesPinOfTokenAppSeqNum', 	type: 'int'	, useNull: true},
				{name: 'pinLength',		 			 mapping: 'pinLength', 					type: 'int'	, useNull: true},
				{name: 'pinGenerationRuleId', 	 	 mapping: 'pinGenerationRuleId', 		type: 'int'	, useNull: true},
				{name: 'pinVerificationMethodId', 	 mapping: 'pinVerificationMethodId', 	type: 'int'	, useNull: true},
				{name: 'pinVerificationKeyId', 	 	 mapping: 'pinVerificationKeyId', 		type: 'int'	, useNull: true},
				{name: 'pinGenerationKeyId', 		 mapping: 'pinGenerationKeyId', 		type: 'int'	, useNull: true},
				{name: 'pinDeliveryMethodId', 		 mapping: 'pinDeliveryMethodId', 		type: 'int'	, useNull: true},
				{name: 'pinTriesNumber', 			 mapping: 'pinTriesNumber', 			type: 'int'	, useNull: true},
				{name: 'pukRequiredFlag',	  		 mapping: 'pukRequiredFlag', type: 'bool', convert: function(v){return (v === "on" || v === true) ? true : false;}},
				{name: 'usesPukOfTokenAppSeqNum', 	 mapping: 'usesPukOfTokenAppSeqNum', 	type: 'int'	, useNull: true},
				{name: 'pukLength', 			 	 mapping: 'pukLength', 					type: 'int'	, useNull: true},
				{name: 'pukGenerationRuleId', 		 mapping: 'pukGenerationRuleId', 		type: 'int'	, useNull: true},
				{name: 'panGenerationRuleId', 		 mapping: 'panGenerationRuleId', 		type: 'int'	, useNull: true},
				{name: 'allowPinChangeFlag',	  	 mapping: 'allowPinChangeFlag', type: 'bool', convert: function(v){return (v === "on" || v === true) ? true : false;}},
				{name: 'allowPukChangeFlag',	  	 mapping: 'allowPukChangeFlag' , type: 'bool', convert: function(v){return (v === "on" || v === true) ? true : false;}},
				{name: 'expiryInDays', 			 	 mapping: 'expiryInDays', 				type: 'int'	, useNull: true},
				{name: 'importEncryptionZoneId', 	 mapping: 'importEncryptionZoneId', 			type: 'int'	, useNull: true},
				{name: 'exportEncryptionZoneId', 	 mapping: 'exportEncryptionZoneId', 			type: 'int'	, useNull: true}
			]
	
});	
