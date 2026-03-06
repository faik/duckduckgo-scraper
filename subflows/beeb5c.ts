import { subflow, Custom } from '@robomotion/sdk';

subflow.create('Nouveau sous-flux', (f) => {
  f.node('9698cc', 'Core.Flow.Begin', 'Début', {})
    .then('051be0', 'Core.Browser.ClickElement', 'Rechercher', { inSelector: Custom('//body/div/div/div/main/article/div[1]/div[1]/div[2]/div/header/div/section[2]/div/form/div/div[3]/button') })
    .then('3599ed', 'Core.Flow.End', 'Fin', {});
});