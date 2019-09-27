var clientId = '869215196237-v05klnhomptp0dqe02gbv0rcc5eejc3k.apps.googleusercontent.com';
var apiKey = 'AIzaSyDxFCZD_khIcgWglksSDqNxK4fGbmtAHXc';
var events;

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
        insertEvent();
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

function insertEvent(){
    console.log("success click");
    // gapi.client.load('calendar', 'v3', function(){
        var resource = {
            'summary': 'がんの検査', // 予定のタイトル
            'start': { // 開始日・時刻
            'dateTime': '2019-08-09T10:00:00.000+09:00'
            },
            'end': { // 終了日・時刻
            'dateTime': '2019-08-10T10:00:00.000+09:00'
            },
            'attendees': [
                {'email': 'fappassport@gmail.com'}
            ],
            'location': 'Somewhere', // 場所
            'description': 'contents of this event' // 説明   
        };
        var request = gapi.client.calendar.events.insert({
          'calendarId': 'primary',// デフォルトカレンダー：'primary'
          'resource': resource
        });

        request.execute(function(){
            console.log("success insertEvent");
        });
    // });
}

// var event = CalendarApp.getDefaultCalendar().createAllDayEvent('Woodstock Festival',
//     new Date('August 15, 1969'),
//     new Date('August 18, 1969'));
// Logger.log('Event ID: ' + event.getId());
// function handleClientLoad() {
//     gapi.client.setApiKey(apiKey);
//     window.setTimeout(checkAuth,1);
//     checkAuth();
// }

// function checkAuth() {
//     gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true},
//     handleAuthResult);
// }

// function handleAuthResult(authResult) {
//     var authorizeButton = document.getElementById('authorize-button');
//     if (authResult) {
//         authorizeButton.style.visibility = 'hidden';
//         makeApiCall();
//     } else {
//         authorizeButton.style.visibility = '';
//         authorizeButton.onclick = handleAuthClick;
//     }
// }

// function handleAuthClick(event) {
//     gapi.auth.authorize(
//     {client_id: clientId, scope: scopes, immediate: false},
//     handleAuthResult);
//     return false;
// }

function makeApiCall() {
    gapi.client.load('calendar', 'v3', function() {
        var request = gapi.client.calendar.events.list({
        'calendarId': 'primary'
        });
            
        request.execute(function(resp) {
            console.dir(resp);
        for (var i = 0; i < resp.items.length; i++) {
            var li = document.createElement('li');
            li.appendChild(document.createTextNode(resp.items[i].start.dateTime + " : " + resp.items[i].summary));
            document.getElementById('events').appendChild(li);
        }
        });
    });
}

function getEvent(){
    
}

function makeCallendar(){
    gapi.client.load('calendar', 'v3', function() {
        var request = gapi.client.calendar.events.list({
        'calendarId': 'primary'
        });
            
        request.execute(function(resp) {
            console.dir(resp);
            for (var i = 0; i < resp.items.length; i++) {
                events = {
                    title: resp.items[i].summary,
                    start: resp.items[i].start.dateTime
                }
                console.log("getEvent")
                $('#calendar').fullCalendar.addEvent(
                    events
                )
            }
        });
    });
}

function insertEvent2(){
    var date = $("#txtDate").val();
    var detail = $("#description").val();
 
    $('#calendar').fullCalendar.addEvent({events: [
        {
            title: detail,
            start: date
        }
    ]});
}