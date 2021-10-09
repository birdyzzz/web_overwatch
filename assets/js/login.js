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

})