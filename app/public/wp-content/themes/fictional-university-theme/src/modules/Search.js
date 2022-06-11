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
		this.openButtonLarge.addEventListener('click', e => this.openOverlay(e))
		this.openButtonSmall.addEventListener('click', e => this.openOverlay(e))
		this.closeButton.addEventListener('click', () => this.closeOverlay())
		document.addEventListener('keydown', e => this.keyPressDispatcher(e))
		this.searchBar.addEventListener('keyup', () => this.typingLogic())
	}

	// 3. Methods

	openOverlay(e) {
		e.preventDefault()
		this.searchOverlay.classList.add('search-overlay--active')
		this.body.classList.add('body-no-scroll')
		this.searchBar.value = ''
		this.animationWait = setTimeout(() => {
			this.searchBar.focus()
		}, 301)
		this.isOverlayOpen = true
	}
	closeOverlay() {
		this.searchOverlay.classList.remove('search-overlay--active')
		this.body.classList.remove('body-no-scroll')
		clearTimeout(this.animationWait)
		this.isOverlayOpen = false
	}
	keyPressDispatcher(e) {
		if (
			e.keyCode === 83 &&
			!this.isOverlayOpen &&
			document.activeElement.tagName !== 'INPUT' &&
			document.activeElement.tagName !== 'TEXTAREA'
		) {
			this.openOverlay()
		}
		if (e.keyCode === 27 && this.isOverlayOpen) {
			this.closeOverlay()
		}
	}

	getResults() {
		$.getJSON(
			`${universityData.root_url}/wp-json/university/v1/search?term=${this.searchBar.value}`,
			results => {
				this.resultsDiv.innerHTML = `
			<div class="row">
				<div class="one-third"><h2 class="search-overlay__section-title">General Information</h2>
				<!--General Information-->
				${
					results.generalInfo.length
						? '<ul class="link-list min-list">'
						: '<p>No general information matches your search</p>'
				}
				${results.generalInfo
					.map(
						item =>
							`<li><a href="${item.permalink}">${item.title}</a>${
								item.post_type === 'post' ? ` by ${item.author_name}` : ''
							}</li>`
					)
					.join('')}	
				${results.generalInfo.length ? '</ul>' : ''}
				</div>
				<div class="one-third"><h2 class="search-overlay__section-title">Programs</h2>
				<!--Programs-->
				${
					results.programs.length
						? '<ul class="link-list min-list">'
						: `<p>No program matches your search. <a href="${universityData.root_url}/programs">View all programs</a></p>`
				}
				${results.programs
					.map(item => `<li><a href="${item.permalink}">${item.title}</a></li>`)
					.join('')}	
				${results.programs.length ? '</ul>' : ''}
				<h2 class="search-overlay__section-title">Professors</h2>
				<!--Professors-->
				${
					results.professors.length
						? '<ul class="professor-cards">'
						: `<p>No professors matches your search.</p>`
				}
				${results.professors
					.map(
						item => ` <li class="professor-card__list-item"><a class="professor-card" href="${item.permalink}">
					<img src="${item.img.url}" alt="${item.img.alt}" class="professor-card__image">
					<span class="professor-card__name">${item.title}</span>
	
						</a></li>`
					)
					.join('')}	
				${results.professors.length ? '</ul>' : ''}
				</div>
				<div class="one-third"><h2 class="search-overlay__section-title">Campuses</h2>
				<!--Campuses-->
				${
					results.campuses.length
						? '<ul class="link-list min-list">'
						: `<p>No campus matches your search. <a href="${universityData.root_url}/campuses">View all campuses</a></p>`
				}
				${results.campuses
					.map(item => `<li><a href="${item.permalink}">${item.title}</a></li>`)
					.join('')}	
				${results.campuses.length ? '</ul>' : ''}
				
				<h2 class="search-overlay__section-title">Events</h2>
				<!--Events-->
				${
					results.events.length
						? ''
						: `<p>No event matches your search. <a href="${universityData.root_url}/events">View all events</a></p>`
				}
				${results.events
					.map(
						item => `
					<div class="event-summary">
					<a class="event-summary__date t-center" href="${item.permalink}">
						<span class="event-summary__month">${item.date.month}</span>
						<span class="event-summary__day">${item.date.day}</span>
					</a>
					<div class="event-summary__content">
						<h5 class="event-summary__title headline headline--tiny"><a href="${item.permalink}">${item.title}</a></h5>
						<p>${item.desc}<a href="${item.permalink}" class="nu gray">Learn more</a></p>
					</div>
				</div>
					`
					)
					.join('')}	
				
				</div>
			</div>	
			`
				this.isLoading = false
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
