import axios from 'axios'

class MyNotes {
	constructor() {
		this.deleteBtns = document.querySelectorAll('.delete-note')
		this.editBtns = document.querySelectorAll('.edit-note')
		this.events()
	}
	events() {
		this.editBtns.forEach(editBtn => {
			editBtn.addEventListener('click', this.editNote.bind(this))
		})
		this.deleteBtns.forEach(deleteBtn => {
			deleteBtn.addEventListener('click', this.deleteNote.bind(this))
		})
		document
			.querySelector('update-note')
			.addEventListener('click', this.updateNote.bind(this))
	}

	//Methods
	editNote(e) {
		const id = e.target.parentElement.dataset.id
		const note = document.querySelector(`[data-id="${id}"]`)
		if (note.dataset.state === 'editable') {
			//make note read only
			this.makeNoteReadOnly(note)
		} else {
			//make note editable
			this.makeNoteEditable(note)
		}
	}
	makeNoteEditable(note) {
		note.querySelector('.note-title-field').removeAttribute('readonly')
		note.querySelector('.note-title-field').classList.add('note-active-field')
		note.querySelector('.note-body-field').removeAttribute('readonly')
		note.querySelector('.note-body-field').classList.add('note-active-field')
		note.querySelector('.update-note').classList.add('update-note--visible')
		note.dataset.state = 'editable'
		note.querySelector('.edit-note').innerHTML = `
        <i class="fa fa-times" aria-hidden="true"></i> Cancel
        `
	}
	makeNoteReadOnly(note) {
		note.querySelector('.note-title-field').setAttribute('readonly', 'readonly')
		note
			.querySelector('.note-title-field')
			.classList.remove('note-active-field')
		note.querySelector('.note-body-field').setAttribute('readonly', 'readonly')
		note.querySelector('.note-body-field').classList.remove('note-active-field')
		note.querySelector('.update-note').classList.remove('update-note--visible')
		note.dataset.state = 'readonly'
		note.querySelector('.edit-note').innerHTML = `
        <i class="fa fa-pencil" aria-hidden="true"></i> Edit
        `
	}
	async deleteNote(e) {
		const id = e.target.parentElement.dataset.id
		const note = document.querySelector(`[data-id="${id}"]`)
		try {
			const response = await axios.delete(
				`${universityData.root_url}/wp-json/wp/v2/note/${id}`,
				{
					headers: {
						'X-WP-Nonce': universityData.nonce,
					},
				}
			)
			if (response.status === 200) {
				note.remove()
			}
		} catch {
			console.log('error')
		}
	}
	async updateNote(e) {
		const id = e.target.parentElement.dataset.id
		const note = document.querySelector(`[data-id="${id}"]`)
		try {
			const response = await axios.put(
				`${universityData.root_url}/wp-json/wp/v2/note/${id}`,
				{
					headers: {
						'X-WP-Nonce': universityData.nonce,
					},
				}
			)
			if (response.status === 200) {
				this.makeNoteReadOnly(note)
			}
		} catch {
			console.log('error')
		}
	}
}

export default MyNotes
