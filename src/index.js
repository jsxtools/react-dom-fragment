import React from 'react'

/** @type {ReactComponent} Returns a React Fragment that supports dangerously setting its innerHTML. */
var ReactDOMFragment = function (
	/** @type {Object<string, string>} */ attrProps,
	/** @type {string[]} */ names,
	/** @type {WindowProxy} */ globalThis
) {
	attrProps.class = 'className'
	attrProps.for = 'htmlFor';

	[toLowerCase, toSeparatorCase('-'), toSeparatorCase(':')].forEach(function (toAttr, index) {
		names[index].split(',').forEach(function (name) {
			attrProps[toAttr(name)] = name
		})
	})

	Fragment.attrProps = attrProps

	Object.prototype.__defineGetter__('_t', function () {
		return this
	})

	globalThis = _t // eslint-disable-line no-undef

	delete Object.prototype._t

	return Fragment

	/** @typedef {} Returns a React Fragment that supports dangerously setting its innerHTML.
	* @arg {ReactComponentProps} props
	* @return {ReactComponentElement} */
	function Fragment(props) {
		/** @type {string} */
		var html = Object(props.dangerouslySetInnerHTML).__html

		if (html == null) return h(React.Fragment, props)

		var body = globalThis.document.createElement('body')

		body.innerHTML = html

		return h(React.Fragment, { key: props.key }, toChildren(body.childNodes))

		/** @typedef {<T extends string>(type: T, props?: React.HTMLProps<T>, children?: React.ReactHTMLElement<T>[]) => React.DetailedReactHTMLElement<React.HTMLProps<T>, T>} h - Returns a new React HTML Element of the given type.*/
		/** @type {h} */
		function h(type, props, children) {
			return React.createElement.bind(null, type, props).apply(null, children)
		}

		/** @typedef {(childNodes: NodeList) => React.ReactHTMLElement[]} toChildren - Returns an array of React HTML Elements. */
		/** @type {toChildren} */
		function toChildren(childNodes) {
			return names.reduce.call(childNodes, function (
				/** @type {React.ReactHTMLElement[]} */ children,
				/** @type {Element & Text} */ node
			) {
				switch (node.nodeType) {
					case 1:
						children.push(h(node.localName, toProps(node.attributes), toChildren(node.childNodes)))
						break

					case 3:
						children.push(node.data)
						break
				}

				return children
			}, [])
		}
	}

	/** @typedef {(attrs: string) => React.HTMLProps<>} toProps - Returns an array of React HTML Elements. */
	/** @type {toProps} */
	function toProps(attrs) {
		return names.reduce.call(attrs, function (
			/** @type {React.HTMLProps<>} */ props,
			/** @type {Attr} */ attr
		) {
			props[Fragment.attrProps[attr.name] || attr.name] = attr.value

			return props
		}, {})
	}

	/** Returns the string with all alphabetic characters in lowercase. */
	function toLowerCase(/** @type {string} */ string) {
		return string.toLowerCase()
	}

	/** Returns the string with camel-casing replaced with separators and all alphabetic characters in lowercase. */
	function toSeparatorCase(/** @type {string} */ separator) {
		return function (/** @type {string} */ string) {
			return toLowerCase(string.replace(/[A-Z]/g, separator + '$&'))
		}
	}
}(
	Object.create(null),
	[
		'allowFullScreen,autoFocus,autoPlay,contentEditable,crossOrigin,formNoValidate,itemScope,noModule,noValidate,playsInline,readOnly,rowSpan,spellCheck,tabIndex',
		'accentHeight,acceptCharset,alignmentBaseline,arabicForm,baselineShift,capHeight,clipPath,clipRule,colorInterpolation,colorInterpolationFilters,colorProfile,colorRendering,dominantBaseline,enableBackground,fillOpacity,fillRule,floodColor,floodOpacity,fontFamily,fontSize,fontSizeAdjust,fontStretch,fontStyle,fontVariant,fontWeight,glyphName,glyphOrientationHorizontal,glyphOrientationVertical,horizAdvX,horizOriginX,httpEquiv,imageRendering,letterSpacing,lightingColor,markerEnd,markerMid,markerStart,overlinePosition,overlineThickness,paintOrder,pointerEvents,renderingIntent,shapeRendering,stopColor,stopOpacity,strikethroughPosition,strikethroughThickness,strokeDasharray,strokeDashoffset,strokeLinecap,strokeLinejoin,strokeMiterlimit,strokeOpacity,strokeWidth,textAnchor,textDecoration,textRendering,underlinePosition,underlineThickness,unicodeBidi,unicodeRange,unitsPerEm,vAlphabetic,vHanging,vIdeographic,vMathematical,vectorEffect,vertAdvY,vertOriginX,vertOriginY,wordSpacing,writingMode,xHeight',
		'xlinkActuate,xlinkArcrole,xlinkHref,xlinkRole,xlinkShow,xlinkTitle,xlinkType,xmlBase,xmlLang,xmlSpace,xmlnsXlink'
	]
)

export default ReactDOMFragment

/** @typedef {{ children?: React.ReactNode, dangerouslySetInnerHTML?: { __html: string }, key?: React.Key }} ReactComponentProps */
/** @typedef {React.FunctionComponent<ReactComponentProps>} ReactComponent */
/** @typedef {React.FunctionComponentElement<ReactComponentProps>} ReactComponentElement */
