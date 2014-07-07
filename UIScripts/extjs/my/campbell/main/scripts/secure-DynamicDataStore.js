///////////////Documents Store////////////////////////////////////////////
		
		
		myDocumentsStore = new Ext.data.Store
		 (
		 	{
				// load using HTTP
				proxy : new Ext.data.HttpProxy
				(
					{																
						method: 'GET',
						prettyUrls: false,
						url:varGetReleasedDocumentsCustomFilteredDatesAsStringURL					
						 //url: 'http://localhost:9080/CampbellWebApplication/UI/jsp/Campbell.jsp?ServiceName=KSDK&MethodName=getReleasedDocumentsCustomFilteredDatesAsString&args=args&responseFormat=1&userType=WHOLESALER&userid=161909'	
						 //url:'/KurtosysWSFactoryProxy.aspx?ServiceName=KSDK&MethodName=getReleasedDocumentsCustomFilteredDatesAsString&args=args&responseFormat=1&userType=WHOLESALER&userid=161909'
						//url:'http://fwlondev3/TrcRel08/KAPI/KurtosysWSFactoryProxy.aspx?ServiceName=KSDK&MethodName=getReleasedDocumentsCustomFilteredDatesAsString&args=args&responseFormat=1&userType=WHOLESALER&userid=161909'
					}
				),
				remoteSort:true,
				sortInfo: { field: "referenceDate", direction: "DESC" },	
				// the return will be XML, so lets set up a reader
				reader: new Ext.data.XmlReader
				(
					{
					   // records will have an "Item" tag
					   record: 'item',
					   id: '>uid',
					   totalProperty: 'totalCount'
				   }, 
				   [
					   // set up the fields mapping into the xml doc
					   // The first needs mapping, the others are very basic
			        {name: 'id'							, mapping: '>id'},
							{name: 'description'		, mapping: '>description'},
							{name: 'title' 					, mapping: '>title'},
							{name: 'referenceDate'	, mapping: '>referenceDate'},
							//-------------Investors--------------------
							{name: 'FundName'				, mapping: '>FundName'}, 				//?????
							{name: 'InvestorName'		, mapping: '>InvestorName'},
							{name: 'InvestorID' 		, mapping: '>InvestorID'},
							{name: 'AccountNumber'	, mapping: '>AccountNumber'},
							{name: 'TaxID'					, mapping: '>TaxID'},
							{name: 'AccountTitle'		, mapping: '>AccountTitle'},
							//-------------Funds,Forms------------------
							{name: 'FAID' 					, mapping: '>FAID'},						//?????
							{name: 'PartnershipName', mapping: '>FAPartnershipName'}, //?????
							{name: 'DocumentType'		, mapping: '>DocumentType'},
							{name: 'CommissionType'	, mapping: '>CommissionType'},
							
							//-------------Downloads------------------
							{name: 'fileName'				, mapping: '>fileName'},
							//-------------Meta-----------------------
							{name: 'documentTypeId'	, mapping: '>documentTypeId'},	
							{name: 'fileSize'				, mapping: '>fileSize'},
							{name: 'publicationId'	, mapping: '>publicationId'},
							{name: 'versionNo'			, mapping: '>versionNo'}	
							
				   ]
			   ),
			   listeners: 
			   {
			   	load: function()
			   	{
			   		this.loaded = true;		 		   		  		
			   	}
			  }		   
			}
		);
		
		
	
	///////////Masking///////////////////
		
		var myDocumentsMask = new Ext.LoadMask
		(
			Ext.getBody(), 
			{
					msg:"Please wait...",	
					removeMask:true,			
					store:myDocumentsStore
			}
		);
		
		///////////////myAccount Store ////////////////////////////////////////////
		
		
		myAccountStore = new Ext.data.Store
		 (
		 	{
				// load using HTTP
				proxy : new Ext.data.HttpProxy
				(
					{																
						method: 'GET',
						prettyUrls: false,
						url:varGetReleasedDocumentsCustomFilteredDatesAsStringURL					
						 //url: 'http://localhost:9080/CampbellWebApplication/UI/jsp/Campbell.jsp?ServiceName=KSDK&MethodName=getReleasedDocumentsCustomFilteredDatesAsString&args=args&responseFormat=1&userType=WHOLESALER&userid=161909'	
						 //url:'/KurtosysWSFactoryProxy.aspx?ServiceName=KSDK&MethodName=getReleasedDocumentsCustomFilteredDatesAsString&args=args&responseFormat=1&userType=WHOLESALER&userid=161909'
						//url:'http://fwlondev3/TrcRel08/KAPI/KurtosysWSFactoryProxy.aspx?ServiceName=KSDK&MethodName=getReleasedDocumentsCustomFilteredDatesAsString&args=args&responseFormat=1&userType=WHOLESALER&userid=161909'
					}
				),
				remoteSort:true,
				//sortInfo: { field: "referenceDate", direction: "DESC" },	
				// the return will be XML, so lets set up a reader
				reader: new Ext.data.XmlReader
				(
					{
					   // records will have an "Item" tag
					   record: 'item',
					   id: '>AccountNumber',
					   totalProperty: 'totalCount'
				   }, 
				   [
					   // set up the fields mapping into the xml doc
					   // The first needs mapping, the others are very basic
			        {name: 'AccountName'		, mapping: '>AccountNumber'},							
							{name: 'AccountNumber'	, mapping: '>AccountNumber'}							
							
				   ]
			   ),
			   listeners: 
			   {
			   	load: function()
			   	{
			   		this.loaded = true;		 		   		  		
			   	}
			  }		   
			}
		);
		
		
	
	///////////Masking///////////////////
		
		var myDocumentsMask = new Ext.LoadMask
		(
			Ext.getBody(), 
			{
					msg:"Please wait...",	
					removeMask:true,			
					store:myDocumentsStore
			}
		);
		
///////////////////////////////////////////////////////////////////////////////////////////////////////////////



