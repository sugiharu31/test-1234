let latitude
let longitude
var GSI = {};
function init() {
    
    let task_data = document.getElementById("tasks").value;
    let task = JSON.parse(task_data);
    var map = L.map('map');
    map.setView([36.00, 137], 10);
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    L.tileLayer('https://c.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
    }).addTo(map);
    let pingcontents = ""
    let color='';
    for (i = 0; i <= task.length - 1; i++) {
        if(task[i].class=="力仕事"){
            color='red';
        }else if(task[i].class=="軽作業"){
            color='green';
        }
        else if(task[i].class=="物探し"){
            color='yellow';
        }
        else if(task[i].class=="道案内"){
            color='violet';
        }
        else if(task[i].class=="その他"){
            color='purple';
        }
        if (!Boolean(task[i].canceled) && !Boolean(task[i].completed) && (task[i].number_of_people>task[i].number_of_applicants)) {
            pingcontents = "分類:" + task[i].class + "<br>内容:" + task[i].content + "<br>位置の詳細:" + task[i].location_details + "<br>投稿者の見た目:" + task[i].appearance + "<br>募集日時:"+task[i].needts+"<br>募集人数:"+task[i].number_of_people+"人<br>所要時間:"+task[i].time_required+"分<br><input type = \"button\" value = \"助けに行く\" onClick = \"help_button_pressed(" + task[i].id + ")\">"
            L.marker([task[i].lat, task[i].lng],{icon: L.spriteIcon(color)}).addTo(map).bindPopup(pingcontents);
        }
    }

    async function successCallback(position) {
        // 緯度を取得し画面に表示
        latitude = position.coords.latitude;
        // 経度を取得し画面に表示
        longitude = position.coords.longitude;
        map.setView([latitude, longitude], 10);
        let url = new URL('https://mreversegeocoder.gsi.go.jp/reverse-geocoder/LonLatToAddress');
        url.searchParams.set('lat', latitude);
        url.searchParams.set('lon', longitude);
        const res=await fetch(url);
        const json = await res.json();
        const data = json.results;
        const muniData = GSI.MUNI_ARRAY[json.results.muniCd];
        const [prefCode, pref, muniCode, city] = muniData.split(',');
        let tweettext=`${pref} ${city} ${data.lv01Nm}`+"でボランティア活動中！";
        document.getElementById("address").value=tweettext;
    };
    // 取得に失敗した場合の処理
    function errorCallback(error) {
        alert("位置情報が取得できませんでした");
    };
}

function help_button_pressed(id) {
    document.getElementById("taskid").value = id;
    document.helpform.submit();
}

function tweet(){
    window.open('https://twitter.com/share?text=' + document.getElementById("address").value + '&url=' + 'https://enthousiaste-fromage-22608.herokuapp.com'  + '&hashtags=' + 'helpジャスフォ');
}
