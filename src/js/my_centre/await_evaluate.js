$(function () {
  var orderPayPicture1 = "";//收货并好评图片1
  var orderPayPicture2 = "";//收货并好评图片2
  var orderPayPicture3 = "";//收货并好评图片3
  var assignObj = JSON.parse(storage.get('assignObj'));
  assignObj = assignObj.split(",");
  if(assignObj[0] == 2){
      $(".seek").show();
      $(".character").show();
      $("#target").text(assignObj[1]);
      $(".character>h5").eq(1).hide();
  }
  if(assignObj[0] == 3){
      $(".seek").show();
      $(".character").show();
      $("#target").text(assignObj[1]);
      var assign_imgs = assignObj.slice(2);
      console.log(assign_imgs)
      var assighHtml = "";
      assign_imgs.forEach(function(value,index){
          assighHtml += `<li>
              <a class="example-image-link" href="http://image.yunxiaowangluo.com/${value}" data-lightbox="example-1">
                  <img class="example-image" src="http://image.yunxiaowangluo.com/${value}" alt="image-1">
              </a>
          </li>`
      });
      $(".assign_img ul").append(assighHtml)
  }
  $(".seek").click(function () {
        if ($(".seek i").hasClass("pull_down")) {
            $(".seek i").addClass("pull_up").removeClass("pull_down");
            $(".character").slideUp();
            return;
        }
        if ($(".seek i").hasClass("pull_up")) {
            $(".seek i").addClass("pull_down").removeClass("pull_up");
            $(".character").slideDown();
            return;
        }
    })
    $(".require").click(function () {
        if ($(".require i").hasClass("pull_down")) {
            $(".require i").addClass("pull_up").removeClass("pull_down");
            $(".uploadImg").slideUp();
            return;
        }
        if ($(".require i").hasClass("pull_up")) {
            $(".require i").addClass("pull_down").removeClass("pull_up");
            $(".uploadImg").slideDown();
            return;
        }
    })
    // upload();
    copys();
    $("#ctlBtn").click(function(){
      // var clientOrderId = getUrlParms("id");//任务ID
      var clientOrderId = JSON.parse(storage.get('clientId'));
      console.log(clientOrderId);
      if(clientOrderId == ""){
        layer.msg("请输入订单编号~");
        return false;
      }
      if (!orderPayPicture1&&!orderPayPicture2&&!orderPayPicture3) {
        layer.msg("请至少上传一张图片~");
        return false
      }
      var parme = {
          "clientOrderId":clientOrderId,
          orderPayPicture1,
          orderPayPicture2,
          orderPayPicture3
      }
        evaluate(parme);
    })

function copys() {
    var clipboard = new Clipboard('#copy_btn');
    clipboard.on('success', function (e) {
        layer.msg("复制成功");
        e.clearSelection();
    });
}
// 上传截图(货币三家图片)
$("#lg_upload_evaluate").click(function(){
  $("#lg_upload_evaluate_input_file").click()
})
$('#lg_upload_evaluate_input_file').on('change',()=>{
  //    获取图片上传key 和token
  getUploadKeyAndToken('', (data)=>{
    let token = data.token;
    let key = data.rid;
    orderPayPicture1 = key
    let file = $('#lg_upload_evaluate_input_file')[0].files[0]
    lrz(file).then((data)=>{
      uploadImg(data.file,token,key)
      $('#lg_upload_evaluate>img').attr('src',data.base64)
    })
  })
})
$("#lg_upload_evaluate2").click(function(){
  $("#lg_upload_evaluate_input_file2").click()
})
$('#lg_upload_evaluate_input_file2').on('change',()=>{
  //    获取图片上传key 和token
  getUploadKeyAndToken('', (data)=>{
    let token = data.token;
    let key = data.rid;
    orderPayPicture2 = key
    let file = $('#lg_upload_evaluate_input_file2')[0].files[0]
    lrz(file).then((data)=>{
      uploadImg(data.file,token,key)
      $('#lg_upload_evaluate2>img').attr('src',data.base64)
    })
  })
})
  $("#lg_upload_evaluate3").click(function(){
    $("#lg_upload_evaluate_input_file3").click()
  })
  $('#lg_upload_evaluate_input_file3').on('change',()=>{
    //    获取图片上传key 和token
    getUploadKeyAndToken('', (data)=>{
      let token = data.token;
      let key = data.rid;
      orderPayPicture3 = key
      let file = $('#lg_upload_evaluate_input_file3')[0].files[0]
      lrz(file).then((data)=>{
        uploadImg(data.file,token,key)
        $('#lg_upload_evaluate3>img').attr('src',data.base64)
      })
    })
  })
// 评论提交
function evaluate(parme){
    ajax_post("/operation/clientOrder/rate",parme,function(res){
        if(res.code == 200){
            layer.msg(res.msg);
            setTimeout(()=>{
              window.location.href="/my_centre/schedule.html?clientId="+parme.clientOrderId;
            },2000)
        }else{
            layer.msg(res.msg);            
        }
    })
}
})
