<h1 align="center">PASSCOM: Venda Compartilhada de Passagens</h1>
<h3 align="center">
    Este projeto foi desenvolvido como parte do segundo problema da disciplina MI - Concorrência e Conectividade do curso de graduação em Engenharia de Computação na UEFS
</h3>

<div id="sobre">
    <h2>Sobre o projeto</h2>
    <div align="justify">
        O projeto desenvolvido consiste em um sistema de compra de passagens aéreas para diversas localidades, incluindo a opção de cancelamento das compras, funcionando sobre o modelo de sistemas distribuídos, tendo em sua formação a presença de 3 servidores. O sistema é composto por dois principais componentes: os clientes, responsáveis por solicitar a compra e obter informações sobre as passagens, e os servidores, que realizam o processamento e o armazenamento das passagens adquiridas em suas estruturas de dados, bem como a vinculação dessas passagens aos respectivos compradores. Tanto o cliente quanto os servidores foram desenvolvidos na linguagem de programação Go, recomendada por sua eficiência em projetos que envolvem comunicação em redes e tratamento adequado de concorrência. Para uma comunicação baseada em arquitetura REST com a linguagem Go, foi utilizado o <em>framework</em> Gin, que facilita a criação de rotas e a comunicação entre os componentes do sistema.
    </div>
</div>

<h2>Equipe:<br></h2>

<ul>
    <li><a href="https://github.com/avcsilva">Antonio Vitor Costa da Silva</a></li>
    <li><a href="https://github.com/SivalLeao">Sival Leão de Jesus</a></li>
</ul>

<h1 align="center">Sumário</h1>
<div id="sumario">
    <ul>
        <li><a href="#arquitetura">Arquitetura do sistema</a></li>
        <li><a href="#comunicacao">Protocolo de comunicação</a></li>
        <li><a href="#formatação">Formatação e tratamento de dados</a></li>
        <li><a href="#resultados">Resultados</a></li>
        <li><a href="#execucao">Execução do Projeto</a></li>
        <li><a href="#conclusao">Conclusão</a></li>
    </ul>
</div>

