/* ======================================================================== */
/* animations */
/* ======================================================================== */
function createOSScene($el, tl) {

	new $.ScrollMagic.Scene({
			triggerElement: $el,
			triggerHook: SMSceneTriggerHook,
			reverse: SMSceneReverse
		})
		.setTween(tl)
		.addTo(SMController);

}

function animateCurtainImg($curtain, $img) {

	var tl = new TimelineMax();

	return tl.to($curtain, 0.3, {
		x: '0%',
		ease: Expo.easeInOut,
	}).to($curtain, 0.4, {
		y: '0%',
		ease: Expo.easeInOut,
	}).set($img, {
		autoAlpha: 1
	}).to($img, 1, {
		scale: 1,
		ease: Power4.easeOut
	}).to($curtain, 0.3, {
		y: '102%',
		ease: Expo.easeInOut,
	}, '-=1');

}

function animateCurtainContent($curtain, $content) {

	var tl = new TimelineMax();

	return tl.to($curtain, 0.3, {
		x: '0%',
		ease: Expo.easeInOut,
	}).to($curtain, 0.4, {
		y: '0%',
		ease: Expo.easeInOut,
	}).set($content, {
		autoAlpha: 1
	}).to($curtain, 0.3, {
		y: '102%',
		ease: Expo.easeInOut,
	});

}

function setCurtainImg($curtain, $img) {

	TweenMax.set($img, {
		scale: 1.1,
		autoAlpha: 0,
	});

	TweenMax.set($curtain, {
		y: '-99%',
		x: '-100%'
	});

}

function setCurtainContent($curtain, $content) {

	TweenMax.set($content, {
		autoAlpha: 0,
	});

	TweenMax.set($curtain, {
		y: '-99%',
		x: '-100%'
	});

}

/* ======================================================================== */
/* burger */
/* ======================================================================== */
var Burger = function () {

	var OPEN_CLASS = 'burger_opened';

	var header = new Header();

	$(document).on('click', '.js-burger', function (e) {

		e.preventDefault();

		if (!e.detail || e.detail == 1) {

			var $burger = $(this);

			if ($burger.hasClass(OPEN_CLASS)) {
				$burger.removeClass(OPEN_CLASS);
				header.closeOverlayMenu();
			} else {
				$burger.addClass(OPEN_CLASS);
				header.openOverlayMenu();
			}

		}

	});

}

/* ======================================================================== */
/* button */
/* ======================================================================== */
var Button = function () {

	$('.button-square').each(function () {

		var
			$el = $(this),
			$rect = $el.find('.rect');

		TweenMax.set($rect, {

			drawSVG: 0,
			stroke: '#b68c70',

		});

		$el.on('mouseenter touchstart', function () {

			TweenMax.to($rect, 0.6, {
				drawSVG: true,
				ease: Power4.easeInOut
			});

		}).on('mouseleave touchend', function () {

			TweenMax.to($rect, 0.6, {
				drawSVG: false,
				ease: Power4.easeInOut
			});

		});

	});

}

/* ======================================================================== */
/* circle */
/* ======================================================================== */
var Circle = function () {

	this.animate = function ($el) {

		var $circle = $el.find('.circle');

		if (!$circle.length) {
			return;
		}

		TweenMax.set($circle, {

			drawSVG: 0,
			stroke: '#b68c70',

		});

		$el.on('mouseenter touchstart', function () {

			TweenMax.to($circle, 0.6, {
				drawSVG: true,
				ease: Power4.easeInOut
			});

		}).on('mouseleave touchend', function () {

			TweenMax.to($circle, 0.6, {
				drawSVG: false,
				ease: Power4.easeInOut
			});

		});

	}

}

/* ======================================================================== */
/* figureFeature */
/* ======================================================================== */
var FigureFeature = function () {

	var $elements = $('.figure-feature');

	if (!$elements.length) {
		return;
	}

	var circle = new Circle();

	$elements.each(function () {
		circle.animate($(this));
	});

}

/* ======================================================================== */
/* figurePortfolio */
/* ======================================================================== */
var FigurePortfolio = function () {

	var $target = $('.figure-portfolio[data-os-animation]'),
		$img = $target.find('.overflow__content'),
		$curtain = $target.find('.overflow__curtain'),
		$heading = $target.find('.figure-portfolio__header h2'),
		$headline = $target.find('.figure-portfolio__headline'),
		$info = $target.find('.figure-portfolio__info'),
		splitHeading = splitLines($heading),
		splitInfo = splitLines($info);

	prepare();

	function prepare() {

		if (!$target.length) {
			return;
		}

		setLines(splitHeading.words);
		setLines(splitInfo.words);

		TweenMax.set($headline, {
			scaleX: 0,
			transformOrigin: 'left center'
		});

		setCurtainImg($curtain, $img);

	}

	this.animate = function () {

		if (!$target.length) {
			return;
		}

		$target.each(function () {

			var $el = $(this),
				tl = new TimelineMax(),
				$elLink = $el.find('.figure-portfolio__link'),
				$elImg = $el.find($img),
				$elCurtain = $el.find($curtain),
				$elHeading = $el.find($heading),
				$elHeadline = $el.find($headline),
				elSplitInfo = $el.find(splitInfo.words),
				elSplitHeading = $el.find(splitHeading.words);

			tl
				.add(animateCurtainImg($elCurtain, $elImg))
				.to($elHeadline, 0.6, {
					scaleX: 1,
					ease: Power4.easeOut
				}, '-=1')
				.add(animateLines(elSplitInfo), '-=0.8')
				.add(animateLines(elSplitHeading), '-=0.8');

			createOSScene($el, tl);

			$elLink
				.on('mouseenter touchstart', function () {

					TweenMax.to($elImg, 0.3, {
						scale: 1.1,
						ease: Power3.easeInOut,
					});

					TweenMax.to($elHeadline, 0.3, {
						scaleX: 0.8,
						ease: Power3.easeInOut,
						transformOrigin: 'right center'
					});

					TweenMax.to($elHeading, 0.3, {
						x: '10px',
						ease: Power3.easeInOut,
					});

				})
				.on('mouseleave touchend', function () {

					TweenMax.to($elImg, 0.3, {
						scale: 1,
						ease: Power2.easeInOut,
					});

					TweenMax.to($elHeadline, 0.3, {
						scaleX: 1,
						ease: Power2.easeInOut,
						transformOrigin: 'right center'
					});

					TweenMax.to($elHeading, 0.3, {
						x: '0px',
						ease: Power2.easeInOut,
					});

				});

		});

	}


}

