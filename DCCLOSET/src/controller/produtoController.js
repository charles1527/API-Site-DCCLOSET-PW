import { salvar, listar, BuscarPorDescricao, remover, alterar } from "../repository/produtoRepository.js";

import { Router } from "express";

const endpoints = Router();


endpoints.post('/produto', async (req, resp) => {
    try {
        let produto = req.body;
       let r = await salvar(produto);

       resp.send(r);
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
});


endpoints.get('/produto', async (req, resp) => {
    try{
        let r = await listar();
        resp.send(r);
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
});

endpoints.get('/produto/busca', async (req, resp) => {
    try{
        let descricao = req.query.descricao;
        let r = await BuscarPorDescricao(descricao);
        resp.send(r);
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
});


endpoints.put('/produto/:codigo', async (req, resp) => {
    try {
        const codigo = req.params.codigo; 
        const produto = req.body; 

        const resultado = await alterar(codigo, produto);

        resp.send({ mensagem: resultado });
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.delete('/produto/:codigo', async (req, resp) => {
    try{
        let codigo = req.params.codigo;
        let linhasAfetadas = await remover(codigo);

        resp.send();
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    } 
});



export default endpoints;