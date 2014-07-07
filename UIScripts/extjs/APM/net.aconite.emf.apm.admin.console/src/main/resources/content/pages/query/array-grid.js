Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*',
    'Ext.state.*'
]);




/*var myDefaultPageSize=20;

Ext.ux.PageSizePlugin = function(config) 
{
    Ext.apply(this, config);

    Ext.ux.PageSizePlugin.superclass.constructor.call
    (
    	this, 
	    {
	       store: new Ext.data.SimpleStore
	        (
		        {
		            fields: ['Name', 'Key'],
		            data: [['10', 10], ['20', 20], ['30', 30], ['40', 40],  ['50', 50]]
		        }
	        ),
	        //store:myPageSizeStore,
	        mode: 'local',
	        displayField: 'Name',
	        valueField: 'Key',
	        allowBlank: false,
	        triggerAction: 'all',
	        width: 50,
	        maskRe: /[0-9]/
	    }
	   );
};

Ext.extend
(
	Ext.ux.PageSizePlugin, Ext.form.ComboBox, 
	{
	    beforeText:'Show',
	    afterText:'Rows/Page',
	    init: function(paging) 
	    {
	        paging.on('render', this.onInitView, this);
	    },
	    
	    onInitView: function(paging) 
	    {
	        paging.add('-', this.beforeText, this, this.afterText);
	        this.setValue(paging.pageSize);
	        this.on('select', this.onPageSizeChanged, paging);
	        this.on
	        ('specialkey', function(combo, e) 
		        {
		            if(13 === e.getKey()) 
		            {
		                this.onPageSizeChanged.call(paging, this);        
		            }
		        }
	        );	
	    },	
	    onPageSizeChanged: function(combo) 
	    {
	        this.pageSize = parseInt(combo.getRawValue(), 0);
	       // this.doLoad(0);
	    }
	}
);
// end of file  */


// Define Company entity
// Null out built in convert functions for performance *because the raw data is known to be valid*
// Specifying defaultValue as undefined will also save code. *As long as there will always be values in the data, or the app tolerates undefined field values*
Ext.define('Company', {
    extend: 'Ext.data.Model',
    fields: [
       {name: 'id'},
       {name: 'systemdatetime', type: 'date',  dateFormat: 'd/m/Y', defaultValue: undefined},
       {name: 'requestdatetime', type: 'date',  dateFormat: 'd/m/Y', defaultValue: undefined},
       {name: 'zonekey',    defaultValue: undefined},
       {name: 'reqpan', defaultValue: undefined},
	   {name: 'reqpanseqnum', defaultValue: undefined},
	   {name: 'panexpdate', type: 'date',  dateFormat: 'd/m/Y', defaultValue: undefined},
	   {name: 'issuertokencode', defaultValue: undefined}
    ],
    idProperty: 'company'
});

