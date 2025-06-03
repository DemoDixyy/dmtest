# Dem Claire - Neural Fashion Interface

## Instalação e Configuração

### Pré-requisitos
- Servidor web (Apache/Nginx)
- PHP 7.4+
- MySQL 5.7+
- Node.js 16+

### Configuração do Backend PHP

1. **Configure o banco de dados:**
   - Crie um banco MySQL
   - Execute o arquivo `database/schema.sql`
   - Edite `api/config.php` com suas credenciais

2. **Configure o servidor web:**
   - Aponte o DocumentRoot para a pasta do projeto
   - Certifique-se que mod_rewrite está ativado (Apache)

3. **Teste as APIs:**
   - Acesse: `http://seudominio.com/api/products.php`
   - Deve retornar JSON com produtos

### Configuração do Frontend

1. **Instale dependências:**
   \`\`\`bash
   npm install
   \`\`\`

2. **Configure a API URL:**
   - Edite os arquivos React para apontar para sua API PHP
   - Substitua `http://localhost/api` pela sua URL

3. **Build para produção:**
   \`\`\`bash
   npm run build
   npm run export
   \`\`\`

### Estrutura do Projeto

\`\`\`
dem-claire/
├── api/                 # Backend PHP
│   ├── config.php      # Configurações
│   ├── products.php    # API de produtos
│   ├── neural-auth.php # Autenticação
│   ├── contact.php     # Contato
│   └── cart.php        # Carrinho
├── admin/              # Painel administrativo
│   └── index.php       # Interface de admin
├── database/           # Scripts SQL
│   └── schema.sql      # Estrutura do banco
├── app/                # Frontend Next.js
├── components/         # Componentes React
└── public/             # Arquivos estáticos
\`\`\`

### Funcionalidades PHP Implementadas

- **Sistema de produtos** com CRUD completo
- **Autenticação neural** com hash de senhas
- **Carrinho de compras** persistente
- **Sistema de contato** com assinatura neural
- **Logs de atividade** neural
- **Painel administrativo** completo
- **APIs RESTful** para todas as funcionalidades

### Personalização

1. **Adicionar novos campos:**
   - Modifique `database/schema.sql`
   - Atualize as APIs correspondentes

2. **Customizar interface:**
   - Edite os componentes React
   - Modifique o CSS/Tailwind

3. **Adicionar funcionalidades:**
   - Crie novas APIs em `/api/`
   - Implemente no frontend

### URLs Importantes

- **Site principal:** `http://seudominio.com/`
- **Admin:** `http://seudominio.com/admin/`
- **API produtos:** `http://seudominio.com/api/products.php`
- **API contato:** `http://seudominio.com/api/contact.php`

### Segurança

- Senhas são hasheadas com `password_hash()`
- Validação de entrada em todas as APIs
- Headers CORS configurados
- Logs de atividade para auditoria

### Suporte

Para dúvidas ou problemas, verifique:
1. Logs do servidor web
2. Logs do PHP
3. Console do navegador
4. Configurações do banco de dados
\`\`\`

```htaccess file=".htaccess"
RewriteEngine On

# Redirect to HTTPS (opcional)
# RewriteCond %{HTTPS} off
# RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# API Routes
RewriteRule ^api/(.*)$ api/$1 [L]

# Admin Routes
RewriteRule ^admin/(.*)$ admin/$1 [L]

# Frontend Routes (Next.js)
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.html [L]

# Security Headers
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Cache Control
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType image/png "access plus 1 month"
    ExpiresByType image/jpg "access plus 1 month"
    ExpiresByType image/jpeg "access plus 1 month"
</IfModule>
