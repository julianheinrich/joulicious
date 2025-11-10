# Ingredients Database

This directory contains individual ingredient pages in markdown format. Each ingredient is scored by family members and includes nutritional information.

## Ingredient Page Structure

Each ingredient file should follow this format:

```markdown
# [Ingredient Name]

## Family Scores
Rate from 0 (dislike) to 5 (delicious)

- Alice: [0-5]
- Bob: [0-5]
- Charlie: [0-5]
- Diana: [0-5]

## Nutrition Information (per serving size)

### Macronutrients
- **Calories:** X kcal
- **Protein:** X g
- **Fat:** X g
  - Saturated: X g
  - Monounsaturated: X g (optional)
  - Polyunsaturated: X g (optional)
- **Carbohydrates:** X g
  - Sugars: X g
  - Fiber: X g

### Vitamins & Minerals
(Optional but recommended)
- List key vitamins and minerals

## Source
Nutritional data from [Source Name]

## Tags
- tag1
- tag2
- tag3

## Storage
- Storage instructions
- Shelf life information
```

## Scoring Guide

Family member scores range from 0 to 5:
- **0**: Dislike / Will not eat
- **1**: Strongly dislike
- **2**: Somewhat dislike
- **3**: Neutral / Acceptable
- **4**: Like / Enjoy
- **5**: Love / Delicious

**Note:** For ingredients that are seasonings or not consumed directly (like salt, pepper), use a default score of 0, as they are not rated for taste alone.

## Recipe Scoring

Recipes without explicit family member scores will be scored as the average of all ingredient scores. This provides an automatic baseline rating for new recipes.

### Example Calculation:
For scrambled eggs with ingredients:
- Eggs: avg(4,5,3,4) = 4.0
- Milk: avg(2,3,4,3) = 3.0
- Butter: avg(5,5,4,5) = 4.75
- Salt: avg(0,0,0,0) = 0.0 (excluded from calculation as seasoning)
- Pepper: avg(0,0,0,0) = 0.0 (excluded from calculation as seasoning)

Recipe score for Alice: avg(4,2,5) = 3.67 (excluding seasonings with score 0)

## Adding New Ingredients

1. Create a new markdown file in this directory named after the ingredient (e.g., `chicken-breast.md`)
2. Follow the structure template above
3. Add family scores for each member
4. Include nutritional information from trusted sources (USDA recommended)
5. Commit the file - the workflow will validate the format
6. For nutritional data, consider using:
   - [USDA FoodData Central](https://fdc.nal.usda.gov/)
   - [USDA API](https://fdc.nal.usda.gov/api-guide.html) (requires free API key)

## Nutritional Data Sources

### Recommended Sources:
- **USDA FoodData Central**: Public, trusted, comprehensive database
- **USDA API**: Automated lookups (free API key required)
- **FDA Nutrition Facts**: For packaged foods
- **Scientific Nutrition Databases**: For specialized items

### Workflow Automation
A GitHub Actions workflow (`ingredient-nutrition-check.yml`) validates new ingredient files to ensure they contain required nutritional information.

## Current Ingredients

Run this command to list all ingredients:
```bash
ls -1 *.md | grep -v README.md
```
