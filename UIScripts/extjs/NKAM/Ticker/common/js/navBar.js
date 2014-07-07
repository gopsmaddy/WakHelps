/**
 * Get the parent form of the specified child.
 */
function getMyForm(child) {
    var parent = child.parentNode;
    while (parent != null)
    {
        if (parent.nodeName == 'FORM')
        {
            break;
        }
        parent = parent.parentNode;
    }
    return parent;
}

/**
 * Effectively collapse all the nodes in the tree by setting the value
 * of the hidden expanded state fields to false.
 */
function collapseAll(frm)
{
    var children = frm.elements;
    for (var i = 0; i < children.length; i++)
    {
        // If the child is an input field
        if (children[i].nodeName == 'INPUT')
        {
            // ...and if the child is one of our hidden state fields
            if (children[i].name.search(/\:state$/) != -1 )
            {
                // collapse it
                children[i].value = 'false';
            }
        }
    }
}

/**
  * Hook function called when menu item is clicked
  */
function onClickHook(menuItem)
{
    var frm = getMyForm(menuItem);

    // Toggle the expanded state of the node just selected
    var expandedStateHiddenField = frm[menuItem.id + ':state'];
    var newState;
    if (expandedStateHiddenField != null)
    {
        if (expandedStateHiddenField.value == 'false')
        {
            newState = 'true';
        }
        else
        {
            newState = 'false';
        }
    }

    collapseAll(frm);
    expandedStateHiddenField.value = newState;
}



