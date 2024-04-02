import pandas as pd
from mlxtend.frequent_patterns import apriori
from mlxtend.frequent_patterns import association_rules
import sys
import json

try:
    user_id = sys.argv[1]
    file_path = sys.argv[2]
    jsonFormatted = json.loads(file_path)
    df = pd.DataFrame(jsonFormatted)
    frequent_itemsets = apriori(df.drop(columns=['userID']), min_support=0.1, use_colnames=True)

    rules = association_rules(frequent_itemsets, metric="confidence", min_threshold=0.5)


    user_interactions = df[df['userID'] == user_id]

    if not user_interactions.empty:
        user_rules = rules[rules['antecedents'].apply(lambda x: set(user_interactions.columns[1:]).issuperset(x))]

        user_rules = user_rules.sort_values(by='confidence', ascending=False)

        recommended_problems = user_rules['consequents'].explode().unique().tolist()

        solved_problems = set(user_interactions.columns[1:][user_interactions.iloc[0, 1:] == 1])
        unsolved_problems = [problem for problem in recommended_problems if problem not in solved_problems]

        if unsolved_problems:
            next_problem = unsolved_problems[0]
            print({"next_problem": next_problem, "error": False, "confidence": user_rules.iloc[0]['confidence']})
        else:
            print({"message": "No more problems to recommend.", "error": False})
    else:
        print({"message": "No interactions found.", "error": False})

except Exception as e:
    print({"message": str(e), "error": True})