  
  function Requests(url,market){
    var retorno;
    $.ajax({
        url: url,
        type: "GET",
        crossDomain: true,
        dataType:'json',
        beforeSend: function (XMLHttpRequest) {                     
            XMLHttpRequest.setRequestHeader("Accept", "application/json; odata=verbose");
        },
        success: function(resultData) {
            HandleResponse(resultData,market);
        },
        error : function(jqXHR, textStatus, errorThrown) {
            return textStatus;
        }
    });
  }


function HandleResponse(data,market){
    var exchanges = ["BTC-DOGE","BTC-LTC","BTC-XMR"]; 
    var tableLine = '';
    var idLinha = 0;

    if(market == 'tradeogre'){
        var i  = 0;
    
        tableLine += '<tr><th> TRADE OGRE </th><th></th><th></th><th></th><th></th></tr></tr>';

        for(var cnt in exchanges){
    
            tableLine += '<tr>';

            for( i in data){
    
                if(data[i][exchanges[cnt]] != undefined){
                    
                    tableLine += ' <th scope="col" id="'+exchanges[cnt]+'">' + exchanges[cnt] + '</th>';
                   // tableLine += ' <th scope="col">' + data[i][exchanges[cnt]].initialprice + '</th>';
                    //tableLine += ' <th scope="col">' + data[i][exchanges[cnt]].price + '</th>';
                    tableLine += ' <th scope="col"id="'+exchanges[cnt]+'">' + data[i][exchanges[cnt]].high + '</th>';
                    tableLine += ' <th scope="col"id="'+exchanges[cnt]+'">' + data[i][exchanges[cnt]].low + '</th>';
                    tableLine += ' <th scope="col"id="'+exchanges[cnt]+'">' + data[i][exchanges[cnt]].volume + '</th>';
                    tableLine += ' <th scope="col"id="'+exchanges[cnt]+'">' + data[i][exchanges[cnt]].bid + '</th>';
                    tableLine += ' <th scope="col"id="'+exchanges[cnt]+'">' + data[i][exchanges[cnt]].ask + '</th>';
                    tableLine += '</tr>';
                        
                    if(data.error != undefined){
                            alert(data.error);
                        }else{
                            $('#corpo_tabela').html(tableLine);
                    }
                        i = 0;
                }
            }
        }
    }else if(market=='crex24'){
        exchanges = ["DOGE-BTC","LTC-BTC","XMR-BTC"];

        tableLine += '<tr><th> CREX24 </th><th></th><th></th><th></th><th></th><th></th></tr>';

        for(var j in exchanges){
            tableLine += ' <th scope="col">' + exchanges[j] + '</th>';
           // tableLine += ' <th scope="col"> - </th>';
           // tableLine += ' <th scope="col"> - </th>';
            tableLine += ' <th scope="col" id="'+exchanges[j]+'">' + toFixed(data[j].high) + '</th>';
            tableLine += ' <th scope="col" id="'+exchanges[j]+'">' + toFixed(data[j].low) + '</th>';
            tableLine += ' <th scope="col" id="'+exchanges[j]+'">' + toFixed(data[j].volumeInBtc) + '</th>';
            tableLine += ' <th scope="col" id="'+exchanges[j]+'">' + toFixed(data[j].bid) + '</th>';
            tableLine += ' <th scope="col" id="'+exchanges[j]+'">' + toFixed(data[j].ask) + '</th>';
            tableLine += '</tr>';
        }

        $('#corpo_tabela').append(tableLine);
    }
}

function get(){
    var data;
    var url = 'https://tradeogre.com/api/v1/markets';
    //REQUISIÇÃO TRADEOGRE
    Requests(url,'tradeogre'); 

    //REQUISIÇÃO CREX24
    url = 'https://api.crex24.com/v2/public/tickers?instrument=DOGE-BTC,LTC-BTC,XMR-BTC';
    Requests(url,'crex24'); 

    getCurrentData();
}

function toFixed(x) {
    if (Math.abs(x) < 1.0) {
      var e = parseInt(x.toString().split('e-')[1]);
      if (e) {
          x *= Math.pow(10,e-1);
          x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
      }
    } else {
      var e = parseInt(x.toString().split('+')[1]);
      if (e > 20) {
          e -= 20;
          x /= Math.pow(10,e);
          x += (new Array(e+1)).join('0');
      }
    }

    var y = x.toString();

    y = y.substring(0,11);

    return y.valueOf();
  }
       
  function getCurrentData(){
    console.log($('#corpo_tabela'));
  }

    /*/TRADESATOSHI  (https://tradesatoshi.com/api/public/getmarketsummary?market=DOGE_BTC)
    exchanges = [];
            exchanges = ["DOGE_BTC","LTC_BTC","XMR_BTC"]; 

           // for(var i in exchanges){
                let exchange = exchanges[0];
                var url = 'https://tradesatoshi.com/api/public/getmarketsummary?market=' + exchange;

                $.ajax({
                    //type: 'GET',
                    dataType: 'jsonp',
                    crossDomain: true,
                    url: url,
                    success: function(data){
                   
                        if(data != undefined) {
                            tableLine += '<tr>';
                            
                            tableLine += ' <th scope="col">' + exchanges[0] + '</th>';
                            tableLine += ' <th scope="col"> - </th>';
                            tableLine += ' <th scope="col"> - </th>';
                            tableLine += ' <th scope="col">' + data.high + '</th>';
                            tableLine += ' <th scope="col">' + data.low + '</th>';
                            tableLine += ' <th scope="col">' + data.volume + '</th>';
                            tableLine += ' <th scope="col">' + data.bid + '</th>';
                            tableLine += ' <th scope="col">' + data.ask + '</th>';
                            tableLine += '</tr>';
                                
                            if(data.error != undefined){
                                    alert(data.error);
                                }else{
                                    $('#corpo_tabela').html(tableLine);
                            }
                            
                            i = 0;
                        }
                    }//, error: function(error){ console.log(error);}
                });*/