/* ======================================================================== */
/* figureService */
/* ======================================================================== */
var FigureService = function () {

	var $target = $('.figure-service');

	if (!$target.length) {
		return;
	}

	var circle = new Circle(),
		$icons = $target.find('.figure-service__icon'),
		$headlines = $target.find('.figure-service__headline'),
		$numbers = $target.find('.figure-service__number'),
		$texts = $target.find('.figure-service__header p'),
		splitDescr = new SplitText($texts, {
			type: 'lines',
			linesClass: 'split-line',
		});

	setLines(splitDescr.lines);

	$target.each(function () {

		var $el = $(this),
			$elIcon = $el.find($icons),
			$elHeadline = $el.find($headlines),
			$elNumber = $el.find($numbers),
			tl = new TimelineMax(),
			elDescr = $el.find(splitDescr.lines);

		circle.animate($el);

		$el
			.on('mouseenter touchstart', function () {

				tl
					.clear()
					.to($elHeadline, 0.6, {
						scaleX: 2,
						ease: Power4.easeOut
					})
					.to($elNumber, 0.3, {
						y: '-50px',
						autoAlpha: 0
					}, '-=0.6')
					.to($elIcon, 0.6, {
						y: '-50px',
						ease: Power4.easeOut
					}, '-=0.6')
					.add(animateLines(elDescr, 0.6, 0.1), '-=0.6');

			})
			.on('mouseleave touchend', function () {

				tl
					.clear()
					.to($elHeadline, 0.3, {
						scaleX: 1
					})
					.to($elNumber, 0.3, {
						y: '0px',
						autoAlpha: 1
					}, '-=0.3')
					.to($elIcon, 0.3, {
						y: '0px'
					}, '-=0.3')
					.to(elDescr, 0.3, {
						y: '100%',
						autoAlpha: 0
					}, '-=0.3');

			});

	});


}

/* ======================================================================== */
/* form */
/* ======================================================================== */
var Form = function () {

	floatLabels();
	ajaxForm();

	function floatLabels() {

		var
			INPUT_CLASS = '.input-float__input',
			INPUT_NOT_EMPTY = 'input-float__input_not-empty',
			INPUT_FOCUSED = 'input-float__input_focused';

		if (!$(INPUT_CLASS).length) {
			return;
		}

		$(INPUT_CLASS).each(function () {

			var $currentField = $(this);

			if ($currentField.val()) {
				$currentField.addClass(INPUT_NOT_EMPTY);
			} else {
				$currentField.removeClass([INPUT_FOCUSED, INPUT_NOT_EMPTY]);
			}

		});

		$(document).on('focusin', INPUT_CLASS, function () {

			var $currentField = $(this);

			$currentField.addClass(INPUT_FOCUSED).removeClass(INPUT_NOT_EMPTY);

		}).on('focusout', INPUT_CLASS, function () {

			var $currentField = $(this);

			// delay needed due to issues with datepicker
			if ($currentField.val()) {
				$currentField.removeClass(INPUT_FOCUSED).addClass(INPUT_NOT_EMPTY);
			} else {
				$currentField.removeClass(INPUT_FOCUSED);
			}

		});

	}

	function ajaxForm() {

		var $form = $('.js-ajax-form');

		if (!$form.length) {
			return;
		}

		$form.validate({
			errorElement: 'span',
			errorPlacement: function (error, element) {
				error.appendTo(element.parent()).addClass('form__error');
			},
			submitHandler: function (form) {
				ajaxSubmit(form);
			}
		});

		function ajaxSubmit(form) {

			$.ajax({
				type: $form.attr('method'),
				url: $form.attr('action'),
				data: $form.serialize()
			}).done(function () {
				alert($form.attr('data-message-success'));
				$form.trigger('reset');
				floatLabels();
			}).fail(function () {
				alert($form.attr('data-message-error'));
			});
		}

	}

}

/* ======================================================================== */
/* figurePost */
/* ======================================================================== */
var FigurePost = function () {

	var $target = $('.figure-post[data-os-animation]'),
		$heading = $target.find('.figure-post__content h3'),
		$text = $target.find('.figure-post__content p'),
		splitHeading = splitLines($heading),
		splitDescr = splitLines($text);

	prepare();

	function prepare() {

		if (!$target.length) {
			return;
		}

		setLines(splitHeading.words);
		if (splitDescr) {
			setLines(splitDescr.lines);
		}

	}

	this.animate = function () {

		if (!$target.length) {
			return;
		}

		$target.each(function () {

			var $el = $(this),
				tl = new TimelineMax(),
				$elHeading = $el.find($heading),
				elSplitDescr = $elHeading.find(splitDescr.lines),
				elSplitHeading = $elHeading.find(splitHeading.words);

			tl
				.add(animateLines(elSplitHeading));
			if (splitDescr) {
				tl.add(animateLines(elSplitDescr, 1, 0.1));
			}

			createOSScene($el, tl);

		});
	}
}

