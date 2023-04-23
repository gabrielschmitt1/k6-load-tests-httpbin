import http from 'k6/http';
import { check, sleep, group } from 'k6';

export let options = {
  stages: [
    { duration: '1m', target: 10 }, // Fase inicial com 10 VUs
    { duration: '2m', target: 10 }, // Mantém 10 VUs por 2 minutos
    { duration: '1m', target: 20 }, // Aumenta para 20 VUs por 1 minuto
    { duration: '2m', target: 20 }, // Mantém 20 VUs por 2 minutos
    { duration: '1m', target: 5 }, // Diminui para 5 VUs por 1 minuto
    { duration: '2m', target: 5 }, // Mantém 5 VUs por 2 minutos
  ],
  teardownTimeout: '10s', // Tempo máximo de espera para a função tearDown
};

export function setup() {
  // Função de setup para iniciar o teste
  console.log('Iniciando o teste...');
}

export function teardown() {
  // Função de teardown para finalizar o teste
  console.log('Finalizando o teste...');
}

export default function () {
  // Inicia um grupo de transações para o cenário de teste
  group('httpbin', function () {
    // Requisição GET
    let responseGet = http.get('https://httpbin.org/get');
    // Verifica se a resposta possui código de status 200 (OK)
    check(responseGet, {
      'GET status is 200': (r) => r.status === 200,
    });

    // Requisição POST
    let payload = JSON.stringify({ data: 'example' });
    let headers = { 'Content-Type': 'application/json' };
    let responsePost = http.post('https://httpbin.org/post', payload, { headers: headers });
    // Verifica se a resposta possui código de status 200 (OK)
    check(responsePost, {
      'POST status is 200': (r) => r.status === 200,
    });

    // Requisição PUT
    let responsePut = http.put('https://httpbin.org/put', payload, { headers: headers });
    // Verifica se a resposta possui código de status 200 (OK)
    check(responsePut, {
      'PUT status is 200': (r) => r.status === 200,
    });
  });

  // Aguarda por 1 segundo entre as requisições
  sleep(1);
}
