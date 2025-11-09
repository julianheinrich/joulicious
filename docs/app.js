// Joulicious Meal Planner App

// State management
const state = {
    preferences: null,
    recipes: [],
    currentWeek: new Date(),
    mealPlan: {}
};

// Initialize app
document.addEventListener('DOMContentLoaded', async () => {
    await loadPreferences();
    await loadRecipes();
    initializeMealPlan();
    setupEventListeners();
    renderAll();
});

// Load preferences from JSON file
async function loadPreferences() {
    try {
        // Detect if we're on GitHub Pages or local
        const baseUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
            ? '..' 
            : '/joulicious';
        const response = await fetch(`${baseUrl}/data/preferences.json`);
        state.preferences = await response.json();
    } catch (error) {
        console.error('Error loading preferences:', error);
        state.preferences = { family: { name: 'Your Family' } };
    }
}

// Load recipes (placeholder - would scan recipes directory)
async function loadRecipes() {
    // In a real implementation, this would fetch from the recipes directory
    state.recipes = [
        {
            name: 'Scrambled Eggs',
            file: 'scrambled-eggs.md',
            prepTime: 10,
            tags: ['breakfast', 'quick', 'vegetarian']
        }
    ];
}

// Initialize empty meal plan for the week
function initializeMealPlan() {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const meals = ['Breakfast', 'Lunch', 'Dinner'];
    
    days.forEach(day => {
        state.mealPlan[day] = {};
        meals.forEach(meal => {
            state.mealPlan[day][meal] = null;
        });
    });
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('prev-week').addEventListener('click', () => {
        changeWeek(-7);
    });
    
    document.getElementById('next-week').addEventListener('click', () => {
        changeWeek(7);
    });
    
    document.getElementById('generate-plan').addEventListener('click', () => {
        generateMealPlan();
    });
}

// Change week view
function changeWeek(days) {
    state.currentWeek.setDate(state.currentWeek.getDate() + days);
    renderWeekDisplay();
}

// Render all sections
function renderAll() {
    renderPreferences();
    renderWeekDisplay();
    renderMealPlan();
    renderRecipes();
}

// Render preferences display
function renderPreferences() {
    const container = document.getElementById('preferences-display');
    if (!state.preferences) {
        container.innerHTML = '<p class="error">Unable to load preferences</p>';
        return;
    }
    
    const { family, dietary, cuisines } = state.preferences;
    
    container.innerHTML = `
        <div class="preferences-grid">
            <div class="pref-item">
                <strong>Family:</strong> ${family.name || 'N/A'}
            </div>
            <div class="pref-item">
                <strong>Members:</strong> ${family.members || 0} (${family.adults || 0} adults, ${family.children || 0} children)
            </div>
            <div class="pref-item">
                <strong>Dietary Restrictions:</strong> ${dietary?.restrictions?.join(', ') || 'None'}
            </div>
            <div class="pref-item">
                <strong>Allergies:</strong> ${dietary?.allergies?.join(', ') || 'None'}
            </div>
            <div class="pref-item">
                <strong>Favorite Cuisines:</strong> ${cuisines?.favorite?.join(', ') || 'N/A'}
            </div>
        </div>
    `;
}

// Render week display
function renderWeekDisplay() {
    const weekStart = getWeekStart(state.currentWeek);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    const weekDisplay = `${weekStart.toLocaleDateString('en-US', options)} - ${weekEnd.toLocaleDateString('en-US', options)}`;
    
    document.getElementById('current-week').textContent = weekDisplay;
}

// Get start of week (Monday)
function getWeekStart(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Monday start
    return new Date(d.setDate(diff));
}

// Render meal plan grid
function renderMealPlan() {
    const container = document.getElementById('meal-plan-grid');
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const meals = ['Breakfast', 'Lunch', 'Dinner'];
    
    let html = '<div class="meal-grid">';
    
    days.forEach(day => {
        html += `<div class="day-column">`;
        html += `<h3>${day}</h3>`;
        
        meals.forEach(meal => {
            const mealData = state.mealPlan[day][meal];
            const mealName = mealData || '<em>Not planned</em>';
            html += `
                <div class="meal-slot" data-day="${day}" data-meal="${meal}">
                    <strong>${meal}:</strong>
                    <span>${mealName}</span>
                </div>
            `;
        });
        
        html += `</div>`;
    });
    
    html += '</div>';
    container.innerHTML = html;
}

// Render recipes list
function renderRecipes() {
    const container = document.getElementById('recipes-list');
    
    if (state.recipes.length === 0) {
        container.innerHTML = '<p>No recipes available yet.</p>';
        return;
    }
    
    let html = '<div class="recipes-grid">';
    state.recipes.forEach(recipe => {
        html += `
            <div class="recipe-card">
                <h3>${recipe.name}</h3>
                <p><strong>Prep Time:</strong> ${recipe.prepTime} min</p>
                <p><strong>Tags:</strong> ${recipe.tags.join(', ')}</p>
                <a href="../recipes/${recipe.file}" target="_blank" class="btn btn-small">View Recipe</a>
            </div>
        `;
    });
    html += '</div>';
    
    container.innerHTML = html;
}

// Generate meal plan (placeholder logic)
function generateMealPlan() {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const sampleMeals = {
        breakfast: ['Scrambled Eggs', 'Oatmeal', 'Pancakes', 'Yogurt & Fruit', 'Toast & Avocado'],
        lunch: ['Sandwich', 'Salad', 'Soup', 'Leftovers', 'Wrap'],
        dinner: ['Pasta', 'Stir-fry', 'Grilled Chicken', 'Tacos', 'Pizza', 'Curry', 'Fish & Veggies']
    };
    
    days.forEach(day => {
        state.mealPlan[day].Breakfast = sampleMeals.breakfast[Math.floor(Math.random() * sampleMeals.breakfast.length)];
        state.mealPlan[day].Lunch = sampleMeals.lunch[Math.floor(Math.random() * sampleMeals.lunch.length)];
        state.mealPlan[day].Dinner = sampleMeals.dinner[Math.floor(Math.random() * sampleMeals.dinner.length)];
    });
    
    renderMealPlan();
    alert('Meal plan generated! (This is a placeholder - in production, this would use AI/smart logic based on preferences)');
}
