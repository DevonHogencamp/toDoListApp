$(document).ready(function() {

    $('form').on('submit', function() {
        var item = $('form input');
        var toDo = {
            item: item.val()
        };

        $.ajax({
            type: 'POST',
            url: '/toDo',
            data: toDo,
            success: function(data) {
                //do something with the data via front-end framework
                location.reload();
            }
        });

        return false;

    });

    $('li').on('click', function() {
        var item = $(this).text().replace(/ /g, "-");
        console.log(item);
        $.ajax({
            type: 'DELETE',
            url: '/toDo/' + item,
            success: function(data) {
                //do something with the data via front-end framework
                location.reload();
            }
        });
    });
});