<div id="arquitetura">
    <h2>Arquitetura do sistema</h2>
    <div align="justify">
        <p>
            O sistema utiliza uma arquitetura distribuída RESTful baseada em três servidores independentes, cada um representando uma companhia aérea diferente, possuindo seus próprios conjuntos de passagens. A arquitetura garante a disponibilidade e tolerância a falhas, uma vez que a operação do sistema é mantida mesmo com a falha de um dos servidores.
        </p>
        <p>
            Todos os dados recorrentes de processamento das passagens são atribuídos aos servidores, assim, as informações referentes aos clientes permanecerão salvas e seguras quando o mesmo se desconectar e desejar retornar mais futuramente.
        </p>
        <h3>Servidor</h3>
        <p>
            Os servidores são responsáveis pelo processamento e armazenamento de todas as informações referentes ao funcionamento do sistema. Sendo elas, as rotas de voo dispostas em suas estruturas de dados e suas disponibilidades para compra, tal como os clientes cadastrados e suas respectivas compras. 
        </p>
        <p>
            Os clientes são cadastrados automaticamente com seus nomes de usuário assim que realizam seu primeiro acesso, o sistema armazenará seus dados de compra e permite cancelar voos já comprados. As informações de cadastro dos clientes são enviadas a todos os servidores ligados, permitindo que todos tenham conhecimento das compras realizadas e clientes existentes. Dessa forma, um usuário cliente pode acessar seus dados de compra pela conexão com qualquer um dos três servidores, necessitando apenas informar o mesmo nome de usuário inserido inicialmente.
        </p>
        <p>
            Os voos podem ser comprados por qualquer cliente desde que o voo esteja disponível, ou seja, que nenhum outro cliente tenha a posse.
        </p>
        <p>
            As ações do servidor incluem:
        </p>
        <ol>  
            <li>
                O servidor exibe no terminal um log de debugs, próprio do <em>framework</em> Gin utilizado, mostrando as requisições recebidas e respondidas, bem como os erros que possam ocorrer.
            </li>
            <li>
                Realizar cadastro e reidentificação de clientes, permitindo que os mesmos possam acessar suas compras em qualquer servidor.
                <ol type="a">
                    <li>
                    Em caso de cadastro, o registro será encaminhado aos outros servidores, para que todos possuam as informações de todos os clientes.
                    </li>
                </ol>
            </li>
            <li>
                Listar os clientes já previamente conectados e cadastrados, tais como os registrar a partir de ID’s, que lhes são atribuídos no momento de suas conexões.
            </li>
            <li>
                Concatenar as passagens de cada servidor em uma única estrutura de dados e enviar para o cliente a listagem de todas as localidades existentes, tal como suas disponibilidades para compra.
            </li>
            <li>
                Realizar a compra de passagens para os clientes, verificando se a passagem está disponível e, em caso positivo, realizando a operação e retornando uma mensagem de confirmação, caso contrário, retornar uma mensagem de erro.
                <ol type="a">
                    <li>
                        Caso a passagem seja comprada, o servidor deve atualizar a lista de passagens disponíveis, marcando a passagem como ocupada, tal como atualizar o registro dos clientes em cada outro servidor.
                    </li>
                </ol>
            </li>
            <li>
                Enviar para o cliente a listagem de suas passagens atualmente adquiridas.
                <ol type="a">
                    <li>
                        Caso o cliente não possua nenhuma aquisição, será devolvida uma mensagem indicando esse fato.
                    </li>
                </ol>
            </li>
            <li>
                Cancelar passagens para os clientes, verificando se a passagem existe e pertence ao cliente, e, em caso positivo, realizar a operação e retornar uma mensagem de confirmação, caso contrário, retornar uma mensagem de erro.
                <ol type="a">
                    <li>
                        Caso a passagem seja cancelada, o servidor deve atualizar a lista de passagens disponíveis, marcando a passagem como livre, tal como atualizar o registro dos clientes em cada outro servidor.
                    </li>
                </ol>
            </li>
        </ol>
        É utilizado o protocolo <em>stateful</em>, salvando as informações em variaveis no sistema dos servidores, porém é importante frisar que tais informações armazenadas estarão disponíveis apenas enquanto os servidores estiverem funcionando. No momento do desligamento de todos os servidores, todos os registros serão retornados a seus valores padrões.
        <h3>Cliente</h3>
        É a parte do sistema com o qual o usuário irá interagir para realizar suas solicitações, como comprar voos, ver voos comprados e até mesmo cancelá-los. É responsável por oferecer uma interface baseada em terminal para possibilitar que os usuários possam visualizar as informações e inserirem as ações que desejam realizar. Por meio dessa parte do sistema será possível:
        <ol>
            <li>
                Indicar com qual servidor se deseja conectar para interação, por meio de endereço IP e porta de conexão.
            </li>
            <li>
                Solicitar a lista de localidades disponíveis.
            </li>
            <li>
                Comprar passagens para as localidades disponíveis.
            </li>
            <li>
                Consultar a lista de passagens já adquiridas.
            </li>
            <li>
                Cancelar passagens já adquiridas.
            </li>
        </ol>
        O cliente utiliza o protocolo <em>stateless</em>, não possui nenhum armazenamento de dados e realiza processamento apenas para o envio e recebimento de mensagens, tal como processa a exibição da lista de passagens disponíveis, representando com cores quais estão liberadas para compra e quais estão atualmente ocupadas, respectivamente as cores verde e vermelho.
    </div>
</div>

