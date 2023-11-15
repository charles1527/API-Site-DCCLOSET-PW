import { con } from "./connection.js";

export async function salvar(produto) {
    const comando = `
        INSERT INTO produto (categoria, tamanho, preco, descricao)
                    VALUES (?, ?, ?, ?);
    `

    const [info] = await con.query(comando, [produto.categoria, produto.tamanho, produto.preco, produto.descricao])
    produto.id = info.insertId;
    return produto;
}


export async function listar() {
    const comando = `
        SELECT codigo,
                categoria,
                tamanho,
                preco,
                descricao
            FROM produto;
    `

    const [linhas] = await con.query(comando);
    return linhas;
}

export async function BuscarPorDescricao(descricao) {
    const comando = `
        SELECT codigo,
                categoria,
                tamanho,
                preco,
                descricao
            FROM produto
            WHERE descricao like ?
    `

    const [linhas] = await con.query(comando, ['%' + descricao + '%']);
    return linhas;
}


export async function alterar(codigo, produto) {
    const comando = `
        UPDATE produto
                SET categoria = ?,
                    tamanho = ?,
                    preco = ?,
                    descricao = ?
        WHERE codigo = ?;
    `
    const [info] = await con.query(comando, [produto.categoria, produto.tamanho, produto.preco, produto.descricao, codigo]);
    if (info.affectedRows > 0) {
        return "Registro atualizado com sucesso.";
    } else {
        return "Nenhum registro foi atualizado. Verifique o código fornecido.";
    }
}

export async function remover(codigo) {
    const comando = 'DELETE FROM produto WHERE codigo = ?'

    const [info] = await con.query(comando, [codigo]);
    return info.affectedRows;
}