
    // FUNÇÃO DE AJUSTAR O STEP DO RANGE DE DIÂMETRO
    function alterarStep(){
        
        var prop = document.getElementById('range2').value;
        document.getElementById('range1').setAttribute('step', prop);
    }


    // FUNÇÃO DE IMPRIMIR
    function downloadURI(uri, name) {
        var link = document.createElement("a");

        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        clearDynamicLink(link); 
    }

    function DownloadAsImage() {
        var element = document.getElementById('svg-print');
        html2canvas(element).then(function (canvas) {
        
            var myImage = canvas.toDataURL();
            downloadURI(myImage, "malha.png");
        });
    }
    // FUNÇÃO DE MOSTRAR DADOS (BARRA DE STATUS)
            function alterarStatus(){
                //Buscando dados dos range's sliders
                let rangevalue2 = document.getElementById("range2").value;
                let rangevalue1 = document.getElementById("range1").value;
                let rangevalue3 = document.getElementById("range3").value; 
                //Buscando dados dos radio's buttons
                let r1 = document.getElementById('r1');
                let r2 = document.getElementById('r2');
// ------------------ CHECANDO O PRIMEIRO BOTÃO RADIO
                    if(r1.checked == true){ 
                        document.getElementById("statusgerador").innerHTML = "Foi gerada uma malha <b>circular</b> com o diâmetro de <b>"+ rangevalue1 +"</b> pixels e grau de refinamento de <b>" + rangevalue2 + "</b>%."
                    // REMOVENDO O ÍCONE DE CARREGAMENTO
                        document.getElementById("loadingspinner").classList.remove('spinner-border');
                    }
// ------------------- CHECANDO O SEGUNDO BOTÃO RADIO
                    else if(r2.checked == true){
                        document.getElementById("statusgerador").innerHTML = "Foi gerada uma malha <b>quadrangular</b> com o lado de <b>"+ rangevalue1+  "</b> pixels e grau de refinamento de <b>" + rangevalue2 + "</b>%."
                    //REMOVENDO O ÍCONE DE CARREGAMENTO
                        document.getElementById("loadingspinner").classList.remove('spinner-border');
                    }
// ------------------- CHECANDO O TERCEIRO BOTÃO RADIO
                    else if(r3.checked == true){
                        document.getElementById("statusgerador").innerHTML = "Foi gerada uma malha <b>retangular</b> com a base de <b>"+ rangevalue1+  "</b> pixels e altura de <b>"+ rangevalue3 + "</b> pixels </br> e com grau de refinamento de <b>" + rangevalue2 + "</b>%."
                    //REMOVENDO O ÍCONE DE CARREGAMENTO
                        document.getElementById("loadingspinner").classList.remove('spinner-border');
                    }
// ------------------- CHECANDO O QUARTO BOTÃO RADIO
                    else if(r4.checked == true){
                        document.getElementById("statusgerador").innerHTML = "Foi gerada uma malha <b>elipsoidal</b> com o eixo x de <b>"+ rangevalue1+  "</b> pixels e eixo y de <b>"+ rangevalue3 + "</b> pixels </br> e com grau de refinamento de <b>" + rangevalue2 + "</b>%."
                    //REMOVENDO O ÍCONE DE CARREGAMENTO
                        document.getElementById("loadingspinner").classList.remove('spinner-border');
                    }
// ------------------- MENSAGEM DE ERRO SE NÃO FOR SELECIONADO
                    else{
                        alert("Por favor, selecione algum formato!")
                    }
                    
            }

            var lista_de_pontos = [];

    //função de add na lista de pontos
            function addListaPontos(num, x, y, estilo, prop){
                var xreal = x ;
                var yreal = y ;
                var pontoitem = [num, xreal.toFixed(2), yreal.toFixed(2), estilo];
                lista_de_pontos.push(pontoitem);
            }
            
    // função de desenhar os pontos no circulo
        function desenharPontosNoCirculo(largurasvg, tamanho, proporcao){
                        var svg = document.getElementById('svg');
                        var prop = proporcao;
                        var r = tamanho/2  // espaçamento da malha e linha de dominio
                        var x_inicial = (largurasvg - tamanho)/2;
                        var y_inicial = ((largurasvg - tamanho)/2);
                        var num_pontos =  (Math.trunc(tamanho / proporcao)) + 1;
                        var num_pontos_dominio = (Math.trunc((Math.PI * (r) * 2) / proporcao)) + 1
                        
                        

                        var numero_do_ponto = 0;
                        

                        //estilo----------------------
                                 //cores
                        var color_pontos = document.getElementById('color1').value;
                        var color_ligacoes = document.getElementById('color2').value;
                        var color_numeros = document.getElementById('color3').value;
                        var color_pontos_fronteira = document.getElementById('color4').value;
                                 // opcionais
                        var linhas_horizontais = document.getElementById('checkbox1');
                        var exibir_pontos = document.getElementById('checkbox2');
                        var exibir_pontos2 = document.getElementById('checkbox3');
                        //---------------------------

                        //pontos do dominio
                        
                        for(var k=0; k < num_pontos_dominio; k++){

                            numero_do_ponto +=1
                            
                            var step_angle = (360 / num_pontos_dominio)*(Math.PI/180);
                            //desenhando o numero
                            
                            var raio = tamanho/2
                            var x = (Math.cos(step_angle * k) * raio)+210
                            var y = (Math.sin(step_angle * k) * raio)+210
                            if(exibir_pontos2.checked == true){
                                svg.innerHTML += "<text class='textosvg' x="+(x + 7)+" y="+(y + 2)+"  fill='"+color_numeros+"'>"+ numero_do_ponto +"</text>"
                            }
                            
                            svg.innerHTML += "<circle cx="+x+" cy="+ y +" r='4' fill='red' />"
                            addListaPontos(numero_do_ponto, x, y, 2, proporcao)
                        }







                        //diagonais
                        for(var z= 0; z < num_pontos-1; z++){
                            for(var i=0; i<num_pontos-1;i++){
                                

                                // otimizacao de calculo
                                var z_prop = z * parseInt(proporcao)
                                // x1 e y1
                                var x1_1 = x_inicial + (i * proporcao); // azul e verde
                                var x1_2 = (x_inicial + (i * proporcao) + prop/2) // vermelha e amarela
                                
                                var y1_1 = (y_inicial + ( z_prop)) // azul
                                var y1_2 = (y_inicial + ( z_prop)+ prop/2) // vermelha
                                var y1_3 = (y_inicial + ( z_prop)+ parseInt(prop))

                                // x2 e y2
                                var x2_1 = (x_inicial + (i * proporcao)) + parseInt(proporcao/2) // verde e azul
                                var x2_2 = ((x_inicial + (i * proporcao)) + parseInt(proporcao)) // vermelho e amarelo

                                var y2_1 =  (y_inicial + (z_prop) + parseInt(prop/2)) // azul e verde
                                var y2_2 = (y_inicial + (z_prop)) // amarelo
                                var y2_3 = (y_inicial + (z_prop) + parseInt(prop)) // vermelho


                                if(z!=0){
                                    // ligação diagonal DESCENDO p direita 1 (AZUL)
                                    if(i!=0){
                                        var d_p1_center = Math.sqrt(Math.pow((210 - x1_1),2) + Math.pow((210-y1_1),2))
                                        var d_p2_center = Math.sqrt(Math.pow((210 - x2_1),2) + Math.pow((210-y2_1),2))
                                        
                                        if(d_p2_center < r){
                                            if(d_p1_center < r){
                                                svg.innerHTML += "<line x1="+x1_1+" y1="+y1_1+" x2="+ x2_1 +" y2="+y2_1+" style='stroke:blue; stroke-width:2;'/>"
                                            } 
                                        }
                                        
                                    }
                                // ligação diagonal SUBINDO p direita 1 (AMARELA)
                                    if(i != num_pontos-2){

                                        var d_p1_center = Math.sqrt(Math.pow((210 - x1_2),2) + Math.pow((210-y1_2),2))
                                        var d_p2_center = Math.sqrt(Math.pow((210 - x2_2),2) + Math.pow((210-y2_2),2))
                                        
                                        if(d_p2_center < r){
                                            if(d_p1_center < r){
                                                svg.innerHTML += "<line x1="+x1_2+" y1="+y1_2+" x2="+ x2_2 +" y2="+y2_2+" style='stroke:yellow; stroke-width:2;'/>"
                                            } 
                                        }
                                        
                                    }
                                }
                                
                               if(z!=num_pontos-2){
                                    // ligação diagonal DESCENDO p direita 2 (VERMELHA)
                                    if(i!=num_pontos-2){


                                        var d_p1_center = Math.sqrt(Math.pow((210 - x1_2),2) + Math.pow((210-y1_2),2))
                                        var d_p2_center = Math.sqrt(Math.pow((210 - x2_2),2) + Math.pow((210-y2_3),2))
                                        
                                        if(d_p2_center < r){
                                            if(d_p1_center < r){
                                                svg.innerHTML += "<line x1="+x1_2+" y1="+y1_2+" x2="+ x2_2 +" y2="+y2_3+" style='stroke:red; stroke-width:2;'/>"
                                            } 
                                        }



                                        
                                    }
                                    if(i!=0){
                                        // ligação diagonal SUBINDO p direita 2 (VERDE)


                                        var d_p1_center = Math.sqrt(Math.pow((210 - x1_1),2) + Math.pow((210-y1_3),2))
                                        var d_p2_center = Math.sqrt(Math.pow((210 - x2_1),2) + Math.pow((210-y2_1),2))
                                        
                                        if(d_p2_center < r){
                                            if(d_p1_center < r){
                                                svg.innerHTML += "<line x1="+x1_1+" y1="+y1_3+" x2="+ x2_1 +" y2="+y2_1+" style='stroke:green; stroke-width:2;'/>"
                                            } 
                                        }

                                       
                                    }
                               }
                                
                            }
                        }
                        
                        // ligações diagonais e pontos do meio
                        for(var z=0; z < num_pontos -1; z++){


                            // linhas horizontais dos pontos do meio
                            if(linhas_horizontais.checked == true){
                                for(var i=0; i < num_pontos - 2; i++){
                                    var x1 = (x_inicial + (i * prop) + prop/2)
                                    var y1 = (y_inicial + ( z * prop) + prop/2)
                                    var x2 = (x_inicial + (i * prop) + (prop* 1.5))
                                    var y2 = (y_inicial + (z * parseInt(proporcao))+prop/2)

                                    var d_p1_center = Math.sqrt(Math.pow((210 - x1),2) + Math.pow((210-y1),2))
                                    var d_p2_center = Math.sqrt(Math.pow((210 - x2),2) + Math.pow((210-y2),2))

                                    if(d_p1_center < r){
                                        if(d_p2_center < r){
                                            svg.innerHTML += "<line x1="+x1+" y1="+y1+" x2="+ x2 +" y2="+y2+" style='stroke:"+color_ligacoes+"; stroke-width:2;'/>"
                                        }
                                    }
                                    
                                   
                                }
                            }





                            //diagonais

                            


                            
                            for(var i= 0; i<num_pontos -1; i++){

                                var xcanvas = ((prop/2) +(prop * i )+x_inicial);
                                var ycanvas = (y_inicial + (prop * z) + prop/2);

                                // pontos do meio
                                var d_ponto_to_center = Math.sqrt(Math.pow((210 - xcanvas),2) + Math.pow((210-ycanvas),2))
                                if(d_ponto_to_center < r){
                                    numero_do_ponto += 1;
                                    svg.innerHTML += "<circle cx="+xcanvas+" cy="+ ycanvas +" r='4' fill='blue' />"
                                    addListaPontos(numero_do_ponto, xcanvas, ycanvas, 1, proporcao)
                                }

                                if(exibir_pontos.checked == true){  
                                                
                                                if(d_ponto_to_center < r){
                                                    
                                                    svg.innerHTML += "<text class='textosvg' x="+(xcanvas + 7)+" y="+(ycanvas + 2)+"  fill='"+color_numeros+"'>"+ numero_do_ponto +"</text>"
                                                }
                                                
                                        }
                                

                            }   
                            
                        }


                        
                        for(var z = 0; z < num_pontos; z++){

                            

                            // linha horizontal
                            if(linhas_horizontais.checked == true){
                                for(var i=0; i < num_pontos - 1; i++){

                                    var x1 = (x_inicial + (i * proporcao) )
                                    var y1 = (y_inicial + ( z * prop))

                                    var x2 =((x_inicial + (i * proporcao)) + parseInt(proporcao))
                                    var y2 =(y_inicial + (z * parseInt(proporcao)))

                                    var d_p1_center = Math.sqrt(Math.pow((210 - x1),2) + Math.pow((210-y1),2))
                                    var d_p2_center = Math.sqrt(Math.pow((210 - x2),2) + Math.pow((210-y2),2))

                                    if(d_p1_center < r){
                                        if(d_p2_center < r){
                                            svg.innerHTML += "<line x1="+x1+" y1="+y1+" x2="+ x2 +" y2="+y2+" style='stroke:"+color_ligacoes+"; stroke-width:2;'/>"
                                        }
                                    }
                                }
                            }

                            // pontos crescendo verticalmente
                            // verificando se é a primeira linha para colorir diferente
                            if(z == 0){
                                for(var i=0; i < num_pontos; i++){    
                                
                                var xcanvas = (x_inicial + (i * proporcao));
                                var ycanvas = (y_inicial + (z * proporcao));
                                
                                var d_ponto_to_center = Math.sqrt(Math.pow((210 - xcanvas),2) + Math.pow((210-ycanvas),2))
                                if(d_ponto_to_center < r){
                                    numero_do_ponto += 1;
                                    svg.innerHTML += "<circle cx="+xcanvas+" cy="+ ycanvas +" r='4' fill='"+color_pontos_fronteira+"' />"
                                    addListaPontos(numero_do_ponto, xcanvas, ycanvas, 2, proporcao)
                                }
                               
                                    
                                
                               
                            
                            }
                            }else if(z == num_pontos-1){// verificando se é a ÚLTIMA linha para colorir diferente
                                
                                for(var i=0; i < num_pontos; i++){
                                    
                                    var xcanvas = (x_inicial + (i * proporcao));
                                    var ycanvas = (y_inicial + (z * proporcao));
                                   
                                    var d_ponto_to_center = Math.sqrt(Math.pow((210 - xcanvas),2) + Math.pow((210-ycanvas),2))
                                    if(d_ponto_to_center < r){
                                        numero_do_ponto += 1;
                                        svg.innerHTML += "<circle cx="+xcanvas+" cy="+ ycanvas +" r='4' fill='"+color_pontos_fronteira+"' />"
                                        addListaPontos(numero_do_ponto, xcanvas, ycanvas, 2, proporcao);
                                    }
                                    
                                   
                                }

                            }else{// pontos do meio

                                    for(var i=0; i < num_pontos; i++){
                                        
                                        var xcanvas = (x_inicial + (i * proporcao));
                                        var ycanvas = (y_inicial + (z * proporcao));

                                        var d_ponto_to_center = Math.sqrt(Math.pow((210 - xcanvas),2) + Math.pow((210-ycanvas),2))
                                        



                                        if(i == 0){ // primeiro da linha

                                            if(d_ponto_to_center < r){
                                                numero_do_ponto += 1;
                                                svg.innerHTML += "<circle cx="+xcanvas+" cy="+ ycanvas +" r='4' fill='"+color_pontos_fronteira+"' />"
                                                addListaPontos(numero_do_ponto, xcanvas, ycanvas, 2, proporcao)
                                            }
                                            
                                            
                                        
                                        }else if(i == num_pontos - 1){ // ultimo da linha
                                        
                                            if(d_ponto_to_center < r){
                                                numero_do_ponto += 1;
                                                svg.innerHTML += "<circle cx="+xcanvas+" cy="+ ycanvas +" r='4' fill='"+color_pontos_fronteira+"' />"
                                                addListaPontos(numero_do_ponto, xcanvas, ycanvas, 2, proporcao)
                                            }
                                            
                                            
                                        
                                        }else{ // linha do meio
                                        
                                            if(d_ponto_to_center < r){
                                                numero_do_ponto += 1;
                                                svg.innerHTML += "<circle cx="+xcanvas+" cy="+ ycanvas +" r='4' fill='"+color_pontos+"' />"
                                                addListaPontos(numero_do_ponto, xcanvas, ycanvas, 1, proporcao)
                                            }
                                            
                                        
                                        }

                                        // exibindo numeros
                                        if(exibir_pontos.checked == true){  
                                                
                                                if(d_ponto_to_center < r){
                                                    
                                                    svg.innerHTML += "<text class='textosvg' x="+(xcanvas + 7)+" y="+(ycanvas + 2)+"  fill='"+color_numeros+"'>"+ numero_do_ponto +"</text>"
                                                }
                                                
                                        }
                                        

                                    }

                            }

                            
                            

                            

                        }// terminando z

                        
                        document.getElementById('qtd-pontos').innerText = numero_do_ponto
                        document.getElementById('qtd-pontos-dominio').innerText = num_pontos_dominio
                        document.getElementById('listadepontos').innerText = "0,0,0,1\n"
                        

                        for(var x = 0; x < lista_de_pontos.length; x++){
                            lista_de_pontos[x][0] = x + 1
                        }

                        // // criando uma lista dos pontos do dominio
                        
                        

                        lista_de_pontos.forEach(item => {
                            var textopontos = JSON.stringify(item).replace("[",'').replace(']','').replace('"','').replace('"','').replace('"','').replace('"','') + "\n"
                            document.getElementById('listadepontos').innerText += textopontos; 
                        })
                        document.getElementById('listadepontos').innerText += "0,0,0,2"
                        
                        // teste--------------------------------------

                        var lista_de_pontos_dominio = [...lista_de_pontos]
                        var num_elm_deleted = parseInt(numero_do_ponto - num_pontos_dominio)
                        for(var z = 0; z < num_elm_deleted; z++){
                            lista_de_pontos_dominio.pop()
                        }
                        // criando uma lista de pontos internos
                        var lista_de_pontos_internos = [...lista_de_pontos]
                        for(var k =0; k < num_pontos_dominio; k++){
                            lista_de_pontos_internos.shift()
                        }
                        
                         //document.getElementById('pontos-list').innerText = lista_de_pontos_internos
                        document.getElementById('pontos-list').innerText =''
                        for(var k = 0; k < num_pontos_dominio; k++){

                            var xatual = lista_de_pontos_dominio[k][1];
                            var yatual = lista_de_pontos_dominio[k][2];

                            var xprox = 0
                            var yprox = 0

                            var d_menor = 10000000 // precisa ser grande p nao ser zero
                            var d_atual
                            
                            for(var z = 0; z < lista_de_pontos_internos.length; z++){


                                for(var w =0; w < lista_de_pontos_internos.length;w++){
                                    // calculando a distancia
                                     d_atual =  Math.abs(Math.sqrt(Math.pow((lista_de_pontos_dominio[k][1] - lista_de_pontos_internos[z][1]),2) + Math.pow((lista_de_pontos_dominio[k][2] - lista_de_pontos_internos[z][2]),2)))
                                    
                                     if(d_atual < d_menor){

                                        d_menor = d_atual

                                        xprox = lista_de_pontos_internos[z][1]
                                        yprox = lista_de_pontos_internos[z][2]
                                    }


                                }                         

                            }


                            //desenahndoa a primeira menor ligacao
                            svg.innerHTML += "<line x1="+xprox +" y1="+yprox +" x2="+ xatual +" y2="+yatual +" style='stroke:grey; stroke-width:2;'/>"
                            



                             // document.getElementById('pontos-list').innerText += " / x: "+ xatual + " y: " + yatual
                        }
                        
                        

                        lista_de_pontos.length = 0;
 
                    }
            
    // função de desenhar os pontos no quadrado
    function desenharPontosNoQuadrado(largurasvg, tamanho, proporcao){
    var svg = document.getElementById('svg');
    var prop = proporcao;
    var x_inicial = (largurasvg - tamanho)/2;
    var y_inicial = ((largurasvg - tamanho)/2);
    var num_pontos =  (Math.trunc(tamanho / proporcao)) + 1;

    var numero_do_ponto = 0;
    

    //estilo----------------------
             //cores
    var color_pontos = document.getElementById('color1').value;
    var color_ligacoes = document.getElementById('color2').value;
    var color_numeros = document.getElementById('color3').value;
    var color_pontos_fronteira = document.getElementById('color4').value;
             // opcionais
    var linhas_horizontais = document.getElementById('checkbox1');
    var exibir_pontos = document.getElementById('checkbox2');
    //---------------------------
    
    
    // ligações diagonais e pontos do meio
    for(var z=0; z < num_pontos -1; z++){


        // linhas horizontais dos pontos do meio
        if(linhas_horizontais.checked == true){
            for(var i=0; i < num_pontos - 2; i++){
                svg.innerHTML += "<line x1="+(x_inicial + (i * prop) + prop/2)+" y1="+(y_inicial + ( z * prop) + prop/2)+" x2="+ (x_inicial + (i * prop) + (prop* 1.5)) +" y2="+(y_inicial + (z * parseInt(proporcao))+prop/2)+" style='stroke:"+color_ligacoes+"; stroke-width:2;'/>"
                }
        }

        
        for(var i= 0; i<num_pontos -1; i++){


            // ligação diagonal DESCENDO p direita 1 (AZUL)
            svg.innerHTML += "<line x1="+(x_inicial + (i * proporcao) )+" y1="+(y_inicial + ( z * parseInt(proporcao)))+" x2="+ ((x_inicial + (i * proporcao)) + parseInt(proporcao/2)) +" y2="+(y_inicial + (z * parseInt(proporcao)) + parseInt(prop/2))+" style='stroke:blue; stroke-width:2;'/>"
            // ligação diagonal DESCENDO p direita 2 (VERMELHA)
            svg.innerHTML += "<line x1="+(x_inicial + (i * proporcao) + prop/2)+" y1="+(y_inicial + ( z * parseInt(proporcao))+ prop/2)+" x2="+ ((x_inicial + (i * proporcao)) + parseInt(proporcao)) +" y2="+(y_inicial + (z * parseInt(proporcao)) + parseInt(prop))+" style='stroke:red; stroke-width:2;'/>"
            

            // ligação diagonal SUBINDO p direita 1 (AMARELA)
            svg.innerHTML += "<line x1="+(x_inicial + (i * proporcao) + prop/2)+" y1="+(y_inicial + ( z * parseInt(proporcao))+ parseInt(prop/2))+" x2="+ ((x_inicial + (i * proporcao)) + parseInt(proporcao)) +" y2="+(y_inicial + (z * parseInt(proporcao)))+" style='stroke:yellow; stroke-width:2;'/>"
            // ligação diagonal SUBINDO p direita 2 (VERDE)
            svg.innerHTML += "<line x1="+(x_inicial + (i * proporcao) )+" y1="+(y_inicial + ( z * parseInt(proporcao))+ parseInt(prop))+" x2="+ ((x_inicial + (i * proporcao)) + parseInt(proporcao/2)) +" y2="+(y_inicial + (z * parseInt(proporcao))+ prop/2)+" style='stroke:green; stroke-width:2;'/>"
            
            // PONTOS DO MEIO
            numero_do_ponto += 1;

            svg.innerHTML += "<circle cx="+((prop/2) +(prop * i )+x_inicial)+" cy="+ (y_inicial + (prop * z) + prop/2) +" r='4' fill='"+color_pontos+"' />"
            
            var xcanvas = ((prop/2) +(prop * i )+x_inicial);
            var ycanvas = (y_inicial + (prop * z) + prop/2);
            addListaPontos(numero_do_ponto, xcanvas, ycanvas, 1, proporcao)


            if(exibir_pontos.checked == true){
            svg.innerHTML += "<text class='textosvg' x="+((prop/2) + (prop * i )+(7) +x_inicial)+" y="+ (y_inicial +(1)+ (prop * z) + prop/2) +"  fill='"+color_numeros+"'>"+ numero_do_ponto +"</text>"
            }
            

        }   
        
        


        
        
        
        

    }


    
    for(var z = 0; z < num_pontos; z++){

        

        // linha horizontal
        if(linhas_horizontais.checked == true){
            for(var i=0; i < num_pontos - 1; i++){
            svg.innerHTML += "<line x1="+(x_inicial + (i * proporcao) )+" y1="+(y_inicial + ( z * prop))+" x2="+ ((x_inicial + (i * proporcao)) + parseInt(proporcao)) +" y2="+(y_inicial + (z * parseInt(proporcao)))+" style='stroke:"+color_ligacoes+"; stroke-width:2;'/>"
            }

            

        }

        // pontos crescendo verticalmente
        // verificando se é a primeira linha para colorir diferente
        if(z == 0){
            for(var i=0; i < num_pontos; i++){    
            svg.innerHTML += "<circle cx="+(x_inicial + (i * proporcao))+" cy="+ (y_inicial + (z * proporcao)) +" r='4' fill='"+color_pontos_fronteira+"' />"
            var xcanvas = (x_inicial + (i * proporcao));
            var ycanvas = (y_inicial + (z * proporcao));
            addListaPontos(numero_do_ponto, xcanvas, ycanvas, 2, proporcao)
        
        }
        }else if(z == num_pontos-1){// verificando se é a ÚLTIMA linha para colorir diferente
            
            for(var i=0; i < num_pontos; i++){
                svg.innerHTML += "<circle cx="+(x_inicial + (i * proporcao))+" cy="+ (y_inicial + (z * proporcao)) +" r='4' fill='"+color_pontos_fronteira+"' />"
                var xcanvas = (x_inicial + (i * proporcao));
                var ycanvas = (y_inicial + (z * proporcao));
                addListaPontos(numero_do_ponto, xcanvas, ycanvas, 2, proporcao);
            }

        }else{// pontos do meio

                for(var i=0; i < num_pontos; i++){

            
                    if(i == 0){ // primeiro da linha

                        svg.innerHTML += "<circle cx="+(x_inicial + (i * proporcao))+" cy="+ (y_inicial + (z * proporcao)) +" r='4' fill='"+color_pontos_fronteira+"' />"
                        var xcanvas = (x_inicial + (i * proporcao));
                        var ycanvas = (y_inicial + (z * proporcao));
                        addListaPontos(numero_do_ponto, xcanvas, ycanvas, 2, proporcao)
                    
                    }else if(i == num_pontos - 1){ // ultimo da linha
                    
                        svg.innerHTML += "<circle cx="+(x_inicial + (i * proporcao))+" cy="+ (y_inicial + (z * proporcao)) +" r='4' fill='"+color_pontos_fronteira+"' />"
                        var xcanvas = (x_inicial + (i * proporcao));
                        var ycanvas = (y_inicial + (z * proporcao));
                        addListaPontos(numero_do_ponto, xcanvas, ycanvas, 2, proporcao)
                    
                    }else{ // linha do meio
                    
                        svg.innerHTML += "<circle cx="+(x_inicial + (i * proporcao))+" cy="+ (y_inicial + (z * proporcao)) +" r='4' fill='"+color_pontos+"' />"
                        var xcanvas = (x_inicial + (i * proporcao));
                        var ycanvas = (y_inicial + (z * proporcao));
                        addListaPontos(numero_do_ponto, xcanvas, ycanvas, 1, proporcao)
                    
                    }
                    

                }

        }

        
        // exibindo numeros
        if(exibir_pontos.checked == true){
                for(var i=0; i < num_pontos; i++){
                    numero_do_ponto += 1;
                    svg.innerHTML += "<text class='textosvg' x="+(x_inicial +(7)+(i * proporcao))+" y="+ (y_inicial +(2)+(z * proporcao))+"  fill='"+color_numeros+"'>"+ numero_do_ponto +"</text>"
                }
            }

        

    }// terminando z

    

    document.getElementById('qtd-pontos').innerText = ((num_pontos * num_pontos) + ((num_pontos - 1) * (num_pontos -1)))
    document.getElementById('qtd-pontos-dominio').innerText = (4 * num_pontos) - 4;

    document.getElementById('listadepontos').innerText = "0,0,0,1\n"

    for(var x = 0; x < lista_de_pontos.length; x++){
        lista_de_pontos[x][0] = x + 1
    }

    lista_de_pontos.forEach(item => {
        var textopontos = JSON.stringify(item).replace("[",'').replace(']','').replace('"','').replace('"','').replace('"','').replace('"','') + "\n"
        document.getElementById('listadepontos').innerText += textopontos; 
    })
    document.getElementById('listadepontos').innerText += "0,0,0,2"
    lista_de_pontos.length = 0;
    
    

    

}        
    // FUNÇÃO DE DESENHAR O DOMÍNIO
            var gerador_logo_status = true;
            function renderizar(){
                // cores
                //cores------------
                var color_pontos = document.getElementById('color1').value;
                var color_ligacoes = document.getElementById('color2').value;
                // ---------
                gerador_logo_status= false;
                let largurasvg = 420;                                                    // <<<<<<<<--------------------------- DEFINIR A O TAMANHO DO LADO DO SVG
                
                let alturasvg = largurasvg;
                let metadealturasvg = alturasvg / 2;
                let metadelargurasvg = largurasvg / 2;

                let rangevalue2 = document.getElementById("range2").value;
                let rangevalue1 = document.getElementById("range1").value;
                let rangevalue3 = document.getElementById("range3").value; 
                let rangevalue4 = document.getElementById("range4").value;

                let r1 = document.getElementById('r1');
                let r2 = document.getElementById('r2'); 

                let centerx = metadealturasvg - rangevalue1 / 2;
                let centery = metadelargurasvg - rangevalue3 / 2;

                document.getElementById('print-icon').src ="https://cdn.discordapp.com/attachments/874412727311937548/879888413921280010/103530_download_accept_icon.png"
                document.getElementById('print-btn').removeAttribute('disabled')

                if(r1.checked == true){
                    if(colorscheme == false){
                        document.getElementById('svg').innerHTML = " <circle  r="+ rangevalue1 / 2 +" cx="+ metadealturasvg +" cy="+metadelargurasvg+" fill='var(--backgroundStatusCanvas)' fill-opacity='0' stroke='white' stroke-width='4'/>"
                        desenharPontosNoCirculo(largurasvg,rangevalue1, rangevalue2)
                    }else{
                        document.getElementById('svg').innerHTML = " <circle  r="+ rangevalue1 / 2 +" cx="+ metadealturasvg +" cy="+metadelargurasvg+" fill='var(--backgroundStatusCanvas)' fill-opacity='0' stroke='#1272e9' stroke-width='4'/>"
                    }
                }
                else if(r4.checked == true){
                    if(colorscheme == false){
                        document.getElementById('svg').innerHTML = " <ellipse rx="+ rangevalue1/2 +" ry="+ rangevalue3/2 +" cx="+ metadealturasvg +" cy="+metadelargurasvg+" fill='var(--backgroundStatusCanvas)' fill-opacity='0' stroke='white' stroke-width='4' transform='rotate("+ rangevalue4+","+metadealturasvg+","+metadelargurasvg+")'/>"
                    }else{
                        document.getElementById('svg').innerHTML = " <ellipse rx="+ rangevalue1/2 +" ry="+ rangevalue3/2 +" cx="+ metadealturasvg +" cy="+metadelargurasvg+" fill='var(--backgroundStatusCanvas)' fill-opacity='0' stroke='#1272e9' stroke-width='4' transform='rotate("+ rangevalue4+","+metadealturasvg+","+metadelargurasvg+")'/>"
                    }
                }else if(r3.checked == true){
                    if(colorscheme == false){
                        document.getElementById('svg').innerHTML = "<rect x="+ centerx +" y="+ centery +" rx='0' ry='0' width="+ rangevalue1+ " height="+ rangevalue3+" fill='var(--backgroundStatusCanvas)' fill-opacity='0' stroke='white' stroke-width='4' transform='rotate("+ rangevalue4+","+metadealturasvg+","+metadelargurasvg+")'/>"
                    }else{
                        document.getElementById('svg').innerHTML = "<rect x="+ centerx +" y="+ centery +" rx='0' ry='0' width="+ rangevalue1+ " height="+ rangevalue3+" fill='var(--backgroundStatusCanvas)' fill-opacity='0' stroke='#1272e9' stroke-width='4' transform='rotate("+ rangevalue4+","+metadealturasvg+","+metadelargurasvg+")'/>"
                    }
                }else if(r2.checked == true){           
                    if(colorscheme == false){
                        document.getElementById('svg').innerHTML = "<rect x="+ centerx +" y="+ centerx +" rx='0' ry='0' width="+ rangevalue1+ " height="+ rangevalue1+" fill='var(--backgroundStatusCanvas)' fill-opacity='0' stroke='"+color_ligacoes+"' stroke-width='5' transform='rotate("+ rangevalue4+","+metadealturasvg+","+metadelargurasvg+")'/>"
                        desenharPontosNoQuadrado(largurasvg, rangevalue1, rangevalue2);
                    }else{
                        document.getElementById('svg').innerHTML = "<rect x="+ centerx +" y="+ centerx +" rx='0' ry='0' width="+ rangevalue1+ " height="+ rangevalue1+" fill='var(--backgroundStatusCanvas)' fill-opacity='0' stroke='#1272e9' stroke-width='4' transform='rotate("+ rangevalue4+","+metadealturasvg+","+metadelargurasvg+")'/>"
                    }
                }else{
                    alert('Selecione um formato!')
                }
                alterarStatus();
            }
    
    
            // FUNÇÃO DE RECARREGAR PÁGINA
            function refresh(){
                window.location.reload();
            }
    // FUNÇÕES DE ALTERAR O FORMULARIO DEPENDENDO DO FORMATO SELECIONADO
            function alterarForm(shape){
                if(shape == 'circle'){
                    document.getElementById("labelrange1").innerHTML = "Diâmetro"
                    document.getElementById("labelrange3").innerHTML = "<span style='color: rgb(92, 92, 92);'>Desativado</span>"
                    document.getElementById("range3").setAttribute("disabled", true)
                    document.getElementById("range4").setAttribute("disabled", true)
                    document.getElementById("spanlabelrange4").innerHTML = "(Desativado) "
                }else if(shape == 'square'){
                    document.getElementById("labelrange1").innerHTML = "Lado";
                    document.getElementById('labelrange3').innerHTML = "Altura";
                    document.getElementById("labelrange3").innerHTML = "<span style='color: rgb(92, 92, 92);'>Desativado</span>";
                    document.getElementById("range3").setAttribute("disabled", true);
                    document.getElementById("range4").removeAttribute("disabled");
                    document.getElementById("spanlabelrange4").innerHTML = "(Graus) ";
                }else if(shape == 'rect'){
                    document.getElementById("labelrange1").innerHTML = " <span title=''>Base</span>";
                    document.getElementById('labelrange3').innerHTML = "Altura";       
                    document.getElementById("range3").removeAttribute("disabled");
                    document.getElementById("range4").removeAttribute("disabled");
                    document.getElementById("spanlabelrange4").innerHTML = "(Graus) ";
                }else if(shape == 'elipse'){
                    document.getElementById("labelrange1").innerHTML = "Eixo <span style='color: rgb(92, 92, 92); font-size: 15px;'>(X)</span>"
                    document.getElementById('labelrange3').innerHTML = "Eixo <span style='color: rgb(92, 92, 92); font-size: 15px;'>(Y)</span>"
                    document.getElementById("range3").removeAttribute("disabled")
                    document.getElementById("range4").removeAttribute("disabled")
                    document.getElementById("spanlabelrange4").innerHTML = "(Graus) "
                }
            }
    // FUNÇÃO DE COPIAR P CLIPBOARD
    function copiarclipboard() {
        document.getElementById('avisocopiado').innerText = 'Copiado'
        var copyText = document.getElementById("listadepontos").innerText;  
        navigator.clipboard.writeText(copyText);
}
    // FUNÇÃO DE ACIONAR TOOLTIPS
            $(function () {
                    $('[data-toggle="tooltip"]').tooltip()
                    })
    // FUNÇÃO LISTENER GERAR DESENHO AUTOMATICAMENTE
                var formobserver = document.getElementById('myForm');
                formobserver.addEventListener('input',function(){
                    renderizar();
                    alterarStep();
                })

    //FUNÇÃO DE ATIVAR LIGHT MODE
                    function lightMode(){
                        var b = document.querySelector(':root');
                        var bs = getComputedStyle(b);

                        // Mudando o background
                        b.style.setProperty('--backgroundCards', 'var(--backgroundExtraLight');
                        b.style.setProperty('--backgroundBody', 'var(--backgroundMediumLight');
                        b.style.setProperty('--backgroundStatusCanvas', 'var(--backgroundDarkLight');
                        b.style.setProperty('--backgroundButtonStandard', 'var(--backgroundGreenStandard');
                        b.style.setProperty('--backgroundButtonHover', 'var(--backgroundGreenHover');
                        b.style.setProperty('--backgroundButtonActive', 'var(--backgroundGreenHoverActive');
                        b.style.setProperty('--backgroundSelection', 'var(--backgroundSelectionGreen');
                        // Mudando os textos
                        b.style.setProperty('--textColorStandard', 'var(--textColorLightMode');
                        b.style.setProperty('--textColorInputLabels', 'var(--textColorLabelsLightMode');
                        b.style.setProperty('--textColorInputLabelsHover', 'var(--textColorLabelsHoverLightMode');
                        // Mudando os sliders habilitados
                        b.style.setProperty('--backgroundTrackFirstHalf', 'var(--backgroundGradientGreen');
                        b.style.setProperty('--backgroundTrackSecondHalf', 'var(--backgroundTrackSecondHalfLightMode');
                        b.style.setProperty('--backgroundSlideButton', 'var(--backgroundSlideButtonLightMode');
                        b.style.setProperty('--backgroundSlideButtonHover', 'var(--backgroundSlideButtonHoverLightMode');
                        b.style.setProperty('--textColorSlideNumbers', 'var(--textColorSlideNumbersLightMode');
                        //Mudando sliders desabilitados
                        b.style.setProperty('--backgroundTrackSecondHalfDisabled', 'var(--backgroundTrackSecondHalfDisabledLightMode');
                        b.style.setProperty('--backgroundSliderButtonDisabled', 'var(--backgroundSliderButtonDisabledLightMode');
                        b.style.setProperty('--backgroundSliderButtonHoverDisabled', 'var(--backgroundSliderButtonHoverDisabledLightMode');
                        // Mudando as imagens
                        document.getElementById('uerjfooter').setAttribute('src','https://cdn.discordapp.com/attachments/874412727311937548/880305285837770772/image_8.png')
                        document.getElementById('theme-button-image').setAttribute('src','https://cdn.discordapp.com/attachments/874412727311937548/880457458831745155/2639870_moon_symbol_icon.png')
                        //Mudando radio
                        b.style.setProperty('--radioImage', 'var(--radioImageLightMode');
                        /* 
                        verificando se ainda não foi renderizada nenhuma malha
                        para trocar a cor da logo do gerador, pois se não trava o sistema de 
                        troca de cores.
                        */
                        if(gerador_logo_status == true){
                            document.getElementById('canvaslogo').setAttribute('xlink:href','https://cdn.discordapp.com/attachments/874412727311937548/880462371343179817/3dgifmaker81496.gif')
                        }

                    }
    //FUNÇÃO DE ATIVAR DARK MODE  
                    function darkMode(){
                        var b = document.querySelector(':root');
                        var bs = getComputedStyle(b);

                        b.style.setProperty('--backgroundCards', 'var(--backgroundSuperDark'); 
                        b.style.setProperty('--backgroundBody', 'var(--backgroundMediumDark'); 
                        b.style.setProperty('--backgroundStatusCanvas', 'var( --backgroundLightDark');
                        b.style.setProperty('--backgroundButtonStandard', 'var(--backgroundPurpleStandard'); 
                        b.style.setProperty('--backgroundButtonHover', 'var(--backgroundPurpleHover'); 
                        b.style.setProperty('--backgroundButtonActive', 'var(--backgroundPurpleActive'); 
                        b.style.setProperty('--backgroundSelection', 'var(--backgroundSelectionPurple'); 
                        b.style.setProperty('--textColorStandard', 'var(--textColorDarkMode');
                        b.style.setProperty('--textColorInputLabels', 'var(--textColorLabelsDarkMode');
                        b.style.setProperty('--textColorInputLabelsHover', 'var(--textColorLabelsHoverDarkMode');
                        b.style.setProperty('--backgroundTrackFirstHalf', 'var(--backgroundGradientPurple');
                        b.style.setProperty('--backgroundTrackSecondHalf', 'var(--backgroundTrackSecondHalfDarkMode'); 
                        b.style.setProperty('--textColorSlideNumbers', 'var(--textColorSlideNumbersDarkMode');  
                        b.style.setProperty('--backgroundSlideButton', 'var(--backgroundSlideButtonDarkMode'); 
                        b.style.setProperty('--backgroundSlideButtonHover', 'var(--backgroundSlideButtonHoverDarkMode');
                        b.style.setProperty('--backgroundTrackSecondHalfDisabled', 'var(--backgroundTrackSecondHalfDisabledDarkMode');
                        b.style.setProperty('--backgroundSliderButtonDisabled', 'var(--backgroundSliderButtonDisabledDarkMode');
                        b.style.setProperty('--backgroundSliderButtonHoverDisabled', 'var(--backgroundSliderButtonHoverDisabledDarkMode');
                        b.style.setProperty('--radioImage', 'var(--radioImageDarkMode');
                        //Mudando as imagens
                        document.getElementById('uerjfooter').setAttribute('src','https://cdn.discordapp.com/attachments/874412727311937548/874434737815552040/logo.png');
                        document.getElementById('theme-button-image').setAttribute('src','https://cdn.discordapp.com/attachments/874412727311937548/880457122213691412/2205209_bright_day_light_sun_icon.png');
                        /* 
                        verificando se ainda não foi renderizada nenhuma malha
                        para trocar a cor da logo do gerador, pois se não trava o sistema de 
                        troca de cores.
                        */
                        if(gerador_logo_status == true){
                            document.getElementById('canvaslogo').setAttribute('xlink:href','https://cdn.discordapp.com/attachments/874412727311937548/880270835632451635/3dgifmaker09477.gif')
                        }
                    }        
    // FUNÇÃO DE ESCOLHER QUAL COLOR SCHEME ATIVAR    
                    var colorscheme = false;
                    function changeColorScheme(){
                        if(colorscheme == false){
                            lightMode();
                            colorscheme = true;
                        }else if(colorscheme == true){
                            darkMode();
                            colorscheme = false;
                        }else{
                            alert('error')
                        }
                    }

                
    