
<h1> LivroTech </h1>

  

<h3>Facilitador: </h3>

<table>

<tbody>

<tr>

<td>Gabriel M. Carneiro</td>

<td><a><b>gabriel.carneiro@oceanbrasil.com</b></a></td>

</tr>
</tbody>

</table>

  

<h2> Back-end</h2>

<h3>Ferramentas</h3>

  

- [ ] <a  href="https://www.mysql.com/">MySQL</a>

- [ ] <a  href="https://www.python.org">Python 3.x</a>

- [ ] <a  href="https://nodejs.org/en/download/">NodeJS</a>

- [ ] <a  href="https://www.npmjs.com/get-npm">NPM</a> ou <a  ref="https://yarnpkg.com/lang/en/">Yarn</a>

- [ ] <a  href="https://loopback.io/">Loopback.JS</a>

  

<h3> Instruções </h3>

- No diretório em que deseja clonar o projeto e rode o comando
``` sh 
$ git clone https://github.com/GabrielCarneiroDeveloper/backend_course.git
```

- Crie um schema no <b>MySQL</b> chamado comicbooks.

- Importe o arquivo <b>comicbooks.sql</b>, o qual se encontra em /backend.

- Abra o terminal, navegue até a pasta em /backend/api/ e rode o seguinte se estiver usando <b>npm</b>.

``` sh
$ npm install
```

ou se estiver usando **yarn** rode o seguinte comando
``` sh
$ yarn
```

- Configure o arquivo <b>datasources.json</b> localizado em **backend/api/server** com dados referentes ao seu banco de dados.

- Para rodar o projeto, execute o comando abaixo em **/backend/api/**

``` sh
$ node .
```

<h2> Front-end</h2>

<h3>Ferramentas</h3>

*  <a  href="https://vuejs.org/">VueJS</a>
	* <a  href="https://vuex.vuejs.org/guide/">Vuex</a>
	*	<a  href="https://www.npmjs.com/package/vue-session">VueSession</a>
	*	<a  href="https://router.vuejs.org/">VueRouter</a>
	*	<a  href="https://baianat.github.io/vee-validate/">VeeValidate</a>
	
*  <a  href="https://bulma.io/">Bulma CSS</a>
* <a  href="https://buefy.github.io/">Buefy</a>
* <a  href="https://github.com/axios/axios">Axios</a>

<h3> Requisitos</h3>

- [ ] Ter as ferramentas requisitadas da primeira parte do intensivo (curso de Back-end) instaladas e o projeto de Back-end rodando.

<h3> Instruções </h3>

- Os dados consumidos por esse projeto são servidos pelo web service **que consta na primeira parte do intensivo**. Por tanto, **primeiramente execute o passo a passo que consta no projeto de backend** e rode o comando abaixo para iniciá-lo: 

``` sh 
$ node .
```

- Com o servidor rodando, no terminal, navegue até a pasta **/frontend/** e rode o comando:

``` sh 
$ npm install
```

- Ao terminar a instalações de todas as dependências, na mesma pasta, rode o comando: 

``` sh 
$ npm start	
```

- Caso o navegador não abra automaticamente após rodar o comando acima, acesse o endereço <b>http://localhost:8080</b>