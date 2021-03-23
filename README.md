# Sistema gerenciador de pedidos e comandas

## 📝 Resumo

A plataforma consiste em duas versões do aplicativo destinada aos usuários, uma _Desktop_ (Computadores de Mesa), uma _Mobile_ (Dispositivos móveis como celulares e tablets) e uma _API_ (Interface de Programação de Aplicações) para o gerenciamento dos dados e autenticação.

A versão _Mobile_ é destinada aos garçons ou funcionários que exerçam uma função semelhante, tendo as funções de registrar pedidos e observações sobres os mesmos, contendo número da mesa ou qualquer outro meio de localização do cliente.

E a versão _Desktop_ é destinada aos donos e funcionários que estejam na parte interna do estabelecimento/empresa (exemplo: Cozinheiros), onde serão disponibilizados todos os pedidos existentes, além de outras informações importantes para o controle do estabelecimento (Somente para donos, gerentes e etc.), algumas funcionalidades iniciais são:

-   ✔ Confirmação de pedido
-   ❌ Cancelamento de pedido
-   📊 Visão geral e gráficos das vendas realizadas no mês/ano
-   📦 Gerenciamento de estoque (caso seja necessário)
-   👥 Gerenciamento de funcionários (possibilidade de bater ponto pelo app (com verificação de localização))
-   🕒 Outras funcionalidades serão atualizadas conforme o passar do tempo (Usuários podem dar sugestões)

-   Objetivos

O objetivo do projeto, é facilitar a organização do estabelecimento tanto para o dono quanto para os funcionários. Disponibilizando informações em tempo real de uma ponta a outra (de funcionário para funcionário (exemplo: garçom e cozinheiro), dono para funcionário e vice-versa), tornando mais rápido o atendimento e consequentemente gerando uma maior satisfação do cliente em relação a otimização do tempo.

## 🔌 Recursos

Para a funcionalidade completa do projeto, os seguintes recursos serão necessários:

-   Máquina servidora (Física ou Virtual), para hospedagem do serviço que tratará dos dados, sendo responsável por enviar e armazenar dados e autenticar usuários.
-   Dispositivos móveis, que serão responsáveis de enviar os pedidos ao servidor, eliminando a necessidade de se usar comandas de papel.
-   Computador de Mesa ou Dispositivos móveis, para gerenciar os pedidos. Geralmente na posse dos cozinheiros.
-   Conexão com a internet, para que a conexão com o banco de dados seja estabelecida (opcional, o banco pode ser local)

## 🖥 Tecnologias

-   Client Side

    -   Desktop

        -   HTML
        -   CSS
        -   JavaScript
        -   VueJs
        -   Bootstrap Icons
        -   Heroicons
        -   UnDraw
        -   Electron (Para _build_ (criação) do app)

    -   Mobile
        -   HTML
        -   CSS
        -   JavaScript
        -   OnsenUi
        -   VueJs
        -   Bootstrap Icons
        -   HeroIcons
        -   UnDraw
        -   Cordova (Para _build_ (criação) do app)

-   Server Side

    -   JavaScript
    -   NodeJs
    -   Express
    -   express-session
    -   morgan
    -   body-parser
    -   MongoDB e Mongoose

## 👥 Equipe

A equipe é constituída por membros do Instituto Federal de São Paulo Campus Catanduva, sendo eles:

-   Gabriel Luiz de Oliveira
-   Gabriela da Silva Ornellas
-   _**Lucas Gardini Dias**_
-   Pedro Comelli Neto
-   Thiago Aio
