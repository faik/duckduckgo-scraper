import { flow, Custom, Message } from '@robomotion/sdk';

flow.create('f212efc9-113b-4d06-8732-ada8e0ab2c99', 'Duck Duck External', (f) => {
  f.node('dd39a8', 'Core.Trigger.Inject', 'Start', {})
    .then('d25a94', 'Core.Dialog.InputBox', 'Get Query', {
    inTitle: Custom('DuckDuckGo Search'),
    inText: Custom('Enter your search query:'),
    outText: Message('query')
  })
    .then('d3fbf4', 'Core.Browser.Open', 'Open Browser', {})
    .then('92c2b0', 'Core.Browser.OpenLink', 'Navigate', { inUrl: Custom('https://duckduckgo.com') })
    .then('9f9204', 'Core.Browser.TypeText', 'Type Query', { inSelector: Custom('//*[@id="searchbox_input"]'), inText: Message('query') });
  f.node('aebce4', 'Core.Browser.WaitElement', 'Wait for Results', {
    inSelectorType: 'css',
    inSelector: Custom('article[data-testid="result"]'),
    optTimeout: Custom('10')
  })
    .then('cbdffc', 'Core.Browser.RunScript', 'Scrape Results', { func: '\n                var results = [];\n                var elements = document.querySelectorAll(\'article[data-testid="result"]\');\n                elements.forEach(function(el) {\n                    var titleEl = el.querySelector(\'h2 a\');\n                    if (titleEl) {\n                        results.push({\n                            Title: titleEl.innerText,\n                            Link: titleEl.href\n                        });\n                    }\n                });\n                return JSON.stringify({ columns: [\'Title\', \'Link\'], rows: results });\n            ', outResult: Message('table_json') })
    .then('a4d044', 'Core.Programming.Function', 'Parse Results', { func: '\n                msg.table = JSON.parse(msg.table_json);\n                msg.excel_path = global.get(\'$Home$\') + \'/results.xlsx\';\n                return msg;\n            ' })
    .then('b8306c', 'Core.Excel.Create', 'Create Excel', { inPath: Message('excel_path'), optOverwrite: true })
    .then('5a7688', 'Core.Excel.SetRange', 'Write Results', {})
    .then('f12128', 'Core.Excel.Save', 'Save Excel', {})
    .then('9528f0', 'Core.Browser.Close', 'Close Browser', {})
    .then('9262e8', 'Core.Flow.Stop', 'Stop', {});
  f.node('beeb5c', 'Core.Flow.SubFlow', 'New Subflow', {});

  f.edge('9f9204', 0, 'f4a190', 0);
  f.edge('f4a190', 0, 'aebce4', 0);
  f.edge('9f9204', 0, 'beeb5c', 0);
  f.edge('beeb5c', 0, 'aebce4', 0);
}).start();