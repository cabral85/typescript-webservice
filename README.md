## STOCK-MS

Aplicação construída com o objetivo de agilizar a vida de pequenas lojas na atualização de estoque e nas vendas online.

### Como Rodar?

Com o docker compose você conseguirá executar o rabbitmq e o stock-service
docker-compose up

### Como rodar o serviço?

#### Para executar o serviço siga os passos abaixo

$npm i
$npm run start
$pip install pandas
$python pre-load/pre-load.py

#### O serviço está disponivel na porta 7000


#### Pontos a melhorar e falha:

* Não consegui terminar a integração com o rabbitmq, tentei seguindo alguns guia porém depois de algum tempo não consegui.
* O código está em typescript pois apesar de já ter estudado node não estou tão habituada, então a orientação que consegui para desenvolver foi com alguém que tinha conhecimento em typescript.
* Tinha a ideia de fazer a separação do projeto em microserviços, ficando um para stock e outro para product, porém também ainda não estou tão habituada a microserviços
* Docker é algo que ainda estou estudando, eu tentei subir a aplicação no docker-compose também porém não consegui, o Dockerfile está criado, porém não sei qual foi o ponto de falha
* A pré carga do banco de dados eu não consegui pensar em uma maneira de fazer com node então pedi ajuda ao meu marido, ele fez em python porém não conseguimos integra-lo ao docker-compose também