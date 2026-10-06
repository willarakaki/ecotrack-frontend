# 🌱 EcoTrack AI — Frontend

🔗 **Acesse o repositório do Backend (API & IA) aqui:** [willarakaki/ecotrack-backend](https://github.com/willarakaki/ecotrack-backend)

Interface web do **EcoTrack AI**, um SaaS B2B de ESG para rastreamento de emissões de **Escopo 3** por meio de **gamificação** e de um **Copiloto de Sustentabilidade** com IA.

O colaborador registra ações sustentáveis (mobilidade, home office, resíduos) enviando uma evidência; uma IA valida e converte o CO₂ evitado em **EcoCoins**, que podem ser trocados por recompensas. Gestores acompanham o ROI ESG em um painel administrativo.

> O backend (Core Java + serviço de IA Python) está em [`ecotrack-ai`](../ecotrack-ai/README.md).

---


## ⚡ Otimizações e Performance (UX)

> **Nota:** Estes números foram extraídos de testes reais de benchmark local na máquina de desenvolvimento.

O frontend do EcoTrack AI foi desenhado para mascarar a latência natural de sistemas baseados em Inteligência Artificial, priorizando a experiência do usuário (UX):

* **Redução de Latência no TTFT (Time-To-First-Token) em 53%:** O chat do Copiloto utiliza **Server-Sent Events (SSE)**. Uma requisição tradicional faria o usuário aguardar **~8.3 segundos** olhando para um loading infinito. Com SSE, a interface renderiza a primeira palavra em **~3.9 segundos** (3909ms) e continua fazendo stream, mantendo o engajamento alto.
* **Atualização Otimista (Optimistic UI):** Ao resgatar uma recompensa ou publicar uma evidência via Kafka, o Zustand altera a interface instantaneamente (ex: debitando as EcoCoins), respondendo à interação em milissegundos enquanto o backend resolve a transação (229ms) no background.
* **Arquitetura Assíncrona:** A interface não é bloqueada pelo processamento de imagem OCR. O usuário submete a foto e recebe a notificação depois que o Kafka e o worker Python terminam o processamento.
---

## 📑 Sumário

- [Funcionalidades](#-funcionalidades)
- [Stack](#-stack)
- [Estrutura do projeto](#-estrutura-do-projeto)
- [Rotas](#-rotas)
- [Integração com o backend](#-integração-com-o-backend)
- [Como rodar](#-como-rodar)
- [Scripts](#-scripts)
- [Testes](#-testes)
- [Estado atual e limitações](#-estado-atual-e-limitações)

---

## ✨ Funcionalidades

**Área do colaborador**
- 🔐 Login com redirecionamento por papel (`ADMIN_RH` → painel gerencial, demais → home)
- 🏠 Home com saldo de EcoCoins, streak, CO₂ poupado, mural de reconhecimento e meta ativa
- 🚌 Registro de atividades (Mobilidade, Home Office, Gestão de Resíduos) com **upload/câmera de evidência**
- 🎁 Marketplace de recompensas (resgate com atualização otimista de saldo)
- 📊 Impacto: histórico de CO₂ e ranking por departamentos
- 🎯 Missões e desafios (quiz diário, desafio semanal)
- 👤 Perfil e configurações
- 🔔 Painel de notificações
- ✨ **Copiloto de IA**: chat flutuante com streaming (SSE), Markdown e aviso visual quando um guardrail é acionado

**Painel gerencial (`/admin`)**
- ROI ESG (dashboard), Auditoria de Escopo 3, Cultura e Engajamento, Metas e Diretrizes, Configurações do Tenant (white-label e motor de IA)

---

## 🧰 Stack

| Categoria | Tecnologia |
|---|---|
| Framework | **Next.js 16** (App Router) + **React 19** |
| Linguagem | TypeScript 5 |
| Estilo | Tailwind CSS 4, `@tailwindcss/typography`, `clsx`, `tailwind-merge` |
| Estado global | Zustand 5 |
| UI / UX | Radix UI (Slot), Lucide React, Framer Motion, canvas-confetti |
| Conteúdo | `react-markdown` (renderização das respostas do Copiloto) |
| HTTP | `fetch` nativo (`axios` instalado) |
| Testes | Jest 30, React Testing Library, user-event, jest-dom |
| Qualidade | ESLint 9 + `eslint-config-next` |

> ⚠️ Esta versão do Next.js possui mudanças em relação às versões anteriores. Antes de alterar convenções ou APIs do framework, consulte a documentação local em `node_modules/next/dist/docs/` (veja [`AGENTS.md`](./AGENTS.md)).

---

## 📁 Estrutura do projeto

Organização por **domínios** (feature-based) + camada compartilhada.

```
ecotrack-ai-frontend/
├── public/                     # logo.png e assets estáticos
├── src/
│   ├── app/                    # Rotas (App Router)
│   │   ├── layout.tsx          # Layout raiz
│   │   ├── page.tsx            # Entrada (/)
│   │   ├── login/              # Tela de login
│   │   ├── (dashboard)/        # Área do colaborador (grupo de rotas)
│   │   │   ├── home/  activities/  marketplace/  impact/
│   │   │   ├── challenges/  profile/  settings/
│   │   │   └── activities/{mobility,energy,waste}/
│   │   └── (admin)/admin/      # Painel gerencial
│   │       ├── dashboard/  audit/  engagement/  goals/  settings/
│   │
│   ├── domains/                # Lógica e UI por domínio
│   │   ├── auth/ui/            # login-form
│   │   ├── activities/ui/      # camera-uploader
│   │   └── copilot/ui/         # copilot-widget (chat com streaming)
│   │
│   └── shared/
│       ├── api/types.ts        # Tipos/DTOs compartilhados com o backend
│       ├── store/use-eco-store.ts  # Store Zustand (pontos, feed, metas, evidências)
│       └── ui/                 # button, input, animated-number, app-layout
│
├── jest.config.js / jest.setup.js
├── next.config.ts · tsconfig.json · eslint.config.mjs · postcss.config.mjs
├── AGENTS.md · CLAUDE.md · agent.md   # Instruções e estado das sprints (para agentes)
└── .env.local                  # URLs dos backends
```

Alias de importação: `@/` → `src/`.

---

## 🧭 Rotas

| Rota | Descrição |
|---|---|
| `/` | Página inicial |
| `/login` | Autenticação |
| `/home` | Dashboard do colaborador |
| `/activities` | Lista de atividades disponíveis |
| `/activities/mobility` · `/energy` · `/waste` | Registro por tipo de atividade |
| `/marketplace` | Recompensas e resgates |
| `/impact` | Histórico de impacto e ranking de departamentos |
| `/challenges` | Missões e desafios |
| `/profile` · `/settings` | Perfil e configurações |
| `/admin/dashboard` | Visão geral do ROI ESG |
| `/admin/audit` | Auditoria de Escopo 3 |
| `/admin/engagement` | Cultura e engajamento |
| `/admin/goals` | Metas e diretrizes ESG |
| `/admin/settings` | Configurações do tenant (white-label / IA) |

---

## 🔌 Integração com o backend

O frontend conversa com **dois serviços**:

| Serviço | URL padrão | Uso |
|---|---|---|
| Core Java (Spring Boot) | `http://localhost:8080` | Login e submissão de evidências |
| AI Service (FastAPI) | `http://localhost:8001` | Chat do Copiloto (SSE) |

| Chamada | Endpoint | Onde |
|---|---|---|
| Login | `POST {JAVA}/api/v1/auth/login` | `domains/auth/ui/login-form.tsx` |
| Enviar evidência | `POST {JAVA}/api/v1/evidences` → `202 Accepted` | `use-eco-store.ts` (`submitEvidence`) |
| Chat com streaming | `POST {AI}/api/v1/copilot/chat/stream` | `domains/copilot/ui/copilot-widget.tsx` |

**Sessão**: após o login, `userId`, `tenantId` e `name` são guardados no `localStorage` (`user-id`, `tenant-id`, `user-name`) e enviados nos headers `X-Tenant-ID` / `X-User-ID`. Saldo e CO₂ iniciais vêm da resposta do login (`setUserStats`).

**Streaming do Copiloto**: lê o corpo da resposta como stream, interpreta linhas `data: {...}` e finaliza em `data: [DONE]`. Cada chunk traz `content`, `blocked_by_guardrail` e `rag_context_used`; mensagens bloqueadas são destacadas na UI.

Os tipos compartilhados (`ChatRequest`, `ChatResponse`, `EvidenceRequest`, …) ficam em [`src/shared/api/types.ts`](./src/shared/api/types.ts).

---

## 🚀 Como rodar

### Pré-requisitos
- Node.js 20+ e npm
- Backend em execução (veja o [README do backend](../ecotrack-ai/README.md)): Core em `:8080` e AI Service em `:8001`

### Passo a passo

```bash
# 1. instalar dependências
npm install

# 2. configurar variáveis (já existe um .env.local de exemplo)
#    NEXT_PUBLIC_API_JAVA_URL=http://localhost:8080
#    NEXT_PUBLIC_API_AI_URL=http://localhost:8001

# 3. subir em desenvolvimento
npm run dev
```

Acesse **http://localhost:3000**.

### Credenciais de desenvolvimento (seed do backend)

| E-mail | Senha | Papel |
|---|---|---|
| `willian.arakaki@empresa.com.br` | `senha123` | `ADMIN_RH` → `/admin/dashboard` |
| `joao.silva@empresa.com.br` | `senha123` | `EMPLOYEE` → `/home` |
| `maria.souza@empresa.com.br` | `senha123` | `EMPLOYEE` → `/home` |

### Variáveis de ambiente

| Variável | Default | Descrição |
|---|---|---|
| `NEXT_PUBLIC_API_JAVA_URL` | `http://localhost:8080` | URL do Core Java |
| `NEXT_PUBLIC_API_AI_URL` | `http://localhost:8001` | URL do AI Service (usada pelo Copiloto) |

---

## 📜 Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm start` | Servidor de produção (após `build`) |
| `npm run lint` | ESLint |
| `npm test` | Jest |
| `npm run test:watch` | Jest em modo watch |
| `npm run test:coverage` | Jest com cobertura |

---

## ✅ Testes

Jest + React Testing Library (ambiente `jsdom`).

| Arquivo | Cobre |
|---|---|
| `domains/auth/ui/__tests__/login-form.test.tsx` | Fluxo de login |
| `domains/activities/ui/__tests__/camera-uploader.test.tsx` | Upload/câmera de evidência |
| `domains/copilot/ui/__tests__/copilot-widget.test.tsx` | Chat e streaming |
| `shared/store/__tests__/use-eco-store.test.ts` | Store Zustand |

```bash
npm test
```

---

## ⚠️ Estado atual e limitações

- **Dados parcialmente mockados**: pontos, feed, resgates, metas, quiz e ranking vivem no estado local (Zustand) e se perdem ao recarregar; os cartões do painel `/admin` usam valores fixos. O backend ainda não expõe endpoints de listagem para essas telas.
- **Resgate e elogios entre colegas** (`redeemReward`, `sendPeerPraise`) atualizam apenas o estado local — ainda não chamam `/marketplace/redemptions` nem `/wallet/transfer`.
- **URLs hardcoded**: `login-form.tsx` e `use-eco-store.ts` usam `http://localhost:8080` direto, em vez de `NEXT_PUBLIC_API_JAVA_URL` — centralizar em um cliente de API antes de ir para outros ambientes.
- **Autenticação**: o backend retorna token mock e o frontend não protege rotas nem envia `Authorization`; a identidade é passada por headers `X-*`. Falta middleware de proteção de rotas por papel.
- Dependências planejadas no `agent.md` e ainda não instaladas: React Query e testes E2E (Cypress/Playwright).
- `package.json` ainda usa o nome temporário `ecotrack-temp`.

---

## 🗺 Roadmap (sprints)

1. ✅ Fundação e autenticação
2. ✅ Dashboard e gamificação
3. ✅ Atividades e validação assíncrona
4. 🚧 Copiloto de sustentabilidade (IA)

---

## 📄 Licença

Veja [LICENSE](./LICENSE).
