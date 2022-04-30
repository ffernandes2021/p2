const localContent = $("#localContent");

function isEmpty() {
    if ($.trim($("#cidade").val()) === "") {
        localContent.html("<h3>Informe a cidade para que a pesquisa seja realizada!</h3>");
    } else {
        getCidade($("#cidade").val().normalize("NFD").replaceAll(/[^\sa-zA-Z\s]+$/g, ""));

        
    }
}

function getCidade(nomeCidade) {
    $.ajax({
        url: "http://servicos.cptec.inpe.br/XML/listaCidades?city=" + nomeCidade,
        method: "get",
        dataType: "xml"
    })
    .done(function (data) {
        getPrevisaoTempoProximosQuatroDias($(data).find("id").text());
    })
    .fail(function (jqXHR) {
        localContent.html("<h3>Erro HTTP: " + jqXHR.status + "</h3>");
    });
}

function getPrevisaoTempoProximosQuatroDias(codigoCidade) {
    $.ajax({
        url: "http://servicos.cptec.inpe.br/XML/cidade/" + codigoCidade + "/previsao.xml",
        method: "get",
        dataType: "xml"
    })
    .done(function (data) {
        console.log(data);
    })
    .fail(function (jqXHR) {
        localContent.html("<h3>Erro HTTP: " + jqXHR.status + "</h3>");
    });
}