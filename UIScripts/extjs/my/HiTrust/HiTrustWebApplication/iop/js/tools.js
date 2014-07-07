// Read a page's GET URL variables and return them as an associative array.
	function getUrlVars()
	{
	    var vars = [], hash;
	    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	    for(var i = 0; i < hashes.length; i++)
	    {
	        hash = hashes[i].split('=');
	        vars.push(hash[0]);
	        vars[hash[0]] = hash[1];
	    }
	    return vars;
	}
	
	/////////////////Documents Hidden Panel//////////////////////////////////////////	
	  myHiddenPanel = new Ext.FormPanel
	  (
	  	{	
	  		//hidden: true,		  		     
	      id: 'idHiddenPanel',	
	      //renderTo: 'myHidden',          
	      items: 
	      	[	
		      	{
	              xtype			: 'textfield',
								id				: 'idprofilerelno',
								name			: 'Profile RelNo',																									
								listeners: 
								{
		          		'render': function(p) 
		          		{                        
		              	//this.hide();
		          		}
			        	}		
	          }	,
	          {
	              xtype			: 'textfield',
								id				: 'idprofilekey',
								name			: 'Profile Key',																									
								listeners: 
								{
		          		'render': function(p) 
		          		{                        
		              	//this.hide();
		          		}
			        	}		
	          }	,
		      	{
	              xtype			: 'textfield',
								id				: 'idprofilecompanykey',
								name			: 'Profile Company Key',																									
								listeners: 
								{
		          		'render': function(p) 
		          		{                        
		              	//this.hide();
		          		}
			        	}		
	          }			
	      ]
	    }
	  ); 
	  
	  Ext.getCmp('idHiddenPanel').getForm().setValues
				   		(
					   		{
					   			idprofilekey			: getUrlVars()["prokey"]!=null ? getUrlVars()["prokey"] : '', 
					   			idprofilerelno			: getUrlVars()["relno"]!=null ? getUrlVars()["relno"] :'',
					   			idprofilecompanykey			:getUrlVars()["compkey"]!=null ? getUrlVars()["compkey"] : ''
					   		}
				   		);	
				   		
				   		
				   		