/* ======================================================================== */
/* gmap */
/* ======================================================================== */
var GMap = function () {

	var $mapContainer = $('#js-gmap');

	if ($mapContainer.length) {

		var
			LAT = parseFloat($mapContainer.attr('data-gmap-lat')),
			LON = parseFloat($mapContainer.attr('data-gmap-lon')),
			ZOOM = parseInt($mapContainer.attr('data-gmap-zoom')),
			MARKER = $mapContainer.attr('data-gmap-marker'),
			TITLE = $mapContainer.attr('data-gmap-title');

		var map = new google.maps.Map(document.getElementById($mapContainer[0].id), {
			center: {
				lat: LAT,
				lng: LON
			},
			zoom: ZOOM,
			styles: [{
				"featureType": "water",
				"elementType": "geometry",
				"stylers": [{
					"color": "#e9e9e9"
				}, {
					"lightness": 17
				}]
			}, {
				"featureType": "landscape",
				"elementType": "geometry",
				"stylers": [{
					"color": "#f5f5f5"
				}, {
					"lightness": 20
				}]
			}, {
				"featureType": "road.highway",
				"elementType": "geometry.fill",
				"stylers": [{
					"color": "#ffffff"
				}, {
					"lightness": 17
				}]
			}, {
				"featureType": "road.highway",
				"elementType": "geometry.stroke",
				"stylers": [{
					"color": "#ffffff"
				}, {
					"lightness": 29
				}, {
					"weight": 0.2
				}]
			}, {
				"featureType": "road.arterial",
				"elementType": "geometry",
				"stylers": [{
					"color": "#ffffff"
				}, {
					"lightness": 18
				}]
			}, {
				"featureType": "road.local",
				"elementType": "geometry",
				"stylers": [{
					"color": "#ffffff"
				}, {
					"lightness": 16
				}]
			}, {
				"featureType": "poi",
				"elementType": "geometry",
				"stylers": [{
					"color": "#f5f5f5"
				}, {
					"lightness": 21
				}]
			}, {
				"featureType": "poi.park",
				"elementType": "geometry",
				"stylers": [{
					"color": "#dedede"
				}, {
					"lightness": 21
				}]
			}, {
				"elementType": "labels.text.stroke",
				"stylers": [{
					"visibility": "on"
				}, {
					"color": "#ffffff"
				}, {
					"lightness": 16
				}]
			}, {
				"elementType": "labels.text.fill",
				"stylers": [{
					"saturation": 36
				}, {
					"color": "#333333"
				}, {
					"lightness": 40
				}]
			}, {
				"elementType": "labels.icon",
				"stylers": [{
					"visibility": "off"
				}]
			}, {
				"featureType": "transit",
				"elementType": "geometry",
				"stylers": [{
					"color": "#f2f2f2"
				}, {
					"lightness": 19
				}]
			}, {
				"featureType": "administrative",
				"elementType": "geometry.fill",
				"stylers": [{
					"color": "#fefefe"
				}, {
					"lightness": 20
				}]
			}, {
				"featureType": "administrative",
				"elementType": "geometry.stroke",
				"stylers": [{
					"color": "#fefefe"
				}, {
					"lightness": 17
				}, {
					"weight": 1.2
				}]
			}]
		});

		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(LAT, LON),
			map: map,
			// title: TITLE,
			icon: MARKER
		});

		marker.addListener('click', function () {
			var infowindow = new google.maps.InfoWindow({
				content: TITLE
			});
			infowindow.open(map, marker);
		});
	}
}

/* ======================================================================== */
/* sliderTestimonials */
/* ======================================================================== */
var Grid = function () {

	var $grid = $('.js-grid');

	if (!$grid.length) {
		return;
	}

	$grid.masonry({
		itemSelector: '.js-grid__item',
		columnWidth: '.js-grid__sizer',
		horizontalOrder: true
	});
}

/* ======================================================================== */
/* Header */
/* ======================================================================== */

var Header = function () {

	var
		$overlay = $('.header__wrapper-overlay-menu'),
		$menuLinks = $('.overlay-menu > li > a .overlay-menu__item-wrapper'),
		$submenu = $('.overlay-sub-menu'),
		$submenuButton = $('.js-submenu-back'),
		$submenuLinks = $submenu.find('> li > a .overlay-menu__item-wrapper');

	setOverlayMenu();
	stickHeader();

	function setOverlayMenu() {

		TweenMax.set([$overlay, $menuLinks, $submenuLinks], {
			y: '100%'
		});

		TweenMax.set([$submenu, $submenuButton], {
			autoAlpha: 0,
			y: '10px'
		});

	}

	this.closeOverlayMenu = function () {

		var tl = new TimelineMax();

		tl.timeScale(2);

		tl
			.to([$menuLinks, $submenuLinks], 0.6, {
				y: '-100%',
				ease: Power4.easeIn
			})
			.to($submenuButton, 0.6, {
				y: '-10px',
				autoAlpha: 0
			})
			.to($overlay, 1, {
				y: '-100%',
				ease: Expo.easeInOut
			})
			.add(function () {
				setOverlayMenu();
			});

	};

	this.openOverlayMenu = function () {

		var tl = new TimelineMax();

		tl
			.to($overlay, 1, {
				y: '0%',
				ease: Expo.easeInOut,
			}).staggerTo($menuLinks, 0.6, {
				y: '0%',
				ease: Power4.easeOut,
			}, .05, '-=0.3');

	};

	function stickHeader() {

		var $header = $('.js-header-sticky');

		new $.ScrollMagic.Scene({
				offset: '1px',
			})
			.setPin($header, {
				pushFollowers: false
			})
			.setClassToggle($header, 'header_sticky')
			.addTo(SMController);

	}


}

