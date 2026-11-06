CREATE VIEW view_funcionarios AS
SELECT id,nome, cargo, setor, email, telefone, status_func FROM funcionarios;

CREATE VIEW view_estoque_epis AS
SELECT id, nome, categoria, quantidade, ca, validade, descricao, status_epi FROM epis;

-- Consultar funcionários
SELECT * FROM view_funcionarios;

-- Consultar estoque de EPIs
SELECT * FROM view_estoque_epis;