Ext.require([
	'Ext.grid.*',
	'Ext.data.*',
	'Ext.util.*',
	'Ext.state.*',
	'Ext.tab.*',
    'Ext.window.*',
    'Ext.tip.*',
    'Ext.layout.container.Border'
	]);

//var varMyTickerCellEditing = Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 2});
//var varMyTickerMask = new Ext.LoadMask(Ext.getBody(), {msg:"Please wait..."});

var isGridRefresh=false;

	function render2TickerDate(val) 
	{
		//yyyy-MM-dd'T'HH:mm:ss.mmmZ	
		return freeFormDate=formatDate(new Date(val),'yyyy-MM-dd HH:mm:ss');
	}

	Ext.define('MyTickerModel',
	{
		extend	: 'Ext.data.Model',
		id		: 'idMyTickerModel',
		fields	:
		[
			{name: 'id'		, mapping: 'id'	, type: 'int'	, useNull: true},
			{name: 'type'	, mapping: 'type'},
			{name: 'subject', mapping: 'subject',convert: function (v) { return Ext.util.Format.htmlEncode(v);}},
			{name: 'body'	, mapping: 'body', convert: function (v) { return Ext.util.Format.htmlEncode(v);}},			
			{name: 'time'	, mapping: 'time',type: 'int',useNull: true , convert : function (v) { return render2TickerDate(v);}},
			{name: 'status'	, mapping: 'status',type: 'int'},
			
			
		]

	});	
	
		
	Ext.define('MyPagingbar' ,	
	{
		extend	: 'Ext.PagingToolbar',
		alias 	: 'widget.apppagingbar',
		
		requires: ['Ext.toolbar.Paging'],		
			
		//id 		: 'idPagingbarView',
		//xtype		: 'pagingtoolbar',
		//store		: this.bbstore,	
		displayInfo	: true,
		displayMsg	: 'Displaying topics {0} - {1} of {2}',
		emptyMsg	: "No items to display",
		pageSize	: varGridDefaultPageSize,	
		//plugins: [new Ext.ux.PageSizePlugin()]	

		initComponent: function() 
		{
			this.callParent(arguments);
		}		
	});
    
    var msgBodyPanel=Ext.define('MyTickerMsgBodyPanel', 
	{
        extend: 'Ext.Panel',
        id:'msgBodyPanel',
        // register the App.BookDetail class with an xtype of bookdetail
        alias: 'widget.mytickermsgbodypanel',
        // add tplMarkup as a new property
        tplMarkup: 
		[
            //'Subject: <a href="{subject}" target="_blank">{subject}</a><br/>',  
			'<b>Message: {type} at {time}</b><br/><br/>',			
            '{body}<br/>',            
        ],
        // startingMarup as a new property
        startingMarkup: 'Please select a message to see additional details',

        bodyPadding: 7,
        // override initComponent to create and compile the template
        // apply styles to the body of the panel and initialize
        // html to startingMarkup
        initComponent: function() 
		{
            this.tpl = Ext.create('Ext.Template', this.tplMarkup);
            this.html = this.startingMarkup;

            this.bodyStyle = 
			{
                background: '#ffffff'
            };
            // call the superclass's initComponent implementation
            this.callParent();
        },
        // add a method which updates the details
        updateDetail: function(data) 
		{
            this.tpl.overwrite(this.body, data);
        }
    });
	
	//var apmSchedulerTBar = Ext.create('Ext.toolbar.Toolbar',
	Ext.define('MyToolbar' ,	
	{
		extend	: 'Ext.toolbar.Toolbar',
		alias 	: 'widget.apptoolbar',
		
		requires: ['Ext.toolbar.Toolbar'],
		
		items: 
		[
			{
				id  	: 'idTDeleteBtn',
				//itemId	: 'idDeleteBtn',
				text	: 'Clear browsed events',
				iconCls	: 'icon-delete',
				disabled: false,
				hidden	: false,
				//action	: 'delete'
				handler: function() 
				{
					
					//console.debug("buttonDelete... ");
					Ext.Ajax.request(
					{
						url: varTickerDeleteEventByStatusUrl,
						method: 'POST',
						params: {status:'1'},
						success: function(response, options)
						{
						   var jsonResponse = Ext.decode(response.responseText);                              
							if(jsonResponse.success)
							{
								//console.debug("success-DeleteEventByStatus >>> "+jsonResponse.message);
								MyTickerStore.load();
                                Ext.getCmp('msgBodyPanel').updateDetail("");
							}
							else	
							{
								//console.debug("failed-DeleteEventByStatus >>> "+jsonResponse.message);						
							}				   
						},
						failure: function(response, options)
						{
						   var serverResponse = response.responseText;
						   //console.debug("failure-DeleteEventByStatus >>> "+serverResponse);			   
						}
					});
				}

			},			
		],		
		initComponent: function() 
		{   
			this.callParent(arguments);
		},								

	});
	
	
	var MyTickerStore = Ext.create('Ext.data.Store', 
	{
		model: 'MyTickerModel',
		remoteSort	: true,
		// allow the grid to interact with the paging scroller by buffering
		buffered	: false,
		autoSync	: false,
		autoLoad	: false,
		pageSize	: varGridDefaultPageSize,
		proxy		: 
		{				
			url 	: varTickerGetEventsUrl,
			actionMethods: {create: "POST", read: "POST", update: "POST", destroy: "POST"},
			type	: varProxyType,					
			reader	: 
			{
				type: varReaderType,
				root: varRootRecord,
				idProperty: varIdProperty,
				totalProperty: varTotalProperty,					
				successProperty	: varSuccessProperty,
				messageProperty: varMessageProperty,
			},			
			simpleSortMode: varSimpleSortModeOn,
			listeners:
			{
				/*
				exception: function(proxy, response, operation)
				{
					Ext.MessageBox.show(
					{
						title: 'Remote Exception',
						msg: operation.getError(),
						icon: Ext.MessageBox.ERROR,
						buttons: Ext.Msg.OK
					});
				}
				*/
			},			
		},			
		sorters: [{property: 'time', direction: 'desc'}]	
	});	
	
	//var MyTickerGridPanel = Ext.create('Ext.grid.Panel', 
	Ext.define('MyTickerGridPanel' ,	
	{
		extend	: 'Ext.grid.Panel',
		alias 	: 'widget.mytickergridpanel',
		
		id: 'idMyTickerGridPanel',
		title: 'NKAM Alert Window',
		//renderTo: 'divMyTickerList',
		
		
		store: MyTickerStore,				
		//rowNumberer: true,
		
		height: 200,
		//width: 960,
		//autoHeight: true,
		autoWidth: true,
		
		columns :
		[	
			{id: 'idGRowNum' , header: "RowNum"		, xtype: 'rownumberer', width:  50	, sortable: false	, hidden: varGridHideRowId},
			{id: 'idGId'	 , header: "Id"			, dataIndex: 'id'	  , width:  50	, sortable: false	, align: 'center' , hidden:true},
			{id: 'idGStatus' , header: "Status"		, dataIndex: 'status' , width:  30	, sortable: false	, align: 'center' , hideable:false, hidden:true},
			{id: 'idGType'	 , header: "Type"		, dataIndex: 'type'	  , width:  180	, sortable: true	, align: 'center'},
			{id: 'idGSubject', header: "Message"	, dataIndex: 'subject', flex:   1	, sortable: true	, align: 'left'	} ,
			{id: 'idGTime'	 , header: "Time"		, dataIndex: 'time'	  , width:  120	, sortable: true	, align: 'center' },//, renderer:render2TickerDate},
			//{id: 'idGBody'   , header: "Description", dataIndex: 'body'	  , flex:   1	, sortable: false	, align: 'left'	  , renderer: Ext.String.htmlEncode },//hidden:true	, hideable:false },
			
		],
				
		viewConfig: 
		{
			emptyText: 'No records to display.',
			
			getRowClass: function(record, index, rowPrms, ds) 
			{
				if (record.data.status > 0) 
				{
					//console.log("status >>> "+record.data.status);		
					return 'read-ticker-message';
				} 
				else 
				{
					return 'unread-ticker-message';
				}	
			},
						
		},
		
		collapsible: true,
		loadMask: true,	

		//selModel: Ext.create('Ext.selection.CheckboxModel'),
		
		dockedItems: 
		[				
			{
				id 		: 'idMyTickerBBar',
				xtype	: 'apppagingbar',
				store	: MyTickerStore,
				dock	: 'bottom',
				hidden	: false,
			},
			{
				id 		: 'idMyTickerTBar',
				xtype	: 'apptoolbar',
				dock	: 'top',
				hidden	: false,
			},				
		]
	});
	
	
	
	
	Ext.define('MyTickerMsgWindow', 
	{
        //extend: 'Ext.window.Window',
		extend: 'Ext.container.Container',
        alias: 'widget.window',

        //title: 'NKAM Alert Window',
		renderTo:'divNKAMTicker',
		closable: false,
		closeAction: 'hide',
		//floatable: false,
		width: 900,
		minWidth: 400,
		height: 640,
		layout: 
		{
			type: 'border',
			padding: 10
		},		
        // override initComponent
        initComponent: function() 
		{
            this.items = 
			[				
				{
					itemId	: 'idmytickergridpanel',
					xtype	: 'mytickergridpanel',
					region  : 'center',
					//collapsed: true,
					collapsible: false,
				},
				{
					itemId:'idmytickermsgbodypanel',	
					xtype :'mytickermsgbodypanel',	
					region: 'south',
					height: 250,
					split: true,
					collapsed: false,
					collapsible: true,
					floatable: false,
				}
			];
                      
            // call the superclass's initComponent implementation
            this.callParent();
        },
        // override initEvents
        initEvents: function() 
		{
            // call the superclass's initEvents implementation
            this.callParent();

            // now add application specific events
            // notice we use the selectionmodel's rowselect event rather
            // than a click event from the grid to provide key navigation
            // as well as mouse navigation
            var messageGridPanel = this.getComponent('idmytickergridpanel').getSelectionModel();
            messageGridPanel.on('selectionchange', this.onRowSelect, this);
        },
        // add a method called onRowSelect
        // This matches the method signature as defined by the 'rowselect'
        // event defined in Ext.selection.RowModel
        onRowSelect: function(sm, rs) 
		{
            // getComponent will retrieve itemId's or id's. Note that itemId's
            // are scoped locally to this instance of a component to avoid
            // conflicts with the ComponentManager
            
            if (rs.length) 
			{				   
               var messageBodyPanel = this.getComponent('idmytickermsgbodypanel');								
               messageBodyPanel.updateDetail(rs[0].getData());
			   
			   //console.info("row selected ");
               
			   myTickerUpdateProcess(rs);	   
			   
            }

        }
    });
	
	function myTickerUpdateProcess(row) 
	{	
		Ext.Ajax.request(
			{
				url: varTickerUpdateEventUrl,
				method: 'POST',
				params: {oldstatus:'0',newstatus:'1', id:row[0].get('id'), status:1},
				success: function(response, options)
				{
				   var jsonResponse = Ext.decode(response.responseText);
					if(jsonResponse.success)
					{
						//console.info("success-UpdateEventByStatus >>> "+jsonResponse.message);	
					}
					else	
					{
						//console.info("failed-UpdateEventByStatus >>> "+jsonResponse.message);						
					}				   
				},
				failure: function(response, options)
				{
				   var serverResponse = response.responseText;
				   //console.info("failure-UpdateEventByStatus >>> "+serverResponse);			   
				}
			});
	}
	

	//uses the Proxy we set up on Model to load the Store data
	function myTickerPollingProcess() 
	{	
		MyTickerStore.load(); 
		/*
		if(isGridRefresh)
		{
			MyTickerStore.load(); 
		}
		
		Ext.Ajax.request(
		{
			url: varTickerPollingUrl,
			method: 'POST',
			params: {status:'0'},
			success: function(response, options)
			{
			   //var serverResponse = response.responseText;
			   var jsonResponse = Ext.decode(response.responseText);
				if(jsonResponse.success)
				{
					//console.info("success >>> "+jsonResponse.message);
			   
					document.getElementById("idMyTickerButton").style.color='#FF0000';
					document.getElementById("idMyTickerButton").value='('+jsonResponse.totalCount+') New Alerts';	
				}
				else	
				{
					//console.info("failed >>> "+jsonResponse.message);
					document.getElementById("idMyTickerButton").style.color='#000000';
					document.getElementById("idMyTickerButton").value='('+jsonResponse.totalCount+') New Alerts';	
				}			   
			},
			failure: function(response, options)
			{
			   var serverResponse = response.responseText;
			   //console.info("failure >>> "+serverResponse);			   
			}
		});
		*/
	}
	
	
	
Ext.onReady(function() 
{		
	var win, button = Ext.get('idMyTickerButton');
	
	if (!win) 
	{
		win = new MyTickerMsgWindow();
		MyTickerStore.load();
	}
	
	/*
    button.on('click', function()
	{	
		
		if(isGridRefresh)
		{
			isGridRefresh=false;                
			document.getElementById("idMyTickerButton").style.color='#000000';	
			document.getElementById("idMyTickerButton").value='Application Alerts';		
		}
		else
		{
			isGridRefresh=true;                
			document.getElementById("idMyTickerButton").style.color='#000000';
			document.getElementById("idMyTickerButton").value='Application Alerts';
		}		
    });
	*/
		
	Ext.direct.Manager.addProvider(
    {
        type:'polling',
        url: myTickerPollingProcess,
        id: 'idMyTickerPolling',
        interval: varPollingInterval  
    });

	var pollB = Ext.direct.Manager.getProvider('idMyTickerPolling');
	
	
});