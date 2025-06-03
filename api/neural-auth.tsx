<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'POST':
        $action = $_GET['action'] ?? '';
        switch($action) {
            case 'login':
                neuralLogin();
                break;
            case 'register':
                neuralRegister();
                break;
            case 'sync':
                updateNeuralSync();
                break;
            default:
                jsonResponse(['error' => 'Invalid action'], 400);
        }
        break;
    case 'GET':
        getNeuralStatus();
        break;
    default:
        jsonResponse(['error' => 'Method not allowed'], 405);
}

function neuralLogin() {
    $pdo = getConnection();
    $data = json_decode(file_get_contents('php://input'), true);
    
    $sql = "SELECT * FROM neural_users WHERE email = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$data['email']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($user && password_verify($data['password'], $user['neural_hash'])) {
        // Atualizar último sync
        $updateSql = "UPDATE neural_users SET last_sync = NOW() WHERE id = ?";
        $updateStmt = $pdo->prepare($updateSql);
        $updateStmt->execute([$user['id']]);
        
        // Log da ação neural
        logNeuralAction($user['id'], 'NEURAL_LOGIN', [
            'consciousness_sync' => $user['consciousness_sync'],
            'neural_level' => $user['neural_level']
        ]);
        
        jsonResponse([
            'success' => true,
            'user' => [
                'id' => $user['id'],
                'username' => $user['username'],
                'consciousness_sync' => $user['consciousness_sync'],
                'neural_level' => $user['neural_level']
            ],
            'neural_token' => generateNeuralToken($user['id'])
        ]);
    } else {
        jsonResponse(['error' => 'Invalid neural credentials'], 401);
    }
}

function neuralRegister() {
    $pdo = getConnection();
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Verificar se usuário já existe
    $checkSql = "SELECT id FROM neural_users WHERE email = ? OR username = ?";
    $checkStmt = $pdo->prepare($checkSql);
    $checkStmt->execute([$data['email'], $data['username']]);
    
    if ($checkStmt->fetch()) {
        jsonResponse(['error' => 'Neural signature already exists'], 409);
    }
    
    $sql = "INSERT INTO neural_users (username, email, neural_hash, consciousness_sync) VALUES (?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $result = $stmt->execute([
        $data['username'],
        $data['email'],
        password_hash($data['password'], PASSWORD_DEFAULT),
        rand(8000, 9500) / 100 // Sync inicial aleatório
    ]);
    
    if ($result) {
        $userId = $pdo->lastInsertId();
        logNeuralAction($userId, 'NEURAL_REGISTER', ['initial_sync' => true]);
        
        jsonResponse([
            'success' => true,
            'message' => 'Neural link established',
            'user_id' => $userId
        ], 201);
    } else {
        jsonResponse(['error' => 'Failed to establish neural link'], 500);
    }
}

function updateNeuralSync() {
    $pdo = getConnection();
    $data = json_decode(file_get_contents('php://input'), true);
    
    $userId = $data['user_id'];
    $newSync = $data['consciousness_sync'];
    
    $sql = "UPDATE neural_users SET consciousness_sync = ?, last_sync = NOW() WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $result = $stmt->execute([$newSync, $userId]);
    
    logNeuralAction($userId, 'SYNC_UPDATE', ['new_sync' => $newSync]);
    
    jsonResponse(['success' => $result, 'new_sync' => $newSync]);
}

function getNeuralStatus() {
    $pdo = getConnection();
    $userId = $_GET['user_id'] ?? null;
    
    if (!$userId) {
        jsonResponse(['error' => 'User ID required'], 400);
    }
    
    $sql = "SELECT consciousness_sync, neural_level, last_sync FROM neural_users WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$userId]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($user) {
        // Simular flutuação natural do sync
        $user['consciousness_sync'] += (rand(-100, 100) / 100);
        $user['consciousness_sync'] = max(75, min(99.9, $user['consciousness_sync']));
        
        jsonResponse([
            'neural_status' => 'ACTIVE',
            'consciousness_sync' => round($user['consciousness_sync'], 1),
            'neural_level' => $user['neural_level'],
            'last_sync' => $user['last_sync'],
            'synaptic_connections' => rand(800, 1200)
        ]);
    } else {
        jsonResponse(['error' => 'Neural signature not found'], 404);
    }
}

function generateNeuralToken($userId) {
    return base64_encode($userId . ':' . time() . ':' . bin2hex(random_bytes(16)));
}

function logNeuralAction($userId, $action, $neuralData) {
    $pdo = getConnection();
    
    $sql = "INSERT INTO neural_logs (user_id, action, neural_data, ip_address, user_agent) 
            VALUES (?, ?, ?, ?, ?)";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        $userId,
        $action,
        json_encode($neuralData),
        $_SERVER['REMOTE_ADDR'] ?? 'unknown',
        $_SERVER['HTTP_USER_AGENT'] ?? 'unknown'
    ]);
}
?>
