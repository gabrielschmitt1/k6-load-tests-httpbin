import http from 'k6/http';
import { check, sleep, group } from 'k6';

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

