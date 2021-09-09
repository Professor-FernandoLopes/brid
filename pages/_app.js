// se eu quiser que algo repita em todas as páginas coloca aqui dentro
// é recarregado toda vez que o usuário troca de tela
// engloba todos os components
// quando a página atualiza as informações do usuário da sessão
// chegarão por meio do pageProps
// Está por fora de toda a página, é o ponto de entrada da aplicação
/* Se o usuário que acessar a home ele vai acessar este componente e
a home ou outro 
component é mostrada no lugar do Component */
// a explicação está na aula configurando fonte externa


import '../styles/globals.scss'
import 'bootstrap/dist/css/bootstrap.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
