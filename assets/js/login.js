$(function() {
    // 点击去注册
    $('#link_reg').on('click', function() {
            $('.login').hide()
            $('.loginAndReg').height('310px')
            $('.reg').show()

        })
        // 点击去登录
    $('#link_login').on('click', function() {
        $('.login').show()
        $('.loginAndReg').height('260px')
        $('.reg').hide()

    })

    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function(value) {
            var pwd = $('.reg [name=password]').val();
            if (value !== pwd) {
                return '两次密码不一致!'
            }
        }
    })

    $('#reg_form').on('submit', function(e) {
        e.preventDefault()
        var data = { username: $('#reg_form [name=username]').val(), password: $('#reg_form [name=password]').val() }
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功,请登录!');
            setTimeout(function() {
                $('#link_login').click()
            }, 2000)
        })
    })


    $('#log_form').on('submit', function(e) {
        e.preventDefault();
        var data = { username: $('#log_form [name=username]').val(), password: $('#log_form [name=password]').val() }
        $.post('/api/login', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('登录成功,即将跳转到首页!');
            localStorage.setItem('token', res.token);
            setTimeout(function() {
                location.href = './index.html'
            }, 2000)
        })


    })



})