/* ======================================================================== */
/* Menu */
/* ======================================================================== */
var Menu = function () {

	var $menu = $('.js-overlay-menu');

	if (!$menu.length) {
		return;
	}

	var $links = $menu.find('.menu-item-has-children > a'),
		$submenus = $menu.find('.overlay-sub-menu'),
		$submenuButton = $('.js-submenu-back'),
		OPEN_CLASS = 'opened',
		tl = new TimelineMax();

	function openSubmenu($submenu, $currentMenu) {

		var
			$currentLinks = $currentMenu.find('> li > a .overlay-menu__item-wrapper'),
			$submenuLinks = $submenu.find('> li > a .overlay-menu__item-wrapper');

		tl
			.stop()
			.play()
			.set($submenu, {
				autoAlpha: 1,
				zIndex: 100
			})
			.to($currentLinks, 0.6, {
				y: '-100%',
				ease: Power4.easeIn
			}, '-=0.3')
			.staggerTo($submenuLinks, 0.6, {
				y: '0%',
				ease: Power4.easeOut
			}, 0.05);

		$submenus.removeClass(OPEN_CLASS);
		$submenu.not($menu).addClass(OPEN_CLASS);

		if ($submenus.hasClass(OPEN_CLASS)) {
			tl.to($submenuButton, 0.3, {
				autoAlpha: 1,
				y: '0px'
			}, '-=0.6');
		} else {
			tl.to($submenuButton, 0.3, {
				autoAlpha: 0,
				y: '10px'
			}, '-=0.6');
		}

	}

	function closeSubmenu($submenu, $currentMenu) {

		var
			$currentLinks = $currentMenu.find('> li > a .overlay-menu__item-wrapper'),
			$submenuLinks = $submenu.find('> li > a .overlay-menu__item-wrapper');

		tl
			.stop()
			.play()
			.set($submenu, {
				zIndex: -1
			})
			.to($submenuLinks, 0.6, {
				y: '100%',
				ease: Power4.easeIn
			}, '-=0.3')
			.staggerTo($currentLinks, 0.6, {
				y: '0%',
				ease: Power4.easeOut
			}, 0.05)
			.set($submenu, {
				autoAlpha: 0,
				y: '10px'
			});

		$submenus.removeClass(OPEN_CLASS);
		$currentMenu.not($menu).addClass(OPEN_CLASS);

		if ($submenus.hasClass(OPEN_CLASS)) {
			TweenMax.to($submenuButton, 0.3, {
				autoAlpha: 1,
				y: '0px'
			}, '-=0.6');
		} else {
			TweenMax.to($submenuButton, 0.3, {
				autoAlpha: 0,
				y: '10px'
			}, '-=0.6');
		}

	}

	$links.on('click', function (e) {

		e.preventDefault();

		if (!e.detail || e.detail == 1) {
			var
				$el = $(this),
				$currentMenu = $el.parents('ul'),
				$submenu = $el.next('.overlay-sub-menu');

			openSubmenu($submenu, $currentMenu);
		}

	});

	$submenuButton.on('click', function (e) {

		e.preventDefault();

		if (!e.detail || e.detail == 1) {
			var
				$el = $(this),
				$openedMenu = $submenus.filter('.' + OPEN_CLASS),
				$prevMenu = $openedMenu.parent('li').parent('ul');

			closeSubmenu($openedMenu, $prevMenu);
		}

	})

}

/* ======================================================================== */
/* preloader */
/* ======================================================================== */
var Preloader = function (callback) {

	var
		$preloader = $('.preloader'),
		$curtain = $preloader.find('.preloader__curtain'),
		$logo = $preloader.find('.preloader__logo'),
		$rect = $logo.find('.rect'),
		tl = new TimelineMax();

	load();

	$('body').imagesLoaded().always({
		background: true
	}, function () {

		if (!$preloader.length) {
			callback();
			return;
		}

		finish();
	});

	function finish() {

		tl
			.clear()
			.to($rect, 2, {
				drawSVG: true,
				ease: Expo.easeInOut
			})
			.to($logo, 0.3, {
				autoAlpha: 0,
			}, '-=0.3')
			.staggerTo($curtain, 1, {
				y: '-100%',
				ease: Expo.easeInOut
			}, 0.05, '-=0.3')
			.set($preloader, {
				autoAlpha: 0
			})
			.add(function () {
				callback();
			}, '-=0.4');

	}

	function load() {

		tl.fromTo($rect, 15, {
			drawSVG: 0,
			stroke: '#b68c70',
			ease: SlowMo.ease.config(0.7, 0.7, false)
		}, {
			drawSVG: true,
		});

	}

	this.curtainsUp = function () {

		tl
			.staggerTo($curtain, 1, {
				y: '-100%',
				ease: Expo.easeInOut
			}, 0.05)
			.set($preloader, {
				autoAlpha: 0
			});

	}

	this.curtainsDown = function () {

		tl
			.set($preloader, {
				autoAlpha: 1
			})
			.staggerTo($curtain, 1, {
				y: '0%',
				ease: Expo.easeInOut
			}, 0.05)
			.set($rect, {
				drawSVG: 0
			})
			.to($logo, 0.6, {
				autoAlpha: 1,
			});

	}

}

