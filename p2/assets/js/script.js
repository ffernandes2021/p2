function getCidade(nomeCidade){  
    $.ajax({
      url: "http://servicos.cptec.inpe.br/XML/listaCidades?city=" + nomeCidade,
      method: "get",
      dataType: "xml"
    })
    .done(function(data){  
      getPrevisaoTempoProximosQuatroDias($(data).find("id").text());
    })
    .fail(function(jqXHR){
      console.log("Erro HTTP: " + jqXHR.status);
    });
  }
        
  function getPrevisaoTempoProximosQuatroDias(codigoCidade){
    $.ajax({
      url: "http://servicos.cptec.inpe.br/XML/cidade/" + codigoCidade + "/previsao.xml",
      method: "get",
      dataType: "xml"
    })
    .done(function(data){
      console.log(data);
    })
    .fail(function(jqXHR){
      console.log("Erro HTTP: " + jqXHR.status);
    });
  }