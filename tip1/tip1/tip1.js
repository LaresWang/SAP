(function () {
    let template = document.createElement("template");
    template.innerHTML = `
        <div id="tip" style="width:100%;">
            <div id="content">Slide to change time period</div>
        </div>
		<style>
            :host {
                position: relative;
                padding: 0;
                margin: 0;
                background: transparent;
            }
            #tip{
                box-sizing: border-box;
                position: absolute;
                top:0;
                left:0;
                padding: 0 0 10px 0;
                font-family: 'PingFangSC-Regular';
                color: #FFFFFF;
                font-size: 14px;
                background: transparent;
            }
            #content{
                position: relative;
                box-sizing: border-box;
                padding: 15px 10px;
                background: rgba(255,255,255,0.3);
                border-radius: 5px;
            }
            #content::before{
                position: absolute;
                bottom: -10px;
                left: 10%;
                display: block;
                width: 0;
                height: 0;
                margin: auto;
                border-top: 10px solid rgba(255,255,255,0.3);
                border-left: 10px solid transparent;
                border-right: 10px solid transparent;
                content: "";
                pointer-events: auto;
            }


		</style>
	`;

    class ToolTip extends HTMLElement {
        constructor() {
            super();
            let shadowRoot = this.attachShadow({ mode: "open" });
            shadowRoot.appendChild(template.content.cloneNode(true));
            // this.root = shadowRoot;
            this._props = {};
        }
    }

    customElements.define("com-sap-sample-tip1", ToolTip);
})();