Ext.onReady(function() {
    Ext.QuickTips.init();
    
    // setup the state provider, all state information will be saved to a cookie
    Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));

    // sample static data for the store
    var myData = [
        ['1',  '01/01/2012', '01/01/2012', 1, '4920********0010', 782, '31/05/2015',492019],
        ['2',  '02/01/2012', '01/01/2012', 2, '4920********0010', 233, '31/05/2015',492019],
        ['3',  '03/01/2012', '01/01/2012', 2, '5404********0001', 567, '31/05/2015',492019],
        ['4',  '04/01/2012', '01/01/2012', 4, '4920********0010', 123, '31/05/2015',492019],
        ['5',  '05/01/2012', '01/01/2012', 4, '5404********0001', 111, '31/05/2015',492019],
        ['6',  '06/01/2012', '01/01/2012', 5, '4920********0010', 987, '31/05/2015',492019],
        ['7',  '07/01/2012', '01/01/2012', 5, '4921********0023', 122, '31/05/2015',492019],
        ['8',  '08/01/2012', '01/01/2012', 4, '5404********0001', 567, '31/05/2015',492019],
        ['9',  '09/01/2012', '01/01/2012', 4, '4920********0010', 222, '31/05/2015',492019],
        ['10', '10/01/2012', '01/01/2012', 4, '4921********0022', 456, '31/05/2015',492019],
        ['11', '11/01/2012', '01/01/2012', 3, '5404********0001', 987, '31/05/2015',492019],
        ['12', '12/01/2012', '01/01/2012', 3, '4911********0024', 345, '31/05/2015',492019],
        ['13', '13/01/2012', '01/01/2012', 4, '4921********0023', 286, '31/05/2015',492019],
        ['14', '14/01/2012', '01/01/2012', 3, '4920********0010', 954, '31/05/2015',492019],
        ['15', '15/01/2012', '01/01/2012', 4, '4911********0024', 233, '31/05/2015',492019],
        ['16', '16/01/2012', '01/01/2012', 5, '5404********0001', 785, '31/05/2015',492019],
        ['17', '17/01/2012', '01/01/2012', 2, '4911********0024', 111, '31/05/2015',492019],
        ['18', '18/01/2012', '01/01/2012', 5, '5404********0001', 908, '31/05/2015',492019],
        ['19', '19/01/2012', '01/01/2012', 4, '4920********0010', 221, '31/05/2015',492019],
        ['20', '20/01/2012', '01/01/2012', 4, '5404********0001', 333, '31/05/2015',492019],
        ['21', '21/01/2012', '01/01/2012', 5, '4911********0024', 965, '31/05/2015',492019],
        ['22', '22/01/2012', '01/01/2012', 2, '4921********0023', 244, '31/05/2015',492019],
        ['23', '23/01/2012', '01/01/2012', 5, '4911********0024', 908, '31/05/2015',492019],
        ['24', '24/01/2012', '01/01/2012', 2, '4911********0024', 777, '31/05/2015',492019],
        ['25', '25/01/2012', '01/01/2012', 3, '5404********0001', 747, '31/05/2015',492019],
        ['26', '26/01/2012', '01/01/2012', 3, '4921********0023', 123, '31/05/2015',492019],
        ['27', '27/01/2012', '01/01/2012', 4, '4911********0023', 456, '31/05/2015',492019],
        ['28', '28/01/2012', '01/01/2012', 4, '4920********0011', 117, '31/05/2015',492019],
        ['29', '29/01/2012', '01/01/2012', 2, '4920********0008', 606, '31/05/2015',492019]
    ];

    // create the data store
    var store = Ext.create('Ext.data.ArrayStore', {
        model: 'Company',
        data: myData,
		totalProperty: 50
    });

    // create the Grid
    var grid = Ext.create('Ext.grid.Panel', {
        store: store,
        stateful: true,
        collapsible: true,
        multiSelect: true,
        stateId: 'stateGrid',
        columns: [
            {
                text     : 'ID',
                flex     : 1,
                sortable : true,
                dataIndex: 'id'
            },
            {
                text     : 'System Datetime',
                width    : 85,
                sortable : true,
                renderer : Ext.util.Format.dateRenderer('d/m/Y'),
                dataIndex: 'systemdatetime'
            },
            {
                text     : 'Request Datetime',
                width    : 75,
                sortable : true,
                renderer : Ext.util.Format.dateRenderer('d/m/Y'),
                dataIndex: 'requestdatetime'
            },
            {
                text     : 'Zone Key ID',
                width    : 75,
                sortable : true,
                dataIndex: 'zonekey'
            },
            {
                text     : 'Request PAN',
                width    : 85,
                sortable : true,
                dataIndex: 'reqpan'
            },
			{
                text     : 'PAN SEQ Number',
                width    : 85,
                sortable : true,
                dataIndex: 'reqpanseqnum'
            },
			{
                text     : 'PAN Expiry date',
                width    : 85,
                sortable : true,
                renderer : Ext.util.Format.dateRenderer('d/m/Y'),
                dataIndex: 'panexpdate'
            },
			{
                text     : 'Issuer Product Token code',
                width    : 85,
                sortable : true,
                dataIndex: 'issuertokencode'
            }
        ],
        height: 250,
        width: 990,
       
        renderTo: 'grid-example',
		listeners : {
			itemdblclick: function(dv, record, item, index, e) {
			$( "#dialog-modal" ).dialog({
			height: 140,
			modal: true
		});
    }
},

        viewConfig: {
            stripeRows: true,
            enableTextSelection: true
        }/*,bbar: new Ext.PagingToolbar
						(
							{
								id : 'pDocumentsBar',								
								displayInfo: true,
								pageSize:myDefaultPageSize,	
								displayMsg: 'Displaying {0} - {1} of {2}',
								emptyMsg: "No items to display",
								store: myData,
								plugins: [new Ext.ux.PageSizePlugin()]
							}
						)	*/	
    });
});
