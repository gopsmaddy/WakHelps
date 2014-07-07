/*!
 * Ext JS Library 3.3.0
 * Copyright(c) 2006-2010 Ext JS, Inc.
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
SampleGrid = function(limitColumns){

    function italic(value){
        return '<i>' + value + '</i>';
    }

    function change(val){
        if(val > 0){
            return '<span style="color:green;">' + val + '</span>';
        }else if(val < 0){
            return '<span style="color:red;">' + val + '</span>';
        }
        return val;
    }

    function pctChange(val){
        if(val > 0){
            return '<span style="color:green;">' + val + '%</span>';
        }else if(val < 0){
            return '<span style="color:red;">' + val + '%</span>';
        }
        return val;
    }


    var columns = [
        {id:'fund_Long',header: "fund_Long", width: 80, sortable: true, dataIndex: 'fund_Long'},
        {header: "fund_short", width: 80, sortable: true, dataIndex: 'fund_short'},
        {header: "value", width: 80, sortable: true, dataIndex: 'value'}
        //{header: "Price", width: 75, sortable: true, renderer: Ext.util.Format.usMoney, dataIndex: 'price'},
        //{header: "Change", width: 75, sortable: true, renderer: change, dataIndex: 'change'},
        //{header: "% Change", width: 75, sortable: true, renderer: pctChange, dataIndex: 'pctChange'},
        //{header: "Last Updated", width: 85, sortable: true, renderer: Ext.util.Format.dateRenderer('m/d/Y'), dataIndex: 'lastChange'}
    ];

    // allow samples to limit columns
    if(limitColumns){
        var cs = [];
        for(var i = 0, len = limitColumns.length; i < len; i++){
            cs.push(columns[limitColumns[i]]);
        }
        columns = cs;
    }

    SampleGrid.superclass.constructor.call(this, {
        store: new Ext.data.Store({        	
        		// load using HTTP
						proxy : new Ext.data.HttpProxy
						(
							{																
								method: 'GET',
								prettyUrls: false,
								url: 'http://localhost:8080/HiTrustWebApplication/iop/xml/t-hitrust-portfolioList.xml'
							}
						),
						
						// the return will be XML, so lets set up a reader
						reader: new Ext.data.XmlReader({
							   // records will have an "Item" tag
							   record: 'List',
							   id: 'Key',
							   totalProperty: 'totalRecords'
						   }, [
							   // set up the fields mapping into the xml doc
							   // The first needs mapping, the others are very basic
											{name: 'fund_Long', mapping: 'Desc'},
											{name : 'fund_short', mapping: 'Code'},
											{name : 'value', mapping: 'Ccy > ISOCode'}
						   ])   	
            
        }),
        columns: columns,
        autoExpandColumn: 'fund_Long',
        height:250,
        width:600
    });


}

Ext.extend(SampleGrid, Ext.grid.GridPanel);