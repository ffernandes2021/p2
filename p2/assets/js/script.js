const localContent = $("#localContent");

function isEmpty() {
    if ($.trim($("#cidade").val()) === "") {
        localContent.html("<h3>Informe a cidade para que a pesquisa seja realizada!</h3>");
    } else {
        getCidade($("#cidade").val());
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
        console.log("Erro HTTP: " + jqXHR.status);
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
        console.log("Erro HTTP: " + jqXHR.status);
    });
}