# Forum

# Configuração

1. Instalar typescript com o comando `npm i typescript -D`
2. Instalar os pacote de tipos para o node com o comando `npm i @types/node -D`
3. Gerar o arquivo de configuração do typescript com o comando `npx tsc --init`
3. Add bibioteca de testes unitarios `npm i vitest -D`
4. Executar os testes com o comando `npx vitest run`

5. Executar os testes com o comando `npm i vite-tsconfig-paths -D`
6. Criar um arquivo `vite.config.ts`

```ts
import { defineConfig } from "vite"
import tsConfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    globals: true
  }
})
```

7. habilitando o vitest de forma global, no arquivo `tsconfig.json` adicione 
o seguinte codigo

```ts
...
"baseUrl": "./",
"paths": {
  "@/*": ["./src/*"]
}, 
...
"types": [
  "vitest/globals"
],
...
```

8. Instalando Eslint `npm i @rocketseat/eslint-config eslint eslint-plugin-vitest-globals -D`
9. Cria o arquivo `.eslintrc.json` com o conteudo

```json
{
  "extends": [
    "@rocketseat/eslint-config/node",
    "plugin:vitest-globals/recommended"
  ],
  "rules": {
    "no-useless-constructor": "off"
  },
  "env": {
    "vitest-globals/env": true
  }
}
```

10. Crie um script de lint no package.json `eslint src --ext .ts --fix`

## Subdominios

 - core: Oque da dinheiro
 - supproting: Da suporte para o core funcionar
 - gaeneric: Voce precisa, mas nao sao tao importantes

 ### Exemplo para um e-comerce

- Core: Compra, Catalogo, Pagamento
- Supporting: Estoque, Entrega
- Generic: Notificaçao ao cliente, promoçoes, chat