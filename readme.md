# Sistema de Finanças com JSON Server

## Uso do JSON Server para Estruturação do Banco de Dados

Este projeto utiliza o **JSON Server** como uma ferramenta para simular uma API RESTful baseada em um arquivo JSON local, permitindo o desenvolvimento e teste de aplicações frontend sem a necessidade de um backend completo. O JSON Server transforma o arquivo `db.json` em uma API REST, fornecendo endpoints para operações CRUD (Create, Read, Update, Delete) sobre os dados.

### Estrutura do Banco de Dados

O banco de dados é definido no arquivo `db.json`, que contém uma coleção chamada `transactions`. Cada transação é representada por um objeto JSON com os seguintes campos:

- `id`: Identificador único da transação (string ou número).
- `name`: Nome ou descrição da transação (string).
- `amount`: Valor da transação (número). Valores positivos representam créditos (receitas), enquanto valores negativos representam débitos (despesas).

Exemplo de estrutura no `db.json`:

```json
{
  "transactions": [
    {
      "id": "1",
      "name": "Freela",
      "amount": 300
    },
    {
      "name": "Salário",
      "amount": 3200,
      "id": "3"
    }
  ]
}
```

### Como Executar o JSON Server

Para iniciar o servidor, execute o comando:

```bash
npm run json-server
```

Isso iniciará o servidor na porta 3000 (por padrão), expondo endpoints como:
- `GET /transactions`: Lista todas as transações.
- `POST /transactions`: Cria uma nova transação.
- `PUT /transactions/:id`: Atualiza uma transação existente.
- `DELETE /transactions/:id`: Remove uma transação.

O JSON Server persiste automaticamente as alterações no arquivo `db.json`, simulando um banco de dados persistente.

## Funções JavaScript para Interação com o JSON Server

O código JavaScript em `index.js` implementa a lógica de interação com a API do JSON Server, gerenciando o estado das transações no frontend e sincronizando com o backend simulado. As principais funções relacionadas ao JSON Server são descritas abaixo:

### `fetchTransactions()`

- **Descrição**: Função assíncrona que realiza uma requisição GET para `/transactions` no JSON Server, retornando um array de transações.
- **Uso**: Utilizada para carregar os dados iniciais do banco de dados ao iniciar a aplicação.

### `saveTransactions(ev)`

- **Descrição**: Função assíncrona que lida com o envio do formulário para criar ou editar transações. Se o campo `id` estiver presente, realiza uma requisição PUT para atualizar a transação; caso contrário, faz um POST para criar uma nova.
- **Parâmetros**: Recebe o evento de submit do formulário.
- **Uso**: Vinculada ao evento de submit do formulário, permitindo a criação e edição de transações via API.

### `createDeleteTransactionBtn(id)`

- **Descrição**: Cria um botão de exclusão para uma transação específica. Ao clicar, realiza uma requisição DELETE para `/transactions/:id` no JSON Server e atualiza o estado local.
- **Parâmetros**: `id` da transação a ser excluída.
- **Uso**: Integrado na renderização de cada transação para permitir remoção via API.

### `setup()`

- **Descrição**: Função assíncrona executada no carregamento da página (DOMContentLoaded). Carrega as transações via `fetchTransactions()`, adiciona ao array local `transactions` e renderiza na interface.
- **Uso**: Inicializa a aplicação sincronizando o estado local com o JSON Server.

Essas funções garantem a sincronização entre o frontend e o backend simulado, utilizando Fetch API para realizar requisições HTTP aos endpoints do JSON Server. O estado local (`transactions`) é mantido em memória para otimizar a renderização e cálculos, como o saldo total.</content>
<parameter name="filePath">c:\Users\User\Downloads\Estudos\CursoOnebitcode\Curso-onebitcode\Javascript\exercicios\consumindo-apis\sistema-financas-json-server\readme.md
