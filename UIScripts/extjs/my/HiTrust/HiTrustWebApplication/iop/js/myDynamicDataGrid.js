//#################################################################
 myBaAgentInvestorsGrid = new Ext.grid.GridPanel
	(
		{
			hidden:true,
			id:'idMyBaAgentInvestorsGrid',
			//renderTo:'myInvestorSearch',			
			store: myBaAgentInvestorsStore,			
			columns: 
				[
				  {id: 'PortOwner_RelNo'			,header: 'Investor Number'			    	, dataIndex : 'PortOwner_RelNo'				,  sortable : true, align: 'left'},	 
					{id: 'PortOwner_GivenName'	,header: 'Name'						        		, dataIndex : 'PortOwner_GivenName'		,  sortable : true, align: 'left'},
					{id: 'PortOwner_Name'				,header: 'Surname '										, dataIndex : 'PortOwner_Name'				,  sortable : true, align: 'left' }
				
			
				],
				
			
	   	autoExpandColumn: 'PortOwner_Name',
	   	width: 650,
	   	autoHeight:true,
	   	autoScroll:true,
	   	stripeRows: true,
	    sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
			viewConfig: {emptyText: 'No records to display.'},
			bbar: new Ext.PagingToolbar
					(
						{
							id : 'pBaAgentInvestorsBar',								
							displayInfo: true,
							//autoHeight:true,
							pageSize:10,	
							displayMsg: 'Displaying {0} - {1} of {2}',
							emptyMsg: "No items to display",
							store: myBaAgentInvestorsStore,
							plugins: [new Ext.ux.PageSizePlugin()]
						}
					)				 
				
		}
	);	

