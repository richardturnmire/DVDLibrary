function showAddForm() {

    hideSearchBar();
    hideEditForm();
    $('#add-page').show();
   
}

function hideAddForm() {

    $('#add-title').val('');
    $('#add-release-year').val('');
    $('#add-director').val('');
    $('#add-rating').val('');
    $('#add-notes').val('');

    $('#add-page').hide();
}

function registerAddSaveButton() {
    $('#add-save-button').click(function (event) {
        var haveValidationErrors = checkAndDisplayValidationErrors($('#add-form').find('input'));
        if (haveValidationErrors) {
            return false;
        }
        var title = $('#add-title').val();
        var release = $('#add-release-year').val();
        var director = $('#add-director').val();
        var rating = $('#add-rating').val();
        var notes = $('#add-notes').val();
        $.ajax({
            type: 'POST',
            url: 'http://localhost:11553/dvd',
            data: JSON.stringify({
                title: title,
                realeaseYear: release,
                director: director,
                rating: rating,
                notes: notes
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'dataType': 'json',
            success: function () {
                hideAddForm();
                hideEditForm();
                showSearchBar();
                loadDVDs();
                 
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
    });
}

function registerAddCancelButton() {
    $('#add-cancel-button').click(function (event) {
                 hideAddForm();
                hideEditForm();
                showSearchBar();
                
            
        });
  
}
