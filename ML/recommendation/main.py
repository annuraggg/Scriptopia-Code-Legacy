import pandas as pd # type: ignore
from mlxtend.frequent_patterns import apriori # type: ignore
from mlxtend.frequent_patterns import association_rules # type: ignore

def recommend_next_problem(user_id, json_data):
    try:
        df = pd.DataFrame(json_data)
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
                return {"next_problem": next_problem, "error": False, "confidence": user_rules.iloc[0]['confidence']}
            else:
                return {"message": "No more problems to recommend.", "error": False}
        else:
            return {"message": "No interactions found.", "error": False}

    except Exception as e:
        print(e)
        return {"message": str(e), "error": True}