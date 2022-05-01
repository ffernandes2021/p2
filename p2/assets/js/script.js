const localContent = $("#localContent");

function isEmpty() {
    if ($.trim($("#cidade").val()) === "") {
        localContent.html("<h3>Informe a cidade para que a pesquisa seja realizada!</h3>");
    } else {
        getCidade($("#cidade").val().normalize("NFD").replace(/[^a-zA-Z\s]/g, ""));
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
        let content = "";
        for (let i = 0; i < 4; i++) {
            content = content.concat("<div class=\"box col-md-3 col-sm-4 col-12\"><div class=\"row\"><div class=\"box col-md-6 col-6\">" + $(data).find("tempo").eq(i).text() + "</div><div class=\"box col-md-6 col-6\"><p>" + $(data).find("nome").text() + ", " + $(data).find("uf").text() + "</p><p>" + getDataFormatada($(data).find("dia").eq(i).text()) + "</p><p>" + $(data).find("maxima").eq(i).text() + "º C | " + $(data).find("minima").eq(i).text() + "º C | " + $(data).find("iuv").eq(i).text() + "</p></div></div></div>");
        }
        localContent.html(content);
    })
    .fail(function (jqXHR) {
        localContent.html("<h3>Erro HTTP: " + jqXHR.status + "</h3>");
    });
}

function getDataFormatada(dataPrevisao) {
    const option = {
        weekday: "short",
        day: "numeric",
        month: "numeric"
    };
    return new Date(dataPrevisao).toLocaleDateString("pt-BR", option).replace(".", "");
}