$(function() {
    getUSerInfo()
    $('.quit').on('click', function(e) {
        e.preventDefault();
        var layer = layui.layer;
        layer.confirm('确定退出账号吗?', { icon: 3, title: '提示' }, function(index) {
            localStorage.removeItem('token')
            location.href = './login.html'

            layer.close(index);
        });
    })
})

function getUSerInfo() {
    $.ajax({
        url: '/my/userinfo',
        method: 'GET',
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function(res) {
            renderAvatar(res.data)
        }
    })
}

function renderAvatar(user) {
    var name = user.nickname || user.username;
    var nowHour = new Date();
    var h = nowHour.getHours();
    console.log(h);
    var str = "";
    if (h < 12) {
        str = '上午好!'
    } else if (h < 18) {
        str = '下午好!'
    } else {
        str = '晚上好!'
    }
    $('#welcome').html(str + '&nbsp;&nbsp;' + name);
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text_avatar').hide()
    } else {
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase()
        $('.text_avatar').html(first).show()
    }
}