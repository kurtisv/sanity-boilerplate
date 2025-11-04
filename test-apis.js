#!/usr/bin/env node

/**
 * 🧪 SCRIPT DE TEST AUTOMATISÉ - APIs DE GÉNÉRATION
 * 
 * Ce script teste toutes les APIs de génération de pages
 * pour s'assurer qu'elles fonctionnent correctement.
 */

const https = require('https');
const http = require('http');

// Configuration
const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';
const APIS_TO_TEST = [
  'setup-about',
  'setup-services', 
  'setup-contact',
  'setup-blog',
  'setup-faq',
  'setup-careers',
  'setup-pricing'
];

// Couleurs pour la console
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Fonction pour faire une requête HTTP
function makeRequest(url, method = 'POST') {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'API-Tester/1.0'
      }
    };

    const client = urlObj.protocol === 'https:' ? https : http;
    
    const req = client.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data: jsonData
          });
        } catch (error) {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data: data
          });
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    // Timeout de 30 secondes
    req.setTimeout(30000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    
    req.end();
  });
}

// Fonction pour afficher les résultats
function logResult(apiName, result, duration) {
  const status = result.status;
  const success = status >= 200 && status < 300;
  
  const statusColor = success ? colors.green : colors.red;
  const icon = success ? '✅' : '❌';
  
  console.log(`${icon} ${colors.bright}${apiName}${colors.reset}`);
  console.log(`   Status: ${statusColor}${status}${colors.reset}`);
  console.log(`   Duration: ${colors.cyan}${duration}ms${colors.reset}`);
  
  if (result.data) {
    if (typeof result.data === 'object') {
      if (result.data.success) {
        console.log(`   Success: ${colors.green}${result.data.success}${colors.reset}`);
      }
      if (result.data.message) {
        console.log(`   Message: ${colors.blue}${result.data.message}${colors.reset}`);
      }
      if (result.data.error) {
        console.log(`   Error: ${colors.red}${result.data.error}${colors.reset}`);
      }
      if (result.data.page && result.data.page._id) {
        console.log(`   Page ID: ${colors.magenta}${result.data.page._id}${colors.reset}`);
      }
    }
  }
  
  console.log('');
}

// Fonction principale de test
async function testAPI(apiName) {
  const url = `${BASE_URL}/api/${apiName}`;
  
  console.log(`${colors.yellow}🧪 Testing ${apiName}...${colors.reset}`);
  
  try {
    const startTime = Date.now();
    const result = await makeRequest(url);
    const duration = Date.now() - startTime;
    
    logResult(apiName, result, duration);
    
    return {
      api: apiName,
      success: result.status >= 200 && result.status < 300,
      status: result.status,
      duration: duration,
      data: result.data
    };
    
  } catch (error) {
    console.log(`❌ ${colors.bright}${apiName}${colors.reset}`);
    console.log(`   Error: ${colors.red}${error.message}${colors.reset}`);
    console.log('');
    
    return {
      api: apiName,
      success: false,
      error: error.message,
      duration: 0
    };
  }
}

// Test de connectivité
async function testConnectivity() {
  console.log(`${colors.cyan}🔗 Testing connectivity to ${BASE_URL}...${colors.reset}\n`);
  
  try {
    const result = await makeRequest(BASE_URL, 'GET');
    if (result.status === 200 || result.status === 404) {
      console.log(`${colors.green}✅ Server is reachable${colors.reset}\n`);
      return true;
    } else {
      console.log(`${colors.red}❌ Server returned status ${result.status}${colors.reset}\n`);
      return false;
    }
  } catch (error) {
    console.log(`${colors.red}❌ Cannot reach server: ${error.message}${colors.reset}\n`);
    return false;
  }
}

// Fonction principale
async function runTests() {
  console.log(`${colors.bright}${colors.magenta}`);
  console.log('🧪 ===============================================');
  console.log('   TESTS AUTOMATISÉS - APIs DE GÉNÉRATION');
  console.log('===============================================');
  console.log(`${colors.reset}\n`);
  
  // Test de connectivité
  const isConnected = await testConnectivity();
  if (!isConnected) {
    console.log(`${colors.red}❌ Impossible de se connecter au serveur${colors.reset}`);
    console.log(`${colors.yellow}💡 Assurez-vous que le serveur est démarré avec: npm run dev${colors.reset}`);
    process.exit(1);
  }
  
  // Tests des APIs
  console.log(`${colors.bright}📋 Testing ${APIS_TO_TEST.length} APIs...${colors.reset}\n`);
  
  const results = [];
  const startTime = Date.now();
  
  for (const api of APIS_TO_TEST) {
    const result = await testAPI(api);
    results.push(result);
    
    // Pause entre les tests pour éviter la surcharge
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  const totalDuration = Date.now() - startTime;
  
  // Résumé des résultats
  console.log(`${colors.bright}${colors.cyan}📊 RÉSUMÉ DES TESTS${colors.reset}`);
  console.log('='.repeat(50));
  
  const successful = results.filter(r => r.success).length;
  const failed = results.length - successful;
  
  console.log(`Total APIs testées: ${colors.bright}${results.length}${colors.reset}`);
  console.log(`Succès: ${colors.green}${successful}${colors.reset}`);
  console.log(`Échecs: ${colors.red}${failed}${colors.reset}`);
  console.log(`Durée totale: ${colors.cyan}${totalDuration}ms${colors.reset}`);
  
  if (successful === results.length) {
    console.log(`\n${colors.green}🎉 TOUS LES TESTS SONT PASSÉS !${colors.reset}`);
  } else {
    console.log(`\n${colors.red}⚠️  ${failed} test(s) ont échoué${colors.reset}`);
    
    // Détail des échecs
    console.log(`\n${colors.yellow}📋 Détail des échecs:${colors.reset}`);
    results.filter(r => !r.success).forEach(result => {
      console.log(`   - ${result.api}: ${result.error || `Status ${result.status}`}`);
    });
  }
  
  console.log(`\n${colors.bright}🚀 Prochaine étape: Tests dans Sanity Studio${colors.reset}`);
  console.log(`${colors.blue}💡 Ouvrez http://localhost:3333 pour tester les composants${colors.reset}`);
  
  // Code de sortie
  process.exit(failed > 0 ? 1 : 0);
}

// Gestion des signaux
process.on('SIGINT', () => {
  console.log(`\n${colors.yellow}⚠️  Tests interrompus par l'utilisateur${colors.reset}`);
  process.exit(130);
});

process.on('SIGTERM', () => {
  console.log(`\n${colors.yellow}⚠️  Tests terminés par le système${colors.reset}`);
  process.exit(143);
});

// Démarrage des tests
if (require.main === module) {
  runTests().catch(error => {
    console.error(`${colors.red}❌ Erreur fatale: ${error.message}${colors.reset}`);
    process.exit(1);
  });
}

module.exports = { testAPI, runTests };
