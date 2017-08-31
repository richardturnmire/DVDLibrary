function checkAndDisplayValidationErrors(input) {
    clearErrorMessages();

    var errorMessages = [];

    input.each(function() {
        if (!this.validity.valid) {
            var errorField = $('label[for=' + this.id + ']').text();
            errorMessages.push(errorField + ' ' + this.validationMessage);
        }
    });

    if (errorMessages.length > 0) {
        $.each(errorMessages, function(index, message) {
            $('#errorMessages').append($('<li>').attr({ class: 'list-group-item list-group-item-danger' }).text(message));
        });
        return true;
    } else {
        return false;
    }
}

function clearDVDTable() {
    $('#contentRows').empty();
}

function clearErrorMessages() {
    $('#errorMessages').empty();
}

function loadTable(dvdArray)
{
    clearDVDTable();
     var contentRows = $('#contentRows');
    $.each(dvdArray, function (index, dvd) {
                var title = dvd.title;
                var releaseYear = dvd.realeaseYear;
                var director = dvd.director;
                var rating = dvd.rating;
                var dvdId = dvd.dvdId;

                var row = '<tr>';
                row += '<td>' + title + '</td>';
                row += '<td>' + releaseYear + '</td>';
                row += '<td>' + director + '</td>';
                row += '<td>' + rating + '</td>';
                row += '<td><a onclick=\'showEditForm(' + dvdId + ')\'>Edit</a></td>';
                row += '<td><a onclick=\'deleteDVD(' + dvdId + ')\'>Delete</a></td>';
                row += '</tr>';

                contentRows.append(row);
            });
}