<div id="comunicacao">
    <h2>Protocolo de comunicação</h2>
    <div align="justify">
    <p>
        Toda a comunicação do sistema foi projetada sobre o modelo TCP/IP, tratando-se de uma comunicação orientada a conexão, no qual deve haver a garantia de conexão estabelecida antes de qualquer comunicação, e que toda informação deve ser devidamente entregue e em sua ordem proposta. Além disso, como o servidor armazena informações de quais usuários já se conectaram e cadastraram, tal como quais deles já efetuaram compras de passagens, diz-se que é aplicado o paradigma de serviço stateful, caracterizado por um servidor  que mantém o estado das interações com clientes. Esse método garante que o usuário não perca seus dados, mesmo que o programa seja excluído ou desligado. 
    </p>
    <p>
        O sistema desenvolvido tem como proposto o seguinte protocolo de comunicação, iniciando-se a partir do momento da conexão de um cliente com o servidor:
    </p>
        <ol>
            <li>
                O servidor inicia enviando ao cliente um número de ID, sendo este um número inteiramente novo ou o número já previamente cadastrado, caso seja um cliente em reconexão.
            </li>
            <li>
                O cliente verifica se a primeira mensagem recebida na conexão é um número. Caso seja, é enviada uma resposta de confirmação de reconhecimento para o servidor ("ID_ok").
            </li>
            <li>
                Com a resposta de confirmação ("ID_ok") sendo devidamente validada no lado do servidor, ambos poderão finalmente iniciar a interação com base em solicitações e comandos do usuário.
            </li>
        </ol>
    </p>
    <p>
        Após a realização dessa comunicação inicial, tanto o servidor quanto o cliente estarão em sua etapa da realização de transações de informações sobre as passagens aéreas. A comunicação ocorrerá da seguinte forma, explicitando-se cada uma de suas possíveis etapas:
        <ol>
            <li>
                Todas as mensagens do cliente com destino ao servidor serão compostas pelo seu ID atribuído e o comando que se deseja realizar no momento. Tendo como um exemplo de uma mensagem “1:1” no momento de um usuário na tela de menu principal, significando que o cliente com ID 1 deseja visualizar a lista de passagens para possivelmente realizar uma compra. Caso o servidor verifique que foi recebida uma mensagem num formato diferente desse, a conexão é encerrada automaticamente.
            </li>
            <li>
                Caso seja solicitada uma operação de compra:
                <ol type="a">
                    <li>
                        O servidor inicia a etapa enviando, em formato JSON, um <em>map</em> para o cliente com de todos os possíveis destinos e se estes estão ocupados ou disponíveis.
                    </li>
                    <li>
                        Tendo o cliente recebido a lista, é esperado que responda com um comando de retorno ou com o nome de um dos destinos para compra.
                        <ol type="i">
                            <li>
                                Caso o servidor receba um comando de retorno (por exemplo “1:3”), este retornará para a etapa de menu principal, tal qual fará o cliente.
                            </li>
                            <li>
                                Caso o servidor receba uma informação diferente do comando de retorno, como um possível destino (exemplo: “1:Fortaleza”), este verificará se é possível realizar a operação.
                            </li>
                            <ol>
                                <li>
                                    Caso o destino recebido não exista ou já esteja ocupado, será enviada ao cliente uma mensagem de erro ("Rota inválida!") e ambos cliente e servidor retornarão à etapa de menu principal.
                                </li>
                                <li>
                                    Caso o destino exista e esteja passível de compra, o servidor realizará a operação de compra e responderá ao cliente com uma mensagem de confirmação ("ok"), que por sua vez será validada de forma a informar ao usuário que a operação foi bem sucedida. Após isso, tanto o cliente quanto o servidor retornarão à etapa de menu principal.
                                </li>
                            </ol>
                        </ol>
                    </li>
                </ol>
            </li>
            <li>
                Caso seja solicitada uma operação de consulta:
                <ol type="a">
                    <li>
                        O servidor inicia verificando se o referido cliente possui já registrada alguma compra. Caso não haja compras, será respondido ao cliente com uma mensagem que indique o ocorrido ("Sem passagens compradas"). Entretanto, caso o cliente possua passagens registradas, o servidor enviará uma mensagem de confirmação de posse ("ok").
                    </li>
                    <li>
                        Tendo o cliente recebido a mensagem de confirmação, este estará esperando, por parte do servidor, novamente em JSON, uma lista de passagens registradas para o ID do referido cliente. Com a lista de passagens recebida, desserializada e devidamente tratada para exibição em terminal, é esperado que o cliente responda com um comando de retorno ou com o nome de uma das possíveis passagens.
                        <ol type="i">
                            <li>
                                Caso o servidor receba comando de retorno (exemplo: "1:3"), ambas as partes do sistema retornarão para a etapa de menu principal.
                            </li>
                            <li>
                                Caso o servidor receba uma informação diferente do comando de retorno (exemplo: "1:Maceio"), este verificará se foi possível realizar a operação de cancelamento de passagem com o nome recebido.
                                <ol>
                                    <li>
                                        Caso o nome recebido não exista na lista ou pertença a algum outro cliente, será enviada ao cliente uma mensagem indicando o erro ("Rota inválida!"), e ambos retornarão à etapa de menu principal.
                                    </li>
                                    <li>
                                        Caso o nome exista e pertença ao cliente em questão, a operação será realizada e o servidor responderá com uma mensagem de confirmação ("ok"). Após isso, ambos irão retornar à etapa de menu principal.
                                    </li>
                                </ol>
                            </li>
                        </ol>
                    </li>
                </ol>
            </li>
            <li>
                Caso seja solicitado o encerramento da conexão:
                <ol type="a">
                    <li>
                        O servidor inicia enviando uma mensagem de confirmação para encerramento de conexão ("exit_ok") e, em seu lado, encerra a conexão.
                    </li>
                    <li>
                        O cliente, por sua vez, tendo recebido e validado corretamente a mensagem de confirmação, exibirá em sua interface tal confirmação e encerrará a execução do programa. Caso, por algum motivo, receba uma mensagem diferente da confirmação, exibirá em sua interface uma mensagem de erro e continuará com a execução do serviço, retornando à etapa de menu principal.
                    </li>
                </ol>
            </li>
            <li>
                Em caso de um comando inválido (exemplo: "1:5", "1:6", etc) o servidor enviará uma mensagem informando o problema ("Operação inválida!"), de forma que o cliente a receba e exiba em seu terminal para indicar ao usuário o ocorrido.
            </li>
        </ol>
        </li>
    </p>
    <p>
        Para a realização da conexão com diversos clientes simultaneamente, foram utilizadas as chamadas goroutines, disponíveis nativamente na linguagem Go, que possibilitam a utilização de threads para execução de processos em paralelo. Com isso, é possível que mais de um cliente se conecte e comunique com o servidor simultaneamente e, graças às funcionalidades oferecidas pela tecnologia da linguagem, sem haver problemas de choques de comunicação ou problemas de concorrência. 
    </p>
    <p>
        Dessa forma, se dois usuários tentarem comprar a mesma passagem simultaneamente, apenas um deles conseguirá realizar a compra, devido ao tratamento adequado de concorrência proporcionado pela linguagem.
    </p>
