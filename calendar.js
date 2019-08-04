var clientId = '869215196237-728t4i6rfuptb5eaa53g3ddhgjsfkbgp.apps.googleusercontent.com';
var apiKey = 'AIzaSyDxFCZD_khIcgWglksSDqNxK4fGbmtAHXc';

// とりあえず、怖いので、カレンダーを読むだけの設定
// https://www.googleapis.com/auth/plus.meは不要かも。。

var scopes = ['https://www.googleapis.com/auth/calendar.readonly'];

function handleClientLoad() {
    // 予めAPI Consoleで設定したAPIキーを設定
    gapi.client.setApiKey(apiKey);
    console.log("successAA");

    // すでに認証済みかの確認をする。
    window.setTimeout(checkAuth,1);
}

function checkAuth() {
    // immediateをtrueで指定することで、未認証の場合、ただちにエラーが返り、
    // handleAuthResultが呼び出される。
    console.log("successBB");
    gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
}

function handleAuthResult(authResult) {
    console.log("success1");
    var authorizeButton = document.getElementById('authorize-button');
    console.log("success2");
    if (authResult && !authResult.error) {
        console.log("success3a");
        authorizeButton.style.visibility = 'hidden';
        makeApiCall();
    } else {
        console.log("success3b");
        authorizeButton.style.visibility = '';
        authorizeButton.onclick = handleAuthClick;
    }
}

function handleAuthClick(event) {
    // ここで、ポップアップ画面を表示して、OAuth認証を行う。
    gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
    return false;
}

function makeApiCall() {
    var restRequest = gapi.client.request({
        'path': '/calendar/v3/users/me/calendarList'
    });
    restRequest.execute(function(calendarList) {
      console.dir(calendarList);
    });
}