# EcoTrack AI Frontend - Project State & Sprint Plan

## Visão Geral do Projeto
SaaS B2B ESG para rastreamento de emissões de Escopo 3 através de gamificação e um Copiloto de Sustentabilidade.

**Tech Stack Frontend:**
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Zustand (Global State)
- React Query (Data Fetching & Cache)
- Jest & React Testing Library (Unit/Integration Tests)
- Cypress/Playwright (E2E Tests)
- Lucide React (Ícones)
- Radix UI (Acessibilidade)

## Protocolos de Agente
- **[GERAR CHECKPOINT DE CONTEXTO]**: Gera resumo do status atual.
- **[RESTAURAR CONTEXTO - SENTINELOPS]**: Retoma a execução do último checkpoint.

## Sprints e Organização de Branches (MVP Frontend)

O projeto será dividido em **4 Sprints** principais. Ao final de cada Sprint, abriremos um **Pull Request (PR)** para code review e merge na branch `main`.

### Sprint 1: Setup, Fundações e Autenticação (Atual)
**Branch:** `feature/sprint-1-foundation-auth`
- Setup do Next.js, Jest, RTL, Tailwind, arquitetura de pastas.
- Tela de Login (Autenticação JWT, sanitização).
- Layout principal (Sidebar/Bottom Nav) e roteamento base.
- PR: `#1 Foundation & Auth`

### Sprint 2: Dashboard e Gamificação
**Branch:** `feature/sprint-2-dashboard-gamification`
- Tela "Meu Impacto ESG" (Gráficos, Evolução de Carbono).
- Tela "Marketplace de Recompensas" (Listagem e resgate simulado com Optimistic UI).
- Estado Global (Zustand) para gestão de EcoPoints.
- PR: `#2 Dashboard & Gamification`

### Sprint 3: Atividades e Validação Assíncrona (Core ESG)
**Branch:** `feature/sprint-3-activities-async`
- Fluxo de "Atividades" e "Registrar Mobilidade".
- Componente de Upload e Câmera.
- Integração simulada de Envio Kafka (Status "Aguardando", "Sucesso", falha).
- Tela "Meu Impacto CO2" (Histórico de logs).
- PR: `#3 Activities & Async Validation`

### Sprint 4: Copiloto de Sustentabilidade (IA)
**Branch:** `feature/sprint-4-ai-copilot`
- Interface de chat flutuante / página dedicada.
- Implementação de SSE (Server-Sent Events) ou polling para simular streaming da IA.
- Renderização segura de Markdown.
- Tratamento de fallbacks.
- PR: `#4 Sustainability AI Copilot`

## Status Atual
Iniciando a **Sprint 1: Setup, Fundações e Autenticação**.
