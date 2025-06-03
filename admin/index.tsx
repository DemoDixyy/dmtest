<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dem Claire - Neural Admin</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Orbitron', monospace; }
        .neural-glow { box-shadow: 0 0 20px rgba(0, 255, 247, 0.3); }
    </style>
</head>
<body class="bg-black text-white min-h-screen">
    <div class="container mx-auto px-6 py-8">
        <header class="mb-12">
            <h1 class="text-4xl font-bold text-cyan-400 mb-2 tracking-wider">DEM CLAIRE</h1>
            <p class="text-cyan-400/60 tracking-widest">NEURAL ADMIN INTERFACE</p>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <!-- Stats Cards -->
            <div class="bg-gray-900/50 border border-cyan-500/30 rounded-xl p-6 neural-glow">
                <h3 class="text-cyan-400 text-sm tracking-wider mb-2">TOTAL PRODUCTS</h3>
                <p class="text-3xl font-bold" id="totalProducts">-</p>
            </div>
            <div class="bg-gray-900/50 border border-cyan-500/30 rounded-xl p-6 neural-glow">
                <h3 class="text-cyan-400 text-sm tracking-wider mb-2">NEURAL USERS</h3>
                <p class="text-3xl font-bold" id="totalUsers">-</p>
            </div>
            <div class="bg-gray-900/50 border border-cyan-500/30 rounded-xl p-6 neural-glow">
                <h3 class="text-cyan-400 text-sm tracking-wider mb-2">CONSCIOUSNESS SYNC</h3>
                <p class="text-3xl font-bold text-cyan-400" id="avgSync">-</p>
            </div>
        </div>

        <!-- Products Management -->
        <div class="bg-gray-900/50 border border-cyan-500/30 rounded-xl p-8 mb-8">
            <h2 class="text-2xl font-bold text-cyan-400 mb-6 tracking-wider">NEURAL PRODUCTS</h2>
            
            <!-- Add Product Form -->
            <form id="addProductForm" class="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" id="productName" placeholder="Product Name" class="bg-black/50 border border-cyan-500/30 rounded-lg px-4 py-2 text-white">
                <input type="number" id="productPrice" placeholder="Price" step="0.01" class="bg-black/50 border border-cyan-500/30 rounded-lg px-4 py-2 text-white">
                <select id="productCategory" class="bg-black/50 border border-cyan-500/30 rounded-lg px-4 py-2 text-white">
                    <option value="NEURAL">NEURAL</option>
                    <option value="QUANTUM">QUANTUM</option>
                    <option value="SYNAPTIC">SYNAPTIC</option>
                    <option value="CONSCIOUS">CONSCIOUS</option>
                </select>
                <input type="number" id="productConsciousness" placeholder="Consciousness Level" min="75" max="99" class="bg-black/50 border border-cyan-500/30 rounded-lg px-4 py-2 text-white">
                <textarea id="productDescription" placeholder="Description" class="bg-black/50 border border-cyan-500/30 rounded-lg px-4 py-2 text-white md:col-span-2"></textarea>
                <button type="submit" class="bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-2 px-4 rounded-lg md:col-span-2">ADD NEURAL PRODUCT</button>
            </form>

            <!-- Products List -->
            <div id="productsList" class="space-y-4">
                <!-- Products will be loaded here -->
            </div>
        </div>

        <!-- Contact Messages -->
        <div class="bg-gray-900/50 border border-cyan-500/30 rounded-xl p-8">
            <h2 class="text-2xl font-bold text-cyan-400 mb-6 tracking-wider">NEURAL TRANSMISSIONS</h2>
            <div id="messagesList" class="space-y-4">
                <!-- Messages will be loaded here -->
            </div>
        </div>
    </div>

    <script>
        // Load dashboard data
        async function loadDashboard() {
            try {
                // Load products
                const productsResponse = await fetch('../api/products.php');
                const productsData = await productsResponse.json();
                document.getElementById('totalProducts').textContent = productsData.products.length;
                displayProducts(productsData.products);

                // Load messages
                const messagesResponse = await fetch('../api/contact.php');
                const messagesData = await messagesResponse.json();
                displayMessages(messagesData.messages);

                // Simulate other stats
                document.getElementById('totalUsers').textContent = Math.floor(Math.random() * 500) + 100;
                document.getElementById('avgSync').textContent = (Math.random() * 15 + 85).toFixed(1) + '%';
            } catch (error) {
                console.error('Error loading dashboard:', error);
            }
        }

        function displayProducts(products) {
            const container = document.getElementById('productsList');
            container.innerHTML = products.map(product => `
                <div class="bg-black/30 border border-cyan-500/20 rounded-lg p-4 flex justify-between items-center">
                    <div>
                        <h3 class="text-white font-bold">${product.name}</h3>
                        <p class="text-cyan-400">€${product.price} | ${product.status} | ${product.consciousness_level}% Conscious</p>
                        <p class="text-gray-400 text-sm">${product.neural_id}</p>
                    </div>
                    <button onclick="deleteProduct(${product.id})" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">DELETE</button>
                </div>
            `).join('');
        }

        function displayMessages(messages) {
            const container = document.getElementById('messagesList');
            container.innerHTML = messages.map(message => `
                <div class="bg-black/30 border border-cyan-500/20 rounded-lg p-4">
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="text-cyan-400 font-bold">${message.name}</h3>
                        <span class="text-gray-400 text-sm">${message.created_at}</span>
                    </div>
                    <p class="text-gray-300 text-sm mb-2">${message.email} | ${message.subject}</p>
                    <p class="text-white">${message.message}</p>
                    <p class="text-cyan-400/60 text-xs mt-2">Neural Signature: ${message.neural_signature}</p>
                </div>
            `).join('');
        }

        // Add product form
        document.getElementById('addProductForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const productData = {
                name: document.getElementById('productName').value,
                price: parseFloat(document.getElementById('productPrice').value),
                category: document.getElementById('productCategory').value,
                consciousness_level: parseInt(document.getElementById('productConsciousness').value),
                description: document.getElementById('productDescription').value,
                status: 'ACTIVE'
            };

            try {
                const response = await fetch('../api/products.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(productData)
                });

                if (response.ok) {
                    alert('Neural product added successfully!');
                    document.getElementById('addProductForm').reset();
                    loadDashboard();
                } else {
                    alert('Error adding product');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error adding product');
            }
        });

        async function deleteProduct(id) {
            if (confirm('Delete this neural product?')) {
                try {
                    const response = await fetch(`../api/products.php?id=${id}`, {
                        method: 'DELETE'
                    });

                    if (response.ok) {
                        alert('Product deleted successfully!');
                        loadDashboard();
                    } else {
                        alert('Error deleting product');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('Error deleting product');
                }
            }
        }

        // Load dashboard on page load
        loadDashboard();
    </script>
</body>
</html>
