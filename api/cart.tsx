<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        getCart();
        break;
    case 'POST':
        addToCart();
        break;
    case 'PUT':
        updateCartItem();
        break;
    case 'DELETE':
        removeFromCart();
        break;
    default:
        jsonResponse(['error' => 'Method not allowed'], 405);
}

function getCart() {
    $pdo = getConnection();
    $userId = $_GET['user_id'] ?? null;
    
    if (!$userId) {
        jsonResponse(['error' => 'User ID required'], 400);
    }
    
    $sql = "SELECT nc.*, p.name, p.price, p.consciousness_level, p.neural_id 
            FROM neural_cart nc 
            JOIN products p ON nc.product_id = p.id 
            WHERE nc.user_id = ?";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$userId]);
    $cartItems = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    $total = array_sum(array_map(function($item) {
        return $item['price'] * $item['quantity'];
    }, $cartItems));
    
    jsonResponse([
        'cart_items' => $cartItems,
        'total_items' => count($cartItems),
        'total_price' => $total,
        'neural_status' => 'SYNCED'
    ]);
}

function addToCart() {
    $pdo = getConnection();
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Verificar se item já existe no carrinho
    $checkSql = "SELECT id, quantity FROM neural_cart WHERE user_id = ? AND product_id = ?";
    $checkStmt = $pdo->prepare($checkSql);
    $checkStmt->execute([$data['user_id'], $data['product_id']]);
    $existing = $checkStmt->fetch(PDO::FETCH_ASSOC);
    
    if ($existing) {
        // Atualizar quantidade
        $updateSql = "UPDATE neural_cart SET quantity = quantity + ? WHERE id = ?";
        $updateStmt = $pdo->prepare($updateSql);
        $result = $updateStmt->execute([$data['quantity'] ?? 1, $existing['id']]);
    } else {
        // Adicionar novo item
        $insertSql = "INSERT INTO neural_cart (user_id, product_id, quantity, neural_preference) 
                      VALUES (?, ?, ?, ?)";
        $insertStmt = $pdo->prepare($insertSql);
        $result = $insertStmt->execute([
            $data['user_id'],
            $data['product_id'],
            $data['quantity'] ?? 1,
            json_encode($data['neural_preference'] ?? [])
        ]);
    }
    
    jsonResponse(['success' => $result]);
}

function updateCartItem() {
    $pdo = getConnection();
    $data = json_decode(file_get_contents('php://input'), true);
    $cartId = $_GET['id'] ?? null;
    
    if (!$cartId) {
        jsonResponse(['error' => 'Cart item ID required'], 400);
    }
    
    $sql = "UPDATE neural_cart SET quantity = ? WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $result = $stmt->execute([$data['quantity'], $cartId]);
    
    jsonResponse(['success' => $result]);
}

function removeFromCart() {
    $pdo = getConnection();
    $cartId = $_GET['id'] ?? null;
    
    if (!$cartId) {
        jsonResponse(['error' => 'Cart item ID required'], 400);
    }
    
    $sql = "DELETE FROM neural_cart WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $result = $stmt->execute([$cartId]);
    
    jsonResponse(['success' => $result]);
}
?>
