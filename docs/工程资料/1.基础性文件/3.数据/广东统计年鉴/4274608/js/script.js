$(document).ready(function() {
    if ($('#wrapper').attr('data-type') == 'list') {
        var list_url = document.location.href;
        var list_number = list_url.match(/.+\/(\d+)/);
        list_number ? list_number = list_number[1] : null;

        if (list_number == '22' || list_number == '23') {
            $('#header .menu ul li').eq(0).find('a').attr('href', list_number + '/brief-description.html')
            $('#header .menu ul li').eq(1).find('a').removeAttr('target').click(function() {
                alert('这部分没有指标解释！');
            });
        } else {
            $('#header .menu ul li').eq(0).find('a').attr('href', list_number + '/brief-description.html')
            $('#header .menu ul li').eq(1).find('a').attr('href', list_number + '/indicators.html')
        }

        document.title = $('#list .left h2').text() + ' - ' + document.title;

        if (list_number >= 10 && list_number < 24) {
            $('#list .right ol li a').css('paddingLeft', '68px');
        } else if (list_number == 24) {
            $('#list .right ol li a').css('paddingLeft', '82px');
        }
    }
    /*list*/

    if ($('#wrapper').attr('data-type') == 'table') {
        var url = document.location.href;
        var table_number = url.match(/.+\/(.+)\./);
        table_number ? table_number = table_number[1] : null;

        var table_directory = table_number.split('-');
        table_directory ? table_directory = table_directory[0] : null;

        $('.btn-go-back').attr('href', '../../' + table_directory + '.html');
        $('#header .menu ul li').eq(3).find('a').attr('href', '../../' + table_directory + '.html');

        $('#header .menu ul li').eq(0).find('a').attr('href', '../excel/' + table_number + '.xls');

        if (table_directory == '22' || table_directory == '23') {
            $('#header .menu ul li').eq(1).find('a').attr('href', '../brief-description.html');
            $('#header .menu ul li').eq(2).find('a').removeAttr('target').click(function() {
                alert('这部分没有指标解释！');
            });
        } else {
            $('#header .menu ul li').eq(1).find('a').attr('href', '../brief-description.html');
            $('#header .menu ul li').eq(2).find('a').attr('href', '../indicators.html');
        }

        document.title = $('table').find('td').eq(0).text() + ' - ' + document.title;
    }
    /*table*/

    $('.btn-close').click(function() {
        window.opener = null;
        window.close();
    });

    $('[class*="back-top"]').click(function() {
        $('html, body').animate({ 'scrollTop': 0 }, 300);
    });

    $(window).scroll(function() {
        if ($(document).scrollTop() > 100) {
            $('.btn-back-top').css('display', 'block');
        } else {
            $('.btn-back-top').css('display', 'none');
        }
    })
    /*toolkit*/
});