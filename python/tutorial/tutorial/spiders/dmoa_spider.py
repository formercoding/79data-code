import scrapy


class QuotesSpider(scrapy.Spider):
    name = "quotes"
    start_urls = [
        'http://quotes.toscrape.com/page/1/',
        'http://quotes.toscrape.com/page/2/',
        #'http://demo.qisoso.net/'
    ]

    def parse(self, response):
        #page = response.url.split(".")[-2]
        #page = response.url.split("/")[-2]
        #filename = 'quotes-%s.html' % page
        # filename = 'quotes.html'
        # with open(filename, 'w') as f:
        #     f.write(str(response.css('title::text')[0].extract()))
        for quote in response.css('div.quote'):
            yield {
                'text': quote.css('span.txt::text').extract_first(),
                'author': quote.css('small.author::text').extract_first(),
                'tags': quote.css('div.tags a.tag::text').extract(),
            }
            next_page = response.css('li.next a::attr(href)').extract_first()
            if next_page is not None:
                next_page = response.urljoin(next_page)
                yield scrapy.Request(next_page, callback=self.parse)