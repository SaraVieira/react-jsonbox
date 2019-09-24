# react-jsonbox

> React wrapper to use jsonbox easily

[![NPM](https://img.shields.io/npm/v/react-jsonbox.svg)](https://www.npmjs.com/package/react-jsonbox) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Exports some hooks to manipulate data in [jsonbox.io](https://jsonbox.io/) easier and get your backends up and running in minutes.

## Install

```bash
npm install --save react-jsonbox
```

## Usage

1. Import the provider and wrap your app in it to always have access to the box id and base url

The url will default to `https://jsonbox.io`

```jsx
import { JsonBoxProvider } from 'react-jsonbox'

const rootElement = document.getElementById('root')
ReactDOM.render(
  <JsonBoxProvider
    value={{ url: 'https://yourbackend.wtf/', id: 'lghjgsjhgasj' }}
  >
    <App />
  </JsonBoxProvider>,
  rootElement
)
```

2. Use the hooks

```jsx
import React, { useEffect,  useState} from 'react'

import useJsonBox from 'react-jsonbox'

const Example = () => {
  const { read } = useJsonBox()
  const [values, setValues] = useState([])

  const getData = async () => {
    const { data } = await read()
    setValues(data)
  }
  
  useEffect(() => {getData()}, [])

  return (
    <ul>
      {values.map(value => (
        <li>{value.name}</li>
      ))}
    </ul>
  )
}
```

You can see an example with all the hooks available in [the example folder](./example/src/index.js).

## License

MIT © [SaraVieira](https://github.com/SaraVieira)
