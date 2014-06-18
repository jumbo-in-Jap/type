// WebSocketサーバに接続
var ws = new WebSocket('ws://133.242.190.109:8888/');
var ansStr = "xxxxxxxxxxxx";

// エラー処理
ws.onerror = function(e){
	console.log(e);
  $('#chat-area').empty()
    .addClass('alert alert-error')
    .append('<button type="button" class="close" data-dismiss="alert">×</button>',
      $('<i/>').addClass('icon-warning-sign'),
      'サーバに接続できませんでした。'
    );
}


ws.onmessage = function(event) {
  var data = JSON.parse(event.data);
  var type = data.type;
  	console.log(data);

  if(type === 'login')
  {
  	// ログイン
	var source   = $("#user-ans-template").html();
	var template = Handlebars.compile(source);
	$("#users").append(template(data)).fadeIn(300);

  }else if(type === 'change')
  {
  	$("#"+data.user+"_text").text(data.text);

  	// 正解判定
  	if(validateMessage(data.text))
  	{
      // $("#"+data.user+"_area").css("background-color", "#ff0000");
      $("#"+data.user+"_area .win").css("display", "block");
  	}

  }else if(type === 'start')
  {
  	ansStr = data.text;
  	$("#ans").text(ansStr);
  }

}

function validateMessage(str)
{
	if(str === ansStr)return true;
	else return false;
}
