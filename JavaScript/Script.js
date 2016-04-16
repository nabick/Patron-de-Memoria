function GenerarIdAleatorio(validar)
{
    id = Math.floor(Math.random() * 3) +"-"+ Math.floor(Math.random() * 3);
    if(id != validar)
    {
        return id;
    }
    else
    {
        return GenerarIdAleatorio(id)
    }
}

function Comenzar()
{
    //Crear los id aleatorios para presentar cuadros en desorden
    var CuadrosPresentados = [];
    var a = b = 0;
    for (var i = 0; i < 3; i++)
    {
        if (i == 0)
        {
            CuadrosPresentados[i] = GenerarIdAleatorio("");
        }else
        {
            CuadrosPresentados[i] = GenerarIdAleatorio( CuadrosPresentados[i-1] );
        }
    }

    //console.log("Repetidos "+CuadrosPresentados);

    //validar que no se repitan los id's
    for (var i = 0; i < CuadrosPresentados.length; i++)
    {
        if (CuadrosPresentados[i] == CuadrosPresentados[i+1])
        {
            CuadrosPresentados[i] = GenerarIdAleatorio( CuadrosPresentados[i+1] );
        }

        //validar el primer espacio con el último
        if (i == CuadrosPresentados.length-1)
        {
            if (CuadrosPresentados[i] == CuadrosPresentados[0])
            {
                CuadrosPresentados[i] = GenerarIdAleatorio( CuadrosPresentados[0] );
            }
        }
    }
    //console.log("Sin repetir "+CuadrosPresentados);

    //crear el juego
    var txt = "<table>";
    for (var i = 0; i < 4; i++)
    {
        txt += "<tr>";
        for (var j = 0; j < 4; j++)
        {
            txt += "<td id='"+i+"-"+j+"'>";
            //txt += "<td id='"+i+"-"+j+"' onclick='probar(this.id);'>";
            txt += "</td>";
        }
        txt += "</tr>";
    }

    txt += "</table>";

    LlamarId("juego").html(txt);

    //crea estilo para los cuadros presentados
    for (var i = 0; i < CuadrosPresentados.length; i++)
    {
        LlamarId(CuadrosPresentados[i]).css('background-color', '#00A555');
    }

    //retira los estilos anteriores despues de 3 segundos
    setTimeout(function()
    {
        for (var i = 0; i < CuadrosPresentados.length; i++)
        {
            LlamarId(CuadrosPresentados[i]).css('background-color', '#62FFB3');
        }
    }, 3000);

    //add event clic a los cuadros por medio de jquery y cuenta los click hechos
    var Ganador = Perdedor = 0;

    for (var a = 0; a< 4; a++)
    {
        for (var b = 0; b < 4; b++)
        {
            $("#"+ a+"-"+b).on("click", function()
            {
                if( this.id == CuadrosPresentados[CuadrosPresentados.indexOf(this.id)] )
                {
                    LlamarId(this.id).css('background-color', '#00A555');
                    Ganador++;
                }else
                {
                    Perdedor++;
                    LlamarId("error").html("Errores: " + Perdedor);

                }

                if (Ganador == CuadrosPresentados.length)
                {
                    LlamarId("ganador").html("Has ganado!!");
                    setTimeout(function() { location.reload(); }, 3000);
                }
                if(Perdedor == CuadrosPresentados.length)
                {
                    LlamarId("error").html("Has perdido!!");
                    setTimeout(function() { location.reload(); }, 3000);
                }
            });
        }
    }
}

function LlamarId(text)
{
    return $("#"+text);
}
