import pandas
import sys
import json

data = pandas.read_csv( sys.argv[1] )
sorted_data = data.sort_values('web-scraper-order') # group data together based on part listing

# This loop will make a dictionary with the part name (i.e. AMD Ryzen 5 1600X 3.6 GHz 6-Core Processor) 
# as the key and a list of all the occurrences of that part as the value
all_parts = {}
for row in sorted_data.iterrows():
  if (row[1]['name'] in all_parts):
    all_parts[row[1]['name']].append(row[1])
  else:
    all_parts[row[1]['name']] = [row[1]]

# This tuple is used to extract the relevant info from the part this will differ based on the type of 
# data you are trying to sort (CPU, GPU, Power supply, etc.)
# This is what you should edit depending on what part you are working with
# relevant_info = ['Modules']
# The goal of this loop is to create a dictionary where the part name is the key and the value is a dictionary
# of the relevant information and buying information

'''
result = {'part name': 
          {'part info': {...}, 
           'buying info': {...}
          }
        }
'''
result = {}
for part in all_parts:
  info_labels = []
  info = []
  buy_links= []
  price = []
  for item in all_parts[part]:
    if (not pandas.isnull(item['info-label'])):
      info_labels.append(item['info-label'])
    elif (not pandas.isnull(item['info'])):
      info.append(item['info'])
    elif (not pandas.isnull(item['buy-link-href'])):
      buy_links.append(item['buy-link-href'])
    elif (not pandas.isnull(item['price'])):
      price.append(item['price'])
    

  # If a part can't be purchased then we don't care about it and will purge it from the result
  # if(len(info_labels) != 0 and info_labels is not None):
  #   print(info_labels)
  #   print(info)
  info_dict = dict(zip(info_labels, info))
  # else:
  #   print(part)
  
  # part_info = {k: info_dict[k] for k in relevant_info}
  buying_info = dict(zip(buy_links, price))

 # if(len(info_labels) != 0 and info_labels is not None and (len(info_labels) == len(info))):
  if(len(info_labels) != 0 and info_labels is not None and len(info_labels) == len(info)):
    print(len(info_labels))
    print(len(info), '\n')
    result[part] = {'part_info': info_dict, 'buying_info': buying_info, 'image_link': item['image-src']}

with open('./gpu_data.json', 'w') as outfile:
   json.dump(result, outfile, indent=4, sort_keys=True)
  