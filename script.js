'use strict'

const listEl = document.querySelector('.list')
const recipeEl = document.querySelector('.recipe')
const btnBackEl = document.querySelector('.btn-back')

const getData = function () {
  fetch(
    'https://content.newtonschool.co/v1/pr/64996337e889f331d43f70ba/recipes'
  )
    .then(response => response.json())
    .then(data => {
      console.log(data)
      data.forEach(recipe => {
        listEl.insertAdjacentHTML(
          'beforeend',
          `
    <div class="list-item">${recipe.title}</div>
    `
        )
      })
      return data
    })
    .then(recipes => {
      listEl.addEventListener('click', function (e) {
        console.log(e.target)
        let intervalTimer
        if (e.target.classList.contains('list-item')) {
          listEl.setAttribute(
            'style',
            'filter: blur(100px); visibility: none; pointer-events: none'
          )
          const selectedRecipe = recipes.find(
            recipe => recipe.title === e.target.textContent
          )
          recipeEl.classList.remove('hidden')
          recipeEl.innerHTML = ''
          recipeEl.insertAdjacentHTML(
            'beforeend',
            `
          <div class='opening-box'>
            <div class='recipe-details'>
              <button class="btn-back"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
              <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-4.28 9.22a.75.75 0 000 1.06l3 3a.75.75 0 101.06-1.06l-1.72-1.72h5.69a.75.75 0 000-1.5h-5.69l1.72-1.72a.75.75 0 00-1.06-1.06l-3 3z" clip-rule="evenodd" />
              </svg>
              </button>
              <p>⏲ Ready in ${selectedRecipe.readyInMinutes} minutes</p>
              <p>🍲 Number of servings: ${selectedRecipe.servings}</p>
            </div>
            <figure class="recipe-figure">
              <img src="${selectedRecipe.image}" alt="${selectedRecipe.title}" class="recipe-img" />
              <figcaption>${selectedRecipe.title}</figcaption>
            </figure>
          </div>
          `
          )
          console.log(selectedRecipe)
          recipeEl.insertAdjacentHTML(
            'beforeend',
            `
            <div class="ingredients">
              <h2 class="ingredients-heading">Ingredients</h2>
              <ol class="ingredients-list ingredients-list--start">
                ${selectedRecipe.ingredients
                  .split(', ')
                  .map(ingredient => `<li>${ingredient}</li>`)
                  .join('')}
              </ol>
            </div>
            `
          )
          setTimeout(() => {
            document
              .querySelector('.ingredients-list')
              .classList.remove('ingredients-list--start')
          }, 500)
          recipeEl.insertAdjacentHTML(
            'beforeend',
            `
          <div class="steps">
            <h2 class="steps-heading">Steps</h2>
            <p class="steps-text"></p>
          </div>
          `
          )
          let i = 0
          intervalTimer = setInterval(() => {
            document.querySelector('.steps-text').textContent +=
              selectedRecipe.steps[i]
            i++
            if (i === selectedRecipe.steps.length) clearInterval(intervalTimer)
          }, 20)
        }
        document.querySelector('.btn-back').addEventListener('click', () => {
          listEl.removeAttribute('style')
          recipeEl.classList.add('hidden')
          clearInterval(intervalTimer)
        })
      })
    })
}

getData()
