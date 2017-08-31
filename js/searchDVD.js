function showSearchBar() {
    $('#searchBar').show();
    $('#dvdTableDiv').show();
}

function hideSearchBar() {
    $('#searchBar').hide();
    $('#dvdTableDiv').hide();
}

function searchDVD() {
    clearErrorMessages();
    clearDVDTable();

    hideEditForm();
    hideAddForm();
    showSearchBar();

    var contentRows = $('#contentRows');
    var searType = $('#search-dropdown').val();
    if (searType == "null") searType = "/";

    var searArg = $('#searchArg').val().trim();
    if (searArg == "") searType = "/";

    var searStr = '/' + searType + '/' + searArg;
    if (searStr.indexOf("//") >= 0)
        searStr = '';

    var searUrl = 'http://localhost:11553/dvds/' + searStr;

    $.ajax({
        type: 'GET',
        url: searUrl,
        success: function (dvdArray) {
            loadTable(dvdArray);
        },
        error: function () {
            $('#errorMessages')
                .append($('<li>')
                    .attr({
                        class: 'list-group-item list-group-item-danger'
                    }))
                .text('Error calling web service. Please try again later');
        }
    });
}