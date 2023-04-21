from flask import Flask, make_response

import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

@app.route('/scraping/<number>')
def hello(number):
   
  produits=[]
  url="https://www.jumia.ma/fashion-mode-homme/?page="+str(number)
  page = requests.get(url)
  soup = BeautifulSoup(page.content, 'html.parser')
  res=soup.find("div",{'class':'-pvs col12'})
  articles=res.find_all("article")
  for i in range(len(articles)):
    image_element = articles[i].find('img', {'src': True})
    image_url = image_element['data-src']
    desc=articles[i].find("h3",{'class':"name"}).text
    prix=articles[i].find("div",{"class":"prc"}).text
    if  articles[i].find("div",{"class":"s-prc-w"}):
      partie_old_prix=articles[i].find("div",{"class":"s-prc-w"})
      old_prix=partie_old_prix.find("div",{"class":"old"}).text
      promo=partie_old_prix.find("div",{"class":"bdg _dsct _sm"}).text
      produit={}
      produit={"image_url":image_url,"desc":desc,"prix":prix,"old_prix":old_prix,"promo":promo}
      produits.append(produit)
  response = make_response(produits)
  response.headers['Access-Control-Allow-Origin'] = '*'
  return response

if __name__ == '__main__':
    app.run(port=5000)