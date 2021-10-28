$(function() {
    var layer = layui.layer
    initCateList()

    function initCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取文章分类失败!')
                }
                var htmlStr = template('tpl-form', res)
                $('[name=cate_id]').html(htmlStr)
                layui.form.render()
            }
        })
    }
    initEditor()
        // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    $('#btnChooseImg').on('click', function() {
        $('#coverFile').click()
        $('#coverFile').on('change', function(e) {
            var file = e.target.files;
            if (file.length = 0) {
                return layui.layer.msg('请选择封面图片!')
            }
            var newImgURL = URL.createObjectURL(file[0])
            $image
                .cropper('destroy') // 销毁旧的裁剪区域
                .attr('src', newImgURL) // 重新设置图片路径
                .cropper(options) // 重新初始化裁剪区域

        })
    })

    var art_state = '已发布';
    $('#btn_save').on('click', function() {
        art_state = '草稿'
    })
    $('#form_pub').on('submit', function(e) {
        e.preventDefault();
        var fd = new FormData($(this)[0]);
        fd.append('state', art_state);
        $image
            .cropper('getCroppedCanvas', {
                width: 400,
                height: 280
            })
            .toBlob(function(blob) {
                fd.append('cover_img', blob)
                publish(fd)
            })

        function publish(fd) {
            $.ajax({
                method: 'POST',
                url: '/my/article/add',
                data: fd,
                contentType: false,
                processData: false,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('发布文章失败!')
                    }
                    layer.msg('发布文章成功')
                    location.href = '../data/data_pub.html'
                }
            })

        }
    })

})