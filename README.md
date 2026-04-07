# Projeto Booking (TDD)

Este projeto é um exemplo de sistema de reservas de propriedades criado com foco em **TDD (Test Driven Development)**.

## Visão Geral

O sistema permite:
- cadastrar propriedades e usuários;
- criar reservas para períodos específicos;
- cancelar reservas com regras de reembolso;
- validar disponibilidade e capacidade de hóspedes.

## Arquitetura

A estrutura do projeto segue uma organização em camadas:
- `src/domain`: regras de negócio, entidades, repositórios e objetos de valor;
- `src/application`: serviços use-case que orquestram a lógica de aplicação;
- `src/infrastructure`: repositórios, persistência e mapeadores;
- `src/infrastructure/web`: controladores e testes de integração HTTP.

## TDD no projeto

O desenvolvimento foi guiado por testes com `Jest`:
- testes de unidades para entidades, serviços e regras de reembolso;
- testes de integração para repositórios TypeORM e endpoints HTTP;
- código implementado para passar nos testes e manter regras de negócio claras.

## Como usar

Instale as dependências:

```bash
npm install
```

Execute os testes:

```bash
npm test
```

## Dependências principais

- `typescript`
- `jest`
- `ts-jest`
- `express`
- `typeorm`
- `sqlite3`
- `supertest`
- `uuid`

## Observações

O projeto é um exemplo educacional para aprender TDD no contexto de um sistema de reservas. A implementação foca em regras de negócio e testes automatizados, com uma base simples de APIs e persistência.
