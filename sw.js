/* ============================================================
   Service worker: deixa o curso funcionar OFFLINE e abrir RÁPIDO
   mesmo com sinal fraco.

   Estratégia:
   - O que já está no cache é servido depois de, no máximo, 3 segundos
     esperando a rede. Rede boa: vem a versão nova. Rede ruim: vem o
     cache na hora, e a versão nova é guardada em segundo plano para a
     próxima vez. Sem rede: cache direto.
   - O que ainda não está no cache espera a rede o tempo que precisar.
   - O índice manda pré-guardar as aulas das semanas liberadas
     (mensagem "precache"), então a semana inteira funciona offline
     mesmo que ela só tenha aberto o dia 1.
   ============================================================ */
var CACHE = 'ingles-v4';   /* mude o número para forçar a troca de tudo o que está guardado */
var ESPERA_REDE_MS = 3000;
var BASICO = [
  './',
  './index.html',
  './gramatica.html',
  './revisao.html',
  './assets/curso.css',
  './assets/curso.js',
  './assets/config.js',
  './assets/semanas.js',
  './assets/gramatica.js',
  './assets/vocabulario.js',
  './assets/revisao.js',
  './assets/icone-192.png',
  './assets/icone-512.png',
  './assets/icone-maskable-512.png'
];

self.addEventListener('install', function (ev) {
  ev.waitUntil(
    caches.open(CACHE).then(function (c) {
      /* um item que falhe não pode derrubar a instalação inteira */
      return Promise.all(BASICO.map(function (u) {
        return c.add(new Request(u, { cache: 'reload' })).catch(function () {});
      }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (ev) {
  ev.waitUntil(
    caches.keys().then(function (nomes) {
      return Promise.all(nomes.map(function (n) {
        return n === CACHE ? null : caches.delete(n);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

/* o índice pede para guardar as aulas liberadas */
self.addEventListener('message', function (ev) {
  var d = ev.data || {};
  if (d.tipo !== 'precache' || !Array.isArray(d.urls)) return;
  ev.waitUntil(
    caches.open(CACHE).then(function (c) {
      return Promise.all(d.urls.map(function (u) {
        return c.match(u).then(function (tem) {
          if (tem) return null;                       /* já está: não gasta rede */
          return c.add(u).catch(function () {});
        });
      }));
    })
  );
});

function comTempoLimite(promessa, ms) {
  return new Promise(function (res, rej) {
    var t = setTimeout(function () { rej(new Error('tempo esgotado')); }, ms);
    promessa.then(function (v) { clearTimeout(t); res(v); },
                  function (e) { clearTimeout(t); rej(e); });
  });
}

self.addEventListener('fetch', function (ev) {
  var req = ev.request;
  if (req.method !== 'GET') return;
  if (new URL(req.url).origin !== location.origin) return;  /* link da IA passa direto */

  var daRede = fetch(req).then(function (resp) {
    if (resp && resp.status === 200 && resp.type === 'basic') {
      var copia = resp.clone();
      caches.open(CACHE).then(function (c) { c.put(req, copia); });
    }
    return resp;
  });

  ev.respondWith(
    caches.match(req).then(function (guardado) {
      if (guardado) {
        /* tem cache: espera a rede um pouquinho, senão serve o cache */
        return comTempoLimite(daRede, ESPERA_REDE_MS).catch(function () { return guardado; });
      }
      /* não tem cache: só a rede resolve */
      return daRede.catch(function () {
        if (req.mode === 'navigate') return caches.match('./index.html');
        return Response.error();
      });
    })
  );
});