</div>

<div id="formatação">
    <h2>Formatação e tratamento de dados</h2>
    <div align="justify">
        <p>
            Para o correto funcionamento da comunicação cliente-servidor, é essencial definir o formato dos dados que serão enviados e recebidos por ambos. Para isso, foram analisadas as estruturas disponíveis na linguagem, com o objetivo de transmitir apenas os dados necessários, minimizando o volume de envio para atender ao problema proposto. Optou-se por utilizar um map tanto na comunicação do servidor para o cliente quanto do cliente para o servidor, pois essa estrutura permite o envio de dados associados, como o nome das rotas, disponibilidade, e as requisições do usuário vinculadas ao seu ID.
        </p>
        <p>
            Antes de qualquer envio, os dados são serializados e convertidos em um arquivo JSON, seguindo o formato de um <em>map</em> em Go. O destinatário, por sua vez, desserializa a mensagem para tratá-la adequadamente. Devido à utilização de uma estrutura de dados específica da linguagem, tanto o servidor quanto o cliente devem estar implementados em Go para garantir a compatibilidade na comunicação.
        </p>
    </div>
</div>

<div id="resultados">
    <h2>Resultados</h2>
    <div align="justify">
        <p>
            Tendo sido testado em laboratório com uso de diversos computadores para simular a conexão simultânea de múltiplos clientes, tal como com um <em>script</em> que realiza uma execução teste programada de múltiplos clientes ao mesmo tempo, foi possível averiguar que o sistema consegue lidar correta e eficientemente com as diversas comunicações ocorrendo simultaneamente, não apresentando nenhum tipo de atraso ou travamento, tal como se era esperado em teoria de acordo com as tecnologias oferecidas pela linguagem Go. Além disso, foi possível comprovar que o servidor foi capaz de reconhecer corretamente cada cliente que se conectou e reconectou, sendo possível a recuperação dos dados e compras de cada usuário simulado.
        </p>
        <p>
            Em laboratório, foi testado também o que ocorria com o funcionamento do sistema caso um dos clientes conectados perdesse sua conexão de maneira forçada, como a remoção de um cabo de rede. Com isso, foi averiguado que o servidor mantém seu funcionamento normalmente, podendo ainda se comunicar com outros clientes, e encerrando automaticamente a comunicação com o cliente que perdeu sua conexão, graças à funcionalidade de <em>timeout</em> embutida na biblioteca utilizada para a realização das conexões e comunicações.
        </p>
        <p>
            Entretanto, da maneira como projeto foi concebido, o cliente em questão que teve sua conexão perdida não consegue reconhecer o erro relatado em tempo real, mantendo a execução do programa na etapa em que parou, até que se tente enviar algum comando. Somente após a tentativa de enviar alguma mensagem o programa reconhece a perda da conexão e exibe uma mensagem de erro, solicitando em seguida um endereço alvo para realizar uma nova conexão. Caso o cliente receba de volta sua conexão com a rede, como tendo seu cabo de rede posto de volta, após o servidor ter encerrado sua conexão, esta não será iniciada novamente de forma automática. O usuário do cliente deverá indicar novamente o endereço alvo para poder se reconectar ao servidor e recuperar seus dados.
        </p>
        <p>
            Uma considerável porção do código fonte do projeto possui documentação sobre suas operações, indicando o que cada parte ou linha de código deve estar realizando para o funcionamento do sistema.
        </p>
    </div>
