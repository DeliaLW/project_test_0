$(function(){
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    resetui()
  })

// 将用户输入的内容渲染到聊天窗口
// 绑定发送按钮事件
$('.input_sub').on('click', function() {
    // 获取输入内容
    let txt = $('.input_txt').val().trim()
    if (txt.length <= 0) {
        return $('.input_txt').val('')
    }
    let li = '<li class="right_word"><img src="img/person02.png" /> <span>' + txt + '</span></li>'
    $('.talk_list').append(li)
    resetui()
    getMsg(txt)
})
// synthesize
// 请求获取聊天机器人的消息
function getMsg(txt) {
    $.ajax({
        method: 'GET',
        url: 'http://www.liulongbin.top:3006/api/robot',
        data: {spoken:txt},
        success: function(res) {
            console.log(res)
            if (res.message === 'success') {
                let msg = res.data.info.text
                let li = '<li class="left_word"><img src="img/person01.png" /> <span>' + msg + '</span></li>'
                $('.talk_list').append(li)
                resetui()
                getVideo(msg)
            }
        }
    })
}
// 获取语音消息
function getVideo(txt) {
    $.ajax({
        method: 'GET',
        url: 'http://www.liulongbin.top:3006/api/synthesize',
        data: {
            text: txt
        },
        success: function(res) {
            console.log(res)
            if (res.status === 200) {
                $('#video').attr('src', res.voiceUrl)
            }
        }
    })
}
// 回车键发送消息
$('.input_txt').on('keyup', function(e) {
    if (e.keyCode === 13) {
        $('.input_sub').click()
    }
})
       