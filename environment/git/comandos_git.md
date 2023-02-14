# Comandos GIT

## HISTÓRICO

### Mostrar todos os commits, começando pelo mais novo

~~~properties
git log
~~~

### Mostrar mudanças ao longo do tempo para um arquivo especifico

~~~properties
git log -p <file>
~~~

### Mostra quem alterou o quê e quando em `<file>`

~~~properties
git blame <file>
~~~

## ATUALIZAR E PUBLICAR

### Lista todos os controles remotos configurados atualmente

~~~properties
git remote -v
~~~

### Mostrar informações sobre um controle remoto

~~~properties
git remote show <remote>
~~~

### Adicione um novo repositório remoto, denominado `<remote>`

~~~properties
git remote add <shortname> <url>
~~~

### Baixe todas as olterações de `<remote>`, mas não integre no HEAD

~~~properties
git fetch <remote>
~~~

### Baixe as alterações e marque / integre diretamente no HEAD

~~~properties
git pull <remote> <branch>
~~~

### Publique as alterações locais remotamente

~~~properties
git push <remote> <branch>
~~~

### Exclua uma filial no controle remoto

~~~properties
git branch -dh <remote/branch>
~~~

### Publique suas tags

~~~properties
git push --tags
~~~

## MUDANÇAS LOCAIS

### Arquivos alterados em seu diretório de trabalho

~~~properties
git status
~~~

### Mudanças em arquivos rastreados

~~~properties
git diff
~~~

### Adicione todas as mudanças atuais para o próximo commit

~~~properties
git add .
~~~

### Adicione algumas mudanças em «file> para o próximo commit

~~~properties
git add . -p <file>
~~~

### Confirmar todas as alterações locais em arquivos rastreados

~~~properties
git commit -a
~~~

### Confirmar alterações previamente preparadas

~~~properties
git commit
~~~

### Mude o último commit

~~~properties
git commit --amend
~~~

## DESFAZER

### Descarte todas as mudanças locais em seu diretório de trabalho

~~~properties
git reset -hard HEAD
~~~

### Descartar as alterações locais em um arquivo especifico

~~~properties
git checkout HEAD <file>
~~~

### Reverter um commit (produzindo um novo commit com mudanças contrárias)

~~~properties
git revert <commit>
~~~

### Redefina o pontelro HEAD para um commit anterior ... e descarte todas as alterações desde então

~~~properties
git reset -hard <commit>
~~~

### ... e preserva todas as mudanças como mudanças não planejadas

~~~properties
git reset <commit>
~~~

### ... e preserva as mudanças locais não comprometidas

~~~properties
git reset -keep <commit>
~~~

## BRANCHES

### Listar todos os ramos existentes

~~~properties
git branch -av
~~~

### Mudar ramo HEAD

~~~properties
git checkout <branch>
~~~

### Crie uma nova filial com base

~~~properties
git checkout <new-branch>
~~~

### Crie uma nova filial com base git checkout-track

~~~properties
<remote/branch>
~~~

### Deletar uma filial local

~~~properties
git branch -d <brach>
~~~

### Marque o cormmit atual com uma tog

~~~properties
git tag <tag-name>
~~~

## FUNDIR E REBASE

### Funda `<branch>` em seu HEAD atual

~~~properties
git merge <branch>
~~~

### Rebase seu HEAD atual em `<branch>`

~~~properties
git rebase <branch>
~~~

### Abortar um rebase

~~~properties
git rebase --abort
~~~

### Continue um rebase após resolver os conflitos

~~~properties
git rebase --continue
~~~

### Use a ferramenta de fusão configurada do tour para resolver conflitos

~~~properties
git mergetool
~~~

### Use o editor de tour para resolver conflitos manualmente e (após resolver) marcar o arquivo como resolvido

~~~properties
git add <resolved-file>
git rm <resolved-file>
~~~
