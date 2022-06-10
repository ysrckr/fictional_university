import $ from 'jquery'
class Search {
	// 1. Describe and create/initiate our object
	constructor() {
		this.body = document.querySelector('body')
		this.addSearchHTML()
		this.resultsDiv = document.querySelector('#search-overlay__results')
		this.openButtons = Array.from(
			document.querySelectorAll('.js-search-trigger')
		)
		this.openButtonLarge = this.openButtons[0]
		this.openButtonSmall = this.openButtons[1]
		this.closeButton = document.querySelector('.search-overlay__close')
		this.searchOverlay = document.querySelector('.search-overlay')
		this.searchBar = document.querySelector('#search-term')
		this.previousValue
		this.isOverlayOpen = false
		this.isLoading = false
		this.typingTimer
		this.events()
	}
	// 2. Events
	events() {
		this.openButtonLarge.addEventListener('click', () => this.openOverlay())
		this.openButtonSmall.addEventListener('click', () => this.openOverlay())
		this.closeButton.addEventListener('click', () => this.closeOverlay())
		document.addEventListener('keydown', e => this.keyPressDispatcher(e))
		this.searchBar.addEventListener('keyup', () => this.typingLogic())
	}

	// 3. Methods

	openOverlay() {
		this.searchOverlay.classList.add('search-overlay--active')
		this.body.classList.add('body-no-scroll')
		this.searchBar.value = ''
		setTimeout(() => {
			this.searchBar.focus()
		}, 301)
		this.isOverlayOpen = true
	}
	closeOverlay() {
		this.searchOverlay.classList.remove('search-overlay--active')
		this.body.classList.remove('body-no-scroll')
		this.isOverlayOpen = false
	}
	keyPressDispatcher(e) {
		if (e.keyCode === 83 && !this.isOverlayOpen) {
			this.openOverlay()
		}
		if (e.keyCode === 27 && this.isOverlayOpen) {
			this.closeOverlay()
		}
	}

	getResults() {
		$.when(
			$.getJSON(
				universityData.root_url +
					'/wp-json/wp/v2/posts?search=' +
					this.searchBar.value
			),
			$.getJSON(
				universityData.root_url +
					'/wp-json/wp/v2/pages?search=' +
					this.searchBar.value
			)
		).then(
			(posts, pages) => {
				const combinedResults = posts[0].concat(pages[0])
				this.resultsDiv.innerHTML = `
					<h2 class="search-overlay__section-title">General Information</h2>
					${
						combinedResults.length
							? '<ul class="link-list min-list">'
							: '<p>No general information matches your search</p>'
					}
					${combinedResults
						.map(
							item =>
								`<li><a href="${item.link}">${item.title.rendered}</a>${item.excerpt.rendered}</li>`
						)
						.join('')}	
					${combinedResults.length ? '</ul>' : ''}
				`
				this.isLoading = false
			},
			() => {
				this.resultsDiv.innerHTML = '<p>Unexpected error; please try again</p>'
			}
		)
	}

	typingLogic() {
		if (this.searchBar.value !== this.previousValue) {
			clearTimeout(this.typingTimer)
			if (this.searchBar.value) {
				if (!this.isLoading) {
					this.resultsDiv.innerHTML = '<div class="spinner-loader"></div>'
					this.isLoading = true
				}
				this.typingTimer = setTimeout(() => this.getResults(), 200)
			} else {
				this.resultsDiv.innerHTML = ''
				this.isLoading = false
			}
		}
		this.previousValue = this.searchBar.value
	}
	addSearchHTML() {
		this.body.innerHTML += `
	<div class="search-overlay">
		<div class="search-overlay__top">
			<div class="container">
				<i class="fa fa-search search-overlay__icon" aria-hidden="true"></i>
				<input type="text" id="search-term" class="search-term" placeholder="What are you looking for?">
				<i class="fa fa-window-close search-overlay__close" aria-hidden="true"></i>
			</div>
			</div>
			<div class="container">
				<div id="search-overlay__results"></div>
			</div>
		
	</div>
			`
	}
}

export default Search
