# LojaVendas

Este projeto foi desenvolvido utilizando o **[Angular CLI](https://github.com/angular/angular-cli) — versão 20.3.4**.

—

## Servidor de Desenvolvimento

Para iniciar o servidor local de desenvolvimento, execute:

```bash
ng serve
```

Após a execução, acesse em seu navegador:

`http://localhost:4200/`

A aplicação será recarregada automaticamente sempre que houver modificações nos arquivos de origem.

—

## Geração de Código (Code Scaffolding)

O Angular CLI oferece ferramentas robustas de scaffolding para gerar componentes, diretivas e pipes de forma ágil.

Para gerar um novo componente, utilize:

```bash
ng generate component nome-do-componente
```

Para visualizar todas as opções disponíveis (como components, directives ou pipes), utilize:

```bash
ng generate --help
```
—

## Build do Projeto

Para compilar e gerar os artefatos de build, execute:

```bash
ng build
```

Os arquivos gerados serão armazenados na pasta `dist/`.

Por padrão, o build de produção realiza otimizações para melhorar o desempenho e a velocidade da aplicação.

—

## Como Utilizar a API

Em uma pasta de sua preferência, execute no Git Bash:

```bash
git clone https://github.com/sabrinadeandrade/nexy.git
```

No IntelliJ, acesse File > Open

Selecione a pasta clonada nexy

Atualize as dependências Maven se necessário

Certifique-se de que a JDK 17 está configurada no projeto

No topo do IntelliJ, clique em Edit Configurations

Ajuste conforme o padrão Spring Boot

Clique em Apply e depois em OK

Clique no botão Run

Quando a execução iniciar, a API estará rodando localmente em ` http://localhost:8080/ `

Pronto!
A API estará disponível para integração com o front-end, envio de requisições HTTP e consumo dos endpoints configurados no projeto.

—

## Testes Unitários

Para executar testes unitários com o Karma:

```bash
ng test
```

## Testes de Ponta a Ponta (E2E)

Para executar testes de ponta a ponta (end-to-end):

``` bash
ng e2e
```

Observação: O Angular CLI não inclui um framework de E2E por padrão. É necessário integrar uma ferramenta de testes de sua escolha.

—

## Recursos Adicionais

Para mais informações sobre o Angular CLI e sua documentação completa de comandos, acesse:

` [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) `

—

# Funcionalidades do Projeto

## Área Pública (Cliente)

A interface do cliente permite ao usuário navegar pela loja, gerenciar seu carrinho e finalizar compras.

* **Autenticação:** O cliente pode se cadastrar, fazer login e logout.
    ![Tela de Login](screenshots/login.PNG)

* **Home Page:** Apresenta os "Produtos em Destaque" da loja.
    ![Tela Home](screenshots/home.jpg)

* **Catálogo de Produtos:** Exibe todos os produtos disponíveis em grades, com sistema de categorias na lateral.
    ![Página de Produtos](screenshots/produtos.jpg)

* **Carrinho de Compras:** O usuário pode adicionar produtos ao carrinho, ajustar a quantidade e ver o "Resumo do Pedido".
    ![Carrinho de Compras](screenshots/carrinho.PNG)

* **Páginas Estáticas:** Seções informativas como "Sobre nós", "Nossa Missão" e "Nossa Visão".
    ![Página Sobre](screenshots/Sobre.jpg)

* **Histórico de Pedidos:** O cliente pode acessar a página "Meus Pedidos" para consultar o histórico de suas compras.
    ![Página Meus Pedidos](screenshots/meus%20pedidos.PNG) 
    

* **Checkout Multi-etapas:** Um fluxo de finalização de compra claro:
    1.  **Endereço de Entrega:** O cliente seleciona um endereço salvo ou cadastra um novo.
        ![Checkout - Endereço](screenshots/finalizar%20compra%20-%20endereco.PNG)
    2.  **Método de Pagamento:** O cliente seleciona um cartão salvo ou adiciona um novo.
        ![Checkout - Pagamento](screenshots/finalizar%20compra%20-%20metodo%20de%20pagamento.PNG)

## Área Administrativa (Gerenciamento)

O painel de gerenciamento é uma área restrita para os administradores da loja gerenciarem o conteúdo e as operações do e-commerce.

* **Gerenciamento de Produtos (CRUD):** O administrador pode cadastrar, visualizar, editar e remover produtos do catálogo.
    ![Painel de Gerenciamento de Produtos](screenshots/admin%20-%20gerenciamento.PNG)

—

# Progresso do Projeto

## Semana 1 

* Organização inicial das tarefas no Trello ` (https://trello.com/b/AhUYkmES) ` (Ruthe)


* Planejamento visual e estrutural do sistema


* Definição do logotipo, nome, cores e slogan


* Estruturação inicial das rotas e conexão entre páginas


* Pesquisa de referências visuais para o estilo do projeto


## Semana 2 

* Implementação da estrutura principal das páginas (Sabrina e Maria)


* Configuração inicial das rotas (Maria)


* Início da integração front-end com o back-end em Java + Banco de Dados (Jaine)


* Design dos produtos e organização das tarefas de design (Ruthe e Ana Clara)


## Semana 3 

* Conexão com o banco de dados e implementação de funcionalidades CRUD e autenticação no sistema do funcionário (Jaine)


* Refatoração do front-end e início da interface do cliente (Sabrina e Maria)


* Gerenciamento de branches e acompanhamento da organização no Trello (Ruthe)


* Criação de imagens e conteúdos dos cards de produtos + atualizações no README.md, Gantt `(https://docs.google.com/spreadsheets/d/1t5d2EcnMH-ED50kyNIzeqqRZ8tUf_5rOvWPzQcpSsBw/edit?usp=sharing)`, e documentação (Ana Clara)


## Semana 4

* População do banco com imagens e dados de produtos (Ruthe)


* Deploy do back-end no Render (Jaine)


* Atualização e revisão contínua da documentação técnica (Ana Clara)


## Semana 5 

* Integração com API de pagamento (Ruthe, Ana Clara e Jaine)


* Testes finais das funcionalidades e rotas (Ruthe e Jaine)


* Ajustes de responsividade e usabilidade na interface (Sabrina e Maria)


* Revisão geral do projeto para entrega final (Ruthe, Ana Clara e Jaine)

