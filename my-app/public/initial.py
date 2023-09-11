import random
import json

# function checks if given list with 3 strings of 4 numbers each in {1, 2, 3} 
def isATriple(arr):
    for index in range(4):
        currValues = []
        for card in range(3):
            currValues.append(arr[card][index])
        allEqual = False
        allDifferent = False
        if currValues[0] == currValues[1] == currValues[2]:
            allEqual = True
        elif currValues[0] != currValues[1] and currValues[1] != currValues[2] and currValues[0] != currValues[2]:
            allDifferent = True
        if not allEqual and not allDifferent:
            return False
    return True


def main():
    # would like to find all possible sets
    # generate all possible cards
    allCards = []
    for i in range(1, 4):
        for j in range(1, 4):
            for k in range(1, 4):
                for l in range(1, 4):
                    allCards.append((i, j, k, l))
                
    foundcardCombo = False
    while not foundcardCombo:
        cardCombo = []
        for j in range(69, 81):
            t = random.randint(1, j)
            if t not in cardCombo:
                cardCombo.append(allCards[t])
            else:
                cardCombo.append(allCards[j])

        # check if cardCombo has duplicates
        duplicate = False
        for i in range(12):
            for j in range(i + 1, 12):
                if cardCombo[i] == cardCombo[j]:
                    duplicate = True

        # check if cardCombo has exactly 6 triples
        if not duplicate:
            triples = []
            tripleCounter = 0
            for i in range(0, 10):
                for j in range(i + 1, 11):
                    for k in range(j + 1, 12):
                        testTriple = [cardCombo[i], cardCombo[j], cardCombo[k]]
                        if isATriple(testTriple):
                            tripleCounter += 1
                            triples.append(testTriple)
            if tripleCounter == 6:
                print("works")
                f = open("writeCombinations.txt", "w")
                for combo in cardCombo:
                    fileString = ""
                    for prop in combo:
                        fileString += str(prop) 
                    fileString += ".svg"
                    f.write(fileString + "\n")
                foundcardCombo = True
                transformedTriples = [[list(card) for card in triple] for triple in triples]
                g = open("writeTriples.txt", "w")
                g.write("[\n")
                for i in range(len(transformedTriples)):
                    if i == len(transformedTriples) - 1:
                        g.write("\t" + str(transformedTriples[i]) + "\n")
                    else:
                        g.write("\t" + str(transformedTriples[i]) + ",\n")
                g.write("]")

    
        


    # allCombinations = []
    # for i1 in range(len(allCards)):
    #     for i2 in range(i1 + 1, len(allCards)):
    #         for i3 in range(i2 + 1, len(allCards)):
    #             for i4 in range(i3 + 1, len(allCards)):
    #                 for i5 in range(i4 + 1, len(allCards)):
    #                     for i6 in range(i5 + 1, len(allCards)):
    #                         for i7 in range(i6 + 1, len(allCards)):
    #                             for i8 in range(i7 + 1, len(allCards)):
    #                                 for i9 in range(i8 + 1, len(allCards)):
    #                                     for i10 in range(i9 + 1, len(allCards)):
    #                                         for i11 in range(i10 + 1, len(allCards)):
    #                                             for i12 in range(i11 + 1, len(allCards)):
    #                                                 allCombinations.append([allCards[i1], allCards[i2], allCards[i3], allCards[i4], allCards[i5], allCards[i6], allCards[i7], allCards[i8], allCards[i9], allCards[i10], allCards[i11], allCards[i12]])
    #                                                 if len(allCombinations) % 1000000 == 0:
    #                                                     print(len(allCombinations))
    # f = open("writeCombinations.txt", "w")
    # for combo in allCombinations:
    #     f.write(str(combo) + "\n")
    # f.close()

    # print("finished")


if __name__ == "__main__":
    main()