import csv
import sys
import operator

reader = csv.reader(open("case.csv"), delimiter=",")
sortedlist = sorted(reader, key=operator.itemgetter(0), reverse=False)

with open('sorted-case.csv', 'w') as f:
    names = ['columnName_1', 'columnName_2', 'columnName_3', 'columnName_4', 'columnName_5', 'columnName_6',
             'columnName_7', 'columnName_8', 'columnName_9', 'columnName_10', 'columnName_11', 'columnName_12']
    writer = csv.writer(f)
    for row in sortedlist:
        writer.writerow(row)
