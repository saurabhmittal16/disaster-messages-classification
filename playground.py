import pickle
import nltk
from nltk.stem import PorterStemmer

tokenizer = nltk.RegexpTokenizer(r"\w+")
porter = PorterStemmer()

with open("./pickles/model.pickle", 'rb') as file:
    data = pickle.load(file)


def get_tokens(sentence):
    tokens = tokenizer.tokenize(sentence)
    tokens = filter(lambda x: x.isalpha(), tokens)
    tokens = map(lambda x: x.lower(), tokens)

    return list(tokens)


def stem_sentence(sentence):
    # Returns the sentence with each word stemmed
    tokens = get_tokens(sentence)
    result = []

    for tok in tokens:
        result.append(porter.stem(tok))

    return " ".join(result)


classifiers = data['classifiers']
vectorizer = data['vectorizer']

sentence = "Please send us some food. We are stuck here for many days and have nothing to eat"
stemmed = stem_sentence(sentence)

test_input = vectorizer.transform([stemmed])
prediction = classifiers['request'].predict(test_input)

print(prediction)
