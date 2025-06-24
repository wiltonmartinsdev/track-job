# Track Job

<p align="center">
  <img src="./Web/src/assets/logo-readme.svg" alt="Track Job Logo" width="200"/>
</p>

<p align="center">
  Uma aplicação para gerenciar e acompanhar suas candidaturas a vagas de emprego.
</p>

## 📋 Sobre o Projeto

- O Track Job nasceu de uma necessidade real que enfrentei como desenvolvedor Júnior Web FullStack em busca da minha primeira oportunidade na área de programação. Durante minha jornada de candidaturas, percebi a dificuldade de manter um controle organizado das vagas às quais me candidatava, seus requisitos e o status de cada processo seletivo. Foi então que decidi criar uma solução que não apenas resolvesse meu problema pessoal, mas que também pudesse, de alguma forma, ajudar outros programadores em situação semelhante.

- O Track Job representa não apenas minha habilidade técnica como desenvolvedor, mas também minha capacidade de identificar problemas reais e criar soluções eficientes através da programação.

## 🎬 Veja em Ação

<p align="center">
  <img src="./Web/src/assets/track-job-demo.gif" alt="Demonstração do Track Job" width="600"/>
</p>

<p align="center">
  <i>Demonstração das principais funcionalidades do Track Job</i>
</p>

### ✨ Principais Funcionalidades

- **Cadastro e autenticação segura** de usuários com validação em tempo real.
- **Registro detalhado de candidaturas** com informações completas sobre cada vaga.
- **Acompanhamento intuitivo** do status e fase do processo seletivo.
- **Histórico de salários** com suporte a diferentes moedas (inicial e atual).
- **Interface totalmente responsiva** que se adapta perfeitamente a smartphones, tablets e desktops.
- **Feedback visual imediato** através de notificações para todas as ações do usuário.
- **Proteção de dados** com autenticação JWT e sessões seguras.
- **Experiência de usuário fluida** com transições e animações suaves.

## 🎨 Tecnologias utilizadas

### No Front-end
- React
- TypeScript
- Vite
- Vitest
- TailwindCSS
- Shadcn/UI
- React Query
- React Hook Form
- React Router DOM
- React-toastify
- Zod (validação de formulários)
- Axios
- Date-fns

### E no Back-end
- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- Docker & Docker Compose (conteinerização do banco de dados)
- JWT (autenticação)
- Bcrypt (criptografia de senhas)
- Zod (validação de dados)

### Testes
- Vitest
- Testing Library
- Happy DOM


## 🛠️ Configuração do Back-end

### 🛠️ Pré-requisitos

- Node.js - versão v20.18.1 ou superior.
- NPM (Node Package Manager) para instalar as dependências necessárias do projeto.
- Docker e Docker Compose (para o banco de dados PostgreSQL).

### 🛠️ Preparação do ambiente

- Clone o repositório, com o comando abaixo, no seu terminal:
  - Utilizando HTTPS `https://github.com/wiltonmartinsdev/track-job.git` ou
  - Utilizando SSH: `git@github.com:wiltonmartinsdev/track-job.git`.
- No seu editor de preferência acesse o diretório do projeto e entre na pasta API com o comando: `cd API`.
- Certifique-se de ter o Node.js e o NPM instalados em sua máquina e depois digite no terminal o comando abaixo para instalar todas as dependências necessárias do projeto.

      npm install
   
## ⛁ Bando de Dados

- Inicie o contêiner do PostgreSQL usando Docker Compose:
    ```bash
    docker-compose up -d
    ```
    - Este comando iniciará o banco de dados PostgreSQL em segundo plano conforme definido no arquivo docker-compose.yml.

- Execute as Migrates do Prisma:

    ```bash
    npx prisma migrate dev
    ```

## 🔐 Variáveis de Ambiente

- Renomeie o arquivo .env.example para .env e configure as variáveis PORT, DATABASE_URL e AUTH_SECRET para o correto funcionamento da aplicação.

