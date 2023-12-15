const express = require('express');
const app = express();
const port = 3000;
const db = require('./db');

app.use(express.json());

app.get('/users', (request, response) => {
  db.all('SELECT * FROM usuarios', (error, rows) => {
    if (error) {
      console.error(error.message);
    } else {
      response.json({ message: 'Usuários listados com sucesso!', users: rows });
    }
  });
});

app.post('/users', (request, response) => {
  const stmt = db.prepare('INSERT INTO usuarios (nome, idade) VALUES (?, ?)');
  const nome = request.body.nome;
  const idade = request.body.idade;

  stmt.run(nome, idade, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Usuário inserido com sucesso!');
    }
  });

  stmt.finalize();

  response.json({ message: 'Usuário inserido com sucesso!' });
});

app.put('/users/:id', (request, response) => {
  const stmt = db.prepare('UPDATE usuarios SET nome = ?, idade = ? WHERE id = ?');
  const nome = request.body.nome;
  const idade = request.body.idade;
  const id = request.params.id;

  stmt.run(nome, idade, id, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Usuário atualizado com sucesso!');
    }
  });

  stmt.finalize();

  response.json({ message: 'Usuário atualizado com sucesso!' });
});

app.delete('/users/:id', (request, response) => {
  const stmt = db.prepare('DELETE FROM usuarios WHERE id = ?');
  const id = request.params.id;

  stmt.run(id, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Usuário deletado com sucesso!');
    }
  });

  stmt.finalize();

  response.json({ message: 'Usuário deletado com sucesso!' });
});

app.listen(port);
