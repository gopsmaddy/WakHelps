  //########################################################################
  //////////////////////////////////////////////////////////////////////////
  //########################################################################
  //My Investor Search
  
  myBaAgentInvestorsSearch = new Ext.FormPanel
  (
  	{
  		hidden:true,
  		id:'idMyBaAgentInvestorsSearch',
      labelWidth: 100, // label settings here cascade unless overridden
      frame:true,
      //renderTo: 'investorSearch',
      //title: 'Test panel',
<<<<<<< .mine
      bodyStyle:'padding:5px 5px 0',      
      width: 650,			
=======
     // bodyStyle:'padding:5px 5px 0',      
      width: 650,	
      Height:	230,	
>>>>>>> .r986
      
      items:
				[
					{
						layout: 'column',
						items:
						[
							{	
								columnWidth:.5,
								layout: 'form',
								items:
								[
									new Ext.form.TextField
									(
										{
											id: 'lastname',
											fieldLabel: 'Name',
											name: 'lastname',
											anchor:'95%',
											width:100,
											allowBlank:true
										}
									),
									new Ext.form.TextField
									(
										{
											id: 'investornumber',
											fieldLabel: 'Investor Number',
											name: 'investornumber',
											anchor:'95%',
											width:80,
											allowBlank:true
										}
									)
								]
							},
							{	
								columnWidth:.5,
								layout: 'form',
								items:
								[
									new Ext.form.TextField
									(
										{
											id: 'firstname',
											fieldLabel: 'Surname',
											name: 'firstname',
											anchor:'95%',
<<<<<<< .mine
											width:80,
											allowBlank:true,
=======
											width:80,
											allowBlank:true
>>>>>>> .r986
										}
									),
									{
										xtype: 'checkbox', //defining the type of component  
										fieldLabel: 'Active',//assigning a label  
										name: 'activeProfile', //and a "name" so we can retrieve it in the server...  
										id: 'activeProfile',// ...when the form is sent  
										checked:true
									}
								]
							}
						]
					}					
				], //items
		    buttons: 
		    [
		    	{
            text: 'Search',
            handler: function()
            {
                if(myBaAgentInvestorsSearch.getForm().isValid())
                {
									myBaAgentInvestorsStore.load
									(
										
										{
											params:
											{
												start:0, 
												limit					: Ext.getCmp('pBaAgentInvestorsBar').pageSize,												
												firstName			: Ext.getCmp('firstname').getValue(),
												lastName			: Ext.getCmp('lastname').getValue(),
												investorNumber: Ext.getCmp('investornumber').getValue(),
												activeProfile	: Ext.getCmp('activeProfile').getValue()==true?'true':''
											}
										}
									);	
									myBaAgentInvestorsMask.show();									
				         }
            }
        	},
        	{
            text: 'Reset',
            handler: function()
            {
                myBaAgentInvestorsSearch.getForm().reset();
                
                myBaAgentInvestorsStore.load({params:{start:0, limit:Ext.getCmp('pBaAgentInvestorsBar').pageSize,activeProfile:'true'}});	
								myBaAgentInvestorsMask.show();
            }
        	}
        ]


    }
  ); 
  //########################################################################
  //////////////////////////////////////////////////////////////////////////
  //########################################################################
                        //My Investor per Fund
                        
                     		
  
  myBaAgentSummarysSearch = new Ext.FormPanel
  (
  	{
  		hidden:true,
  		id:'idMyBaAgentSummarysSearch',
      labelWidth: 100, // label settings here cascade unless overridden
      frame:true,
      //renderTo: 'distributionHistorySearch',
      //title: 'Test panel',
      //bodyStyle:'padding:5px 5px 0',      
      width: 640,		
      items:
				[
					{
						layout: 'form',
						items:
						[
							{	
								columnWidth:.5,
								layout: 'form',
								items:
								[
									{ 
										xtype: 'combo',						        
						        id: 'fundname',
<<<<<<< .mine
											fieldLabel: 'Fund Name',
											name: 'fundname',
											//anchor:'95%',
											width:300,
											allowBlank:true,
=======
										fieldLabel: 'Fund Name',
										name: 'fundname',
										anchor:'95%',
										width:260,
										allowBlank:true,
>>>>>>> .r986
						        emptyText: 'Select a Fund...',
						        store:myBaAgentFundsStore,		       
						        displayField: 'Fund_Desc',
						        valueField: 'Fund_Key',
						        selectOnFocus: true,
						        mode: 'local',
						        typeAhead: true,
						        editable: false,
						        triggerAction: 'all',
						        listeners: 
						        { select: 
				          		{ fn:function(combo, record, index)
				          			{
				          			}
				               
				              }  
						        }
						      }
						    ]
							},							
							{	
								columnWidth:.1,
								layout: 'form',
								items: 
								[							
									{
										xtype: 'checkbox', //defining the type of component  
										fieldLabel: 'Active',//assigning a label  
										name: 'activePortfolio', //and a "name" so we can retrieve it in the server...  
										id: 'activePortfolio',// ...when the form is sent  
										checked:true
									}	
								]
							}
						]
					}					
				], //items
				
				
		    buttons: 
		    [
		    	{
            text: 'Search',
            handler: function()
            {
                if(myBaAgentSummarysSearch.getForm().isValid())
                {             	
                	
                	myBaAgentSummarysStore.load
                	(
                		{
                				params:
                				{
                						start:0, 
                						limit:Ext.getCmp('pBaAgentSummarysBar').pageSize,
                						fundKey: Ext.getCmp('fundname').value,
                						activePortfolio	: Ext.getCmp('activePortfolio').getValue()==true?'true':''
                				}
                		}
                	);	
                	myBaAgentSummarysMask.show();                	
                }
            }
        	},
        	{
            text: 'Reset',
            handler: function()
            {
                myBaAgentSummarysSearch.getForm().reset();
                
                myBaAgentSummarysStore.load({params:{start:0, limit:Ext.getCmp('pBaAgentSummarysBar').pageSize}});	
								myBaAgentSummarysMask.show();
            }
        	}
        	      	
        ]
    }
  ); // end of Ext.FormPanel
  
  //########################################################################
  //////////////////////////////////////////////////////////////////////////
  //##############################My Commission Tab ##########################################
  
  myBaCommissionSummarysSearch = new Ext.FormPanel
  (
  	{
  		 		
  		
  		hidden:true,
      labelWidth: 100, // label settings here cascade unless overridden
      frame:true,
      //renderTo: 'BaCommissionSearch',
      //title: 'Test panel',
      bodyStyle:'padding:5px 5px 0',      
      width: 650,			
      
      items:
				[
					{
						layout: 'column',
						items:
						[
							{	
								columnWidth:.5,
								layout: 'form',
								items:
								[
									new Ext.form.DateField
									(
										{
											id: 'datefrom',
											fieldLabel: 'Payment Date (From)',
											name: 'datefrom',
											format:'d/m/Y',
											vtype: 'daterange',
											endDateField: 'dateto', // id of the end date field
											emptyText: "DD/MM/YYYY",	
											anchor:'95%',
											width:80,
											allowBlank:true,
										  editable: false
										}
									),
									new Ext.form.TextField
									(
										{
											id: 'paymentnumber',
											fieldLabel: 'Payment Number',
											name: 'paymentnumber',
											anchor:'95%',
											width:80,
											allowBlank:true
										}
									)
								]
							},
							{	
								columnWidth:.5,
								layout: 'form',
								items:
								[
									new Ext.form.DateField
									(
										{
											id: 'dateto',
											fieldLabel: 'Payment Date (To)',
											name: 'dateto',
											format:'d/m/Y',
											vtype: 'daterange',
											fromDateField: 'datefrom', // id of the end date field
											emptyText: "DD/MM/YYYY",	
											anchor:'95%',
											width:80,
											allowBlank:true,
										  editable: false
										}
									)
								]
							}
						]
					}					
				], //items
		    buttons: 
		    [
		    	{
            text: 'Search',
            handler: function()
            {
                if(myBaCommissionSummarysSearch.getForm().isValid())
                {
									myBaCommissionSummarysStore.load
										(
											
											{
												params:
												{
													start:0, 
													limit:Ext.getCmp('pBaCommissionSummarysBar').pageSize,
													
													sEffDateFrom: Ext.getCmp('datefrom').getValue(),
						              sEffDateTo: Ext.getCmp('dateto').getValue()	,
													paymentKey: Ext.getCmp('paymentnumber').getValue()
												}
											}
										);	
										myBaCommissionSummarysMask.show();
										
										$('#transaction').dialog('close');                   	
         						 myBaAgentPaysGrid.hide();	
					
                }
            }
        	},
        	{
            text: 'Reset',
            handler: function()
            {
            		Ext.getCmp('dateto').setValue('31/12/2100');
                Ext.getCmp('datefrom').setValue('01/01/1900');                
                myBaCommissionSummarysSearch.getForm().reset();
                
                myBaCommissionSummarysStore.load({params:{start:0, limit:Ext.getCmp('pBaCommissionSummarysBar').pageSize}});	
								myBaCommissionSummarysMask.show();
								
								$('#transaction').dialog('close');                   	
         				myBaAgentPaysGrid.hide();	
            }
        	}
        ]


    }
  ); // end of Ext.FormPanel