/* ======================================================================== */
/* sectionFeatures */
/* ======================================================================== */
var SectionFeatures = function () {

	var $target = $('.section-features[data-os-animation]'),
		$heading = $('.figure-feature__header h3'),
		$text = $('.figure-feature__header p'),
		$icon = $('.figure-feature__icon'),
		splitDescr = splitLines($text),
		splitHeading = splitLines($heading),
		tl = new TimelineMax();

	prepare();

	function prepare() {

		if (!$target.length) {
			return;
		}

		setLines(splitHeading.words);
		setLines(splitDescr.lines);

		TweenMax.set($icon, {
			autoAlpha: 0,
			y: '30px'
		});

	}

	this.animate = function () {

		if (!$target.length) {
			return;
		}
		tl.staggerTo($icon, 0.6, {
			autoAlpha: 1,
			y: '0px',
			ease: Power4.easeOut
		}, 0.05)
		tl.add(animateLines(splitHeading.words), '-=0.6')
		tl.add(animateLines(splitDescr.lines), '-=0.6')

		createOSScene($target, tl);

	}

}

/* ======================================================================== */
/* sectionCTA */
/* ======================================================================== */
var SectionCTA = function () {

	var $target = $('.section-cta[data-os-animation]'),
		$header = $target.find('.section-cta__header'),
		$headline = $target.find('.section-cta__headline'),
		$heading = $header.find('h2, h4'),
		$button = $target.find('.section-cta__wrapper-button'),
		splitHeading = splitLines($heading);

	prepare();

	function prepare() {

		if (!$target.length) {
			return;
		}

		setLines(splitHeading.lines);

		TweenMax.set($button, {
			autoAlpha: 0,
			y: '30px'
		});

		TweenMax.set($headline, {
			scaleX: 0,
			transformOrigin: 'left center'
		});
	}

	this.animate = function () {

		if (!$target.length) {
			return;
		}

		$target.each(function () {

			var $el = $(this),
				elLines = $el.find(splitHeading.lines),
				$elHeader = $el.find($header),
				tl = new TimelineMax()

			tl
				.add(animateLines(elLines, 1, 0.1))
				.to($button, 0.6, {
					autoAlpha: 1,
					y: '0px'
				}, '-=0.8')
				.to($headline, 0.6, {
					scaleX: 1,
					ease: Expo.easeInOut
				}, '-=0.6');

			createOSScene($elHeader, tl);

		});

	}

}

/* ======================================================================== */
/* sectionFullscreen4 */
/* ======================================================================== */
var SectionFullscreen4 = function () {

	var $target = $('.section-fullscreen_4[data-os-animation]'),
		tl = new TimelineMax(),
		$headline = $target.find('.slider-fullscreen4__slide-headline'),
		$heading = $target.find('.slider-fullscreen4__slide-header h2'),
		splitHeading = splitLines($heading);

	prepare();

	function prepare() {

		if (!$target.length) {
			return;
		}

		setLines(splitHeading.words);

		TweenMax.set($headline, {
			scaleX: 0,
			transformOrigin: 'center center',
		});

	}

	this.animate = function () {

		if (!$target.length) {
			return;
		}

		tl
			.staggerTo($headline, 0.6, {
				scaleX: 1,
				ease: Expo.easeInOut
			}, 0.05)
			.add(animateLines(splitHeading.words), '-=0.6');

	}

}

/* ======================================================================== */
/* sectionFullscreen1 */
/* ======================================================================== */
var SectionFullscreen1 = function () {

	var $target = $('.section-fullscreen_1[data-os-animation]'),
		tl = new TimelineMax(),
		$bg = $target.find('.section-fullscreen__inner-bg'),
		$headline = $target.find('.slider-fullscreen__slide-headline'),
		$heading = $target.find('.slider-fullscreen__slide-header h2'),
		$description = $target.find('.slider-fullscreen__slide-header p'),
		$button = $target.find('.slider-fullscreen__slide-wrapper-button'),
		$img = $target.find('.overflow__content'),
		$curtain = $target.find('.overflow__curtain'),
		splitHeading = splitLines($heading),
		splitDescription = splitLines($description);

	prepare();

	function prepare() {

		if (!$target.length) {
			return;
		}

		setLines(splitHeading.words);
		setLines(splitDescription.lines);

		TweenMax.set($headline, {
			scaleX: 0,
			transformOrigin: 'left center',
		});

		TweenMax.set($bg, {
			scaleY: 0,
			transformOrigin: 'bottom center'
		});

		TweenMax.set($img, {
			scale: 1.1,
			autoAlpha: 0,
		});

		TweenMax.set($button, {
			y: '10px',
			autoAlpha: 0
		});

		TweenMax.set($curtain, {
			y: '100%',
		});

	}

	this.animate = function () {

		if (!$target.length) {
			return;
		}

		tl
			.staggerTo($bg, 0.6, {
				scaleY: 1,
				ease: Expo.easeInOut
			}, 0.05)
			.to($curtain, 0.3, {
				y: '0%',
				ease: Expo.easeInOut,
			}, '-=0.6')
			.set($img, {
				autoAlpha: 1
			}).to($img, 0.6, {
				scale: 1,
				ease: Power4.easeOut
			})
			.to($curtain, 0.3, {
				y: '-102%',
				ease: Expo.easeInOut,
			}, '-=0.6')
			.to($headline, 0.6, {
				scaleX: 1,
				ease: Expo.easeInOut
			}, '-=1')
			.add(animateLines(splitHeading.words), '-=0.6')
			.to($button, 0.6, {
				autoAlpha: 1,
				y: '0px'
			}, '-=0.6')
			.add(animateLines(splitDescription.lines, 1, 0.1), '-=0.6')

	}

}

