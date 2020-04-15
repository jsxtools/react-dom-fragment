# React DOM Fragment [<img src="https://jsxtools.github.io/react-logo.svg" alt="PostCSS" width="90" height="90" align="right">][React DOM Fragment]

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Support Chat][git-img]][git-url]

[React DOM Fragment] lets you create [React Fragments] that support dangerously setting their innerHTML without a container element.

```jsx
import Fragment from 'react-dom-fragment';

<Fragment dangerouslySetInnerHTML={{ __html: '<h1>No containers here</h1>' }} />
```

[React DOM Fragment] uses [React Reconciliation](https://reactjs.org/docs/reconciliation.html) so that unchanged portions of your HTML fragments aren’t recreated. Dynamic elements like video, images, and iframes will not reload, even as HTML around them changes.

```jsx
import Fragment from 'react-dom-fragment';

<Fragment
  dangerouslySetInnerHTML={{
    __html: `<strong>${'Ever-changing description of this video'}</strong>:
      <iframe src="https://www.youtube.com/watch?v=oHg5SJYRHA0" />' } />`
  }}
/>
```

[React DOM Fragment] is still a [React Fragment][React Fragments] which means you can use it as a drop-in replacement.

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

React DOM Fragment will increase your bundle size by up to 1160 bytes when minified and gzipped.

[React DOM Fragment]: https://github.com/jsxtools/react-dom-fragment
[React Fragments]: https://reactjs.org/docs/fragments.html

[cli-img]: https://img.shields.io/travis/jsxtools/react-dom-fragment/master.svg
[cli-url]: https://travis-ci.org/jsxtools/react-dom-fragment
[git-img]: https://img.shields.io/badge/support-chat-blue.svg
[git-url]: https://gitter.im/postcss/postcss
[npm-img]: https://img.shields.io/npm/v/react-dom-fragment.svg
[npm-url]: https://www.npmjs.com/package/react-dom-fragment
