# Recipe Scoring System

## Overview

Joulicious uses an ingredient-based scoring system to help predict how much each family member will enjoy a recipe. This system provides automatic ratings for recipes based on family preferences.

## How It Works

### Ingredient Scores

Each ingredient in the database (`ingredients/` directory) has individual scores from each family member, ranging from 0 to 5:

- **0**: Dislike / Will not eat
- **1**: Strongly dislike
- **2**: Somewhat dislike
- **3**: Neutral / Acceptable
- **4**: Like / Enjoy
- **5**: Love / Delicious

### Recipe Scoring

For recipes that do not have explicit family member scores, the score is automatically calculated as the **average of all main ingredient scores**.

#### Calculation Rules:

1. **Include main ingredients**: Foods that contribute substantially to the dish
2. **Exclude seasonings**: Ingredients with a default score of 0 (salt, pepper, spices used in small amounts)
3. **Per person average**: Calculate separately for each family member

#### Example: Scrambled Eggs

Ingredients and their scores:
- **Eggs**: Alice:4, Bob:5, Charlie:3, Diana:4
- **Milk**: Alice:2, Bob:3, Charlie:4, Diana:3
- **Butter**: Alice:5, Bob:5, Charlie:4, Diana:5
- **Salt**: 0 (excluded - seasoning)
- **Pepper**: 0 (excluded - seasoning)

**Alice's score**: (4 + 2 + 5) / 3 = **3.7**
**Bob's score**: (5 + 3 + 5) / 3 = **4.0**
**Charlie's score**: (3 + 4 + 4) / 3 = **3.7**
**Diana's score**: (4 + 3 + 5) / 3 = **4.0**

## Benefits

### Automatic Rating
- New recipes get instant family preference predictions
- No need to manually score every recipe
- Helps with meal planning decisions

### Data-Driven Meal Planning
- Identify recipes that the whole family will enjoy
- Avoid recipes with ingredients family members dislike
- Balance meals across different preferences

### Nutritional Tracking
- Each ingredient includes macronutrient information
- Easy to calculate total nutrition for recipes
- Helps meet dietary goals

## Managing Ingredient Scores

### Updating Scores

Family members can update their ingredient preferences by editing the ingredient markdown files in `ingredients/`:

1. Navigate to the ingredient file (e.g., `ingredients/eggs.md`)
2. Update the score under "Family Scores"
3. Commit the change
4. Recipe scores will automatically reflect the new preferences

### Adding New Ingredients

When creating recipes with new ingredients:

1. Create a new ingredient file in `ingredients/`
2. Add family scores for each member
3. Include nutritional information from USDA or other trusted sources
4. Link to the ingredient from recipe files

See `ingredients/README.md` for detailed instructions.

## Override Recipe Scores

While automatic scoring is convenient, you can override the calculated score by adding an explicit "Family Scores" section to any recipe:

```markdown
## Family Scores (Actual)

- Alice: 5
- Bob: 4
- Charlie: 5
- Diana: 5

*These scores override the ingredient-based calculation based on actual family feedback.*
```

This is useful for:
- Recipes where the whole is greater than the sum of parts
- Dishes with special preparation that changes preferences
- Family favorites that deserve a higher rating

## Integration with Meal Planning

The scoring system integrates with the meal plan generator to:

1. **Prioritize high-scoring recipes** for the whole family
2. **Balance preferences** across the week
3. **Avoid low-scoring recipes** unless specifically requested
4. **Suggest alternatives** when a recipe has low scores for some members

## Future Enhancements

Potential improvements to the scoring system:

- Weight ingredients by quantity (main ingredients vs. minor ingredients)
- Learn from actual meal feedback over time
- Consider cooking method impact on scores
- Seasonal preference adjustments
- Dietary restriction compatibility scoring
