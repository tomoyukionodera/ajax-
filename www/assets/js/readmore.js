$(function(){
    var setArea = $('.main__articleList'), // 追加要素の親ブロック
    loadNum = 3, // 読み込む個数
    loadTxt = '読み込み中', // Loading中の表示テキスト
    btnTxt = 'もっと見る', // ボタンテキスト
    fadeSpeed = 500; // フェードスピード
    defaultNum = 3; // デフォルト記事数
 
    setArea.after('<div class="main__moreShowBtn">' + btnTxt + '</div>');
    var setMore = setArea.next('.main__moreShowBtn');


    $.ajax({
        url: '/assets/json/readmore.json'
    })
    .then(function(data){
        for (var i=0; i<defaultNum; i++) {
            $('<li class="main__articleItem"><span>' + data.columns01[i].ttl + '</span>' + data.columns01[i].date + '<br>' + data.columns01[i].txt +'</li>').appendTo(setArea);
        }
    })
 
    setMore.click(function(){

        $.ajax({
            url: '/assets/json/readmore.json'
        })
        .then(function (data) {// 1つめは通信成功時のコールバック
            var dataLengh = data.columns01.length;
            var loadItemLength = setArea.find('.main__articleItem').length;
            var setAdj = (dataLengh)-(loadItemLength); //残りの記事
            var setBeg = (dataLengh)-(setAdj); //表示されている記事

            if(!(dataLengh == loadItemLength)){ //記事がすべて読み込まれていないとき

                setArea.append('<div id="nowLoading">' + loadTxt + '</div>');

                if(loadItemLength == 0){ //読み込まれた記事が0のとき

                    if(dataLengh <= loadNum){ //総記事が3未満のときはすべての記事を読み込み「もっと見るボタン」を削除
                        for (var i=0; i<dataLengh; i++) {
                            $('<li class="main__articleItem"><span>' + data.columns01[i].ttl + '</span>' + data.columns01[i].date + '<br>' + data.columns01[i].txt +'</li>').appendTo(setArea).css({opacity:'0'}).animate({opacity:'1'},fadeSpeed);
                        }
                        setMore.remove();
                    } else {
                        for (var i=0; i<loadNum; i++) { //総記事が3以上のときは3記事分を読み込むs
                            $('<li class="main__articleItem"><span>' + data.columns01[i].ttl + '</span>' + data.columns01[i].date + '<br>' + data.columns01[i].txt +'</li>').appendTo(setArea).css({opacity:'0'}).animate({opacity:'1'},fadeSpeed);
                        }
                    }
                } else if(loadItemLength > 0 && loadItemLength < dataLengh){ //読み込まれた記事が0以上総記事未満のとき
                    if(loadNum < setAdj){ //残りの記事が３より多い場合
                        for (var i=0; i<loadNum; i++) {
                            v = i+setBeg;
                            $('<li class="main__articleItem"><span>' + data.columns01[v].ttl + '</span>' + data.columns01[v].date + '<br>' + data.columns01[v].txt +'</li>').appendTo(setArea).css({opacity:'0'}).animate({opacity:'1'},fadeSpeed);
                        }
                    } else if(loadNum >= setAdj){
                        for (var i=0; i<setAdj; i++) {
                            v = i+setBeg;
                            $('<li class="main__articleItem"><span>' + data.columns01[v].ttl + '</span>' + data.columns01[v].date + '<br>' + data.columns01[v].txt +'</li>').appendTo(setArea).css({opacity:'0'}).animate({opacity:'1'},fadeSpeed);
                        }
                        setMore.remove();
                    }
                } else if(loadItemLength == dataLengh){ //記事がすべて読み込まれているとき
                    return false;
                }
            } else {
                return false;
            }
        },
        function () {// 2つめは通信失敗時のコールバック
            alert("読み込み失敗");
        })
        .then(function() {
            $('#nowLoading').each(function(){
                $(this).remove();
            });
        })
    });
});