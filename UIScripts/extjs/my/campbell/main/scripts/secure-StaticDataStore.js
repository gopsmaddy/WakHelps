		
		myDocumentTypeStore4MarketingMaterials= new Ext.data.SimpleStore
    (
      {
          fields: ['value', 'name'],
          data: 
          [
						['Callan Chart','Callan Chart'],
						['Drawdowns','Drawdowns'],
						['Performance History','Performance History'],
						['Performance Update','Performance Update'],						
						['Presentation','Presentation'],
						['Summary','Summary'] ,
						['Value of Diversification','Value of Diversification']
					],
					autoLoad: true
      }
    );
    
    myDocumentTypeStore4FundNews= new Ext.data.SimpleStore
    (
      {
          fields: ['value', 'name'],
          data: 
          [
						['Mid year review','Mid year review'],
						['Year end review','Year end review']
						
					],
					autoLoad: true
      }
    );
    
    myDocumentTypeStore4Forms= new Ext.data.SimpleStore
    (
      {
          fields: ['value', 'name'],
          data: 
          [
						['Account Change Form','Account Change Form'],
						['Addition Form','Addition Form'],
						['Client Address Change Request Form','Client Address Change Request Form'],
						['K1 Request Form','K1 Request Form'],
						['Redemption Form','Redemption Form'],
						['Repurchase Request Form','Repurchase Request Form'],
						['Statement Request Form','Statement Request Form']
					],
					autoLoad: true
      }
    );
    
    myDocumentTypeStore4Firms= new Ext.data.SimpleStore
    (
      {
          fields: ['value', 'name'],
          data: 
          [						
						['Service','Service'],
						['Split Commission','Split Commission'],
						['Trail','Trail'],
						['Upfront','Upfront']
					],
					autoLoad: true
      }
    );
    





		