-- Criação do banco de dados Dem Claire
CREATE DATABASE IF NOT EXISTS dem_claire;
USE dem_claire;

-- Tabela de produtos
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'ACTIVE',
    consciousness_level INT DEFAULT 85,
    category VARCHAR(100) DEFAULT 'NEURAL',
    description TEXT,
    image_url VARCHAR(500),
    neural_id VARCHAR(20) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de usuários neurais
CREATE TABLE neural_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    neural_hash VARCHAR(255) NOT NULL,
    consciousness_sync DECIMAL(5,2) DEFAULT 87.30,
    neural_level INT DEFAULT 1,
    last_sync TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de carrinho neural
CREATE TABLE neural_cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    product_id INT,
    quantity INT DEFAULT 1,
    neural_preference JSON,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES neural_users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Tabela de logs neurais
CREATE TABLE neural_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    action VARCHAR(100),
    neural_data JSON,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES neural_users(id) ON DELETE SET NULL
);

-- Tabela de mensagens de contato
CREATE TABLE contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    neural_signature VARCHAR(255),
    status VARCHAR(50) DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir produtos de exemplo
INSERT INTO products (name, price, status, consciousness_level, category, description, neural_id) VALUES
('Neural Jacket', 520.00, 'SYNCED', 94, 'NEURAL', 'Jaqueta com interface neural integrada', 'NJ001'),
('Synaptic Hoodie', 380.00, 'ACTIVE', 87, 'SYNAPTIC', 'Moletom com conexões sinápticas', 'SH002'),
('Quantum Pants', 450.00, 'LINKED', 91, 'QUANTUM', 'Calça com tecnologia quântica', 'QP003'),
('Conscious Bag', 290.00, 'AWARE', 83, 'CONSCIOUS', 'Bolsa com consciência artificial', 'CB004'),
('Neural Shoes', 480.00, 'SYNCED', 96, 'NEURAL', 'Tênis com sensores neurais', 'NS005'),
('Mind Glasses', 340.00, 'ACTIVE', 89, 'NEURAL', 'Óculos de realidade neural', 'MG006');

-- Inserir usuário admin de exemplo
INSERT INTO neural_users (username, email, neural_hash, consciousness_sync, neural_level) VALUES
('admin', 'admin@demclaire.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 99.99, 10);
