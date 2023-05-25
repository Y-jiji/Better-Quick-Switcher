import { Plugin } from 'obsidian';

export default class BetterQuickSwitcher extends Plugin {
    listener: EventListenerOrEventListenerObject

    onkeyup(evt: KeyboardEvent) {
        function common_prefix(a: string, b: string) {
            let c = "";
            for (let i = 0; i < Math.min(a.length, b.length); ++i) {
                if (a[i].toLocaleLowerCase() == b[i].toLocaleLowerCase()) { c += a[i]; }
                else { break; }
            }
            return c;
        }
        // console.log(evt.key);
        if (evt.key != "Tab") { return; }
        let select_text = document.querySelector('div.suggestion-item.is-selected > div.suggestion-content')?.textContent;
        let prompt_text = (document.querySelector('input.prompt-input') as HTMLInputElement).value;
        console.log('select =', select_text);
        console.log('prompt =', prompt_text);
        if (select_text == undefined) { return; }
        if (prompt_text == undefined || prompt_text == "") { return; }
        let common_prfx = common_prefix(select_text, prompt_text).trim();
        let suffix_text = select_text;
        if (common_prfx != "") {
            suffix_text = suffix_text?.split(common_prfx)[1];
        }
        let suffix_text_arr = suffix_text?.split('/');
        suffix_text = suffix_text_arr[0];
        console.log('common_prfx = ', common_prfx);
        console.log('suffix_text = ', suffix_text);
        let prompt_item = document.querySelector('input.prompt-input') as HTMLInputElement;
        prompt_item.value = common_prfx + suffix_text + (suffix_text_arr.length > 1 ? "/" : "");
    }

    async onload() {
        this.registerDomEvent(document, 'keyup', this.onkeyup)
    }

    onunload() { }
}