<!-- markdownlint-disable MD033 -->
# UNIX

## GUI vs CLI

- GUI - Graphical User Interface
- CLI - Command Line Interface

## Privilégios do usuário

- `sudo` - Permite executar programas c/ privilégios de outro usuário - por padrão,
  como o root). `sudo` significa "substitute user do" (usuário 
  substituto faça)  
  
Vídeo sobre su, sudo e sudoers. Nesse vídeo eu detalho mais sobre o comando su, sudo e o arquivo sudoers:

- [https://youtu.be/aTbEhjvlmxg](https://youtu.be/aTbEhjvlmxg)

## Navegação

- `pwd` - print working directory (mostra o caminho do diretório atual)  
- `ls` - lista tudo no diretório atual  
  - `-a` - inclui entradas que o nome começa com ponto (arquivos ou diretórios ocultos)  
  - `-l` - lista em formato longo  
  - `-h` - com -l, é um sufixo de tamanho para facilitar a leitura
  - `-@` - mostra atributos estendidos  

Vídeo sobre permissões no Linux. Isso vai te ajudar a entender melhor como o sistema de Usuários, grupos e permissões no Linux (Ubuntu):

- [https://youtu.be/S2h92LNcEz8](https://youtu.be/S2h92LNcEz8)

Mais comandos:

- `cd` - change directory
  - `.` - diretório atual
  - `..` - diretório acima
  - `/` - o diretório root ou a separação de diretórios
  - `~` - home (cd sem nada vai para a home)
  - `-` menos - volta para o diretório que anterior  
- `tree` - mostra a árvore do diretório atual  
  - `-d` - diretórios  
  - `-a` - mostra arquivos ocultos  
- `cat` - concatena e/ou mostra o conteúdo de um arquivo  
  - `-n` - enumera as linhas
- `tail` - lista as últimas linhas do arquivo  
  - `-NÚMERO` - mostra a quantidade de linhas que for adicionado em `NÚMERO`.
  - `-f` - continua assistindo o arquivo em busca de novos dados.  
- `wc` - conta linhas, palavras e caracteres
  - `-l` - linhas
  - `-m` - caracteres
  - `-w` - palavras

## Manipulando arquivos e diretórios

- `cp` - copia arquivos ou diretórios  
  - `-R` - copia o diretório em modo recursivo  
  <sub><sup>**Obs.:** Segundo o `man` (manual) do `cp`, se tiver uma barra (/) no final do diretório original, `cp` pode copiar apenas o conteúdo do diretório e não o diretório em si (eu não vi isso ocorrer em testes).</sup></sub>  
- `mv` - move arquivos ou diretórios (com mv você pode renomear arquivos ou diretórios)  
- `mkdir` - cria um diretório (use aspas ou barra invertida para separar caracteres inválidos)  
  - `-p` - cria uma estrutura inteira sem gerar erros  
  <sub><sup>Obs.: você pode usar chaves para criar múltiplos sub-diretórios.</sup></sub>  
- `rm` - apaga arquivos e diretórios  
  - `-R` - modo recursivo para diretórios  
  - `-f` - modo forçado e silencioso  
- `touch` - muda os tempos de acesso e modificação de um arquivo. Grande parte dos casos, usamos este comando para criar um arquivo vazio.  

## Alguns símbolos e operadores úteis

- `;` - permite executar vários comandos na mesma linha. Roda todos os comandos, mesmo se ocorrer algum erro.
- `&&` - permite executar vários comandos na mesma linha. Se o comando anterior não gerar nenhum erro, continua a corrente de comandos, do contrário, para no momento que ocorrer um erro.
- `||` - permite executar vários comandos na mesma linha. Ele funciona de maneira oposta ao anterior, ou seja, se ocorrer algum erro no comando anterior, executa o próximo comando, do contrário, para no primeiro comando que **NÃO** gerar um erro.
- `|` - Joga a saída (output) de um comando para a entrada (input) de outro.
- `>` - Joga a saída de um comando e redireciona para um arquivo. Apaga o arquivo todo e substitui seu conteúdo.
- `>>` - Joga a saída de um comando e redireciona para um arquivo. Não apaga o que estiver no arquivo, apenas adiciona o novo conteúdo na última linha.
- `&` - Joga para o background. Veja `jobs` e `fg` para complementar.

## Background e Foreground

- `jobs` - mostra trabalhos em execução  
- `fg %n` - leva o que estiver em background para o foreground  
- `bg %n` - continua um job em background  
- `kill %n` - mata um job

## Outros comandos

- `nano` - editor de textos  
- `file` - mostra o tipo do arquivo  
- `history` - histórico de comandos já digitados  
- `pkill` - mata processos
- `whoami` - mostra seu usuário
- `hostname` - mostra o nome do seu computador
- `uname` - mostra dados sobre o sistema
- `ps aux` - mostra todos os processos rodando no sistema no momento da execução
