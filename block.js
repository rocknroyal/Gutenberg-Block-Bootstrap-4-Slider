( function( blocks, editor, i18n, element, components, _ ) {
	
	var el = element.createElement;
	var RichText = editor.RichText;
	var MediaUpload = editor.MediaUpload;

	blocks.registerBlockType( 'royality/tb4-slider', {
		title: i18n.__( 'Royal Slider', 'royality' ),
		icon: 'images-alt2',
		category: 'layout',
		attributes: {
			images: {
				type: 'array',
			},
		},
		edit: function( props ) {
			
			var attributes = props.attributes;
		
			var onSelectImage = function( media ) {
				
				var images = [];

				media.forEach( function( item, index ) {
				    images.push(item);
				});

				return props.setAttributes( {
					images: images,
				} );
			};

			var generateSliderMarkup = function( images ) {
				
				if(images == undefined) return;

				return images.map( (image, key) =>
			        el( 'div', { className: 'slider-image' },
						el( 'img', { src: image.url, className: 'd-block w-100' } ),
					),
			    )
			}
			
			var ids = '';
			if(attributes.images != undefined)
			{	
				ids = [];
				attributes.images.forEach( function( image, index ) {
				    ids.push(image.id);
				});
			}
			
			return (
				el( 'div', { className: props.className },
					el( 'div', { className: 'upload-area' },
						el( MediaUpload, {
							onSelect: onSelectImage,
							allowedTypes: 'image',
							multiple: true,
							gallery: true,
							value: ids,
							render: function( obj ) {
								return el( components.Button, {
										className: 'button button-large',
										onClick: obj.open
									},
									i18n.__( 'Upload/Manage Images', 'royality' )
								);
							}
						} )
					),
					generateSliderMarkup(attributes.images)
				)
			);
		},
		save: function( props ) {
			
			var attributes = props.attributes;

			var generateSliderMarkup = function( images ) {
				
				if(images == undefined) return;

				return images.map( (image, key) =>
			        el( 'div', { className: `carousel-item ${key == 0 ? 'active' : ''}` },
						el( 'img', { src: image.url, className: `d-block w-100` } ),
						el( 'div', { className: 'carousel-caption d-none d-md-block' },
							el( 'h5', null, image.alt ),
							el( 'p', null, image.caption ),
						)
					),
			    )
			}

			var generateSliderIndicators = function( images ) {
				
				if(images == undefined) return;

				return images.map( (image, key) =>
			        el( 'li', { 'data-target': 'carousel123', 'data-slide-to': key })
			    )
			}

			return (
				el( 'div', { className: props.className },
					attributes.images &&
						el( 'div', { className: 'carousel slide', id: 'carousel123', 'data-ride': 'carousel' },
							el( RichText.Content, {
								tagName: 'ol', className: 'carousel-indicators', value: generateSliderIndicators(attributes.images)
							} ),
							el( RichText.Content, {
								tagName: 'div', className: 'carousel-inner', value: generateSliderMarkup(attributes.images)
							} ),
							el( 'a', { className: 'carousel-control-prev', href: '#carousel123', role: 'button', 'data-slide': 'prev' },
								el( 'span', { className: 'carousel-control-prev-icon', 'aria-hidden' : 'true' } ),
								el( 'span', { className: 'sr-only', value: 'Previous' } )
							),
							el( 'a', { className: 'carousel-control-next', href: '#carousel123', role: 'button', 'data-slide': 'next' },
								el( 'span', { className: 'carousel-control-next-icon', 'aria-hidden' : 'true' } ),
								el( 'span', { className: 'sr-only', value: 'Next' } )
							),
						)
				)
			);
		},
	} );

} )(
	window.wp.blocks,
	window.wp.editor,
	window.wp.i18n,
	window.wp.element,
	window.wp.components,
	window._,
);
