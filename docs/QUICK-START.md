# Quick Start Guide - Ingredient Scoring System

## For Users

### Viewing Ingredient Scores

Browse the `ingredients/` directory to see all available ingredients with nutritional data and family scores.

### Updating Your Preferences

1. Find the ingredient in `ingredients/`
2. Edit your score (0-5 scale)
3. Commit the change
4. All recipes using that ingredient will automatically reflect the new score

### Adding New Ingredients

1. Create a new `.md` file in `ingredients/`
2. Copy the template from `ingredients/README.md`
3. Fill in nutritional data (use [USDA FoodData Central](https://fdc.nal.usda.gov/))
4. Add family scores for all members
5. Commit - the workflow will validate it automatically

### Creating New Recipes

1. Create a new `.md` file in `recipes/`
2. Link to ingredients using markdown: `[ingredient name](../ingredients/file.md)`
3. Recipe will automatically be scored based on ingredients
4. Optional: Add explicit family scores to override

### Understanding Recipe Scores

- Recipes show calculated scores per family member
- Based on average of ingredient scores
- Seasonings (score 0) are excluded from calculations
- Higher scores = better family preference

## For Developers

### Workflow Automation

The `ingredient-nutrition-check.yml` workflow runs on:
- Push to `ingredients/` directory
- Pull requests modifying ingredients
- Manual trigger

It validates:
- Required sections present
- Nutritional data completeness
- Proper markdown structure

### Adding USDA API Support

To enable automated nutritional data fetching:

1. Get a free API key from [USDA FoodData Central](https://fdc.nal.usda.gov/api-guide.html)
2. Add as repository secret: `USDA_API_KEY`
3. Extend workflow to fetch data automatically

### Scoring Algorithm

```python
def calculate_score(ingredients, member):
    scores = []
    for ingredient in ingredients:
        score = ingredient.get_score(member)
        if score > 0:  # Exclude seasonings
            scores.append(score)
    return sum(scores) / len(scores)
```

## Score Scale

- **5** - Love / Delicious
- **4** - Like / Enjoy
- **3** - Neutral / Acceptable
- **2** - Somewhat dislike
- **1** - Strongly dislike
- **0** - Dislike / Won't eat (or seasoning)

## File Locations

- **Ingredients**: `ingredients/*.md`
- **Recipes**: `recipes/*.md`
- **Preferences**: `data/preferences.json`
- **Documentation**: `docs/`
- **Workflow**: `.github/workflows/ingredient-nutrition-check.yml`

## Tips

1. Use consistent naming for ingredient files (lowercase, hyphens)
2. Always include serving size in nutritional information
3. Tag ingredients for easier searching
4. Add storage info to reduce food waste
5. Link ingredients in recipes for easy navigation

## Support

For questions or issues, refer to:
- `ingredients/README.md` - Ingredient management
- `docs/scoring-system.md` - Detailed scoring methodology
- `docs/IMPLEMENTATION.md` - Technical implementation details