//Fund Under Management Level 1(main)
// create the grid

		myBaAgentSummaryByUCsGrid = new Ext.grid.GridPanel
		(
			{
				hidden:true,
				id:'idMyBaAgentSummaryByUCsGrid',
				//renderTo:'myFundsUnderManagement',
				store: myBaAgentSummaryByUCsStore,
				columns: 
				[
					{id: 'UnitClass_Fund_Desc'				,header: 'Fund Name'		  , dataIndex : 'UnitClass_Fund_Desc'			    , Sortable : true, align: 'left'},
					{id: 'UnitClass_Fund_Code'				,header: 'Fund Code'	    , dataIndex : 'UnitClass_Fund_Code'			    , width : 90, sortable : true, align: 'left'},
					{id: 'UnitClass_Desc'					    ,header: 'Unit Class'		  , dataIndex : 'UnitClass_Desc'					    , width : 90, sortable : true, align: 'left'},
					{id: 'UnitClass_Fund_Ccy_ISOCode'	    ,header: 'Currency'		, dataIndex : 'UnitClass_Fund_Ccy_ISOCode'	 , width : 90, sortable : true, align: 'left'},
					{id: 'TotalInUnits'	  					  ,header: 'Units'			    , dataIndex : 'TotalInUnits'					      , width : 90, sortable : true, align: 'right'},
					{id: 'TotalInCurrency'					  ,header: 'Value'			    , dataIndex : 'TotalInCurrency'					    , width : 90, sortable : true, align: 'right'}
					
				],		    
		    autoExpandColumn: 'UnitClass_Fund_Desc',
		   	width: 650,
		   	autoHeight:true,
		   	stripeRows: true,
		    sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
				viewConfig: {emptyText: 'No records to display.'},
				bbar: new Ext.PagingToolbar
					(
						{
							id : 'pBaAgentSummaryByUCsBar',								
							displayInfo: true,
							pageSize:10,	
							displayMsg: 'Displaying {0} - {1} of {2}',
							emptyMsg: "No items to display",
							store: myBaAgentSummaryByUCsStore,
							plugins: [new Ext.ux.PageSizePlugin()]
						}
					)			
						
			}
		);		
		
		/**myBaAgentSummaryByUCsGrid2 = new Ext.grid.GridPanel
		(
			{
				hidden:true,
				id:'idMyBaAgentSummaryByUCsGrid2',
				//renderTo:'myFundsUnderManagement',
				store: myBaAgentSummaryByUCsStore,
				columns: 
				[
					{id: 'UnitClass_Fund_Desc'				,header: 'Fund Name'		, dataIndex : 'UnitClass_Fund_Desc'			    , width : 250, sortable : true, align: 'left'},
					{id: 'UnitClass_Fund_Code'				,header: 'Fund Code'	  , dataIndex : 'UnitClass_Fund_Code'			    , width : 90, sortable : true, align: 'left'},
					{id: 'UnitClass_Desc'							,header: 'Unit Class'		, dataIndex : 'UnitClass_Desc'							, width : 90, sortable : true, align: 'left'},
					{id: 'UnitClass_Fund_Ccy_ISOCode'	,header: 'Currency'			, dataIndex : 'UnitClass_Fund_Ccy_ISOCode'	, width : 90, sortable : true, align: 'left'},
					{id: 'TotalInUnits'	  						,header: 'Units'				, dataIndex : 'TotalInUnits'								, width : 100, sortable : true, align: 'right'},
					{id: 'TotalInCurrency'						,header: 'Value'				, dataIndex : 'TotalInCurrency'							, width : 100, sortable : true, align: 'right'}
					
				],		    
		    autoExpandColumn: 'UnitClass_Fund_Desc',
		   	width: 650,
		   	autoHeight:true,
		   	stripeRows: true,
		    sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
				viewConfig: {emptyText: 'No records to display.'},
				bbar: new Ext.PagingToolbar
					(
						{
							id : 'pBaAgentSummaryByUCsBar2',								
							displayInfo: true,
							pageSize:10,	
							displayMsg: 'Displaying {0} - {1} of {2}',
							emptyMsg: "No items to display",
							store: myBaAgentSummaryByUCsStore,
							plugins: [new Ext.ux.PageSizePlugin()]
						}
					)			
						
			}
		);	**/
		
		///////Level2 Advisor/////////////////
		
			myBaAgentSummaryByUCLevel2sGrid = new Ext.grid.GridPanel
		(
			{
				hidden:true,
				id:'idMyBaAgentSummaryByUCLevel2sGrid', 
				//renderTo:'myFundsUnderManagement',
				store: myBaAgentSummaryByUCLevel2sStore,
				columns: 
				[
					{id: 'UnitClass_Fund_Desc'				,header: 'Fund Name2'		, dataIndex : 'UnitClass_Fund_Desc'			    , width : 250, sortable : true, align: 'left'},
					{id: 'UnitClass_Fund_Code'				,header: 'Fund Code'	  , dataIndex : 'UnitClass_Fund_Code'			    , width : 90, sortable : true, align: 'left'},
					{id: 'UnitClass_Desc'							,header: 'Unit Class'		, dataIndex : 'UnitClass_Desc'							, width : 90, sortable : true, align: 'left'},
					{id: 'UnitClass_Fund_Ccy_ISOCode'	,header: 'Currency'			, dataIndex : 'UnitClass_Fund_Ccy_ISOCode'	, width : 90, sortable : true, align: 'left'},
					{id: 'TotalInUnits'	  						,header: 'Units'				, dataIndex : 'TotalInUnits'								, width : 100, sortable : true, align: 'right'},
					{id: 'TotalInCurrency'						,header: 'Value'				, dataIndex : 'TotalInCurrency'							, width : 100, sortable : true, align: 'right'}
					
				],		    
		    autoExpandColumn: 'UnitClass_Fund_Desc',
		   	width: 650,
		   	autoHeight:true,
		   	stripeRows: true,
		    sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
				viewConfig: {emptyText: 'No records to display.'},
				bbar: new Ext.PagingToolbar
					(
						{
							id : 'pBaAgentSummaryByUCLevel2sBar',								
							displayInfo: true,
							pageSize:10,	
							displayMsg: 'Displaying {0} - {1} of {2}',
							emptyMsg: "No items to display",
							store: myBaAgentSummaryByUCLevel2sStore,
							plugins: [new Ext.ux.PageSizePlugin()]
						}
					)			
						
			}
		);	
			
	//#################################################################
	////////////////////////Fund Under Management Level 2///////////////////////////////////////////
	// create the grid
		myBaAgentSummLevel2sGrid = new Ext.grid.GridPanel
		(
			{
				hidden:true,
				id:'idMyBaAgentSummLevel2sGrid',
				//renderTo:'myFundsUnderManagementL2',
				store: myBaAgentSummLevel2sStore,
				columns: 
				[
					{id: 'SubAgent_Number'						,header: 'Dealer Number'	  , dataIndex : 'SubAgent_Number'			    	  , width : 100, sortable : true, align: 'left'},
					{id: 'SubAgent_Name'						  ,header: 'Registered Name'	, dataIndex : 'SubAgent_Name'			    	   	, width : 250, sortable : true, align: 'left'},
					{id: 'TotalInUnits'	  						,header: 'Units'				    , dataIndex : 'TotalInUnits'								, width : 100, sortable : true, align: 'right'},
					{id: 'UnitClass_Fund_Ccy_ISOCode'	,header: 'Currency'			    , dataIndex : 'UnitClass_Fund_Ccy_ISOCode'	, width : 100, sortable : true, align: 'left'},
					{id: 'TotalInCurrency'						,header: 'Value'				    , dataIndex : 'TotalInCurrency'							, width : 100, sortable : true, align: 'right'}
					
				],		    
		    autoExpandColumn: 'SubAgent_Name',
		   	width: 650,
		   	autoHeight:true,
		   	stripeRows: true,
		    sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
				viewConfig: {emptyText: 'No records to display.'},
				bbar: new Ext.PagingToolbar
					(
						{
							id : 'pBaAgentSummLevel2sBar',								
							displayInfo: true,
							pageSize:10,	
							displayMsg: 'Displaying {0} - {1} of {2}',
							emptyMsg: "No items to display",
							store: myBaAgentSummLevel2sStore,
							plugins: [new Ext.ux.PageSizePlugin()]
						}
					)			
						
			}
		);
	//#################################################################	
	////////////////////////Fund Under Management Level 3///////////////////////////////////////////
	// create the grid
		myBaAgentSummLevel3sGrid = new Ext.grid.GridPanel
		(
			{
				
				hidden:true,
				id:'idMyBaAgentSummLevel3sGrid',
				//renderTo:'myFundsUnderManagementL2',
				store: myBaAgentSummLevel3sStore,
				columns: 
				[
					{id: 'SubSubAgent_Number'						,header: 'Dealer Number'			  , dataIndex : 'SubSubAgent_Number'		    	, width : 100, sortable : true, align: 'left'},
					{id: 'SubSubAgent_Name'					    ,header: 'Registered Name'	    , dataIndex : 'SubSubAgent_Name'			      , width : 250, sortable : true, align: 'left'},
					{id: 'TotalInUnits'	  						  ,header: 'Units'				        , dataIndex : 'TotalInUnits'								, width : 100, sortable : true, align: 'right'},
					{id: 'UnitClass_Fund_Ccy_ISOCode'	  ,header: 'Currency'			        , dataIndex : 'UnitClass_Fund_Ccy_ISOCode'	, width : 100, sortable : true, align: 'left'},
    			{id: 'TotalInCurrency'						  ,header: 'Value'				        , dataIndex : 'TotalInCurrency'							, width : 100, sortable : true, align: 'right'}
					
				],		    
		    autoExpandColumn: 'SubSubAgent_Name',
		   	width: 650,
		   	autoHeight:true,
		   	stripeRows: true,
		    sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
				viewConfig: {emptyText: 'No records to display.'},
				bbar: new Ext.PagingToolbar
					(
						{
							id : 'pBaAgentSummLevel3sBar',								
							displayInfo: true,
							pageSize:10,	
							displayMsg: 'Displaying {0} - {1} of {2}',
							emptyMsg: "No items to display",
							store: myBaAgentSummLevel3sStore,
							plugins: [new Ext.ux.PageSizePlugin()]
						}
					)			
						
			}
		);
		
										//Fund Under Management 
										// My Investor per Fund 
										// create the grid


		myBaAgentSummarysGrid = new Ext.grid.GridPanel
		(
			{
				
				//hidden:true,
				id:'idMyBaAgentSummarysGrid',
				//renderTo:'myFundsUnderManagementL2',
				store: myBaAgentSummarysStore,
				columns: 
				[
					{id: 'PortOwner_RelNo'					,header: 'Investor Number'	    , dataIndex : 'PortOwner_RelNo'			    		, sortable : true, align: 'left'},
					{id: 'Portfolio_Number'         ,header: 'Portfolio Number'		  , dataIndex : 'Portfolio_Number'	          , align: 'left'},
					{id: 'Portfolio_Name'					  ,header: 'Portfolio Name'	      , dataIndex : 'Portfolio_Name'			    	  ,  sortable : true, align: 'left'},
					{id: 'UnitClass_Fund_Desc'			,header: 'Fund Name'	          , dataIndex : 'UnitClass_Fund_Desc'			    ,  sortable : true, align: 'left'},
					{id: 'UnitClass_Fund_Code'	  	,header: 'Fund Code'			      , dataIndex : 'UnitClass_Fund_Code'				  ,  sortable : true, align: 'left'},
					{id: 'UnitClass_Desc'					  ,header: 'Unit Class'			      , dataIndex : 'UnitClass_Desc'					    ,  sortable : true, align: 'left'},
					{id: 'BalanceInUnits'					  ,header: 'Units'				        , dataIndex : 'BalanceInUnits'					    ,  sortable : true, align: 'right'},
					{id: 'UnitClass_Fund_Ccy_ISOCode'		,header: 'Currency'				  , dataIndex : 'UnitClass_Fund_Ccy_ISOCode'	,  sortable : true, align: 'left'},
					{id: 'BalanceInCurrency'				,header: 'Value'			          , dataIndex : 'BalanceInCurrency'					  ,  sortable : true, align: 'right'}
					
				],		                
			  width:650,
		    Height:290,
		   	stripeRows: true,
  		 	autoScroll:true,
		    sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
				viewConfig: {emptyText: 'No records to display.'},
				bbar: new Ext.PagingToolbar
					(
						{
							id : 'pBaAgentSummarysBar',								
							displayInfo: true,
							pageSize:10,	
							displayMsg: 'Displaying {0} - {1} of {2}',
							emptyMsg: "No items to display",
							store: myBaAgentSummarysStore,
							plugins: [new Ext.ux.PageSizePlugin()]
						}
					)			
						
			}
		);		
				

						//Fund Under Management 
						//My Advisor       
							
	
	// create the grid
		myBaAgentByCcysGrid = new Ext.grid.GridPanel
		(
			{
							         				
				hidden:true,
				id:'idMyBaAgentByCcysGrid',
				store: myBaAgentByCcysStore,
				columns: 
				[									
					
					{id: 'SubAgent_Name'					 ,header: 'Advisor Registered Name'	    , dataIndex : 'SubAgent_Name'			       , width : 250, sortable : true, align: 'left'},
					{id: 'SubAgent_Number'				 ,header: 'Advisor Number'			        , dataIndex : 'SubAgent_Number'			     , width : 90,  sortable : true, align: 'left'},
					{id: 'SubAgent_AgentType_Desc' ,header: 'Advisor Type'			          , dataIndex : 'SubAgent_AgentType_Desc'	 , width : 90,  sortable : true, align: 'left'},
					{id: 'Currency_ISOCode'    	   ,header: 'Currency'			              , dataIndex : 'Currency_ISOCode'	       , width : 90,  sortable : true, align: 'left'},
					{id: 'TotalInCurrency'		     ,header: 'Value'				                , dataIndex : 'TotalInCurrency'	         , width : 90, sortable : true, align: 'right'}
					
				],		    
		    autoExpandColumn: 'SubAgent_Name',
		   	width: 650,
		   	autoHeight:true,
		   	stripeRows: true,
		    sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
				viewConfig: {emptyText: 'No records to display.'},
				bbar: new Ext.PagingToolbar
					(
						{
							id : 'pBaAgentByCcysBar',								
							displayInfo: true,
							pageSize:10,	
							displayMsg: 'Displaying {0} - {1} of {2}',
							emptyMsg: "No items to display",
							store: myBaAgentByCcysStore,
							plugins: [new Ext.ux.PageSizePlugin()]
						}
					)			
						
			}
		);
		
		
		
	//Fund Under Management 
