import nltk
import pickle
from nltk.stem import PorterStemmer

tokenizer = nltk.RegexpTokenizer(r"\w+")
porter = PorterStemmer()

with open('../pickles/model.pickle', 'rb') as file:
    data = pickle.load(file)

classifiers = data['classifiers']
vectorizer = data['vectorizer']


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


def int2bool(n):
    if (n == 1):
        return True
    else:
        return False


def run(sentences):
    # sentences - list of sentenecs to be predicted
    text_input = vectorizer.transform(sentences)

    request_res = classifiers['request'].predict(text_input)
    food_res = classifiers['food'].predict(text_input)
    shelter_res = classifiers['shelter'].predict(text_input)
    water_res = classifiers['water'].predict(text_input)

    result = []

    for i in range(len(request_res)):
        resp = {}
        if (request_res[i] == 0):
            resp['request'] = False
        else:
            resp['request'] = True
            resp['food'] = int2bool(food_res[i])
            resp['shelter'] = int2bool(shelter_res[i])
            resp['water'] = int2bool(water_res[i])
        result.append(resp)

    return result
