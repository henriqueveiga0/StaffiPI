DELIMITER //

CREATE PROCEDURE cadastrar_funcionario(
    IN p_nome VARCHAR(150),
    IN p_cargo VARCHAR(100),
    IN p_setor VARCHAR(100),
    IN p_email VARCHAR(150),
    IN p_telefone VARCHAR(20)
)
BEGIN
    INSERT INTO funcionarios (
        nome,
        cargo,
        setor,
        email,
        telefone,
        status
    )
    VALUES (
        p_nome,
        p_cargo,
        p_setor,
        p_email,
        p_telefone,
        'ATIVO'
    );
END //

DELIMITER ;

CALL cadastrar_funcionario(
    'Lucas Ferreira',
    'Técnico de Segurança',
    'Segurança do Trabalho',
    'lucas@empresa.com',
    '11988887777'
);

DELIMITER //

CREATE PROCEDURE consultar_epis_categoria(
    IN p_categoria VARCHAR(100)
)
BEGIN
    SELECT
        id,
        nome,
        categoria,
        quantidade,
        ca,
        validade,
        descricao,
        status
    FROM epis
    WHERE categoria = p_categoria;
END //

DELIMITER ;

CALL consultar_epis_categoria('Proteção das Mãos');