AOS.init();
const menu = document.querySelector(".menu-logo");
const sidebar = document.querySelector(".sidebar");
const xbutton = document.querySelector(".x-button");
function preventScroll(e){
    e.preventDefault();
}
menu.addEventListener("click", ()=>{
    sidebar.classList.add("show");
    sidebar.style.position = "fixed";
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.addEventListener('touchmove', preventScroll, { passive: false });
});
xbutton.addEventListener("click", ()=>{
    sidebar.classList.remove("show");
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";
    document.removeEventListener('touchmove', preventScroll);
})
const mainMenus = document.querySelectorAll(".nav-item");
const subMenus = document.querySelectorAll(".sub-menu");
const submenu_element = document.querySelectorAll(".element");
subMenus[0].classList.add("active");
mainMenus[0].classList.add("active");
submenu_element.forEach(element => element.classList.add("active"));
mainMenus.forEach((item, index)=>{
    item.addEventListener('click',()=>{
        //Hide all sub-menu
        subMenus.forEach(subMenu => subMenu.classList.remove("active"));
        mainMenus.forEach(mainMenu => mainMenu.classList.remove("active"));
        submenu_element.forEach(element => element.classList.remove("active"));
        //show the clicked
        if(subMenus[index]){
            subMenus[index].classList.add("active");
        } 
        if(mainMenus[index]){
            mainMenus[index].classList.add("active");
        }
        if(submenu_element){
            submenu_element.forEach((element, index) => {
                setInterval(() => {
                    element.classList.add('active');
                }, 100 + index*50);
            });
        }
    });
});

// Select all sliders on the page
const sliders = document.querySelectorAll(".slide");

sliders.forEach((sliderWrapper) => {
    const slider = sliderWrapper.querySelector(".outer-container");
    const prev = sliderWrapper.querySelector(".prev-btn");
    const next = sliderWrapper.querySelector(".next-btn");
    const dots = sliderWrapper.querySelectorAll(".pagination .dot");
    const items = sliderWrapper.querySelectorAll(".inner-container .card");
    const itemsWidth = items[0].scrollWidth + 10;  // Adding margin for better precision
    let maxWidth = slider.scrollWidth - slider.clientWidth;

    dots[0].classList.add("active"); // Add the 'active' class to the first dot by default

    window.addEventListener("resize", () => {
        maxWidth = slider.scrollWidth - slider.clientWidth;
    });

    // Scroll event to update button states and dots
    slider.addEventListener("scroll", () => {
        let s = Math.round(slider.scrollLeft);
        prev.disabled = s === 0;
        next.disabled = s === maxWidth;

        let i = Math.round(s / itemsWidth);
        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === i);
        });
    });

    // Mouse drag events for smooth dragging
    let isDown = false;
    let startX, scrollLeft, x;

    slider.addEventListener("mousedown", (e) => {
        isDown = true;
        e.preventDefault();
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener("mouseleave", () => {
        isDown = false;
    });

    slider.addEventListener("mouseup", () => {
        isDown = false;
    });

    slider.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        x = e.pageX - slider.offsetLeft;
        slider.scrollLeft = scrollLeft - (x - startX) * 4;
    });
    // Prev and Next buttons to scroll by one item width
    prev.addEventListener("click", () => {
        slider.scrollBy({ left: -itemsWidth, behavior: "smooth" });
    });

    next.addEventListener("click", () => {
        slider.scrollBy({ left: itemsWidth, behavior: "smooth" });
    });
    // Dot click event to navigate to the respective slide
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            dots.forEach((inactiveDot, inactiveIndex) => {
                if (inactiveIndex !== index) {
                    inactiveDot.classList.remove("active");
                }
            });
            dot.classList.add("active");
            slider.scrollTo({ left: itemsWidth * index, behavior: "smooth" });
        });
    });
});

const items = document.querySelectorAll(".inner-container .card")
async function fetchMeals() {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        const meals = data.meals || []; // Ensure meals exist
        items.forEach((item, index) => {
            const meal = meals[index]; // Get corresponding meal data
            if (meal) {
                item.querySelector('.card-body .card-title').textContent = meal.strMeal; // Set title
                item.querySelector('.card-img-top').src = meal.strMealThumb; // Set image
                item.querySelector('.card-img-top').alt = meal.strMeal; 
                item.querySelector('.card-body .card-text').textContent = meal.strInstructions.substring(0, 70) + '...'; // Shorten text
            }
        });
    } catch (error) {
        console.error('Error fetching meals:', error);
    }
}

// Call the function
fetchMeals();

const bakery = document.querySelectorAll(".card-bakery");
async function fetchBakery(){
    try{
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=cake');
        const data = await response.json();
        const meals = data.meals || [];
        bakery.forEach((item, index)=>{
            const meal = meals[index];
            if(meal){
                item.querySelector('.card-body .card-title').textContent = meal.strMeal;
                item.querySelector('.card-img-top').src = meal.strMealThumb;
                item.querySelector('.card-img-top').alt = meal.strMeal;
                item.querySelector('.card-body .card-text').textContent = meal.strInstructions.substring(0,70) + '...';
            }
        });
    }catch(error){
        console.log('Error fetching bakery: ', error);
    }
}

fetchBakery();

const icecream = document.querySelectorAll('.card-icecream');
async function fetchIcecream(){   
    try{
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=chocolate');
        const data = await response.json();
        const meals = data.meals || [];
        icecream.forEach((item, index)=>{
            const meal = meals[index];
            if(meal){
                item.querySelector('.card-body .card-title').textContent = meal.strMeal;
                item.querySelector('.card-img-top').src = meal.strMealThumb;
                item.querySelector('.card-img-top').alt = meal.strMeal;
                item.querySelector('.card-body .card-text').textContent = meal.strInstructions.substring(0,70) + '...';
            }
        })
    }catch(error){
        console.log('cannot fetch error: ', error);
    } 
}

fetchIcecream();

const cooldrinks = document.querySelectorAll('.card-cocktails');
async function fetchDrinks(){
    try{
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail');
        const data = await response.json();
        const drinks = data.drinks || [];
        cooldrinks.forEach((item, index)=>{
            const drink = drinks[index+20];
            if(drink){
                item.querySelector('.card-body .card-title').innerHTML = drink.strDrink;
                item.querySelector('.card-img-top').src = drink.strDrinkThumb;
                item.querySelector('.card-img-top').alt = drink.strDrink;
                const price = (Math.random()*5 + 1).toFixed(2);
                item.querySelector('.price span:first-of-type').textContent = `Price: ${price}$`;
            }
        })
    }catch(error){
        console.log("error fetching: ", error);
    }
}

fetchDrinks();

const addtoCart = document.querySelectorAll('.price span.icon-cart');
const addtoCartIcon = document.querySelectorAll('.price span i');
addtoCart.forEach((item)=>{
    item.addEventListener('click',()=>{
        item.innerHTML = `Added <i style="color: red;" class="fa-solid fa-cart-shopping"></i>`
    })
})