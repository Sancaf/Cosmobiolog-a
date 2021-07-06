let dateControl = document.querySelector('input[type="date"]')
let impropiaText = document.querySelector('#impropiaText')
let propiaText = document.querySelector('#propiaText')
const dateDiv = document.querySelector('.date')
const wheel = document.querySelector('#wheel')
const text = document.querySelector('.text')
const actualDate = new Date()
const planets = [
	[1, 1, '♂︎'],
	[2, 2, '♀︎'],
	[3, 3, '☿'],
	[4, 1, '☽'],
	[1, 2, '☉'],
	[2, 3, '☿'],
	[3, 1, '♀︎'],
	[4, 2, '♇'],
	[1, 3, '♃'],
	[2, 1, '♄'],
	[3, 2, '♅'],
	[4, 3, '♆'],
]

let modesFromSector = []
let elementsFromSector = []
let element
let sector
let mode

document.addEventListener('keypress', function (e) {
	if (e.key === 'Enter') {
		getOutcome()
	}
})



function getOutcome() {
	if (dateControl.value === '') {
		alert('Escriba su fecha de nacimiento')
	} else {
		const input = document.querySelector('#date').value
		const birthDate = new Date(input)
		const birthday = birthDate.getDate() + 1
		let monthsFromBirth = actualDate.getMonth() - birthDate.getMonth()
		let age = actualDate.getFullYear() - birthDate.getFullYear()
		let andWhatAboutTheDay = actualDate.getMonth() - birthDate.getMonth()

		dateDiv.classList.remove('fadein')
		wheel.classList.remove('fadein')
		wheel.classList.add('rotate')

		setTimeout(function () {
			wheel.classList.remove('rotate')
			wheel.classList.add('fadeout')
			dateDiv.classList.add('fadeout')
		}, 3950)

		if (
			andWhatAboutTheDay < 0 ||
			(andWhatAboutTheDay === 0 && actualDate.getDate() < birthday)
		) {
			age--
			monthsFromBirth += 12
		}

		sector = (age % 12) + 1
		mode = Math.ceil(monthsFromBirth / 4)
		element = Math.ceil(monthsFromBirth / 3)

		if (
			(monthsFromBirth % 3 === 0 &&
				actualDate.getDate() > birthday &&
				mode < 3) ||
			mode === 0
		) {
			mode++
		}

		if (
			(monthsFromBirth % 3 === 0 &&
				actualDate.getDate() > birthday &&
				element < 4) ||
			element === 0
		) {
			element++
		}

		let positionElement = planets[sector - 1][0]
		let positionMode = planets[sector - 1][1]

		for (i = sector - 1; i < planets.length; i++) {
			if (planets[i][0] == positionElement) {
				modesFromSector.push(planets[i][2])
			}

			if (planets[i][1] == positionMode) {
				elementsFromSector.push(planets[i][2])
			}
		}

		for (i = 0; i < sector - 1; i++) {
			if (planets[i][0] == positionElement) {
				modesFromSector.push(planets[i][2])
			}

			if (planets[i][1] == positionMode) {
				elementsFromSector.push(planets[i][2])
			}
		}

		let energíaPropia = `${modesFromSector[mode - 1]}1`
		let energíaImpropia = `${elementsFromSector[element - 1]}2`

		async function getSampleText() {
			firstText = (await fetch(`./assets/texts/${energíaPropia}.txt`))
				.text()
				.then(function (result) {
					propiaText.innerHTML = result
				})
			secondText = (await fetch(`./assets/texts/${energíaImpropia}.txt`))
				.text()
				.then(function (result) {
					impropiaText.innerHTML = `${result} <br><br> <button type="button" class="startFresh" onclick="startFresh()">Nueva Consulta</button>`
				})
		}

		setTimeout(function () {
			text.classList.add('fadein')
			text.classList.add('cellPhoneText')
			text.style.paddingTop = '0.7em'
			text.style.paddingBottom = '0.7em'
			text.style.paddingRight = '1.4em'
			text.style.paddingLeft = '1.4em'
			getSampleText()
		}, 5957)
	}
}

function startFresh() {
	text.classList.remove('fadein')
	text.classList.add('fadeout')
	setTimeout(function () {
		dateControl.value = ''
		impropiaText.innerHTML = ''
		propiaText.innerHTML = ''
		modesFromSector = []
		elementsFromSector = []
		dateDiv.classList.remove('fadeout')
		dateDiv.classList.add('fadein')
		wheel.classList.remove('fadeout')
		wheel.classList.add('fadein')
		text.classList.remove('cellPhoneText')
	}, 1900)
}
