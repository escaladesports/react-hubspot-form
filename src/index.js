import React from 'react'
import ReactDOM from 'react-dom'

let globalId = 0

class HubspotForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loaded: false
		}
		this.id = globalId++
		this.createForm = this.createForm.bind(this)
		this.findFormElement = this.findFormElement.bind(this)
	}
	createForm() {
		if (window.hbspt) {
			// protect against component unmounting before window.hbspt is available
			if (this.el === null) {
				return
			}
			let props = {
				...this.props
			}
			delete props.loading
			delete props.onSubmit
			delete props.onReady
			let options = {
				...props,
				target: `#${this.el.getAttribute(`id`)}`,
				onFormSubmit : ($form) => {
					// ref: https://developers.hubspot.com/docs/methods/forms/advanced_form_options
					var formData = $form.serializeArray();
					this.props.onSubmit(formData);	
				}
			}
			window.hbspt.forms.create(options)
			return true
		}
		else{
			setTimeout(this.createForm, 1)
		}
	}
	loadScript() {
		let script = document.createElement(`script`)
		script.defer = true
		script.onload = () => {
			this.createForm()
			this.findFormElement()
		}
		script.src = `http://js.hsforms.net/forms/v2.js`
		document.head.appendChild(script)
	}
	findFormElement(){
		// protect against component unmounting before form is added
		if (this.el === null) {
			return
		}
		let form = this.el.querySelector(`iframe`)
		if(form){
			this.setState({ loaded: true })
			if (this.props.onReady) {
				this.props.onReady(form);
			}
		}
		else{
			setTimeout(this.findFormElement, 1)
		}
	}
	componentDidMount() {
		if (!window.hbspt && !this.props.noScript) {
			this.loadScript()
		} else {
			this.createForm()
			this.findFormElement()
		}
	}
	componentWillUnmount() {
	}
	render() {
		return (
			<div>
				<div
					ref={el => this.el = el}
					id={`reactHubspotForm${this.id}`}
					style={{ display: this.state.loaded ? 'block' : 'none'}}
					/>
				{!this.state.loaded && this.props.loading}
			</div>
		)
	}
}

export default HubspotForm
