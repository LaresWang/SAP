(function () {
    let template = document.createElement("template");
    template.innerHTML = `
        <div id="my-modal" draggable="true" style="width:100%;height:100%">
            <div class="title" ><span>User Guide</span> <span id="close">x</span></div>
            <iframe src="https://i18n-1257745828.cos.ap-shanghai.myqcloud.com/sap/modal2/modal2.html?t=12311111" style="margin-left:2%;width:96%;height:100%;border:none;padding-top: 25px"></iframe>
            <div class="top zoom-area" ></div>
            <div class="right zoom-area" ></div>
            <div class="down zoom-area"></div>
            <div class="left zoom-area"></div>
            <div class="top-right zoom-area"></div>
            <div class="top-left zoom-area"></div>
            <div class="down-right zoom-area"></div>
            <div class="down-left zoom-area"></div>

            <div class="top zoom-area move-area" data-id="top"></div>
            <div class="right zoom-area move-area" data-id="right"></div>
            <div class="down zoom-area move-area" data-id="down"></div>
            <div class="left zoom-area move-area" data-id="left"></div>
            <div class="top-right zoom-area move-area" data-id="top-right"></div>
            <div class="top-left zoom-area move-area" data-id="top-left"></div>
            <div class="down-right zoom-area move-area" data-id="down-right"></div>
            <div class="down-left zoom-area move-area" data-id="down-left"></div>
        </div>
		<style>
            :host {
                position: relative;
                padding: 0;
                margin: 0;
                background: rgba(23,36,61,0.90);
                box-shadow: 0px 0px 0px 1px rgba(0,0,0,0.15);
                /*border-left: 5px solid #E9730C;*/
                border-radius: 5px;
            }
            #my-modal{
                box-sizing: border-box;
                position: absolute;
                top:0;
                left:0;
                padding: 20px 0;
                width: 100%;
                height: 100%;
                font-family: Helvetica;
                color: #FFFFFF;
                font-size: 14px;
            }
            #my-modal .title{
                padding: 0 15px 20px 15px;
                height: 20px;
                opacity: 0.85;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-bottom: 1px solid rgba(255,255,255,0.5);
                cursor: move;
            }
            #close{
                color: #98D0F8;
                opacity: 1;
                font-size:18px;
                padding: 0 10px;
                cursor: auto;
            }
            #my-modal .content{
                padding: 20px 15px;
                opacity: 0.65
            }
            #moreInfo{
                display: inline-block;
                padding: 5px 15px;
                color: #91C8F6;
                cursor: pointer;
            }
            .zoom-area{
                position: absolute;
                width: 20px;
                height: 20px;
                z-index: 1000;
            }
            .zoom-area.top{
                top: 0;
                left: 50%;
                margin-left: -10px;
                border-top: 2px solid #fff;
                height: 5px;
                cursor: n-resize;
            }
            .zoom-area.right{
                right: 0;
                top: 50%;
                margin-top: -10px;
                border-right: 2px solid #fff;
                width: 5px;
                cursor: e-resize;
            }
            .zoom-area.down{
                bottom: 0;
                left: 50%;
                margin-left: -10px;
                border-bottom: 2px solid #fff;
                height: 5px;
                cursor: s-resize;
            }
            .zoom-area.left{
                left: 0;
                top: 50%;
                margin-top: -10px;
                border-left: 2px solid #fff;
                width: 5px;
                cursor: w-resize;
            }
            .zoom-area.top-right{
                right: 0;
                top: 0;
                border-top: 2px solid #fff;
                border-right: 2px solid #fff;
                width: 10px;
                height:10px;
                cursor: ne-resize;
            }
            .zoom-area.top-left{
                left: 0;
                top: 0;
                border-top: 2px solid #fff;
                border-left: 2px solid #fff;
                width: 10px;
                height:10px;
                cursor: nw-resize;
            }
            .zoom-area.down-right{
                right: 0;
                bottom: 0;
                border-bottom: 2px solid #fff;
                border-right: 2px solid #fff;
                width: 10px;
                height:10px;
                cursor: se-resize;
            }
            .zoom-area.down-left{
                left: 0;
                bottom: 0;
                border-bottom: 2px solid #fff;
                border-left: 2px solid #fff;
                width: 10px;
                height:10px;
                cursor: sw-resize;
            }
            .move-area{
                border: none;
                width: 30px !important;
                height: 30px !important;
                z-index: 100000;
                background: transparent;
            }
            .move-area.top{
                top: -15px;
            }
            .move-area.right{
                right: -15px;
            }
            .move-area.down{
                bottom: -15px;
            }
            .move-area.left{
                left: -15px;
            }
            .move-area.top-right{
                right: -15px;
                top: -15px;
            }
            .move-area.top-left{
                left: -15px;
                top: -15px;
            }
            .move-area.down-right{
                right: -15px;
                bottom: -15px;
            }
            .move-area.down-left{
                left: -15px;
                bottom: -15px;
            }
		</style>
	`;

    class modalBox extends HTMLElement {
        constructor() {
            super();
            let shadowRoot = this.attachShadow({ mode: "open" });
            shadowRoot.appendChild(template.content.cloneNode(true));
            // this.addEventListener("click", event => {
            //     alert(1234)
            //     var event = new Event("onClick");
            //     this.dispatchEvent(event);
            // });
            console.log(document);
            this.parentEl = '';
            this.subParentEl = '';
            this.oldPos = {
                x: 0,
                y: 0
            }
            this.zoomdir = '';
            this.zoomposition = {
                x: 0,
                y: 0
            }
            this.downFlag = false;
            this.mouseEl = '';
            this.addEventListener("dragstart", this.dragSatrtHandler);
            // this.addEventListener("drag", this.dragHandler);
            this.addEventListener("dragend", this.dragendHandler);
            this.modalEL = shadowRoot.getElementById('my-modal');
            // shadowRoot.getElementById('moreInfo').addEventListener('click', this.jump)
            shadowRoot.getElementById('close').addEventListener('click', this.closeHandler.bind(this))
            let zoomels = shadowRoot.querySelectorAll('.zoom-area')
            zoomels.forEach(el => {
                el.addEventListener('mousedown', this.mousedownHandler.bind(this))
                el.addEventListener('mouseup', this.mouseupHandler.bind(this))
                el.addEventListener('mouseleave', this.mouseupHandler.bind(this))
            })
            this.root = shadowRoot;
            this._props = {};
            this.className1 = "sapLumiraStoryLayoutCommonSectionPanel sapLumiraStoryLayoutUnifiedComponentSectionPanel";
            this.className2 = "sapLumiraStoryLayoutCommonWidgetPanel sapLumiraStoryLayoutUnifiedComponentWidgetPanel";
        }

        dragSatrtHandler(e) {
            // if (!this.parent) {
            //     this.parent = document.querySelector('.sapLumiraStoryLayoutUnifiedComponentSectionPanel.selectedChild');
            //     console.log(this.parent);
            // }
            // this.parentEl = document.querySelector('.sapLumiraStoryLayoutUnifiedComponentSectionPanel.selectedChild');
            this.parentEl = this.getParentEl(this, this.className1)
            this.oldPos = {
                x: e.x,
                y: e.y
            }
        }
        dragendHandler(e) {
            var x = e.x;
            var y = e.y;
            var deltax = x - this.oldPos.x;
            var deltay = y - this.oldPos.y;
            var top = parseInt(this.parentEl.style.top);
            var left = parseInt(this.parentEl.style.left);
            var ntop = top + deltay;
            var nleft = left + deltax;
            this.parentEl.style.top = (ntop > 0 ? ntop : 0) + 'px';
            this.parentEl.style.left = (nleft > 0 ? nleft : 0) + 'px';
            this.oldPos = { x, y }
        }
        closeHandler(e) {
            // !this.parentEl && (this.parentEl = this.getParentEl(this, this.className1));
            // // this.parentEl = document.querySelector('.sapLumiraStoryLayoutUnifiedComponentSectionPanel.selectedChild');
            // this.parentEl.style.display = "none";
            window.postMessage('closeCustomModal', '*');
        }
        mousedownHandler(e) {
            e.stopPropagation();

            var currentEl = e.path[0];
            var id = currentEl.dataset.id;
            if (id) {
                this.downFlag = true;
                this.zoomdir = id;
                this.zoomposition = {
                    x: e.x,
                    y: e.y
                }
                this.parentEl = this.getParentEl(this, this.className1);
                this.subParentEl = this.getParentEl(this, this.className2);
                this.modalEL.setAttribute("draggable", false)
                this.mouseEl = this.root.querySelector('.' + id + '.zoom-area.move-area');
                this.mouseEl.addEventListener('mousemove', this.mousemoveHandler.bind(this))

            }
        }
        mousemoveHandler(e) {
            e.stopPropagation();
            if (!this.downFlag) {
                return;
            }
            let deltax = 0;
            let deltay = 0;
            let x = e.x;
            let y = e.y;

            deltay = y - this.zoomposition.y;
            deltax = x - this.zoomposition.x;

            // if (!deltay && !deltay) {
            //     return;
            // }

            console.log('ox,oy|x,y|dx,dy:::', this.zoomposition.x, this.zoomposition.y, x, y, deltax, deltay);
            // top right down left top-right top-left down-right down-left
            switch (this.zoomdir) {
                case 'top': {
                    deltay = -deltay;
                    deltax = 0;
                }; break;
                case 'right': {
                    deltax = deltax;
                    deltay = 0;
                }; break;
                case 'down': {
                    deltay = deltay;
                    deltax = 0;
                }; break;
                case 'left': {
                    deltax = -deltax;
                    deltay = 0;
                }; break;
                case 'top-right': {
                    deltay = -deltay;
                    deltax = deltax;
                }; break;
                case 'top-left': {
                    deltay = -deltay;
                    deltax = -deltax;
                }; break;
                case 'down-right': {
                    deltay = deltay;
                    deltax = deltax;
                }; break;
                case 'down-left': {
                    deltay = deltay;
                    deltax = -deltax;
                }; break;
            }

            this.zoomposition = {
                x: x,
                y: y
            }

            let top = parseInt(this.parentEl.style.top);
            let left = parseInt(this.parentEl.style.left);
            let width = parseInt(this.parentEl.style.width);
            let height = parseInt(this.parentEl.style.height);

            let newTop = top - deltay + 'px';
            let newLeft = left - deltax + 'px';
            let newWidth = width + deltax + 'px';
            let newHeight = height + deltay + 'px';

            if (['top', 'top-right'].includes(this.zoomdir)) {
                this.parentEl.style.top = newTop;
            } else if (['left', 'down-left'].includes(this.zoomdir)) {
                this.parentEl.style.left = newLeft;
            } else if ('top-left' === this.zoomdir) {
                this.parentEl.style.top = newTop;
                this.parentEl.style.left = newLeft;
            }


            this.parentEl.style.width = newWidth;
            this.parentEl.style.height = newHeight;
            this.subParentEl.style.width = newWidth;
            this.subParentEl.style.height = newHeight;
        }
        mouseupHandler(e) {
            e.stopPropagation();
            this.downFlag = false;
            if (this.mouseEl) {
                this.mouseEl.removeEventListener('mousemove', this.mousemoveHandler.bind(this))
                this.modalEL.setAttribute("draggable", true)
            }
        }
        jump() {
            location.href = "https://dynamicsuppliermanager.us10.hcs.cloud.sap/sap/fpa/ui/tenants/296b0/app.html#;mode=present;view_id=appBuilding;appId=DEE1B2FB0966B19D523837B47D7474D3";
        }
        getParentEl(child, className) {
            let parent = child.parentElement
            if (parent) {
                if (parent.className.indexOf(className) > -1) {
                    return parent
                }
                return this.getParentEl(parent, className)
            }
            return child
        }
    }

    customElements.define("com-sap-sample-modal2", modalBox);
})();