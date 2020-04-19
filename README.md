<h1>Teste API Rest Pokémon - ADTSys</h1>

<h3>Tecnologias usadas no projeto</h3>
Ambiente docker com framework docker-compose<br/>
Back-end NodeJs com framework Express.<br/>
Front-end Html, javascript, ajax e Jquery index.Html na raiz do projeto

<h3>Requisitos para rodar projeto</h3>
Docker é extremamente necessário porque APPID dp OpenWeatherMap
 esta declarada como variável de ambiente no dockerfile <strong>ENV PASSWORD_WEATHER</strong>.<br/>
 Instale nodejs e npm para instalar dependencias e rodar os testes.

<h3>Passo a passo para iniciar projeto 
<h4>1° Clone o projeto</h4> 
git clone https://github.com/20100000/teste-adtsys.git<br/>
cd teste-adtsys
<h4>2° Instale as dependerias</h4>  
Ma raiz do projeto
crie node_module com as dependências.<br/>
npm install

<h4>3° Iniciar projeto</h4>
strat back-end com docker-compose <br/>
docker-compose up<br/>
<em>ou</em><br/>
sem docker-compose<br/>
docker build -t node10 . <br/>
docker run -p 3000:3000 -d node10<br/>

node10 e o nome da image, se preferir coloque o nome que quiser.<br/>
Rode o contener na porta 3000 por causa do front-end url do ajax ta apontando para o mesmo.<br/>


click em index.html na raiz do projeto, ou seja, execute a inde.html no navegador ela e o front-end 