isString = ( vr )->
	return typeof vr is 'string' or vr instanceof String

nonAutoAttach = [ "domel", "create", "byClass", "byId" ]
addDWrap = ( fn, el, elIdx = 0 )->
	return ( args... )->
		args.splice( elIdx, 0, el )
		return fn.apply( domHelper, args )
		
addD = ( el, key="d" )->
	if not el?
		return el
	if el[key]?
		return el
	el[key] = {}
	for nameFn in Object.keys(domHelper) when nameFn not in nonAutoAttach
		el[key][ nameFn ] = addDWrap( domHelper[  nameFn ], el )
		
	el[key].find = addDWrap( domHelper, el, 1 )
	el[key].byId = addDWrap( domHelper.byId, el, 1 )
	el[key].byClass = addDWrap( domHelper.byClass, el, 1 )
	return el

###
	
	DOM helpers

###
domHelper = ( sel, context = document, onlyFirst = false )->
	_sels = sel.split( " " )
	if _sels.every (( sel )->return sel[0] in [ ".", "#" ] )
		while _sels.length when ( _sel = _sels.splice( 0,1 )?[0] )
			switch _sel[0]
				when "."
					context = domHelper.byClass( _sel, context, onlyFirst )
				when "#"
					context = domHelper.byId( _sel, context, onlyFirst )
		return context
	_results = context.querySelectorAll(sel)
	if onlyFirst
		return addD( _results?[0] )
	return ( addD( _el ) for _el in _results )

domHelper.domel = ( el )->
	if el?
		return addD( el )
	return
	
domHelper.create = ( tag="DIV", attributes={} )->
	_el = document.createElement(tag)
	for _k, _v of attributes
		_el.setAttribute(_k, _v)
	return addD( _el )

domHelper.data = ( el, key, val )->
	if not el?.dataset?
		if val?
			return
		return addD( el )
			
	if key? and val?
		el.dataset[ key ] = val
	else if key?
		return el.dataset[ key ]
	return el.dataset

domHelper.attr = ( el, key, val )->
	if key? and val?
		el.setAttribute(key, val)
	else if key?
		el.getAttribute(key)
	return el

domHelper.byClass = ( _cl, context = document, onlyFirst = false )->
	# remove possible leading dot
	if _cl[0] is "."
		_cl = _cl[1..]
	_results = context.getElementsByClassName( _cl )
	if onlyFirst
		return addD( _results?[0] )
	return  ( addD( _el ) for _el in _results )

domHelper.byId = ( _id, context = document )->
	# remove possible leading hash
	if _id[0] is "#"
		_id = _id[1..]
	return addD( context.getElementById( _id ) )

domHelper.last = ( el, selector )->
	idx = el.childNodes.length - 1
	while idx >= 0
		if domHelper.is( el.childNodes[idx], selector )
			return addD( el.childNodes[idx] )
			break
		idx--
	return null
	
domHelper.parent = ( el, selector )->
	if not selector?
		return addD( el.parentNode )
	_cursor = el
	while _cursor.parentNode?
		_cursor = _cursor.parentNode
		if domHelper.is( _cursor, selector )
			return addD( _cursor )
	return null

domHelper.first = ( el, selector )->
	idx = el.childNodes.length - 1
	for child in el.childNodes when domHelper.is( child, selector )
		return addD( child )
	return null

domHelper.children = ( el, selector )->
	children = []
	idx = el.childNodes.length - 1
	
	for child in el.childNodes when domHelper.is( child, selector )
		children.push addD( child )
	
	return children

domHelper.countChildren = ( el, selector )->
	return domHelper.children( el, selector ).length

domHelper.is = ( el, selector )->
	if selector[0] is "."
		return domHelper.hasClass( el, selector[1..] )

	if selector[0] is "#"
		return domHelper.hasId( el, selector[1..] )
	return false

domHelper.hasClass = ( el, classname )->
	# use html5 if possible
	if el.classList?
		return el.classList.contains( classname )

	if not el?.className?
		return false
	if classname in ( el?.className?.split( " " ) or [] )
		return true
	return false

domHelper.hide = ( el )->
	if not el?.style?
		return null
	el.style.display = "none"
	return el
	
domHelper.show = ( el, display = "block" )->
	if not el?.style?
		return null
	el.style.display = display
	return el


domHelper.addClass = ( element, classname )->

	# Check if class already exists for this element
	if @hasClass( element, classname )
		return

	# Get all the classnames
	_classnames = element.className

	# If it is empty set the classname to given classname
	if not _classnames.length
		element.className = classname
		return

	# If there are more classes prepend with an empty space
	element.className +=  " #{ classname }"
	return addD( element )


domHelper.removeClass = ( element, classname ) ->

	# Check if class already removed for this element
	if not @hasClass( element, classname )
		return

	# Get all the classnames
	_classnames = element.className

	# Regex to find class
	rxp = new RegExp( "\\s?\\b#{ classname }\\b", "g" )

	# Replace this with empty space
	_classnames = _classnames.replace( rxp, "" )

	# Save this to element
	element.className = _classnames
	return addD( element )

domHelper.hasId = ( el, id )->
	if el?.id is id
		return true
	return false

domHelper.append = ( el, html )->
	if isString( html )
		_hdiv = document.createElement('div')
		_hdiv.innerHTML = html
		for child in _hdiv.childNodes when child?.tagName?
			el.appendChild( child )
	else if html instanceof HTMLCollection
		for child in html
			el.appendChild( child )
	else if html instanceof Element
		el.appendChild( html )
	return addD( el )
	
domHelper.prepend = ( el, html )->
	
	# if there is no first child it's an empty element, so fallback to simpler append
	_firstCh = el.childNodes?[0]
	if not _firstCh?
		domHelper.append( el, html )
		return
		
	_hdiv = document.createElement('div')
	_hdiv.innerHTML = html
	
	_latestFirst = _firstCh
	for child in _hdiv.childNodes by -1 when child?.tagName?
		el.insertBefore( child, _latestFirst )
		_latestFirst = child
	return el

domHelper.remove = ( el )->
	if el instanceof Element
		el.parentElement.removeChild el
		
	if el instanceof HTMLCollection
		i = el.length - 1
		while i >= 0
			if el[i] and el[i].parentElement
				el[i].parentElement.removeChild el[i]
			i--
	return el
	
domHelper.replaceWith = ( el, elToRepl )->
	domHelper.parent( el ).replaceChild( elToRepl, el )
	return el
	
domHelper.clone = ( el )->
	return addD( el.cloneNode( true ) )

domHelper.on = ( el, type, handler )->
	if not el?
		return
	if el.addEventListener?
		el.addEventListener( type, handler, false )
	else if el.attachEvent?
		el.attachEvent('on' + type, handler)
	else
		el['on' + type] = handler
	return el

domHelper.off = ( el, type, handler )->
	if not el?
		return
	if el.removeEventListener?
		el.removeEventListener( type, handler, false )
	else if el.detachEvent?
		el.detachEvent('on' + type, handler)
	else
		delete el['on' + type]
	return el
	
domHelper.emit = ( el, type )->
	evt = document.createEvent('Event')
	evt.initEvent( type, true, false)
	el.dispatchEvent(evt)
	return evt

module.exports = domHelper