/* ======================================================================== */
/* sectionHeader */
/* ======================================================================== */
var SectionHeader = function () {

	var $target = $('.section-header[data-os-animation]'),
		$square = $target.find('.section-header__square'),
		$label = $target.find('.section-header__label span'),
		$heading = $target.find('h2'),
		splitHeading = splitLines($heading),
		splitLabel = splitLines($label);

	prepare();

	function prepare() {

		if (!$target.length) {
			return;
		}

		setLines([splitHeading.lines, splitLabel.lines]);

		TweenMax.set($square, {
			transformOrigin: 'left center',
			scaleX: 0
		});

	}

	this.animate = function () {

		if (!$target.length) {
			return;
		}

		$target.each(function () {

			var
				$el = $(this),
				tl = new TimelineMax(),
				$elSquare = $el.find($square),
				$elLabel = $el.find($label),
				$elHeading = $el.find($heading),
				elSplitHeading = $el.find(splitHeading.lines),
				elSplitLabel = $el.find(splitLabel.lines);

			tl
				.to($elSquare, 0.6, {
					scaleX: 1,
					ease: Power4.easeOut
				})
				.add(animateLines(elSplitLabel, 1, 0.1), '-=1')
				.add(animateLines(elSplitHeading, 1, 0.1), '-=0.8');

			createOSScene($el, tl);

		});

	}

}

/* ======================================================================== */
/* sectionIntro */
/* ======================================================================== */
var SectionIntro = function () {

	var $target = $('.section-intro[data-os-animation]'),
		tl = new TimelineMax(),
		$heading = $target.find('h1'),
		$highlight = $heading.find('.highlight__bg'),
		splitHeading = splitLines($heading);

	prepare();

	function prepare() {

		if (!$target.length) {
			return;
		}

		setLines(splitHeading.words);

		TweenMax.set($target, {
			scaleY: 0,
			transformOrigin: 'bottom center'
		});

		TweenMax.set($highlight, {
			x: '-100%',
			y: '98%'
		})

	}

	this.animate = function () {

		if (!$target.length) {
			return;
		}

		tl
			.to($target, 1, {
				scaleY: 1,
				ease: Expo.easeInOut
			})
			.add(animateLines(splitHeading.words), '-=0.4')
			.to($highlight, 0.6, {
				x: '0%',
				ease: Expo.easeInOut
			}, '-=0.4')
			.to($highlight, 0.6, {
				y: '0%',
				ease: Expo.easeInOut
			});

		// createOSScene($target, tl);

	}

}

/* ======================================================================== */
/* sectionInfo */
/* ======================================================================== */
var SectionInfo = function () {

	var $target = $('.section-info[data-os-animation]'),
		$heading = $target.find('.section-info__quote h2'),
		splitHeading = splitLines($heading);

	prepare();

	function prepare() {

		if (!$target.length) {
			return;
		}

		setLines(splitHeading.lines);
	}

	this.animate = function () {

		if (!$target.length) {
			return;
		}

		$target.each(function () {

			var $el = $(this),
				elLines = $el.find(splitHeading.lines),
				tl = new TimelineMax()

			tl
				.add(animateLines(elLines, 1, 0.1));

			createOSScene($el, tl);

		});

	}

}

/* ======================================================================== */
/* sectionLogos */
/* ======================================================================== */
var SectionLogos = function () {

	var $target = $('.section-logos[data-os-animation] .section-logos__wrapper-items'),
		tl = new TimelineMax(),
		$logos = $target.find('.section-logos__item');

	prepare();

	function prepare() {

		if (!$target.length) {
			return;
		}

		TweenMax.set($logos, {
			y: '30px',
			autoAlpha: 0
		});

	}

	this.animate = function () {

		if (!$target.length) {
			return;
		}

		tl
			.staggerTo($logos, 1, {
				autoAlpha: 1,
				y: '0px',
				ease: Power4.easeOut
			}, 0.1);

		createOSScene($target, tl);

	}

}

/* ======================================================================== */
/* SectionMastjead */
/* ======================================================================== */
var SectionMasthead = function () {

	var $target = $('.section-masthead[data-os-animation]'),
		$heading = $target.find('h1'),
		$meta = $target.find('.post-meta li'),
		$headline = $target.find('.section-masthead__line'),
		splitMeta = splitLines($meta),
		splitHeading = splitLines($heading);

	prepare();

	function prepare() {

		if (!$target.length) {
			return;
		}


		setLines(splitHeading.words);
		setLines(splitMeta.lines);

		TweenMax.set($headline, {
			scaleY: 0,
			transformOrigin: 'top center'
		});

	}

	this.animate = function () {

		if (!$target.length) {
			return;
		}

		$target.each(function () {

			var $el = $(this),
				elMeta = $el.find(splitMeta.lines),
				elHeading = $el.find(splitHeading.words),
				$elHeadline = $el.find($headline),
				tl = new TimelineMax();

			tl
				.add(animateLines(elHeading))
				.add(animateLines(elMeta), '-=0.3')
				.to($elHeadline, 0.6, {
					scaleY: 1,
					ease: Expo.easeInOut
				}, '-=0.6');

			createOSScene($el, tl);

		})

	}

}

/* ======================================================================== */
/* sectionSteps */
/* ======================================================================== */
var SectionSteps = function () {

	var $target = $('.section-steps[data-os-animation] .section-steps__step'),
		$heading = $target.find('.section-steps__content h2'),
		$text = $target.find('.section-steps__content p'),
		$headline = $target.find('.section-steps__headline'),
		$number = $target.find('.section-steps__number'),
		splitDescr = splitLines($text),
		splitHeading = splitLines($heading);

	prepare();

	function prepare() {

		if (!$target.length) {
			return;
		}


		setLines(splitHeading.words);
		setLines(splitDescr.lines);

		TweenMax.set($headline, {
			scaleX: 0,
			transformOrigin: 'left center'
		});

		TweenMax.set($number, {
			autoAlpha: 0,
			y: '30px'
		});

	}

	this.animate = function () {

		if (!$target.length) {
			return;
		}

		$target.each(function () {

			var $el = $(this),
				$elNumber = $el.find($number),
				$elHeadline = $el.find($headline),
				elDescr = $el.find(splitDescr.lines),
				elHeading = $el.find(splitHeading.words),
				tl = new TimelineMax();

			tl
				.to($elNumber, 0.6, {
					autoAlpha: 1,
					y: '0px',
					ease: Power4.easeOut
				})
				.add(animateLines(elHeading), '-=0.4')
				.add(animateLines(elDescr, 1, 0.1), '-=0.4')
				.to($elHeadline, 0.6, {
					scale: 1,
					ease: Power4.easeOut
				}, '-=0.8');

			createOSScene($el, tl);

		})

	}

}

