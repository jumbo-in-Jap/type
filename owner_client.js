// WebSocketサーバに接続
var ws = new WebSocket('ws://133.242.190.109:8888/');

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

// メッセージ受信イベントを処理
ws.onmessage = function(event) {
  // 受信したメッセージを復元
  var data = JSON.parse(event.data);

};


// 開始イベント
$("#start").click(function(){
	console.log("start");
    ws.send(JSON.stringify({
      type: 'start',
      text: $("#mondai").val(),
    }));
});
