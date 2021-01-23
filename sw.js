self.addEventListener('install', evt=>{
//Création d'une instance de cache, et sauvegarde des pages dans cette instance
    caches.open('lpdwca-PWA').then(
                cache=>{
                    cache.addAll([
                        'index.html',
                        'sw.js',
                        ]);
             })

});

self.addEventListener('activate', evt => {
    console.log(evt);
});

// Gestion du mode hors connexion
self.addEventListener('fetch', evt=>{
    if (!(evt.request.url.indexOf('http') === 0)) return; 
// Recherche de la page dans le cache
    evt.respondWith(
        caches.match(evt.request).then(rep=>{
            if(rep){
                //si la page existe, on la retourne
                return rep;
            }
            /*si la page n'existe pas, on utilise la méthode network fallback pour ouvrir l'instance de cache et enregistrer la page dans le cache pour les futurs requêtes
            */
            return fetch(evt.request).then(
                newResponse=>{
                    caches.open('lpdwca-PWA').then(
                        cache=>cache.put(evt.request, newResponse
                        ));
                        /*puisqu'une réponse ne peut être utilisée 2 fois, si on a besoin de l'utiliser une seconde fois, on doit la cloner
                        */
                        return newResponse.clone();
                })
        })
    )

})