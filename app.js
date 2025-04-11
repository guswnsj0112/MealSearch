const searchMeal = document.querySelector('#searchMeal');
const findSection = document.querySelector('section');
const sumbit = document.querySelector('#submit')
const content = document.querySelector('.content');


const getSearchData = async(param) => {
	try{
		const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${param.s}`);
		const data = await res.json();
		const meals = data["meals"]
		findSection.innerHTML = '';
		if (meals && meals.length > 0){
				meals.forEach((meal) => {
				const rowDiv = document.createElement('div');
				rowDiv.className = 'row';
				const mealName = document.createElement('div');
				mealName.className = 'mealName';
				const newImg = document.createElement('img');
				
				findSection.appendChild(rowDiv);
				newImg.src = meal.strMealThumb;
				
				rowDiv.appendChild(newImg);
				mealName.innerText = meal.strMeal;
				rowDiv.appendChild(mealName);
				rowDiv.addEventListener('click', e => {
						const findModalContainer = document.querySelector('#modalContainer');
						if (!findModalContainer){
							makeModal(meal);
						}
						
				})
				
			})
		} else {
			alert('존재하지 않는 메뉴입니다.');
		}
	}
	catch (err){
		console.log(err);
	}
};


sumbit.addEventListener('submit', (e) => {
	e.preventDefault();
	const term = searchMeal.value;
  	if (term.trim()) {
		const param = {
		  s: term,
		};
		getSearchData(param);
	  } else {
		alert('단어를 입력하세요.');
		findUl.innerHTML = ''; // 입력값이 없을 때 ul 내용 비워주기
	  }
});


function makeModal(meal) {
	const modalContainer = document.createElement('div');
	const mealTitle = document.createElement('div');
	const modalImg = document.createElement('img');
	const instruction = document.createElement('div');
	const ingredient = document.createElement('div');
	const ingredientTitle = document.createElement('div');
	const ingredientList = document.createElement('div');
	const modalCloseButton = document.createElement('button');
	
	
	modalContainer.id = "modalContainer";
	
	mealTitle.innerText = meal.strMeal;
	mealTitle.className = 'mealTitle';
	modalImg.src = meal.strMealThumb;
	instruction.innerText = meal.strInstructions; 
	instruction.className = 'instruction';
	ingredient.className = 'ingredients';
	ingredientTitle.innerText = 'Ingredient';
	ingredientTitle.className = 'title';
	ingredientList.className = 'list';
	modalCloseButton.id = 'modalCloseButton';
	modalCloseButton.innerText = 'X'
	
	content.appendChild(modalContainer);
	modalContainer.appendChild(mealTitle);
	modalContainer.appendChild(modalImg);
	modalContainer.appendChild(instruction);
	modalContainer.appendChild(ingredient);
	modalContainer.appendChild(modalCloseButton);
	
	ingredient.appendChild(ingredientTitle);
	ingredient.appendChild(ingredientList);
	
	modalCloseButton.addEventListener('click', () => {
		 modalContainer.remove()
	})
	let n = 1;
	while (meal[`strIngredient${n}`]){
		const detailIngredient = document.createElement('div');
		detailIngredient.innerText = `${meal[`strIngredient${n}`]} - ${meal[`strMeasure${n}`]}`;
		detailIngredient.className = 'detailIngredient';
		ingredientList.appendChild(detailIngredient);
		n ++;
	}
	console.log(meal);
	
}