/* ======================================================================== */
/* sliderFullscreen */
/* ======================================================================== */
var SliderFullscreen1 = function () {

	createSlider();

	function createSlider() {

		if (!$('.js-slider-fullscreen').length) {
			return;
		}

		var overlapFactor = 0.5,
			sliderImg = new Swiper('.js-slider-fullscreen__slider-img', {
				autoplay: {
					delay: 5000,
				},
				allowTouchMove: false,
				direction: 'vertical',
				speed: 1000,
				pagination: {
					el: '.js-slider-fullscreen__dots',
					type: 'bullets',
					bulletElement: 'div',
					clickable: true,
					bulletClass: 'slider__dot',
					bulletActiveClass: 'slider__dot_active'
				},
				navigation: {
					prevEl: '.js-slider-fullscreen-arrow-left',
					nextEl: '.js-slider-fullscreen-arrow-right',
				},
				// mousewheel: {
				// 	eventsTarged: '.page-wrapper',
				// 	sensitivity: 1
				// },
				// keyboard: {
				// 	enabled: true
				// },
				watchSlidesProgress: true,
				on: {
					progress: function () {
						var swiper = this;
						for (var i = 0; i < swiper.slides.length; i++) {

							var slideProgress = swiper.slides[i].progress,
								innerOffset = swiper.width * overlapFactor,
								innerTranslate = slideProgress * innerOffset;

							TweenMax.set(swiper.slides[i].querySelector('img'), {
								y: innerTranslate + 'px',
								transition: swiper.params.speed + 'ms'
							});
						}
					},
					touchStart: function () {
						var swiper = this;
						for (var i = 0; i < swiper.slides.length; i++) {
							TweenMax.set(swiper.slides[i].querySelector('img'), {
								transition: ''
							});
						}
					},
				}
			});

		var sliderContent = new Swiper('.js-slider-fullscreen__slider-content', {
			speed: 1000,
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			},
			allowTouchMove: false,
			breakpoints: {
				991: {
					autoHeight: true
				}
			}
		});

		renderSliderCounter(
			sliderImg,
			'.js-slider-fullscreen__counter-current',
			'',
			'.js-slider-fullscreen__counter-total',
			sliderContent
		);

	}

}

/* ======================================================================== */
/* slider */
/* ======================================================================== */
function renderSliderCounter(sliderMain, sliderCounter, slideClass, elTotal, sliderSecondary) {

	if (!sliderMain.slides.length) {
		return;
	}

	var
		numOfSlides = sliderMain.slides.length,
		startSlides = sliderMain.params.slidesPerView;

	var counter = new Swiper(sliderCounter, {
		direction: 'vertical',
		simulateTouch: false,
	});

	for (var index = startSlides; index <= numOfSlides; index++) {

		counter.appendSlide('<div class="swiper-slide"><div class="' + slideClass + '">0' + index + '</div></div>');

	}

	$(elTotal).html('0' + numOfSlides);

	sliderMain.controller.control = counter;
	counter.controller.control = sliderMain;

	if (sliderSecondary) {
		sliderSecondary.controller.control = counter;
		counter.controller.control = sliderSecondary;
	}

}

/* ======================================================================== */
/* sliderPortfolioItem */
/* ======================================================================== */
var SliderPortfolioItem = function () {

	if (!$('.js-slider-portfolio-item').length) {
		return;
	}

	var slider = new Swiper('.js-slider-portfolio-item', {
		autoplay: {
			delay: 6000
		},
		autoHeight: true,
		speed: 800,
		pagination: {
			el: '.js-slider-portfolio-item-progress',
			type: 'progressbar',
			progressbarFillClass: 'slider__progressbar-fill',
			renderProgressbar: function (progressbarFillClass) {
				return '<div class="slider__progressbar"><div class="' + progressbarFillClass + '"></div></div>'
			}
		},
		navigation: {
			prevEl: '.js-slider-portfolio-item__arrow-left',
			nextEl: '.js-slider-portfolio-item__arrow-right',
		},
	});

	renderSliderCounter(
		slider,
		'.js-slider-portfolio-item-counter-current',
		'',
		'.js-slider-portfolio-item-counter-total'
	);

}

/* ======================================================================== */
/* sliderFullscreen4 */
/* ======================================================================== */
var SliderFullscreen4 = function () {

	createSlider();

	function createSlider() {

		if (!$('.js-slider-fullscreen4').length) {
			return;
		}

		var slider = new Swiper('.js-slider-fullscreen4', {
			slidesPerView: 4,
			speed: 1000,
			autoplay: {
				delay: 5000
			},
			pagination: {
				el: '.js-slider-fullscreen4-progress',
				type: 'progressbar',
				progressbarFillClass: 'slider__progressbar-fill',
				renderProgressbar: function (progressbarFillClass) {
					return '<div class="slider__progressbar"><div class="' + progressbarFillClass + '"></div></div>'
				}
			},
			navigation: {
				prevEl: '.js-slider-fullscreen4-arrow-left',
				nextEl: '.js-slider-fullscreen4-arrow-right',
			},
			mousewheel: {
				eventsTarged: '.page-wrapper',
				sensitivity: 1
			},
			keyboard: {
				enabled: true
			},
			breakpoints: {
				1400: {
					slidesPerView: 3
				},
				991: {
					slidesPerView: 2
				},
				576: {
					slidesPerView: 1
				},
			}
		});

		renderSliderCounter(
			slider,
			'.js-slider-fullscreen4-counter-current',
			'',
			'.js-slider-fullscreen4-counter-total'
		);

	}

}

