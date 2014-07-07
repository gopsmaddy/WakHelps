//#################################################################
	                       //   My Investor Search Tab 		


	

	myBaAgentInvestorsStore = new Ext.data.Store
  (
  	{   
        
        // load using HTTP
				proxy : new Ext.data.HttpProxy
				(
					{																
						method: 'GET',
						prettyUrls: false,
						// load using HTTP
		         url: varBaAgentInvestorsURL
					}
				),
				remoteSort:true,		
				sortInfo: {field: "PortOwner_RelNo", direction: "ASC" },	
				
        // the return will be XML, so lets set up a reader
        reader: new Ext.data.XmlReader
        (
        	{
               // records will have an "Item" tag
               record: 'List',
               id: '>uid',
               //id: '>PortOwner>RelNo',
               totalRecords: 'totalRecords'
           }, 
           [
               // set up the fields mapping into the xml doc
               // The first needs mapping, the others are very basic
               {name:'LoginUserType'				, mapping: '>LoginUserType'},
               {name:'PortOwner_RelNo'   		, mapping: '>PortOwner>RelNo'},
               {name:'PortOwner_Name'   		, mapping: '>PortOwner>Name' },
               {name:'PortOwner_GivenName'  , mapping: '>PortOwner>GivenName' },
						   {name:'PortOwner_Company_Key', mapping: '>PortOwner>Company>Key' },
							 {name:'PortOwner_Key'   			, mapping: '>PortOwner>Key' }			   		
			            
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

 //masking------------------------	
/*
	myBaAgentInvestorsMask = new Ext.LoadMask
	(
		Ext.getBody(), 
		{
				msg:"Please wait...",	
				removeMask:true,			
				store:myBaAgentInvestorsStore
		}
	);
*/
  
  
  
   //#################################################################	
  ///////////////////////////////////////////////////////////////////
	//#################################################################
	            //My Fund Under Management Advisor 2
	 myBaAgentSummaryByUCLevel2sStore = new Ext.data.Store
	 (
		 	{
			// load using HTTP
				proxy : new Ext.data.HttpProxy
				(
					{																
						method: 'GET',
						prettyUrls: false,
						url: varBaAgentSummaryByUCLevel2sURL
						
						
					}
				),
				remoteSort:true,
				sortInfo: { field: "UnitClass_Fund_Desc", direction: "ASC" }, 
				// the return will be XML, so lets set up a reader
				reader: new Ext.data.XmlReader
				(
					{
					   // records will have an "Item" tag
					   record: 'List',
					   id: '>uid',
					   //id: '>UnitClass>Key',
					   totalProperty: 'totalRecords'
				   }, 
				   [
					   // set up the fields mapping into the xml doc
					   // The first needs mapping, the others are very basic
					   			{name:  'LoginUserType'								, mapping: '>LoginUserType'},
					   			{name:  'UnitClass_Fund_Key'					, mapping: '>UnitClass>Fund>Key'},
									{name:  'UnitClass_Fund_Desc'					, mapping: '>UnitClass>Fund>Desc'},
									{name : 'UnitClass_Fund_Code'					, mapping: '>UnitClass>Fund>Code'},
									{name : 'UnitClass_Desc'							, mapping: '>UnitClass>Desc'},
									{name:  'UnitClass_Key'								, mapping: '>UnitClass>Key'},
									{name : 'UnitClass_Fund_Ccy_ISOCode'	, mapping: '>UnitClass>Fund>Ccy>ISOCode'},
									{name : 'TotalInUnits'								, mapping: '>TotalInUnits'},
									{name : 'TotalInCurrency'							, mapping: '>TotalInCurrency'},
									{name : 'Currency_Desc'							  , mapping: '>Currency>Desc'}
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
	//masking------------------------		
	/**myBaAgentSummaryByUCsMask = new Ext.LoadMask
	(
		Ext.getBody(), 
		{
				msg:"Please wait...",	
				removeMask:true,			
				store:myBaAgentSummaryByUCsStore
		}
	);**/
  //#################################################################	
  ///////////////////////////////////////////////////////////////////
	//#################################################################
	            //My Fund Under Management level 1
	 myBaAgentSummaryByUCsStore = new Ext.data.Store
	 (
		 	{
			// load using HTTP
				proxy : new Ext.data.HttpProxy
				(
					{																
						method: 'GET',
						prettyUrls: false,
						url: varBaAgentSummaryByUCsURL
						
					}
				),
				remoteSort:true,
				sortInfo: { field: "UnitClass_Fund_Desc", direction: "ASC" }, 
				// the return will be XML, so lets set up a reader
				reader: new Ext.data.XmlReader
				(
					{
					   // records will have an "Item" tag
					   record: 'List',
					   id: '>uid',
					   //id: '>UnitClass>Key',
					   totalProperty: 'totalRecords'
				   }, 
				   [
					   // set up the fields mapping into the xml doc
					   // The first needs mapping, the others are very basic
					   			{name:  'LoginUserType'								, mapping: '>LoginUserType'},
					   			{name:  'UnitClass_Fund_Key'					, mapping: '>UnitClass>Fund>Key'},
									{name:  'UnitClass_Fund_Desc'					, mapping: '>UnitClass>Fund>Desc'},
									{name : 'UnitClass_Fund_Code'					, mapping: '>UnitClass>Fund>Code'},
									{name : 'UnitClass_Desc'							, mapping: '>UnitClass>Desc'},
									{name:  'UnitClass_Key'								, mapping: '>UnitClass>Key'},
									{name : 'UnitClass_Fund_Ccy_ISOCode'	, mapping: '>UnitClass>Fund>Ccy>ISOCode'},
									{name : 'TotalInUnits'								, mapping: '>TotalInUnits'},
									{name : 'TotalInCurrency'							, mapping: '>TotalInCurrency'},
									{name : 'Currency_Desc'							  , mapping: '>Currency>Desc'}
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
	//masking------------------------		
	/**myBaAgentSummaryByUCsMask = new Ext.LoadMask
	(
		Ext.getBody(), 
		{
				msg:"Please wait...",	
				removeMask:true,			
				store:myBaAgentSummaryByUCsStore
		}
	);**/
		
	//#################################################################
		             //My Fund Under Management Level 2
		            // second panel sub-category
	myBaAgentSummLevel2sStore = new Ext.data.Store
	 (
		 	{
			// load using HTTP
				proxy : new Ext.data.HttpProxy
				(
					{																
						method: 'GET',
						prettyUrls: false,
						url: varBaAgentSummLevel2sURL
						
					}
				),
				remoteSort:true,
				sortInfo: { field: "SubAgent_Number", direction: "ASC" }, 
				// the return will be XML, so lets set up a reader
				reader: new Ext.data.XmlReader
				(
					{
					   // records will have an "Item" tag
					   record: 'List',
					   id: '>uid',
					   //id: '>SubAgent>Key',
					   totalProperty: 'totalRecords'
				   }, 
				   
			   [
					   // set up the fields mapping into the xml doc
					   // The first needs mapping, the others are very basic
					   			{name:  'LoginUserType'								, mapping: '>LoginUserType'},
					   			{name:  'UnitClass_Key'								, mapping: '>UnitClass>Key'},
					   			{name:  'SubAgent_Key'								, mapping: '>SubAgent>Key'},
									{name:  'SubAgent_Number'							, mapping: '>SubAgent>Number'},
									{name : 'SubAgent_Name'								, mapping: '>SubAgent>Name'},
									{name : 'UnitClass_Fund_Ccy_ISOCode'	, mapping: '>UnitClass>Fund>Ccy>ISOCode'},
									{name : 'TotalInUnits'								, mapping: '>TotalInUnits'},
									{name : 'TotalInCurrency'							, mapping: '>TotalInCurrency'}
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
	//masking------------------------				
	/**myBaAgentSummLevel2sMask = new Ext.LoadMask
	(
		Ext.getBody(), 
		{
				msg:"Please wait...",	
				removeMask:true,			
				store:myBaAgentSummLevel2sStore
		}
	);**/
	
	//#################################################################
	            // varBaAgentSummLevel3s sub-category 3
		
	myBaAgentSummLevel3sStore = new Ext.data.Store
	 (
		 	{
			// load using HTTP
				proxy : new Ext.data.HttpProxy
				(
					{																
						method: 'GET',
						prettyUrls: false,
						url: varBaAgentSummLevel3sURL
						
					}
				),
				remoteSort:true,
				sortInfo: { field: "SubSubAgent_Number", direction: "ASC" }, 
				// the return will be XML, so lets set up a reader
				reader: new Ext.data.XmlReader
				(
					{
					   // records will have an "Item" tag
					   record: 'List',
					   id: '>uid',
					   //id: '>SubAgent>Key',
					   totalProperty: 'totalRecords'
				   }, 
				   [

					   // set up the fields mapping into the xml doc
					   // The first needs mapping, the others are very basic
					   			{name:  'LoginUserType'								, mapping: '>LoginUserType'},
									{name:  'SubSubAgent_Number'				  , mapping: '>SubSubAgent>Number'},
									{name : 'SubSubAgent_Name'						, mapping: '>SubSubAgent>Name'},
									{name : 'SubAgent_Key'								, mapping: '>SubAgent>Key'},
									{name : 'UnitClass_Fund_Ccy_ISOCode'	, mapping: '>UnitClass>Fund>Ccy>ISOCode'},
									{name : 'TotalInUnits'								, mapping: '>TotalInUnits'},
									{name : 'TotalInCurrency'							, mapping: '>TotalInCurrency'},
									{name : 'UnitClass'										, mapping: '>UnitClass'}
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
	//masking------------------------			
/**	myBaAgentSummLevel3sMask = new Ext.LoadMask
	(
		Ext.getBody(), 
		{
				msg:"Please wait...",	
				removeMask:true,			
				store:myBaAgentSummLevel3sStore
		}
	);
	**/
	
	
	
	//#################################################################
	//#################################################################
	      	// My Fund Under management- 
	      	//My Investor Per Fund tab///////////////////////////////
		
		
	myBaAgentSummarysStore = new Ext.data.Store
	 (
		 	{
			// load using HTTP
				proxy : new Ext.data.HttpProxy
				(
					{																
						method: 'GET',
						prettyUrls: false,
						url: varBaAgentSummarysURL
						
					}
				),
				remoteSort:true,
				sortInfo: { field: "PortOwner_RelNo", direction: "ASC" }, 
				// the return will be XML, so lets set up a reader
				reader: new Ext.data.XmlReader
				(
					{
					   // records will have an "Item" tag
					   record: 'List',
					   id: '>uid',
					   //id: '>Portfolio>Number',
					   totalProperty: 'totalRecords'
				   }, 
				   [
					   // set up the fields mapping into the xml doc
					   // The first needs mapping, the others are very basic
					   			{name:  'LoginUserType'								  , mapping: '>LoginUserType'},
									{name:  'PortOwner_RelNo'							  , mapping: '>PortOwner>RelNo'},
									{name : 'Portfolio_Name'								, mapping: '>Portfolio>Name'},
									{name : 'Portfolio_Number'	            , mapping: '>Portfolio>Number'},
									{name : 'UnitClass_Fund_Desc'						, mapping: '>UnitClass>Fund>Desc'},
									{name : 'UnitClass_Fund_Code'						, mapping: '>UnitClass>Fund>Code'},
									{name : 'UnitClass_Fund_Key'						, mapping: '>UnitClass>Fund>Key'},
									{name : 'UnitClass_Desc'					     	, mapping: '>UnitClass>Desc'},
									{name : 'UnitClass_Fund_Ccy_ISOCode'		, mapping: '>UnitClass>Fund>Ccy>ISOCode'},
									{name : 'BalanceInUnits'		            , mapping: '>BalanceInUnits'},
									{name : 'BalanceInCurrency'		          , mapping: '>BalanceInCurrency'}
								
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
	//masking------------------------			
/**	myBaAgentSummarysMask = new Ext.LoadMask
	(
		Ext.getBody(), 
		{
				msg:"Please wait...",	
				removeMask:true,			
				store:myBaAgentSummarysStore
		}
	);
	**/
	
	
	//#################################################################
	//#################################################################
	 	// My Fund Under management- My Advisor tab
		
		
	myBaAgentByCcysStore = new Ext.data.Store
	 (
		 	{
			// load using HTTP
				proxy : new Ext.data.HttpProxy
				(
					{																
						method: 'GET',
						prettyUrls: false,
						url: varBaAgentByCcysURL
						
					}
				),
				remoteSort:true,
				sortInfo: { field: "SubAgent_Number", direction: "ASC" }, 
				// the return will be XML, so lets set up a reader
				reader: new Ext.data.XmlReader
				(
					{
					   // records will have an "Item" tag
					   record: 'List',
					   id: '>uid',
					   //id: '>SubAgent>Key',
					   totalProperty: 'totalRecords'
				   }, 
				   [
					   // set up the fields mapping into the xml doc
					   // The first needs mapping, the others are very basic
					   			{name:  'LoginUserType'								, mapping: '>LoginUserType'},
					   			{name:  'SubAgent_Key'				  			, mapping: '>SubAgent>Key'},
								  {name:  'SubAgent_Number'				  		, mapping: '>SubAgent>Number'},
									{name : 'SubAgent_Name'				    		, mapping: '>SubAgent>Name'},
									{name : 'SubAgent_AgentType_Desc'			, mapping: '>SubAgent>AgentType>Desc'},
									{name : 'Currency_ISOCode'						, mapping: '>Currency>ISOCode'},
									{name : 'TotalInCurrency'							, mapping: '>TotalInCurrency'}
									

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
	//masking------------------------			
	/**myBaAgentByCcysMask = new Ext.LoadMask
	(
		Ext.getBody(), 
		{
				msg:"Please wait...",	
				removeMask:true,			
				store:myBaAgentByCcysStore
		}
	);
	**/
	
	//#################################################################
	myBaSubAgentByCcysStore = new Ext.data.Store
	 (
		 	{
			// load using HTTP
				proxy : new Ext.data.HttpProxy
				(
					{																
						method: 'GET',
						prettyUrls: false,
						url: varBaSubAgentByCcysURL
						
					}
				),
				remoteSort:true,
				sortInfo: { field: "SubSubAgent_Name", direction: "ASC" }, 
				// the return will be XML, so lets set up a reader
				reader: new Ext.data.XmlReader
				(
					{
					   // records will have an "Item" tag
					   record: 'List',
					   id: '>uid',
					   //id: '>SubSubAgent>Number',
					   totalProperty: 'totalRecords'
				   }, 
				   [
					   // set up the fields mapping into the xml doc
					   // The first needs mapping, the others are very basic
					   			{name:  'LoginUserType'								, mapping: '>LoginUserType'},
					   			{name:  'SubAgent_Key'				  			, mapping: '>SubAgent>Key'},
					   			{name:  'SubSubAgent_Key'				  		, mapping: '>SubSubAgent>Key'},
								  {name:  'SubSubAgent_Number'				  , mapping: '>SubSubAgent>Number'},
									{name : 'SubSubAgent_Name'				    , mapping: '>SubSubAgent>Name'},
									{name : 'SubSubAgent_AgentType_Desc'	, mapping: '>SubSubAgent>AgentType>Desc'},
									{name : 'Currency_ISOCode'						, mapping: '>Currency>ISOCode'},
									{name : 'TotalInCurrency'							, mapping: '>TotalInCurrency'}
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
	//masking------------------------			
	/**myBaSubAgentByCcysMask = new Ext.LoadMask
	(
		Ext.getBody(), 
		{
				msg:"Please wait...",	
				removeMask:true,			
				store:myBaSubAgentByCcysStore
		}
	);
	**/
	
	//#################################################################
	///////////////////////////////////////////////////////////////////
	//#################################################################
	 	// My Commissions Tab
		
		
	myBaCommissionSummarysStore = new Ext.data.Store
	 (
		 	{
			// load using HTTP
				proxy : new Ext.data.HttpProxy
				(
					{																
						method: 'GET',
						prettyUrls: false,
						url: varBaCommissionSummarysURL
						
					}
				),
				remoteSort:true,
				sortInfo: { field: "Payment_Key", direction: "ASC" }, 
				// the return will be XML, so lets set up a reader
				reader: new Ext.data.XmlReader
				(
					{
					   // records will have an "Item" tag
					   record: 'List',
					   id: '>uid',
					   //id: '>Payment>Key',
					   totalProperty: 'totalRecords'
				   }, 
				   [
					   // set up the fields mapping into the xml doc
					   // The first needs mapping, the others are very basic
					   				{name:'LoginUserType'								  , mapping: '>LoginUserType'},
										{name:'Payment_Key'   								, mapping: '>Payment>Key'},
									  {name:'PaymentDate'   								, mapping: '>PaymentDate' },
									  {name:'Currency_ISOCode'    					, mapping: '>Currency>ISOCode' },
									  {name:'Payment_SettleAmount'    			, mapping: '>Payment>SettleAmount'},
									  {name:'SPayFromDate'    			        , mapping: '>SPayFromDate'}, 
									  {name:'SPayToDate'    			          , mapping: '>SPayToDate'}
							
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
	//masking------------------------			
/**	myBaCommissionSummarysMask = new Ext.LoadMask
	(
		Ext.getBody(), 
		{
				msg:"Please wait...",	
				removeMask:true,			
				store:myBaCommissionSummarysStore
		}
	);
	**/
	
	
	//#################################################################
		// My Consolidation Tab
		
		
	myBaAgentPaysStore = new Ext.data.Store
	 (
		 	{
			// load using HTTP
				proxy : new Ext.data.HttpProxy
				(
					{																
						method: 'GET',
						prettyUrls: false,
						url: varBaAgentPaysURL
						
					}
				),
				remoteSort:true,
				sortInfo: { field: "PaidDate", direction: "Desc" }, 
				// the return will be XML, so lets set up a reader
				reader: new Ext.data.XmlReader
				(
					{
					   // records will have an "Item" tag
					   record: 'List',
					   id: '>uid',
					   //id: '>AgentPayKey',
					   totalProperty: 'totalRecords'
				   }, 
				   [
					   // set up the fields mapping into the xml doc
					   // The first needs mapping, the others are very basic
					   			{name : 'LoginUserType'			  , mapping: '>LoginUserType'},
					   			{name : 'Agent_Key'				  	, mapping: '>Agent>Key'},
					   			{name : 'Payment_Key'				  , mapping: '>Payment>Key'},
									{name : 'AgentPayKey'				  , mapping: '>AgentPayKey'},
									{name : 'PaidDate'						, mapping: '>PaidDate'},
									{name : 'FeeType'	            , mapping: '>FeeType'},
									{name : 'AgentAmtPaid'				, mapping: '>AgentAmtPaid'}
								
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
	//masking------------------------			
	/**myBaAgentPaysMask = new Ext.LoadMask
	(
		Ext.getBody(), 
		{
				msg:"Please wait...",	
				removeMask:true,			
				store:myBaAgentPaysStore
		}
	);
	**/
	
	//#################################################################
		// My Transaction Tab
		
		
	myBaSCommSplitsStore = new Ext.data.Store
	 (
		 	{
			// load using HTTP
				proxy : new Ext.data.HttpProxy
				(
					{																
						method: 'GET',
						prettyUrls: false,
						url: varBaSCommSplitsURL
						
					}
				),
				remoteSort:true,
				sortInfo: { field: "Contract_Number", direction: "ASC" }, 
				// the return will be XML, so lets set up a reader
				reader: new Ext.data.XmlReader
				(
					{
					   // records will have an "Item" tag
					   record: 'List',
					   id: '>uid',
					   //id: '>AgentPayKey',
					   totalProperty: 'totalRecords'
				   }, 
				   [
					   // set up the fields mapping into the xml doc
					   // The first needs mapping, the others are very basic
					   			{name : 'LoginUserType'						, mapping: '>LoginUserType'},
					   			{name : 'AgentPay_AgentPatKey'		, mapping: '>AgentPay>AgentPatKey'},
									{name : 'Ctract_CtractNo'					, mapping: '>Ctract>CtractNo'},
									{name : 'FeeType_Desc'						, mapping: '>FeeType>Desc'},
									{name : 'CommPercent'	            , mapping: '>CommPercent'},
									{name : 'AgentCommAmt'						, mapping: '>AgentCommAmt'},
									{name : 'CtractCommAmt'						, mapping: '>CtractCommAmt'}
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
	//masking------------------------			
/**	myBaSCommSplitsMask = new Ext.LoadMask
	(
		Ext.getBody(), 
		{
				msg:"Please wait...",	
				removeMask:true,			
				store:myBaSCommSplitsStore
		}
	);
	**/
	
	//#################################################################
	///////////////////////////////////////////////////////////////////
	//#################################################################
	 
		// My Fund Prices Tab
		
		
	myBaSUnitClasssStore = new Ext.data.Store
	 (
		 	{
			// load using HTTP
				proxy : new Ext.data.HttpProxy
				(
					{																
						method: 'GET',
						prettyUrls: false,
						url: varBaSUnitClasssURL
						
					}
				),
				remoteSort:true,
				sortInfo: { field: "SubAgent_Name", direction: "ASC" }, 
				// the return will be XML, so lets set up a reader
				reader: new Ext.data.XmlReader
				(
					{
					   // records will have an "Item" tag
					   record: 'List',
					   //id: 'Portfolio>Key',
					   id: '>SubAgent>Key',
					   totalProperty: 'totalRecords'
				   }, 
				   [
					   // set up the fields mapping into the xml doc
					   // The first needs mapping, the others are very basic
									{name:  'Price_Date'							  , mapping: '>PriceDate'},
									{name : 'Fund_Name'					        , mapping: '>Fund>Desc'},
									{name : 'Fund_code'	                , mapping: '>Fund>Code'},
									{name : 'Unit_Class'								, mapping: '>UnitClass>Code'},
									{name : 'Entity_Price'							, mapping: '>OfferPrice'},
									{name : 'NAV_Price'						    	, mapping: '>TotalInCurrency'},
									{name : 'Exit_Price'							  , mapping: '>NAVPrice'}
									
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
	//masking------------------------			
/**	myBaSUnitClasssMask = new Ext.LoadMask
	(
		Ext.getBody(), 
		{
				msg:"Please wait...",	
				removeMask:true,			
				store:myBaSUnitClasssStore
		}
	);**/
	
	//#################################################################	
	///-------------------------------------------------------------///
	//#################################################################	
	////////////////////////Agent Funds ////////////////////////
	
	myBaAgentFundsStore = new Ext.data.Store
	 (
		 	{
			// load using HTTP
				proxy : new Ext.data.HttpProxy
				(
					{																
						method: 'GET',
						prettyUrls: false,
						url: varBaAgentFundsURL
						
					}
				),
				remoteSort:true,
				sortInfo: { field: "Fund_Desc", direction: "ASC" }, 
				// the return will be XML, so lets set up a reader
				reader: new Ext.data.XmlReader
				(
					{
					   // records will have an "Item" tag
					   record: 'List',
					   //id: 'Portfolio>Key',
					   id: '>Fund>Key',
					   totalProperty: 'totalRecords'
				   }, 
				   [
					   // set up the fields mapping into the xml doc
					   // The first needs mapping, the others are very basic
									{name:  'Fund_Key'							  	, mapping: '>Fund>Key'},
									{name : 'Fund_code'	                , mapping: '>Fund>Code'},
									{name : 'Fund_Desc'					        , mapping: '>Fund>Desc'}
									
									
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
	//masking------------------------			
	/**myBaAgentFundsMask = new Ext.LoadMask
	(
		Ext.getBody(), 
		{
				msg:"Please wait...",	
				removeMask:true,			
				store:myBaAgentFundsStore
		}
	);**/
	