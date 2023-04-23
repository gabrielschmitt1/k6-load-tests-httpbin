import http from 'k6/http';
import { check, sleep, group } from 'k6';

// Define a configuração de execução
export let options = {
    stages: [
        // Aumenta gradualmente para 100 VUs durante 1 minuto
        { duration: '1m', target: 100 },
        // Mantém 100 VUs por 5 minutos
        { duration: '5m', target: 100 },
        // Diminui gradualmente para 0 VUs durante 1 minuto
        { duration: '1m', target: 0 },
    ],
};

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

    // Aguarda por 10 milissegundos entre as requisições
    sleep(0.01);
}


