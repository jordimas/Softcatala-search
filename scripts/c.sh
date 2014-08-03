#rm -f ../logs/*   
# 5 level of deepths should be enought for a first crawl (links deepth) and consequent crawls
./crawl urls 101 http://localhost:8983/solr/ 5
