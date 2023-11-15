import { con } from './connection.js';

export async function salvarUsuario(usuario) {
    const comando = `
        INSERT INTO usuario (email, senha)
        VALUES (?, ?);
    `;

    const [info] = await con.query(comando, [usuario.email, usuario.senha]);
    usuario.id = info.insertId;
    return usuario;
}

export async function listarUsuarios() {
    const comando = `
        SELECT id, email
        FROM usuario;
    `;

    const [linhas] = await con.query(comando);
    return linhas;
}

export async function buscarUsuarioPorDescricao(descricao) {
    const comando = `
        SELECT id, email
        FROM usuario
        WHERE email like ?;
    `;

    const [linhas] = await con.query(comando, ['%' + descricao + '%']);
    return linhas;
}

export async function alterarUsuario(id, usuario) {
    const comando = `
        UPDATE usuario
        SET email = ?,
            senha = ?
        WHERE id = ?;
    `;

    const [info] = await con.query(comando, [usuario.email, usuario.senha, id]);
    if (info.affectedRows > 0) {
        return "Registro de usuário atualizado com sucesso.";
    } else {
        return "Nenhum registro de usuário foi atualizado. Verifique o ID fornecido.";
    }
}

export async function removerUsuario(id) {
    const comando = 'DELETE FROM usuario WHERE id = ?';

    const [info] = await con.query(comando, [id]);
    return info.affectedRows;
}
