# react-hubspot-form

A React component to render HubSpot forms.

## Installation

With npm:

```bash
npm install --save react-hubspot-form
```

Or with Yarn:

```bash
yarn add react-hubspot-form
```

## Usage

```jsx
import HubspotForm from 'react-hubspot-form'

...

<HubspotForm
   portalId='your_portal_id'
   formId='your_form_id'
   onSubmit={() => console.log('Submit!')}
   onReady={(form) => console.log('Form ready!')}
   loading={<div>Loading...</div>}
   />
```

## N.B. `onSubmit` jQuery dependency

The underlying Hubspot script depends on jQuery for the `onSubmit` callback to work. If you don't want to add jQuery to your site you have two options.

### Option 1

To work around this you can listen to [hubspot global form events](https://legacydocs.hubspot.com/global-form-events)

```javascript
useEffect(() => {
  const handler = event => {
    if (
      event.data.type === "hsFormCallback" &&
      event.data.eventName === "onFormSubmit"
    ) {
      // handler stuff
    }
  };

  window.addEventListener("message", handler);

  return () => {
    window.removeEventListener("message", handler);
  };
}, []);
```

### Option 2

Polyfil jQuery, guide [here](https://www.unstack.com/blog/hubspot-on-form-submit-callbacks-without-jquery)

## Options

You can also set any [additional options that HubSpot provides](https://developers.hubspot.com/docs/methods/forms/advanced_form_options) as properties in the component.