</div>

<div id="execucao">
    <h2>Execução do Projeto</h3>
    <div align="justify">
    <h3>Abrir o Terminal</h3>
    <p>
        Este projeto deve ser executado no terminal do sistema operacional ou em IDEs Ambientes de Desenvolvimento Integrado (Integrated Development Environments).
    </p>
    <p>
    Para abrir o terminal: 
    <li>
        No Windows, pressione as teclas <code>Windows + R</code>, digite cmd na janela que abrir e confirme.
    </li>
    <li>
        No Linux, pressione as teclas <code>Ctrl + Alt + T</code> para abrir o terminal. 
    </li>
    Com o terminal aberto, navegue até o diretório onde os arquivos foram baixados utilizando o comando <code>cd</code>, por exemplo,
    </p>
    <p> 
    <code>cd C:\VENDEPASS_PBL_Concorrencia-e-Conectividade\Servidor</code>
    </p>
    <h3>Sem docker</h3>
    <p>
        Para executar o projeto sem Docker, primeiramente, é necessário configurar o ambiente de trabalho instalando a linguagem de programação <a href="https://go.dev/doc/install">Go</a>. Em seguida, faça o download dos arquivos disponibilizados neste repositório.
    </p>
    <p>
        Deve ser aberto um terminal para cada código, e cada um possui um diretório diferente.
    </p>
    <p>
        O primeiro arquivo a ser executado deve ser o servidor. Embora o cliente possa ser iniciado primeiro, o servidor é quem comunica o endereço da conexão.
    </p>
    <p> 
    Para iniciar o servidor, insira o seguinte comando no terminal:

    go run server.go