/* ======================================================================== */
/* sliderServices */
/* ======================================================================== */
var SliderServices = function () {

	var $target = $('.slider-services[data-os-animation]'),
		tl = new TimelineMax(),
		$headline = $target.find('.figure-service__headline'),
		$heading = $target.find('.figure-service__header h3'),
		$counters = $target.find('.figure-service__number'),
		$icons = $target.find('.figure-service__icon'),
		splitHeading = splitLines($heading);

	prepare();
	createSlider();

	function prepare() {

		if (!$target.length) {
			return;
		}

		setLines(splitHeading.words);

		TweenMax.set($headline, {
			scaleX: 0,
			transformOrigin: 'center center',
		});

		TweenMax.set([$counters, $icons], {
			y: '30px',
			autoAlpha: 0
		});

	}

	this.animate = function () {

		if (!$target.length) {
			return;
		}

		tl
			.staggerTo($headline, 0.6, {
				scaleX: 1,
				ease: Expo.easeInOut
			}, 0.05)
			.add(animateLines(splitHeading.words), '-=0.6')
			.staggerTo($counters, 0.6, {
				y: '0px',
				autoAlpha: 1
			}, 0.1, '-=0.6')
			.staggerTo($icons, 0.6, {
				y: '0px',
				autoAlpha: 1
			}, 0.1, '-=0.6');

		createOSScene($target, tl);

	}

	function createSlider() {

		if (!$('.js-slider-services').length) {
			return;
		}

		var slider = new Swiper('.js-slider-services', {
			slidesPerView: 4,
			speed: 800,
			autoplay: {
				delay: 5000
			},
			pagination: {
				el: '.js-slider-services-progress',
				type: 'progressbar',
				progressbarFillClass: 'slider__progressbar-fill',
				renderProgressbar: function (progressbarFillClass) {
					return '<div class="slider__progressbar"><div class="' + progressbarFillClass + '"></div></div>'
				}
			},
			navigation: {
				prevEl: '.js-slider-services__arrow-left',
				nextEl: '.js-slider-services__arrow-right',
			},
			breakpoints: {
				1400: {
					slidesPerView: 3
				},
				991: {
					slidesPerView: 2
				},
				576: {
					slidesPerView: 1
				},
			}
		});

		renderSliderCounter(
			slider,
			'.js-slider-services-counter-current',
			'',
			'.js-slider-services-counter-total'
		);

	}

}

/* ======================================================================== */
/* sliderTestimonials */
/* ======================================================================== */
var SliderTestimonials = function () {

	var $target = $('.slider-testimonials[data-os-animation]'),
		tl = new TimelineMax(),
		$text = $target.find('.slider-testimonials__text'),
		splitTestimonial = splitLines($text);

	prepare();
	createSlider();

	function prepare() {

		if (!$target.length) {
			return;
		}

		setLines(splitTestimonial.lines);

	}

	this.animate = function () {

		if (!$target.length) {
			return;
		}

		tl
			.add(animateLines(splitTestimonial.lines, 1, 0.1));

		createOSScene($target, tl);

	}

	function createSlider() {

		if (!$('.js-slider-testimonials').length) {
			return;
		}

		var slider = new Swiper('.js-slider-testimonials', {
			autoHeight: true,
			speed: 800,
			autoplay: {
				delay: 5000
			},
			navigation: {
				prevEl: '.js-slider-testimonials__arrow-prev',
				nextEl: '.js-slider-testimonials__arrow-next'
			},
			pagination: {
				el: '.js-slider-testimonials__dots',
				type: 'bullets',
				bulletElement: 'div',
				clickable: true,
				bulletClass: 'slider__dot',
				bulletActiveClass: 'slider__dot_active'
			},
		});

		renderSliderCounter(
			slider,
			'.js-slider-testimonials-counter-current',
			'slider-testimonials__counter-current',
			'.js-slider-testimonials-counter-total'
		);

	}

}

/* ======================================================================== */
/* social */
/* ======================================================================== */
var Social = function () {

	var $elements = $('.social__item a');

	if (!$elements.length) {
		return;
	}

	var circle = new Circle();

	$elements.each(function () {
		circle.animate($(this));
	});

}

/* ======================================================================== */
/* splitText */
/* ======================================================================== */
function splitLines($el) {

	if (!($el).length) {
		return false;
	}

	return new SplitText($el, {
		type: 'words, lines',
		linesClass: 'split-line',
		wordsClass: 'split-word'
	});

};


function setLines(el) {

	if (!$(el).length) {
		return false;
	}

	return TweenMax.set(el, {
		y: '150%',
		autoAlpha: 0
	});

}

function animateLines(el, customDuration, customStagger) {

	if (!$(el).length) {
		return false;
	}

	var
		duration = customDuration ? customDuration : 0.6,
		stagger = customStagger ? customStagger : 0.03;

	return TweenMax.staggerTo(el, duration, {
		y: '0%',
		autoAlpha: 1,
		ease: Power4.easeOut
	}, stagger);

}

function hideLines(el, customDuration, customStagger) {

	if (!$(el).length) {
		return false;
	}

	var
		duration = customDuration ? customDuration : 0.6,
		stagger = customStagger ? customStagger : 0.03;

	return TweenMax.staggerTo(el, duration, {
		y: '150%',
		autoAlpha: 0,
		ease: Power4.easeIn
	}, stagger);

}
