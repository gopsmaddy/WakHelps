		/////////Documents Download///////////////////////////
		//Type: Web Include {id: 27146} {uid: 71de6fb0-9a21-4402-8c5e-c6fc772f4495}//
	
		var body = Ext.getBody();
			   
			   var frame = body.createChild
			   (
				   {
					   tag:'iframe'
					   ,cls:'x-hidden'
					   ,id:'idDownloadIFrame'
					   ,name:'idDownloadIFrame'
				   }
			   );		  
			    
			   var form = body.createChild
			   (
				   {
					   tag:'form'
					   ,cls:'x-hidden'				   
					   ,id:'idDownloadForm'
						 //,action:''								  				 
					   ,target:'idDownloadIFrame'
					   ,method:'POST'							     
				   }
			   );
			   
			   var btn = new Ext.Button
			   (
				   {
					   text:'Download Reports Checked Below'
					   ,id:'idDownloadButton'					  
					   ,style:'margin:0px 0 0 0px'
					   ,handler:function() 
					   {		
					   		
					   							   					   		 
								if(mySelectModel.getCount()==1)	
					   			downloadAction=varDownloadSingleDocumentURL+'&'+Ext.urlEncode({documentId:Ext.getCmp('iddocids').getValue().substring(1),documentName:Ext.getCmp('iddocname').getValue(),contentType:Ext.getCmp('idcontenttype').getValue()});
					   		else
					   			downloadAction=varDownloadMultipleDocumentsURL+'&'+Ext.urlEncode({documentIds:Ext.getCmp('idpubids').getValue().substring(1),documentName:'ReleasedDocuments.zip'});
					   								   		
					   		//alert(downloadAction);
					   		
					   		var f = document.getElementById('idDownloadForm');
					   		f.action = downloadAction;
					   		f.submit();
					   		
//					   		form.dom.action=downloadAction;	
					   						   		
					   		//myDocumentsMask.show();
//					   		form.dom.submit();
					   		//myDocumentsMask.hide();
					   		
					   		//var f = form.dom.submit != undefined ? form.dom : form.dom.firstChild
					   		//f.submit();
					   							   		
					   		/*
					   		form.dom.submit
					   		(
	              	{                  
		                 success: function(f,a)
		                 {
		                      Ext.Msg.alert('Success', 'It worked');
		                  },
		                  failure: function(f,a)
		                  {
		                      Ext.Msg.alert('Failure', 'It x worked');
		                  }                  
	              	}
	              );
	              */
					   }
				   }
			   );
			   
		///////////Masking///////////////////		   
			   
		var myDownloadMask = new Ext.LoadMask
		(
			Ext.getBody(), 
			{
					msg:"Please wait...",	
					removeMask:true				
			}
		);
		
		/////////////////Checkbox Selection Model//////////////////////////////////////////	
		mySelectModel = new Ext.grid.CheckboxSelectionModel
		(
			{	
				//id	 			:'idSelectModel',
				//width	: 30,	
				separator:',',						
	      listeners: 
	      {
	          // On selection change, set enabled state of the removeButton
	          // which was placed into the GridPanel using the ref config
	          selectionchange: function(sm) 
	          {
	          	
	            if (sm.getCount()>0) 
	            {
	               Ext.getCmp('idDownloadButton').enable();	   
	            } 
	            else 
	            {
	               Ext.getCmp('idDownloadButton').disable();
	            }	            
	            
	          },
	          rowselect : function(sm, rowIndex, r)   
	          {	          	
	          	Ext.getCmp('iddocids').setValue(Ext.getCmp('iddocids').getValue().replace(this.separator+r.get('id'),'')+this.separator+r.get('id'));	 
	          	Ext.getCmp('idpubids').setValue(Ext.getCmp('idpubids').getValue().replace(this.separator+r.get('publicationId'),'')+this.separator+r.get('publicationId'));	 
	          	Ext.getCmp('iddocname').setValue(r.get('fileName')); 
	          	Ext.getCmp('idcontenttype').setValue(r.get('description'));         	
	          },
	          rowdeselect : function(sm, rowIndex, record) 
	          {
	          	Ext.getCmp('iddocids').setValue(Ext.getCmp('iddocids').getValue().replace(this.separator+record.get('id'),''));	 
	          	Ext.getCmp('idpubids').setValue(Ext.getCmp('idpubids').getValue().replace(this.separator+record.get('publicationId'),''));	           	
	          }
	      }
	        
	    }
	  );
			   