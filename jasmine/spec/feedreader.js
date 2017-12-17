/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

      /* Check if url is defined in the allfeeds array
         */
         it('urls ok', function(){
             allFeeds.forEach(function(feed){
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
             });             
         });


        /* Check if name is defined in the allfeeds array
         */
         it('name ok',function(){

            allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });             
         });
    });


    /* Test case that check diferent states of the menu hidden by default, show/hide*/
    describe('The menu',function(){
        var menu = $('div.slide-menu');
        var menuIcon = $('.menu-icon-link');

        
        it('hidden by default',function(){
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        it('show when clicked',function(){
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);  

             menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(true); 
        });        
    });

    /*Test case that check if at lease one entry is in the feed container */
    describe('Initial Entries',function(){
        beforeEach(function(done){
            loadFeed(0,done);        
        });

        it('feed not empty',function(done){          
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });
    });

    /* Test case the check if the content changes when user selects a differnt feed*/
    describe('New Feed Selection',function(){
        var initContent = '';
        var otherContent = '';

        beforeEach(function(done){
            loadFeed(1,function(){
                initContent = $('.feed').html();               

                loadFeed(2,function(){
                    otherContent = $('.feed').html();
                    done();
                });
            });         
        });

        it('content change',function(done){
            expect(otherContent).not.toBe(initContent);
            done();
        });
    });
}());
