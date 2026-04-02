# Controle de Estoque (Controller Stock)

Aplicativo mobile para gerenciamento de lojas e produtos, criado para substituir o controle manual em planilhas por um fluxo centralizado, rastreavel e de manutencao simples.

## Ferramentas Utilizadas

![Expo](https://img.shields.io/badge/Expo-SDK%2054-000020?logo=expo&logoColor=white)
![React](https://img.shields.io/badge/React-19-20232A?logo=react&logoColor=61DAFB)
![React Native](https://img.shields.io/badge/React%20Native-0.81-20232A?logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Expo Router](https://img.shields.io/badge/Expo%20Router-6-000020?logo=expo&logoColor=white)
![Gluestack UI](https://img.shields.io/badge/Gluestack%20UI-Design%20System-111827)
![NativeWind](https://img.shields.io/badge/NativeWind-4.2-38BDF8)
![Zustand](https://img.shields.io/badge/Zustand-5-6B4F3A)
![MirageJS](https://img.shields.io/badge/MirageJS-Mock%20API-F25D27)
![Jest](https://img.shields.io/badge/Jest-Testes-C21325?logo=jest&logoColor=white)

## Problema

O controle de estoque era feito em planilhas, o que causava:

- dados desatualizados com frequencia
- maior risco de erro no cadastro
- dificuldade para rastrear alteracoes

## Solucoes Que a Aplicacao Resolve

- Centraliza cadastro e consulta de lojas e produtos.
- Permite criar, listar, editar e remover lojas.
- Permite criar, listar, editar e remover produtos por loja.
- Exibe relacao de produtos vinculados por unidade.
- Entrega filtros para busca de lojas e produtos.
- Simula API local para desenvolvimento sem backend externo.
- Estrutura o projeto com hooks e componentizacao para evolucao continua.
- Reduz regressao com testes unitarios em regras de estado.

## Telas do Aplicativo

As imagens abaixo mostram os principais fluxos do app:

| Painel Principal | Lista de Lojas | Lista de Produtos |
|:---:|:---:|:---:|
| <img src="./assets/screenshots/painel.png" width="220"> | <img src="./assets/screenshots/lojas.png" width="220"> | <img src="./assets/screenshots/produtos.png" width="220"> |

| Nova Empresa | Editar Loja | Editar Produto |
|:---:|:---:|:---:|
| <img src="./assets/screenshots/empresa-form.png" width="220"> | <img src="./assets/screenshots/loja-form.png" width="220"> | <img src="./assets/screenshots/produto-form.png" width="220"> |

## Instalacao e Execucao

Se estiver usando pnpm, substitua os comandos npm por pnpm.

1. Acesse a pasta do projeto:

```bash
cd provertec/controler-stock
```

2. Instale as dependencias:

```bash
npm install
# ou pnpm install
```

3. Inicie o Expo:

```bash
npx expo start
# ou npm start
```

4. Abra o app:

- Em dispositivo fisico: use o Expo Go e leia o QR code.
- Em emulador:
- a para Android
- i para iOS

## Mock de Back-end (MirageJS)

O projeto usa MirageJS para interceptar requisicoes HTTP e simular entidades de lojas e produtos em memoria.

Nao e necessario subir backend separado para rodar localmente.

Como funciona:

1. Ao iniciar o app, o servidor mock em ./mocks/server.ts e carregado.
2. Requisicoes para /api/companies, /api/stores e /api/products sao interceptadas.
3. As rotas processam filtros e parametros de busca para simular comportamento real.
4. Seeds e regras podem ser ajustadas na pasta ./mocks.

## Testes Automatizados

O projeto utiliza Jest com jest-expo para validar regras de negocio e o estado global com Zustand.

Para executar:

```bash
npm run test
# ou pnpm run test
```
