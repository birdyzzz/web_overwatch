$(function() {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '请输入1~6个字符的昵称'
            }
        }
    })
    initUSerInfo()

    function initUSerInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('Error!')
                }
                form.val('formUserInfo', res.data)
            }
        })
    }

    $('#reset').on('click', function(e) {
        e.preventDefault();
        initUSerInfo();
    })
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('更新资料失败!')
                }
                layer.msg('更新资料成功!')
                window.parent.getUSerInfo()
                console.log(window.parent)
            }
        })
    })

})