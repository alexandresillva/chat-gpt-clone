# ChatGPT Clone

Um clone do ChatGPT desenvolvido com React (frontend) e Node.js (backend) utilizando a API da OpenAI.

## 🚀 Funcionalidades

- ✅ Interface similar ao ChatGPT
- ✅ Integração com OpenAI API (GPT-3.5-turbo)
- ✅ Chat em tempo real
- ✅ **Markdown e Code Highlighting** - Respostas formatadas com syntax highlighting
- ✅ **Histórico de Conversas** - Salva e lista conversas anteriores (localStorage)
- ✅ **Botão Copiar** - Copiar mensagens e blocos de código
- ✅ **Regenerar Resposta** - Reenviar última pergunta para nova resposta
- ✅ Indicador de loading durante respostas
- ✅ Tratamento de erros
- ✅ Botão "Novo Chat" funcional
- ✅ Deletar conversas antigas
- ✅ Scroll automático para novas mensagens
- ✅ Design responsivo e moderno

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- Chave de API da OpenAI

## 🔧 Instalação

### 1. Clone o repositório

```bash
git clone <seu-repositorio>
cd chatgpt-clone
```

### 2. Configure o Backend

```bash
cd server
npm install
```

Crie um arquivo `.env` na pasta `server`:

```bash
cp .env.example .env
```

Edite o arquivo `.env` e adicione sua chave da OpenAI:

```env
OPENAI_API_KEY=sua_chave_aqui
PORT=5555
```

### 3. Configure o Frontend

```bash
cd ../web
npm install
```

## 🎮 Como usar

### Iniciar o Backend

```bash
cd server
npm start
```

O servidor estará rodando em `http://localhost:5555`

### Iniciar o Frontend

Em outro terminal:

```bash
cd web
npm start
```

O aplicativo estará disponível em `http://localhost:3000`

## 📁 Estrutura do Projeto

```
chatgpt-clone/
├── server/                  # Backend Node.js
│   ├── src/
│   │   ├── app.js          # Configuração Express
│   │   ├── server.js       # Servidor principal
│   │   ├── config/
│   │   │   └── openai.js   # Configuração OpenAI
│   │   ├── controllers/
│   │   │   └── prompt-controller.js
│   │   ├── models/
│   │   │   └── input-prompt.js
│   │   └── routes/
│   │       └── routes.js
│   └── package.json
│
└── web/                     # Frontend React
    ├── src/
    │   ├── App.js          # Componente principal
    │   ├── api/
    │   │   └── api.js      # Cliente API
    │   ├── components/
    │   │   ├── ChatMessage/
    │   │   └── SideMenu/
    │   └── styles/
    └── package.json
```

## 🛠️ Tecnologias Utilizadas

### Backend
- Node.js
- Express.js
- OpenAI API
- CORS
- dotenv

### Frontend
- React 19
- Axios
- CSS3
- React Markdown
- React Syntax Highlighter (Prism)

## 🔐 Variáveis de Ambiente

### Server (.env)
- `OPENAI_API_KEY` - Sua chave de API da OpenAI
- `PORT` - Porta do servidor (padrão: 5555)

## 📝 Como obter a chave da OpenAI

1. Acesse [https://platform.openai.com](https://platform.openai.com)
2. Crie uma conta ou faça login
3. Vá para "API Keys" no menu
4. Clique em "Create new secret key"
5. Copie a chave e adicione no arquivo `.env`

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## 📄 Licença

Este projeto é apenas para fins educacionais.

## ✨ Melhorias Futuras

- [ ] Streaming de respostas (letra por letra)
- [ ] Modo escuro/claro toggle
- [ ] Suporte para GPT-4
- [ ] Textarea com auto-resize
- [ ] Stop generating button
- [ ] Upload de imagens (GPT-4 Vision)
- [ ] Exportar conversas (MD/JSON/TXT)
- [ ] System prompts customizáveis
- [ ] Voice input/output
- [ ] Mensagens de exemplo na tela inicial
- [ ] Contador de tokens
- [ ] Editar mensagens enviadas

## 👨‍💻 Autor

**Alexandre Ribeiro**

*Software & Data Engineer | Especialista em Inteligência Artificial, Visão Computacional e Ciência de Dados | +20 anos transformando tecnologia em resultados.*

[![GitHub](https://img.shields.io/badge/GitHub-alexandresillva-181717?logo=github)](https://github.com/alexandresillva)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Alexandre%20Silva%20Ribeiro-0077B5?logo=linkedin)](https://www.linkedin.com/in/alexandre-silva-ribeiro/)

---

⭐ Se este projeto te ajudou, considere dar uma estrela!

Desenvolvido com ❤️ durante o bootcamp da [DIO](https://www.dio.me/)