// My Advisor drill down      
	                     
	                     
	                     myBaSubAgentByCcysGrid = new Ext.grid.GridPanel  
		(
			{
							         				
				hidden:true,
				id:'idMyBaSubAgentByCcysGrid',
				//renderTo:'myFundsUnderManagementL2',
				store: myBaSubAgentByCcysStore,
				columns: 
				[		
					{id: 'SubSubAgent_Name'					  ,header: 'Advisor Registered Name'	    , dataIndex : 'SubSubAgent_Name'		, width : 100, sortable : true, align: 'left'},
					{id: 'SubSubAgent_Number'				  ,header: 'Advisor Number'			  , dataIndex : 'SubSubAgent_Number'			    , width : 90, sortable : true, align: 'left'},
					{id: 'SubSubAgent_AgentType_Desc' ,header: 'Advisor Type'			    , dataIndex : 'SubSubAgent_AgentType_Desc'  , width : 90, sortable : true, align: 'left'},
					{id: 'Currency_ISOCode'    	      ,header: 'Currency'			        , dataIndex : 'Currency_ISOCode'	          , width : 90, sortable : true, align: 'left'},
					{id: 'TotalInCurrency'		        ,header: 'Value'				        , dataIndex : 'TotalInCurrency'	            , width : 90, sortable : true, align: 'right'}
				],		    
		    autoExpandColumn: 'SubSubAgent_Name',
		   	width: 650,
		   	autoHeight:true,
		   	stripeRows: true,
		    sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
				viewConfig: {emptyText: 'No records to display.'},
				bbar: new Ext.PagingToolbar
					(
						{
							id : 'pBaSubAgentByCcysBar',								
							displayInfo: true,
							pageSize:10,	
							displayMsg: 'Displaying {0} - {1} of {2}',
							emptyMsg: "No items to display",
							store: myBaSubAgentByCcysStore,
							plugins: [new Ext.ux.PageSizePlugin()]
						}
					)			
						
			}
		);
	                     

	
	
	// create the grid
		myBaSubAgentByCcysGrid = new Ext.grid.GridPanel  
		(
			{
							         				
				hidden:true,
				id:'idMyBaSubAgentByCcysGrid',
				//renderTo:'myFundsUnderManagementL2',
				store: myBaSubAgentByCcysStore,
				columns: 
				[								
					{id: 'SubSubAgent_Name'					  ,header: 'Advisor Registered Name'	    , dataIndex : 'SubSubAgent_Name'		, width : 100, sortable : true, align: 'left'},
					{id: 'SubSubAgent_Number'				  ,header: 'Advisor Number'			  , dataIndex : 'SubSubAgent_Number'			    , width : 90, sortable : true, align: 'left'},
					{id: 'SubSubAgent_AgentType_Desc' ,header: 'Advisor Type'			    , dataIndex : 'SubSubAgent_AgentType_Desc'  , width : 90, sortable : true, align: 'left'},
					{id: 'Currency_ISOCode'    	      ,header: 'Currency'			        , dataIndex : 'Currency_ISOCode'	          , width : 90, sortable : true, align: 'left'},
					{id: 'TotalInCurrency'		        ,header: 'Value'				        , dataIndex : 'TotalInCurrency'	            , width : 90, sortable : true, align: 'right'}
					 
				],		    
		    autoExpandColumn: 'SubSubAgent_Name',
		   	width: 650,
		   	autoHeight:true,
		   	stripeRows: true,
		    sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
				viewConfig: {emptyText: 'No records to display.'},
				bbar: new Ext.PagingToolbar
					(
						{
							id : 'pBaSubAgentByCcysBar',								
							displayInfo: true,
							pageSize:10,	
							displayMsg: 'Displaying {0} - {1} of {2}',
							emptyMsg: "No items to display",
							store: myBaSubAgentByCcysStore,
							plugins: [new Ext.ux.PageSizePlugin()]
						}
					)			
						
			}
		);
		
		
	
	//#################################################################	
	///////////////////////////////////////////////////////////////////		
	//#################################################################	
	////////////////////////My Commissions ////////////////////////
	                     
	
	
	// create the grid
		myBaCommissionSummarysGrid = new Ext.grid.GridPanel
		(
			{
				hidden:true,
				id:'idMyBaAgentSummaryGrid',
				//renderTo:'myFundsUnderManagementL2',
				store: myBaCommissionSummarysStore,
				columns: 
				[
					{id: 'Payment_Key'						  ,header: 'Payment Number'			, dataIndex : 'Payment_Key'			    		 , width : 250, sortable : true, align: 'left'},
					{id: 'PaymentDate'							,header: 'Payment Date'	      , dataIndex : 'PaymentDate'			    		 , width : 150, sortable : true, align: 'left'},
					{id: 'Currency_ISOCode'         ,header: 'Currency'			      , dataIndex : 'Currency_ISOCode'	       , width : 100, sortable : true, align: 'left'},
					{id: 'Payment_SettleAmount'			,header: 'Amount'				      , dataIndex : 'Payment_SettleAmount'		 , width : 100, sortable : true, align: 'right'}
					
				],		    

				
		    autoExpandColumn: 'Payment_Key',
		   	width: 650,
		   	autoHeight:true,
		   	stripeRows: true,
		    sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
				viewConfig: {emptyText: 'No records to display.'},
				bbar: new Ext.PagingToolbar
					(
						{
							id : 'pBaCommissionSummarysBar',								
							displayInfo: true,
							pageSize:10,	
							displayMsg: 'Displaying {0} - {1} of {2}',
							emptyMsg: "No items to display",
							store: myBaCommissionSummarysStore,
							plugins: [new Ext.ux.PageSizePlugin()]
						}
					)			
						
			}
		);
	//#################################################################	
	////////////////////////Consolidation ////////////////////////

	
	// create the grid
		myBaAgentPaysGrid = new Ext.grid.GridPanel
		(
			{
					        	
							         				
				hidden:true,
				id:'idMyBaAgentSummaryGrid',
				//renderTo:'myFundsUnderManagementL2',
				store: myBaAgentPaysStore,
				columns: 
				[
					{id: 'AgentPayKey'						,header: 'Consolidation Number'			, dataIndex : 'AgentPayKey'			 		, width : 250, sortable : true, align: 'left'},
					{id: 'PaidDate'							  ,header: 'Commission Date'	        , dataIndex : 'PaidDate'			    	, width : 150, sortable : true, align: 'left'},
					{id: 'FeeType'               	,header: 'Commission Type'			    , dataIndex : 'FeeType'	            , width : 100, sortable : true, align: 'left', renderer: function(val){return val=='U'?'Up Front':'Trailer';}},
					{id: 'AgentAmtPaid'						,header: 'Commission Amount'				, dataIndex : 'AgentAmtPaid'				, width : 100, sortable : true, align: 'right'}
					
				],		    
		    autoExpandColumn: 'AgentPayKey',
		   	width: 650,
		   	autoHeight:true,
		   	stripeRows: true,
		    sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
				viewConfig: {emptyText: 'No records to display.'},
				bbar: new Ext.PagingToolbar
					(
						{
							id : 'pBaAgentPaysBar',								
							displayInfo: true,
							pageSize:10,	
							displayMsg: 'Displaying {0} - {1} of {2}',
							emptyMsg: "No items to display",
							store: myBaAgentPaysStore,
							plugins: [new Ext.ux.PageSizePlugin()]
						}
					)			
						
			}
		);
	//#################################################################	
	////////////////////////Transaction popup////////////////////////
	                     
	
	
	// create the grid
		myBaSCommSplitsGrid = new Ext.grid.GridPanel
		(
			{

					       							         				
				hidden:true,
				id:'idMyBaSCommSplitsGrid',
				//renderTo:'myFundsUnderManagementL2',
				store: myBaSCommSplitsStore,
				columns: 
				[
					{id: 'Ctract_CtractNo'				,header: 'Contract Number'		, dataIndex : 'Ctract_CtractNo'			   , width : 250, sortable : true, align: 'left'},
					{id: 'FeeType_Desc'						,header: 'Fee Type'	        , dataIndex : 'FeeType_Desc'			     , width : 150, sortable : true, align: 'left'},
					{id: 'CommPercent'            ,header: 'Split %'			    , dataIndex : 'CommPercent'	           , width : 100, sortable : true, align: 'right'},
					{id: 'AgentCommAmt'						,header: 'Commission'				, dataIndex : 'AgentCommAmt'					 , width : 100, sortable : true, align: 'right'},
					{id: 'CtractCommAmt'				 	,header: 'Contract Amount'	, dataIndex : 'CtractCommAmt'				   , width : 100, sortable : true, align: 'right'}
					
				],		    
		    autoExpandColumn: 'Ctract_CtractNo',
		   	//autoWidth: true,
		   	autoHeight:true,
		   	stripeRows: true,
		    sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
				viewConfig: {emptyText: 'No records to display.'},
				bbar: new Ext.PagingToolbar
					(
						{
							id : 'pBaSCommSplitsBar',								
							displayInfo: true,
							pageSize:10,	
							displayMsg: 'Displaying {0} - {1} of {2}',
							emptyMsg: "No items to display",
							store: myBaSCommSplitsStore,
							plugins: [new Ext.ux.PageSizePlugin()]
						}
					)			
						
			}
		);
	//#################################################################	
	///////////////////////////////////////////////////////////////////
	//#################################################################	
	////////////////////////Fund Prices ////////////////////////
	                     
	
	
	// create the grid
		myBaSUnitClasssGrid = new Ext.grid.GridPanel
		(
			{
									         				
				hidden:true,
				id:'idMyBaSUnitClasssGrid',
				//renderTo:'myFundsUnderManagementL2',
				store: myBaSUnitClasssStore,
				columns: 
				[
					{id: 'Price_Date'				       ,header: 'Date'		          , dataIndex : 'Price_Date'			 		 , width : 250, sortable : true, align: 'left'},
					{id: 'Fund_Name'							 ,header: 'Fund Name'	        , dataIndex : 'Fund_Name'			    	 , width : 150, sortable : true, align: 'left'},
					{id: 'Fund_code'               ,header: 'Fund Code'			    , dataIndex : 'Fund_code'	           , width : 100, sortable : true, align: 'left'},
					{id: 'Unit_Class'						   ,header: 'Unit Class'				, dataIndex : 'Unit_Class'					 , width : 100, sortable : true, align: 'right'},
					{id: 'Entity_Price'				     ,header: 'Entity Price ($)'	, dataIndex : 'Entity_Price'				 , width : 100, sortable : true, align: 'right'},
					{id: 'NAV_Price'						   ,header: 'NAV Price ($)'			, dataIndex : 'NAV_Price'						 , width : 100, sortable : true, align: 'right'},
					{id: 'Exit_Price'				       ,header: 'Exit Price($)'		  , dataIndex : 'Exit_Price'				   , width : 100, sortable : true, align: 'right'}
					
				],		    
		    autoExpandColumn: 'Contract_Number',
		   	//autoWidth: true,
		   	autoHeight:true,
		   	stripeRows: true,
		    sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
				viewConfig: {emptyText: 'No records to display.'},
				bbar: new Ext.PagingToolbar
					(
						{
							id : 'pBaSUnitClasssBar',								
							displayInfo: true,
							pageSize:10,	
							displayMsg: 'Displaying {0} - {1} of {2}',
							emptyMsg: "No items to display",
							store: myBaSUnitClasssStore,
							plugins: [new Ext.ux.PageSizePlugin()]
						}
					)			
						
			}
		);
	//#################################################################	