- A variável: DATABASE_URL já esta configurada para se conectar ao PostgreSQL no Docker, conforme o exemplo abaixo:
    ```bash
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
    ```

## 🐳 Verificando o status do contêiner Docker

- Para verificar se o contêiner do PostgreSQL está em execução, execute o seguinte comando:
    ```bash
    docker ps
    ```
    - Isso mostrará uma lista de contêineres em execução, incluindo o PostgreSQL. Certifique-se de que o contêiner do PostgreSQL esteja listado e em execução com o status: Up.

- Caso o contêiner não esteja em execução, você listará os contêineres com o seguinte comando:
    ```bash
    docker ps -a
    ```
    - Isso mostrará uma lista de todos os contêineres, incluindo o PostgreSQL, mesmo que esteja parado.
- Para iniciar o contêiner do PostgreSQL, execute o seguinte comando:
    ```bash
    docker start CONTAINER ID
    ```
    - Substitua CONTAINER ID pelo id do contêiner do PostgreSQL que você deseja iniciar.
    - Após isso, o contêiner do PostgreSQL será iniciado.
    - Agora para verificar se o contêiner do PostgreSQL está em execução, execute o seguinte comando:

        ```bash
        docker ps
        ```
    - Isso mostrará uma lista de contêineres em execução, incluindo o PostgreSQL. Certifique-se de que o contêiner do PostgreSQL esteja listado e em execução com o status: Up.

## 🚀 Execução do Back-end

-   Após instalar todas as dependências e configurações necessárias do projeto, agora poderá executá-lo da seguinte maneira:
-   Digite no terminal o comando abaixo:

          npm run dev

          Após esse comando, o servidor será iniciado e aparecerá a mensagem: "Server is running on port:3333" informando que o servidor esta sendo executado e mostrará a porta de execução. A partir, desta etapa podemos testar a aplicação Back-end.

## 🛠️ Configuração do Front-end

### 🛠️ Pré-requisitos

- Node.js instalado na máquina - versão v20.18.1 ou superior.
- NPM (Node Package Manager) para instalar as dependências necessárias do projeto.

### 🛠️ Preparação do ambiente

- Agora crie uma nova aba no seu terminal e acesse o diretório do projeto e entre na pasta Web com o comando: `cd Web`.
- Depois digite no terminal o comando abaixo para instalar todas as dependências necessárias do projeto.

    ```bash
        npm install
    ```

## 🔐 Variáveis de Ambiente

- O projeto já possui arquivos `.env.development` e `.env.production` configurados.
- Para desenvolvimento local, o arquivo `.env.development` já está configurado para se conectar à API local.

## 🚀 Execução do Front-end

- Após instalar todas as dependências necessárias do projeto, agora poderá executá-lo da seguinte maneira:
- Digite no terminal o comando abaixo:

    ```bash
        npm run dev
    ```

