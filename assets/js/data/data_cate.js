$(function() {
    var layer = layui.layer;
    var form = layui.form;
    initDataCateList();

    function initDataCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }

    $('#addCata').on('click', function() {
        layer.open({
            type: 1,
            area: ['520px', '250px'],
            title: '数据类型',
            content: $('#addCateList').html()
        });
    })

    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败!')
                }
                layer.msg('新增分类成功!')
                initDataCateList();
                layer.closeAll('page'); //关闭所有页面层

            }
        })
    })


    var indexEdit = null;
    // var id = null;
    $('tbody').on('click', '.btn-edit', function() {
        indexEdit = layer.open({
            type: 1,
            area: ['520px', '250px'],
            title: '修改数据类型',
            content: $('#dialog-edit').html()
        });
        id = Math.abs($(this).attr('data-Id'));
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
                form.val('form-edit', res.data)
            }
        })
    })
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('修改数据类型失败!')
                }
                layer.msg('修改数据类型成功!')
                initDataCateList()
                layer.close(indexEdit)
            }

        })
    })



    $('tbody').on('click', '.btn-del', function() {
        var id = Math.abs($(this).attr('data-Id'))
        layer.confirm('确认删除此项数据?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    console.log(res);
                    if (res.status !== 0) {
                        return layer.msg('删除数据类型失败!')
                    }
                    layer.msg('删除数据类型成功!')
                    layer.close(index);
                    initDataCateList()
                }
            })

        });
    })
})