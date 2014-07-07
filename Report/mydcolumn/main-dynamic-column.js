//attach a function to the click of HTML Element
$("#btnGetData").click(LoadGridData);

//This will make an AJAX call to the server, passing all the form data and get the result of the search.
function LoadGridData(e)
{
    /// <summary>This will make an AJAX call to the server, passing all the form data and get the result of the search.</summary>
    /// <param name="e">Event object for the clicked Element.</param>

    e.preventDefault();

    //show the AJAX loader... the code is in my previous posts. it is not required so it can be removed if not needed
    objUIHelper.ShowAJAXLoader(true);

    //create the data store to load the data from AJAX web call
    jstore = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({ url: 'MyController/GetData', method: 'POST' }),
        reader: new Ext.data.DynamicJsonReader({ root: 'ResultData.GridData' }),
        remoteSort: false
    });

    //in case of any AJAX call exception, hide the uiBlocker and show the error message	
    jstore.on('loadexception', function(event, options, response, error)
    {
        //unblock the UI, another helper method to remove the ajax loader
        objUIHelper.HideAJAXLoader();
        
        //show the server error... 
        alert( response.responseText );
    });

    //we need to set the extra params here so it can be used on the grid refresh click
    jstore.on('beforeload', function()
    {
        jstore.baseParams = {
            anyServerData: $("#myHTMLForm").serialize()
        };
    });

    //after the data load in store, create the grid and display the data
    jstore.on('load', function(gridStore)
    {
        //remove any exisitng items from grid div. Grid div is a placeholder to show the extJsGrid
        $("#grid").empty();

        // Reset the Store's recordType
        gridStore.recordType = gridStore.reader.recordType;
        gridStore.fields = gridStore.recordType.prototype.fields;

        //create the paging toolbar
        var bar = new Ext.PagingToolbar({
            store: gridStore,
            pageSize: resultPageSize,
            displayInfo: true,
            displayMsg: 'Displaying record {0} - {1} of {2}',
            emptyMsg: 'No rows to show'
        });

        // Create the grid and bind it with the data store.
        grid = new Ext.grid.GridPanel({
            store: gridStore,
            cm: new Ext.grid.DynamicColumnModel(gridStore),
            selModel: new Ext.grid.RowSelectionModel({ singleSelect: true }),
            enableColLock: true,
            renderTo: 'grid',
            width: 940,
            autoHeight: true,
            title: 'Results',
            bbar: bar,
            pageSize: resultPageSize
        });

        // render the grid on UI
        grid.render();

        //unblock the UI
        objUIHelper.HideAJAXLoader();
    });

    //store's load will call the web URL and load the data
    jstore.load({
        params: {
            start: 0,
            limit: resultPageSize
        }
    });
}