- Após esse comando, o servidor de desenvolvimento será iniciado e aparecerá uma mensagem com a URL local (geralmente http://localhost:5173).
- Acesse essa URL no seu navegador para visualizar a aplicação.

## 🧪 Executando os testes do Front-end

- O projeto inclui testes unitários automatizados para garantir a qualidade do código.
- Acesse o diretório do projeto e entre na pasta Web com o comando: `cd Web`.
- Execute cada comando individualmente no terminal para rodar os testes específicos:

    ```bash
    npm run test:SignIn    # Testa o fluxo de autenticação e login de usuários
    ```
    
    ```bash
    npm run test:SignUp    # Testa o processo de cadastro de novos usuários
    ```
    
    ```bash
    npm run test:LogOut    # Testa a funcionalidade de logout e limpeza de sessão
    ```
    
    ```bash
    npm run test:JobForm   # Testa o formulário de cadastro e edição de candidaturas
    ```
    
    ```bash
    npm run test:jobDelete # Testa a funcionalidade de exclusão de candidaturas
    ```

- Cada teste verifica uma parte específica da aplicação, garantindo que todas as funcionalidades estejam operando corretamente.

## 🚀 Usando a Aplicação

### Cadastro e Login

1. Se o usuário ainda não tiver criado sua contaAcesse a página inicial e clique em "Cadastre-se".
2. Preencha o formulário com seus dados.
3. Após o cadastro, faça login com seu e-mail e senha.

### Gerenciando Candidaturas

1. Na página principal, preencha os detalhes da vaga (empresa, cargo, salário, etc.) e clique em "Cadastrar candidatura" para adicionar uma nova candidatura.
2. Visualize suas candidaturas na lista principal que aparecerá logo abaixo do formulário de cadastro.
3. Clique em uma candidatura para expandir os detalhes.
4. Use os botões de editar ou excluir para gerenciar cada candidatura.

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto.
2. Crie uma branch para sua feature ( `git checkout -b feature/nova-feature`).
3. Faça commit das suas alterações ( `git commit -m 'Adiciona nova feature'`).
4. Faça push para a branch ( `git push origin feature/nova-feature`).
5. Abra um Pull Request.

## 📊 Status do Projeto

- A aplicação encontra-se funcional e pronta para uso, com todas as funcionalidades principais implementadas.
- O projeto está aberto para melhorias e novas funcionalidades podem ser adicionadas no futuro.

## 📄 Licença

[![License: MIT](https://img.shields.io/badge/license-MIT-green)](https://opensource.org/licenses/MIT)

## 📚 Aprendizados

Durante o desenvolvimento do Track Job, melhorei uma série de aprendizados valiosos que aprimoraram cada vez mais minhas habilidades como desenvolvedor fullstack:

- **Arquitetura Fullstack**: Aprimorei a estruturar um projeto completo com front-end e back-end, gerenciando a comunicação entre as camadas e organizando o código de forma modular e escalável.

- **TypeScript em Ambas as Camadas**: A implementação do TypeScript tanto no front-end quanto no back-end me permitiu criar um sistema mais robusto, com tipagem consistente entre as camadas e redução significativa de erros em tempo de desenvolvimento.

- **Autenticação e Segurança**: Implementar JWT para autenticação, bcrypt para criptografia de senhas e proteção de rotas me proporcionou um entendimento mais profundo sobre segurança em aplicações web modernas.

- **Validação de Dados com Zod**: A implementação do Zod tanto no front-end quanto no back-end me permitiu criar um sistema de validação consistente e tipado, garantindo a integridade dos dados em toda a aplicação.

- **Banco de Dados e ORM**: Trabalhar com PostgreSQL e Prisma ORM me proporcionou uma experiência valiosa em modelagem de dados, migrações e consultas eficientes, além de facilitar a manutenção do esquema do banco.

- **Conteinerização com Docker**: A utilização do Docker para o banco de dados me ensinou sobre isolamento de ambientes, configuração de serviços e como criar um ambiente de desenvolvimento mais consistente e reproduzível.

- **Testes Automatizados**: Implementar testes com Vitest e Testing Library me ajudou a garantir a qualidade do código, identificar bugs precocemente e criar componentes mais robustos e confiáveis.

- **UI/UX Responsivo**: Desenvolver uma interface responsiva com TailwindCSS e Shadcn/UI me permitiu criar uma experiência de usuário consistente em diferentes dispositivos, com foco na usabilidade e acessibilidade.

- **Resolução de Problemas Complexos**: Durante o desenvolvimento, enfrentei desafios como sincronização de estado entre cliente e servidor, tratamento de erros em operações assíncronas e otimização de desempenho, o que aprimorou minha capacidade de resolução de problemas.

Esses aprendizados contribuíram não apenas para o desenvolvimento técnico do projeto, mas também para minha evolução como desenvolvedor fullstack, ampliando minha visão sobre arquitetura de software e boas práticas de desenvolvimento.

## 📞 Contato

Se você tiver alguma dúvida ou sugestão, sinta-se à vontade para entrar em contato.

Desenvolvido com ❤️ pelo dev: [Wilton Lira Martins](https://devwiltonmartins.vercel.app)
