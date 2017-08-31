function showEditForm(dvdId) {;
    

    clearErrorMessages();
  
    $.ajax({
        type: 'GET',
        url: 'http://localhost:11553/dvd/' + dvdId,
        success: function(data, status) {
            $('#edit-title').val(data.title);
            $('#edit-release-year').val(data.realeaseYear);
            $('#edit-director').val(data.director);
            $('#edit-rating').val(data.rating);
            $('#edit-notes').val(data.notes);
            $('#edit-dvd-id').val(data.dvdId);
                hideSearchBar();
                hideAddForm();
            $('#edit-page').show();
        },
        error: function() {
            $('#errorMessages')
                .append($('<li>')
                    .attr({ class: 'list-group-item list-group-item-danger' }))
                .text('Error calling web service. Please try again later');
        }
    });

    
}

function hideEditForm() {

    $('#edit-title').val('');
    $('#edit-releaseDate').val('');
    $('#edit-director').val('');
    $('#edit-rating').val('');
    $('#edit-notes').val('');

    $('#edit-page').hide();

}
    
function registerEditSaveButton(){
    $('#edit-save-button').click(function(event){
        var haveValidationErrors = checkAndDisplayValidationErrors($('#edit-form').find('input'));
         if (haveValidationErrors) {
             return false;
         }
             
            var id = $('#edit-dvd-id').val();
            var title = $('#edit-title').val();
            var realeaseYear = $('#edit-release-year').val();
            var director = $('#edit-director').val();
            var rating = $('#edit-rating').val();
            var notes = $('#edit-notes').val();
            var url = 'http://localhost:11553/dvd/' + id;

         $.ajax({
             type: 'PUT',
             url: url,
             data: JSON.stringify({
                  dvdId: id,
                 title: title,
                 realeaseYear: realeaseYear,
                 director: director,
                 rating: rating,
                 notes: notes
             }),
             headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json'
             },
             'contentType': 'json',
             success: function() {
                hideAddForm();
                hideEditForm();
                showSearchBar();
                 loadDVDs();
             },
             error: function() {

                 $('#errorMessages')
                     .append($('<li>')
                         .attr({ class: 'list-group-item list-group-item-danger' }))
                     .text('Error calling web service. Please try again later')
                     .show();
             }
         }); 
            
    });
}

function registerEditCancelButton() {
    $('#edit-cancel-button').click(function (event) {
                 hideAddForm();
                hideEditForm();
                showSearchBar();
               
        });
  
}