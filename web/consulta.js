
function on_data(data) {
    $('#results').empty();
    var docs = data.response.docs;
    var highlight = {};

    $.each(data.highlighting, function(i, item) {
        
        var content = "";

        if ('content' in item)
            content = item.content;
        
        highlight[i] = content;
    });

    $.each(docs, function(i, item) {
        var highlighted = highlight[item["id"]];
        $('#results').append($('<br><div>' + item.title + '</a></div>'));
        $('#results').append($('<div>' + '<a href=' + item.url + ">" + item.url + '</a></div>'));
        $('#results').append($('<div><em>' + highlighted + '</em></div>'));
    });

    var total = 'S\'han trobat ' + docs.length + (docs.length > 1 ?  ' resultats' : ' resultat');
    $('#results').prepend('<div>' + total + '</div>');
}

function on_search() {
    var query = $('#query').val();
    if (query.length == 0) {
        return;
    }

    var url='http://www.softcatala.org/solr/collection1/select?q='+query+'&hl=true&hl.simple.pre=<b>&hl.simple.post=</b>&hl.fl=*&version=2.2&start=0&rows=100&indent=on&wt=json&callback=?&json.wrf=on_data';
    $.getJSON(url);
}

function on_ready() {
    $('#search').click(on_search);
    /* Hook enter to search */
    $('body').keypress(function(e) {
        if (e.keyCode == '13') {
            on_search();
        }
    });
}

$(document).ready(on_ready);
