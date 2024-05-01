import pandas as pd # type: ignore
from mlxtend.frequent_patterns import apriori # type: ignore
from mlxtend.frequent_patterns import association_rules # type: ignore
import json # type: ignore

def recommend_next_problem(user_id, json_data):
    try:
        print("USER ID: ", user_id)
        jsonFormatted = json.loads(json_data)
        df = pd.DataFrame(jsonFormatted)
        frequent_itemsets = apriori(df.drop(columns=['userID']), min_support=0.1, use_colnames=True)
        print("FREQUENT ITEMSETS")
        print(frequent_itemsets)

        rules = association_rules(frequent_itemsets, metric="confidence", min_threshold=0.5)
        print("RULES")
        print(rules)

        user_interactions = df[df['userID'] == user_id]
        print(user_interactions)

        if not user_interactions.empty:
            user_rules = rules[rules['antecedents'].apply(lambda x: set(user_interactions.columns[1:]).issuperset(x))]

            user_rules = user_rules.sort_values(by='confidence', ascending=False)

            recommended_problems = user_rules['consequents'].explode().unique().tolist()

            solved_problems = set(user_interactions.columns[1:][user_interactions.iloc[0, 1:] == 1])
            unsolved_problems = [problem for problem in recommended_problems if problem not in solved_problems]

            if unsolved_problems:
                next_problem = unsolved_problems
                return {"next_problem": next_problem, "error": False, "confidence": user_rules.iloc[0]['confidence']}
            else:
                return {"message": "No more problems to recommend.", "error": False}
        else:
            return {"message": "No interactions found.", "error": False}

    except Exception as e:
        return {"message": str(e), "error": True}