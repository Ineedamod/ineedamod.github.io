// x-frame-bypass.js
class XFrameBypass extends HTMLIFrameElement {
	static get observedAttributes() {
		return ['src']
	}
	constructor () {
		super()
	}
	attributeChangedCallback (name, oldValue, newValue) {
		if (newValue !== null && newValue !== oldValue && newValue !== 'about:blank')
			this.render(newValue)
	}
	render (url) {
		this.srcdoc = '<html><head><style>body, html { margin: 0; padding: 0; height: 100%; overflow: hidden; background: #fff; }</style></head><body><div style="display:flex; justify-content:center; align-items:center; height:100%;">Loading Proxy Stream...</div></body></html>'
		fetch('https://api.allorigins.win' + encodeURIComponent(url))
			.then(res => res.json())
			.then(data => {
				this.srcdoc = data.contents.replace(/<head>/i, `<head><base href="${url}">`)
			})
	}
}
customElements.define('x-frame-bypass', XFrameBypass, {extends: 'iframe'})
