(function () {
    let template = document.createElement("template");
    template.innerHTML = `
        <div id="cover" style="width:100%;">
            <div id="content"></div>
        </div>
		<style>
            :host {
                position: relative;
                padding: 0;
                margin: 0;
                background: transparent;
            }
            #cover{
                box-sizing: border-box;
                position: absolute;
                top:0;
                left:0;
                padding: 0;
                background: transparent;
            }
            #content{
                position: relative;
                box-sizing: border-box;
                height: 100%;
                width:100%;
                background: rgba(255,255,255,0.3);
                border-radius: 5px;
            }

		</style>
	`;

    class Cover extends HTMLElement {
        constructor() {
            super();
            let shadowRoot = this.attachShadow({ mode: "open" });
            shadowRoot.appendChild(template.content.cloneNode(true));
            // this.root = shadowRoot;
            this._props = {};
        }
    }

    customElements.define("com-sap-sample-cover", Cover);
})();