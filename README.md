# Flashcards
React Nanodegree 3� Project - React Native FlashCards

# Project Description
Projeto cont�m as seguintes funcionalidades:

1 - Visualizar e fazer o quiz dos baralhos criados. No quiz, o usu�rio pensa na resposta, pode visualizar a resposta e informa ao sistema se acertou... No final, baseado nas respostas do usu�rio, o sistema exibe a estat�stica de acertos.
2 - Criar um baralho com seu respectivo nome.
3 - Adicionar cartas ao baralho criado, informando a pergunta e resposta a serem exibidos no quiz.

# Como instalar
Na pasta raiz do projeto, execute:
- npm install
- Abra preferencialmente um emulador Android
- npm start

# OBS
Sistema desenvolvido e testado sobre emulador (Genymotion) Android S8

#Style Guide

Cria��o e altera��o de cores devem ser efetuadas no arquivo \utils\colors.js e utilizadas conforme exemplo abaixo:

1) Importar arquivo
   import { red } from '../utils/colors';

2) Criar estilo fazendo referencia a cor
   const styles = StyleSheet.create({
         error: { color: red }
   })

3) No jsx: 
   <Text style={styles.error}>Fill an answer.</Text>