$(document).ready(function () {
    hideEditForm();
    hideAddForm();
    showSearchBar();
    if ($('#searchBar').is(':visible')) {
        registerAddSaveButton();
        registerAddCancelButton();
        registerEditSaveButton();
        registerEditCancelButton();
        loadDVDs();
    }
});

/*  $(document).one('ready', function () {
        alert('One');
        loadDVDs();
}); */

function deleteDVD(dvdId) {
    $.ajax({
        type: 'DELETE',
        url: 'http://localhost:11553/dvd/' + dvdId,
        success: function () {
            if ($('#searchBar').is(':visible')) {
                loadDVDs();
            }
        }
    });
}

function loadDVDs() {

    clearErrorMessages();

    $.ajax({
        type: 'GET',
        url: 'http://localhost:11553/dvds',
        success: function (dvdArray) {
            loadTable(dvdArray);
        },
        error: function () {
            $('#errorMessages')
                .append($('<li>')
                    .attr({
                        class: 'list-group-item list-group-item-danger'
                    }))
                .text('Error calling web service. Please try again later').show();
        }
    });
}