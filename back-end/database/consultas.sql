SELECT *
FROM funcionarios
WHERE status = 'ATIVO';

SELECT
    nome,
    categoria,
    quantidade,
    ca
FROM epis
WHERE quantidade < 50;

SELECT
    nome,
    local,
    criticidade,
    descricao
FROM riscos
WHERE criticidade = 'ALTA';

SELECT
    setor,
    COUNT(*) AS total_funcionarios
FROM funcionarios
GROUP BY setor
ORDER BY total_funcionarios DESC;