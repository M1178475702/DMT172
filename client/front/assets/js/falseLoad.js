$(function () {
    $(function () {
        setInterval(function () {
            var time=$('#false-span').text()-1;
            $('#false-span').text(time);
        },1000)
        setTimeout(function () {
            location.replace('/front/index');
        },5000)
    })
})