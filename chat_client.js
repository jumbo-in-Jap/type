// WebSocketサーバに接続
var ws = new WebSocket('ws://133.242.190.109:8888/');
var ansStr = "";

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

// ユーザ名をランダムに生成
var userName = 'ゲスト' + Math.floor(Math.random() * 100);
// チャットボックスの前にユーザ名を表示
$('#user-name').append(userName);

// WebSocketサーバ接続イベント
ws.onopen = function() {
  $('#textbox').focus();
  // 入室情報を文字列に変換して送信
  ws.send(JSON.stringify({
    type: 'login',
    user: userName
  }));
};

// メッセージ受信イベントを処理
ws.onmessage = function(event) {
  // 受信したメッセージを復元
  var data = JSON.parse(event.data);
  var item = $('<li/>').append(
    $('<div/>').append(
      $('<i/>').addClass('icon-user'),
      $('<small/>').addClass('meta chat-time').append(data.time))
  );

  // pushされたメッセージを解釈し、要素を生成する
  if (data.type === 'join') {
    /*
    item.addClass('alert alert-info')
    .prepend('<button type="button" class="close" data-dismiss="alert">×</button>')
    .children('div').children('i').after(data.user + 'が入室しました');
    */
	var source   = $("#user-template").html();
	var template = Handlebars.compile(source);
	$("#user_list").prepend(template(data)).fadeIn(300);	            

  } else if (data.type === 'chat') {
    // item.addClass('well well-small')
    // .append($('<div/>').text(data.text))
    // .children('div').children('i').after(data.user);
    
    
  } else if (data.type === 'defect') {
  	/*
    item.addClass('alert')
    .prepend('<button type="button" class="close" data-dismiss="alert">×</button>')
    .children('div').children('i').after(data.user + 'が退室しました');
    */
   $("#"+data.user).remove();
  }else if(data.type === 'start'){ // ゲーム開始
  	$("#ansTxt").text(data.text);
  } else if(data.type === 'ans'){
  	console.log(data);
  	if(data.res)
  	{
		var source   = $("#correct-ans-template").html();
		var template = Handlebars.compile(source);
		$("#chat-history").prepend(template(data)).fadeIn(300);
		console.log("せいかい");
  	}else{
		var source   = $("#false-ans-template").html();
		var template = Handlebars.compile(source);
		$("#chat-history").prepend(template(data)).fadeIn(300);  		
  	}
  	
  }else {
    item.addClass('alert alert-error')
    .children('div').children('i').removeClass('icon-user').addClass('icon-warning-sign')
      .after('不正なメッセージを受信しました');
  }
  //$('#chat-history').prepend(item).hide().fadeIn(500);
};


// 発言イベント
textbox.onkeyup = function(event) {
  // エンターキーを押したとき
    ws.send(JSON.stringify({
      type: 'change',
      user: userName,
      text: textbox.value,
    }));
};

// ブラウザ終了イベント
window.onbeforeunload = function () {
  ws.send(JSON.stringify({
    type: 'defect',
    user: userName,
  }));
};


function ansCorrect()
{
	
}

function ansFalse()
{
		
}
