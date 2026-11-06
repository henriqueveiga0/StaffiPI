INSERT INTO usuarios (nome, email, senha) VALUES
('João Silva', 'joao@gmail.com', 'senha123'),
('Maria Oliveira', 'maria@gmail.com', 'senha456'),
('Pedro Santos', 'pedro@gmail.com', 'senha789');



INSERT INTO riscos (nome, local, criticidade, descricao) VALUES
('Queda de altura', 'Construção Civil', 'ALTA', 'Risco de queda durante trabalhos em altura.'),
('Choque elétrico', 'Manutenção', 'ALTA', 'Risco de choque durante manutenção elétrica.'),
('Exposição a ruídos', 'Produção', 'MEDIA', 'Exposição prolongada a ruídos elevados.');




INSERT INTO funcionarios (nome, cargo, setor, email, telefone, status) VALUES
('Carlos Mendes', 'Técnico de Segurança', 'Segurança do Trabalho', 'carlos@empresa.com', '11987654321', 'ATIVO'),
('Ana Souza', 'Engenheira de Segurança', 'Engenharia', 'ana@empresa.com', '11976543210', 'ATIVO'),
('Roberto Lima', 'Operador de Máquinas', 'Produção', 'roberto@empresa.com', '11965432109', 'ATIVO');



INSERT INTO epis (nome, categoria, quantidade, ca, validade, descricao, status) VALUES
('Capacete de Segurança', 'Proteção da Cabeça', 50, '12345', '2027-12-31', 'Capacete para proteção contra impactos.', 'ATIVO'),
('Luva de Proteção', 'Proteção das Mãos', 100, '23456', '2027-06-30', 'Luva para proteção contra agentes mecânicos.', 'ATIVO'),
('Óculos de Segurança', 'Proteção dos Olhos', 75, '34567', '2028-03-15', 'Óculos para proteção contra partículas.', 'ATIVO');