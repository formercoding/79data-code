import scrapy


class AuthorSpider(scrapy.Spider):
    name = 'qisoso'

    start_urls = ['http://demo.qisoso.net/home/result.html?SearScope=0&SearProv=HEN&key=阿里巴巴']

    def parse(self, response):
        # follow links to author pages
        for href in response.css('.comp b::text').extract():
            yield href

        # follow pagination links
        next_page = response.css('li.next a::attr(href)').extract_first()
        if next_page is not None:
            next_page = response.urljoin(next_page)
            yield scrapy.Request(next_page, callback=self.parse)

