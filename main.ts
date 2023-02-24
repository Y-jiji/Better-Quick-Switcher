import { Plugin } from 'obsidian';

export default class BetterQuickSwitcher extends Plugin {
    listener: EventListenerOrEventListenerObject

    commom_prefix(a: string, b: string) {
        let c = "";
        for (let i = 0; i < Math.min(a.length, b.length); ++i) {
            if (a[i] == b[i]) { c += a[i]; }
            else { break; }
        }
        return c;
    }

    async onload() {
        this.listener = (evt: KeyboardEvent) => {
            console.log(evt.key);
            if (evt.key != "Tab") { return; }
            let select_text = document.querySelector('div.suggestion-item.is-selected > div.suggestion-content')?.textContent;
            let prompt_text = (document.querySelector('input.prompt-input') as HTMLInputElement).value;
            console.log('select =', select_text);
            console.log('prompt =', prompt_text);
            if (select_text == undefined) { return; }
            if (prompt_text == undefined || prompt_text == "") { return; }
            let common_prfx = this.commom_prefix(select_text.toLocaleLowerCase(), prompt_text.toLocaleLowerCase()).trim();
            let suffix_text = select_text.toLocaleLowerCase();
            if (common_prfx != "") {
                suffix_text = suffix_text?.split(common_prfx)[1];
            }
            suffix_text = suffix_text?.split('/')[0];
            console.log('common_prfx = ', common_prfx);
            console.log('suffix_text = ', suffix_text);
            let prompt_item = document.querySelector('input.prompt-input') as HTMLInputElement;
            prompt_item.value = common_prfx + suffix_text;
        };
        this.registerDomEvent(document, 'keyup', this.listener)
    }

    onunload() { }
}