# React DOM Fragment [<img src="https://jonathantneal.github.io/react-logo.svg" alt="PostCSS" width="90" height="90" align="right">][React DOM Fragment]

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Support Chat][git-img]][git-url]

[React DOM Fragment] lets you create [React Fragments] that support dangerously
setting their innerHTML without a container element.

```jsx
import Fragment from 'react-dom-fragment';

<Fragment dangerouslySetInnerHTML={{ __html: '<h1>No containers here</h1>' }} />
```

[React DOM Fragment] patches DOM updates so that unchanged portions of your
code won’t be re-created. Dynamic elements like video, images, and iframes will
not reload, even as attributes update that do not change their source.

```jsx
import Fragment from 'react-dom-fragment';

<Fragment
  dangerouslySetInnerHTML={{
    __html: `<strong>${'Ever-changing description of this video'}</strong>:
      <iframe src="https://www.youtube.com/watch?v=oHg5SJYRHA0" />' } />`
  }}
/>
```

Patching occurs at the deepest possible level without any container element
so that even unchanged portions of Text Nodes are preserved.

```jsx
<p>
  ...<Fragment dangerouslySetInnerHTML={{
    __html: Math.floor(Math.random() * 100)
  }} />...
</p>

/*
1st Pass (__html === 4):
  <p>
    "..."
    "4"
    "..."
  </p>

2nd Pass (__html === 45):
  <p>
    "..."
    "4"
    "5"
    "..."
  </p>

3rd Pass (__html === 50):
  <p>
    "..."
    "50"
    "..."
  </p>
*/
```

[React DOM Fragment] is still a [React Fragment][React Fragments] you can use
as a drop-in replacement.

```jsx
<Fragment>
  <p>Lorem ipsum.</p>
  <p>Dolar sit amet.</p>
</Fragment>
```

## Usage

Add [React DOM Fragment] to your project:

```bash
npm install react-dom-fragment
```

```jsx
import Fragment from 'react-dom-fragment';

<Fragment>A regular fragment</Fragment>
<Fragment dangerouslySetInnerHTML={{
  __html: 'Content parsed as <strong>HTML</strong>'
}} />
```

React DOM Fragment will increase your bundle size by up to 2.5kB when minified
and gzipped.

[React DOM Fragment]: https://github.com/jonathantneal/react-dom-fragment
[React Fragments]: https://reactjs.org/docs/fragments.html

[cli-img]: https://img.shields.io/travis/jonathantneal/react-dom-fragment/master.svg
[cli-url]: https://travis-ci.org/jonathantneal/react-dom-fragment
[git-img]: https://img.shields.io/badge/support-chat-blue.svg
[git-url]: https://gitter.im/postcss/postcss
[npm-img]: https://img.shields.io/npm/v/react-dom-fragment.svg
[npm-url]: https://www.npmjs.com/package/react-dom-fragment