O servidor estará funcionando e exibirá o IP e a porta da conexão. Após o servidor ser iniciado, não será possível interagir diretamente com ele, apenas visualizar suas saídas.

</p>
<p align="center">
<img src="img/Tela inicial do servidor.jpeg" width = "400" />
</p>
<p align="center"><strong>Tela inicial do servidor</strong></p>
<h3>Cliente</h3>
<p>
Para iniciar o cliente, insira o comando no terminal:

    go run client.go

Logo após, será solicitado que insira o endereço da conexão exatamente como foi informado pelo servidor, incluindo todos os pontos separadores.

<p align="center">
<img src="img/solicitacao de endereco.png" width = "400"/>
</p>
<p align="center"><strong>Tela de solicitação para se conectar ao servidor</strong></p>

O menu do cliente será exibido, permitindo que o usuário interaja com o sistema utilizando os números do teclado para selecionar as opções desejadas.

<p align="center">
<img src="img/menu do usuario.png" width = "400"/>
</p>
<p align="center"><strong>Menu do usuário</strong></p>

</p>
    <h3>Com Docker</h3>
    <p>
        Para executar o projeto, com Docker é necessário ter o docker instalado na sua máquina, em seguida baixar os arquivos dispostos neste repositório.
    </p>
    <h3>Servidor</h3>
    <p>
        Para utilizar os arquivos em contêiner é necessário primeiro criar a imagem docker.

Utilize o comando para gerar a imagem:

    docker build -t server .

Para executar a imagem, roda a aplicação em container, utilize:

    docker run -it -p 8088:8088 server

O código será executado e exibirá o endereço e porta, similar ao funcionamento sem docker, e os mesmo procedimentos deverão ser seguido

</p>
    <h3>Cliente</h3>
    <p>
        Para iniciar o cliente, crie a imagem utilizando o comando a seguir:
        
    docker build -t client .
Para executar a imagem: 
    
    docker run -it --rm client

Logo após, será solicitado que você insira o endereço da conexão exatamente como foi informado pelo servidor, incluindo todos os pontos separadores.

O menu do cliente será exibido, permitindo que o usuário interaja com o sistema utilizando os números do teclado para selecionar as opções desejadas.

</p>
    <h3>Comprar/Cancelar Compra</h3>
    <p>
        Na tela que apresenta os nomes das cidades disponíveis para compra ou cancelamento de passagens, é importante que o nome da cidade seja digitado exatamente como está exibido, respeitando letras maiusculas e/ou minúsculas e eventuais assentos.
        <p align="center">
    <img src="img/comprar passagem.png" width = "400"/>
    </p>
    <p align="center"><strong>Comprando passagem</strong></p>
    <p align="center">
    <img src="img/cancelando compra.png" width = "400"/>
    </p>
    <p align="center"><strong>Cancelando compra de passagem</strong></p>
    </p>
</div>

<div id="conclusao">
    <h2>Conclusão</h2>
    <div align="justify">
        <p>
            De acordo com os resultados obtidos em testes em laboratório, é possível afirmar que o produto cumpre com o que se propõe inicialmente. Com a execução correta do servidor e do cliente, é possível realizar e cancelar compras de passagens mesmo que haja a presença de diversos usuários simultâneos, com o servidor encarregado de realizar todo o processamento e tratamento de concorrência para o caso de requisições coincidentes de múltiplos usuários.
        </p>
        <p>
            Ainda é possível aprimorar o sistema, como implementando uma reconexão automática para o cliente e servidor em caso de perda de rede. Porém, o projeto ainda consegue lidar adequadamente com suas outras propostas, sendo assim bem favorável para a sua utilização.
        </p>
    </div>
</div>
