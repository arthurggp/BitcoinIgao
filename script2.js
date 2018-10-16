  
  
  //fluxo do código
  // get() -> Requests(url,mercado) -> handleResponse(dados,mercado)

window.onload = function() {
    var json_data;
    var calc_data;
    var usd_data;

    __data = '';
    __data2 = '';
    __data3 = '';

    //var path  = 'http://localhost:2424/file_req/requests.txt';
    //var path2 = 'http://localhost:2424/file_req/calculos.txt';
    //var path3 = 'http://localhost:2424/file_req/USD.txt';

    var path  = 'http://localhost:2424/api/cotacoes';
    var path2 = 'http://localhost:2424/api/calculos';
    var path3 = 'http://localhost:2424/api/getusd';


    readTextFile(path);
    readCalcFile(path2);
    readUSDFile(path3);

    json_data = JSON.parse(__data);
    calc_data = JSON.parse(__data2);
    usd_data = JSON.parse(__data3);


    preencheTabela1(json_data);

    preencheTabela2(calc_data,usd_data);

};

//requisição cotaçoes
function readTextFile(url)
{
    $.ajax({

        url : url,
        type : 'GET',
        dataType:'json',
        async: false,
        success : function(data) {              
            __data = data;
        },
        error : function(request,error)
        {
            
        }
        
    });
}

//le arquivo de calculos
function readCalcFile(url)
{
    $.ajax({

        url : url,
        type : 'GET',
        dataType:'json',
        async: false,
        success : function(data) {              
            __data2 = data;
        },
        error : function(request,error)
        {
            
        }
    });
}

function readUSDFile(url)
{
    $.ajax({

        url : url,
        type : 'GET',
        dataType:'json',
        async: false,
        success : function(data) {              
            __data3 = data;
        },
        error : function(request,error)
        {
            
        }
    });
}

function preencheTabela1(array){
    var linhas = '';

    for(var i = 0; i < array.length; i++ ){
        linhas += '<tr>';
        linhas += ' <th scope="col" id="i">' + array[i].mercado + '</th>';
        linhas += ' <th scope="col" id="i">' + toFixed(array[i].exchange) + '</th>';
        linhas += ' <th scope="col" id="i">' + toFixed(array[i].high) + '</th>';
        linhas += ' <th scope="col" id="i">' + toFixed(array[i].low) + '</th>';
        linhas += ' <th scope="col" id="i">' + toFixed(array[i].volume) + '</th>';
        linhas += ' <th scope="col" id="i">' + toFixed(array[i].bid) + '</th>';
        linhas += ' <th scope="col" id="i">' + toFixed(array[i].ask) + '</th>';
        linhas += '</tr>';
    }

    $('#corpo_tabela').html(linhas);

}

function preencheTabela2(array,usd){
    var linhas = '';
    var cor = "red";
    var multiplier = 0.00000001; 

        if(array.resultadoLTC.indexOf(".") == -1){
            array.resultadoLTC = (parseFloat(array.resultadoLTC) * multiplier).toString();
        }

        if(array.resultadoDOG.indexOf(".") == -1){
            array.resultadoDOG = (parseFloat(array.resultadoDOG) * multiplier).toString();
        }

        if(array.resultadoXMR.indexOf(".") == -1){
            array.resultadoXMR = (parseFloat(array.resultadoXMR) * multiplier).toString();
        }

        //LTC
        linhas = '<tr>';
        linhas += ' <th scope="col" id="i">' + array.maiorBidLTC  + '</th>';
        linhas += ' <th scope="col" id="i">' + array.menorAskLTC  + '</th>';
        if(array.resultadoLTC.indexOf("-") == -1){ cor ="green";}else{ cor = "red";}       
        linhas += ' <th scope="col" id="i" style="color:'+cor+'">' + array.resultadoLTC + '</th>';
        linhas += '</tr>';
        linhas += '<tr>';
        linhas += ' <th scope="col" id="i">' + array.mercadoBidLTC  + '</th>';
        linhas += ' <th scope="col" id="i">' + array.mercadoAskLTC  + '</th>';
        linhas += ' <th scope="col" id="i" style="color:'+cor+'"> $ ' + toFixed(Math.round((Number(usd.LTC.valor) * Number(array.resultadoLTC.replace(",","."))) * 100000000) / 100000000) + '</th>';
        linhas += '</tr>'; 
        $('#LTC').html(linhas);

        //DOGE
        linhas = '<tr>';
        linhas += ' <th scope="col" id="i">' + array.maiorBidDOG  + '</th>';
        linhas += ' <th scope="col" id="i">' + array.menorAskDOG  + '</th>';
        if(array.resultadoDOG.indexOf("-") == 0){cor = "red";}else {cor = "green";}
        linhas += ' <th scope="col" id="i" style="color:'+cor+'">' + array.resultadoDOG + '</th>';
        linhas += '</tr>';
        linhas += '<tr>';
        linhas += ' <th scope="col" id="i">' + array.mercadoBidDOG  + '</th>';
        linhas += ' <th scope="col" id="i">' + array.mercadoAskDOG  + '</th>';
        linhas += ' <th scope="col" id="i" style="color:'+cor+'"> $ ' + toFixed(Math.round( (Number(usd.DOGE.valor) * Number(array.resultadoDOG.replace(",","."))) * 100000000) / 100000000) + '</th>';
        linhas += '</tr>';
        $('#DOGE').html(linhas);

        //XMR
        linhas = '<tr>';
        linhas += ' <th scope="col" id="i">' + array.maiorBidXMR + '</th>';
        linhas += ' <th scope="col" id="i">' + array.menorAskXMR + '</th>';
        if(array.resultadoXMR.indexOf("-") == -1){cor = "green";}else {cor = "red";}
        linhas += ' <th scope="col" id="i" style="color:'+cor+'">' + array.resultadoXMR+ '</th>';
        linhas += '</tr>';
        linhas += '<tr>';
        linhas += ' <th scope="col" id="i">' + array.mercadoBidXMR + '</th>';
        linhas += ' <th scope="col" id="i">' + array.mercadoAskXMR + '</th>';
        linhas += ' <th scope="col" id="i" style="color:'+cor+'"> $ ' + toFixed(Math.round((Number(usd.XMR.valor.substring(0,10)) * Number(array.resultadoXMR.replace(",","."))) * 100000000) / 100000000) + '</th>';
        linhas += '</tr>';
        $('#XMR').html(linhas);
   
}

//Concerta notação cientifica
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

  var filterFloat = function (value) {
    if(/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/
      .test(value))
      return Number(value);
  return NaN;
};
