import { Router } from 'express';
import { salvarUsuario, listarUsuarios, buscarUsuarioPorDescricao, alterarUsuario, removerUsuario, } from '../repository/usuarioRepository.js';

const usuarioEndpoints = Router();


const usuariosRegistrados = [
  { email: 'charles@gmail.com', senha: 'abcd' },
  { email: 'denise@gmail.com', senha: '1234' },
];

usuarioEndpoints.post('/login', async (req, resp) => {
  try {
    const { email, senha } = req.body;

    const usuario = usuariosRegistrados.find(
      (u) => u.email === email && u.senha === senha
    );

    if (!usuario) {
      resp.status(401).send({ erro: 'Email ou senha incorretos' });
      return;
    }

    resp.status(200).send({ mensagem: 'Acesso permitido' });
  } catch (err) {
    resp.status(500).send({ erro: err.message });
  }
});

usuarioEndpoints.post('/usuario', async (req, resp) => {
    try {
        const usuario = req.body;
        const resultado = await salvarUsuario(usuario);
        resp.send(resultado);
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});

usuarioEndpoints.get('/usuario', async (req, resp) => {
    try {
        const resultado = await listarUsuarios();
        resp.send(resultado);
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});

usuarioEndpoints.get('/usuario/busca', async (req, resp) => {
    try {
        const descricao = req.query.descricao;
        const resultado = await buscarUsuarioPorDescricao(descricao);
        resp.send(resultado);
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});

usuarioEndpoints.put('/usuario/:id', async (req, resp) => {
    try {
        const id = req.params.id;
        const usuario = req.body;
        const resultado = await alterarUsuario(id, usuario);
        resp.send({ mensagem: resultado });
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});

usuarioEndpoints.delete('/usuario/:id', async (req, resp) => {
    try {
        const id = req.params.id;
        const linhasAfetadas = await removerUsuario(id);
        resp.send();
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});

export default usuarioEndpoints;
