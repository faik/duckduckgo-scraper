import { flow, Custom, Message } from '@robomotion/sdk';

flow.create('2defe0f3-eeb3-4bfe-a453-61a34c7a83e0', 'DuckDuckGo Scraper', (f) => {
  f.node('dd39a8', 'Core.Trigger.Inject', 'Démarrer', {})
    .then('d25a94', 'Core.Dialog.InputBox', 'Obtenir la requête', {
    inTitle: Custom('Recherche DuckDuckGo'),
    inText: Custom('Entrez votre requête de recherche :'),
    outText: Message('query')
  })
    .then('d3fbf4', 'Core.Browser.Open', 'Ouvrir le navigateur', {})
    .then('92c2b0', 'Core.Browser.OpenLink', 'Naviguer', { inUrl: Custom('https://duckduckgo.com') })
    .then('9f9204', 'Core.Browser.TypeText', 'Saisir la requête', { inSelector: Custom('//*[@id="searchbox_input"]'), inText: Message('query') })
    .then('beeb5c', 'Core.Flow.SubFlow', 'Nouveau sous-flux', {})
    .then('aebce4', 'Core.Browser.WaitElement', 'Attendre les résultats', {
    inSelectorType: 'css',
    inSelector: Custom('article[data-testid="result"]'),
    optTimeout: Custom('10')
  })
    .then('cbdffc', 'Core.Browser.RunScript', 'Extraire les résultats', { func: '\n                var results = [];\n                var elements = document.querySelectorAll(\'article[data-testid="result"]\');\n                elements.forEach(function(el) {\n                    var titleEl = el.querySelector(\'h2 a\');\n                    if (titleEl) {\n                        results.push({\n                            Titre: titleEl.innerText,\n                            Lien: titleEl.href\n                        });\n                    }\n                });\n                return JSON.stringify({ columns: [\'Titre\', \'Lien\'], rows: results });\n            ', outResult: Message('table_json') })
    .then('a4d044', 'Core.Programming.Function', 'Analyser les résultats', { func: '\n                msg.table = JSON.parse(msg.table_json);\n                msg.excel_path = global.get(\'$Home$\') + \'/results.xlsx\';\n                return msg;\n            ' })
    .then('b8306c', 'Core.Excel.Create', 'Créer Excel', { inPath: Message('excel_path'), optOverwrite: true })
    .then('5a7688', 'Core.Excel.SetRange', 'Écrire les résultats', {})
    .then('f12128', 'Core.Excel.Save', 'Sauvegarder Excel', {})
    .then('9528f0', 'Core.Browser.Close', 'Fermer le navigateur', {})
    .then('9262e8', 'Core.Flow.Stop', 'Arrêter', {});
}).start();