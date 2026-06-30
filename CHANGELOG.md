# Registro de Alteracoes

## 2026-06-30

### Corrigido
- Ajustada a animacao do icone do carrinho ao marcar um produto como item de interesse.
- Removido o bloqueio por cooldown que impedia novos disparos visuais em cliques seguidos.
- Alterada a logica da animacao para permitir multiplos efeitos ativos ao mesmo tempo, um para cada clique.
- Alinhada a duracao visual da animacao para `420ms`, mantendo fluidez e resposta rapida.
- Atualizados os testes unitarios e os testes de navegador para refletir o comportamento correto da interface.

### Causa raiz identificada
- A implementacao antiga usava apenas um estado de animacao e um cooldown de `1 segundo`.
- Esse modelo fazia com que cliques consecutivos atualizassem o contador de interesse, mas nem sempre exibissem uma nova animacao.
- O CSS ainda mantinha uma duracao antiga de `800ms`, diferente do tempo usado pela logica em JavaScript, causando comportamento inconsistente.

### Validacao
- Testes unitarios da home executados com sucesso.
- Testes em navegadores Chromium, Firefox e WebKit executados com sucesso.
- Validacao adicional realizada em viewport mobile e desktop sem erros de console.
