<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        getProducts();
        break;
    case 'POST':
        createProduct();
        break;
    case 'PUT':
        updateProduct();
        break;
    case 'DELETE':
        deleteProduct();
        break;
    default:
        jsonResponse(['error' => 'Method not allowed'], 405);
}

function getProducts() {
    $pdo = getConnection();
    
    $category = $_GET['category'] ?? 'ALL';
    $limit = $_GET['limit'] ?? 50;
    $offset = $_GET['offset'] ?? 0;
    
    $sql = "SELECT * FROM products";
    $params = [];
    
    if ($category !== 'ALL') {
        $sql .= " WHERE category = ?";
        $params[] = $category;
    }
    
    $sql .= " ORDER BY consciousness_level DESC LIMIT ? OFFSET ?";
    $params[] = (int)$limit;
    $params[] = (int)$offset;
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Simular flutuação de consciousness_level
    foreach ($products as &$product) {
        $product['consciousness_level'] += rand(-2, 3);
        $product['consciousness_level'] = max(75, min(99, $product['consciousness_level']));
    }
    
    jsonResponse([
        'products' => $products,
        'total' => count($products),
        'neural_status' => 'ACTIVE'
    ]);
}

function createProduct() {
    $pdo = getConnection();
    $data = json_decode(file_get_contents('php://input'), true);
    
    $sql = "INSERT INTO products (name, price, status, consciousness_level, category, description, neural_id) 
            VALUES (?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = $pdo->prepare($sql);
    $result = $stmt->execute([
        $data['name'],
        $data['price'],
        $data['status'] ?? 'ACTIVE',
        $data['consciousness_level'] ?? 85,
        $data['category'] ?? 'NEURAL',
        $data['description'] ?? '',
        $data['neural_id'] ?? 'NP' . str_pad(rand(1, 999), 3, '0', STR_PAD_LEFT)
    ]);
    
    if ($result) {
        jsonResponse(['success' => true, 'id' => $pdo->lastInsertId()], 201);
    } else {
        jsonResponse(['error' => 'Failed to create product'], 500);
    }
}

function updateProduct() {
    $pdo = getConnection();
    $data = json_decode(file_get_contents('php://input'), true);
    $id = $_GET['id'] ?? null;
    
    if (!$id) {
        jsonResponse(['error' => 'Product ID required'], 400);
    }
    
    $sql = "UPDATE products SET name = ?, price = ?, status = ?, consciousness_level = ?, 
            category = ?, description = ? WHERE id = ?";
    
    $stmt = $pdo->prepare($sql);
    $result = $stmt->execute([
        $data['name'],
        $data['price'],
        $data['status'],
        $data['consciousness_level'],
        $data['category'],
        $data['description'],
        $id
    ]);
    
    jsonResponse(['success' => $result]);
}

function deleteProduct() {
    $pdo = getConnection();
    $id = $_GET['id'] ?? null;
    
    if (!$id) {
        jsonResponse(['error' => 'Product ID required'], 400);
    }
    
    $sql = "DELETE FROM products WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $result = $stmt->execute([$id]);
    
    jsonResponse(['success' => $result]);
}
?>
