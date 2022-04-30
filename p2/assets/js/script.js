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
        // Cria um atributo
        let content = "";
        // Faz com que o código interno às chaves ({}) seja repetido 4 vezes
        for (let i = 0; i < 4; i++) {
            // Adiciona à content o conteúdo do bloco anterior, totalizando assim os 4 blocos de maneira sequenciada.
            content = content.concat("<div class=\"col-md-3 col-sm-4 col-12\"><div class=\"row\"><div class=\"col-md-6 col-6\">" + $(data).find("tempo").text() + "</div><div class=\"col-md-6 col-6\"><p>" + $(data).find("nome").text() + ", " + $(data).find("uf").text() + "</p><p>" + $(data).find("dia").text() + "</p><p>" + $(data).find("maxima").text() + "º C | " + $(data).find("minima").text() + "º C | " + $(data).find("iuv").text() + "</p></div></div></div>");
        }
        // Imprime na localContent o content
        localContent.html(content);
    })
    .fail(function (jqXHR) {
        localContent.html("<h3>Erro HTTP: " + jqXHR.status + "</h3>");
    });
}