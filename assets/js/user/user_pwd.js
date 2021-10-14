$(function() {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        same: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return '不能与旧密码相同!'
            }
        },
        re: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致!'
            }
        }
    })

    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    console.log(res);
                    return layer.msg('更新密码失败!')
                }
                console.log(res);
                layer.msg('修改密码成功!')
                $('#pwdForm')[0].reset()
            }
        })
    })
})