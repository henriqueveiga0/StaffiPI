DELIMITER //

CREATE FUNCTION contar_funcionarios_ativos()
RETURNS INT
DETERMINISTIC
READS SQL DATA
BEGIN
    DECLARE total INT;

    SELECT COUNT(*)
    INTO total
    FROM funcionarios
    WHERE status = 'ATIVO';

    RETURN total;
END //

DELIMITER ;

SELECT contar_funcionarios_ativos() AS total_funcionarios_ativos;

DELIMITER //

CREATE FUNCTION total_epis_estoque()
RETURNS INT
DETERMINISTIC
READS SQL DATA
BEGIN
    DECLARE total INT;

    SELECT COALESCE(SUM(quantidade), 0)
    INTO total
    FROM epis
    WHERE status = 'ATIVO';

    RETURN total;
END //

DELIMITER ;

SELECT total_epis_estoque() AS quantidade_total_epis;