<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'POST':
        submitContactForm();
        break;
    case 'GET':
        getContactMessages();
        break;
    default:
        jsonResponse(['error' => 'Method not allowed'], 405);
}

function submitContactForm() {
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Validação básica
    if (empty($data['name']) || empty($data['email']) || empty($data['message'])) {
        jsonResponse(['error' => 'Required fields missing'], 400);
    }
    
    $pdo = getConnection();
    
    $sql = "INSERT INTO contact_messages (name, email, subject, message, neural_signature) 
            VALUES (?, ?, ?, ?, ?)";
    
    $neuralSignature = generateNeuralSignature($data);
    
    $stmt = $pdo->prepare($sql);
    $result = $stmt->execute([
        $data['name'],
        $data['email'],
        $data['subject'] ?? 'Neural Contact',
        $data['message'],
        $neuralSignature
    ]);
    
    if ($result) {
        // Enviar email (opcional)
        sendNeuralNotification($data);
        
        jsonResponse([
            'success' => true,
            'message' => 'Neural transmission received',
            'neural_signature' => $neuralSignature
        ], 201);
    } else {
        jsonResponse(['error' => 'Failed to transmit neural message'], 500);
    }
}

function getContactMessages() {
    $pdo = getConnection();
    
    $sql = "SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 50";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    jsonResponse([
        'messages' => $messages,
        'total' => count($messages)
    ]);
}

function generateNeuralSignature($data) {
    return 'NS_' . strtoupper(substr(md5($data['email'] . time()), 0, 8));
}

function sendNeuralNotification($data) {
    // Implementar envio de email aqui se necessário
    // mail($data['email'], 'Neural Link Established', 'Your message has been received...');
}
?>
