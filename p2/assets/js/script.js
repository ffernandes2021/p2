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

function getImagem(siglaTempo) {
    let imagem = "";
    switch (siglaTempo) {
        case "c":   // chuva
        case "cm":  // chuva pela manhã
        case "cn":  // chuva à noite
        case "ct":  // chuva à tarde       
            imagem = "c_1_rainy.svg";
            break;
        case "ci":  // chuvas isoladas
        case "cv":  // chuvisco
        case "e":   // encoberto     
        case "ec":  // encoberto com chuvas isoladas
        case "in":  // instável
        case "ncm": // nublado com possibilidade de chuva pela manhã
        case "nct": // nublado com possibilidade de chuva à tarde
        case "npp": // nublado com possibilidade de chuva
        case "pcm": // possibilidade de chuva pela manhã
        case "pct": // possibilidade de chuva à tarde
        case "pp":  // possibilidade de pancadas de chuva
        case "ppm": // possibilidade de pancadas de chuva pela manhã
        case "ppt": // possibilidade de pancadas de chuva à tarde
        case "psc": // possibilidade de chuva
            imagem = "b_3_very_cloudy.svg";
            break;
        case "ch":  // chuvoso
            imagem = "c_2_heavy_rain.svg";
            break;
        case "cl":  // céu claro
            imagem = "a_1_sunny.svg";
            break;
        case "g":   // geada
            imagem = "d_1_snow.svg";
            break;
        case "n":   // nublado
        case "vn":  // variação de nebulosidade
            imagem = "b_2_cloudy.svg";
            break;
        case "ncn": // nublado com possibilidade de chuva à noite
        case "pcn": // possibilidade de chuva à noite
        case "ppn": // possibilidade de pancadas de chuva à noite        
            imagem = "b_4_cloudy_night.svg";
            break;
        case "nd":  // não definido
            imagem = "";
            break;
        case "ne":  // neve
            imagem = "d_2_heavy_snow.svg";
            break;
        case "np":  // nublado e pancadas de chuva
        case "npm": // nublado com pancadas pela manhã
        case "npn": // nublado com pancadas à noite
        case "npt": // nublado com pancadas à tarde
            imagem = "g_1_stormy.svg";
            break;
        case "nv":  // nevoeiro
            imagem = "d_4_fog.svg";
            break;
        case "pc":  // pancadas de chuva
        case "pm":  // pancadas de chuva pela manhã
        case "pnt": // pancadas de chuva à noite
        case "pt":  // pancadas de chuva à tarde
            imagem = "g_2_very_stormy.svg";
            break;
        case "pn":  // parcialmente nublado
            imagem = "b_1_partly_cloudy.svg";
            break;
        case "ps":  // predomínio de sol
            imagem = "a_3_very_sunny.svg";
            break;
        case "t":  // tempestade
            imagem = "c_3_thunderstorm.svg";
            break;
    }
    return imagem;
}