## Contacts Client (React + TypeScript + Vite)

Aplicação front-end para gerenciamento de contatos, construída com React 19, TypeScript e Vite, utilizando Redux Toolkit para estado global, Axios para comunicação com a API, Radix UI para componentes acessíveis e Tailwind CSS para estilização utilitária.

O back-end correspondente está disponível em: [contacts-api](https://github.com/dfsilvadev/contacts-api).

### Sumário
- **Visão Geral**
- **Arquitetura**
- **Fluxo de Dados**
- **Principais Funcionalidades**
- **Padrões e Convenções**
- **Configuração e Execução**
- **Scripts Disponíveis**
- **Qualidade, Acessibilidade e Performance**

## Visão Geral
O projeto lista, cria, edita, filtra, pesquisa e remove contatos, com suporte a paginação e categorização. A UI utiliza componentes desacoplados e controladores (hooks) que orquestram chamadas assíncronas via thunks do Redux Toolkit.

## Arquitetura
Estrutura simplificada dos diretórios mais relevantes:

```
src/
  app/
    App.tsx              # Provider do Redux e layout raiz
    store.ts             # Configuração do Redux Toolkit
  content/
    contacts.tsx         # Página/Seção principal de contatos
    hooks/
      useContactsContentController.ts
  features/
    contacts/
      slices/contactSlices.ts      # Thunks e reducers de contatos
      services/contactServices.ts  # Camada de API para contatos
      selectors/contactSelectors.ts
    categories/
      slice/categorySlices.ts      # Thunks e reducers de categorias
      service/categoryServices.ts  # Camada de API para categorias
    ui/
      slices/uiSlices.ts           # Estado de modal (open/type/content)
  components/
    ...                            # Tabela, Header, Formulários, Modal, etc.
  hooks/
    useAppDispatch.ts
    useAppSelector.ts
  libs/
    axios/axiosInstance.ts         # Instância axios com baseURL
    axios/axiosService.ts          # Classe fábrica de Axios
    redux/handleThunkError.ts      # Normalização de erros em thunks
    redux/checkAndRunPostAction.ts # Pós-ação condicional após thunk
    helpers/                       # Datas, máscaras, etc.
    utils/cn.ts                    # Merge de classes (clsx + tailwind-merge)
```

### Camadas
- **Apresentação (components, content)**: componentes visuais (Header, Table, Pagination, Modal, etc.) e a seção `ContactsContent` que recebe dados do controlador.
- **Controladores (hooks)**: `useContactsContentController` gerencia paginação, dispara thunks (`fetchContacts`, `deleteContact`, `fetchCategories`) e integra com o estado de UI (modal).
- **Estado Global (Redux Toolkit)**: slices para `contact`, `category` e `ui`; seletores memorizados com `createSelector`.
- **Serviços (Axios)**: `ContactServices` e `categoryService` encapsulam chamadas à API, usando a instância de Axios configurada.
- **Utilitários/Helpers**: datas (`DateHelper`), máscara de telefone (`mask.ts`), composição de classes (`cn.ts`) e normalização de erros (`handleThunkError`).

## Fluxo de Dados
1. `App.tsx` registra o `Provider` do Redux e renderiza `ContactsContent`.
2. `useContactsContentController` efetua:
   - `fetchContacts({ page, limit })` no mount e a cada mudança de página.
   - `fetchCategories()` no mount.
   - `deleteContact(contactId)` seguido de `fetchContacts` e `closeModal` via `checkAndRunPostAction` quando a deleção é bem-sucedida.
3. `contactSlices.ts` define thunks (findAll, findOne, create, update, delete, search, filter) e gerencia `loading`, `success`, `error`, `list`, `selected`.
4. `contactSelectors.ts` provê seletores memorizados para `details` e `pagination` com fallback seguro.
5. `components` recebem dados já moldados e disparam callbacks do controlador (ex.: `onChangePage`).

## Principais Funcionalidades
- **Listagem com paginação**: `fetchContacts` + seletor de paginação.
- **CRUD de contatos**: thunks `createContact`, `updateContact`, `deleteContact` via `ContactServices`.
- **Pesquisa e Filtro**: thunks `searchContacts` e `filterContacts` com querystring construída e `URLSearchParams`.
- **Categorias**: `fetchCategories` popula opções para formulário/filtro.
- **Modais de criação/edição/remoção**: estado controlado por `uiSlices` (`openModal`, `closeModal`).
- **Máscara e formatação de telefone**: helpers para input e exibição.

## Padrões e Convenções
- **TypeScript forte** em slices, serviços e seletores.
- **Redux Toolkit**: `createAsyncThunk` + `createSlice`; reset de estado com `reset` em slices.
- **Tratamento de erros**: `handleThunkError` converte erros em `ErrorResponse` estável.
- **Axios**: instância única via `axiosInstance.ts` usando `VITE_API_BASE_URL`.
- **Estilização**: Tailwind CSS; util `cn` para mesclar classes com `clsx` e `tailwind-merge`.
- **Acessibilidade**: componentes de modal baseados em Radix UI.
- **Formulários**: `react-hook-form` e validadores com `zod` disponíveis (onde aplicável).

## Integração com o Back-end
- Repositório: [contacts-api](https://github.com/dfsilvadev/contacts-api)
- Variável de ambiente utilizada no front-end:
  - `VITE_API_BASE_URL` apontando para a URL base da API (ex.: `http://localhost:3333`).

## Configuração e Execução
1. Pré-requisitos: Node.js LTS e pnpm/yarn/npm.
2. Clone este repositório e instale dependências:
   - `yarn` ou `npm install` ou `pnpm i`
3. Crie um arquivo `.env` na raiz com:
```
VITE_API_BASE_URL=http://localhost:3333
```
4. Rode a aplicação em desenvolvimento:
```
yarn dev
```
5. Build de produção:
```
yarn build
```
6. Preview do build:
```
yarn preview
```

## Scripts Disponíveis
- `dev`: inicia o Vite em modo desenvolvimento.
- `build`: compila TypeScript e gera build de produção do Vite.
- `preview`: serve o build localmente.
- `lint`: executa ESLint no diretório `src` com `--max-warnings=0`.
- `format`: formata os arquivos de `src` com Prettier.
- `prepare`: prepara hooks do Husky.
- `tailwind:init`: inicializa Tailwind (config e PostCSS).

## Qualidade, Acessibilidade e Performance
- **Linting e Formatação**: ESLint + Prettier (com integração Tailwind) e Husky/Lint-Staged para hooks de commit.
- **Seletores memorizados**: `createSelector` evita re-renderizações desnecessárias.
- **Split de responsabilidades**: serviços de API isolados; slices apenas orquestram estado.
- **UX**: estados de vazio (sem contatos), feedback de `loading`/`error` no estado global (pronto para UI refletir).
- **A11y**: Radix UI garante semântica e foco adequado em modais.

---

Qualquer dúvida, consulte o código em `src/` e o back-end em [contacts-api](https://github.com/dfsilvadev/contacts-api).
