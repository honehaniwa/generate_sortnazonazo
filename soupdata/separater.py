import codecs
def main():
    category_dict = {}
    # with open('out.txt', 'rb') as f:
    with open('word_list.txt', 'r') as f:
        s = f.read()
        text = s[len(codecs.BOM_UTF16_LE):].decode('utf-16le')
        text = text.split('\r\n')
    for word in text:
        word = word.split(',')
        category_dict.setdefault(word[0], []).append(word[1])
    for category, word_list in category_dict.items():
        with open('../word_data/' + category + '.txt', 'w') as f:
            for word in word_list:
                f.writelines(word + '\n')


if __name__ == '__main__':
    main()